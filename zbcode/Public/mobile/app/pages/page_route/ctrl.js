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
            if(loads){
                App.linkPage({
                    loads : loads
                });
            }else{
                alert("找不到模块配置:" + param.module);
            }
        }
       

    });

    return new ctrl();
})();