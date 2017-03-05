/**
 * Created by Administrator on 2015/12/7 0007.
 */

Ext.define('ui.view.node.nodeView', {
    extend: 'ui.extend.baseClass.baseView',
    alias: 'widget.nodeviewpanel',
    layout  : 'border',
    requires : [
        'ui.view.node.Coms.pageHeader',
        'ui.view.node.Coms.pageCenter'
    ],

    constructor : function(cfg){
        this.callParent(arguments);
    },

    init: function(){
        this.callParent();
    },

    initComponent : function(){
        this.pageheader =  Ext.create('ui.view.node.Coms.pageHeader',{ctrl : this.ctrl});
        this.pagecenter =  Ext.create('ui.view.node.Coms.pageCenter',{ctrl : this.ctrl});
        this.items = [this.pageheader,this.pagecenter];
//此处指定form及grid等需要外围引用的组件 指针
        this.initFormGridC({
            formPanel : this.pagecenter.gridpanel.form,
            gridPanel: this.pagecenter.gridpanel.grid,
            store : this.pagecenter.gridpanel.store,
        });
        this.callParent(arguments);
    }
});