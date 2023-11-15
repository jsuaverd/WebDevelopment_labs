
//require built-in modules
const http = require('http'); //CommonJS Module patter
const fs = require('fs');
const mime = require("mime-types");

const port = 3000;

let lookup = mime.lookup;

//when we create a server instance, it is IMMUTABLE = cannot be changed until the server is restarted
const server = http.createServer(function(req,res)
{
    let path = req.url;

    if (path == "/" || path == "/home"){
        path = "/index.html";
    }

    let mime_type = lookup(path.substring(1));
    //console.log(`MIME TYPE: ${mime_type}`);
    fs.readFile(__dirname + path, function(err,data){
        if(err)
        {
            res.writeHead(404); //status - file not found
            console.log(`ERROR: ${err.message}`); 
            return res.end("ERROR: 404 - File not Found"); //output the error message to the apge

        }

        //if no error
        res.setHeader("X-Content-Type-Options", "nosniff")
        res.writeHead(200, {"Content-Type": mime_type});//status - all ok
        res.end(data);// output the file that was read to the page
        //console.log(`DATA: ${data}`);
    })
});

server.listen(port, function(){
    console.log(`Server running at Port: ${port}`);
});