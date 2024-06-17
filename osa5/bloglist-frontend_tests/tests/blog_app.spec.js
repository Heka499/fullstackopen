const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, likeBlog } = require('./helper')

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
        await request.post('/api/users', {
          data: {
            username: 'testuser2',
            name: 'Test User2',
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

  describe('User cant delete other users blog', () => {
    beforeEach(async ({ page }) => {
      
      await loginWith(page, 'testuser', 'testpassword')
    })

    test('User cant delete other users blog', async ({ page }) => {
      await createBlog(page, 'Test Title', 'Test Author', 'http://testurl.com')
      await page.getByRole('button', { name: 'logout' }).click()
      await loginWith(page, 'testuser2', 'testpassword')
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.locator('.bloglist')).not.toContainText('remove')
    })
  })

  describe('Blogs are ordered by likes', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'testuser', 'testpassword')

      await createBlog(page, 'Test Title1', 'Test Author1', 'http://testurl.com')
      await createBlog(page, 'Test Title2', 'Test Author2', 'http://testurl.com')
      await createBlog(page, 'Test Title3', 'Test Author3', 'http://testurl.com')

      await page.locator('p').filter({ hasText: 'Test Title3 by Test Author3' }).getByRole('button').click()
      await likeBlog(page, 'Test Title3', 'Test Author3', 10)

      
      await page.locator('p').filter({ hasText: 'Test Title2 by Test Author2' }).getByRole('button').click()
      await likeBlog(page, 'Test Title2', 'Test Author2', 5)

      await page.locator('p').filter({ hasText: 'Test Title1 by Test Author1' }).getByRole('button').click()
      await likeBlog(page, 'Test Title1', 'Test Author1', 3)
    })

    test('Blogs are ordered by likes', async ({ page }) => {
        const initialLikes = await page.$$eval('.blog-likes', elements => elements.map(el => parseInt(el.textContent)))
        
        await page.click('.blog-view-button')
        await page.click('.blog-like-button')
        
        const updatedLikes = await page.$$eval('.blog-likes', elements => elements.map(el => parseInt(el.textContent)))
        
        const isSorted = updatedLikes.every((likes, index) => likes >= initialLikes[index])
        
        expect(isSorted).toBeTruthy()
    })
  })
})