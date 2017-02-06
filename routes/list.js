var express = require('express');
var router = express.Router();
var http = require('http');

/* GET list. */
router.get('/', function(req, res, next) {
  var options = {
    host: 'apis.juhe.cn',
    port: 80,
    path: '/cook/category?key='+req.app.locals.key
  }
  var _req = http.request(options, (_res)=>{
  	var data = '';
  	_res.on('data',(chunk)=>{
  		data+=chunk;
  	})
  	_res.on('end',()=>{
  		res.render('list', {list: JSON.parse(data)})
  	})
  })
  _req.end();
});
/* GET list:id */
router.get('/:listid', function(req, res, next) {
  var id = req.params.listid;
  res.locals.id=id;
  var options = {
    host: 'apis.juhe.cn',
    port: 80,
    path: '/cook/index?key='+req.app.locals.key+'&cid='+id+'&rn=24&format=1&pn=0'
  }
  var _req = http.request(options, (_res)=>{
  	var data = '';
  	_res.on('data',(chunk)=>{
  		data+=chunk;
  	})
  	_res.on('end',()=>{
  		res.render('tag', {list: JSON.parse(data)})
  	})
  })
  _req.end();
}); 
/* POST list:id */
router.post('/:listid', function(req, res, next) {
  var id = req.params.listid;
  var pn = req.body.pn;
  var options = {
    host: 'apis.juhe.cn',
    port: 80,
    path: '/cook/index?key='+req.app.locals.key+'&cid='+id+'&rn=24&format=1&pn='+pn
  }
  var _req = http.request(options, (_res)=>{
    var data = '';
    _res.on('data',(chunk)=>{
      data+=chunk;
    })
    _res.on('end',()=>{
      res.json({list: JSON.parse(data),listId:req.app.locals.listId})
    })
  })
  _req.end();
});
/*router.get('/:listid/:pn', function(req, res, next) {
  var pn = req.params.pn;
  var id = req.params.listid;
  res.locals.id = id;
  res.locals.pn = pn;
  if(pn==1) {
  	res.redirect('/list/1');
  }
  var options = {
    host: 'apis.juhe.cn',
    port: 80,
    path: '/cook/index?key='+key+'&cid='+id+'&rn=24&format=1&pn='+(pn-1)*24
  }
  var _req = http.request(options, (_res)=>{
  	var data = '';
  	_res.on('data',(chunk)=>{
  		data+=chunk;
  	})
  	_res.on('end',()=>{
  		res.render('tag', {list: JSON.parse(data)})
  	})
  })
  _req.end();
});*/

module.exports = router;
