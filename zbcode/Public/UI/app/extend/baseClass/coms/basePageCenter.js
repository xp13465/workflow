/**
 * Created by Administrator on 2015/12/14 0014.
 */

Ext.define('ui.extend.baseClass.coms.basePageCenter', {
    extend: 'ui.extend.base.Panel',
    constructor : function(cfg){
        var param = cfg || {};
        Ext.apply(this,param);
        Ext.apply(this,{ border : 0});
        this.callParent(arguments);
    }
});