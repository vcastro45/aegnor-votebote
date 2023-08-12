import { BrowserContext, Page, chromium } from 'playwright'
import { readFile } from 'fs/promises'

async function login (page: Page) {
  const emailField = await page.$('input#email')
  const pwdField = await page.$('input#password')
  const submitBtn = await page.$('button[type="submit"]')

  const configBuffer = await readFile('./config.json')
  const config = JSON.parse(configBuffer.toString())

  await emailField!.type(config.login)
  await pwdField!.type(config.password)
  await submitBtn!.click()
}

async function vote (page: Page, context: BrowserContext) {
  await page.goto('https://aegnor.arwase.fr/vote')
  await page.waitForLoadState('load')


  const RPGParadizeVoteBtn = await page.$('a[href="https://www.rpg-paradize.com/?page=vote&vote=107649"]')

  const RPGParadizeVoteTime = await RPGParadizeVoteBtn!.getAttribute('data-vote-time')

  if (!RPGParadizeVoteTime) {
    const [votePage] = await Promise.all([
      context.waitForEvent('page'),
      RPGParadizeVoteBtn!.click()
    ])

    await votePage.waitForLoadState('load')

    const voteBtn = await votePage.$('#form-vote button')
    await votePage.waitForTimeout(2000)
    await voteBtn!.click()

    await votePage.waitForLoadState('load')
    await votePage.waitForTimeout(1500)
    await votePage.close()

    await page.waitForTimeout(1000)
    await page.bringToFront()
    await page.reload({ waitUntil: 'load' })
  }
}

async function main () {
  const browser = await chromium.launch({
    headless: false,
    channel: 'chrome'
  })
  const context = await browser.newContext()
  const page = await context.newPage()
  await page.goto('https://aegnor.arwase.fr/')
  await page.waitForLoadState('load')

  // Login
  const loginBtn = await page.$('[href="https://aegnor.arwase.fr/user/login"]')
  await loginBtn!.click()
  await page.waitForLoadState('load')

  await login(page)

  while (true) {
    try {
      await vote(page, context)
      await page.waitForTimeout(60000)
    } catch (e) {
      console.error(e)
    }
  }

  await browser.close()
}

main()
