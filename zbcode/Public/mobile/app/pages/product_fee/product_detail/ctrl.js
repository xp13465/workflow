(function(){
    var ctrl = $M.ctrl.extend({
        init : function(){
            this._super.prototype.constructor.call(this,arguments);
        },

        __linkpage__ : function(){
            App.linkPage({
                loads : {
                    remotedataUrl : "/Public/mobile/app/pages/apphome/template/json.json", //远程获取数据的url
                    templateUrl : "/Public/mobile/app/pages/apphome/template/view.html",
                    ctrljsUrl : "/Public/mobile/app/pages/apphome/template/ctrl.js",   //js地址
                    csscodeUrl : "/Public/mobile/app/pages/apphome/template/css.css",  //js地址
                },
                style : 'background:red;',
                width : this.elWidth,
                height : this.elHeight
            });
        },

        __gotoitem__ : function(li){
            var status=$(li).attr('status');
            alert(status);
        },
        __view_baseinfo__ : function( b ){
            var me = this;
            var params = me.__getParams( b );
            App.linkPage({
                loads : {
                    remotedataUrl : "/product/getProductInfo", //远程获取数据的url
                    templateUrl : "/Public/mobile/app/pages/product_fee/product_baseinfo/view.html",
                    ctrljsUrl : "/Public/mobile/app/pages/product_fee/product_baseinfo/ctrl.js",   //js地址
                    csscodeUrl : "/Public/mobile/app/pages/product_fee/product_baseinfo/css.css",  //js地址
                    ctrls : ""
                },
                postData : {id:params.id},
                width : this.elWidth,
                height : this.elHeight
            });
        },
        __view_addinfo__ : function( b ){
            var me = this;
            var params = me.__getParams( b );
            App.linkPage({
                loads : {
                    remotedataUrl : "/product/getProductInfo", //远程获取数据的url
                    templateUrl : "/Public/mobile/app/pages/product_fee/product_addinfo/view.html",
                    ctrljsUrl : "/Public/mobile/app/pages/product_fee/product_addinfo/ctrl.js",   //js地址
                    csscodeUrl : "/Public/mobile/app/pages/product_fee/product_addinfo/css.css",  //js地址
                    ctrls : ""
                },
                postData : {id:params.id},
                width : this.elWidth,
                height : this.elHeight
            });
        },
        __view_scoreinfo__ : function( b ){
            var me = this;
            var params = me.__getParams( b );
            App.linkPage({
                loads : {
                    remotedataUrl : "/product/getProductInfo", //远程获取数据的url
                    templateUrl : "/Public/mobile/app/pages/product_fee/product_scoreinfo/view.html",
                    ctrljsUrl : "/Public/mobile/app/pages/product_fee/product_scoreinfo/ctrl.js",   //js地址
                    csscodeUrl : "/Public/mobile/app/pages/product_fee/product_scoreinfo/css.css",  //js地址
                    ctrls : ""
                },
                postData : {id:params.id},
                width : this.elWidth,
                height : this.elHeight
            });
        },
        __view_scoreresultinfo__ : function( b ){
            var me = this;
            var params = me.__getParams( b );
            App.linkPage({
                loads : {
                    remotedataUrl : "/product/getProductInfo", //远程获取数据的url
                    templateUrl : "/Public/mobile/app/pages/product_fee/product_scoreresultinfo/view.html",
                    ctrljsUrl : "/Public/mobile/app/pages/product_fee/product_scoreresultinfo/ctrl.js",   //js地址
                    csscodeUrl : "/Public/mobile/app/pages/product_fee/product_scoreresultinfo/css.css",  //js地址
                    ctrls : ""
                },
                postData : {id:params.id},
                width : this.elWidth,
                height : this.elHeight
            });
        },
        __view_feeinfo__ : function( b ){
            var me = this;
            var params = me.__getParams( b );
            App.linkPage({
                loads : {
                    remotedataUrl : "/product/getProductInfo", //远程获取数据的url
                    templateUrl : "/Public/mobile/app/pages/product_fee/product_feeinfo/view.html",
                    ctrljsUrl : "/Public/mobile/app/pages/product_fee/product_feeinfo/ctrl.js",   //js地址
                    csscodeUrl : "/Public/mobile/app/pages/product_fee/product_feeinfo/css.css",  //js地址
                    ctrls : ""
                },
                postData : {id:params.id},
                width : this.elWidth,
                height : this.elHeight
            });
        },
        __view_attachinfo__ : function( b ){
            var me = this;
            var params = me.__getParams( b );
            App.linkPage({
                loads : {
                    remotedataUrl : "/product/getProductInfo", //远程获取数据的url
                    templateUrl : "/Public/mobile/app/pages/product_fee/product_attachinfo/view.html",
                    ctrljsUrl : "/Public/mobile/app/pages/product_fee/product_attachinfo/ctrl.js",   //js地址
                    csscodeUrl : "/Public/mobile/app/pages/product_fee/product_attachinfo/css.css",  //js地址
                    ctrls : ""
                },
                postData : {id:params.id},
                width : this.elWidth,
                height : this.elHeight
            });
        },
        __view_docinfo__ : function( b ){
            var me = this;
            var params = me.__getParams( b );
            App.linkPage({
                loads : {
                    remotedataUrl : "/product/getProductInfo", //远程获取数据的url
                    templateUrl : "/Public/mobile/app/pages/product_fee/product_docinfo/view.html",
                    ctrljsUrl : "/Public/mobile/app/pages/product_fee/product_docinfo/ctrl.js",   //js地址
                    csscodeUrl : "/Public/mobile/app/pages/product_fee/product_docinfo/css.css",  //js地址
                    ctrls : ""
                },
                postData : {id:params.id},
                width : this.elWidth,
                height : this.elHeight
            });
        }
        ,
        __submit_product__ : function(b){
            var me = this;
            var params = me.__getParams( b );
            App.linkPage({
                loads : {
                    remotedataUrl : "/product/getProductInfo", //远程获取数据的url
                    templateUrl : "/Public/mobile/app/pages/product_mark/product_marksubmit/view.html",
                    ctrljsUrl : "/Public/mobile/app/pages/product_mark/product_marksubmit/ctrl.js",   //js地址
                    csscodeUrl : "/Public/mobile/app/pages/product_mark/product_marksubmit/css.css",  //js地址
                    ctrls : ""
                },
                postData : {id:params.id},
                width : this.elWidth,
                height : this.elHeight
            });

        },
        __cancel_product__ : function(b){
            var me=this;
            var params = me.__getParams( b );
            $M.Message.confirm('提示','确认操作吗','submit',function(result){
                console.log(result);
                if(result==true){
                    $M.Ajaxs({
                        url:'/product/productRevoke',
                        data:{id:params.id},
                    },function(data){
                        if(data.status>0){
                            $M.Message.alert('提示','操作成功','info');
                        }else{
                            $M.Message.alert('提示',data.msg,'info');
                        }

                    });
                }
            });

        }

    });

    return new ctrl();
})();