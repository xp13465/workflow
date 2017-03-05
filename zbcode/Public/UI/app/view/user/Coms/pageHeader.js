/**
 * Created by Administrator on 2015/12/7 0007.
 */

Ext.define( 'ui.view.user.Coms.pageHeader', {
    extend: 'ui.extend.baseClass.coms.basePageHeader',
    region : 'north',
    alias: 'widget.userpageheader',
    bodyStyle : 'background:#F5F5F5;padding:10px;',
    baseCls : 'my-panel-no-border',
    html : '&nbsp;',
    height: 50,
    constructor : function(cfg){
        var param = cfg || {};
        Ext.apply(this,param);
        this.callParent(arguments);
    },

    init: function(){
    },

    initComponent : function(){
        this.items = this.ctrl.$getButtonListArray();
        this.callParent(arguments);
    }

});