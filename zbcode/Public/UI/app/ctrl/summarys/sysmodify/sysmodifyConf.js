/**
 * Created by Administrator on 2015/12/7 0007.
 */
Ext.define('ui.ctrl.summarys.sysmodify.sysmodifyConf', {
    extend: 'ui.extend.baseClass.baseConf',
    modelName : "系统参数设置",
    constructor: function(){
        this.callParent(arguments);
        var param = arguments[0];
        var ret = param || {};

        //在此配置此summary类型容器 的模块
        this.loadModelsList = this.loadModelsList || [];
        Ext.merge(this.loadModelsList ,[
        ]);

        Ext.apply(ret,this.getDefaultWinSize());
        Ext.apply(this,ret);
    }
});