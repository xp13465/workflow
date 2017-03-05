;(function(){
	var Sider = Class.extend({
		self		: 	null,
		silider 	: 	null,
		lock_scrol	:	"none", //(用于事件控制)指示被锁定的事件驱动模式 x ：横向  ，y ：纵向  ； xy ： 横向加纵向
		mingandu	: 	1,		//敏感度
		winwidth	: 	0,
		winheight	: 	0,
		startPos	: 	{},
		startMainPos:	{x:0,y:0},
		endPos		:	{x:0,y:0},
		curPos		: 	{},
		mode		: 	"",
		endFn		: 	null,

		handleEvent	:	function(event){
			var self = this;     //this指events对象
			if(event.type == 'touchstart'){
				self.start(event);
			}else if(event.type == 'touchmove'){
				self.move(event);
			}else if(event.type == 'touchend'){
				self.end(event);
			}
			if(event.stopPropagation) { //W3C阻止冒泡方法
				event.stopPropagation();
			} else {
				event.cancelBubble = true; //IE阻止冒泡方法
			}
		},

		start 		: function(event){
			//event.preventDefault();
			//if(SggApp.prototype.is_open_sub()) return;
			var top = $(this.silider).css('top');
			var left = $(this.silider).css('left');

			this.lock_scrol = "none";
			//this.endFn = null;
			this.startMainPos = $(this.silider).position();
			var touch = event.touches[0];

			this.startPos = { x:touch.pageX , y:touch.pageY, time: +new Date };
			this.endPos = { x:touch.pageX , y:touch.pageY, time: +new Date };

			this.curPos = { x:left , y:top };

			this.silider.addEventListener('touchmove',this,false);
			this.silider.addEventListener('touchend',this,false);
		},

		move 		: function(event){
			//console.log(event);
			var top = $(this.silider).position().top;
			var left = $(this.silider).position().left;
			var touch = event.touches[0];

			this.endPos = { x : touch.pageX , y : touch.pageY , time: + new Date};
			var Pos = { x : touch.pageX , y : touch.pageY, time: + new Date };

//console.log(this.endPos);

			var cha_x = Pos.x - this.startPos.x;
			var cha_y = Pos.y - this.startPos.y;

			if(Math.abs(cha_x)>Math.abs(cha_y)  && this.lock_scrol == "none"){
				this.lock_scrol = "x";
			}else if(Math.abs(cha_x)<Math.abs(cha_y) && this.lock_scrol == "none"){
				this.lock_scrol = "y";
			}else if(Math.abs(cha_x) == Math.abs(cha_y) && this.lock_scrol == "none"){
				this.startPos = { x:touch.pageX , y:touch.pageY, time: +new Date };
			}

			if(this.checkMove()){
				//alert('d');
				if(this.lock_scrol === "x"){
					this.curPos = { x : left + cha_x , y : top };
					$(this.silider).css({'left' : left + cha_x});
				}else if(this.lock_scrol === "y"){
					this.curPos = { x : left , y:cha_y };
					$(this.silider).css({'top' : top  + cha_y});
				}else if(this.lock_scrol === "xy"){
					this.curPos = { x : left + cha_x , y: top + cha_y };
					$(this.silider).css({'left' : left + cha_x , "top": top + cha_y});
				}
			}
		},

		end 		: function(event){

			var top = $(this.silider).offsetParent().top;
			var left = $(this.silider).offsetParent().left;

			if(typeof(this.endFn) === 'function'){
				this.endFn(this ,this.startPos ,this.endPos);
			}else{

				$(this.silider).animate({
					left : this.startMainPos.x,
					top : this.startMainPos.y
				},200);
				this.curPos = { x : this.startMainPos.x , y :this.startMainPos.y };
			}
			this.lock_scrol = "none";
			this.silider.removeEventListener('touchmove',this,false);
			this.silider.removeEventListener('touchend',this,false);

		},

		init 	: function( options ){
			var self = this.self = this;
			$M.apply( this , options );

			this.mode = this.mode ? this.mode : 'x2';

			self.silider = $(options.elid).get(0);
			self.silider.addEventListener('touchstart', self, false);    //addEventListener第二个参数可以传一个对象，会调用该对象的handleEvent属性
		},

		checkMove : function(){
			var cha_x = this.startPos.x - this.endPos.x;
			var cha_y = this.startPos.y - this.endPos.y;

			if( this.mode === 'x1' && cha_x > 0 ){		//如果 只取横向右滑
				//this.endPos = { x: this.startMainPos.x , y: this.startMainPos.y, time:+new Date};
				$(this.silider).css({'left' : this.startMainPos.x });
				return false;
			}else if( this.mode === 'x2' && cha_x < 0 ){
				//this.endPos = { x: this.startMainPos.x , y:this.startMainPos.y, time:+new Date};
				$(this.silider).css({'left' : this.startMainPos.x });
				return false;
			}

			return true;
		}
	});


	window.Sider = Sider;
})();