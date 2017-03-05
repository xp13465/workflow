//app基类
;(function($){

	$M = $M || {};

	var document = window.document;
	var $ = $;
	var scrinwidth = window.screen.width;
	var scrinheight = window.screen.height;

	//构造函数，使得每次初始化不需要使用 new

	var Tc  = Class.extend({
		version : '1.0.0',

		maindiv : null,

		channels : [], //栏目运行缓存

		pages : [], //页面运行缓存

		init : function(options){
			this.channelPanel = new $M.channel(options);
			this.poppagesPanel = new $M.popPages();
			this.permisstionCodes = false;
			this.updatePermission();
		},

		updatePermission : function( code ){
			var me = this;
			if(!code){
				$M.Ajaxs({
					url : "/Admin/Access/getUserAllPermissions",
					data : {}
				},function(data){
					if(typeof(data.length) != 'undefined'){
						me.permisstionCodes = me.permisstionCodes || {};
						for(var i in data){
							me.permisstionCodes[data[i]] = true;
						}
					}
				});
			}
		},

		checkPermission : function(code){
			var me = this;
			return !!me.permisstionCodes[code];
		},

		loadChannel: function(option){			//调入一个频道

		},

		findeChannel : function(itemid){		//根据频道id 或 对象查找 频道对象

		},

		linkPage : function( pageConf ){
			this.poppagesPanel.linkPage(pageConf);
		},

		backPrevPage : function(){
			this.poppagesPanel.goPrevPage();
		}
	});

	window.app = $M.app = Tc;

})($);