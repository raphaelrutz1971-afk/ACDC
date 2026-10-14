import { defineConfig, devices } from "@playwright/test";

const PORT = 3200;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  reporter: "list",
  use: { baseURL: `http://localhost:${PORT}` },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], launchOptions: { executablePath: process.env.CHROMIUM_PATH } } },
    { name: "mobile", use: { ...devices["Pixel 7"], launchOptions: { executablePath: process.env.CHROMIUM_PATH } } },
  ],
  webServer: {
    command: `npm run start -- -p ${PORT}`,
    url: `http://localhost:${PORT}/de`,
    reuseExistingServer: !process.env.CI,
    // Ensure the "not configured" path is tested regardless of local .env files.
    env: { SMTP_HOST: "", SMTP_USER: "", SMTP_PASS: "", CONTACT_TO: "" },
  },
});
