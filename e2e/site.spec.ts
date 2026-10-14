import { expect, test } from "@playwright/test";

test("root redirects to the browser language", async ({ page }) => {
  await page.setExtraHTTPHeaders({ "Accept-Language": "en-US,en;q=0.9" });
  await page.goto("/");
  await expect(page).toHaveURL(/\/en$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("language switch keeps the current page", async ({ page, isMobile }) => {
  await page.goto("/de/leistungen/steuern");
  if (isMobile) await page.getByRole("button", { name: "Menü öffnen" }).click();
  await page.getByRole("link", { name: "English" }).first().click();
  await expect(page).toHaveURL(/\/en\/leistungen\/steuern$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Taxes");
});

test("theme toggle switches and persists", async ({ page, isMobile }) => {
  await page.goto("/de");
  if (isMobile) await page.getByRole("button", { name: "Menü öffnen" }).click();
  await page.getByRole("radio", { name: "Dunkel" }).first().click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("deadline calendar responds to clicks and arrow keys", async ({ page }) => {
  await page.goto("/de");
  const panel = page.locator("#month-panel");
  await page.getByRole("tab", { name: /Januar/ }).click();
  await expect(panel.getByRole("heading", { name: "Januar" })).toBeVisible();
  await expect(panel).toContainText("Lohnausweise ausstellen");
  await page.keyboard.press("ArrowRight");
  await expect(panel.getByRole("heading", { name: "Februar" })).toBeVisible();
  await expect(page.getByRole("tab", { name: /Februar/ })).toBeFocused();
});

test("FAQ items expand and collapse", async ({ page }) => {
  await page.goto("/de");
  const q = page.getByRole("button", { name: /Revision/ });
  await q.click();
  await expect(q).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByText(/Opting-out/)).toBeVisible();
  await q.click();
  await expect(q).toHaveAttribute("aria-expanded", "false");
});

test("mobile menu opens, closes with Escape and navigates", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile only");
  await page.goto("/de");
  const toggle = page.getByRole("button", { name: "Menü öffnen" });
  await toggle.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await toggle.click();
  await dialog.getByRole("link", { name: "Kontakt" }).click();
  await expect(page).toHaveURL(/\/de\/kontakt$/);
  await expect(dialog).toBeHidden();
});

test("every service page renders and links back", async ({ page }) => {
  for (const slug of ["buchhaltung", "steuern", "lohn", "gruendung"]) {
    const res = await page.goto(`/de/leistungen/${slug}`);
    expect(res?.status()).toBe(200);
    await expect(page.getByRole("link", { name: "Offerte anfragen" })).toHaveAttribute(
      "href",
      `/de/kontakt?leistung=${slug}`,
    );
  }
});

test("contact form validates fields and reports missing SMTP setup", async ({ page }) => {
  await page.goto("/en/kontakt?leistung=lohn");
  await expect(page.getByRole("checkbox", { name: "Payroll & HR" })).toBeChecked();

  await page.getByRole("button", { name: "Send request" }).click();
  await expect(page.locator("form").getByRole("alert")).toContainText("Please check the highlighted fields.");
  await expect(page.getByLabel("Name")).toBeFocused();
  await expect(page.getByText("Please enter your name.")).toBeVisible();

  await page.getByLabel("Name").fill("Test Person");
  await expect(page.getByText("Please enter your name.")).toBeHidden();
  await page.getByLabel("Email").fill("test@example.ch");
  await page.getByText("Self-employed / sole proprietor").click();
  await page.getByLabel("Your message").fill("I need help with monthly payroll for three employees.");
  await page.getByRole("checkbox", { name: /I agree/ }).check();
  await page.getByRole("button", { name: "Send request" }).click();
  await expect(page.locator("form").getByRole("alert")).toContainText("has not been set up yet");
});

test("contact API rejects invalid payloads", async ({ request }) => {
  const res = await request.post("/api/contact", { data: { name: "x" } });
  expect(res.status()).toBe(422);
  const body = await res.json();
  expect(body.ok).toBe(false);
  expect(body.fields.email).toBe("emailInvalid");
});

test("unknown pages show the localized 404", async ({ page }) => {
  const res = await page.goto("/en/does-not-exist");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "This page does not exist" })).toBeVisible();
});

test("SEO files are served", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(await sitemap.text()).toContain("/en/leistungen/lohn");
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain("Sitemap:");
});
