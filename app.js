var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var devlogger = require('morgan');
var prologger = require('express-logger');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');


var index = require('./routes/index');
var users = require('./routes/list');
var search = require('./routes/search');
var cookbook = require('./routes/cookbook');


var key = '307e911ce5d804e97c102a74a52fa873';
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'pug');

app.locals.key = key;

//  获取所有分类名称，存在数组
var options = {
  	host: 'apis.juhe.cn',
	port: 80,
	path: '/cook/category?key='+key
}
var _req = http.request(options, (_res)=>{
	var data = '';
	_res.on('data',(chunk)=>{
		data+=chunk;
	})
	_res.on('end',()=>{
		var arr = [];
		var datas = JSON.parse(data).result;
		for(var i=0,len1=datas.length;i<len1;i++){
			for(var j=0,len2=datas[i].list.length; j<len2; j++){
				arr[datas[i].list[j].id] = datas[i].list[j].name
			}
		}
		app.locals.listId = arr;
	})
})
  _req.end();
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
console.log(app.locals)
switch(app.get('env')){
	case 'development':
		app.use(devlogger('dev'));
		break;
	case 'production':
		app.use(prologger({
			path:__dirname+ '/log/requests.log'
		}));
		break;
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/list',function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*"); 
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
	next();
}, users);
app.use('/search', search);
app.use('/cookbook', cookbook);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
