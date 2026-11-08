/*
 * "What's missing?" deep dive for Fine Print News
 * © 2026 Fine Print News. All rights reserved. See LICENSE.txt.
 * ----------------------------------------------------------------
 * One button under a story: "What's missing?". Tapping it opens three swipeable cards:
 *   1. What we're given  what the source does tell you, first
 *   2. What's missing?   tap the gaps you notice, then check against the source
 *   3. Overview          the big picture, questions worth asking, what others flagged
 *                        (optional `community` adapter), and where answers live
 *
 * Usage:
 *   ReporterNotebook.mountButton(container, story, { onEvent, onMetrics, community, actions })
 *     story = { id, title, notebook: { role, ask, spot, established, find } }
 *     onMetrics(allCounts) lets the page store usage counts somewhere you can read them.
 *     actions = optional list of { label, url, look } shown on the last card
 *       (defaults to BC_ACTIONS below).
 * No libraries.
 */
(function (global) {
  "use strict";

  var PREFIX = "rn:";
  var store = {
    get: function (k) { try { return JSON.parse(localStorage.getItem(PREFIX + k)); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(PREFIX + k, JSON.stringify(v)); } catch (e) { /* storage blocked: keep going */ } }
  };

  // Usage funnel: shown → opened → spotted (checked) → asked → found (opened a link) → completed (reached last card)
  var STAGES = ["shown", "opened", "spotted", "found", "completed"];
  var metricsListener = null;
  function bump(storyId, stage) {
    var m = store.get("metrics") || {};
    var s = m[storyId] || (m[storyId] = { shown: 0, opened: 0, spotted: 0, found: 0, completed: 0 });
    if (stage in s) s[stage]++;
    store.set("metrics", m);
    if (metricsListener) { try { metricsListener(m); } catch (e) {} }
  }

  // Calm, process-based ways to fill a gap in BC. Nonpartisan: no petitions, no causes.
  var BC_ACTIONS = [
    { label: "See records others already requested", url: "https://www2.gov.bc.ca/gov/content/governments/about-the-bc-government/open-government/open-information/completed-foi-requests",
      look: "Government records released through past information requests. Your answer may already be here." },
    { label: "Ask your MLA", url: "https://www.leg.bc.ca/learn-about-us/members",
      look: "Your MLA's office answers constituents' questions. A short, specific question works best." },
    { label: "Request the records yourself", url: "https://www2.gov.bc.ca/gov/content/governments/about-the-bc-government/open-government/open-information/freedom-of-information",
      look: "A freedom of information request asks government for documents. A fee may apply." },
    { label: "Join a public consultation", url: "https://engage.gov.bc.ca/govtogetherbc/",
      look: "Open government engagements where you can give input directly." }
  ];

  function h(tag, attrs) {
    var node = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (k === "class") node.className = v;
      else if (k === "text") node.textContent = v;
      else if (k.slice(0, 2) === "on") node.addEventListener(k.slice(2), v);
      else if (v !== false && v != null) node.setAttribute(k, v === true ? "" : v);
    });
    for (var i = 2; i < arguments.length; i++) {
      var c = arguments[i];
      if (c == null || c === false) continue;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    }
    return node;
  }

  var shownThisLoad = {};
  var STATUS_LABEL = { yes: "In the source", partly: "Partly", no: "Not in the source" };

  function validate(story) {
    var nb = story && story.notebook;
    var errs = [];
    if (!story || !story.id) errs.push("story.id is missing");
    if (!nb) { errs.push("story.notebook is missing"); return errs; }
    if (!nb.ask || nb.ask.length < 2) errs.push("notebook.ask needs at least 2 questions");
    if (!nb.spot || nb.spot.length < 3) errs.push("notebook.spot needs at least 3 items");
    (nb.spot || []).forEach(function (s, i) {
      if (!STATUS_LABEL[s.status]) errs.push("spot[" + i + "].status must be yes, partly or no");
      if (!s.note) errs.push("spot[" + i + "].note is missing: every item needs the source's actual answer");
    });
    if (!nb.established || !nb.established.length) errs.push("notebook.established is empty: always show what the source does establish");
    if (!nb.find || !nb.find.length) errs.push("notebook.find is empty");
    (nb.find || []).forEach(function (f, i) {
      if (!/^https:\/\//.test(f.url || "")) errs.push("find[" + i + "].url must be an https link");
    });
    return errs;
  }

  function mount(container, story, opts) {
    opts = opts || {};
    var emit = function (type, detail) {
      if (STAGES.indexOf(type) > -1) bump(story.id, type);
      if (typeof opts.onEvent === "function") { try { opts.onEvent(type, Object.assign({ storyId: story.id }, detail || {})); } catch (e) {} }
    };

    var errs = validate(story);
    if (errs.length) {
      container.innerHTML = "";
      var ul = h("ul");
      errs.forEach(function (e) { ul.appendChild(h("li", { text: e })); });
      container.appendChild(h("div", { class: "rn rn-error", role: "alert" }, h("strong", { text: "This deep dive isn't set up correctly" }), ul));
      return;
    }

    var nb = story.notebook;
    var actions = opts.actions || BC_ACTIONS;
    var saveKey = "nb:" + story.id;
    function fresh() { return { slide: 0, question: "", custom: "", spotted: [], checked: false, visited: [], shared: false, peek: false, asked: false, done: false }; }
    var state = Object.assign(fresh(), store.get(saveKey) || {});
    function save() { store.set(saveKey, state); }

    emit("opened");

    // ----- optional community tally -----
    var community = opts.community || null;
    var tally = null, communityEl = null;
    var MIN_READERS = 3;
    if (community && typeof community.subscribe === "function") {
      community.subscribe(story.id, function (t) { tally = t; drawCommunity(); });
    }
    function askIndex() { return null; }

    function drawCommunity() {
      if (!communityEl) return;
      var t = tally || { status: "loading" };
      communityEl.innerHTML = "";
      communityEl.appendChild(h("h4", { class: "rn-sub", text: "What others flagged" }));
      var canShare = t.canShare !== false && typeof community.share === "function";
      function shareBtn(text, cls) {
        return h("button", { class: "rn-btn" + (cls ? " " + cls : ""), type: "button", text: text, disabled: !canShare,
          onclick: function () {
            var b = this; b.disabled = true; b.textContent = "Adding…";
            community.share(story.id, { q: askIndex(), spotted: state.spotted.slice().sort(function (a, b) { return a - b; }) })
              .then(function () { state.shared = true; save(); emit("shared"); drawCommunity(); },
                    function () { b.disabled = false; b.textContent = "Couldn't add your picks. Try again"; });
          } });
      }
      if (t.status === "unavailable") { communityEl.appendChild(h("p", { class: "rn-hint", text: "Comparing with other readers isn't available here yet." })); return; }
      if (!state.shared && !state.peek) {
                communityEl.appendChild(h("p", { class: "rn-hint", text: "Add yours anonymously. Only the options you tapped are counted: never anything you type, and never your name." }));
        communityEl.appendChild(h("div", { class: "rn-nav" }, shareBtn("Add my picks & compare"),
          h("button", { class: "rn-btn rn-ghost", type: "button", text: "Just show me", onclick: function () { state.peek = true; save(); drawCommunity(); } })));
        return;
      }
      if (t.status === "loading") { communityEl.appendChild(h("p", { class: "rn-hint", text: "Loading reader picks…" })); return; }
      if (t.status === "error") { communityEl.appendChild(h("p", { class: "rn-hint", text: "Reader picks can't be reached right now. Everything else still works." })); return; }
      if (t.readers < MIN_READERS) {
        var so = t.readers === 0 ? "No one has added picks yet." : (t.readers === 1 ? "1 reader has" : t.readers + " readers have") + " added picks so far.";
        communityEl.appendChild(h("p", { class: "rn-hint", text: so + " Totals appear once " + MIN_READERS + " people have, so no one's choices can be singled out." }));
        if (!state.shared) communityEl.appendChild(h("div", { class: "rn-nav" }, shareBtn("Add mine", "rn-ghost")));
        return;
      }
      communityEl.appendChild(h("p", { class: "rn-hint", text: t.readers + " readers · how many flagged each one as missing" }));
      var bars = h("div", { class: "rn-bars" });
      nb.spot.forEach(function (s, i) {
        var pct = Math.round(100 * ((t.spot && t.spot[i]) || 0) / t.readers);
        var fill = h("i", { class: "rn-barfill rn-fill-" + s.status }); fill.style.width = pct + "%";
        bars.appendChild(h("div", { class: "rn-barrow" },
          h("div", { class: "rn-barlabel" }, h("span", { text: s.label }), h("span", { class: "rn-pct", text: pct + "%" })),
          h("div", { class: "rn-bartrack", role: "img", "aria-label": pct + "% of readers flagged " + s.label }, fill)));
      });
      communityEl.appendChild(bars);
      var best = null, bestN = 0;
      Object.keys(t.ask || {}).forEach(function (k) { if (k !== "null" && t.ask[k] > bestN) { bestN = t.ask[k]; best = k; } });
      if (best !== null) {
        var qtext = best === "own" ? "Writing their own question" : nb.ask[+best];
        if (qtext) communityEl.appendChild(h("p", { class: "rn-hint" }, "Most common question: ", h("strong", { text: qtext }), " (" + Math.round(100 * bestN / t.readers) + "%)"));
      }
      if (!state.shared) communityEl.appendChild(h("div", { class: "rn-nav" }, shareBtn("Add mine too", "rn-ghost")));
    }

    // ----- cards -----
    function cardMissing() {
      var c = h("div", { class: "rn-card" });
      c.appendChild(h("h3", { class: "rn-title", text: "What's missing?" }));
      if (!state.checked) {
        c.appendChild(h("p", { class: "rn-lede", text: "Now the gaps. Tap anything you'd want to know that the source might not say." }));
        var chips = h("div", { class: "rn-spot" });
        nb.spot.forEach(function (s, i) {
          var picked = state.spotted.indexOf(i) > -1;
          chips.appendChild(h("button", { type: "button", class: "rn-chip", "aria-pressed": String(picked), text: s.label,
            onclick: function () { if (picked) state.spotted.splice(state.spotted.indexOf(i), 1); else state.spotted.push(i); save(); rerender(); } }));
        });
        c.appendChild(chips);
        c.appendChild(h("div", { class: "rn-nav" }, h("button", { class: "rn-btn", type: "button", text: "Check against the source",
          onclick: function () { state.checked = true; save(); emit("spotted", { picked: state.spotted.length }); rerender(); } })));
      } else {
        var counts = { yes: 0, partly: 0, no: 0 };
        nb.spot.forEach(function (s) { counts[s.status]++; });
        c.appendChild(h("p", { class: "rn-lede", text: "Here's what the source covers. Tap any row for details." }));
        var list = h("div", { class: "rn-results" });
        nb.spot.forEach(function (s, i) {
          var picked = state.spotted.indexOf(i) > -1;
          list.appendChild(h("details", { class: "rn-row rn-" + s.status },
            h("summary", null,
              h("span", { class: "rn-dotmark", "aria-hidden": "true" }),
              h("span", { class: "rn-row-label" }, s.label, picked ? h("span", { class: "rn-you", text: " · you flagged" }) : null),
              h("span", { class: "rn-badge", text: STATUS_LABEL[s.status] })),
            h("p", { text: s.note })));
        });
        c.appendChild(list);
      }
      return c;
    }

    function cardGiven() {
      var c = h("div", { class: "rn-card" });
      c.appendChild(h("h3", { class: "rn-title", text: "What we're given" }));
      c.appendChild(h("p", { class: "rn-lede", text: "Start with what the source actually tells you." }));
      var ul = h("ul", { class: "rn-established" });
      nb.established.forEach(function (t) { ul.appendChild(h("li", { text: t })); });
      c.appendChild(ul);
      return c;
    }

    function cardOverview() {
      var c = h("div", { class: "rn-card" });
      c.appendChild(h("h3", { class: "rn-title", text: "Overview" }));
      var n = nb.spot.length, yes = 0, partly = 0;
      nb.spot.forEach(function (s) { if (s.status === "yes") yes++; if (s.status === "partly") partly++; });
      var mine = state.spotted.length;
      c.appendChild(h("p", { class: "rn-lede", text: "This source fully answers " + yes + " of " + n + " key questions" + (partly ? ", and partly answers " + partly : "") + "." +
        (state.checked ? (mine ? " You flagged " + mine + "." : "") : " Go back one card to check the gaps yourself.") }));

      c.appendChild(h("h4", { class: "rn-sub", text: "Questions worth asking" }));
      var qs = h("ul", { class: "rn-qs" });
      nb.ask.forEach(function (q) { qs.appendChild(h("li", { text: q })); });
      c.appendChild(qs);

      if (community) { communityEl = h("div", { class: "rn-community" }); c.appendChild(communityEl); }

      c.appendChild(h("h4", { class: "rn-sub", text: "Where answers live" }));
      var list = h("div", { class: "rn-find" });
      function linkRow(f, key) {
        var seen = state.visited.indexOf(key) > -1;
        return h("a", { class: "rn-link" + (seen ? " seen" : ""), href: f.url, target: "_blank", rel: "noopener",
          onclick: function () { if (state.visited.indexOf(key) < 0) { state.visited.push(key); save(); emit("found", { url: f.url }); } } },
          h("strong", { text: f.label + " ↗" }), h("span", { text: f.look }));
      }
      nb.find.forEach(function (f, i) { list.appendChild(linkRow(f, "f" + i)); });
      c.appendChild(list);
      var more = h("details", { class: "rn-more" }, h("summary", { text: "More ways to take part" }));
      var ml = h("div", { class: "rn-find" });
      actions.forEach(function (f, i) { ml.appendChild(linkRow(f, "a" + i)); });
      more.appendChild(ml);
      c.appendChild(more);
      c.appendChild(h("p", { class: "rn-hint", text: "Gaps are normal. Most answers show up later, in debates, budgets or records. You don't have to find them all." }));
      return c;
    }

    // ----- carousel -----
    var builders = [cardGiven, cardMissing, cardOverview];
    var labels = ["What we're given", "What's missing?", "Overview"];

    var root = h("section", { class: "rn", "aria-label": "What's missing? Deep dive" });
    container.innerHTML = "";
    container.appendChild(root);
    var track = h("div", { class: "rn-track", tabindex: "0", "aria-roledescription": "carousel" });
    var dots = h("div", { class: "rn-dots", role: "tablist", "aria-label": "Cards" });
    var prevBtn = h("button", { class: "rn-back", type: "button", text: "Back", onclick: function () { go(state.slide - 1); } });
    var nextBtn = h("button", { class: "rn-next", type: "button", onclick: function () {
      if (state.slide === builders.length - 1) { if (typeof opts.onDone === "function") opts.onDone(); }
      else go(state.slide + 1);
    } });
    root.appendChild(track);
    root.appendChild(h("div", { class: "rn-controls" }, prevBtn, dots, nextBtn));

    function fitHeight() {
      var slide = track.children[state.slide];
      if (slide) track.style.height = slide.scrollHeight + "px";
    }
    function go(i, smooth) {
      i = Math.max(0, Math.min(builders.length - 1, i));
      var target = i * track.clientWidth;
      track.scrollTo({ left: target, behavior: smooth === false ? "auto" : "smooth" });
      setSlide(i);
      // safety net: if anything interrupted the animation, land exactly on the card
      setTimeout(function () { if (Math.abs(track.scrollLeft - target) > 2 && state.slide === i) { track.style.scrollBehavior = "auto"; track.scrollLeft = target; track.style.scrollBehavior = ""; } }, 650);
    }
    function setSlide(i) {
      if (i === state.slide && dots.children.length) { markDots(); fitHeight(); return; }
      state.slide = i; save(); markDots(); fitHeight();
      if (i === builders.length - 1 && !state.done) { state.done = true; save(); emit("completed"); }
    }
    function markDots() {
      [].forEach.call(dots.children, function (d, j) { d.setAttribute("aria-selected", String(j === state.slide)); });
      prevBtn.style.visibility = state.slide === 0 ? "hidden" : "visible";
      var last = state.slide === builders.length - 1;
      nextBtn.textContent = last ? "Done" : "Next: " + labels[state.slide + 1] + " →";
    }

    function rerender() {
      var keep = state.slide;
      var scroll = track.scrollLeft;
      track.innerHTML = "";
      dots.innerHTML = "";
      communityEl = null;
      builders.forEach(function (b, i) {
        var slide = h("div", { class: "rn-slide", role: "group", "aria-roledescription": "card", "aria-label": (i + 1) + " of " + builders.length + ": " + labels[i] });
        slide.appendChild(b());
        track.appendChild(slide);
        dots.appendChild(h("button", { class: "rn-dot", type: "button", role: "tab", "aria-label": labels[i], onclick: function () { go(i); } }));
      });
      drawCommunity();
      // restore position instantly (a smooth restore can fight the next swipe and stop between cards)
      track.style.scrollBehavior = "auto";
      track.scrollLeft = scroll;
      track.style.scrollBehavior = "";
      state.slide = keep;
      markDots();
      fitHeight();
    }

    // Update the current card only once scrolling settles, so swipes and arrow taps never land mid-way.
    var settle = null;
    track.addEventListener("scroll", function () {
      clearTimeout(settle);
      settle = setTimeout(function () {
        var w = track.clientWidth || 1;
        var i = Math.round(track.scrollLeft / w);
        if (i !== state.slide) setSlide(i);
      }, 120);
    });
    // If the card width changes (rotating a phone, a scrollbar appearing), stay exactly on the current card.
    var lastW = 0;
    function resnap() {
      var w = track.clientWidth;
      if (w && w !== lastW) { lastW = w; track.style.scrollBehavior = "auto"; track.scrollLeft = state.slide * w; track.style.scrollBehavior = ""; }
      fitHeight();
    }
    if (typeof ResizeObserver === "function") new ResizeObserver(resnap).observe(track);
    window.addEventListener("resize", resnap);
    track.addEventListener("toggle", fitHeight, true); // expanding a row changes the card height
    track.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); go(state.slide + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); go(state.slide - 1); }
    });

    rerender();
    requestAnimationFrame(function () { go(state.slide, false); });
  }

  /*
   * mountButton: the entry point. A single "What's missing?" call to action;
   * the swipeable cards open only when tapped.
   */
  function mountButton(container, story, opts) {
    opts = opts || {};
    if (typeof opts.onMetrics === "function") metricsListener = opts.onMetrics;
    var label = opts.label || "What's missing?";
    if (!shownThisLoad[story.id]) { shownThisLoad[story.id] = true; bump(story.id, "shown"); }
    var panel = h("div", { class: "rn-panel", hidden: true, id: "rn-panel-" + story.id });
    var main = h("span", { text: label });
    var btn = h("button", { type: "button", class: "rn-cta", "aria-expanded": "false", "aria-controls": panel.id,
      onclick: function () {
        var open = panel.hidden;
        panel.hidden = !open;
        btn.setAttribute("aria-expanded", String(open));
        main.textContent = open ? "Hide" : label;
        btn.classList.toggle("open", open);
        if (open && !panel.firstChild) mount(panel, story, Object.assign({}, opts, { onDone: function () {
          panel.hidden = true; btn.setAttribute("aria-expanded", "false"); btn.classList.remove("open");
          btn.classList.add("done"); main.textContent = label;
          btn.scrollIntoView({ behavior: "smooth", block: "center" }); btn.focus({ preventScroll: true });
        } }));
        if (open) requestAnimationFrame(function () { panel.scrollIntoView({ behavior: "smooth", block: "nearest" }); });
      } }, h("span", { class: "rn-cta-icon", "aria-hidden": "true", text: "?" }), main);
    container.innerHTML = "";
    container.appendChild(btn);
    container.appendChild(panel);
  }

  global.ReporterNotebook = global.WhatsMissing = {
    mount: mount,
    mountButton: mountButton,
    validate: validate,
    metrics: function () { return store.get("metrics") || {}; },
    resetMetrics: function () { store.set("metrics", {}); },
    STAGES: STAGES,
    BC_ACTIONS: BC_ACTIONS
  };
})(window);
