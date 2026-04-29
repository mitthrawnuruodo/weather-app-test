# Weather App Test

A proof of concept for keeping an API key out of a frontend repo, using a Netlify serverless function as a proxy.

The browser never sees the API key. It only calls the Netlify function, which calls the OpenWeatherMap API server-side and returns the result.

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- A Netlify account (free) at [netlify.com](https://www.netlify.com/)
- An OpenWeatherMap API key (free) - see below

---

## Get an OpenWeatherMap API key

1. Sign up for a free account at [openweathermap.org](https://openweathermap.org/)
2. Go to your profile > API keys
3. Copy the default key, or generate a new one
4. Note: new keys can take up to a few hours to activate

---

## Install Netlify CLI

Install globally on your machine (one-time setup):

```bash
npm install -g netlify-cli
```

---

## Set up the project locally

If you are cloning this repo:

```bash
git clone <repo-url>
cd weather-app-test
```

Create a `.env` file in the root of the project:

```bash
touch .env
```

Add your API key to `.env`:

```
OPENWEATHER_API_KEY=your_key_here
```

This file is listed in `.gitignore` and will never be committed to the repo.

---

## Run locally

```bash
netlify dev
```

This will:
- Read your `.env` file and inject the variables into the function environment
- Serve your static files
- Make your function available at `/.netlify/functions/fetch-weather`

Open [http://localhost:8888](http://localhost:8888) in your browser.

---

## How it works

The frontend (`script.js`) calls the Netlify function:

```
/.netlify/functions/fetch-weather?city=Bergen
```

The function (`netlify/functions/fetch-weather.js`) reads `OPENWEATHER_API_KEY` from the environment, calls the OpenWeatherMap API server-side, and returns the result. The API key is never sent to the browser.

---

## Deploy to Netlify

### Connect the repo

1. Push the project to a GitHub repo
2. Go to [app.netlify.com](https://app.netlify.com/) and click "Add new site"
3. Choose "Import an existing project" and connect your GitHub repo
4. Netlify will detect `netlify.toml` automatically - no build settings needed

### Add the API key in the Netlify dashboard

1. Go to your site > Site configuration > Environment variables
2. Click "Add a variable"
3. Key: `OPENWEATHER_API_KEY` - Value: your actual key
4. Save, then redeploy the site (Netlify > Deploys > Trigger deploy)

The function will now run on Netlify's servers in production, with the key injected from the dashboard - same pattern as local development, just without the `.env` file.

### Live demo

A deployed version of this project is available at [verdant-figolla-482aaa.netlify.app](https://verdant-figolla-482aaa.netlify.app/). This is the same code as in the repo, with the API key stored as an environment variable in the Netlify dashboard - not in the code.

---

## Project structure

```
weather-app-test/
  netlify/
    functions/
      fetch-weather.js  - serverless function (runs server-side)
  index.html            - markup
  script.js             - frontend logic (runs in the browser)
  netlify.toml          - tells Netlify where the functions and static files are
  .env                  - your local API key (not committed)
  .gitignore
  README.md
```

---

## Note

`node-fetch` is no longer needed. Native `fetch` has been available in Node since v18, so it is removed from the code. Since it was the only dependency - and Netlify CLI is installed globally - `package.json` can be removed from the project entirely.