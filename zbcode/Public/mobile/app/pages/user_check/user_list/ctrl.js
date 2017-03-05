(function(){
    var ctrl = $M.ctrl.extend({
        init : function(){
            this._super.prototype.constructor.call(this,arguments);
        },

        __gotoitem__ : function(li){
            var status=$(li).attr('status');
            //alert(status);
            var me = this;

            App.linkPage({
                loads : {
                    remotedataUrl : "/product/productLeaderWorkList", //远程获取数据的url
                    templateUrl : "/Public/mobile/app/pages/product_platform/product_list/view.html",
                    ctrljsUrl : "/Public/mobile/app/pages/product_platform/product_list/ctrl.js",   //js地址
                    ctrls : ""
                },
                postData : {status:status},
                width : this.elWidth,
                height : this.elHeight
            });

        },
        __view_details__ : function( b ){

            var me = this;
            var params = me.__getParams( b );
            App.linkPage({
                loads : {

                    remotedataUrl : "/user/getUserInfoDetail", //远程获取数据的url
                    templateUrl : "/Public/mobile/app/pages/user_check/user_detail/view.html",
                    ctrljsUrl : "/Public/mobile/app/pages/user_check/user_detail/ctrl.js",   //js地址
                    ctrls : ""
                },
                postData : {id:params.id},
                width : this.elWidth,
                height : this.elHeight,
                fatherPage : me.getPage()
            });
        },

    });

    return new ctrl();
})();