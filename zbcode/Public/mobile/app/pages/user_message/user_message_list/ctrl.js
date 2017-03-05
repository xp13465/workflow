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
        //公告、事项列表切换
        __gotoitem__ : function(li){
            var status=$(li).attr('status');
            var me = this;
            var remotedataUrl = status == 1 ? "/Admin/Message/getPublicMessageList" : ( status == 2 ? "/Admin/Message/getUserMessageList" : "/Admin/Message/getPublicMessageList");
            var templateUrl = status == 1 ? "/Public/mobile/app/pages/user_message/user_message_list/view.html" : ( status == 2 ? "/Public/mobile/app/pages/user_message/user_message_list/view_user_message.html" : "/Public/mobile/app/pages/user_message/user_message_list/view.html");
            App.linkPage({
                loads : {
                    remotedataUrl : remotedataUrl, //远程获取数据的url
                    templateUrl : templateUrl,
                    ctrljsUrl : "/Public/mobile/app/pages/user_message/user_message_list/ctrl.js",   //js地址
                    csscodeUrl : "/Public/mobile/app/pages/user_message/user_message_list/css.css",  //js地址
                    ctrls : ""
                },
                //postData : {status:status},
                width : this.elWidth,
                height : this.elHeight
            });

        },
        //查看公告
        __view_details__ : function( b ){
            var me = this;
            var params = me.__getParams( b );
            App.linkPage({
                loads : {
                    remotedataUrl : "/Admin/Message/getPublicMessageInfo", //远程获取数据的url
                    templateUrl : "/Public/mobile/app/pages/user_message/user_message_detail/view.html",
                    ctrljsUrl : "/Public/mobile/app/pages/user_message/user_message_detail/ctrl.js",   //js地址
                    csscodeUrl : "/Public/mobile/app/pages/user_message/user_message_detail/css.css",  //js地址
                    ctrls : ""
                },
                postData : {id : params.id},
                width : this.elWidth,
                height : this.elHeight,
                fatherPage : me.getPage()
            });
        },
        //查看待办事项
        __view_message_details__ : function( b ){
            var me = this;
            var params = me.__getParams( b );
            App.linkPage({
                loads : {
                    remotedataUrl : "/Admin/Message/getUserMessageInfo", //远程获取数据的url
                    templateUrl : "/Public/mobile/app/pages/user_message/user_message_detail/view_message.html",
                    ctrljsUrl : "/Public/mobile/app/pages/user_message/user_message_detail/ctrl.js",   //js地址
                    csscodeUrl : "/Public/mobile/app/pages/user_message/user_message_detail/css.css",  //js地址
                    ctrls : ""
                },
                postData : {id : params.id},
                width : this.elWidth,
                height : this.elHeight,
                fatherPage : me.getPage()
            });
        },
    });

    return new ctrl();
})();