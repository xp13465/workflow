(function(){
    var ctrl = $M.ctrl.extend({
        init : function(){
            this._super.prototype.constructor.call(this,arguments);
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
                    templateUrl : "/Public/mobile/app/pages/product_platform/product_baseinfo/view.html",
                    ctrljsUrl : "/Public/mobile/app/pages/product_platform/product_baseinfo/ctrl.js",   //js地址
                    ctrls : ""
                },
                postData : {id:params.id},
                width : this.elWidth,
                height : this.elHeight
            });
        },
        __reject_user__ : function(b){
            var me=this;
            var params = me.__getParams( b );
            $M.Message.confirm('提示','确定拒绝吗？','submit',function(result){
                console.log(result);
                if(result==true){
                    $M.Ajaxs({
                        url:'/user/changeUser',
                        data:{id:params.id,status:2},
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
        __assign_role__ : function( b ){

            var me = this;
            var params = me.__getParams( b );
            App.linkPage({
                loads : {
                    remotedataUrl : "/system/getAllUsedRoleByUid", //远程获取数据的url
                    templateUrl : "/Public/mobile/app/pages/user_check/assign_role/view.html",
                    ctrljsUrl : "/Public/mobile/app/pages/user_check/assign_role/ctrl.js",   //js地址
                    ctrls : ""
                },
                postData : {id:params.id},
                width : this.elWidth,
                height : this.elHeight
            });
        }

    });

    return new ctrl();
})();