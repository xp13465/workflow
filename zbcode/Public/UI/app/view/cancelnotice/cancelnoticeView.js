/**
 * Created by Administrator on 2015/12/7 0007.
 */

Ext.define( 'ui.view.cancelnotice.cancelnoticeView', {
    extend: 'ui.extend.baseClass.baseView',
    alias: 'widget.cancelnoticeviewpanel',
    layout  : 'border',
    uses : [
        'ui.view.cancelnotice.Coms.pageHeader',
        'ui.view.cancelnotice.Coms.pageCenter'
    ],

    constructor : function(cfg){
        this.callParent(arguments);
    },

    init: function(){
        this.callParent();
    },

    initComponent : function(){
        this.pageheader =  Ext.create('ui.view.cancelnotice.Coms.pageHeader',{ctrl : this.ctrl});
        this.pagecenter =  Ext.create('ui.view.cancelnotice.Coms.pageCenter',{ctrl : this.ctrl});
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