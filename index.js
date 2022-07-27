const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const app = express();
const PORT = 8000;

const url = "https://www.okeydostavka.ru/spb/ovoshchi-i-frukty/ovoshchi?smartphone=false&desktopVersion=false&ffcId=715844035&catalogId=12052&langId=-20&storeId=10653#facet:-70000000000000256511040108910891086108810901080,-700000000000002565110411072108210831072107810721085,-70000000000000256511050107210731072109510861082,-700000000000002565110501091108210911088109110791072,-7000000000000025651105410751091108810771094,-700000000000002565110551077108810771094,-700000000000002565110581086108410721090,-70000000000000096601042107710891086107410991077&productBeginIndex:0&orderBy:3&pageView:grid&minPrice:49.99&maxPrice:399.99&pageSize:72&"
axios(url)
    .then( response => {
        const html = response.data;
        // console.log(html);
        const picker = cheerio.load(html);
        const food = [];
        picker('ul.grid', html).each(function () {
        picker(this).find('li', html).each(function () {
            const prodName = picker(this).find('div.product-name').text();
            const prodUrl = picker(this).find('a').attr('href');
            const prodPrice = picker(this).find('span.price').text();
            food.push({
                    prodName,
                    prodUrl,
                    prodPrice
                })
            })
            console.log(food)
        })
    })

app.listen(PORT, () => console.log(`server up on ${PORT}`));