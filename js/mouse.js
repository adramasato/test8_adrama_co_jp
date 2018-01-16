class Mouse{
	constructor(obj){
		utils.unselectable($("*",obj));
		this.targetObj=obj;
		//console.log("constructor,"+this.targetObj[0]);
		//console.log(this.targetObj);
		this.pressState=false;
		let thisObj=this;
		this.mouseP={x:0,y:0};
		console.log("new Mouse")
		obj.bind("mousedown touchstart",function(e){thisObj.mousedownHl(e)});
		obj.bind("mousemove touchmove",function(e){thisObj.mousemoveHl(e)});
		obj.bind("mouseup touchend",function(e){thisObj.mouseupHl(e)});
		$(window).bind("resize",function(){thisObj.resizeHl()}).trigger("resize");
		
	}
	
	mousedownHl(e){
		this.startP=this.getCurrentPoint(e);
		this.lastP=this.startP;
		//console.log("mousedownHl");
		//console.log(e);
		//console.log(this.startP)
		this.pressState=true;
	}
	
	mousemoveHl(e){
		this.moveP=this.getCurrentPoint(e);
		//console.log("mousemoveHl");
		//console.log(this.moveP)
		if(this.pressState){
			let difX=this.moveP.x-this.startP.x;
			let difY=this.moveP.y-this.startP.y;
			let l=Math.sqrt(Math.pow(difX,2)+Math.pow(difY,2));
			let moveX=this.moveP.x-this.lastP.x;
			let moveY=this.moveP.y-this.lastP.y;
			
			this.drugDistance={"l":l,"x":difX,"y":difY,"moveX":moveX,"moveY":moveY}
		}
		this.lastP=this.moveP;
	}
	
	mouseupHl(){
		this.pressState=false;
		this.drugDistance={"l":0,"x":0,"y":0,"moveX":0,"moveY":0}
	}
	
	getMousePoint(){
		return this.lastP;
	}
	
	getDrugdistance(){
		return this.drugDistance;
	}
	
	getPressState(){
		return this.pressState;
	}
	
	getCurrentPoint(e){
		
		let px=0,py=0;
		
		if(e.type=="mousedown"|| e.type=="mousemove" || e.type=="click"){
			px=e.clientX-this.offset.left;
			py=e.clientY-this.offset.top;
		}else if(e.type=="touchstart"||e.type=="touchmove"){
			px=e.touches[0].pageX-this.offset.left;
			py=e.touches[0].pageY-this.offset.top;
		}
		return {x:px,y:py};
	}
	
	resizeHl(){
		//console.log("this.offset");
		//console.log(this);
		//console.log(this.targetObj);
		this.offset=this.targetObj.offset();
	}
}