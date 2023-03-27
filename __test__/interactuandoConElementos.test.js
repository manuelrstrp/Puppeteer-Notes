const puppeteer = require ('puppeteer') //Importar puppeteer
const {click, type, doubleClick} = require('../lib/helpers')

describe('Interactuando con elementos',()=>{
  it('Debe de abrir y cerrar el navegador', async()=>{
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport:null,
    })//pagina de estudio https://demo.guru99.com/test/simple_context_menu.html
    const page = await browser.newPage()
    await page.goto('https://demo.guru99.com/test/simple_context_menu.html')
    page.on('dialog',async(Dialog)=>{//listener para las alertar del DOM, para posteriormente aceptarlas
      await Dialog.accept()
    })
    await page.click('#authentication > span', {button: 'right', delay: 500})//click derecho
    await new Promise((res) => setTimeout(res, 3000));
    //Doble click con helpers
    await doubleClick(page, '#authentication > button')

    await page.click('#authentication > button', {clickCount: 2, delay:500})//doble click
    await new Promise((res) => setTimeout(res, 3000));
    
    await page.goto('https://devexpress.github.io/testcafe/example/')//Pagina de estudio #2
    //Type con helpers
    await type(page, '#developer-name', 'Manuel Restrepo', {delay: 100})

    await page.type('#developer-name', 'Manuel Restrepo', {delay: 100})//Escribir en input tipo texto
    await page.click('#remote-testing')//click a input tipo checkbox
    await page.click('#tried-test-cafe')
    await page.click('#macos')
    await page.waitForSelector('#preferred-interface', {visible:true})
    await page.click('#preferred-interface')
    await page.waitForSelector('#preferred-interface > option:nth-child(3)')
    //await page.click('#preferred-interface > option:nth-child(3)')
    await page.click('#slider > span')
    await new Promise((res) => setTimeout(res, 3000));
    await page.type('#comments', 'Esto es un comentario', {delay: 100})
    await page.click('#submit-button')
    await new Promise((res) => setTimeout(res, 3000));
    await browser.close()
  }, 350000)
})