var express = require('express');
var http = require('http');
var router = express.Router();


/* GET 菜谱详情页. */
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  	var options = {
      host: 'apis.juhe.cn',
      port: 80,
      path: '/cook/queryid?key='+req.app.locals.key+'&id='+id
    }
    var _req = http.request(options, (_res)=>{
    	var data = '';
    	_res.on('data',(chunk)=>{
    		data+=chunk;
    	})
    	_res.on('end',()=>{
        var result = JSON.parse(data);
        if(result.error_code==0) {
          res.render('detail', {data:result})
        } else{
          next(new Error(result.error_code,result.reason))
        }
    		
    	})
    })
    _req.end();  
});


module.exports = router;
