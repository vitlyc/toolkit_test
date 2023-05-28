import { test, expect } from "@playwright/test"

test.use({
  viewport: {
    height: 900,
    width: 1400,
  },
})

test("test", async ({ page }) => {
  test.setTimeout(100000)

  await page.goto("http://localhost:5173/")
  await page.waitForTimeout(4000)

  await page.getByRole("textbox").click()
  await page.getByRole("textbox").fill("typescript")
  await page.waitForTimeout(4000)

  await page.getByRole("button", { name: "2" }).click()
  await page.waitForTimeout(4000)

  await page.getByRole("button", { name: "3" }).click()
  await page.waitForTimeout(4000)

  await page.getByRole("button", { name: "5" }).click()
  await page.waitForTimeout(4000)

  await page
    .getByText(
      "Name: node-typescript-boilerplateStars: 2068Last commit: 2023-05-27T10:40:49Z"
    )
    .click()
  await page.waitForTimeout(4000)

  await page.getByRole("button", { name: "BACK" }).click()
  await page.waitForTimeout(4000)

  await page
    .getByText(
      "Name: json-schema-to-typescriptStars: 2450Last commit: 2023-05-27T08:40:37Z"
    )
    .click()
  await page.waitForTimeout(4000)

  await page.getByRole("button", { name: "BACK" }).click()
  await page.waitForTimeout(4000)

  await page.getByRole("textbox").click()
  await page.waitForTimeout(4000)

  await page.getByRole("textbox").fill("type")
  await page.waitForTimeout(4000)

  await page
    .getByText("Name: typeormStars: 31325Last commit: 2023-05-28T03:13:34Z")
    .click()
  await page.waitForTimeout(4000)

  await page.getByRole("button", { name: "BACK" }).click()
  await page.waitForTimeout(4000)

  await page.getByRole("textbox").click()
  await page.getByRole("textbox").fill("")
  await page.waitForTimeout(4000)
})
