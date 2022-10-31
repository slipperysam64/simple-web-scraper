const PORT = 8000;

const axios = require('axios');
const cheerio = require('cheerio');
const { response } = require('express');
const express = require('express');
const url = 'https://www.theguardian.com/us';       //used to save a single url
const app = express();
const cors = require('cors')


//app.method(path, handler)
//app.get()       //get data
//app.put()       //edit data
//app.post()      //add data
//app.delete()    //delete data

app.use(cors());
app.get('/', function(req, res) {
    res.json('this is my webscraper')
})

app.get('/results', (req, res) => {
    
    axios(url).then(response => {                       //reaches out to url
        const html = response.data                      //asks for data and saves it into html variable
        const $ = cheerio.load(html)
        const articles = [];
    
        $('.fc-item__title', html).each(function() {
            const title = $(this).text()                              //looks for text within this function
            const url = $(this).find('a').attr('href')                //
            articles.push({                                           //pushes the found items into an empty array
                title,
                url
            })
        })
        res.json(articles);                                         
    }).catch(err => console.log(err))
})

                               //find error

app.listen(PORT, () => console.log(`server is running on port: ${PORT}`))

