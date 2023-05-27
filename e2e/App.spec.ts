import { test, expect } from "@playwright/test"

test.use({
  viewport: {
    height: 900,
    width: 1400,
  },
})

test("test", async ({ page }) => {
  test.setTimeout(60000)
  await page.goto("http://localhost:5173/")
  await page.getByRole("textbox").click()
  await page.getByRole("textbox").fill("typescript")
  await page.getByRole("button", { name: "Search" }).click()
  await page.waitForTimeout(2000)

  await page.getByRole("link", { name: "3" }).click()
  await page.waitForTimeout(2000)

  await page.getByRole("link", { name: "4" }).click()
  await page.waitForTimeout(2000)

  await page.getByRole("link", { name: "5" }).click()
  await page.waitForTimeout(2000)

  await page.getByRole("link", { name: "8" }).click()
  await page.waitForTimeout(2000)

  await page.getByRole("link", { name: "1", exact: true }).click()
  await page.waitForTimeout(2000)

  await page.getByRole("textbox").click()
  await page.waitForTimeout(2000)

  await page
    .getByText("Name: typescriptStars: 113Last commit: 2023-05-15T09:11:04Z")
    .click()
  await page.waitForTimeout(2000)

  await page.getByRole("button", { name: "Back" }).click()
  await page.waitForTimeout(2000)

  await page
    .getByText(
      "Name: vue-typescript-admin-templateStars: 5156Last commit: 2023-05-26T09:58:19Z"
    )
    .click()
  await page.waitForTimeout(2000)

  await page.getByRole("button", { name: "Back" }).click()
  await page.getByRole("textbox").click()
  await page.getByRole("textbox").fill("banana")
  await page.waitForTimeout(2000)

  await page.getByRole("button", { name: "Search" }).click()
  await page.waitForTimeout(2000)
})
