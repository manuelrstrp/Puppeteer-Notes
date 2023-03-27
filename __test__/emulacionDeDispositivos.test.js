const puppeteer = require ('puppeteer')
const {KnownDevices} = require ('puppeteer')

describe('Emulando Dispositivos',()=>{
  let browser
  let page
  beforeAll(async()=>{
    browser = await puppeteer.launch({
      headless: false,
      defaultViewport:null,
    })
    //page = await browser.newPage()
    const context = await browser.createIncognitoBrowserContext()//Ventana en modo incognito
    page = await context.newPage()
    await page.goto('https://platzi.com', {waitUntil: 'networkidle0'})
  }, 30000)
  afterAll(async()=>{
    await browser.close()
  })
  test('Emulando dispositivos de forma manual', async()=>{
    await page.emulate({
      name: 'Mi dispositivo',
      viewport: {
        width: 375,
        height: 667,
        deviceScaleFactor: 2,
        isMobile: true,
        hasTouch: true,
        isLandscape: false,
      },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebkit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.75 Safari/537.36',
    }),
    await new Promise((res) => setTimeout(res, 10000));
  }, 350000)
  test('Emulando un sitio de escritorio', async()=>{
    await page.setViewport({
      width:1280,
      height: 800,
    })
    await new Promise((res) => setTimeout(res, 10000));
  }, 350000)
  test('Emulando un sitio en una tablet', async()=>{
    //Depreciated
    const tablet = puppeteer.devices['iPad Pro']
    await page.emulate(tablet)
    await new Promise((res) => setTimeout(res, 5000));
    //Actual
    const tablet2 = KnownDevices['iPad Pro 11']
    await page.emulate(tablet2)
    await new Promise((res) => setTimeout(res, 5000));
  }, 350000)
  test('Emulando un sitio en una tablet en modo landscape', async()=>{
    //Depreciated
    const tablet = puppeteer.devices['iPad landscape']
    await page.emulate(tablet)
    await new Promise((res) => setTimeout(res, 5000));
    //Actual
    const tablet2 = KnownDevices['iPad Pro 11 landscape']
    await page.emulate(tablet2)
    await new Promise((res) => setTimeout(res, 5000));
  }, 350000)
  test('Emulando un sitio en un celular', async()=>{
    const iPhone = KnownDevices['iPhone 11 Pro Max']
    await page.emulate(iPhone)
    await new Promise((res) => setTimeout(res, 5000));
  }, 350000)
})