//Ben Michener
//Serverside Assignment 1

var http = require('http');
var server = http.createServer(requestHandler);
server.listen(process.env.PORT, process.env.IP, startHandler);

function startHandler()
{
    var addr = server.address();
    console.log("server listening at", addr.address + ":" + addr.port);
}

function requestHandler(req, res)
{
    var url = require('url');
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;   
    console.log(query);
    
    if(query['cmd'] == 'repeat')
    {
        var word = query['word'];
        res.writeHead(200, {'Content-Type': 'text/html'});
        for(var x = 0; x < String(word).length; x++)
        {
            res.write('<pre>' + word + '</pre>');
        }
        res.end('');
    }
    
    if(query['cmd'] == 'dotted')
    {
        var word1 = query['word1'];
        var word2 = query['word2'];
        res.writeHead(200, {'Content-Type': 'text/html'});
        var ret = word1;
        for(var x = 0; x < (30 - String(word1).length - String(word2).length); x++)
        {
            ret += '.';
        }
        ret += word2;
        res.end('<pre>' + ret +'</pre>')
    }
    
    if(query['cmd'] == 'stats')
    {
        var avg = 0;
        var min = query['grades'][0];
        var max = query['grades'][0];
        for (var i in query['grades'])
        {
            avg = avg + parseInt(query['grades'][i]);
            if (min > query['grades'][i]){
                min = query['grades'][i];
            }
            if (max < query['grades'][i]){
                max = query['grades'][i];
            }
        }
        i++;
        avg /= i;
        
        res.write('<pre>Ave: ' + avg + ' Min: ' + min + ' Max: ' + max + '</pre>');
        res.end('');
    }
}