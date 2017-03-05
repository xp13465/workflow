/**
 * Created by Administrator on 2015/12/5 0005.
 */
(function() {
    Ext.define('ui.mux.desknew.StartMenuRightPanel', {
        extend: 'Ext.panel.Panel',
        requires: [],

        alias: 'widget.startmenurightpanel',
        //bodyCls : "my-startmenu-cls my-transparent",
        width: 60,
        layout: "accordion",
        region: 'center',
        //border: false,
        //baseCls: 'my-startmenu-panels my-startmenu-panels-cen',
        //shadow: false,
        plain: true,
        html : "centerpanel",
        initComponent: function () {
            var me = this;
            me.items = [
                {
                    xtype : 'panel',
                    title : '产品管理'
                },
                {
                    xtype : 'panel',
                    title : '系统管理'
                },
                {
                    xtype : 'panel',
                        title : '用户管理'
                }
            ];
            me.callParent();
        }
    });
})();