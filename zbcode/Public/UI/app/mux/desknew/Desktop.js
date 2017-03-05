/*!
 * Ext JS Library
 * Copyright(c) 2006-2014 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.define('ui.mux.desknew.Desktop', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.desknew',

    uses: [
        'Ext.util.MixedCollection',
        'Ext.menu.Menu',
        'Ext.view.View', // dataview
        'Ext.window.Window',

        'ui.mux.desknew.TaskBar',
        'ui.mux.desknew.DeskCenter'
    ],

    layout : 'border',
    border : false,
    bodyCls : "my-desktop-bodycls2",
    baseCls  : "uxnew-desktop",

    constructor : function (cfg){
        this.callParent(arguments);
    },

    initComponent: function (){
        var me = this;
        me.startBanner = new ui.mux.desknew.TaskBar(this.app);
        me.deskCenter = new ui.mux.desknew.DeskCenter(this.app);
        me.items = [me.deskCenter,me.startBanner];
        me.callParent();
    }
});
