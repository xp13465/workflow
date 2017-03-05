$(function() {
	var toolBar = function (params) {
		this.init(params);
	};
	toolBar.prototype = {
		init: function (params) {
			var me = this;
			this.flag = false;
			this.title = params.title;
			this.icon = params.icon;
			this.winTo = params.winTo;

			this.templeate = this.getHtml(params);
			var li = document.createElement('li');
			$(li).addClass('cur');
			$(li).html(this.templeate);
			$(li).click(function () {
				me.toggle();
			});
			this.btnEl = li;
			me.calWidth();
		},
		getHtml : function(params){
			var temp = '';
			temp += '   <span class="span_b"><span class="span_s">';
			temp += '       <i class="w32 icon ' + params.icon + '">';
			temp += '       </i> ';
			temp += '       <font class="btnText text">' + params.title + '</font>';
			temp += '   </span></span>';
			return temp;
		},
		setTitle : function(title){
			$(this.btnEl).find(".btnText").html(title);
		},
		toggle: function () {
			$(this.btnEl).siblings().removeClass();
			if ($(this.btnEl).hasClass('cur')) {
				$(this.btnEl).removeClass('cur w169');
				if(this.winTo) this.winTo.hide();
			} else {
				$(this.btnEl).addClass('cur w169').siblings().removeClass('cur w169');
				if(this.winTo) this.winTo.show();
			}
			this.flag = !this.flag;
		},
		active : function(){
			if (!$(this.btnEl).hasClass('cur')) {
				$(this.btnEl).addClass('cur').siblings().removeClass('cur');
			}
		},
		deactive : function(){
			if ($(this.btnEl).hasClass('cur')) {
				$(this.btnEl).removeClass('cur');
			}
		},
		removeEl: function () {
			$(this.btnEl).remove();
		},
		close : function(){
			$(this.btnEl).remove();
		},
		calWidth : function(){
			var w = $(window).width();
				startBtnWidth =  $(startCommone.theEl).find('.btnStartBtn').width(),
				otherBtnWidth =  w - startBtnWidth,
				childWidth = 169,
				ObjUl = $(startCommone.theEl).find('.btnUl'),
				length = ObjUl.find('li').length + 1,
				diff = 0 ;
				if(childWidth * length > otherBtnWidth){
					diff = otherBtnWidth/length -20;
					ObjUl.find('.span_b').width(diff);
				}
		}
	}
	window.toolBar = toolBar;
	//window.startBar = startBar;


	var StartBar = function (params) {
		this.init(params);
	}
	StartBar.prototype = {
		status: 'openmenu',
		init: function () {
			var me = this;
			var params = arguments[0];
			params = params || {};
			var theEl = this.theEl = $("#" + params.Elid);
			var html = this.getHtml();
			$(theEl).html(html);

			$(theEl).find('.startbtn').click(function (){
				me.startClick.call(me);
			});
		},

		startClick: function (flag) {
			var menu = $("#startmenudiv");
			if(typeof(flag) === 'undefined'){
				if(menu.hasClass('hiddenmenu')){
					menu.removeClass('hiddenmenu');
				}else{
					menu.addClass('hiddenmenu');
				}
			}else{
				if(!flag){
					menu.removeClass('hiddenmenu');
				}else{
					menu.addClass('hiddenmenu');
				}
			}
		},

		getHtml: function () {
				return ['<div class="bg"></div>',
						'<dl class="bottom">',
							'<dt class="list btnStartBtn">',
								'<li class="startbtn">',
									'<span class="span_l">',
										'<i class="w32 icon startmenu">',
										'</i>',
										'<font class="btnText text">开始</font>',
									'</span>',
								'</li>',
							'</dt>',
							'<dd class="list btnUl">',
							'</dd>',
						'</dl>'].join("");
		},

		createBtn: function (params){
			var btn = new toolBar(params);
			var b_dom = $(btn.btnEl);
			var Ul_dom = $(this.theEl).find(".btnUl");
			$(Ul_dom).append(btn.btnEl);
			$(b_dom).addClass('cur').siblings().removeClass('cur hover');
			//this.startClick(false);
			return btn;
		}
	}
	window.StartBar = StartBar;
})