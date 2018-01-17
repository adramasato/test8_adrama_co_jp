"use strict"
var MAIN={};
(function(){
	$(function(){
	
	//utils.setTraceBox();
	utils.init();
	
	var win, winH, winW, winRetio;
	var scrollTop, scrollLeft;
	
	var movie = $(".movie_box img");
	var movieW = 1340;
	var movieH = 334;
	var movieRetio = movieW / movieH;
	
	var movieBox = $(".movie_box");
	var movieBoxW = movieBox.width();
	var movieBoxH = movieBox.height();
	var movieBoxRetio = movieBoxW / movieBoxH;
	
	var scrollable = false;
	var scrollable2 = false;
	
	var scNum = 0;
	var scWait = false;
	var scTime = 1100;
	var scTimer;
	
	var wrapper = $("#wrapper");
	
	var videoW = 1920;
	var videoH = 1080;
	var videoResio = videoW/videoH;
	var videoArea = $("#video_area1");
	var videoArea2 = $("#video_area2");
	
	win=$(window);
	
	win.scrollTop(0);
	resizeHl();
	
	var renderer=new PIXI.CanvasRenderer(videoW,videoH,{antialias:false,transparent:false,resolution:1,backgroundColor:0xf4f6f6});
	var stage=new PIXI.Container();
	var canvas=$(renderer.view);
	$(videoArea).prepend(canvas);
		
	var renderer2=new PIXI.CanvasRenderer(videoW,videoH,{antialias:false,transparent:false,resolution:1,backgroundColor:0xf4f6f6});
	var stage2=new PIXI.Container();
	var canvas2=$(renderer2.view);
	$(videoArea2).prepend(canvas2);
	
	var loader = new PIXI.loaders.Loader();
	loader.add("v","movie/movie1.mp4").add("v2","movie/movie2.mp4");

	var videoBaseTexture=new PIXI.VideoBaseTexture.fromUrl("movie/movie1.mp4");
	var texture=new PIXI.Texture(videoBaseTexture)
	var sprite=new PIXI.Sprite(texture);
	var videoDurarion;
	stage.addChild(sprite);
		
	var videoBaseTexture2=new PIXI.VideoBaseTexture.fromUrl("movie/movie2.mp4");
	var texture2=new PIXI.Texture(videoBaseTexture2)
	var sprite2=new PIXI.Sprite(texture2);
	var videoDurarion2;
	stage2.addChild(sprite2);

	var loadEnd;

	loader.load(function(loader,resources){
		//videoBaseTexture.source.loop=true;
		//videoBaseTexture.source.autoplay = true;
		videoBaseTexture.source.muted=true;
		videoBaseTexture2.source.muted=true;
		//videoDurarion=videoBaseTexture.source.duration;
		//videoBaseTexture.source.play();
		//loadEnd=true;
		videoElement.loop=true;
		videoElement.autoplay = true;
		videoElement.muted=true;
		videoDurarion=videoElement.duration;
		videoElement.play();
		
		videoElement2.loop=true;
		videoElement2.autoplay = true;
		videoElement2.muted=true;
		videoDurarion2=videoElement2.duration;
		videoElement.play();
		
		loadEnd=true;
		
		startFunc();
		
	});

	var videoElement=loader.resources["v"].data;
	videoElement.addEventListener("loadedmetadata",function(){
		/*videoElement.loop=true;
		videoElement.autoplay = true;
		videoElement.muted=true;
		videoDurarion=videoElement.duration;
		videoElement.play();
		loadEnd=true;*/

		//showKv();
	});
	var videoElement2=loader.resources["v2"].data;
	videoElement2.addEventListener("loadedmetadata",function(){
		/*videoElement.loop=true;
		videoElement.autoplay = true;
		videoElement.muted=true;
		videoDurarion=videoElement.duration;
		videoElement.play();
		loadEnd=true;*/

		//showKv();
	});
	
	renderRoop();
	
	
	function startFunc(){
		
		$("#kv_logo").addClass("show");
		
		setTimeout(function(){
			$("#kv_logo").addClass("action1");
			scrollable = true;
			$(document).bind("mousewheel",mousewheelHl);
		},1700);
		
		setTimeout(function(){
			$("#kv_logo").addClass("action2");
			$("#kv_area .logo_over").addClass("show");
		},4800);
		
		setTimeout(function(){
			movieBox.addClass("show");
		},5000);
		
		setTimeout(function(){
			$("#navi").addClass("show");
			$("#kv_news").addClass("show");
			
		},7000);
	}
	
	function mousewheelHl(e){
		
		if ( !scWait ) {
			
			scWait = true;
			
			var delta = e.originalEvent.deltaY ? -(e.originalEvent.deltaY) : e.originalEvent.wheelDelta ? e.originalEvent.wheelDelta : -(e.originalEvent.detail);
			if (delta < 0){
				// マウスホイールを下にスクロールしたときの処理を記載
				scNum+=1;
			} else {
				// マウスホイールを上にスクロールしたときの処理を記載
				scNum-=1;
			}
			
			if ( scNum<0 ) {
				scNum=0;
			} else if ( scNum>2 ) {
				scNum=2;
			} else {
				if ( !$("#kv_news").hasClass("show") ) {
					$("#navi").addClass("show");
					$("#kv_news").addClass("show");
				}
				
				if ( scNum==0 ) {
					$("#navi").removeClass("dark");
				} else {
					$("#navi").addClass("dark");
				}
				TweenMax.to(wrapper,1,{
					top:-100*scNum+"vh",
					ease:Power3.easeInOut,
					onUpdate: function(){
						
					},
					onComplete: function(){
						$("[class^='block']").removeClass("show");
						$(".block"+scNum).addClass("show");
					}
				});
			}
						
			clearTimeout(scTimer);
			scTimer = setTimeout(function(){
				scWait = false;
			},scTime);
			
		}
	}
	
	
	function resizeHl(){
	
		winW = win.width();
		winH = win.height();
		
		movieBoxW = movieBox.width();
		movieBoxH = movieBox.height();
		movieBoxRetio = movieBoxW / movieBoxH;
		
		
		
		if ( movieBoxRetio > movieRetio ) {
			var movieTop = ( movieBoxH - movieBoxW / movieRetio ) * 0.5;
			movie.css({
				"width":movieBoxW+"px",
				"height":"auto",
				"margin-top":movieTop+"px",
				"margin-left":"0px"
			});
		} else {
			var movieWidth = movieBoxH * movieRetio;
			var movieLeft = ( movieBoxW - movieWidth ) * 0.5;
			movie.css({
				"width":movieWidth+"px",
				"height":movieBoxH+"px",
				"margin-top":"0px",
				"margin-left":movieLeft+"px"
			});
		}
		
		scrollHl();
	}
	
	function scrollHl(){
		
		scrollTop = win.scrollTop();
		scrollLeft = win.scrollLeft();
		
		if ( !scrollable ) {
			win.scrollTop(0);
		} else {
			win.scrollTop(0);
		}
		
	}
	
	
	
	win.resize(resizeHl).trigger("resize");
	win.scroll(scrollHl);
	
	/////////////////////////////
	//
	//フレームレート計測
	//
	////////////////////////////

	var nowTime,lastTime
	var fsp;
	var totalTimes=[];
	var framedisplay;
	var keyTime=new Date().getTime();
	var updateLimit=30;
	var renderCount=0;
	nowTime=new Date().getTime();
	$(function(){
		//フレームレート計測
		//setFsp();

	})


	function setFsp(){
		framedisplay=$("<div id='framedisplay'></div>");
		framedisplay.css({
			"background-color":"black",
			"padding":"4px",
			"color":"white",
			"width":"2em",
			"position":"fixed",
			"right":"1em",
			"top":"0.2em",
			"height":"1em",
			"line-height":1
		});
		$("body").append(framedisplay);
		lastTime=new Date().getTime();
		fsp=true;
	}

	function checkFsp(){
		if(renderCount%10==0){
			nowTime=new Date().getTime();

			var fpsNum=Math.floor(100000/(nowTime-lastTime))/10;
			lastTime=nowTime;
		}
		framedisplay.text(fpsNum)
	}

	/////////////////////////////
	//
	//一定時間おきにレンダリング
	//
	////////////////////////////

	function renderRoop(){
		requestAnimationFrame(renderRoop);
		nowTime=new Date().getTime();

		if(MAIN.scrollPositionState!="down" || MAIN.scrollmoving){
			if(nowTime-keyTime>updateLimit){
				keyTime=nowTime;

				//iOsループ
				if(loadEnd){
					//trace2(videoBaseTexture.source.currentTime+":"+videoDurarion)
					if(videoBaseTexture.source.currentTime>=videoDurarion){
						videoBaseTexture.source.currentTime=0;
					}
					if(videoBaseTexture2.source.currentTime>=videoDurarion2){
						videoBaseTexture2.source.currentTime=0;
					}
				}
				//iOs停止していたら動かす
				if(loadEnd){
					if(videoBaseTexture.source.paused){
						videoBaseTexture.source.play();
					}
					if(videoBaseTexture2.source.paused){
						videoBaseTexture2.source.play();
					}
				}
				//フレームレート計測
				if(fsp){checkFsp();}
				renderer.render(stage);
				renderer2.render(stage2);

			}

		}
	}

});

	
})(MAIN)