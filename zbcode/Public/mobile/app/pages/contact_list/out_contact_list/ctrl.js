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
                    templateUrl : "/Public/mobile/app/pages/product_shortcut/product_list/view.html",
                    ctrljsUrl : "/Public/mobile/app/pages/product_shortcut/product_list/ctrl.js",   //js地址
                    ctrls : ""
                },
                postData : {status:status},
                width : this.elWidth,
                height : this.elHeight
            });

        },
        __click_in_contact__ : function( b ){
            var me = this;
            var params = me.__getParams( b );
            App.linkPage({
                loads : {

                    remotedataUrl : "/user/getUserList", //远程获取数据的url
                    templateUrl : "/Public/mobile/app/pages/contact_list/in_contact_list/view.html",
                    ctrljsUrl : "/Public/mobile/app/pages/contact_list/in_contact_list/ctrl.js",   //js地址
                    ctrls : ""
                },
                postData : {id:params.id},
                width : this.elWidth,
                height : this.elHeight
            });
        },

    });

    return new ctrl();
})();