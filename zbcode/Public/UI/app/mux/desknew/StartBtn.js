/**
 * Created by Administrator on 2015/12/4 0004.
 */
Ext.define('ui.mux.desknew.StartBtn', {
    extend: 'Ext.button.Button',
    uses: ["ui.mux.desknew.StartMenu"],

    alias: 'widget.startbtn',
    bodyCls : "my-startbtn-bodycls",
    text : '开始',
    border: 1 ,
    width:140,
    iconCls : 'my-startbtn-icon',
    //focusCls : "my-startbtn-focusCls",
    cls : "my-startbtn-cls my-no-transparent",
    style : "background:none;padding:10px;line-height:35px;",
    overCls : "my-startbtn-hover",//当鼠标经过时的样式
    menuActiveCls : "", //当按钮菜单激活时的样式class
    startBtnText: '开始工作',

    initComponent: function (){
        var me =  this;
        me.text = me.startBtnText;
        var menu = new ui.mux.desknew.StartMenu();
        me.menu = menu;

        me.callParent();
    }
});