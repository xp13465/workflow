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
        checkElement : function(el){
            var me = this;
            var btnid = $(el).attr('bid');
            var remoteData = me.getPage().remoteData;
            if(btnid === "submit"){
                if(remoteData.baseInfo.base.status == 2){
                    return false;
                }
            }
            return true;
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
                    templateUrl : "/Public/mobile/app/pages/product_audit/product_baseinfo/view.html",
                    ctrljsUrl : "/Public/mobile/app/pages/product_audit/product_baseinfo/ctrl.js",   //js地址
                    csscodeUrl : "/Public/mobile/app/pages/product_audit/product_baseinfo/css.css",  //js地址
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
                    templateUrl : "/Public/mobile/app/pages/product_audit/product_addinfo/view.html",
                    ctrljsUrl : "/Public/mobile/app/pages/product_audit/product_addinfo/ctrl.js",   //js地址
                    csscodeUrl : "/Public/mobile/app/pages/product_audit/product_addinfo/css.css",  //js地址
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
                    templateUrl : "/Public/mobile/app/pages/product_audit/product_scoreinfo/view.html",
                    ctrljsUrl : "/Public/mobile/app/pages/product_audit/product_scoreinfo/ctrl.js",   //js地址
                    csscodeUrl : "/Public/mobile/app/pages/product_audit/product_scoreinfo/css.css",  //js地址
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
                    templateUrl : "/Public/mobile/app/pages/product_audit/product_scoreresultinfo/view.html",
                    ctrljsUrl : "/Public/mobile/app/pages/product_audit/product_scoreresultinfo/ctrl.js",   //js地址
                    csscodeUrl : "/Public/mobile/app/pages/product_audit/product_scoreresultinfo/css.css",  //js地址
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
                    templateUrl : "/Public/mobile/app/pages/product_audit/product_feeinfo/view.html",
                    ctrljsUrl : "/Public/mobile/app/pages/product_audit/product_feeinfo/ctrl.js",   //js地址
                    csscodeUrl : "/Public/mobile/app/pages/product_audit/product_feeinfo/css.css",  //js地址
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
                    templateUrl : "/Public/mobile/app/pages/product_audit/product_attachinfo/view.html",
                    ctrljsUrl : "/Public/mobile/app/pages/product_audit/product_attachinfo/ctrl.js",   //js地址
                    csscodeUrl : "/Public/mobile/app/pages/product_audit/product_attachinfo/css.css",  //js地址
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
                    templateUrl : "/Public/mobile/app/pages/product_audit/product_docinfo/view.html",
                    ctrljsUrl : "/Public/mobile/app/pages/product_audit/product_docinfo/ctrl.js",   //js地址
                    csscodeUrl : "/Public/mobile/app/pages/product_audit/product_docinfo/css.css",  //js地址
                    ctrls : ""
                },
                postData : {id:params.id},
                width : this.elWidth,
                height : this.elHeight
            });
        }
        ,
        __submit_product__ : function(b){
            var me=this;
            var params = me.__getParams( b );
            $M.Message.confirm('提示','确认通过该产品吗','submit',function(result){
                console.log(result);
                if(result==true){
                    $M.Ajaxs({
                        url:'/product/leaderPassProduct',
                        data:{product_id:params.id},
                    },function(data){
                        if(data.status>0){
                            $M.Message.alert('提示','操作成功','info');
                            App.backPrevPage();
                            me.getPage().fatherPage.reloadPage();
                        }else{
                            $M.Message.alert('提示',data.msg,'info');
                        }

                    });
                }
            });

        },
        __cancel_product__ : function(b){
            var me=this;
            var params = me.__getParams( b );

            $M.Message.prompt('提示','输入终止原因',function(value){
                //console.log(value);
                if(value!==false){
                    $M.Ajaxs({
                        url:'/product/leaderCutoutProduct',
                        data:{product_id:params.id,reason:value},
                    },function(data){
                        if(data.status>0){
                            $M.Message.alert('提示','操作成功','info');
                            App.backPrevPage();
                            me.getPage().fatherPage.reloadPage();
                        }else{
                            $M.Message.alert('提示',data.msg,'info');
                        }
                    });
                }
            });

        },
        __reject_product__ : function(b){
            var me=this;
            var params = me.__getParams( b );

            $M.Message.prompt('提示','输入退回原因',function(value){
                //console.log(value);
                if(value!==false){
                    $M.Ajaxs({
                        url:'/product/leaderBackProduct',
                        data:{product_id:params.id,reason:value},
                    },function(data){
                        if(data.status>0){
                            $M.Message.alert('提示','操作成功','info');
                            App.backPrevPage();
                            me.getPage().fatherPage.reloadPage();
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