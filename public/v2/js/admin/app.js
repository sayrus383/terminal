(function($) {
    'use strict';
    $(function() {
        var body = $('body');
        var footer = $('.footer');

        // var current = location.pathname.split("/").slice(-1)[0].replace(/^\/|\/$/g, '');
        // $('.navbar.horizontal-layout .nav-bottom .page-navigation .nav-item').each(function() {
        //   var $this = $(this);
        //   if (current === "") {
        //     //for root url
        //     if ($this.find(".nav-link").attr('href').indexOf("index.html") !== -1) {
        //       $(this).find(".nav-link").parents('.nav-item').last().addClass('active');
        //       $(this).addClass("active");
        //     }
        //   } else {
        //     //for other url
        //     if ($this.find(".nav-link").attr('href').indexOf(current) !== -1) {
        //       $(this).find(".nav-link").parents('.nav-item').last().addClass('active');
        //       $(this).addClass("active");
        //     }
        //   }
        // })

        $(window).scroll(function() {
            var headerBottom = '.navbar.horizontal-layout .nav-bottom';
            if ($(window).scrollTop() >= 70) {
                $(headerBottom).addClass('fixed-top');
            } else {
                $(headerBottom).removeClass('fixed-top');
            }
        });

        $(".navbar.horizontal-layout .navbar-menu-wrapper .navbar-toggler").on("click", function() {
            $(".navbar.horizontal-layout .nav-bottom").toggleClass("header-toggled");
        });

        //checkbox and radios
        $(".form-check .form-check-label,.form-radio .form-check-label").not(".todo-form-check .form-check-label").append('<i class="input-helper"></i>');

    });
})(jQuery);

(function ($) {
    'use strict';
    $.fn.easyNotify = function (options) {

        var settings = $.extend({
            title: "Notification",
            options: {
                body: "",
                icon: "",
                lang: 'pt-BR',
                onClose: "",
                onClick: "",
                onError: ""
            }
        }, options);

        this.init = function () {
            var notify = this;
            if (!("Notification" in window)) {
                alert("This browser does not support desktop notification");
            } else if (Notification.permission === "granted") {

                var notification = new Notification(settings.title, settings.options);

                notification.onclose = function () {
                    if (typeof settings.options.onClose === 'function') {
                        settings.options.onClose();
                    }
                };

                notification.onclick = function () {
                    if (typeof settings.options.onClick === 'function') {
                        settings.options.onClick();
                    }
                };

                notification.onerror = function () {
                    if (typeof settings.options.onError === 'function') {
                        settings.options.onError();
                    }
                };

            } else if (Notification.permission !== 'denied') {
                Notification.requestPermission(function (permission) {
                    if (permission === "granted") {
                        notify.init();
                    }

                });
            }

        };

        this.init();
        return this;
    };
}(jQuery));

/*!
 * Viewer.js v1.6.1
 * https://fengyuanchen.github.io/viewerjs
 *
 * Copyright 2015-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2020-06-14T07:47:18.114Z
 */
!function(t,i){"object"==typeof exports&&"undefined"!=typeof module?module.exports=i():"function"==typeof define&&define.amd?define(i):(t=t||self).Viewer=i()}(this,function(){"use strict";function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function s(t,i){for(var e=0;e<i.length;e++){var n=i[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function e(i,t){var e,n=Object.keys(i);return Object.getOwnPropertySymbols&&(e=Object.getOwnPropertySymbols(i),t&&(e=e.filter(function(t){return Object.getOwnPropertyDescriptor(i,t).enumerable})),n.push.apply(n,e)),n}function c(s){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?e(Object(o),!0).forEach(function(t){var i,e,n;i=s,n=o[e=t],e in i?Object.defineProperty(i,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):i[e]=n}):Object.getOwnPropertyDescriptors?Object.defineProperties(s,Object.getOwnPropertyDescriptors(o)):e(Object(o)).forEach(function(t){Object.defineProperty(s,t,Object.getOwnPropertyDescriptor(o,t))})}return s}var o={backdrop:!0,button:!0,navbar:!0,title:!0,toolbar:!0,className:"",container:"body",filter:null,fullscreen:!0,inheritedAttributes:["crossOrigin","decoding","isMap","loading","referrerPolicy","sizes","srcset","useMap"],initialViewIndex:0,inline:!1,interval:5e3,keyboard:!0,loading:!0,loop:!0,minWidth:200,minHeight:100,movable:!0,rotatable:!0,scalable:!0,zoomable:!0,zoomOnTouch:!0,zoomOnWheel:!0,slideOnTouch:!0,toggleOnDblclick:!0,tooltip:!0,transition:!0,zIndex:2015,zIndexInline:0,zoomRatio:.1,minZoomRatio:.01,maxZoomRatio:100,url:"src",ready:null,show:null,shown:null,hide:null,hidden:null,view:null,viewed:null,zoom:null,zoomed:null},t="undefined"!=typeof window&&void 0!==window.document,n=t?window:{},a=!(!t||!n.document.documentElement)&&"ontouchstart"in n.document.documentElement,r=t&&"PointerEvent"in n,v="viewer",u="move",d="switch",m="zoom",g="".concat(v,"-active"),w="".concat(v,"-close"),b="".concat(v,"-fade"),y="".concat(v,"-fixed"),x="".concat(v,"-fullscreen"),h="".concat(v,"-fullscreen-exit"),z="".concat(v,"-hide"),l="".concat(v,"-hide-md-down"),f="".concat(v,"-hide-sm-down"),p="".concat(v,"-hide-xs-down"),k="".concat(v,"-in"),D="".concat(v,"-invisible"),T="".concat(v,"-loading"),I="".concat(v,"-move"),E="".concat(v,"-open"),O="".concat(v,"-show"),S="".concat(v,"-transition"),C="click",L="dblclick",R="dragstart",A="hidden",N="hide",M="keydown",P="load",Y=r?"pointerdown":a?"touchstart":"mousedown",q=r?"pointermove":a?"touchmove":"mousemove",X=r?"pointerup pointercancel":a?"touchend touchcancel":"mouseup",F="ready",W="resize",j="show",H="shown",B="transitionend",V="viewed",U="".concat(v,"Action"),K=/\s\s*/,Z=["zoom-in","zoom-out","one-to-one","reset","prev","play","next","rotate-left","rotate-right","flip-horizontal","flip-vertical"];function $(t){return"string"==typeof t}var _=Number.isNaN||n.isNaN;function G(t){return"number"==typeof t&&!_(t)}function J(t){return void 0===t}function Q(t){return"object"===i(t)&&null!==t}var tt=Object.prototype.hasOwnProperty;function it(t){if(!Q(t))return!1;try{var i=t.constructor,e=i.prototype;return i&&e&&tt.call(e,"isPrototypeOf")}catch(t){return!1}}function et(t){return"function"==typeof t}function nt(i,e){if(i&&et(e))if(Array.isArray(i)||G(i.length))for(var t=i.length,n=0;n<t&&!1!==e.call(i,i[n],n,i);n+=1);else Q(i)&&Object.keys(i).forEach(function(t){e.call(i,i[t],t,i)});return i}var st=Object.assign||function(e){for(var t=arguments.length,i=new Array(1<t?t-1:0),n=1;n<t;n++)i[n-1]=arguments[n];return Q(e)&&0<i.length&&i.forEach(function(i){Q(i)&&Object.keys(i).forEach(function(t){e[t]=i[t]})}),e},ot=/^(?:width|height|left|top|marginLeft|marginTop)$/;function at(t,i){var e=t.style;nt(i,function(t,i){ot.test(i)&&G(t)&&(t+="px"),e[i]=t})}function rt(t,i){return t&&i&&(t.classList?t.classList.contains(i):-1<t.className.indexOf(i))}function ht(t,i){var e;t&&i&&(G(t.length)?nt(t,function(t){ht(t,i)}):t.classList?t.classList.add(i):(e=t.className.trim())?e.indexOf(i)<0&&(t.className="".concat(e," ").concat(i)):t.className=i)}function lt(t,i){t&&i&&(G(t.length)?nt(t,function(t){lt(t,i)}):t.classList?t.classList.remove(i):0<=t.className.indexOf(i)&&(t.className=t.className.replace(i,"")))}function ct(t,i,e){i&&(G(t.length)?nt(t,function(t){ct(t,i,e)}):(e?ht:lt)(t,i))}var ut=/([a-z\d])([A-Z])/g;function dt(t){return t.replace(ut,"$1-$2").toLowerCase()}function mt(t,i){return Q(t[i])?t[i]:t.dataset?t.dataset[i]:t.getAttribute("data-".concat(dt(i)))}function gt(t,i,e){Q(e)?t[i]=e:t.dataset?t.dataset[i]=e:t.setAttribute("data-".concat(dt(i)),e)}var ft,pt,vt,wt,bt=(wt=!1,t&&(ft=!1,pt=function(){},vt=Object.defineProperty({},"once",{get:function(){return wt=!0,ft},set:function(t){ft=t}}),n.addEventListener("test",pt,vt),n.removeEventListener("test",pt,vt)),wt);function yt(e,t,n,i){var s=3<arguments.length&&void 0!==i?i:{},o=n;t.trim().split(K).forEach(function(t){var i;bt||(i=e.listeners)&&i[t]&&i[t][n]&&(o=i[t][n],delete i[t][n],0===Object.keys(i[t]).length&&delete i[t],0===Object.keys(i).length&&delete e.listeners),e.removeEventListener(t,o,s)})}function xt(o,t,a,i){var r=3<arguments.length&&void 0!==i?i:{},h=a;t.trim().split(K).forEach(function(n){var t,s;r.once&&!bt&&(t=o.listeners,h=function(){delete s[n][a],o.removeEventListener(n,h,r);for(var t=arguments.length,i=new Array(t),e=0;e<t;e++)i[e]=arguments[e];a.apply(o,i)},(s=void 0===t?{}:t)[n]||(s[n]={}),s[n][a]&&o.removeEventListener(n,s[n][a],r),s[n][a]=h,o.listeners=s),o.addEventListener(n,h,r)})}function zt(t,i,e){var n;return et(Event)&&et(CustomEvent)?n=new CustomEvent(i,{detail:e,bubbles:!0,cancelable:!0}):(n=document.createEvent("CustomEvent")).initCustomEvent(i,!0,!0,e),t.dispatchEvent(n)}function kt(t){var i=t.rotate,e=t.scaleX,n=t.scaleY,s=t.translateX,o=t.translateY,a=[];G(s)&&0!==s&&a.push("translateX(".concat(s,"px)")),G(o)&&0!==o&&a.push("translateY(".concat(o,"px)")),G(i)&&0!==i&&a.push("rotate(".concat(i,"deg)")),G(e)&&1!==e&&a.push("scaleX(".concat(e,")")),G(n)&&1!==n&&a.push("scaleY(".concat(n,")"));var r=a.length?a.join(" "):"none";return{WebkitTransform:r,msTransform:r,transform:r}}var Dt=n.navigator&&/(Macintosh|iPhone|iPod|iPad).*AppleWebKit/i.test(n.navigator.userAgent);function Tt(e,t,i){var n=document.createElement("img");if(e.naturalWidth&&!Dt)return i(e.naturalWidth,e.naturalHeight),n;var s=document.body||document.documentElement;return n.onload=function(){i(n.width,n.height),Dt||s.removeChild(n)},nt(t.inheritedAttributes,function(t){var i=e.getAttribute(t);null!==i&&n.setAttribute(t,i)}),n.src=e.src,Dt||(n.style.cssText="left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;",s.appendChild(n)),n}function It(t){switch(t){case 2:return p;case 3:return f;case 4:return l;default:return""}}function Et(t,i){var e=t.pageX,n=t.pageY,s={endX:e,endY:n};return i?s:c({timeStamp:Date.now(),startX:e,startY:n},s)}var Ot={render:function(){this.initContainer(),this.initViewer(),this.initList(),this.renderViewer()},initBody:function(){var t=this.element.ownerDocument,i=t.body||t.documentElement;this.body=i,this.scrollbarWidth=window.innerWidth-t.documentElement.clientWidth,this.initialBodyPaddingRight=i.style.paddingRight,this.initialBodyComputedPaddingRight=window.getComputedStyle(i).paddingRight},initContainer:function(){this.containerData={width:window.innerWidth,height:window.innerHeight}},initViewer:function(){var t,i=this.options,e=this.parent;i.inline&&(t={width:Math.max(e.offsetWidth,i.minWidth),height:Math.max(e.offsetHeight,i.minHeight)},this.parentData=t),!this.fulled&&t||(t=this.containerData),this.viewerData=st({},t)},renderViewer:function(){this.options.inline&&!this.fulled&&at(this.viewer,this.viewerData)},initList:function(){var h=this,t=this.element,l=this.options,c=this.list,u=[];c.innerHTML="",nt(this.images,function(e,t){var i,n,s,o=e.src,a=e.alt||($(i=o)?decodeURIComponent(i.replace(/^.*\//,"").replace(/[?&#].*$/,"")):""),r=h.getImageURL(e);(o||r)&&(n=document.createElement("li"),s=document.createElement("img"),nt(l.inheritedAttributes,function(t){var i=e.getAttribute(t);null!==i&&s.setAttribute(t,i)}),s.src=o||r,s.alt=a,s.setAttribute("data-index",t),s.setAttribute("data-original-url",r||o),s.setAttribute("data-viewer-action","view"),s.setAttribute("role","button"),n.appendChild(s),c.appendChild(n),u.push(n))}),nt(this.items=u,function(i){var t=i.firstElementChild;gt(t,"filled",!0),l.loading&&ht(i,T),xt(t,P,function(t){l.loading&&lt(i,T),h.loadImage(t)},{once:!0})}),l.transition&&xt(t,V,function(){ht(c,S)},{once:!0})},renderList:function(t){var i=t||this.index,e=this.items[i].offsetWidth||30,n=e+1;at(this.list,st({width:n*this.length},kt({translateX:(this.viewerData.width-e)/2-n*i})))},resetList:function(){var t=this.list;t.innerHTML="",lt(t,S),at(t,kt({translateX:0}))},initImage:function(r){var t,h=this,l=this.options,i=this.image,e=this.viewerData,n=this.footer.offsetHeight,c=e.width,u=Math.max(e.height-n,n),d=this.imageData||{};this.imageInitializing={abort:function(){t.onload=null}},t=Tt(i,l,function(t,i){var e=t/i,n=c,s=u;h.imageInitializing=!1,c<u*e?s=c/e:n=u*e;var o={naturalWidth:t,naturalHeight:i,aspectRatio:e,ratio:(n=Math.min(.9*n,t))/t,width:n,height:s=Math.min(.9*s,i),left:(c-n)/2,top:(u-s)/2},a=st({},o);l.rotatable&&(o.rotate=d.rotate||0,a.rotate=0),l.scalable&&(o.scaleX=d.scaleX||1,o.scaleY=d.scaleY||1,a.scaleX=1,a.scaleY=1),h.imageData=o,h.initialImageData=a,r&&r()})},renderImage:function(t){var i,e=this,n=this.image,s=this.imageData;at(n,st({width:s.width,height:s.height,marginLeft:s.left,marginTop:s.top},kt(s))),t&&((this.viewing||this.zooming)&&this.options.transition?(i=function(){e.imageRendering=!1,t()},this.imageRendering={abort:function(){yt(n,B,i)}},xt(n,B,i,{once:!0})):t())},resetImage:function(){var t;(this.viewing||this.viewed)&&(t=this.image,this.viewing&&this.viewing.abort(),t.parentNode.removeChild(t),this.image=null)}},St={bind:function(){var t=this.options,i=this.viewer,e=this.canvas,n=this.element.ownerDocument;xt(i,C,this.onClick=this.click.bind(this)),xt(i,R,this.onDragStart=this.dragstart.bind(this)),xt(e,Y,this.onPointerDown=this.pointerdown.bind(this)),xt(n,q,this.onPointerMove=this.pointermove.bind(this)),xt(n,X,this.onPointerUp=this.pointerup.bind(this)),xt(n,M,this.onKeyDown=this.keydown.bind(this)),xt(window,W,this.onResize=this.resize.bind(this)),t.zoomable&&t.zoomOnWheel&&xt(i,"wheel",this.onWheel=this.wheel.bind(this),{passive:!1,capture:!0}),t.toggleOnDblclick&&xt(e,L,this.onDblclick=this.dblclick.bind(this))},unbind:function(){var t=this.options,i=this.viewer,e=this.canvas,n=this.element.ownerDocument;yt(i,C,this.onClick),yt(i,R,this.onDragStart),yt(e,Y,this.onPointerDown),yt(n,q,this.onPointerMove),yt(n,X,this.onPointerUp),yt(n,M,this.onKeyDown),yt(window,W,this.onResize),t.zoomable&&t.zoomOnWheel&&yt(i,"wheel",this.onWheel,{passive:!1,capture:!0}),t.toggleOnDblclick&&yt(e,L,this.onDblclick)}},Ct={click:function(t){var i=t.target,e=this.options,n=this.imageData,s=mt(i,U);switch(a&&t.isTrusted&&i===this.canvas&&clearTimeout(this.clickCanvasTimeout),s){case"mix":this.played?this.stop():e.inline?this.fulled?this.exit():this.full():this.hide();break;case"hide":this.hide();break;case"view":this.view(mt(i,"index"));break;case"zoom-in":this.zoom(.1,!0);break;case"zoom-out":this.zoom(-.1,!0);break;case"one-to-one":this.toggle();break;case"reset":this.reset();break;case"prev":this.prev(e.loop);break;case"play":this.play(e.fullscreen);break;case"next":this.next(e.loop);break;case"rotate-left":this.rotate(-90);break;case"rotate-right":this.rotate(90);break;case"flip-horizontal":this.scaleX(-n.scaleX||-1);break;case"flip-vertical":this.scaleY(-n.scaleY||-1);break;default:this.played&&this.stop()}},dblclick:function(t){t.preventDefault(),this.viewed&&t.target===this.image&&(a&&t.isTrusted&&clearTimeout(this.doubleClickImageTimeout),this.toggle())},load:function(){var t=this;this.timeout&&(clearTimeout(this.timeout),this.timeout=!1);var i=this.element,e=this.options,n=this.image,s=this.index,o=this.viewerData;lt(n,D),e.loading&&lt(this.canvas,T),n.style.cssText="height:0;"+"margin-left:".concat(o.width/2,"px;")+"margin-top:".concat(o.height/2,"px;")+"max-width:none!important;position:absolute;width:0;",this.initImage(function(){ct(n,I,e.movable),ct(n,S,e.transition),t.renderImage(function(){t.viewed=!0,t.viewing=!1,et(e.viewed)&&xt(i,V,e.viewed,{once:!0}),zt(i,V,{originalImage:t.images[s],index:s,image:n})})})},loadImage:function(t){var o=t.target,i=o.parentNode,a=i.offsetWidth||30,r=i.offsetHeight||50,h=!!mt(o,"filled");Tt(o,this.options,function(t,i){var e=t/i,n=a,s=r;a<r*e?h?n=r*e:s=a/e:h?s=a/e:n=r*e,at(o,st({width:n,height:s},kt({translateX:(a-n)/2,translateY:(r-s)/2})))})},keydown:function(t){var i=this.options;if(this.fulled&&i.keyboard)switch(t.keyCode||t.which||t.charCode){case 27:this.played?this.stop():i.inline?this.fulled&&this.exit():this.hide();break;case 32:this.played&&this.stop();break;case 37:this.prev(i.loop);break;case 38:t.preventDefault(),this.zoom(i.zoomRatio,!0);break;case 39:this.next(i.loop);break;case 40:t.preventDefault(),this.zoom(-i.zoomRatio,!0);break;case 48:case 49:t.ctrlKey&&(t.preventDefault(),this.toggle())}},dragstart:function(t){"img"===t.target.tagName.toLowerCase()&&t.preventDefault()},pointerdown:function(t){var i,e=this.options,n=this.pointers,s=t.buttons,o=t.button;!this.viewed||this.showing||this.viewing||this.hiding||("mousedown"===t.type||"pointerdown"===t.type&&"mouse"===t.pointerType)&&(G(s)&&1!==s||G(o)&&0!==o||t.ctrlKey)||(t.preventDefault(),t.changedTouches?nt(t.changedTouches,function(t){n[t.identifier]=Et(t)}):n[t.pointerId||0]=Et(t),i=!!e.movable&&u,e.zoomOnTouch&&e.zoomable&&1<Object.keys(n).length?i=m:e.slideOnTouch&&("touch"===t.pointerType||"touchstart"===t.type)&&this.isSwitchable()&&(i=d),!e.transition||i!==u&&i!==m||lt(this.image,S),this.action=i)},pointermove:function(t){var i=this.pointers,e=this.action;this.viewed&&e&&(t.preventDefault(),t.changedTouches?nt(t.changedTouches,function(t){st(i[t.identifier]||{},Et(t,!0))}):st(i[t.pointerId||0]||{},Et(t,!0)),this.change(t))},pointerup:function(t){var i,e=this,n=this.options,s=this.action,o=this.pointers;t.changedTouches?nt(t.changedTouches,function(t){i=o[t.identifier],delete o[t.identifier]}):(i=o[t.pointerId||0],delete o[t.pointerId||0]),s&&(t.preventDefault(),!n.transition||s!==u&&s!==m||ht(this.image,S),this.action=!1,a&&s!==m&&i&&Date.now()-i.timeStamp<500&&(clearTimeout(this.clickCanvasTimeout),clearTimeout(this.doubleClickImageTimeout),n.toggleOnDblclick&&this.viewed&&t.target===this.image?this.imageClicked?(this.imageClicked=!1,this.doubleClickImageTimeout=setTimeout(function(){zt(e.image,L)},50)):(this.imageClicked=!0,this.doubleClickImageTimeout=setTimeout(function(){e.imageClicked=!1},500)):(this.imageClicked=!1,n.backdrop&&"static"!==n.backdrop&&t.target===this.canvas&&(this.clickCanvasTimeout=setTimeout(function(){zt(e.canvas,C)},50)))))},resize:function(){var i=this;if(this.isShown&&!this.hiding&&(this.fulled&&(this.close(),this.initBody(),this.open()),this.initContainer(),this.initViewer(),this.renderViewer(),this.renderList(),this.viewed&&this.initImage(function(){i.renderImage()}),this.played)){if(this.options.fullscreen&&this.fulled&&!(document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement))return void this.stop();nt(this.player.getElementsByTagName("img"),function(t){xt(t,P,i.loadImage.bind(i),{once:!0}),zt(t,P)})}},wheel:function(t){var i,e,n=this;this.viewed&&(t.preventDefault(),this.wheeling||(this.wheeling=!0,setTimeout(function(){n.wheeling=!1},50),i=Number(this.options.zoomRatio)||.1,e=1,t.deltaY?e=0<t.deltaY?1:-1:t.wheelDelta?e=-t.wheelDelta/120:t.detail&&(e=0<t.detail?1:-1),this.zoom(-e*i,!0,t)))}},Lt={show:function(t){var i=0<arguments.length&&void 0!==t&&t,e=this.element,n=this.options;if(n.inline||this.showing||this.isShown||this.showing)return this;if(!this.ready)return this.build(),this.ready&&this.show(i),this;if(et(n.show)&&xt(e,j,n.show,{once:!0}),!1===zt(e,j)||!this.ready)return this;this.hiding&&this.transitioning.abort(),this.showing=!0,this.open();var s,o=this.viewer;return lt(o,z),n.transition&&!i?(s=this.shown.bind(this),this.transitioning={abort:function(){yt(o,B,s),lt(o,k)}},ht(o,S),o.initialOffsetWidth=o.offsetWidth,xt(o,B,s,{once:!0}),ht(o,k)):(ht(o,k),this.shown()),this},hide:function(){var t=0<arguments.length&&void 0!==arguments[0]&&arguments[0],i=this.element,e=this.options;if(e.inline||this.hiding||!this.isShown&&!this.showing)return this;if(et(e.hide)&&xt(i,N,e.hide,{once:!0}),!1===zt(i,N))return this;this.showing&&this.transitioning.abort(),this.hiding=!0,this.played?this.stop():this.viewing&&this.viewing.abort();var n,s,o=this.viewer;return e.transition&&rt(this.image,S)&&!t?(n=this.hidden.bind(this),s=function(){setTimeout(function(){xt(o,B,n,{once:!0}),lt(o,k)},0)},this.transitioning={abort:function(){this.viewed?yt(this.image,B,s):yt(o,B,n)}},this.viewed?(xt(this.image,B,s,{once:!0}),this.zoomTo(0,!1,!1,!0)):s()):(lt(o,k),this.hidden()),this},view:function(t){var n=this,i=0<arguments.length&&void 0!==t?t:this.options.initialViewIndex,i=Number(i)||0;if(this.hiding||this.played||i<0||i>=this.length||this.viewed&&i===this.index)return this;if(!this.isShown)return this.index=i,this.show();this.viewing&&this.viewing.abort();var e=this.element,s=this.options,o=this.title,a=this.canvas,r=this.items[i],h=r.querySelector("img"),l=mt(h,"originalUrl"),c=h.getAttribute("alt"),u=document.createElement("img");if(nt(s.inheritedAttributes,function(t){var i=h.getAttribute(t);null!==i&&u.setAttribute(t,i)}),u.src=l,u.alt=c,et(s.view)&&xt(e,"view",s.view,{once:!0}),!1===zt(e,"view",{originalImage:this.images[i],index:i,image:u})||!this.isShown||this.hiding||this.played)return this;this.image=u,lt(this.items[this.index],g),ht(r,g),this.viewed=!1,this.index=i,this.imageData={},ht(u,D),s.loading&&ht(a,T),a.innerHTML="",a.appendChild(u),this.renderList(),o.innerHTML="";function d(){var t,i=n.imageData,e=Array.isArray(s.title)?s.title[1]:s.title;o.innerHTML=$(t=et(e)?e.call(n,u,i):"".concat(c," (").concat(i.naturalWidth," × ").concat(i.naturalHeight,")"))?t.replace(/&(?!amp;|quot;|#39;|lt;|gt;)/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):t}var m;return xt(e,V,d,{once:!0}),this.viewing={abort:function(){yt(e,V,d),u.complete?this.imageRendering?this.imageRendering.abort():this.imageInitializing&&this.imageInitializing.abort():(u.src="",yt(u,P,m),this.timeout&&clearTimeout(this.timeout))}},u.complete?this.load():(xt(u,P,m=this.load.bind(this),{once:!0}),this.timeout&&clearTimeout(this.timeout),this.timeout=setTimeout(function(){lt(u,D),n.timeout=!1},1e3)),this},prev:function(t){var i=0<arguments.length&&void 0!==t&&t,e=this.index-1;return e<0&&(e=i?this.length-1:0),this.view(e),this},next:function(t){var i=0<arguments.length&&void 0!==t&&t,e=this.length-1,n=this.index+1;return e<n&&(n=i?0:e),this.view(n),this},move:function(t,i){var e=this.imageData;return this.moveTo(J(t)?t:e.left+Number(t),J(i)?i:e.top+Number(i)),this},moveTo:function(t,i){var e,n=1<arguments.length&&void 0!==i?i:t,s=this.imageData;return t=Number(t),n=Number(n),this.viewed&&!this.played&&this.options.movable&&(e=!1,G(t)&&(s.left=t,e=!0),G(n)&&(s.top=n,e=!0),e&&this.renderImage()),this},zoom:function(t,i,e){var n=1<arguments.length&&void 0!==i&&i,s=2<arguments.length&&void 0!==e?e:null,o=this.imageData;return t=(t=Number(t))<0?1/(1-t):1+t,this.zoomTo(o.width*t/o.naturalWidth,n,s),this},zoomTo:function(t,i,e,n){var s,o,a,r,h,l,c,u=this,d=1<arguments.length&&void 0!==i&&i,m=2<arguments.length&&void 0!==e?e:null,g=3<arguments.length&&void 0!==n&&n,f=this.element,p=this.options,v=this.pointers,w=this.imageData,b=w.width,y=w.height,x=w.left,z=w.top,k=w.naturalWidth,D=w.naturalHeight;if(G(t=Math.max(0,t))&&this.viewed&&!this.played&&(g||p.zoomable)){g||(s=Math.max(.01,p.minZoomRatio),o=Math.min(100,p.maxZoomRatio),t=Math.min(Math.max(t,s),o)),m&&.95<t&&t<1.05&&(t=1);var T,I,E=k*t,O=D*t,S=E-b,C=O-y,L=b/k;if(et(p.zoom)&&xt(f,"zoom",p.zoom,{once:!0}),!1===zt(f,"zoom",{ratio:t,oldRatio:L,originalEvent:m}))return this;this.zooming=!0,m?(l=this.viewer,T={left:(c=l.getBoundingClientRect()).left+(window.pageXOffset-document.documentElement.clientLeft),top:c.top+(window.pageYOffset-document.documentElement.clientTop)},I=v&&Object.keys(v).length?(h=r=a=0,nt(v,function(t){var i=t.startX,e=t.startY;a+=i,r+=e,h+=1}),{pageX:a/=h,pageY:r/=h}):{pageX:m.pageX,pageY:m.pageY},w.left-=(I.pageX-T.left-x)/b*S,w.top-=(I.pageY-T.top-z)/y*C):(w.left-=S/2,w.top-=C/2),w.width=E,w.height=O,w.ratio=t,this.renderImage(function(){u.zooming=!1,et(p.zoomed)&&xt(f,"zoomed",p.zoomed,{once:!0}),zt(f,"zoomed",{ratio:t,oldRatio:L,originalEvent:m})}),d&&this.tooltip()}return this},rotate:function(t){return this.rotateTo((this.imageData.rotate||0)+Number(t)),this},rotateTo:function(t){var i=this.imageData;return G(t=Number(t))&&this.viewed&&!this.played&&this.options.rotatable&&(i.rotate=t,this.renderImage()),this},scaleX:function(t){return this.scale(t,this.imageData.scaleY),this},scaleY:function(t){return this.scale(this.imageData.scaleX,t),this},scale:function(t,i){var e,n=1<arguments.length&&void 0!==i?i:t,s=this.imageData;return t=Number(t),n=Number(n),this.viewed&&!this.played&&this.options.scalable&&(e=!1,G(t)&&(s.scaleX=t,e=!0),G(n)&&(s.scaleY=n,e=!0),e&&this.renderImage()),this},play:function(){var i=this,t=0<arguments.length&&void 0!==arguments[0]&&arguments[0];if(!this.isShown||this.played)return this;var e,s=this.options,o=this.player,a=this.loadImage.bind(this),r=[],h=0,l=0;return this.played=!0,this.onLoadWhenPlay=a,t&&this.requestFullscreen(),ht(o,O),nt(this.items,function(t,i){var e=t.querySelector("img"),n=document.createElement("img");n.src=mt(e,"originalUrl"),n.alt=e.getAttribute("alt"),n.referrerPolicy=e.referrerPolicy,h+=1,ht(n,b),ct(n,S,s.transition),rt(t,g)&&(ht(n,k),l=i),r.push(n),xt(n,P,a,{once:!0}),o.appendChild(n)}),G(s.interval)&&0<s.interval&&(e=function t(){i.playing=setTimeout(function(){lt(r[l],k),ht(r[l=(l+=1)<h?l:0],k),t()},s.interval)},1<h&&e()),this},stop:function(){var i=this;if(!this.played)return this;var t=this.player;return this.played=!1,clearTimeout(this.playing),nt(t.getElementsByTagName("img"),function(t){yt(t,P,i.onLoadWhenPlay)}),lt(t,O),t.innerHTML="",this.exitFullscreen(),this},full:function(){var t=this,i=this.options,e=this.viewer,n=this.image,s=this.list;return!this.isShown||this.played||this.fulled||!i.inline||(this.fulled=!0,this.open(),ht(this.button,h),i.transition&&(lt(s,S),this.viewed&&lt(n,S)),ht(e,y),e.setAttribute("style",""),at(e,{zIndex:i.zIndex}),this.initContainer(),this.viewerData=st({},this.containerData),this.renderList(),this.viewed&&this.initImage(function(){t.renderImage(function(){i.transition&&setTimeout(function(){ht(n,S),ht(s,S)},0)})})),this},exit:function(){var t=this,i=this.options,e=this.viewer,n=this.image,s=this.list;return this.isShown&&!this.played&&this.fulled&&i.inline&&(this.fulled=!1,this.close(),lt(this.button,h),i.transition&&(lt(s,S),this.viewed&&lt(n,S)),lt(e,y),at(e,{zIndex:i.zIndexInline}),this.viewerData=st({},this.parentData),this.renderViewer(),this.renderList(),this.viewed&&this.initImage(function(){t.renderImage(function(){i.transition&&setTimeout(function(){ht(n,S),ht(s,S)},0)})})),this},tooltip:function(){var t=this,i=this.options,e=this.tooltipBox,n=this.imageData;return this.viewed&&!this.played&&i.tooltip&&(e.textContent="".concat(Math.round(100*n.ratio),"%"),this.tooltipping?clearTimeout(this.tooltipping):i.transition?(this.fading&&zt(e,B),ht(e,O),ht(e,b),ht(e,S),e.initialOffsetWidth=e.offsetWidth,ht(e,k)):ht(e,O),this.tooltipping=setTimeout(function(){i.transition?(xt(e,B,function(){lt(e,O),lt(e,b),lt(e,S),t.fading=!1},{once:!0}),lt(e,k),t.fading=!0):lt(e,O),t.tooltipping=!1},1e3)),this},toggle:function(){return 1===this.imageData.ratio?this.zoomTo(this.initialImageData.ratio,!0):this.zoomTo(1,!0),this},reset:function(){return this.viewed&&!this.played&&(this.imageData=st({},this.initialImageData),this.renderImage()),this},update:function(){var i=this,t=this.element,e=this.options,n=this.isImg;if(n&&!t.parentNode)return this.destroy();var s,o,a=[];return nt(n?[t]:t.querySelectorAll("img"),function(t){et(e.filter)?e.filter.call(i,t)&&a.push(t):i.getImageURL(t)&&a.push(t)}),a.length&&(this.images=a,this.length=a.length,this.ready?(s=[],nt(this.items,function(t,i){var e=t.querySelector("img"),n=a[i];n&&e&&n.src===e.src||s.push(i)}),at(this.list,{width:"auto"}),this.initList(),this.isShown&&(this.length?this.viewed&&(0<=(o=s.indexOf(this.index))?(this.viewed=!1,this.view(Math.max(this.index-(o+1),0))):ht(this.items[this.index],g)):(this.image=null,this.viewed=!1,this.index=0,this.imageData={},this.canvas.innerHTML="",this.title.innerHTML=""))):this.build()),this},destroy:function(){var t=this.element,i=this.options;return t[v]&&(this.destroyed=!0,this.ready?(this.played&&this.stop(),i.inline?(this.fulled&&this.exit(),this.unbind()):this.isShown?(this.viewing&&(this.imageRendering?this.imageRendering.abort():this.imageInitializing&&this.imageInitializing.abort()),this.hiding&&this.transitioning.abort(),this.hidden()):this.showing&&(this.transitioning.abort(),this.hidden()),this.ready=!1,this.viewer.parentNode.removeChild(this.viewer)):i.inline&&(this.delaying?this.delaying.abort():this.initializing&&this.initializing.abort()),i.inline||yt(t,C,this.onStart),t[v]=void 0),this}},Rt={getImageURL:function(t){var i=this.options.url;return i=$(i)?t.getAttribute(i):et(i)?i.call(this,t):""},open:function(){var t=this.body;ht(t,E),t.style.paddingRight="".concat(this.scrollbarWidth+(parseFloat(this.initialBodyComputedPaddingRight)||0),"px")},close:function(){var t=this.body;lt(t,E),t.style.paddingRight=this.initialBodyPaddingRight},shown:function(){var t=this.element,i=this.options;this.fulled=!0,this.isShown=!0,this.render(),this.bind(),this.showing=!1,et(i.shown)&&xt(t,H,i.shown,{once:!0}),!1!==zt(t,H)&&this.ready&&this.isShown&&!this.hiding&&this.view(this.index)},hidden:function(){var t=this.element,i=this.options;this.fulled=!1,this.viewed=!1,this.isShown=!1,this.close(),this.unbind(),ht(this.viewer,z),this.resetList(),this.resetImage(),this.hiding=!1,this.destroyed||(et(i.hidden)&&xt(t,A,i.hidden,{once:!0}),zt(t,A))},requestFullscreen:function(){var t,i=this.element.ownerDocument;this.fulled&&!(i.fullscreenElement||i.webkitFullscreenElement||i.mozFullScreenElement||i.msFullscreenElement)&&((t=i.documentElement).requestFullscreen?t.requestFullscreen():t.webkitRequestFullscreen?t.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT):t.mozRequestFullScreen?t.mozRequestFullScreen():t.msRequestFullscreen&&t.msRequestFullscreen())},exitFullscreen:function(){var t=this.element.ownerDocument;this.fulled&&(t.fullscreenElement||t.webkitFullscreenElement||t.mozFullScreenElement||t.msFullscreenElement)&&(t.exitFullscreen?t.exitFullscreen():t.webkitExitFullscreen?t.webkitExitFullscreen():t.mozCancelFullScreen?t.mozCancelFullScreen():t.msExitFullscreen&&t.msExitFullscreen())},change:function(t){var i,e,h,n=this.options,s=this.pointers,o=s[Object.keys(s)[0]],a=o.endX-o.startX,r=o.endY-o.startY;switch(this.action){case u:this.move(a,r);break;case m:this.zoom((e=c({},i=s),h=[],nt(i,function(r,t){delete e[t],nt(e,function(t){var i=Math.abs(r.startX-t.startX),e=Math.abs(r.startY-t.startY),n=Math.abs(r.endX-t.endX),s=Math.abs(r.endY-t.endY),o=Math.sqrt(i*i+e*e),a=(Math.sqrt(n*n+s*s)-o)/o;h.push(a)})}),h.sort(function(t,i){return Math.abs(t)<Math.abs(i)}),h[0]),!1,t);break;case d:this.action="switched";var l=Math.abs(a);1<l&&l>Math.abs(r)&&(this.pointers={},1<a?this.prev(n.loop):a<-1&&this.next(n.loop))}nt(s,function(t){t.startX=t.endX,t.startY=t.endY})},isSwitchable:function(){var t=this.imageData,i=this.viewerData;return 1<this.length&&0<=t.left&&0<=t.top&&t.width<=i.width&&t.height<=i.height}},At=n.Viewer,Nt=function(){function e(t){var i=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};if(!function(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}(this,e),!t||1!==t.nodeType)throw new Error("The first argument is required and must be an element.");this.element=t,this.options=st({},o,it(i)&&i),this.action=!1,this.fading=!1,this.fulled=!1,this.hiding=!1,this.imageClicked=!1,this.imageData={},this.index=this.options.initialViewIndex,this.isImg=!1,this.isShown=!1,this.length=0,this.played=!1,this.playing=!1,this.pointers={},this.ready=!1,this.showing=!1,this.timeout=!1,this.tooltipping=!1,this.viewed=!1,this.viewing=!1,this.wheeling=!1,this.zooming=!1,this.init()}var t,i,n;return t=e,n=[{key:"noConflict",value:function(){return window.Viewer=At,e}},{key:"setDefaults",value:function(t){st(o,it(t)&&t)}}],(i=[{key:"init",value:function(){var t,i,e,n,s=this,o=this.element,a=this.options;o[v]||(o[v]=this,t="img"===o.tagName.toLowerCase(),i=[],nt(t?[o]:o.querySelectorAll("img"),function(t){et(a.filter)?a.filter.call(s,t)&&i.push(t):s.getImageURL(t)&&i.push(t)}),this.isImg=t,this.length=i.length,this.images=i,this.initBody(),J(document.createElement(v).style.transition)&&(a.transition=!1),a.inline?(e=0,n=function(){var t;(e+=1)===s.length&&(s.initializing=!1,s.delaying={abort:function(){clearTimeout(t)}},t=setTimeout(function(){s.delaying=!1,s.build()},0))},this.initializing={abort:function(){nt(i,function(t){t.complete||yt(t,P,n)})}},nt(i,function(t){t.complete?n():xt(t,P,n,{once:!0})})):xt(o,C,this.onStart=function(t){var i=t.target;"img"!==i.tagName.toLowerCase()||et(a.filter)&&!a.filter.call(s,i)||s.view(s.images.indexOf(i))}))}},{key:"build",value:function(){var t,h,i,e,n,s,o,a,r,l,c,u,d,m,g,f,p;this.ready||(t=this.element,h=this.options,i=t.parentNode,(e=document.createElement("div")).innerHTML='<div class="viewer-container" touch-action="none"><div class="viewer-canvas"></div><div class="viewer-footer"><div class="viewer-title"></div><div class="viewer-toolbar"></div><div class="viewer-navbar"><ul class="viewer-list"></ul></div></div><div class="viewer-tooltip"></div><div role="button" class="viewer-button" data-viewer-action="mix"></div><div class="viewer-player"></div></div>',s=(n=e.querySelector(".".concat(v,"-container"))).querySelector(".".concat(v,"-title")),o=n.querySelector(".".concat(v,"-toolbar")),a=n.querySelector(".".concat(v,"-navbar")),r=n.querySelector(".".concat(v,"-button")),l=n.querySelector(".".concat(v,"-canvas")),this.parent=i,this.viewer=n,this.title=s,this.toolbar=o,this.navbar=a,this.button=r,this.canvas=l,this.footer=n.querySelector(".".concat(v,"-footer")),this.tooltipBox=n.querySelector(".".concat(v,"-tooltip")),this.player=n.querySelector(".".concat(v,"-player")),this.list=n.querySelector(".".concat(v,"-list")),ht(s,h.title?It(Array.isArray(h.title)?h.title[0]:h.title):z),ht(a,h.navbar?It(h.navbar):z),ct(r,z,!h.button),h.backdrop&&(ht(n,"".concat(v,"-backdrop")),h.inline||"static"===h.backdrop||gt(l,U,"hide")),$(h.className)&&h.className&&h.className.split(K).forEach(function(t){ht(n,t)}),h.toolbar?(c=document.createElement("ul"),u=it(h.toolbar),d=Z.slice(0,3),m=Z.slice(7,9),g=Z.slice(9),u||ht(o,It(h.toolbar)),nt(u?h.toolbar:Z,function(t,i){var e,n,s,o=u&&it(t),a=u?dt(i):t,r=o&&!J(t.show)?t.show:t;!r||!h.zoomable&&-1!==d.indexOf(a)||!h.rotatable&&-1!==m.indexOf(a)||!h.scalable&&-1!==g.indexOf(a)||(e=o&&!J(t.size)?t.size:t,n=o&&!J(t.click)?t.click:t,(s=document.createElement("li")).setAttribute("role","button"),ht(s,"".concat(v,"-").concat(a)),et(n)||gt(s,U,a),G(r)&&ht(s,It(r)),-1!==["small","large"].indexOf(e)?ht(s,"".concat(v,"-").concat(e)):"play"===a&&ht(s,"".concat(v,"-large")),et(n)&&xt(s,C,n),c.appendChild(s))}),o.appendChild(c)):ht(o,z),h.rotatable||(ht(f=o.querySelectorAll('li[class*="rotate"]'),D),nt(f,function(t){o.appendChild(t)})),h.inline?(ht(r,x),at(n,{zIndex:h.zIndexInline}),"static"===window.getComputedStyle(i).position&&at(i,{position:"relative"}),i.insertBefore(n,t.nextSibling)):(ht(r,w),ht(n,y),ht(n,b),ht(n,z),at(n,{zIndex:h.zIndex}),$(p=h.container)&&(p=t.ownerDocument.querySelector(p)),(p=p||this.body).appendChild(n)),h.inline&&(this.render(),this.bind(),this.isShown=!0),this.ready=!0,et(h.ready)&&xt(t,F,h.ready,{once:!0}),!1!==zt(t,F)?this.ready&&h.inline&&this.view(this.index):this.ready=!1)}}])&&s(t.prototype,i),n&&s(t,n),e}();return st(Nt.prototype,Ot,St,Ct,Lt,Rt),Nt});

let counter = 1;
class WChannel {
    /**
     * @param {WSocket} socket
     * @param {string} name
     * @param {function} fn
     */
    constructor(socket, name, fn) {
        this.id = counter++;
        this.socket = socket;
        this.name = name;
        const [channel] = name.split(':');
        this.channel = channel;
        this.fn = fn;
    }

    off() {
        const i = this.socket.channels.findIndex((channel) => {
            return channel.id === this.id;
        });
        if (i !== -1) this.socket.channels.slice(i, 1);
    }
}

/**
 * @param {WSocket} socket
 * @param {{delay: int, reconnectLimit: int}} options
 */
const reconnect = function(socket, options) {
    let pinganator;
    const ping = connection => connection.send('{"channel":"ping"}');

    const connect = () => {
        if (options.reconnectLimit === 0) return;

        const connection = new WebSocket(socket.url);

        connection.addEventListener('open', () => {
            socket.connection = connection;
            socket.channels.forEach((channel) => {
                subscribe(connection, channel.name, 'on');
            });
            // раз в 30 секунд пингуем сокет, чтобы прокси не закрыл соединение
            pinganator = setInterval(() => ping(connection), 30000);
        });
        connection.addEventListener('error', () => {
            setTimeout(connect, options.delay);
            clearInterval(pinganator);
        });
        connection.addEventListener('close', e => {
            socket.connection = null;
            clearInterval(pinganator);
            if (e.code > 1001) {
                setTimeout(connect, options.delay);
            }
        });
        connection.addEventListener('message', response => {
            const data = JSON.parse(response.data);
            socket.channels.forEach((channel) => {
                if (channel.channel === data.channel) {
                    channel.fn(data.data);
                }
            });
        });

        options.reconnectLimit--;
    };

    connect();
};

/**
 * @param {WebSocket} connection
 * @param {string} channelName
 * @param {string} status
 */
const subscribe = (connection, channelName, status) => {
    const data = {
        channel: channelName,
        status,
    };
    connection.send(JSON.stringify(data));
};

class WSocket {
    /**
     * @param {string} url
     */
    constructor(url) {
        this.connection = null;
        this.url = url;
        /** @type WChannel[] */
        this.channels = [];
    }

    /**
     * @param {{delay: int, reconnectLimit: int}} options
     */
    connect(options) {
        if (this.connection) return;

        reconnect(this, Object.assign({
            delay: 3000,
            reconnectLimit: 60,
        }, options ? options : {}));

        return this;
    }

    disconnect() {
        if (!this.connection) return;

        this.connection.close(1000);
        this.connection = null;
    }

    /**
     * @param {string} channelName
     * @param {function} fn
     */
    on(channelName, fn) {
        const channel = new WChannel(this, channelName, fn);
        this.channels.push(channel);

        if (this.connection) subscribe(this.connection, channel.name, 'on');

        return channel;
    }

    /**
     * @param {string} channelName
     */
    off(channelName) {
        if (this.connection) subscribe(this.connection, channelName, 'off');

        [channelName] = channelName.split(':');
        this.channels = this.channels.filter(channel => channel.channel !== channelName);
    }
}

/** @type WSocket wsocket */
let wsocket;

export function webSocket() {
    if (!wsocket) {
        wsocket = new WSocket(`ws://127.0.0.1:8001/socket`);
        wsocket.connect({
            delay: 3000,
            reconnectLimit: 60,
        });
    }

    return {
        then(fn) {
            fn(wsocket);
            return this;
        }
    };
}

webSocket().then(socket => {
    let channel = $('#channel');

    if (channel.length) {
        socket.on(channel.val(), verifyDoc => {
            console.log(verifyDoc);
        });
    }


    // const timer = setTimeout(() => {
    //     socket.off(data.channel);
    //     qrModal.modal('hide');
    //     loader(false);
    // }, 1000 * 60 * 15);
});
