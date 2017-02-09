$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});

// 改变导航active状态g
if(window.location.pathname.indexOf('list')>-1){
	$('.navbar-nav').find('li')
     .removeClass('nav-current').eq(1)
     .addClass('nav-current')
}



