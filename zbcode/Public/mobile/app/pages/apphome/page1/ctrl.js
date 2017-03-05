(function(){
    var ctrl = $M.ctrl.extend({

        init : function(){
            this._super.prototype.constructor.call(this,arguments);
        },

        __click_deskmenu__:function(li){
            var me = this;
            var param = me.__getParams( li );

            var page = me.getPage();
            var remoteData = page.remoteData;
            var loads = $M.getLoadByModule( param.module );

            var node_child = remoteData[param.key]?remoteData[param.key].child:false;

            if(node_child){
                App.linkPage({
                    loads : {
                        remoteData : node_child, //远程获取数据的url
                        templateUrl : "/Public/mobile/app/pages/page_route/view.html",
                        ctrljsUrl : "/Public/mobile/app/pages/page_route/ctrl.js",
                        ctrls : ""
                    }
                });
            }else if(loads){
                App.linkPage({
                    loads : loads
                });
            }
        },

        __click_button__ : function( b ){
            var me = this;
            var params = me.__getParams( b );
            App.linkPage({
                loads : {
                    remotedataUrl : "/Public/mobile/app/pages/apphome/pagedemo/json.json", //远程获取数据的url
                    templateUrl : "/Public/mobile/app/pages/apphome/pagedemo/view.html",
                    ctrljsUrl : "/Public/mobile/app/pages/apphome/pagedemo/ctrl.js",
                    ctrls : ""
                },
                style : '',
                width : this.elWidth,
                height : this.elHeight
            });
        },

        __template__ : function( b ){
            var me = this;
            var params = me.__getParams( b );
            App.linkPage({
                loads : {
                    remotedataUrl : "/Public/mobile/app/pages/apphome/template/json.json", //远程获取数据的url
                    templateUrl : "/Public/mobile/app/pages/apphome/template/view.html",
                    ctrljsUrl : "/Public/mobile/app/pages/apphome/template/ctrl.js"
                },
                style : 'background:red;',
                width : this.elWidth,
                height : this.elHeight
            });
        },
		__click_product_recycle__ : function( b ){
            var me = this;
            var params = me.__getParams( b );
            App.linkPage({
                loads : {
                    remotedataUrl : "/product/productGetTrashList", //远程获取数据的url
                    templateUrl : "/Public/mobile/app/pages/product_recycle/product_list/view.html",
                    ctrljsUrl : "/Public/mobile/app/pages/product_recycle/product_list/ctrl.js"
                },
                style : 'background:#f3f3f3;',
                width : this.elWidth,
                height : this.elHeight
            });
        },
        __click_product_platform__ : function( b ){
            var me = this;
            var params = me.__getParams( b );
            App.linkPage({
                loads : {
                    remotedataUrl : "/product/productLeaderWorkList", //远程获取数据的url
                    templateUrl : "/Public/mobile/app/pages/product_platform/product_list/view.html",
                    ctrljsUrl : "/Public/mobile/app/pages/product_platform/product_list/ctrl.js"
                },
                style : 'background:#f3f3f3;',
                width : this.elWidth,
                height : this.elHeight
            });
        },
        __click_product_mark__ : function( b ){
            var me = this;
            var params = me.__getParams( b );
            App.linkPage({
                loads : {
                    remotedataUrl : "/product/productScoreList", //远程获取数据的url
                    templateUrl : "/Public/mobile/app/pages/product_mark/product_list/view.html",
                    ctrljsUrl : "/Public/mobile/app/pages/product_mark/product_list/ctrl.js"
                },
                style : 'background:#f3f3f3;',
                width : this.elWidth,
                height : this.elHeight
            });
        },
        __click_product_audit__ : function( b ){
            var me = this;
            var params = me.__getParams( b );
            App.linkPage({
                loads : {
                    remotedataUrl : "/product/productLeaderAuditList", //远程获取数据的url
                    templateUrl : "/Public/mobile/app/pages/product_audit/product_list/view.html",
                    ctrljsUrl : "/Public/mobile/app/pages/product_audit/product_list/ctrl.js"
                },
                style : 'background:#f3f3f3;',
                width : this.elWidth,
                height : this.elHeight
            });
        },
        __click_product_fee__ : function( b ){
            var me = this;
            var params = me.__getParams( b );
            App.linkPage({
                loads : {
                    remotedataUrl : "/product/productFeesList", //远程获取数据的url
                    templateUrl : "/Public/mobile/app/pages/product_fee/product_list/view.html",
                    ctrljsUrl : "/Public/mobile/app/pages/product_fee/product_list/ctrl.js",   //js地址
                    csscodeUrl : "/Public/mobile/app/pages/product_fee/product_list/css.css",  //js地址
                },
                style : 'background:#f3f3f3;',
                width : this.elWidth,
                height : this.elHeight
            });
        },
         __click_product_feeaudit__ : function( b ){
            var me = this;
            var params = me.__getParams( b );
            App.linkPage({
                loads : {
                    remotedataUrl : "/product/productFeesCheckList", //远程获取数据的url
                    templateUrl : "/Public/mobile/app/pages/product_feeaudit/product_list/view.html",
                    ctrljsUrl : "/Public/mobile/app/pages/product_feeaudit/product_list/ctrl.js"
                },
                style : 'background:#f3f3f3;',
                width : this.elWidth,
                height : this.elHeight
            });
        },
        __click_product_shortcut__ : function( b ){
            var me = this;
            var params = me.__getParams( b );
            App.linkPage({
                loads : {
                    remotedataUrl : "/product/productQuickList", //远程获取数据的url
                    templateUrl : "/Public/mobile/app/pages/product_shortcut/product_list/view.html",
                    ctrljsUrl : "/Public/mobile/app/pages/product_shortcut/product_list/ctrl.js"
                },
                style : 'background:#f3f3f3;',
                width : this.elWidth,
                height : this.elHeight
            });
        },
        __click_user_message__ : function( b ){
            var me = this;
            var params = me.__getParams( b );
            App.linkPage({
                loads : {
                    remotedataUrl : "/Admin/Message/getPublicMessageList", //远程获取数据的url
                    //remotedataUrl : "/Admin/Message/getUserMessageList", //远程获取数据的url
                    templateUrl : "/Public/mobile/app/pages/user_message/user_message_list/view.html",
                    ctrljsUrl : "/Public/mobile/app/pages/user_message/user_message_list/ctrl.js"
                },
                style : 'background:#f3f3f3;',
                width : this.elWidth,
                height : this.elHeight
            });
        },
        __click_system_notice__ : function( b ){
            var me = this;
            var params = me.__getParams( b );
            App.linkPage({
                loads : {
                    remotedataUrl : "/Admin/Message/getReleasedPublicMessageList", //远程获取数据的url
                    //remotedataUrl : "/Admin/Message/getUserMessageList", //远程获取数据的url
                    templateUrl : "/Public/mobile/app/pages/system_notice/notice_list/view_released_list.html",
                    ctrljsUrl : "/Public/mobile/app/pages/system_notice/notice_list/ctrl.js"
                },
                style : 'background:#f3f3f3;',
                width : this.elWidth,
                height : this.elHeight
            });
        },
        __click_contact__ : function( b ){
            var me = this;
            var params = me.__getParams( b );
            App.linkPage({
                loads : {
                    remotedataUrl : "/user/getUserList", //远程获取数据的url
                    templateUrl : "/Public/mobile/app/pages/contact_list/in_contact_list/view.html",
                    ctrljsUrl : "/Public/mobile/app/pages/contact_list/in_contact_list/ctrl.js"
                },
                style : 'background:#f3f3f3;',
                width : this.elWidth,
                height : this.elHeight
            });
        },
        __click_user_check__ : function( b ){

            var me = this;
            App.linkPage({
                loads : {
                    remotedataUrl : "/user/getRegisterUserList", //远程获取数据的url
                    templateUrl : "/Public/mobile/app/pages/user_check/user_list/view.html",
                    ctrljsUrl : "/Public/mobile/app/pages/user_check/user_list/ctrl.js"
                },
                style : 'background:#f3f3f3;',
                width : this.elWidth,
                height : this.elHeight
            });
        },
        __click_product_online__ : function( b ){
            var me = this;
            var params = me.__getParams( b );
            App.linkPage({
                loads : {
                    remotedataUrl : "/product/productOnlineList", //远程获取数据的url
                    templateUrl : "/Public/mobile/app/pages/product_online/product_list/view.html",
                    ctrljsUrl : "/Public/mobile/app/pages/product_online/product_list/ctrl.js"
                },
                style : 'background:#f3f3f3;',
                width : this.elWidth,
                height : this.elHeight
            });
        }
    });

    return new ctrl();
})()