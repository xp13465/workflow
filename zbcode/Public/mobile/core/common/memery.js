;(function(){
    $M = $M || {};

    var memery = Class.extend({
        init : function(){
            this.version = "1.0.0";
        },
        set    : function(key , data){
            var me = this;
            if(!!!key){
                key = me.getNewKey();
            }
            me[key] = data;

            return key;
        },

        get : function(key){
            return this[key];
        },

        getNewKey : function(){
            var me = this;
            var srand = parseInt(Math.random()*(100000-1+1) + 1);
            srand = "Memery_" + srand;

            while (!!!me[srand]){
                var srand = parseInt(Math.random()*(100000-1+1) + 1);
                srand = "Memery_" + srand;
            }
            return srand;
        }
    });

    $M.Memery = new memery(); //单例
})();