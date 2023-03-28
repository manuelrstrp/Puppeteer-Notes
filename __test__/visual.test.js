const puppeteer = require ('puppeteer')
const {toMatchImageSnapshot} = require('jest-image-snapshot')
expect.extend({toMatchImageSnapshot})
const {KnownDevices} = require ('puppeteer')

describe('Visual test',()=>{
  let browser
  let page
  beforeAll(async()=>{
    browser = await puppeteer.launch({
      headless: false,
      defaultViewport:null,
    })
    page = await browser.newPage()
    /* const context = await browser.createIncognitoBrowserContext()//Ventana en modo incognito
    page = await context.newPage() */
    await page.goto('https://platzi.com', {waitUntil: 'networkidle0'})
  }, 30000)
  afterAll(async()=>{
    await browser.close()
  })
  
  test('Snapshot de toda la pagina', async()=>{
    await page.waitForSelector('img')
    const screenshot = await page.screenshot()
    expect(screenshot).toMatchImageSnapshot()
  }, 350000)
  test('Snapshot de solo un elemento', async()=>{
    const image = await page.waitForSelector('img')
    const screenshot = await image.screenshot()
    expect(screenshot).toMatchImageSnapshot({
      failureThreshold: 0.05,
      failureThresholdType: 'percent',
    })
  }, 350000)
  test('Snapshot de un celular', async()=>{
    const celular = KnownDevices['iPhone 11 Pro Max']
    await page.emulate(celular)
    const image = await page.waitForSelector('img')
    const screenshot = await page.screenshot()
    expect(screenshot).toMatchImageSnapshot({
      failureThreshold: 0.05,
      failureThresholdType: 'percent',
    })
  }, 350000)
  test('Remover imagen antes de crear snapshot', async()=>{
    const image = await page.waitForSelector('img')
    await page.evaluate(() => 
      (document.querySelectorAll('img') || []).forEach((img) => img.remove())
    )
    const screenshot = await page.screenshot()
    expect(screenshot).toMatchImageSnapshot({
      failureThreshold: 0.05,
      failureThresholdType: 'percent',
    })
  }, 350000)
})