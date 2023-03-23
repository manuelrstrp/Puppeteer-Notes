const puppeteer = require ('puppeteer') //Importar puppeteer

describe('Mi primer test en puppeteer',()=>{
  it('Debe de abrir y cerrar el navegador', async()=>{
    const browser = await puppeteer.launch({
      headless: false,//funcion para observar el navegador o el proceso de la prueba
      slowMo: 0,//añade mas tiempo en la ejecucion de pruebas, para evitar ser detectados como bots
      devtools: false,//abre o cierra las devtools de chrome
      /* defaultViewport: {
        width: 2100,
        height: 1800,
      } */
      //args: ['--window-size=1920,1080']
      defaultViewport:null,
    })
    const page = await browser.newPage()
    await page.goto('https://www.github.com')
    //await new Promise((res) => setTimeout(res, 5000));//page.waitForTimeout(5000)
    await page.waitForSelector('img')//Espera por cualquier selector de imagen, es decir cualquier imagen
    await page.reload()//recargar la pagina
    await page.waitForSelector('img')
    await page.goto('https://www.platzi.com')//Navegar hacia otra pagina
    await page.waitForSelector('#Header-v2 > nav > div.Logo > div > a > div > figure:nth-child(1) > img')//selector de la imagen del logo de platzi
    await page.goBack()
    await page.goForward()
    //await page.waitForSelector('img')
    const page2 = await browser.newPage()//abrir otra pagina, otra pestaña
    await page2.goto('https://www.google.com')
    await page.bringToFront()
    await page.waitForSelector('#Header-v2 > nav > div.Logo > div > a > div > figure:nth-child(1) > img')//selector de la imagen del logo de platzi
    await new Promise((res) => setTimeout(res, 2000));//page.waitForTimeout(5000)
    await browser.close()
  }, 60000)
})