const puppeteer = require("puppeteer");
const readline = require("readline");
const path = require("path");
require("dotenv").config();

//console.log(process.env);
const Profile = path.resolve(process.env.FIREFOX_PATH_LOCAL);
console.log("Loading Profile from:", Profile);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Helper function for terminal input
const askQuestion = (query) =>
  new Promise((resolve) => rl.question(query, resolve));

(async () => {
  // Launch the browser with Firefox
  const browser = await puppeteer.launch({
    product: "firefox", // Use Firefox
    browser: "firefox", // Use Firefox
    headless: true, // Disable headless mode for GUI
    userDataDir: Profile,

    // executablePath: "/usr/bin/firefox", // Adjust the path to your Firefox binary
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-gpu",
      // `--load-extension=${extensionPath}`,
      // `--disable-extensions-except=${extensionPath}`,
      `-P "${Profile}"`, // Path to the preconfigured Firefox profile
    ], // For compatibility
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 600 }); // Match e-ink display resolution

  console.log("Browser launched. Enter commands to control it.");

  // Main interaction loop
  let isRunning = true;
  while (isRunning) {
    const command = await askQuestion(`
Commands:
  1. navigate [URL]        - Go to a specific URL (e.g., "navigate https://example.com").
  2. click [CSS_SELECTOR]   - Click an element by its CSS selector (e.g., "click a.nextchap").
  3. screenshot [NAME]      - Take a screenshot and save it with a name (e.g., "screenshot page1.png").
  4. pageup                 - Scroll the page up by one full page.
  5. pagedown               - Scroll the page down by one full page.
  6. move [+-<px>]          - Scroll the page by a specific number of pixels (e.g., "move +200" or "move -200").
  7. exit                   - Close the browser and exit the app.
Your command: `);

    // Split command into parts
    const [action, ...args] = command.split(" ");

    try {
      switch (action) {
        case "navigate": {
          const url = args.join(" ");
          if (!url) {
            console.log("Error: Please provide a URL.");
          } else {
            console.log(`Navigating to: ${url}`);
            await page.goto(url, { waitUntil: "networkidle2" });
            console.log("Navigation complete.");
          }
          break;
        }

        case "click": {
          const selector = args.join(" ");
          if (!selector) {
            console.log("Error: Please provide a CSS selector.");
          } else {
            console.log(`Clicking element: ${selector}`);
            await page.click(selector);
            console.log("Click action complete.");
          }
          break;
        }

        case "screenshot": {
          const fileName = args.join(" ") || "screenshot.png";
          console.log(`Taking a screenshot: ${fileName}`);
          await page.screenshot({ path: fileName });
          console.log(`Screenshot saved as ${fileName}`);
          break;
        }

        case "pageup": {
          console.log("Scrolling page up by one full page.");
          await page.keyboard.press("PageUp");
          console.log("Page scrolled up.");
          break;
        }

        case "pagedown": {
          console.log("Scrolling page down by one full page.");
          await page.keyboard.press("PageDown");
          console.log("Page scrolled down.");
          break;
        }

        case "move": {
          const px = parseInt(args.join(" "), 10);
          if (isNaN(px)) {
            console.log("Error: Please provide a valid number of pixels.");
          } else {
            console.log(`Scrolling by ${px} pixels.`);
            await page.evaluate((px) => {
              window.scrollBy(0, px);
            }, px);
            console.log(`Page scrolled by ${px} pixels.`);
          }
          break;
        }

        case "exit": {
          console.log("Closing browser and exiting...");
          isRunning = false;
          break;
        }

        default: {
          console.log("Error: Unknown command. Try again.");
          break;
        }
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  }

  // Clean up
  await browser.close();
  rl.close();
})();
