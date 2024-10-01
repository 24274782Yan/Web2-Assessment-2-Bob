
var app = express();

app.use('/public', express.static('public'));




app.get('/', function(req, res) {
    res.send('Hello World');
})

var server = app.listen(8081, function() {

    var host = server.address().address
    var port = server.address().port
    
    console.log("Node.JS OK: http://%s:%s", host, port)

})