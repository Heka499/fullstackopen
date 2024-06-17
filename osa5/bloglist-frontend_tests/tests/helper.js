const loginWith = async (page, username, password) => {
    await page.getByTestId('username').fill(username)
      await page.getByTestId('password').fill(password)
      await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
    await page.getByRole('button', { name: 'new blog' }).click()
    await page.getByTestId('title').fill(title)
    await page.getByTestId('author').fill(author)
    await page.getByTestId('url').fill(url)
    await page.getByRole('button', { name: 'save' }).click()
    await page.locator('p').filter({ hasText: title + ' by ' + author }).getByRole('button').waitFor()
    await page.getByRole('button', { name: 'cancel' }).click()
}

const likeBlog = async (page, title, author, likes) => {
    for (let i = 0; i < likes; i++) {
        await page.locator('p').filter({ hasText: 'Likes: ' + i + ' Like' }).getByRole('button').click()
        await page.locator('p').filter({ hasText: 'Likes: ' + (i + 1) + ' Like' }).getByText('Likes: ' + (i + 1) + ' Like').waitFor()
    }
}

export { loginWith, createBlog, likeBlog}