(function(){
    var ctrl = $M.ctrl.extend({
        init : function(){
            this._super.prototype.constructor.call(this,arguments);
        },

        __gotoitem__ : function(li){
            var status= $(li).attr('status');
            var me = this;
            var page = me.getPage();
            $M.Ajaxs({
                url : '/product/productQuickList',
                data: { status : status , page : 1 , limit : page.pageobj.limit },
            },function(data){
                var page = me.getPage();
                page.postData = { 'status':status };
                page.reloadPage(data);
                $(li).addClass('cur');
            });
        },
        __view_details__ : function( b ){
            var me = this;
            var params = me.__getParams( b );

            var page = me.getPage();
            console.log(page)
            App.linkPage({
                loads : {
                    remotedataUrl : "/product/getProductInfo", //远程获取数据的url
                    templateUrl : "/Public/mobile/app/pages/product_shortcut/product_detail/view.html",
                    ctrljsUrl : "/Public/mobile/app/pages/product_shortcut/product_detail/ctrl.js",   //js地址
                    ctrls : ""
                } ,
                postData : { id:params.id },
                width : this.elWidth,
                height : this.elHeight
            });
        },

    });

    return new ctrl();
})();