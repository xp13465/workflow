;(function(){
    $M = $M || {};
    /**
     * options :
     * 	pages : [] ,
     el : null ,  //指示应用于channel的dom
     elWidth	  :
     */
    var pageBox = Class.extend({
        el : null,

        bgEl : null,

        silder : null,

        elWidth : window.screen.width,

        elHeight: window.screen.height,

        init : function(options){

            var me = this;
            var scrinwidth = window.screen.width;
            var scrinheight = window.screen.height;

            var def = {
                src 		: null,
                pageList : [],	// 频道列表
                el : null,	// 指示应用于channel的dom
                elWidth : scrinwidth ,	// 频道panel的宽
                elHeight : scrinheight 	// 频道panel的高
            }
            var conf = $M.apply({} , options , def);

            //从给定的el确定channel应用的dom
            if(typeof(conf.src) === 'string'){
                var el = $(conf.el);
                el = el.get(0);
                if(!el){
                    throw new Error("无法获取到指定page元素：" + conf.el);
                }
                conf.el = el;
            }else if(conf.src != null && typeof(conf.src) === 'object'){
                if($M.isDOM(conf.el)){
                    var el = conf.el;
                }else{
                    var el = $(conf.el)[0];
                }
                if(!$M.isDOM(el)){
                    throw new Error("所指定的page元素为非dom元素");
                }
                conf.el = el;
            }else if(conf.src === null){
                var el = document.createElement('div');
                conf.el = el;
            }

            $M.apply( this, conf );

            var scrinpara = {'width': scrinwidth + 'px' , 'height' : scrinheight + 'px' , 'overflow' : 'hidden' , background : '#272822'};
            $(this.el).css(scrinpara);
            $(this.el).addClass('sider-main').addClass('clearfix');
            if(this.pop){
                $(this.el).css({"left": scrinwidth , "z-index" : 1000});
            }else{
                $(this.el).css({"left": 0 , "z-index" : 100});
            }
            $('body').append(this.el);

            if(!this.bgEl){
                var bgel = document.createElement('div');
                $(bgel).css({ width:  '0px' , height : $(this.el).height() + 'px', 'background' : '#fff'} );

                $(bgel).addClass('sider-page');
                $(this.el).append(bgel);
                this.bgEl = bgel;//alert($(bgel).width());

                //console.log(this.bgEl);
                var params = $M.apply({
                    elid : bgel ,		//背景el元素，win的el元素
                    father : this.el,
                    mingandu : 0.7,
                    pages 		: 	[],
                    mode : 'x3',
                    x_size_do : 80
                } , { pop : conf.pop});
                var bgtouch = this.silder = new Sider(params);
                //this._pages = bgtouch.pages;
            }
            this.loadPages();

        },

        loadPages : function(arr){
            if(arr && !$M.isTypeOf(arr , Array)){
                throw new Error("导入频道对象类型不匹配！");
            }
            var c_arr = arr?arr:this.pages;
            for(var i in c_arr){
                if(!$M.isTypeOf( c_arr[i] , $M.page )){
                    var page = new $M.page( c_arr[i] );
                    this.silder.addPage( page/*.getEl()*/ , 'append' );
                    c_arr[i] = page;
                }
            }
            if( c_arr === this.pages )this.silder.setActive(0);
            return c_arr;
        },

        linkPage : function( pageConf ){
            var me = this;
            var pageArr = [ pageConf ];
            var pageArr = me.loadPages( pageArr );

            for(var i in pageArr){
                me.pages.push( pageArr[i] );
            }

            var curpos = $(me.el).position();
            this.silder.setActive(me.pages.length-1);
            if(curpos.left!=0) {
                $(me.el).show().animate({
                    left: 0,
                    top: 0
                }, 200);
            }
        },

        gotoPage : function(index){

        },

        goPrevPage : function(){
            this.silder.goPrevPage( );
        },

        goNextPage : function(){
            this.silder.goNextPage();
        },

        isActive : function(){
            var me = this;
            var left = $(me.el).css('left');
            left = parseInt(left);
            return left<=0?true:false;
            //if()
        }

    });

    $M.pageBox = pageBox;
})();