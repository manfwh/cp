var express = require('express');
var http = require('http');
var router = express.Router();
var Crawler = require('../modal/crawler.js');
//console.log(cp)
/* GET home page. */
router.get('/',function(req,res, next){
  var cp = new Crawler();
  cp.getPages(cp.url).then(function(html){
    cp.resolve(html);
    res.locals.cp = cp.cp;
    next();
  },cp.reject);
}, function(req, res, next) {
  if(req.query.q) {
  	var options = {
      host: 'apis.juhe.cn',
      port: 80,
      path: '/cook/query?key='+req.app.locals.key+'&menu='+encodeURIComponent(req.query.q)+'&rn=24'
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
  }
  else {
  	res.render('index', { title: '菜谱大全',cp: res.locals.cp });
  }
  
});


module.exports = router;
