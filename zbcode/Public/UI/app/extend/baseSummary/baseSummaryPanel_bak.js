/**
 * Created by Administrator on 2015/12/18 0018.
 */

Ext.define('ui.extend.baseSummary.baseSummaryPanel', {
    extend: 'Ext.panel.Panel',

    constructor : function(cfg){
        var params = cfg || {};
        Ext.apply(this,params);
        this.callParent(arguments);
    },
    initComponent : function(){
        this.tabpanel = Ext.create('ui.extend.base.TabPanel',{

            xtype: 'app-main',
            tabPosition: 'left',
            titleRotation: 0,
            tabRotation: 0,
            tabBar: {
                flex: 1,
                style : 'padding:0px;border:0px;background:#404040;'
            },
            defaults: {
                bodyPadding: 20,
                tabConfig: {
                    responsiveConfig: {
                        wide: {
                            iconAlign: 'left',
                            textAlign: 'center',
                            bodyStyle : 'background:red;'
                        },
                        tall: {
                            iconAlign: 'top',
                            textAlign: 'center',
                            width:2000
                        }
                    }
                }
            },
            items: [{
                title : '角色管理',
                xtype : 'panel',
                border : 0,
                html : '角色管理页面'
            },{
                title : '用户管理',
                xtype : 'panel',
                border : 0,
                html : '用户管理页面'
            }]
        });
        this.items = [this.tabpanel];
        this.callParent();
    }
});