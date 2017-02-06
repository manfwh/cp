var http = require('http');
var baseUrl = 'http://www.douguo.com/';
var cheerio = require('cheerio');
function Crawler() {
	this.url = baseUrl;
	this.cp = [];
}
Crawler.prototype.getPages = function(url) {
	return new Promise(function(resolve, reject){
		http.get(url, function(res){
			console.log('正在爬取：'+url)
			var html = '';
			res.on('data',function(data){
				html+=data;
			})
			res.on('end',function(){
				console.log('爬取成功')
				resolve(html);
			})
		}).on('error',function(err){
			
			reject(err)
			
		})
	})
}
Crawler.prototype.resolve = function(html) {
	var cp = [];
	var $ = cheerio.load(html);
	$(".recipes").find(".fContainer").each(function(index,element){
		var img = $(this).find(".retu img");
		cp[index] = {};
		cp[index].img = img.attr('src');
		cp[index].title = img.attr('alt');
		cp[index].name = $(this).find('.bgtm .na .user').text();
	});
	this.cp= cp;
}
Crawler.prototype.reject = function(err) {
	console.log('请求失败'+err)
}
module.exports = Crawler;