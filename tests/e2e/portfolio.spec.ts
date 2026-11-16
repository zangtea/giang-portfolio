import { expect, test, type Locator } from "@playwright/test";

async function renderedColorPixelCount(canvas: Locator) {
  return canvas.evaluate((element) => {
    const canvasElement = element as HTMLCanvasElement;
    const gl = (canvasElement.getContext("webgl2") || canvasElement.getContext("webgl")) as WebGLRenderingContext | null;
    if (!gl) return 0;
    gl.finish();
    const pixels = new Uint8Array(canvasElement.width * canvasElement.height * 4);
    gl.readPixels(0, 0, canvasElement.width, canvasElement.height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    let count = 0;
    for (let index = 0; index < pixels.length; index += 4) {
      if (pixels[index + 3] > 0 && (pixels[index] > pixels[index + 1] + 20 || pixels[index + 2] > pixels[index] + 20)) {
        count += 1;
      }
    }
    return count;
  });
}

test("1. Vietnamese and English home pages render", async ({ page }) => {
  await page.goto("/vi");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("LE THI TRA GIANG");
  await expect(page.getByRole("navigation", { name: "Điều hướng chính" })).toBeVisible();
  await page.goto("/en");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("LE THI TRA GIANG");
  await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeVisible();
});

test("2. Header navigates to page sections", async ({ page }) => {
  await page.goto("/en");
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Projects" }).click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.locator("#projects")).toBeInViewport();
});

test("3. Locale switch preserves the current project path", async ({ page }) => {
  await page.goto("/vi/projects/omniedu");
  await page.getByRole("link", { name: "EN", exact: true }).click();
  await expect(page).toHaveURL(/\/en\/projects\/omniedu$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("OmniEdu");
});

test("4. Theme toggle persists the selected theme", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/en");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Toggle theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(page).toHaveURL(/\/en$/);
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe("light");
});

test("5. Project filters show matching projects", async ({ page }) => {
  await page.goto("/en");
  await page.getByRole("button", { name: "AI/ML" }).click();
  await expect(page.getByRole("button", { name: "AI/ML" })).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("heading", { name: "OmniEdu" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "BlackBlue Laptop" })).toHaveCount(0);
});

test("6. Project cards open their detail route", async ({ page }) => {
  await page.goto("/en");
  await page.getByRole("link", { name: "View details" }).first().click();
  await expect(page).toHaveURL(/\/en\/projects\/[a-z0-9-]+$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("heading", { name: "System architecture" })).toBeVisible();
});

test("7. Unknown project routes return 404", async ({ page }) => {
  const response = await page.goto("/en/projects/not-a-real-project");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "Project not found" })).toBeVisible();
});

test("8. Primary CTA points to the contact section", async ({ page }) => {
  await page.goto("/en");
  await page.getByRole("link", { name: "Discuss a project" }).first().click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(page.locator("#contact")).toBeInViewport();
});

test("9. Contact form validates required and malformed input", async ({ page }) => {
  await page.goto("/en");
  const name = page.getByRole("textbox", { name: "Full name" });
  const email = page.getByRole("textbox", { name: "Email" }).last();
  const message = page.getByRole("textbox", { name: "Message" });
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(name).toHaveAttribute("required", "");
  await name.fill("Test visitor");
  await email.fill("not-an-email");
  await message.fill("This message is long enough for validation.");
  expect(await email.evaluate((element: HTMLInputElement) => element.checkValidity())).toBe(false);

  const invalidApiResponse = await page.request.post("/api/contact", {
    data: {
      name: "Test visitor",
      email: "not-an-email",
      subject: "",
      message: "This message is long enough for validation.",
      website: "",
    },
  });
  expect(invalidApiResponse.status()).toBe(400);

  await email.fill("visitor@example.com");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(
    page.getByText("The contact service is temporarily unavailable. Please email me directly.", { exact: true })
  ).toBeVisible();
});

test("10. Mobile and desktop viewports have no horizontal overflow", async ({ page }) => {
  for (const viewport of [
    { width: 320, height: 720 },
    { width: 375, height: 812 },
    { width: 1440, height: 900 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/vi");
    const fits = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
    expect(fits, `overflow at ${viewport.width}px`).toBe(true);
    const heroCanvas = page.locator("canvas");
    await expect(heroCanvas).toBeVisible();
    expect(await renderedColorPixelCount(heroCanvas), `blank WebGL hero at ${viewport.width}px`).toBeGreaterThan(0);
  }
});

test("11. Mobile navigation works with keyboard focus", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/vi");
  const openButton = page.getByRole("button", { name: "Mở menu" });
  await openButton.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog", { name: "Menu điều hướng" });
  await expect(dialog).toBeVisible();
  await expect(page.getByRole("button", { name: "Đóng menu" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(openButton).toBeFocused();
});

test("12. Home page has no severe browser console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/en");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.waitForTimeout(500);
  expect(errors).toEqual([]);
});