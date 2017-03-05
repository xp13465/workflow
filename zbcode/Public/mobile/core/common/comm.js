;(function(){
    $M = typeof($M)==='undefined'? {} : $M;

    $M.apply = function(object, config, defaults) {
        if (defaults) {
            $M.apply(object, defaults);
        }

        if (object && config && typeof config === 'object') {
            var i;

            for (i in config) {
                object[i] = config[i];
            }

        }

        return object;
    };

    $M.isDOM = ( typeof HTMLElement === 'object' ) ?
        function(obj){
            return obj instanceof HTMLElement;
        } :
        function(obj){
            return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
        };

    $M.isTypeOf = function(obj , type){
        return obj instanceof type;
    };

    $M.removeElement =function (_element){
        _element = $(_element).get(0);
        if(!!!_element) return;
        var _parentElement = _element.parentNode;
        if(_parentElement){
            _parentElement.removeChild(_element);
        }
    };


    $M.htmlDecode = function ( str ){
        var _str = str;
        if ( str.length == 0 ) return '';
        var codearr = [ ["&lt;" , "<"] , ["&gt;" , ">"] , ["&quot;" , '"'] , ["&amp;" , "&"] ];
        for(var i in codearr){
            _str = String(_str).replace(codearr[i][0] , codearr[i][1]);
        }
        return _str;
    }

    $M.app_history_obj = {
        initpage : -10,
        initpages	: function(){
            if(history && history.pushState){
                window.addEventListener('popstate',this);
                history.pushState({page: 0}, document.title, "#");
                history.pushState({page: 1}, document.title, "#");
            }
        },
        handleEvent : function(e){
            if(!!e.state){
                this.initpage = e.state.page;
            }
            if(!!e.state || e.state.page === 0){
                if(App.poppagesPanel.isActive()){
                    history.pushState({page: 1}, document.title, "#");
                }else{
                    $M.Message.confirm('提示','确认退出系统吗？','question',function(flag){
                        if(flag){
                            window.location = "/Common/loginOut";
                        }else{
                            history.pushState({page: 1}, document.title, "#");
                        }
                    });
                }
            }

            if(!e.state){
                return;
            }else{
                App.backPrevPage();
            }
        }
    }

    $M.getLoadByModule  = function(mod){
        var config = {
            //虏煤脝路脡脧禄谩脟酶
            'productmeeting' : {

            },
            'productaudittble' : {
                remotedataUrl : "/product/productLeaderAuditList", //脭露鲁脤禄帽脠隆脢媒戮脻碌脛url
                templateUrl : "/Public/mobile/app/pages/product_audit/product_list/view.html",
                ctrljsUrl : "/Public/mobile/app/pages/product_audit/product_list/ctrl.js"
            },
            'productrate' : {
                remotedataUrl : "/product/productFeesList", //脭露鲁脤禄帽脠隆脢媒戮脻碌脛url
                templateUrl : "/Public/mobile/app/pages/product_fee/product_list/view.html",
                ctrljsUrl : "/Public/mobile/app/pages/product_fee/product_list/ctrl.js",
            },
            'productrateaudit' : {
                remotedataUrl : "/product/productFeesCheckList", //杩滅▼鑾峰彇鏁版嵁鐨剈rl
                templateUrl : "/Public/mobile/app/pages/product_feeaudit/product_list/view.html",
                ctrljsUrl : "/Public/mobile/app/pages/product_feeaudit/product_list/ctrl.js"
            },
            'systemnotice' : {
                remotedataUrl : "/Admin/Message/getReleasedPublicMessageList", //脭露鲁脤禄帽脠隆脢媒戮脻碌脛url
                templateUrl : "/Public/mobile/app/pages/system_notice/notice_list/view_released_list.html",
                ctrljsUrl : "/Public/mobile/app/pages/system_notice/notice_list/ctrl.js"
            },
            'productmark' : {
                remotedataUrl : "/product/productScoreList", //脭露鲁脤禄帽脠隆脢媒戮脻碌脛url
                templateUrl : "/Public/mobile/app/pages/product_mark/product_list/view.html",
                ctrljsUrl : "/Public/mobile/app/pages/product_mark/product_list/ctrl.js"
            },
            'productonline' : {
                remotedataUrl : "/product/productOnlineList", //脭露鲁脤禄帽脠隆脢媒戮脻碌脛url
                templateUrl : "/Public/mobile/app/pages/product_online/product_list/view.html",
                ctrljsUrl : "/Public/mobile/app/pages/product_online/product_list/ctrl.js"
            },
            'addressbookall' : {
                remotedataUrl : "/user/getUserList", //脭露鲁脤禄帽脠隆脢媒戮脻碌脛url
                templateUrl : "/Public/mobile/app/pages/contact_list/in_contact_list/view.html",
                ctrljsUrl : "/Public/mobile/app/pages/contact_list/in_contact_list/ctrl.js"
            },
            'accountaudit' : {
                remotedataUrl : "/user/getRegisterUserList", //脭露鲁脤禄帽脠隆脢媒戮脻碌脛url
                templateUrl : "/Public/mobile/app/pages/user_check/user_list/view.html",
                ctrljsUrl : "/Public/mobile/app/pages/user_check/user_list/ctrl.js"
            },
            'productrecycle' : {
                remotedataUrl : "/product/productGetTrashList", //脭露鲁脤禄帽脠隆脢媒戮脻碌脛url
                templateUrl : "/Public/mobile/app/pages/product_recycle/product_list/view.html",
                ctrljsUrl : "/Public/mobile/app/pages/product_recycle/product_list/ctrl.js"
            },
            'workplatform' : {
                remotedataUrl : "/product/productWorkList", //脭露鲁脤禄帽脠隆脢媒戮脻碌脛url
                templateUrl : "/Public/mobile/app/pages/product_worktable/product_list/view.html",
                ctrljsUrl : "/Public/mobile/app/pages/product_worktable/product_list/ctrl.js"
            },
            'workplatformleader' : {
                remotedataUrl : "/product/productLeaderWorkList", //脭露鲁脤禄帽脠隆脢媒戮脻碌脛url
                templateUrl : "/Public/mobile/app/pages/product_platform/product_list/view.html",
                ctrljsUrl : "/Public/mobile/app/pages/product_platform/product_list/ctrl.js"
            },
            'productquick' : {
                remotedataUrl : "/product/productQuickList", //脭露鲁脤禄帽脠隆脢媒戮脻碌脛url
                templateUrl : "/Public/mobile/app/pages/product_shortcut/product_list/view.html",
                ctrljsUrl : "/Public/mobile/app/pages/product_shortcut/product_list/ctrl.js"
            },
            'usermessage' : {
                remotedataUrl : "/Admin/Message/getPublicMessageList", //脭露鲁脤禄帽脠隆脢媒戮脻碌脛url
                templateUrl : "/Public/mobile/app/pages/user_message/user_message_list/view.html",
                ctrljsUrl : "/Public/mobile/app/pages/user_message/user_message_list/ctrl.js"
            }


        }
        return (typeof(config[mod]) === 'undefined') ? false : config[mod];
    }

    $M.loadErrorTemp = function(el){
        var tmp = [
            '<div class="cry">',
            '<p class="tit clearfix">',
            '<img src="/Public/mobile/images/cry.png" alt="" >',
            '<i>SORRY!<br/>页面去火星了。</i></p>',
            '<div class="cen">',
            '<button>返回上一页</button>',
            '</div>',
            '</div>'
        ].join('');

        $(el).empty().append(tmp);
        $(el).find('button').on('tap',function(){
            App.backPrevPage();
        });
    }
    /*
     htmlEncode: function(value) {
     return (!value) ? value : String(value).replace(charToEntityRegex, htmlEncodeReplaceFn);
     },

     htmlDecode: function(value) {
     return (!value) ? value : String(value).replace(entityToCharRegex, htmlDecodeReplaceFn);
     },*/
})()