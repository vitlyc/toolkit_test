import { test, expect } from "@playwright/test"

test.use({
  viewport: {
    height: 900,
    width: 1400,
  },
})

test("test", async ({ page }) => {
  await page.goto("http://localhost:5173/")
  await page.getByRole("textbox").click()
  await page.getByRole("textbox").fill("typescript")

  await page.getByRole("button", { name: "Search" }).click()
  await page.waitForTimeout(2000)

  await page
    .getByText("Name: typescriptStars: 539Last commit: 2023-05-27T14:06:34Z")
    .click()
  await page.waitForTimeout(2000)

  await page.getByRole("button", { name: "Back" }).click()
  await page.waitForTimeout(2000)

  await page.getByText("Name: typescript-book").click()
  await page.waitForTimeout(2000)

  await page.getByRole("button", { name: "Back" }).click()
  await page.waitForTimeout(2000)

  await page
    .getByText("Name: TypeScriptStars: 91527Last commit: 2023-05-27T15:02:08Z")
    .click()
  await page.waitForTimeout(2000)

  await page.getByRole("button", { name: "Back" }).click()
  await page.waitForTimeout(2000)

  await page.getByRole("button", { name: "10" }).click()

  await page.getByRole("button", { name: "9" }).click()
  await page.waitForTimeout(2000)

  await page.getByRole("button", { name: "8" }).click()
  await page.waitForTimeout(2000)

  await page.getByRole("button", { name: "6" }).click()
  await page.waitForTimeout(2000)

  await page
    .getByText(
      "Name: awesome-typescript-loaderStars: 2357Last commit: 2023-05-01T03:38:57Z"
    )
    .click()
  await page.waitForTimeout(2000)

  await page.getByRole("button", { name: "Back" }).click()
})
