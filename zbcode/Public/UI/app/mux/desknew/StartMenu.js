/**
 * Created by Administrator on 2015/12/4 0004.
 */

Ext.define('ui.mux.desknew.StartMenu', {
    extend: 'Ext.window.Window',
    uses: [
        "ui.mux.desknew.StartMenuLeftPanel",
        "ui.mux.desknew.StartMenuRightPanel",
        "ui.mux.desknew.StartMenuTopPanel"
    ],

    alias: 'widget.startmenu',
    width:350,
    height:500,
    bodyCls : "my-startmenu-bodycls",
    layout : "border",
    border : false,
    closable: false,
    frame: false,
    maximizable: false,
    resizable: false,
    plain: true,
    header : false,
    initComponent: function (){
        var me =  this;
        me.leftPanel = new ui.mux.desknew.StartMenuLeftPanel();
        me.rightPanel = new ui.mux.desknew.StartMenuRightPanel();
        me.topPanel = new ui.mux.desknew.StartMenuTopPanel();
        me.items = [me.leftPanel,me.rightPanel,me.topPanel];
        me.callParent();
    }
});


