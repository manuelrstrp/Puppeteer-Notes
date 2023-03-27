const puppeteer = require ('puppeteer') //Importar puppeteer

describe('Tipos de espera',()=>{
  jest.setTimeout(35000)
  it('Mostrar todos los diferentes tipos de espera', async()=>{
    const browser = await puppeteer.launch({
      headless: true,
      defaultViewport:null,
      //slowMo: 500,
    })
    const page = await browser.newPage()
    await page.setDefaultTimeout(10000)//Configura un timeout por defecto
    await page.setDefaultNavigationTimeout(10000)//Define un timeout para la navegacion entre paginas, es decir, que tanto debo esperar para que la navegacion termine

    await page.goto('https://platzi.com', {waitUntil: 'networkidle0'})//Espera hasta que la pagina termine de cargar, dandole varios parametros
    //await new Promise((res) => setTimeout(res, 3000));//Espera explicita
    //await page.waitForSelector('#Header-v2 > nav > div.Logo > div > a > div > figure:nth-child(1) > img')//Espera por un css selector
    await page.waitForXPath('//*[@id="Header-v2"]/nav[1]/div[1]/div/a/div/figure/img')//Espera por un xpath
    await page.goto('https://demoqa.com/modal-dialogs', {waitUntil: 'networkidle2'})
    const button = await page.waitForSelector('#showSmallModal', {visible:true})//crear variables para añadir selectores y ejecitar funciones como click son pasar selectores
    await button.click()
    await page.waitForFunction(()=> document.querySelector('#example-modal-sizes-title-sm').innerText == 'Small Modal')//espera por funcion
    //Ejemplo para observar el viewport
    /* const observsResize = page.waitForFunction('window.innerWidth < 100')//se crea una funcion, pero sin el await para q no se ejecute en las pruebas, luego se añade a una variable
    await page.setViewport({width:50, height:50})//se cambia el tamaño del view port con el objetivo de ejecutar la funcion
    await observsResize//se llama a la funcion */
    await page.click('#closeSmallModal')
    await page.waitForFunction(()=> !document.querySelector('#example-modal-sizes-title-sm'), {timeout:30000})//puedo agregar una funcion un timeout para el limite de tiempo de espera de la misma
    await browser.close()
  })
})