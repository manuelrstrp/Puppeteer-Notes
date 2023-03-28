const puppeteer = require ('puppeteer')

describe('Generacion de PDF',()=>{
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
  
  test('PDF de pantalla completa', async()=>{
    let pdfCSS = []
    pdfCSS.push('<style>')
    pdfCSS.push('h1 {font-size:10px; margin-left:30px;}')
    pdfCSS.push('</style>')
    const css = pdfCSS.join('')

    await page.pdf({
      path:'./google.pdf',
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: css + '<h1>' + 'Mira mama mi primer PDf con puppeteer' + '</h1>',
      footerTemplate: css + '<h1> Page <span class = "pageNumber"></span> of <span class = "totalPages"></span></h1>',
      margin:{
        top: '100px',
        bottom: '200px',
        right: '30px',
        left: '30px',
      }
    })
  }, 350000)
  test('PDF de pantalla completa en modo landscape', async()=>{
    let pdfCSS = []
    pdfCSS.push('<style>')
    pdfCSS.push('h1 {font-size:10px; margin-left:30px;}')
    pdfCSS.push('</style>')
    const css = pdfCSS.join('')

    await page.pdf({
      path:'./googleLandscape.pdf',
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: css + '<h1>' + 'Mira mama mi primer PDf con puppeteer' + '</h1>',
      footerTemplate: css + '<h1> Page <span class = "pageNumber"></span> of <span class = "totalPages"></span></h1>',
      margin:{
        top: '100px',
        bottom: '200px',
        right: '30px',
        left: '30px',
      },
      landscape: true,
    })
  }, 350000)
})