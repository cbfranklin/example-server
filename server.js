
const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const app = express();

var ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36';

request.defaults({
    headers: {'User-Agent': ua}
});


app.use('/', express.static('static'));

app.get('/search', function(req, res) {
	var query = req.query.q;
	var ddgQuery = `https://duckduckgo.com/html?q=site%3Aetrade.design${query}`;
	console.log(ddgQuery)
	request(ddgQuery, function(error, response, html) {
	    if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
            console.log($.html())
	        var results = [];
	        $('#links .result').each(function(){

                var $link = $(this).find('.result__a');
                var $snippet = $(this).find('.result__snippet');

	        	var resultsItem = {
	        		'title': $link.text(),
                    'href': $link.attr('href'),
                    'snippet': $snippet.html(),
	        	}
	        	results.push(resultsItem);
	        })
	        console.log(results)
	        res.json(results)
	    }
	    else{
            console.log(error+response.statusCode)
	    	res.send(error+response.statusCode);
	    }
	});
});


app.listen(3000, () => console.log('Listening for requests on port 3000'))
