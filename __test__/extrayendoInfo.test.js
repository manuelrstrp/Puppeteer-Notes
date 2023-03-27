const puppeteer = require ('puppeteer') //Importar puppeteer

describe('Extrayendo información',()=>{
  let browser
  let page
  beforeAll(async()=>{//beforeEach ejecuta la funcion antes de cada uno de los it, beforeAll ejecuta la funcion solamente una ves antes de cada it
    browser = await puppeteer.launch({
      headless: false,
      defaultViewport:null,
      //slowMo: 500,
    })
    page = await browser.newPage()
    await page.goto('https://platzi.com', {waitUntil: 'networkidle0'})
  }, 10000)
  afterAll(async()=>{//afterEach ejecuta la funcion despues de cada uno de los it, afterAll ejecuta la funcion solamente una ves despues de cada it
    await browser.close()
  })
  it('Extraer la informacion de un elemento', async()=>{
    //Evaluar el contenido de un elemento con css selector
    await page.waitForSelector('#Header-v2 > nav.Nav-header.Nav-header-desktopCtas > div.Menu > div > div > ul > li:nth-child(9) > a')
    const button = await page.$eval('#Header-v2 > nav.Nav-header.Nav-header-desktopCtas > div.Menu > div > div > ul > li:nth-child(9) > a', (button)=>button.textContent)//ejecuta el document query selector
    console.log('Nombre ', button);
    //Evaluar el contenido de un elemento con xpath
    const [boton] = await page.$x('//*[@id="Header-v2"]/nav[2]/section/button[2]')
    const propiedad = await boton.getProperty('textContent')
    const texto = await propiedad.jsonValue()
    console.log('texto ',texto);
    //Segunda forma de hace con Xpath
    const texto2 = await page.evaluate((name)=>name.textContent, boton)//Evalua una funcion en el contexto de la pagina
    console.log('texto2 ',texto2);    
    //Tercera forma xpath
    const button3 = await page.waitForXPath('//*[@id="Header-v2"]/nav[2]/section/button[2]')
    const texto3 = await page.evaluate((name)=>name.textContent, button3)//Evalua una funcion en el contexto de la pagina
    console.log('texto3 ',texto3);
  }, 350000)

  it('Extraer el titulo de la pagina y la URL', async()=>{
    const titulo = await page.title()
    const url = await page.url()
    console.log('titulo ',titulo)
    console.log('URL ',url)
  }, 350000)

  it('Contar los elementos de una pagina', async()=>{
    const images = await page.$$eval('img', (imagen)=>imagen.length)//Retorna un conteo del selector, a diferencia del $eval, este retorna un arreglo con todos los elementos que encuentre
    console.log('Imagenes ',images);
  }, 35000)
})