;(function(){
    $M = $M || {};

    var ctrl = Class.extend({
        page : null,

        init : function(){
        },

        getPage : function(){
            return this.page?this.page:null;
        },

        isPageLoaded : function(){
            return this.page?((this.page==null)?false:true):false;
        },

        renderTemplate : function(fel){
            var me = this;
            var father = fel.getEl?fel.getEl():null;
            if(father === null) return;

            this.page = fel;
            me.renderHtml(father);

        },

        renderHtml : function( el ){
            if(!!!el) return;
            var me = this;

            $(el).find("*").each(function(index,con){
                var ui_type = $(con).attr('ui-type'); //如果指定了渲染类型
                //console.log(con);

                ui_type = (ui_type === null)?"":ui_type;
                if(!!ui_type && typeof(me["__" + ui_type + "__"]) === 'function'){
                    me["__" + ui_type + "__"].call(me,con);
                }

                var bid = $(con).attr('bid');
                var checkElement = $(con).attr('checkElement');
                if(!!bid && typeof(me['checkElement']) === 'function'){
                    checkElement = checkElement?eval('('+ checkElement +')'):{};

                    if(!me['checkElement'](con , checkElement)){
                        var mode = checkElement['do']?checkElement['do']:'hide';
                        if(mode === 'hide'){
                            $(con).hide();
                        }else if(mode === 'disable'){
                            $(con).addClass('disable');
                        }
                    }
                }

                var permission = $(con).attr('permission');
                if(!!permission){
                    if(!App.checkPermission(permission)){
                        $(con).hide();
                        return;
                    }
                }

                var event = $(con).attr('tap-event'); //如果指定了事件
                event = (event === null)?"":event;

                if(!!event && typeof(me["__"+event+"__"]) === 'function'){
                    if(!$(con).hasClass('disable')){
                        $(con).on('tap',function(){
                            me["__"+event+"__"].call( me , con);
                        });
                    }
                }

                var el_event = $(con).attr('el-event'); //如果指定了渲染类型
                //console.log(con);

                el_event = (el_event === null)?"":el_event;
                if(!!el_event && typeof(me["__" + el_event + "__"]) === 'function'){
                    me["__" + el_event + "__"].call(me,con);
                }

            })
        },

        checkElement : function(){
            return true;
        },

        __reload__ : function(b){
            var me = this;
            me.getPage().reloadPage();
        },

        __getParams : function(dom){
            var paramStr = $(dom).attr('params');
            paramStr = (event === null)?"":paramStr;
            var params = {};
            if(!!paramStr){
                var params = eval("("+paramStr+")");
            }
            return params;
        },

        __button__ : function(dom){  //将元素渲染成按钮
            var me = this;
            var params = me.__getParams();
        },

        __navlist__ : function(b){  //将元素渲染成导航条
            var me = this;
            $(b).addClass('nav');
            var event = $(b).attr("items-event");

            var width = 0;
            $(b).find("li").each(function(index , li){
                width += $(li).width();
                if(typeof(me["__"+event+"__"])==='function'){
                    $(li).unbind('click').on('click',function(){
                        me["__"+event+"__"](li);
                    });
                }
            });
            var pagewidth = $(me.getPage().getEl()).width();
            pagewidth = (width > pagewidth)?width:pagewidth;
            $(b).find("ul").eq(0).width(pagewidth);

        },

        __backbutton__ : function(){  //将元素渲染成返回按钮，并绑定返回事件

        },

        __backprvepage__ : function(){
            App.backPrevPage();
        },

        __loadmore__ : function(b){
            var me = this;
            var page = this.getPage();
            if(!page){
               $(b).hide();
               return;
            }else{
                var postparams = $M.apply({} , page.postData);
                $M.apply(postparams , page.pageobj);
                postparams.page++;

                $M.Ajaxs({
                    url: page.remotedataUrl,
                    data: postparams ,
                },function(data){
                    var page = me.getPage();
                    page.appendItems( data , page.getTmpByName('items') , $(page.getEl()).find("div.btnMlist").eq(0) );
                });
                //console.log(page.getTmpByName('items'));
            }

        },

        __search__ : function(){

        },

        __searchevent__ : function(el){
            var url = $(el).attr('params');
            url = eval("(" + url + ")");
            url = url.url;

            var key = $(el).prev().find('input').val();

            $M.Ajaxs({
                url : url,
                datas : {"key":key}
            }, function(data){

            })
        },

        __click_search__:function(b){
            var me = this;
            var params = me.__getParams( b );
            App.linkPage({
                loads : {
                    remotedataUrl : "/product/productQuickList", //远程获取数据的url
                    templateUrl : "/Public/mobile/app/pages/search/view.html",
                    ctrljsUrl : "/Public/mobile/app/pages/search/ctrl.js"
                },
                width : this.elWidth,
                height : this.elHeight
            });
        }

    });

    $M.ctrl = ctrl;

})();