/**
 * Created by Administrator on 2015/12/5 0005.
 */
(function(){
    Ext.define('ui.mux.desknew.StartMenuLeftPanel', {
        extend: 'Ext.panel.Panel',
        requires: [],

        alias: 'widget.startmenuleftpanel',
        //bodyCls : "my-startmenu-cls my-transparent",
        width:60,
        layout : "border",
        region : 'west',
        border : false,
        baseCls: 'my-startmenu-panels',
        plain: true,
        header : false,
        html : "leftpanel",
        initComponent: function (){
            var me =  this;
            me.callParent();
        }
    });
})()