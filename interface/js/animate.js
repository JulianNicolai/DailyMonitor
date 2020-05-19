$(function () {
    var effectPulse = 'animated pulseinout faster';
    var effectEnd = 'animationend oAnimationEnd mozAnimationEnd webkitAnimationEnd';
    var effectRotateCW = 'animated rotate90cw faster';
    var effectRotateCCW = 'animated rotate90ccw faster';
    var effectFadeInRight = 'animated fadeInRight faster'
    var effectFadeOutRight = 'animated fadeOutRight faster'
    var i = 0;
    
    $('a.sidebar-link').click(function () {
        
        $(this).addClass(effectPulse).one(effectEnd, function () {
            
            $(this).removeClass(effectPulse);
            
        });        
    });
//----------------------------------------------------------------------------
    $('a#projects').click(function () {
        
        if (i == 0) {
            
            $('img#project-menu-icon').addClass(effectRotateCW).one(effectEnd, function () {
                $('img#project-menu-icon').removeClass(effectRotateCW);
            });
                        
            $('div#sidebar-projects').removeClass('display-none');
            
            $('a.project-menu').addClass(effectFadeInRight).one(effectEnd, function () {
                $('a.project-menu').removeClass(effectFadeInRight);
            });
                        
            i = i + 1;
            
        } else if (i == 1) {
            
            $('img#project-menu-icon').addClass(effectRotateCCW).one(effectEnd, function () {
                $('img#project-menu-icon').removeClass(effectRotateCCW);
            });
            
            $('a.project-menu').addClass(effectFadeOutRight).one(effectEnd, function () {
                $('a.project-menu').removeClass(effectFadeOutRight);
                $('div#sidebar-projects').addClass('display-none');
            });
            
            i = 0;
            
        };
                
        $('img#project-menu-icon').toggleClass('rotate-unclicked');
        
    });
//-----------------------------------------------------------------------------
	$('img.click').click(function () {
        $(this).addClass(effectPulse).one(effectEnd, function () {
            $(this).removeClass(effectPulse);
        });
    });
//-----------------------------------------------------------------------------
    $('a.button').click(function () {
        $(this).addClass(effectPulse).one(effectEnd, function () {
            $(this).removeClass(effectPulse);
        });
    });
});