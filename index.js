const puppeteer = require('puppeteer');

const url = 'https://astro.cafeastrology.com/natal.php'

// TODO: Vamos ter que preparar esta lista, fazer um novo endpoint que vai trazer as informações do cityid e citylist da pessoa
let formData = {
    name : "Roberto Fonseca Alves",
    sex : "1", // Masculino 1 - Feminino 0 - They 2
    d1day : "3",
    d1month : "7",
    d1year : "1986",
    d1hour : "10",
    d1min : "15",
    cityid : "Santo André",
    citylist: "Santo André,22,55,-23.66,-46.54"
}

let scrape = async ( formData ) => {

    let retorno = {};
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)

    await page.type('input[name=name]', formData.name )
    await page.select('select[name=d1day]', formData.d1day )
    await page.select('select[name=d1month]', formData.d1month )
    await page.select('select[name=d1year]', formData.d1year )
    await page.select('select[name=d1hour]', formData.d1hour )
    await page.select('select[name=d1min]', formData.d1min )

    function setCidade( param ) {
        oldstr = param.cityid;
        HttpRequest()
    }

    await page.addScriptTag({content: `${setCidade}`})
    await page.evaluate(t => setCidade(t), formData)

    await page.waitForSelector('#citylistid', {
        visible: true,
    });

    await page.click('button[type=submit]')
    // await page.waitForNavigation()

    console.log("Processou a página")


    // Agora vamos buscar todas as tabelas com os dados que precisamos
    // Sendo sempre a primeira TR o titulo Logo teremos 3
    // document.querySelectorAll('#tablesmallid .newtable ')

    //document.querySelectorAll('#tablesmallid .newtable tr')[1].children[4].innerText

    // Sol em Câncer
    retorno['sun'] = await page.evaluate(() => {
        return document.querySelectorAll('#tablesmallid .newtable tr')[1].children[3].innerText
    })

    await page.screenshot({path: 'example1.png', fullPage: true })
    await browser.close()

    return retorno
}

scrape( formData ).then((value) => {
    console.log(value)
})
