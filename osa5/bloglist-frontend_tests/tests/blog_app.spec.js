const { test, expect, beforeEach, describe } = require('@playwright/test')
const exp = require('constants')

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

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill('testuser')
      await page.getByTestId('password').fill('testpassword')
      await page.click('button')
      
      await expect(page.getByText('Test User logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('testuser')
      await page.getByTestId('password').fill('wrongpassword')
      await page.click('button')

      await expect(page.getByText('Test User logged in')).not.toBeVisible()
    })  
  })
})