# Fine Print News: launch it as a website

## What's in this folder

| File | What it is | Changes daily? |
|---|---|---|
| `index.html` | The website | No |
| `whats-missing.js` / `.css` | The "What's missing?" deep dive | No |
| `data/stories.js` | **All the news content**: top stories, all updates, last-updated time | **Yes, only this file** |
| `manifest.webmanifest`, `sw.js`, `icons/` | Lets phones install it like an app and open it offline | No |
| `PRIVACY.html`, `TERMS.html`, `LICENSE.txt`, `NOTICES.txt` | Your policies (fill in the placeholders) | Rarely |
| `legal-templates/` | Editable drafts of the policies and a contributor agreement | Rarely |

---

## Option A: online in 5 minutes (manual updates)
Best for showing people and testing.

1. Unzip this folder on a computer.
2. Go to **app.netlify.com/drop** and make a free Netlify account.
3. Drag the whole **fine-print-news** folder onto the page.
4. You get a live link like `something.netlify.app`. Rename it in **Site settings**, e.g. `fineprintnews.netlify.app`.

**To update:** replace `data/stories.js` with the new one, then drag the folder onto your site's **Deploys** page again.

## Option B: updates itself every morning (recommended)
The morning refresh writes the new `data/stories.js` straight to your website, so you never re-upload anything.

1. Make a free account at **github.com**.
2. Create a new repository named `fine-print-news`. Set it to **Public**, which free GitHub Pages hosting needs.
3. Click **Add file → Upload files**, drag in everything inside this folder, and click **Commit changes**.
4. Go to **Settings → Pages**. Under "Branch," pick **main** and **/(root)**, then **Save**. In a minute or two your site is live at `yourname.github.io/fine-print-news`.
5. Tell Claude the repository name. Claude connects it to the morning refresh, which then updates `data/stories.js` there each day. The site picks it up within a few minutes.

You can also connect GitHub to Netlify (**Add new site → Import from GitHub**) if you prefer Netlify's hosting. It deploys automatically on every update.

## Connect fineprintnews.ca (GoDaddy)
Keep the domain at GoDaddy and point it to your free Netlify site.

**In Netlify:** open your site, go to **Domain management → Add a domain**, type `fineprintnews.ca`, and confirm. Netlify then shows the records to add.

**In GoDaddy:**
1. Sign in, open **Domain Portfolio**, and select **fineprintnews.ca**.
2. Open the **DNS** tab.
3. Edit the **A** record named **@**. Set the Value to `75.2.60.5`, then **Save**. If there's more than one A record named @, delete the extras.
4. Edit the **CNAME** record named **www**. Set the Value to your Netlify address (for example `fineprintnews.netlify.app`), then **Save**.
5. If GoDaddy has **Forwarding** turned on for the domain, turn it off.

Changes usually work within an hour, and can take up to 48 hours. Netlify then adds the secure padlock (HTTPS) automatically.

**Using GitHub Pages instead?** The `CNAME` file in this folder already contains `fineprintnews.ca`. Enter the domain under **Settings → Pages → Custom domain**, and follow GitHub's instructions for the GoDaddy records.

## Install on a phone
- **iPhone (Safari):** Share → Add to Home Screen.
- **Android (Chrome):** ⋮ → Install app.

## What works differently from the Claude version
- **"What others flagged"** (anonymous reader totals) and the **usage counts** need a small backend once the site is public. Until then, they're hidden automatically.
- Everything else works the same.

## Before you share it publicly
1. Fill in your legal name and contact email in `LICENSE.txt`, `NOTICES.txt`, `PRIVACY.html` and `TERMS.html`.
2. Send the permission requests to the Province of BC and Elections BC, and record the answers in `NOTICES.txt`. Government of Canada content is fine for non-commercial use.
3. Have the privacy policy and terms reviewed.
