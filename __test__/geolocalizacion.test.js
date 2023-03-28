const puppeteer = require ('puppeteer')

describe('Geolocalizacion',()=>{
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
  }, 30000)
  afterAll(async()=>{
    await browser.close()
  })
  
  test('Cambio de la geolocalizacion', async()=>{//https://chercher.tech/practice/geo-location.html
    const contex = browser.defaultBrowserContext()
    await contex.overridePermissions('https://chercher.tech/practice/geo-location.html',[
      'geolocation'
    ])
    await page.setGeolocation({latitude:90, longitude:20})
    await page.goto('https://chercher.tech/practice/geo-location.html')
    await new Promise((res) => setTimeout(res, 5000));
    
    await page.setGeolocation({latitude:90, longitude:0})
    await page.goto('https://chercher.tech/practice/geo-location.html')
    await new Promise((res) => setTimeout(res, 5000));
  }, 350000)
})