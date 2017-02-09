$(function(){
	var key = '307e911ce5d804e97c102a74a52fa873';
	var cid = window.location.pathname.split('/list/')[1];
	var page = 1;
	var b = true;
	$(window).scroll(function(){
		var scrollHeight = $(document).scrollTop()+$(window).height();
		var boxHeight = $('.tag-content').height() + $('.tag-content').offset().top; 
		if(scrollHeight>boxHeight) {
			if(b) {
				b = false;
				getData();
			}
		}
        // 回到顶部
		if($(this).scrollTop() > 600){ 
			$("#scrollUp").fadeIn(1500); 
		}else { 
			$("#scrollUp").fadeOut(1500); 
		} 
		
		  
	})


	function getData(){
		$.ajax({
			url: 'http://120.132.0.15/list/'+cid,
			type: 'POST',
			data: {key:key, pn:page*24},
			dataType: 'json',
			headers: {'X-Requested-With': 'XMLHttpRequest'}
		}).then(function(data){
			//  请求成功回调
			if(data.list.error_code == 0) {
				$('.error').css('display',"none");
				$('.load').css('display',"block")
				$.each(data.list.result.data,function(index,value) {
					var clone = $('.cp-box').eq(0).clone(false,false);
					clone.find('.thumbnail').children('a')
					  .attr('href',"/cookbook/"+value.id)
					  .find('img')
					  .attr({src:value.albums[0], alt:value.title})
					clone.find('.thumbnail .caption')
					  .find('h3 a')
					  .attr('href','/cookbook/'+value.id)
					  .text(value.title)
					  .parents('.caption').find('.tag-cloud')
					  .html(function(){
					  	var html = '';
					  	$.each(value.tags.split(';'),function(i,v){
					  		var id = $.inArray(v, data.listId)
					  		if( id> -1) {
					  			html += '<a class="tag" href="/cookbook/"'+id+'>'+v+'</a>'
					  		}else{
					  			html += '<span class="tag" style="background-color:#ccc">'+v+'</span>'
					  		}
					  	})
					  	return html	
					  })
					  clone.appendTo('.tag-content');
				})
				b = true;
			    page++;
			}else{
				if(data.list.error_code!==204605) {
					$('.error').css('display',"block").find('a').text('加载失败，错误代码('+data.list.error_code+')')
				}
				
				$('.loading').css('display',"none")
			}
			
		},function(jqXHR, textStatus, errorThrown){
		    //  请求失败回调

			$('.error').css('display',"block");
			$('.loading').css('display',"none")
		})
	}
    
	//当点击跳转链接后，回到页面顶部位置
	$("#scrollUp").click(function(){   
        $('body,html').animate({ scrollTop: 0 }, 1000);  
        return false;              
    }); 

    
})