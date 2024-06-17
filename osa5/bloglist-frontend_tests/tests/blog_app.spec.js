const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

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
      await loginWith(page, 'testuser', 'testpassword')
      
      await expect(page.getByText('Test User logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'testuser', 'wrongpassword')

      await expect(page.getByText('Test User logged in')).not.toBeVisible()
    })  
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'testuser', 'testpassword')
    })

    test('A blog can be created', async ({ page }) => {
      await createBlog(page, 'Test Title', 'Test Author', 'http://testurl.com')
      
      const blogList = await page.locator('.bloglist')
      await expect(blogList).toContainText('Test Title')
      await expect(blogList).toContainText('Test Author')
    })

    test('A blog can be liked', async ({ page }) => {
      await createBlog(page, 'Test Title', 'Test Author', 'http://testurl.com')
    
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      
      await expect(page.getByText('Likes: 1')).toBeVisible()
    })

    test('A blog can be deleted', async ({ page }) => {
      await createBlog(page, 'Test Title', 'Test Author', 'http://testurl.com')
    
      await page.getByRole('button', { name: 'view' }).click()
      page.on('dialog', dialog => dialog.accept())
      await page.getByRole('button', { name: 'remove' }).click()
      
      await expect(page.locator('.bloglist')).not.toContainText('Test Title')
    })
  })
})