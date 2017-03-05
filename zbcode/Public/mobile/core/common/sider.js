;(function(){
	$M = $M || {};

	var Sider = Class.extend({
		self		: 	null,
		silider 	: 	null,
		father		:  null,
		curPageIndex : -1,
		lock_scrol	:	"none", //(用于事件控制)指示被锁定的事件驱动模式 x ：横向  ，y ：纵向  ； xy ： 横向加纵向
		mingandu	:   1 ,		//敏感度
		x_size_do 	:  200,
		y_size_do	:  200,
		chaPos		: 	{},

		mode		: 	"",
		endFn		: 	function(){},

		handleEvent	:	function(event){
			//event.preventDefault();
			var self = this;     //this指events对象
			if(event.type == 'touchstart'){
				self.start(event);
			}else if(event.type == 'touchmove'){
				self.move(event);
			}else if(event.type == 'touchend'){
				self.end(event);
			}

			if(event.stopPropagation){ //W3C阻止冒泡方法
				//event.stopPropagation();
			} else {
				//event.cancelBubble = true; //IE阻止冒泡方法
			}

		},

		start 		: function(event){
			//event.stopPropagation();
			this.lock_scrol = "none";
			var touch = event.touches[0];

			this.startPos =	{ x : touch.pageX , y : touch.pageY , time :  +new Date };
			this.runPos = { x : touch.pageX , y : touch.pageY , time :  +new Date };
			this.startElPos =	$(this.silider).position();
			this.curElPos = $(this.silider).position();

			//$("#tips1").html("startPos : x : " + this.startPos.x + "  y : " + this.startPos.y + "<br/>");

			//$("#tips2").html("runPos : x : " + this.runPos.x + "  y : " + this.runPos.y + "<br/>");

			//$("#tips3").html("startElPos : x : " + this.startElPos.left + "  y : " + this.startElPos.top + "<br/>");

			this.silider.addEventListener('touchmove',this,false);
			this.silider.addEventListener('touchend',this,false);
		},

		move 		: function(event){
			event.preventDefault();	//取消浏览器默认动作
			if(event.touches.length > 1 || event.scale && event.scale !== 1 ) return;
			//event.stopPropagation();
			var touch = event.touches[0];

			this.runPos = { x : touch.pageX , y : touch.pageY , time :  +new Date };
			var chaPos = this.chaPos  = {x : parseInt((this.runPos.x - this.startPos.x) * this.mingandu) , y : parseInt((this.runPos.y - this.startPos.y)*this.mingandu) , timecha : this.runPos.time - this.startPos.time }
			this.updateDirect(chaPos);

			if(this.checkMove(chaPos)){
				var eventstr = this.mode + '_do';
				if(typeof(this[eventstr]) === 'function') this[eventstr](chaPos);
				this.curElPos = $(this.silider).position();
			}else{
				event.preventDefault();
			}
		},

		end 		: 	function(event){
			var touch = event.touches[0];
			this.lock_scrol = "none";

			var end_eventstr = this.mode + '_End';
			if(typeof(this[end_eventstr]) === 'function')this[end_eventstr]();

			this.curElPos = $(this.silider).position();

			this.silider.removeEventListener('touchmove',this,false);
			this.silider.removeEventListener('touchend',this,false);
		},

		init 	: function( options ){
			var self = this.self = this;
			$M.apply( this , options );
			this.mode = this.mode ? this.mode : 'x3';

			self.silider = $(options.elid).get(0);
			self.father = $(options.father).get(0);


			if(!self.silider || !self.father) return;

			//self.silider.addEventListener('touchstart', self, false);    //addEventListener第二个参数可以传一个对象，会调用该对象的handleEvent属性
		},

		resetStart : function(){		//回到开始时状态
			$(this.silider).animate({
				left : this.startElPos.left,
				top :  this.startElPos.top
			} , 200 );
		},

		addPage : function( el , meth ){
			//this.pages.push( el );
			var page = el;
			el = (typeof(el.getEl) === 'function')?el.getEl():el;
			meth = meth?meth:'append';
			if(!this.silider || !this.father || !el) return ;
			var pageWidth = $(el).width() ? $(el).width() : $(this.father).width();
			var pageHeight = $(el).height() ? $(el).height():$(this.father).height();
			$(el).css({width: pageWidth , height : pageHeight});
			this.pages.push(page);

			if(typeof($(this.silider)[meth]) === 'function'){
				$(this.silider)[meth]( el );
				$(this.silider).css({width: $(this.silider).width() + pageWidth});
			}
			//alert($(this.silider).width());
		},

		setActive : function(page ,callback){  //page为-1则关闭 poppage

			if(typeof(page) === 'number'){
				if(typeof(this.pages[page]) === 'undefined'){
					return false;
				}else if( index < 0	 || index > this.pages.length-1){
					return false;
				}else{
					var index = page;
				}
			}else{
				for(var i in this.pages){
					if(page === this.pages[i]){
						var index = i;
					}
				}
			}

			if( typeof(index) === 'number' ){
				if(page < 0){
					var left = $(this.father).width();
				}else{
					var left = -index * $(this.father).width();
				}
				//if(index === -1) left =
				$(this.silider).animate({ left : left },200);
				this.curPageIndex = index;
			}

			if(typeof(callback) === 'function'){
				callback();
			}
		},

		goNextPage : function(){

			var  curindex = this.curPageIndex;
			if( curindex == (this.pages.length - 1)){
				return;
			}
			this.setActive( curindex+1 );
		},

		goPrevPage : function(  destroy , callback){
			var me = this;
			var ret = 1;
			var destroy =  (typeof(destroy) === 'undefined')?false:destroy;
			var  curindex = this.curPageIndex;
			if( curindex === 0 ){
				ret = -1;
			}

			this.setActive(curindex-1 , function(){

			});

			if(destroy){
				me.destroyPage(curindex);
			}

			if(typeof(callback) === 'function'){
				callback( curindex );
			}
			return ret;
		},
//Ext.apply
		destroyPage : function(index){
			var me = this;

			if(typeof(this.pages[index]) === 'undefined') return ;
			var page = this.pages[index];

			me.pages.splice(index , 1);
			page.destory();
		},

		updateDirect : function(chaPos){
			if(Math.abs(chaPos.x) > Math.abs(chaPos.y)  && this.lock_scrol == "none"){
				this.lock_scrol = "x";
			}else if(Math.abs(chaPos.x) < Math.abs(chaPos.y) && this.lock_scrol == "none"){
				this.lock_scrol = "y";
			}else if(Math.abs(chaPos.x) == Math.abs(chaPos.y) && this.lock_scrol == "none"){
				this.lock_scrol = "xy";
			}
		},

		checkMove : function( chaPos ){
			if(!this.mode) return false;
			return this[this.mode](chaPos);
		},
//=========================
		x1 : function(chaPos){			//是否为允许动作
			return chaPos.x > 0;
		},

		x1_do : function(chaPos){
			var x = this.startElPos.left + chaPos.x;
			x = parseInt(x);
			$(this.silider).css({'left' : x });
		},

		x1_End : function(){
			if(Math.abs(this.chaPos.x) > this.x_size_do){
				this.endFn();
			}else{
				this.resetStart();
			}
		},
//=========================
		x2 : function(chaPos){
			return chaPos.x < 0;
		},

		x2_do : function(chaPos){
			var x = this.startElPos.left - Math.abs( chaPos.x );
			x = parseInt(x);
			$(this.silider).css({'left' : x });
		},

		x2_End : function(chaPos){
			if(Math.abs(this.chaPos.x) > this.x_size_do){
				this.endFn();
			}else{
				this.resetStart();
			}
		},
//=========================
		x3 : function(chaPos){
			if(chaPos.x > 0){
				//alert('xiaoyu');
				var curpos = $(this.silider).position();
				if( curpos.left >= 0 ){ //如果超出范围则返回false
					return false;
				}
			}else if(chaPos.x < 0){
				var curpos = $(this.silider).position();

				if( Math.abs(curpos.left) >= $(this.father).width() * ( this.pages.length - 1 ) ){ //如果超出范围则返回false
					return false;
				}
			}
			return true;
		},

		x3_do : function(chaPos){
			var x = this.startElPos.left + chaPos.x;
			x = parseInt(x);
			$(this.silider).css({'left' : x });
		},

		x3_End : function(chaPos){
			var me = this;
			if(Math.abs(this.chaPos.x) > this.x_size_do){
				this.endFn(this);
				var fa_width = $(this.father).width();
				var el_width = $(this.silider).width();

				if(this.chaPos.x < 0 && Math.abs(this.chaPos.x) >= this.x_size_do){
					me.goNextPage();
				}else if(this.chaPos.x > 0 && Math.abs(this.chaPos.x) >= this.x_size_do){
					//if(me.pop){
						//me.goPrevPage( true );
					//}else{
						me.goPrevPage();
					//};
				}else{
					this.resetStart();
				}
			}else{
				this.resetStart();
			}
		},
//=========================
		y1 : function(chaPos){

		},

		y2 : function(chaPos){

		},

		y3 : function(chaPos){

		}

	});

	window.Sider = $M.Sider = Sider;
})();