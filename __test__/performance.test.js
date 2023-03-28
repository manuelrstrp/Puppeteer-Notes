const puppeteer = require ('puppeteer')
const {AxePuppeteer} = require('@axe-core/puppeteer')

describe('Performance',()=>{
  let browser
  let page
  beforeAll(async()=>{
    browser = await puppeteer.launch({
      headless: true,
      defaultViewport:null,
    })
    page = await browser.newPage()
    /* const context = await browser.createIncognitoBrowserContext()//Ventana en modo incognito
    page = await context.newPage() */
  }, 30000)
  afterAll(async()=>{
    await browser.close()
  })
  
  test('Medir el performance de la automatizacion', async()=>{
    await page.goto('https://platzi.com')
    await page.waitForSelector('img')
    const metrics = await page.metrics()
    console.log(metrics);
  }, 350000)
  test('Medir el performance de la pagina', async()=>{
    await page.goto('https://platzi.com')
    await page.waitForSelector('img')
    const metrics2 = await page.evaluate(() => JSON.stringify(window.performance))
    console.log(metrics2);
  }, 350000)
  test('Medir el performance del page load', async()=>{
    await page.tracing.start({path: 'profile.json'})
    await page.goto('https://platzi.com')
    await page.tracing.stop()
  }, 350000)
  test('Medir el performance del page loadcon screenshots', async()=>{
    await page.tracing.start({path: 'profile.json', screenshots:true})
    await page.goto('https://platzi.com')
    await page.tracing.stop()
  }, 350000)
  test('Medir el performance del page load con screenshots y extrayendolos', async()=>{
    await page.tracing.start({path: 'profile.json', screenshots:true})
    await page.goto('https://platzi.com')
    await page.tracing.stop()
    const tracing = JSON.parse(fs.readFileSync('./profile.json','utf8'))
    //Filtrar JSON
    const traceScreenShots = tracing.traceEvents.filter(
      (x) => 
      x.cat === 'disabled-by-default-devtools.screenshot' &&
      x.name === 'Screenshot' &&
      typeof x.args !== 'undefined' &&
      typeof x.args.snapshot !== 'undefined' 
    )
    //iterar sobre este arreglo para crear las imagenes
    traceScreenShots.forEach(function(snap, index){
      fs.writeFile(`trace-screenshot-${index}.png`, snap.args.snapshot, 'base64', function(err){
        if(err){
          console.log('No pude crear el archivo', err);
        }
      })
    })
  }, 350000)
  test('Medir el performance del first paint y el first contentful paint', async()=>{
    const navigationPromise = page.waitForNavigation()
    await page.goto('https://platzi.com')
    await navigationPromise
    const firstPaint = JSON.parse(
      await page.evaluate(() => JSON.stringify(performance.getEntriesByName('first-paint')))
      )
    const firstContentfulPaint = JSON.parse(
      await page.evaluate(() => JSON.stringify(performance.getEntriesByName('first-contentful-paint')))
    )
      await page.evaluate(() => JSON.stringify(performance.getEntriesByName('first-paint')))
    console.log('firstPaint', firstPaint);
    console.log('firstContentfulPaint', firstContentfulPaint);
  }, 350000)
  test('Medir el performance de los frames por segundo', async()=>{
    const devtoolsProtocolClient = await page.target().createCDPSession()
    await devtoolsProtocolClient.send('Overlay.setShowFPSCounter', {show: true})
    await page.goto('https://platzi.com')
    await page.screenshot({path: 'framesPorSegundo.jpg', type: 'jpeg'})
  }, 350000)
})