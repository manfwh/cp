var express = require('express');
var http = require('http');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  if(req.query.q) {
    var pn = req.query.pn?Number(req.query.pn):0
  	var options = {
      host: 'apis.juhe.cn',
      port: 80,
      path: '/cook/query?key='+req.app.locals.key+'&menu='+encodeURIComponent(req.query.q)+'&rn=20&pn='+pn
    }
    var _req = http.request(options, (_res)=>{
    	var data = '';
    	_res.on('data',(chunk)=>{
    		data+=chunk;
    	})
    	_res.on('end',()=>{
    		res.render('search', {title:req.query.q, data: JSON.parse(data)})
    	})
    })
    _req.end();  
  }
  else {
  	res.redirect('/')
  }
  
});


module.exports = router;
