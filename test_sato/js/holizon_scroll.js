'use strict'

(function(){
	$(function(){
		var scrollBlock=$(".holizon_scroll");
		var listSrc=$('li',scrollBlock);
		var listSrcQt=listSrc.length;
		var showQt=3;
		var clipBlock=$("<div class='holizon_scroll_clip'>");
		var moveBlock=$("<div class='holizon_scroll_move'>");
		var currentNum,nextNum,
		var moveDir;
		var moveBlockLists=[];
		//PC用
		for(var n=0;n<showQt+2;n++){
			var list=$('<div>');
			var className;
			switch(n){
				case 0:	className="left2";break;
				case 1:	className="left";break;
				case 2:	className="current";break;
				case 3:	className="right";break;
				case 4:	className="right2";break;
			}
			list.addClass(className);
			moveBlockLists.push(list);
			moveBlock.append(list);
		}
		clipBlock.append(moveBlock);
		scrollBlock.append(clipBlock);
		
		currentNum=0;
		//初期化
		setCurrent(currentNum);
		
		
		function moveCurrent(nextNum){
			
		}
		
		function setCurrent(num){
			let left2Num=utils.clipLimit(num-2,listSrcQt);
			let leftNum=utils.clipLimit(num-1,listSrcQt);
			let currentNum=utils.clipLimit(num,listSrcQt);
			let rightNum=utils.clipLimit(num+1,listSrcQt);
			let right2Num=utils.clipLimit(num+2,listSrcQt);
			let nums=[left2Num,leftNum,currentNum,rightNum,right2Num];
			for(let n=0;n<nums.length;n++){
				let target=$(".inner_clip",listSrc).eq(nums[n]);
				moveBlockLists[n].append(target);
			}
		}
	})
	
})();