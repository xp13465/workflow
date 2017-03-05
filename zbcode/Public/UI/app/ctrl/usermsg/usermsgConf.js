/**
 * Created by Administrator on 2015/12/7 0007.
 */
Ext.define('ui.ctrl.usermsg.usermsgConf', {
    extend: 'ui.extend.baseClass.baseConf',
    modelName : "用户管理",
    constructor: function(){
        this.callParent(arguments);

        var screenWidth = window.screen.availWidth;
        var screenHeight = window.screen.availHeight;

        this.initwindowparams = {
        };
        var param = arguments[0];
        var ret = param || {};
        Ext.apply(ret,this.getDefaultWinSize());
        Ext.apply(ret,this.initwindowparams);
        Ext.apply(this,ret);
    }
});