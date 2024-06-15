const { test, expect, describe, beforeEach } = require('@playwright/test');

describe('Note app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('front page can be opened', async ({ page }) => {
    const locator = await page.locator('h1').getByText('Notes')
    await expect(locator).toBeVisible()
    await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2024')).toBeVisible()
  })

  test('user can login', async ({ page }) => {
    await page.getByRole('button', { name: 'login' }).click()
    await page.getByTestId('username').fill('Heikki')
    await page.getByTestId('password').fill('lmao8922')
    await page.getByRole('button', { name: 'login' }).click()

    await expect(page.getByText('Heikki Järvinen logged in')).toBeVisible()
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByTestId('username').fill('Heikki')
      await page.getByTestId('password').fill('lmao8922')
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new note can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new note' }).click()
      await page.getByTestId('note').fill('a note created by playwright')
      await page.getByRole('button', { name: 'save' }).click()

      await expect(page.getByText('a note created by playwright')).toBeVisible()
    })
  })
})