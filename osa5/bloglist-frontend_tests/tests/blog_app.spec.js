const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
          data: {
            username: 'testuser',
            name: 'Test User',
            password: 'testpassword'
        }
    })

    await page.goto('/')
  })

  test('login form is shown', async ({ page }) => {
    await page.waitForSelector('form')
    await expect(page.locator('form')).toBeVisible()
    await expect(page.getByText('log in to application')).toBeVisible()
  })
})