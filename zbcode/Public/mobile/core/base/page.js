/**/
;(function(){
    $M = $M || {};

    var page = Class.extend({

        init : function(conf){
            var me = this;

            me.el = null ;
            me.ctrl = null;
            me.postData = {};

            me.remoteData = null;  //获取到的数据暂存
            me.remotedataUrl = '';  //请求数据地址
            me.remoteLoaded = false;

            me.templateStr = "" ;          //暂存页面模板
            me.templateUrl = "" ;          //模板请求地址
            me.tmploaded = false;

            me.ctrljsStr = "" ;             //暂存页面js代码
            me.ctrljsUrl = "";             //js请求地址
            me.ctrlloaded = false;

            me.csscodeStr = "";          //暂存页面css代码
            me.csscodeUrl = "" ;          //css请求地址
            me.cssloaded = false;

            me.loaded = false;

            me.binded = false;

            me.elclass = "";

            me.style = '';

            me.parentPage = null;

            me.pageobj = {
                page : 1,
                limit :10,
                total : 0
            };

            $M.apply(this , conf);
            var scrinwidth = window.screen.width;
            var scrinheight = window.screen.height;
            $('body').width(scrinwidth);
            var width = conf.width?conf.width:scrinwidth;
            var height = conf.height?conf.height:scrinheight;

            $M.apply(this  , conf);

            if(!this.el || this.el === null){
                var el = document.createElement('div');
                $(el).addClass('page');
                $(el).css({ width : width , height : height});
                if(!!this.elclass){
                    this.elclass = String(this.elclass).replace(/\。{1,}/g, ",");
                    this.elclass = String(this.elclass).replace(/\，{1,}/g, ",");
                    this.elclass = String(this.elclass).replace(/\.{1,}/g, ",");
                    this.elclass = String(this.elclass).replace(/\s{1,}/g,",");
                    var arr = String(this.elclass).split(',');
                    for(var i in arr){
                        $(el).addClass(arr[i]);
                    }
                }
                if(this.style){
                    var style = $(el).attr('style');
                    $(el).attr('style' , style + ";" + this.style);
                }

                var loads = conf.loads;

                me.loadTemplate();
                me.loadCtrljs();
                me.loadCsscode();
                me.loadDatas();
            }
            this.el = el;

            me.bindData();
        },

        getEl : function(){
            return this.el;
        },

        destory : function(){
            //console.log(this.el);
            $(this.el).empty();
            $M.removeElement(this.el);
        },

        loadTemplate : function( loads , flag ){  //loads 可指定调入对象  ， flag ：指定是否刷新重新调入
            var me = this;
            var loads = (!!loads)?loads:me.loads;

            if(!!loads.template){
                me.templateStr = loads.template;
                me.templateUrl = "";
                me.tmploaded = true;
            }else if(!!loads.templateUrl){
                var key = transUrl2Elid(loads.templateUrl);
                if(!!!$M.Memery.get(key) || !!flag){

                    $.ajax({
                        url : loads.templateUrl + "?" + TIMESTAMP,
                        type : 'GET',
                        contentType : "text/html",
                        success : function(data){
                            me.templateUrl = loads.templateUrl;
                            me.templateStr = data;
                            me.tmploaded = true;

                            $M.Memery.set(key , data);
                        },
                        error: function(xhr , type){
                            //alert( loads.templateUrl + "\n"+xhr.status );
                            me.templateUrl = loads.templateUrl;
                            me.templateStr = "";
                            me.tmploaded = true;
                        }
                    });
                }else{
                    me.templateStr = $M.Memery.get(key);
                    me.tmploaded = true;
                }
            }else{
                me.templateStr = "";
                me.templateUrl = "";
                me.tmploaded = true;
            }
        },

        loadCtrljs : function( loads , flag ){
            var me = this;
            var loads = (!!loads)?loads:me.loads;

            if(!!loads.ctrljs){
                me.ctrljsStr = loads.ctrljs;
                me.ctrljsUrl = "";
                me.ctrlloaded = true;
            }else if(!!loads.ctrljsUrl){
                var key = transUrl2Elid(loads.ctrljsUrl);
                if(!!!$M.Memery.get(key) || flag){
                    $M.Loading.show(me.getEl());
                    $.ajax({
                        url : loads.ctrljsUrl + "?" + TIMESTAMP,
                        type : 'GET',
                        contentType : "text/xml",
                        success : function(data){
                            me.ctrljsStr = data;
                            me.ctrljsUrl = loads.ctrljsUrl;
                            me.ctrlloaded = true;

                            $M.Memery.set(key , data);
                        },
                        error   : function(xhr , type){
                            //alert( loads.ctrljsUrl + "\n"+xhr.status );
                            me.ctrljsStr = "";
                            me.ctrljsUrl = loads.ctrljsUrl;
                            me.ctrlloaded = true;
                        }
                    });
                }else{
                    me.ctrljsStr = $M.Memery.get(key);
                    me.ctrlloaded = true;
                }
                /*                    $.ajax({
                 url : conf.loads.ctrljsUrl,
                 type : 'GET',
                 success : function(data){
                 var head= document.getElementsByTagName('head')[0];
                 var script= document.createElement('script');
                 script.type= 'text/javascript';
                 $(script).html(data);
                 if(!me.template){
                 setTimeout( function(){
                 }, 500 );
                 }
                 head.appendChild(script);
                 me.ctrljs = data;
                 },
                 error   : function(xhr , type){
                 alert('load ctrl error');
                 }
                 });*/
            }else{
                me.ctrljsStr = "";
                me.ctrljsUrl = "";
                me.ctrlloaded = true;
            }
        },

        loadCsscode : function( loads , flag ){
            var me = this;
            var loads = (!!loads)?loads:me.loads;

            if(!!loads.csscode){
                me.csscodeStr = loads.csscode;
                me.csscodeUrl = "";
                me.cssloaded = true;
            }else if(!!loads.csscodeUrl){
                var key = transUrl2Elid(loads.csscodeUrl);
                if(!!!$M.Memery.get(key) || flag){
                    $M.Loading.show(me.getEl());
                    $.ajax({
                        url : loads.csscodeUrl + "?" + TIMESTAMP,
                        type : 'GET',
                        contentType : "text/xml",
                        success : function(data){
                            me.csscodeStr = data;
                            me.csscodeUrl = loads.csscodeUrl;
                            me.cssloaded = true;

                            $M.Memery.set(key , data);
                        },
                        error   : function(xhr , type){
                            //alert( loads.csscodeUrl + "\n"+xhr.status);
                            me.ctrljsStr = "";
                            me.ctrljsUrl = loads.ctrljsUrl;
                            me.cssloaded = true;
                        }
                    });
                }else{
                    me.csscodeStr = $M.Memery.get(key);
                    me.cssloaded = true;
                }
            }else{
                me.csscodeStr = "";
                me.ctrljsUrl = "";
                me.cssloaded = true;
            }
        },

        loadDatas : function( loads , flag ){
            var me = this;
            var loads = (!!loads)?loads:me.loads;
            //alert(!!loads.remoteData);
            if(!!loads.remoteData && loads.remoteData!=null){
                me.remoteData = loads.remoteData;
                me.remotedataUrl = "";
                me.remoteLoaded = true;
            }else if(!!loads.remotedataUrl){
                me.remoteLoaded = false;

                $M.Loading.show(me.getEl());
                var pageobj = {
                    limit : me.pageobj.limit,
                    page : 1
                }
                $M.apply(pageobj , me.postData);
                $.ajax({
                    url : loads.remotedataUrl,
                    type : 'POST',
                    data : pageobj ,
                    dataType : 'json',
                    success : function(data){
                        me.remoteData = data;
                        me.remotedataUrl = loads.remotedataUrl;
                        me.remoteLoaded = true;
                    },
                    error   : function(xhr , type){
                        //alert(xhr.status);
                        me.remoteData = null;
                        me.remotedataUrl = loads.remotedataUrl;
                        me.remoteLoaded = true;
                    }
                });
            }else{
                me.remoteData = null;
                me.remotedataUrl = "";
                me.cssloaded = true;
            }
        },

        bindData : function( data ){
            var me = this;
            var bdata = (!!data)?data:me.remoteData;

            $M.Loading.show(me.getEl());

            var fn =  function ( remotedata ){
                if((!me.tmploaded || !me.cssloaded || !me.ctrlloaded) && !remotedata){
                    //$M.Message.alert("网络不给力" , "页面调入失败" , "info" , function(){
                    //    App.backPrevPage();
                   // });
                    $M.loadErrorTemp();
                    return;
                }else{
                    var el = me.getEl();
                    $(el).empty();
                    if(!!me.csscodeStr){
                        var style = document.createElement('style');
                        style.type = "text/css";
                        style.innerHTML = me.csscodeStr;
                        $(me.el).append(style);
                    }

                    var scrid = transUrl2Elid(me.ctrljsUrl);
                    me.pageid = scrid;

                    //if( typeof(window[scrid]) == 'undefined' ){
                    if(!!me.ctrljsStr){
                        me.ctrl = eval( me.ctrljsStr );
                        window[scrid] = eval( me.ctrljsStr );
                    }
                    //}

                    var html = me.templateStr;
                    html = String(html).replace(/\_\_MOBILE_PATH\_\_/g, THE_MOBILE_PATH);

                    var e = $('#templatetemp').html(html);
                    var tohtml = $('#templatetemp').find("template");

                    var templateArr = [];
                    var template = "";

                    $(tohtml).each(function(index , el){
                        var name = $(el).attr("name");
                        if( name === "body" ){
                            template = $M.htmlDecode($(el).html());
                        }
                        templateArr[ index ] = {"html" : $M.htmlDecode($(el).html()) , "name" : $(el).attr("name")};
                    });

                    if(!template || template==null){
                        template = html;
                    }
                    me.templateArr = templateArr;
                    $('#templatetemp').empty();
                    var tmpDot = doT.template($M.htmlDecode(template));
                    var rendata = $M.apply({} , (!!remotedata)?remotedata:me.remoteData);
                    rendata = $M.apply(rendata , me.postData);
                    $(el).append(tmpDot(rendata));

                    me.remoteData = remotedata?remotedata:me.remoteData;
                    me.updatePageObj();
                    me.ctrl.renderTemplate.call(me.ctrl , me);

                    //me.doLayout();
                }
            }

            if(!!data){
                fn(data);
            }else{
                setTimeout(fn , 1000);
            }
        },

        doLayout : function(){
            var me = this;
            var width = $(me.getEl()).width();
            $($(me.getEl())).css('width',(width-5));
            setTimeout(function(){
                $($(me.getEl())).css('width',(width));
            } , 50);
        },

        updatePageObj : function( data ){
            var me = this;
            var d = data?data:this.remoteData;

            me.pageobj.page = d.page?d.page:1;
            me.pageobj.limit = d.limit ? d.limit : me.pageobj.limit;
            me.pageobj.total = d.total?parseInt(d.total):parseInt(me.pageobj.total);

            if( me.pageobj.page >= Math.ceil(me.pageobj.total/me.pageobj.limit) ){
                $(me.getEl()).find("div.more").hide();
            }else{
                $(me.getEl()).find("div.more").show();
            }
        },

        getTmpByName : function( name ){
            var ret = "", me = this;
            if(me.templateArr){
                for(var i in me.templateArr){
                    if(me.templateArr[i].name == name){
                        return me.templateArr[i].html;
                    }
                }
            }
            return ret;
        },

        reloadPage : function( data ){
            var me = this;
            if(!data){
                me.loadDatas();
                me.bindData();
            }else{
                me.bindData(data);
            }
        },

        appendItems : function( data , template , rendto){
            // data : 数据 , template：模板 , rendto : 渲染到哪里
            var me = this;
            var ul = document.createElement('ul');
            $(ul).attr("page",data.page?data.page:0);
            $(rendto).find("ul").last().after(ul);
            var init_i = $(rendto).find('li').length;

            data.init_i = init_i;

            var tmpDot = doT.template(template);
            $(ul).append(tmpDot(data));
            me.ctrl.renderHtml.call(me.ctrl , ul);

            me.updatePageObj(data);
        },

        rendeToEl : function( fatherEl , fn ){
            if(!fatherEl || $(fatherEl).length === 0) {
                throw new Error("无法渲染，父组件为空");
            }
            if(typeof($(fatherEl)[fn]) === 'undefined'){
                throw new Error("追加方法不存在");
            }
            $(fatherEl)[fn](this.el);
            $(fatherEl).css({width : $(fatherEl).width() + $(this.el).width()});
            //return fatherEl;
        }
    });

    $M.page = page;
})();