"use strict";

class ScrollHolizen{
	constructor(obj){
		this.scrollBlock=obj;
		this.moveBlockLists=[];
		this.moveDir;
		this.currentNum=0;
		this.nextNum;
		this.showQt=3;
		this.init();
		
	}
	
	init(){
		this.listSrc=$('li',this.scrollBlock);
		this.listSrcQt=this.listSrc.length;
		this.clipBlock=$("<div class='holizon_scroll_clip'>");
		this.moveBlock=$("<div class='holizon_scroll_move'>");
		//PC用
		for(let n=0;n<this.showQt+2;n++){
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
			//console.log("list,"+n)
			//console.log(list)
			this.moveBlockLists.push(list);
			this.moveBlock.append(list);
		}
		this.clipBlock.append(this.moveBlock);
		this.scrollBlock.append(this.clipBlock);
		
		//初期化
		this.setCurrent(this.currentNum);
		
	}
	moveDrug(drugDistance){
		console.log(drugDistance);
	}
	
	setCurrent(num){
		let left2Num=utils.clipLimit(num-2,this.listSrcQt);
		let leftNum=utils.clipLimit(num-1,this.listSrcQt);
		let currentNum=utils.clipLimit(num,this.listSrcQt);
		let rightNum=utils.clipLimit(num+1,this.listSrcQt);
		let right2Num=utils.clipLimit(num+2,this.listSrcQt);
		let nums=[left2Num,leftNum,currentNum,rightNum,right2Num];
		console.log(nums)
		for(let n=0;n<nums.length;n++){
			let target=$(".inner_clip",this.listSrc).eq(nums[n]).clone();
			//console.log(this.moveBlockLists[n]);
			this.moveBlockLists[n].append(target);
		}
	}
	
	moveCurrent(nextNum){
		
	}
};

