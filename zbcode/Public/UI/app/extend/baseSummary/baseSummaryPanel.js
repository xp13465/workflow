/**
 * Created by Administrator on 2015/12/18 0018.
 */

Ext.define('ui.extend.baseSummary.baseSummaryPanel', {
    extend: 'ui.extend.base.Panel',

    constructor : function(cfg){
        var me = this;
        var params = cfg || {};
        //console.log(cfg);
        Ext.apply(this,params);
        Ext.apply(this,{layout : 'border'});

        var htmlstr = this.ctrl.$getSummaryMenusHtml( this );

        this.leftPanel = Ext.create('ui.extend.base.Panel',{
            width:250,
            region:'west',
            title : '功能列表',
            border:0,
            minWidth : 160,
            split: true,
            collapsible: true,
            animCollapse: true,
            html : htmlstr
        });

        me.rightpanel = Ext.create('ui.extend.base.Panel',{
            region:'center',
            layout : 'fit',
            baseCls : '',
            border  : 0
        });

        this.callParent(arguments);

    },

    initComponent : function(){
        var me = this;

        me.leftPanel.on('render',me.ctrl.$initLeftMenuPanle , me.ctrl);  //指向作用域
        me.rightpanel.on('render',me.ctrl.$initRightPanle , me.ctrl);
        me.items = [me.leftPanel , me.rightpanel];

        me.callParent(arguments);

        me.ctrl.$view = me;
        me.on('render',function(){
            me.ctrl.$summaryLoadModule(0, me.ctrl);
        });

        setInterval( function(){
        } , 1000);
    }
});