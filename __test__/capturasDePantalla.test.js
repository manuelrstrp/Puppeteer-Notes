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
  test('Captura de pantalla seleccionando un area', async()=>{
    await page.screenshot({
      path:'./capturaDePantallaSeleccionandoUnArea.png',
      clip:{
        x:0,
        y:0,
        width: 500,
        height: 500,
      }
    })
  }, 350000)
  test('Captura de pantalla con fondo transparente', async()=>{
    await page.evaluate(()=>(document.body.style.background = 'transparent'))
    await page.screenshot({
      path:'./capturaDePantallaTransparente.png',
      omitBackground: true,
    })
  }, 350000)
  test('Captura de pantalla a un elemento', async()=>{
    const elemento = await page.waitForSelector('body > div.L3eUgb > div.o3j99.LLD4me.yr19Zb.LS8OJ > div > img')
    await elemento.screenshot({
      path:'./capturaDePantallaElemento.png',
      
    })
  }, 350000)
})