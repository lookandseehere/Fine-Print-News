/*
 * © 2026 Fine Print News. All rights reserved. See LICENSE.txt.
 *
 * Fine Print News content. This is the only file the daily update changes.
 *   NOTEBOOK_STORIES  top stories with "What's missing?" deep dives (scope: "canada" or "bc")
 *   NEWS_UPDATES      every release, one line each, newest first
 *   LAST_UPDATED      when this file was last refreshed (ISO time with offset)
 * Write every headline, fact and note in your own words, and check them against the linked source.
 */
window.NOTEBOOK_STORIES = [
  {
    id: "count",
    scope: "bc",
    tag: "Elections",
    facts: ["Conservative Party leads in 64 districts, BC NDP in 27, BC Green in 2.", "Preliminary turnout now 51.51%: 1,925,638 votes considered out of 3,738,182 registered voters.", "Final count still in progress as of Nov 7; results aren't final yet."],
    title: "Final count under way: Conservatives leading in 64 of 93 districts",
    agency: "Elections BC",
    date: "Nov 7, 2026",
    source: "https://results.elections.bc.ca/",
    notebook: {
      role: "You're at Elections BC's media briefing on the vote count.",
      ask: [
        "When will results be final, and what could still change before then?",
        "How many ballots are still left to count?",
        "Why did only about half of registered voters cast a ballot?"
      ],
      spot: [
        { label: "When results become final", status: "yes",
          note: "The results page says final results come once the final count finishes in every district, but gives no completion date. Elections BC earlier listed the final count as planned for November 6 to 10." },
        { label: "Votes for each party", status: "yes",
          note: "Published for every party, with share of the vote, and broken down by district. As of November 7: Conservative Party 47.86%, BC NDP 37.46%, BC Green Party 11.12%." },
        { label: "How many ballots are left", status: "no",
          note: "The results page shows ballot boxes reporting and total votes considered, but not how many ballots remain." },
        { label: "Which close races could flip", status: "no",
          note: "District margins are visible, but Elections BC makes no predictions." },
        { label: "Why people voted as they did", status: "no",
          note: "Elections BC reports counts only. As a non-partisan office, explaining voter choices isn't its role." }
      ],
      established: [
        "Which party leads in each of the 93 districts right now",
        "Turnout of 51.51% of registered voters, as the count stood on November 7",
        "That the count is still in progress, so leads aren't final"
      ],
      find: [
        { label: "Elections BC: results by district", url: "https://results.elections.bc.ca/Results_11684_GE-2026-10-24_Party.html",
          look: "Margins in your own district as the final count runs" },
        { label: "Elections BC: 2026 election page", url: "https://elections.bc.ca/2026-provincial-election/",
          look: "Key dates, including when the final count ends" },
        { label: "Legislative Assembly of BC", url: "https://www.leg.bc.ca/",
          look: "When newly elected MLAs take their seats" }
      ]
    }
  },
  {
    id: "mining",
    scope: "bc",
    tag: "Economy",
    facts: ["Fixed permit timelines of 40, 90 or 140 days began in April 2026.", "The ministry reports all targets met in the first six months.", "Median approval time fell about 8%."],
    title: "Province says mineral-exploration permits are being approved faster under new process",
    agency: "Ministry of Mining and Critical Minerals",
    date: "Sept 22, 2026",
    source: "https://news.gov.bc.ca/releases/2026MCM0031-001120",
    notebook: {
      role: "You're at the minister's announcement on faster mining permits.",
      ask: [
        "What was the median approval time before the change, and what is it now?",
        "Which review steps changed, and did any get shorter or disappear?",
        "How did First Nations help shape the new timelines?"
      ],
      spot: [
        { label: "How much faster permits are", status: "yes",
          note: "Fixed targets of 40, 90 or 140 days depending on complexity. Several named projects were permitted in under 70 days, and median approval time fell about 8%." },
        { label: "The starting point for comparison", status: "no",
          note: "The 8% drop in median approval time is given without the original median, so the size of the change in days isn't stated." },
        { label: "Which review steps changed", status: "partly",
          note: "Describes better co-ordination, clearer application requirements and earlier consultation. It names no step that was removed." },
        { label: "First Nations consultation", status: "partly",
          note: "Called a cornerstone of permitting, with early consultation at the claim stage. It doesn't describe how Nations shaped the new timelines." },
        { label: "Environmental safeguards", status: "partly",
          note: "States the faster timelines don't mean lower standards, without describing specific safeguards." },
        { label: "Cost to taxpayers", status: "partly",
          note: "Budget 2026 set aside $2 million for the consultation framework. No other costs are given." },
        { label: "Outside verification of the results", status: "no",
          note: "The figures are reported by the ministry. No independent review is cited." }
      ],
      established: [
        "Fixed permitting timelines for exploration began in April 2026",
        "The ministry reports every target was met in the first six months",
        "$2 million in Budget 2026 supports the consultation framework"
      ],
      find: [
        { label: "The full news release", url: "https://news.gov.bc.ca/releases/2026MCM0031-001120",
          look: "The backgrounder, with permit counts and named projects" },
        { label: "Ministry of Mining and Critical Minerals news", url: "https://news.gov.bc.ca/ministries/mining-and-critical-minerals",
          look: "Earlier releases that may give the original approval times" },
        { label: "Legislative Assembly of BC", url: "https://www.leg.bc.ca/",
          look: "Debate transcripts (Hansard), where ministers answer MLAs' questions on their budgets" }
      ]
    }
  },
  {
    id: "schools",
    scope: "bc",
    tag: "Education",
    facts: ["23 new and improved schools are opening across B.C.", "City Centre Elementary in Richmond adds 315 seats.", "Alfred B. Dixon Elementary, a seismic replacement, completes in late fall 2026."],
    title: "B.C. opens 23 new and upgraded schools; two are in Richmond",
    agency: "Ministry of Infrastructure",
    date: "Sept 22, 2026",
    source: "https://news.gov.bc.ca/releases/2026INF0055-001104",
    notebook: {
      role: "You're at the Richmond school opening with the Minister of Infrastructure.",
      ask: [
        "What did all 23 schools cost in total?",
        "How many Richmond students are still learning in portables?",
        "Which school projects are still waiting for approval?"
      ],
      spot: [
        { label: "Cost of the Richmond projects", status: "yes",
          note: "Nearly $11 million for City Centre Elementary, over $31 million for Alfred B. Dixon and over $52 million for John Diefenbaker." },
        { label: "Seats added", status: "yes",
          note: "City Centre adds 315 new seats in 13 classrooms. Dixon provides 400 seismically safer seats." },
        { label: "Total cost of all 23 schools", status: "no",
          note: "Only individual Richmond project amounts and a district-wide commitment are given." },
        { label: "Enrolment growth", status: "no",
          note: "The release refers to Richmond's changing needs without enrolment numbers." },
        { label: "Portables still in use", status: "no",
          note: "Not mentioned." },
        { label: "Projects still waiting", status: "no",
          note: "Not mentioned. The release focuses on what opened or is under construction." }
      ],
      established: [
        "23 new and improved schools are opening across B.C.",
        "City Centre Elementary opened with 315 new seats",
        "Since 2017 the Province says it approved more than $7 billion for nearly 50,000 new student seats"
      ],
      find: [
        { label: "The full news release", url: "https://news.gov.bc.ca/releases/2026INF0055-001104",
          look: "Per-project funding and timelines" },
        { label: "BC Gov News factsheets", url: "https://news.gov.bc.ca/factsheets",
          look: "Backgrounders that sometimes list projects by district" },
        { label: "Legislative Assembly of BC", url: "https://www.leg.bc.ca/",
          look: "Hansard, where MLAs question ministers on capital spending" }
      ]
    }
  },
  {
    "id": "budget",
    "scope": "canada",
    "tag": "Economy",
    "title": "Budget 2026 plans $400 billion in capital investment and $22 billion for affordability",
    "agency": "Department of Finance Canada",
    "date": "Nov 5, 2026",
    "source": "https://www.canada.ca/en/department-finance/news/2026/11/government-of-canada-releases-budget-2026-masters-of-our-destiny.html",
    "facts": [
      "$400 billion in capital investment over six years and $22 billion in new affordability measures.",
      "Says growth in direct program spending drops from 8% to 2%.",
      "Says day-to-day operating spending balances with revenue by 2027-28."
    ],
    "notebook": {
      "role": "You're at the budget lock-up with the Minister of Finance.",
      "ask": [
        "What is the deficit this year and next?",
        "How will the new measures be paid for?",
        "When will the whole budget, not just operating spending, be balanced?"
      ],
      "spot": [
        {
          "label": "Affordability measures",
          "status": "yes",
          "note": "Lists an enhanced groceries and essentials benefit with a 2027 supplement, a fully refundable caregiver credit and support for 1 million home retrofits."
        },
        {
          "label": "Size of the deficit",
          "status": "no",
          "note": "Says the deficit-to-GDP ratio is on a declining path, but gives no deficit figure. The full budget document should have it."
        },
        {
          "label": "How it's paid for",
          "status": "no",
          "note": "Not explained in the release."
        },
        {
          "label": "When the budget balances",
          "status": "partly",
          "note": "Only day-to-day operating spending is set to balance, by 2027-28. No date is given for the overall budget."
        },
        {
          "label": "Cost per household",
          "status": "no",
          "note": "Not mentioned."
        },
        {
          "label": "Independent review",
          "status": "no",
          "note": "No Parliamentary Budget Officer assessment is cited."
        }
      ],
      "established": [
        "Budget 2026 was released November 5, 2026",
        "$400 billion in capital over six years and $22 billion in affordability measures",
        "A goal to balance operating spending with revenue by 2027-28"
      ],
      "find": [
        {
          "label": "The full news release",
          "url": "https://www.canada.ca/en/department-finance/news/2026/11/government-of-canada-releases-budget-2026-masters-of-our-destiny.html",
          "look": "Links to the full budget document, where deficit and debt figures are published"
        },
        {
          "label": "Parliamentary Budget Officer",
          "url": "https://www.pbo-dpb.ca/",
          "look": "Independent, nonpartisan analysis of federal budgets"
        },
        {
          "label": "House of Commons",
          "url": "https://www.ourcommons.ca/",
          "look": "Budget debates and committee hearings"
        }
      ]
    }
  },
  {
    "id": "byelections",
    "scope": "canada",
    "tag": "Elections",
    "title": "Six federal by-elections set for December 7",
    "agency": "Elections Canada",
    "date": "Nov 1, 2026",
    "source": "https://www.elections.ca/content.aspx?section=med&dir=pre&document=nov0126&lang=e",
    "facts": [
      "Voting day is Monday, December 7, in two Ontario, three Quebec and one Saskatchewan riding.",
      "Advance polls run November 27 to 30.",
      "Mail-in ballot applications close December 1 at 6 p.m."
    ],
    "notebook": {
      "role": "You're on a call with Elections Canada about the by-elections.",
      "ask": [
        "Who is running in my riding?",
        "Why are these six seats vacant?",
        "What will these by-elections cost?"
      ],
      "spot": [
        {
          "label": "Key voting dates",
          "status": "yes",
          "note": "Voting day December 7, advance polls November 27 to 30, and early voting at local offices until December 1 at 6 p.m."
        },
        {
          "label": "How to register",
          "status": "yes",
          "note": "Online at elections.ca, by phone at 1-800-463-6868, at the local office, or at your polling place."
        },
        {
          "label": "Who the candidates are",
          "status": "no",
          "note": "Not listed. The release only says local offices can explain how to become a candidate."
        },
        {
          "label": "Why the seats are empty",
          "status": "no",
          "note": "Not explained."
        },
        {
          "label": "What it costs",
          "status": "no",
          "note": "Not mentioned."
        }
      ],
      "established": [
        "The six ridings: Brantford–Brant South, Scarborough North, Laurier–Sainte-Marie, Rosemont–La Petite-Patrie, Saint-Hyacinthe–Bagot–Acton and Yorkton–Melville",
        "Voting day is December 7, with advance polls November 27 to 30",
        "Who can vote: citizens 18 or older living in the riding since November 1"
      ],
      "find": [
        {
          "label": "The full release",
          "url": "https://www.elections.ca/content.aspx?section=med&dir=pre&document=nov0126&lang=e",
          "look": "Every date and way to vote"
        },
        {
          "label": "Elections Canada: elections",
          "url": "https://www.elections.ca/content.aspx?section=ele&document=index&lang=e",
          "look": "Each riding's page, with candidates once confirmed"
        },
        {
          "label": "Example: Laurier–Sainte-Marie page",
          "url": "https://www.elections.ca/content.aspx?section=ele&dir=2026%2F24037&document=index&lang=e",
          "look": "What a riding page shows"
        }
      ]
    }
  },
  {
    "id": "homelessness",
    "scope": "canada",
    "tag": "Housing",
    "title": "Federal plan aims to end homelessness in 10 years, starting with Manitoba",
    "agency": "Prime Minister's Office",
    "date": "Nov 6, 2026",
    "source": "https://www.pm.gc.ca/en/news/news-releases/2026/11/06/prime-minister-carney-launches-plan-end-homelessness-within-10-years",
    "facts": [
      "Budget 2026 backs the plan with nearly $30 billion.",
      "Manitoba gets over $1 billion in new federal funding, including up to $800 million for more than 2,000 supportive and transitional homes.",
      "The release puts the number of people experiencing homelessness at about 65,000 in 2025."
    ],
    "notebook": {
      "role": "You're at the announcement in Winnipeg with the Prime Minister and Manitoba's premier.",
      "ask": [
        "How will we know when homelessness has ended?",
        "What will each province be expected to pay?",
        "Which province is next after Manitoba?"
      ],
      "spot": [
        {
          "label": "How many people are affected",
          "status": "yes",
          "note": "About 65,000 in 2025, nearly double 2018. Winnipeg counted 2,469 people in its last count."
        },
        {
          "label": "What “end homelessness” means",
          "status": "no",
          "note": "Not defined, and no measure of when it's achieved."
        },
        {
          "label": "Total cost over 10 years",
          "status": "partly",
          "note": "Gives nearly $30 billion, without a year-by-year breakdown or a 10-year total."
        },
        {
          "label": "Provinces' share of the cost",
          "status": "partly",
          "note": "Spelled out for Manitoba only. Elsewhere, provinces and territories fund operations, with no ratio given."
        },
        {
          "label": "How progress is tracked",
          "status": "partly",
          "note": "Communities will be expected to share better data. No reporting schedule or targets."
        },
        {
          "label": "Plans for other provinces",
          "status": "no",
          "note": "Invites willing partners, but names no other province."
        }
      ],
      "established": [
        "A 10-year goal backed by nearly $30 billion in Budget 2026",
        "Over $1 billion in new federal funding for Manitoba",
        "About 65,000 people experiencing homelessness in 2025, per the release"
      ],
      "find": [
        {
          "label": "The full news release",
          "url": "https://www.pm.gc.ca/en/news/news-releases/2026/11/06/prime-minister-carney-launches-plan-end-homelessness-within-10-years",
          "look": "Every funding stream and the Manitoba details"
        },
        {
          "label": "Housing minister's Calgary release",
          "url": "https://www.canada.ca/en/housing-infrastructure-communities/news/2026/11/minister-robertson-highlights-budget-2026s-plan-to-end-homelessness-within-10-years.html",
          "look": "The same plan, presented in Alberta"
        },
        {
          "label": "House of Commons",
          "url": "https://www.ourcommons.ca/",
          "look": "Committee hearings where ministers answer questions on spending"
        }
      ]
    }
  },
  {
    "id": "estimates",
    "scope": "canada",
    "tag": "Government",
    "title": "Government asks Parliament to approve $22.1 billion more in spending this year",
    "agency": "Treasury Board of Canada Secretariat",
    "date": "Nov 6, 2026",
    "source": "https://www.canada.ca/en/treasury-board-secretariat/news/2026/11/government-of-canada-outlines-additional-investments-in-defence-and-priority-services-through-supplementary-estimates-b-202627.html",
    "facts": [
      "Supplementary Estimates (B) seek $22.1 billion in new voted spending.",
      "Named areas include icebreakers, defence, child and dental care, housing, and tariff-affected sectors.",
      "Planned 2026–27 spending totals $538.3 billion, including these estimates."
    ],
    "notebook": {
      "role": "You're at the tabling of the estimates with the President of the Treasury Board.",
      "ask": [
        "How much of the $22.1 billion goes to defence?",
        "How does this change the deficit?",
        "When will Parliament vote on it?"
      ],
      "spot": [
        {
          "label": "Total amount requested",
          "status": "yes",
          "note": "$22.1 billion in new voted spending, tabled November 6."
        },
        {
          "label": "Amount for each item",
          "status": "no",
          "note": "Areas are named, but no dollar amount is given for any of them."
        },
        {
          "label": "Effect on the deficit",
          "status": "no",
          "note": "Not mentioned."
        },
        {
          "label": "How it's funded",
          "status": "no",
          "note": "Not mentioned."
        },
        {
          "label": "When Parliament votes",
          "status": "no",
          "note": "No committee review or vote timeline is described."
        }
      ],
      "established": [
        "$22.1 billion was tabled in the House of Commons on November 6",
        "Planned 2026–27 spending is $538.3 billion in total",
        "Amounts are spending limits; actual spending is reported later in the Public Accounts"
      ],
      "find": [
        {
          "label": "The full news release",
          "url": "https://www.canada.ca/en/treasury-board-secretariat/news/2026/11/government-of-canada-outlines-additional-investments-in-defence-and-priority-services-through-supplementary-estimates-b-202627.html",
          "look": "Links to the backgrounder with more detail"
        },
        {
          "label": "Parliamentary Budget Officer",
          "url": "https://www.pbo-dpb.ca/",
          "look": "Independent analysis of spending estimates"
        },
        {
          "label": "House of Commons",
          "url": "https://www.ourcommons.ca/",
          "look": "Where the estimates are reviewed and voted on"
        }
      ]
    }
  },
  {
    "id": "tfw",
    "scope": "canada",
    "tag": "Economy",
    "title": "Temporary Foreign Worker Program: longer approvals now, province-led limits proposed for 2027",
    "agency": "Employment and Social Development Canada",
    "date": "Nov 6, 2026",
    "source": "https://www.canada.ca/en/employment-social-development/news/2026/11/government-of-canada-announces-targeted-reforms-to-the-temporary-foreign-worker-program-to-respond-to-labour-market-needs.html",
    "facts": [
      "Low-wage stream LMIAs submitted from November 6 can last up to two years, up from one.",
      "Early childhood educators join the exceptions to the pause in areas with unemployment of 6% or higher.",
      "From March 1, 2027, provinces and territories that opt in could shape which jobs are open and raise the low-wage cap to 15% of a workforce, from 10%."
    ],
    "notebook": {
      "role": "You're at the announcement in Gatineau with the federal jobs and immigration ministers.",
      "ask": [
        "How many employers and workers will these changes affect?",
        "Which provinces and territories plan to opt in?",
        "How will the government measure whether the changes work?"
      ],
      "spot": [
        {
          "label": "What changes right away",
          "status": "yes",
          "note": "Low-wage LMIA applications submitted on or after November 6 can run up to two years, and early childhood educators are added to the priority-sector exceptions alongside healthcare, construction and food processing."
        },
        {
          "label": "How many people are affected",
          "status": "no",
          "note": "No count of affected workers or employers. It says temporary foreign workers make up about 1% of the labour force."
        },
        {
          "label": "Provinces' role",
          "status": "partly",
          "note": "Describes the opt-in model starting March 1, 2027, and says the minister will meet provincial and territorial counterparts in the coming weeks. No province is named as opting in."
        },
        {
          "label": "Cost",
          "status": "partly",
          "note": "Budget 2026 provides $151.5 million over five years for service delivery and $82 million over four years for the Migrant Worker Support Program. No overall cost of the changes is given."
        },
        {
          "label": "Worker protection and enforcement",
          "status": "yes",
          "note": "Describes employer inspections, penalties of up to $1 million per year, temporary or permanent bans, and support for workers to understand their rights."
        },
        {
          "label": "Extra permanent residence spaces",
          "status": "partly",
          "note": "Mentions a time-limited increase in Provincial Nominee Program spaces, without saying how many."
        },
        {
          "label": "How results will be measured",
          "status": "no",
          "note": "Says the government will monitor labour market conditions, but gives no evaluation plan or targets."
        }
      ],
      "established": [
        "Low-wage LMIAs submitted from November 6, 2026 can last up to two years",
        "Processing stays paused in areas with unemployment of 6% or higher, except in priority sectors",
        "Proposed opt-in changes would take effect March 1, 2027"
      ],
      "find": [
        {
          "label": "The full news release",
          "url": "https://www.canada.ca/en/employment-social-development/news/2026/11/government-of-canada-announces-targeted-reforms-to-the-temporary-foreign-worker-program-to-respond-to-labour-market-needs.html",
          "look": "Each change by type of area, and the enforcement rules"
        },
        {
          "label": "Budget 2026",
          "url": "https://budget.canada.ca/2026/home-accueil-en.html",
          "look": "The funding lines behind the program and worker-support money"
        },
        {
          "label": "House of Commons",
          "url": "https://www.ourcommons.ca/",
          "look": "Committee hearings where ministers answer questions on immigration and labour"
        }
      ]
    }
  }
];

/* Every update from the sources, newest first. "story" links to a top story with a deep dive. */
window.NEWS_UPDATES = [
  {
    "scope": "canada",
    "date": "Nov 7",
    "agency": "Environment and Climate Change Canada",
    "title": "Environment minister presents the homelessness plan in Toronto",
    "url": "https://www.canada.ca/en/environment-climate-change/news/2026/11/minister-dabrusin-highlights-budget-2026s-plan-to-end-homelessness-within-10-years.html"
  },
  {
    "scope": "canada",
    "date": "Nov 7",
    "agency": "Canada Mortgage and Housing Corporation",
    "title": "Over $14.9 million in federal funding for 48 rental homes in Regina for Indigenous women and their children",
    "url": "https://www.cmhc-schl.gc.ca/media-newsroom/news-releases/2026/regina-highlights-government-canadas-investments-from-budget-2026-masters-of-our-destiny"
  },
  {
    "scope": "canada",
    "date": "Nov 6",
    "agency": "Employment and Social Development Canada",
    "title": "Changes to the Temporary Foreign Worker Program, with more proposed for March 2027",
    "url": "https://www.canada.ca/en/employment-social-development/news/2026/11/government-of-canada-announces-targeted-reforms-to-the-temporary-foreign-worker-program-to-respond-to-labour-market-needs.html",
    "story": "tfw"
  },
  {
    "scope": "canada",
    "date": "Nov 6",
    "agency": "Treasury Board",
    "title": "$22.1 billion in added spending tabled in Parliament",
    "url": "https://www.canada.ca/en/treasury-board-secretariat/news/2026/11/government-of-canada-outlines-additional-investments-in-defence-and-priority-services-through-supplementary-estimates-b-202627.html",
    "story": "estimates"
  },
  {
    "scope": "canada",
    "date": "Nov 6",
    "agency": "Prime Minister's Office",
    "title": "10-year plan to end homelessness, starting with Manitoba",
    "url": "https://www.pm.gc.ca/en/news/news-releases/2026/11/06/prime-minister-carney-launches-plan-end-homelessness-within-10-years",
    "story": "homelessness"
  },
  {
    "scope": "canada",
    "date": "Nov 6",
    "agency": "Housing, Infrastructure and Communities",
    "title": "Housing minister presents the homelessness plan in Calgary",
    "url": "https://www.canada.ca/en/housing-infrastructure-communities/news/2026/11/minister-robertson-highlights-budget-2026s-plan-to-end-homelessness-within-10-years.html"
  },
  {
    "scope": "canada",
    "date": "Nov 6",
    "agency": "Global Affairs Canada",
    "title": "Canada and Austria issue joint statement on trade, the EU, Ukraine and the Western Balkans",
    "url": "https://www.canada.ca/en/global-affairs/news/2026/11/joint-statement-by-the-minister-of-foreign-affairs-of-canada-and-the-federal-minister-for-european-and-international-affairs-of-austria.html"
  },
  {
    "scope": "canada",
    "date": "Nov 5",
    "agency": "Department of Finance",
    "title": "Budget 2026 released",
    "url": "https://www.canada.ca/en/department-finance/news/2026/11/government-of-canada-releases-budget-2026-masters-of-our-destiny.html",
    "story": "budget"
  },
  {
    "scope": "canada",
    "date": "Nov 5",
    "agency": "Prime Minister's Office",
    "title": "Communiqué from the Commonwealth Heads of Government Meeting",
    "url": "https://www.pm.gc.ca/en/news/statements/2026/11/05/communique-commonwealth-heads-government-meeting-chogm-2026"
  },
  {
    "scope": "canada",
    "date": "Nov 5",
    "agency": "Prime Minister's Office",
    "title": "Statement for Veterans' Week",
    "url": "https://www.pm.gc.ca/en/news/statements/2026/11/05/statement-prime-minister-carney-veterans-week"
  },
  {
    "scope": "canada",
    "date": "Nov 4",
    "agency": "Prime Minister's Office",
    "title": "PM to attend four summits in Ireland, the Philippines, Cambodia and China, Nov 11–19",
    "url": "https://www.pm.gc.ca/en/news/news-releases/2026/11/04/prime-minister-carney-travel-europe-and-asia-diversify-canadas"
  },
  {
    "scope": "canada",
    "date": "Nov 3",
    "agency": "Prime Minister's Office",
    "title": "PM outlines new Commonwealth partnerships on trade, investment and climate",
    "url": "https://www.pm.gc.ca/en/news/news-releases/2026/11/03/prime-minister-carney-deepens-partnerships-commonwealth-nations"
  },
  {
    "scope": "canada",
    "date": "Nov 1",
    "agency": "Elections Canada",
    "title": "By-elections under way in six ridings",
    "url": "https://www.elections.ca/content.aspx?section=med&dir=pre&document=nov0126&lang=e",
    "story": "byelections"
  },
  {
    "scope": "canada",
    "date": "Nov 1",
    "agency": "Prime Minister's Office",
    "title": "PM calls six by-elections for December 7",
    "url": "https://www.pm.gc.ca/en/news/news-releases/2026/11/01/prime-minister-carney-announces-elections"
  },
  {
    "scope": "bc",
    "date": "Nov 7",
    "agency": "Elections BC",
    "title": "Final count continues; preliminary turnout now 51.51%",
    "url": "https://results.elections.bc.ca/",
    "story": "count"
  },
  {
    "scope": "bc",
    "date": "Oct 28",
    "agency": "BC Coroners Service",
    "title": "Inquest dates set into the death of Chase de Balinhard",
    "url": "https://news.gov.bc.ca/releases/2026PSSG0074-001132"
  }
];

/* When this content was last refreshed (ISO time with offset). Shown to readers in their own time zone. */
window.LAST_UPDATED = "2026-11-08T06:41:23-07:00";
