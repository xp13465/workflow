(function(){
    var ctrl = $M.ctrl.extend({
        init : function(){
            this._super.prototype.constructor.call(this,arguments);
        },

        __attaview__ : function(li){
            var param = this.__getParams(li);
            App.linkPage({
                loads : {
                    remoteData : param,
                    templateUrl : "/Public/mobile/app/pages/img_view/view.html",
                    ctrljsUrl : "/Public/mobile/app/pages/img_view/ctrl.js"
                }
            });
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
        }
       

    });

    return new ctrl();
})();