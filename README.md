# The Moody Tickler — setup guide

This is a small static website (built with Eleventy) plus a content
editor (Decap CMS) so you can write and publish new stories without
touching code after today's setup. It takes about 15-20 minutes to
wire up, once.

## What you're setting up, in plain terms

- **GitHub**: stores your site's files and every story you write, like
  a version-controlled filing cabinet.
- **Netlify**: watches that GitHub repo, builds the site, hosts it,
  and points your domain at it. Also runs the login for your editor.
- **Decap CMS**: the actual "write a new story" screen, at
  `yoursite.com/admin`. It saves directly into GitHub for you — you
  never see GitHub day-to-day.

## One-time setup

### 1. Create a GitHub repository

1. Go to github.com and sign in (or create a free account).
2. Create a new repository, e.g. `moody-tickler`. Keep it private or
   public, either is fine.
3. Upload every file and folder from this project into that repository
   (drag-and-drop works fine on GitHub's web UI for a first upload, or
   use GitHub Desktop if you'd rather not use the command line).

### 2. Connect Netlify

1. Go to netlify.com and sign up (free tier is enough for this).
2. Click "Add a new site" → "Import an existing project" → connect
   your GitHub account → choose the `moody-tickler` repo.
3. Netlify should auto-detect the build settings from `netlify.toml`
   in this project (build command `npx @11ty/eleventy`, publish
   folder `_site`). Confirm and deploy.
4. After a minute or two you'll get a live URL like
   `random-name-123.netlify.app`. Open it and confirm the site looks
   right.

### 3. Turn on the editor (Netlify Identity + Git Gateway)

1. In your Netlify site dashboard, go to **Site configuration → Identity**
   and click "Enable Identity."
2. Under Identity settings, set **Registration** to "Invite only" (so
   random people can't sign themselves up to write for your paper).
3. Go to **Identity → Services → Git Gateway** and enable it. This is
   what lets the editor save directly into your GitHub repo without
   you managing separate GitHub logins for every writer.
4. Still under Identity, invite yourself: click "Invite users," enter
   your own email, and accept the invite email that arrives.
5. Visit `yoursite.netlify.app/admin` and log in. You should see the
   "Stories" and "Site Settings" screens.

### 4. Connect your domain, themoodytickler.ca

1. In the Netlify dashboard, go to **Domain management → Add a domain**
   and enter `themoodytickler.ca`.
2. Netlify will show you DNS records to add. Go to wherever you
   registered the domain (your registrar's dashboard) and either:
   - point the domain's nameservers at Netlify (Netlify's preferred,
     simplest option), or
   - add the specific A/CNAME records Netlify shows you, if you'd
     rather keep your domain's DNS where it is.
3. DNS changes can take anywhere from a few minutes to a few hours to
   take effect. Netlify will also offer a free HTTPS certificate once
   the domain is verified — accept that so the site loads securely.

That's it. From here on:

## Writing a new story

1. Go to `themoodytickler.ca/admin` and log in.
2. Click "Stories" → "New Story."
3. Fill in the title, category, byline, date, an optional photo, a
   one-line teaser, and the story itself.
4. Tick "Feature on the front page" if you want this one to be the
   lead story (only tick it on one story at a time — the newest one
   you've ticked wins).
5. Click "Publish." Netlify rebuilds the site automatically —
   usually live within a minute.

## Editing the masthead tagline or issue line

Go to `/admin` → "Site Settings" → "Masthead & Footer." Same
publish button, same auto-rebuild.

## About images

Every story has an optional photo field. Uploaded photos are stored
in the repo under `src/images/uploads/` and served at
`/images/uploads/...`. There's room for exactly one photo per story
right now (shown above the teaser and again at the top of the full
story) — if you want a photo gallery or multiple images per story
later, that's a template change I can make for you.

## If you'd rather not do this yourself

Every step above (GitHub, Netlify, DNS) can be done by anyone with
access to your domain registrar's login — a friend, or a freelancer,
if you'd rather hand off the one-time setup and just use the `/admin`
screen afterward yourself.
