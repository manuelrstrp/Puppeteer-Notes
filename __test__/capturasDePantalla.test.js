const puppeteer = require ('puppeteer')

describe('Captura de Pantalla',()=>{
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
    await page.goto('https://google.com', {waitUntil: 'networkidle0'})
  }, 30000)
  afterAll(async()=>{
    await browser.close()
  })
  
  test('Captura de pantalla completa', async()=>{
    await page.screenshot({
      path:'./capturaDePantalla.png',
      fullPage: true,
    })
  }, 350000)
})