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
            // var status=$(li).attr('status');
            // // var url=$(li).attr('url');
            // var me = this;

            // App.linkPage({
            //     loads : {
            //         remotedataUrl : '/product/productFeesCheckList', //远程获取数据的url
            //         templateUrl : "/Public/mobile/app/pages/product_feeaudit/product_list/view.html",
            //         ctrljsUrl : "/Public/mobile/app/pages/product_feeaudit/product_list/ctrl.js",   //js地址
            //         csscodeUrl : "/Public/mobile/app/pages/product_feeaudit/product_list/css.css",  //js地址
            //         ctrls : ""
            //     },
            //     postData : {status:status},
            //     width : this.elWidth,
            //     height : this.elHeight
            // });

            var status= $(li).attr('status');
            var me = this;
            var page = me.getPage();
            $M.Ajaxs({
                url : '/product/productFeesCheckList',
                data: { fee_status : status , page : 1 , limit : page.pageobj.limit },
            },function(data){
                var page = me.getPage();
                page.postData = { 'status':status };
                page.reloadPage(data);
                var index = $(li).parent('ul').find('li').index(li);
                $(page.getEl()).find('nav ul li').removeClass('cur').eq(index).addClass('cur');
            });

        },
        __view_details__ : function( b ){
            var me = this;
            var status=$(b).attr('status');
            var params = me.__getParams( b );
            App.linkPage({
                loads : {

                    remotedataUrl : "/product/getProductInfo", //远程获取数据的url
                    templateUrl : "/Public/mobile/app/pages/product_feeaudit/product_detail/view.html",
                    ctrljsUrl : "/Public/mobile/app/pages/product_feeaudit/product_detail/ctrl.js",   //js地址
                    csscodeUrl : "/Public/mobile/app/pages/product_feeaudit/product_detail/css.css",  //js地址
                    ctrls : ""
                },
                postData : {id:params.id,status:status},
                width : this.elWidth,
                height : this.elHeight,
                fatherPage : me.getPage() 
            });
        },

    });

    return new ctrl();
})();