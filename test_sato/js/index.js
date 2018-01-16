
$(function(){
	let scrollBlock= $(".holizon_scroll");
	let scrolls=[];
	let mouseMoves=[];
	
	for(var n=0;n<scrollBlock.length;n++){
		let scroll=new ScrollHolizen(scrollBlock.eq(n));
		scrolls.push(scroll);
		let mouseMove=new Mouse(scrollBlock.eq(n));
		mouseMoves.push(mouseMove);
		//scroll.init();
		//console.log("new");
	}
	
	//$(window).bind("mousemove touchmove",mouseMoveHl);
	
	function mouseMoveHl(){
		for(var n=0;n<mouseMoves.length;n++){
			let drugDistance=mouseMoves[n].getDrugdistance;
			scrolls[n].moveDrug(drugDistance);
		}
		utils.allDo(mouseMoves,"getDrugdistance",[]);
	}
});
