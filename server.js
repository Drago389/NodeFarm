// overview (Home Page ("HomePage", "/", ""))
// Product Page("product")
// "/api" => display data.json to browser
// Error 404
// npm install --save-dev nodemon
var http = require("http");
var fs = require("fs");
var url = require("url");
var json = fs.readFileSync("./data.json")
var template = fs.readFileSync("./product.html")
var cardsTemplate = fs.readFileSync("./card.html")+"";
var overviewTemplate = fs.readFileSync("./overview.html")+"";
template = template + ""
// replace
json = JSON.parse(json)// to convert into object

function replace(template, product){
    template = template.replace(/#image#/g, product["image"])
    template = template.replace(/#productName#/g, product["productName"])
    template = template.replace(/#From#/g, product["from"])
    template = template.replace(/#nutrients#/g, product["nutrients"])
    template = template.replace(/#quantity#/g, product["quantity"])
    template = template.replace(/#price#/g, product["price"])
    template = template.replace(/#id#/g, product["id"])
    if(!product["organic"]){
        template = template.replace(/#notOrganic#/g, "not-organic")
    }
    return template;
}
var server =http.createServer(function(req,res){
    var url1 = url.parse(req.url,true)
    // var idarr = req.url.split("/")
    var pathName = url1.pathname;
    // var id = idarr[2];
    var id = url1.query.id;
    if(req.url == "/homepage"|| req.url =="/" || req.url == ""){
        // res.write("<h1>Home Page</h1>");
        var cards = "";
    for (var i = 0; i < json.length; i++) {
      cards = cards + replace(cardsTemplate, json[i]);
    }

    overviewTemplate=overviewTemplate.replace(/{%cardsarea%}/g, cards);
    res.write(overviewTemplate);
    }else if(pathName == "/product"){ //else if(req.url == `/product/${id}`)
        var productPage = replace(template, json[id]);
        res.write(productPage);
    } else if(req.url == "/api"){
        res.write(json)
    }else {
        console.log()
        res.write("<h1>404 Page Not Found</h1>")
    }
    res.end()
})
var port =process.env.PORT||3000
server.listen(port,function(){
    console.log("server created");
})