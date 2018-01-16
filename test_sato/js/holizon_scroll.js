'use strict';

(function(){
	$(function(){
		let scrollBlock=$(".holizon_scroll");
		let listSrc=$('li',scrollBlock);
		let listSrcQt=listSrc.length;
		let showQt=3;
		let clipBlock=$("<div class='holizon_scroll_clip'>");
		let moveBlock=$("<div class='holizon_scroll_move'>");
		let currentNum,nextNum;
		let moveDir;
		let moveBlockLists=[];
		//PC用
		for(let n=0;n<showQt+2;n++){
			let list=$('<div>');
			let className;
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
			console.log(nums)
			for(let n=0;n<nums.length;n++){
				let target=$(".inner_clip",listSrc).eq(nums[n]).clone();
				moveBlockLists[n].append(target);
			}
		}
	})
	
})();