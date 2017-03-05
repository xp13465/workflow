/**
 * Created by Administrator on 2015/12/7 0007.
 */
Ext.define('ui.extend.baseClass.baseWindow', {
    extend: 'Ext.window.Window',
    constrainHeader: false,
    constrain: false,
    constructor : function(cfg){
        var params = cfg || {};
        Ext.apply(this,params);
        Ext.apply(this , {layout : 'fit' , border:1});     //params.modelConf.initwindowparams);
        this.callParent(arguments);

        this.on('render',function(){
            if(this.btnTo && startCommone){
                this.animCollapse = true;
                this.animateTarget = this.btnTo.btnEl;

                this.on('activate',function(){
                    this.btnTo.active();
                })
                this.on('deactivate',function(){
                    this.btnTo.deactive();
                })
            }

            if(this.minimizable){
                this.on('minimize',function(){
                    if(this.btnTo && startCommone){
                        this.btnTo.toggle();
                    }else{
                        this.hide();
                    }
                })
            }
        });
        this.on('close',function(){
            if(this.btnTo && startCommone){
                this.btnTo.close();
            }
        });
    },
    setTitle : function(title){
        this.callParent(arguments);
        if(this.btnTo){
            this.btnTo.setTitle(title);
        }
    }
});