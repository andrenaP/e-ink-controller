# E-Ink Screenshot Project

This project allows you to take screenshots of websites and display them on an E-Ink screen using Puppeteer and Firefox.

## Features

- Capture screenshots of websites using Puppeteer.
- Navigate, click, and interact with web pages before capturing screenshots.
- Display the screenshots.

## Prerequisites

- **Node.js** (version 18 or later)
- **Firefox** (installed on your system)
- **timg** (installed on your system)

## Setup

**Install Dependencies**

```bash
npm i
```

**Configure Firefox**

Ensure you have the correct path for your Firefox profile in .env or you can path it in docker:

```bash
FIREFOX_PATH_LOCAL='Here is path to you firefox profile'
```

**Run**

```bash
npm start
```

## Docker

**Build the project**
```
docker build -t einkviewer .
```

**Then run it.**

```docker
docker run -ti --rm -e FIREFOX_PATH_LOCAL="your-path-to-profile" einkviewer npm start
```

## Commands

- `navigate [URL]` - Navigate to a URL.
- `click [CSS_SELECTOR]` - Click an element by its CSS selector.
- `screenshot [NAME]` - Capture a screenshot in **PNG** and save it with the specified name.
- `pageup` - Scroll up by one full page.
- `pagedown` - Scroll down by one full page.
- `move [+-<px>]` - Scroll by a specific number of pixels.
- `exit` - Close the browser and exit.

## License

MIT License

---

This version is focused on capturing and displaying screenshots, as per your requirements!
