

var utils={
	setTraceBox:function(){
		
		utils.traceBox=$("<div>test</div>");
		utils.traceBox.css({"color":"black"});
		
		utils.traceBox.css({"top":"0.5em","left":"0.5em","z-index":600000,"position":"fixed","color":"red"});	
		
		$("body").append(utils.traceBox);
		window["trace"]=function(txt){
			if(txt.isVector3){
				utils.traceBox.html(utils.traceBox.html()+"<br />V3 x="+txt.x+",y="+txt.y+",z="+txt.z);
			}else if(txt.isEuler){
				utils.traceBox.html(utils.traceBox.html()+"<br />E x="+txt.x+",y="+txt.y+",z="+txt.z);
			}else if(txt.isVector2){
				utils.traceBox.html(utils.traceBox.html()+"<br />V2 x="+txt.x+",y="+txt.y);
			}else if(txt.w==0||txt.w){
				utils.traceBox.html(utils.traceBox.html()+"<br />Q x="+txt.x+",y="+txt.y+",z="+txt.z+",w="+txt.w);
			}else{
				utils.traceBox.html(utils.traceBox.html()+"<br />"+String(txt));
			}
		}
		window["trace2"]=function(txt){
			if(txt.isVector3){
				utils.traceBox.html("V3 x="+txt.x+",y="+txt.y+",z="+txt.z);
			}else if(txt.isEuler){
				utils.traceBox.html("E x="+txt.x+",y="+txt.y+",z="+txt.z);
			}else if(txt.isVector2){
				utils.traceBox.html("V2 x="+txt.x+",y="+txt.y);
			}else if(txt.w==0||txt.w){
				utils.traceBox.html("Q x="+txt.x+",y="+txt.y+",z="+txt.z+",w="+txt.w);
			}else{
				utils.traceBox.html(String(txt));
			}
		}
		
		window["trace3"]=function(txt,num){
			if( isNaN(num) || num==null){
				num=5;	
			}
			var txets=null;
			var l=0;
			if(utils.traceBox.html().match(/<br>/)){
				txets=utils.traceBox.html().split("<br>");
			}else if(utils.traceBox.html().match(/<br \/>/)){
				txets=utils.traceBox.html().split("<br />");
			}
			if(txets){
				l=txets.length
			}
			
			
			if(l>num){
				txets=txets.splice(l-num);
			}
			var str=String(txets).replace(/,/g,"<br>");
			utils.traceBox.html(str+"<br />"+String(txt));
		}
	},
	
	setScaleBase:function(){
		var scaleBox=$("<div></div>");
		scaleBox.css({"position":"absolute","top":"100px","left":"20px","z-indx":100,
		"background-color":"red","width":"200px","height":"10px"});
		$("body").append(scaleBox);
		window["setScale"]=function(l,t){
			if(!l){l=0;}
			if(!t){t=0;}
			scaleBox.css({"left":l+"px","top":t+"px"})
		}
	},
	
	hiddenTraceBox:function(){
				utils.traceBox.css({"visibility":"hidden"});
	},
	
	ua:null,
	dv:null,
	
	init:function(){
		
		var transition=false;
		var vp;//vender prefix
		var transitionEnd;
		var animationEnd;
		
		var ua=navigator.userAgent;
		utils.ua=ua;
		utils.ipad;
		utils.android=false;
		utils.lteIe9=false;
		
		//scrollTop Element
		utils.scrollelement=$("body,html");
		
		//animation transitionの判定
	
		 var props = ['WebkitTransition', 'MozTransition', 'OTransition', 'transition','transitionProperty','msTransform'];
		 var events= ['webkitTransitionEnd','transitionend','oTransitionEnd','transitionend','transitionend' ];
		 var events_a= ['webkitAnimationEnd','animationend','oAnimationEnd','animationend','animationend' ];
		
		var bodyElement=document.getElementsByTagName("body");
	
		for ( var n in props ){
		  if (document.getElementsByTagName("body")[0].style[ props[n]] !== undefined){
			  if(!transition){
				 transition=true;
				  switch (n){
							case "0":vp= "-webkit-";break;
							case "1":vp= "-moz-";break;
							case "2":vp= "-o-";break;
							case "3":vp= "";break;
							case "4": vp= "";break;
							case "5": vp= "-ms-";transition=false;break;
				  }
	
				  transitionEnd=events[n];
				  animationEnd=events_a[n];
			  }
		  }
		 }
		
		utils.transitionEnd=transitionEnd;
		utils.animationEnd=animationEnd;
		utils.transition=transition;
		utils.vp=vp;
		utils.ipad;//デバイスがiPad
		utils.iphone;//デバイスがiPhone
		utils.trueIphone;//デバイスがiPhoneでiSafari
		
		
		
		
		if(ua.indexOf('Windows')>-1){
			utils.os="windows";	
		}else if(ua.indexOf("Mac OS")>-1){
			utils.os="mac";
		}else if(ua.indexOf('Android')>-1){
			utils.os="android";
			utils.android=true;
		}
		
		if(ua.indexOf('iPhone')>-1||ua.indexOf('iPod') > -1||ua.indexOf('iPad') > -1||ua.indexOf('Android')> -1){
		
			if(ua.indexOf('iPad')> -1||ua.indexOf('Mobile')==-1){
				utils.dv="tablet";
				if(ua.indexOf('iPad')> -1){
					utils.ipad=true;
				}
			}else{
				utils.dv="sp";
				if(ua.indexOf('iPhone')> -1){
					utils.iphone=true;
				}
			}
			
		}else{
			utils.dv="pc"
		}
		
		
		
		//Androidで標準ブラウザがchromeと判定されるときとsafariと判定される時があるので、この切り分けは困難。
		if(ua.indexOf('Edge')>-1){
			utils.Browser="edge";
		}else if(ua.indexOf('Chrome')>-1 || ua.indexOf('CriOS')>-1){
				utils.Browser="chrome";
		}else if(ua.indexOf('Safari')> -1){
				utils.Browser="safari";
		}else if(ua.indexOf('Firefox')> -1){
			utils.Browser="firefox";	
		}else if(ua.indexOf('Opera')> -1){
			utils.Browser="opera";	
		}else if(ua.indexOf('MSIE 9')> -1){
			utils.Browser="ie9";	
		}else if(ua.indexOf('MSIE 8')> -1){
			utils.Browser="ie8";
		}else if(ua.indexOf('MSIE 7')> -1){
			utils.Browser="ie7";
		}else if(ua.indexOf('MSIE 6')> -1){
			utils.Browser="ie6";
		}else{
			//ie10,11を含む
			utils.Browser="atherWebBrowsew";
			if(ua.indexOf('Trident')>-1){
				if(ua.indexOf('MSIE 10')> -1){
					utils.Browser="ie10";
				}else{
					//rv:以下の文字列を取得してバージョンとして判定
					var reg=/(rv:)([\d\.]+)/;
					utils.Browser="ie"+parseInt(ua.match(reg)[0].replace("rv:",0));
				}
				
			}
		}	
		
	
		
		
		
		if(utils.Browser=="ie9"||utils.Browser=="ie8"||utils.Browser=="ie7"){
			//ie9以下
			utils.lteIe9=true;
		}
		
		
		if(utils.ua.indexOf('iPhone') > -1 &&utils.Browser!="chrome" ){
			utils.trueIphone=true;
		}
	
	},
		
	Browser:null,
	
	blink:function(){
		
		$(this).stop().css({"opacity":0}).animate({opacity:1},500,"easeOutCubic");
	},
	blink0:function(){
		
		$(this).stop().css({"opacity":0.5}).animate({opacity:1},500,"easeOutCubic");
	},
	blink2:function(){
		//ƒuƒŠƒ“ƒN;
		$(this).stop().css({"opacity":0.5}).delay(100).animate({opacity:0.8},1500,"easeOutCubic");
	},
	
	unselectable:function(obj){
		//‘I‘ð•s‰Â‚É‚·‚é;
		obj.attr("onSelectStart", "return false;");
		obj.attr("onMouseDown", "return false;");
		obj.css({"-moz-user-select": "none", "-khtml-user-select": "none", "user-select":"none"});
		obj.focus(function(){$(this).blur()})
	},
	
	jump:function(url,target){
		//ƒŠƒ“ƒNæ‚ÖƒWƒƒƒ“ƒv;
		if(target=="_blank"){
			var win=window.open(url,"win1");
		}else{
			window.location.href=url;	
		}
	},
	
	hitCheck:function(obj,mousep){
		var objQt=obj.length;
		var key=false;
		
		for(var n=0;n<objQt;n++){
			var minX,minY,maxX,maxY;
			var targetObj=$(obj[n]);
			var offset=targetObj.offset()
			 minX=offset.left;
			 maxX=minX+targetObj.outerWidth();
			 minY=offset.top;
			 maxY=minY+targetObj.outerHeight();
		
			 if(mousep.x>minX && mousep.x<maxX && mousep.y>minY && mousep.y<maxY){
				 return true; 
				 break;
			 }
		}
		
		return false;
	},
	
	getImageSize:function(image){
		//‰æ‘œƒTƒCƒYŽæ“¾
		var run, mem, w, h, key = "actual";
 
		// for Firefox, Safari, Google Chrome
		if ("naturalWidth" in image) {
			return {width: image.naturalWidth, height: image.naturalHeight};
		}
		if ("src" in image) { // HTMLImageElement
			if (image[key] && image[key].src === image.src) {return  image[key];}
			 
			if (document.uniqueID) { // for IE
				w = $(image).css("width");
				h = $(image).css("height");
				
			} else { // for Opera and Other
				mem = {w: image.width, h: image.height}; // keep current style
				$(this).removeAttr("width").removeAttr("height").css({width:"",  height:""});    // Remove attributes in case img-element has set width  and height (for webkit browsers)
				w = image.width;
				h = image.height;
				image.width  = mem.w; // restore
				image.height = mem.h;
			}
			return image[key] = {width: w, height: h, src: image.src}; // bond
		}
		 
		// HTMLCanvasElement
		return {width: image.width, height: image.height};
	},
	

	
	
	changeEase:function(props,time,ease,stepfunc,endfunc){
		//イージングで運動,props[0]がstartValue,props[1]がEndValue
		if(ease==null){
			ease=jQuery.easing.def;
		}
		
		var FRAME_RATE=25;//40frame/sec;

		var count=0;

		var propNum=0;

		var timer;
		var stopObj={stop:function(){clearTimeout(timer)}};
	
		var startProp=props[0];
		var stopProp=props[1];
		

		var totalDiv=Math.floor(time/FRAME_RATE);
		
		var d=time;
		var difProp=(stopProp-startProp)
		
		setProp();
		
		function setProp(){
			
			var x=count/totalDiv;
			var t=FRAME_RATE*count;
			
			var val=$.easing[ease](x, t, 0, 1, d);
			
			count+=1;
		
			var nowProp=startProp+val*difProp;
			
			
			if(count<totalDiv){
				stepfunc(nowProp);
				timer=setTimeout(setProp,FRAME_RATE);
			}else{
				if(endfunc instanceof Function){
					clearTimeout(time)
					endfunc(stopProp);
				}
			}
		}
		return stopObj;
	},
	
	
	checkPointInner:function(polygon,point){
	        var cn = 0;
	        for(var i = 0; i < polygon.length - 1; i++){
	            // 上向きの辺。点Pがy軸方向について、始点と終点の間にある。ただし、終点は含まない。(ルール1)
	            if( ((polygon[i].y <= point.y) && (polygon[i+1].y > point.y))
	            // 下向きの辺。点Pがy軸方向について、始点と終点の間にある。ただし、始点は含まない。(ルール2)
	                || ((polygon[i].y > point.y) && (polygon[i+1].y <= point.y)) ){
	            // ルール1,ルール2を確認することで、ルール3も確認できている。
	            
	                // 辺は点pよりも右側にある。ただし、重ならない。(ルール4)
	                // 辺が点pと同じ高さになる位置を特定し、その時のxの値と点pのxの値を比較する。
	                vt = (point.y - polygon[i].y) / (polygon[i+1].y - polygon[i].y);
	                if(point.x < (polygon[i].x + (vt * (polygon[i+1].x - polygon[i].x)))){
	                    ++cn;
	                }
	            }
	        }
	        var result=(cn%2==0)?false:true;
	      	return result;
	},
	
	addEvent:function(obj,str,func){
		//イベント設置
		//obj.dispatchEvent(ev)またはobj.dispatchEvent(new Event(str))でイベント発生
		var ev=document.createEvent("HTMLEvents");
		ev.initEvent(str, true, true);
		obj.addEventListener(str,func,false);
		return ev;
	},
	
	removeEvent:function(obj,str,func){
		obj.removeEventListener(str,func);
	},

	getTotal:function(ar){
		//数字の配列の合計を求める
		var result=0;
		var num=ar.length;
		for(var n=0;n<num;n++){
			result+=ar[n];
		}
		return result;
	},
	setAnimeEnd:function(obj,func){
		obj.addEventListener(utils.animationEnd,function(e){
			obj.removeEventListener(utils.animationEnd,arguments.callee);
			if(func instanceof Function){
				//コールバック
				func(obj);
			}
		},false);
	},
	
	setTransEnd:function(obj,func){
		//trace("set,"+obj+","+func)
		obj.addEventListener(utils.transitionEnd,function(e){
			obj.removeEventListener(utils.transitionEnd,arguments.callee);
			if(func instanceof Function){
				//コールバック
				func(obj);
			}
		},false);
	},
	
	checkDeviceFontSize:function(){

		if(utils.Browser!="ie8" && utils.Browser!="ie7" && utils.Browser!='ie6'){
			var m=$("<span>");
			m.css({"font-size":"10px","opacity":0});
			m.text("測定基準字")
			$("body").append(m);
			var fontSize=Math.floor(5000/m.width())/100;

			if(fontSize<0.95){
				//cssルールを追加

				var style = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
				style.type = 'text/css';
				var stylesheet = document.styleSheets.item(1);//既存スタイルを取得
				var idx = stylesheet.cssRules.length;

				//末尾に追加
				stylesheet.insertRule("html:not(:target) body{ font-size: "+14*fontSize+"px !important;}", idx);
				/*stylesheet.insertRule("p { font-size: "+14*fontSize+"px;}", idx+1);
				stylesheet.insertRule("#copyright { font-size: "+12*fontSize+"px;}", idx+2);*/
			}
			m.remove();
		}
	},
	
	
	makeRandomArray:function(arry){
		
		var randomNumbers=[];
		//もとの配列が空になるまで続ける
		while(arry.length>0){
			var index=Math.floor(Math.random()*arry.length);
			var number=arry[index];
			randomNumbers.push(number);
			
			//前半と後半部分に分ける
			var array0=arry.slice(0,index);
			var array1=arry.slice(index+1);//第2引数省略時は末尾まで
			arry=array0.concat(array1);
		}
		return randomNumbers;
	},
	
	allDo:function(ary,func,args){
		//全オブジェクトに対して実行
		//argsは引数(Array)
		//funcは関数名(String)
		var qt=ary.length;
		if(qt>0){
			for(var n=0;n<qt;n=(n+1)|0){
				var target=ary[n]
				target[func].apply(target,args)
			}
		}
	},
	getYoyoRatio:function(num){
		var yoyoRatio=(1-Math.cos(Math.PI*Math.pow(num,1)))/2;
		return yoyoRatio;
	},
	
	getYoyoRatio2:function(num){
		var yoyoRatio=utils.getYoyoRatio(utils.getYoyoRatio(num));
		return yoyoRatio;
	},
	getRGBValue:function(str){
		//#ff5599の書式からrgbの256値に変換
		var colorCode=parseInt(str.replace("#",""),16);
		var red   = colorCode >> 16;
		var green = colorCode >>  8 & 0xff;
		var blue  = colorCode  & 0xff;
		rgb={r:red,g:green,b:blue}
		return rgb;
	},
	lightenRGBValue:function(rgb,resio){
		var resio0=(resio>1)?1:resio;
		resio0=(resio0<0)?0:resio;
		var r0=(1-rgb.r/255)*255;
		var g0=(1-rgb.g/255)*255;
		var b0=(1-rgb.b/255)*255;
		
		var newR=rgb.r+r0*resio;
		var newG=rgb.g+g0*resio;
		var newB=rgb.b+b0*resio;
		return {r:newR,g:newG,b:newB};
	},
	vividRGB:function(rgb,ratio){
		var ratio0=(ratio>1)?1:ratio;
		var maxColors=["r","g","b"];
		var maxColor;
		var maxColorKey;
		var otherColorKeys;
		var overRGB={r:0,g:0,b:0}
		
		if(rgb.r==rgb.g==rgb.b){
			maxColorKey=maxColors[Math.floor(Math.random()*3)]
		}else if(rgb.r==rgb.g&&rgb.r>rgb.b){
			maxColors=["r","g"];
			maxColorKey=maxColors[Math.floor(Math.random()*2)];
		}else if(rgb.r==rgb.b&&rgb.r>rgb.g){
			maxColors=["r","b"];
			maxColorKey=maxColors[Math.floor(Math.random()*2)];
		}else if(rgb.b==rgb.g&&rgb.b>rgb.r){
			maxColors=["b","g"];
			maxColorKey=maxColors[Math.floor(Math.random()*2)];
		}else{
			maxColor=0;
			for(var i in rgb){
				if(maxColor<rgb[i]){
					maxColorKey=i;
				}
			}
		}
		otherColorKeys=[];
		for(var i in rgb){
			if(i!=maxColorKey){
				otherColorKeys.push(i)
			}
		}
		if(ratio>1){
			ratio=1;
		}else if(ratio<-1){
			ratio=-1;
		}
		var maxDif,overMax;
		var otherProp,othrDif;
		if(ratio>0){
			maxDif=255-rgb[maxColorKey];
			overMax=maxDif*ratio;
			overRGB[maxColorKey]=Math.floor(rgb[maxColorKey]+overMax);
		
			for(var n=0;n<2;n++){
				otherProp=otherColorKeys[n];
				othrDif=rgb[otherProp]*ratio;
				overRGB[otherProp]=Math.floor(othrDif-rgb[otherProp]);
			}
		}else{
			overMax=rgb[maxColorKey]*ratio;
			overRGB[maxColorKey]=Math.floor(rgb[maxColorKey]+overMax);
			for(var n=0;n<2;n++){
				otherProp=otherColorKeys[n];
				othrDif=-(255-rgb[otherProp])*ratio;
				overRGB[otherProp]=Math.floor(rgb[otherProp]+othrDif);
			}
		}
	
		return overRGB;
		
	},
	
	clipLimit:function(num,max){
		if(num>=max){
			num=num-max;
		}else if(num<0){
			num=max+num;
		}
		return num;
	},
		
	clipNormalize:function(num){
		if(num>1){num=1;}
		if(num<0){num=0;}
		return num;
	},
	
	clipNormalize2:function(num){
		if(num>1){num=1;}
		if(num<-1){num=-1;}
		return num;
	}
}
