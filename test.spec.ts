import { test, expect } from "@playwright/test"
import { chromium } from "@playwright/test"

// test("test youtube", async ({ page }) => {
//   await page.goto("https://colors.eva.design")
//   await page.waitForTimeout(500)
//   const player = await page.locator(".container")
//   await player.screenshot({ path: "img/pic.png" })
// })
//localhost:5173/

http: test("test", async ({ page }) => {
  await page.goto("https://www.youtube.com/watch?v=f_2BEiNWAAg")
  await page.waitForTimeout(3000)

  await page.screenshot({ path: "img/youtube.png", fullPage: true })
})
