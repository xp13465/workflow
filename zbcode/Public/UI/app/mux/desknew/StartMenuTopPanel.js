/**
 * Created by Administrator on 2015/12/5 0005.
 */
(function() {
    Ext.define('ui.mux.desknew.StartMenuTopPanel', {
        extend: 'Ext.panel.Panel',
        requires: [],

        alias: 'widget.startmenutoppanel',
        //bodyCls : "my-startmenu-cls my-transparent",
        height:30,
        layout : "border",
        region : 'north',
        border : false,
        baseCls: 'my-startmenu-panels',
        //shadow: false,
        plain: true,
        header : false,
        html : "战略研究员",
        initComponent: function (){
            var me =  this;
            me.callParent();
        }
    });
})();