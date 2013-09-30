var Crawler = require("simplecrawler");
var crawler = Crawler.crawl("http://www.fantagazzetta.com/");


var auth = {
    'Proxy-Authorization': 'Basic ' + new Buffer("almancini" + ':' + "25081985Mancioshell856").toString('base64')
}

crawler.interval = 5000;

crawler.useProxy = true
crawler.proxyHostname = "proxysogei.sogei.it"
crawler.proxyPort = 8080;
crawler.customHeaders  = auth;




crawler.on("fetchtimeout ",function(queueItem, crawlerTimeoutValue){
    console.log("timeout");
})

crawler.on("fetcherror ",function(queueItem, response){
    console.log("fetcherror");
})

crawler.on("fetchcomplete",function( queueItem , responseBuffer , response) {
    console.log("complete");
});