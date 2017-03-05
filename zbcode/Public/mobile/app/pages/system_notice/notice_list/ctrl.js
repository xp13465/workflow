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
            var remotedataUrl,templateUrl;
            //alert(status);
            switch (status){
                case '1':
                    remotedataUrl = "/Admin/Message/getPublicMessageList";
                    templateUrl = "/Public/mobile/app/pages/system_notice/notice_list/view_released_list.html";
                    break;
                case '2':
                    remotedataUrl = "/Admin/Message/getDraftPublicMessageList";
                    templateUrl = "/Public/mobile/app/pages/system_notice/notice_list/view_draft_list.html";
                    break;
                case '3':
                    remotedataUrl = "/Admin/Message/getCanceledPublicMessageList";
                    templateUrl = "/Public/mobile/app/pages/system_notice/notice_list/view_canceled_list.html";
                    break;
            }
            //alert(remotedataUrl);
              App.linkPage({
                loads : {
                    remotedataUrl : remotedataUrl, //远程获取数据的url
                    templateUrl : templateUrl,
                    ctrljsUrl : "/Public/mobile/app/pages/system_notice/notice_list/ctrl.js",   //js地址
                    csscodeUrl : "/Public/mobile/app/pages/system_notice/notice_list/css.css",  //js地址
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
                    templateUrl : "/Public/mobile/app/pages/system_notice/notice_detail/view_released.html",
                    ctrljsUrl : "/Public/mobile/app/pages/system_notice/notice_detail/ctrl.js",   //js地址
                    csscodeUrl : "/Public/mobile/app/pages/system_notice/notice_detail/css.css",  //js地址
                    ctrls : ""
                },
                postData : {id : params.id},
                width : this.elWidth,
                height : this.elHeight,
                fatherPage : me.getPage()
            });
        },
        //查看公告
        __view_draft_details__ : function( b ){
            var me = this;
            var params = me.__getParams( b );
            App.linkPage({
                loads : {
                    remotedataUrl : "/Admin/Message/getPublicMessageInfo", //远程获取数据的url
                    templateUrl : "/Public/mobile/app/pages/system_notice/notice_detail/view_draft.html",
                    ctrljsUrl : "/Public/mobile/app/pages/system_notice/notice_detail/ctrl.js",   //js地址
                    csscodeUrl : "/Public/mobile/app/pages/system_notice/notice_detail/css.css",  //js地址
                    ctrls : ""
                },
                postData : {id : params.id},
                width : this.elWidth,
                height : this.elHeight,
                fatherPage : me.getPage()
            });
        },
        //查看公告
        __view_cancel_details__ : function( b ){
            var me = this;
            var params = me.__getParams( b );
            App.linkPage({
                loads : {
                    remotedataUrl : "/Admin/Message/getPublicMessageInfo", //远程获取数据的url
                    templateUrl : "/Public/mobile/app/pages/system_notice/notice_detail/view_canceled.html",
                    ctrljsUrl : "/Public/mobile/app/pages/system_notice/notice_detail/ctrl.js",   //js地址
                    csscodeUrl : "/Public/mobile/app/pages/system_notice/notice_detail/css.css",  //js地址
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