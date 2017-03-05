/*!
 * Ext JS Library
 * Copyright(c) 2006-2014 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('ui.mux.desknew.TaskBar', {
    // This must be a toolbar. we rely on acquired toolbar classes and inherited toolbar methods for our
    // child items to instantiate and render correctly.
    extend: 'Ext.panel.Panel',
    uses: [
        "ui.mux.desknew.StartBtn"
    ],
    alias: 'widget.ntaskbar',
    height: 50,
    border : false,
    region : "south",
    constructor : function (app){
        this.app = app;

        this.callParent(arguments);
    },
    /**
     * @cfg {String} startBtnText
     * The text for the Start Button.
     **/
    initComponent: function (){
        var me =  this;
        Ext.apply(this, {
            border : 0,
            padding: 0,
            baseCls : '',
            html : "<div id='bottomCon'></div>"
        });
        me.callParent();

        me.on('render', function(){
            window.startCommone = new StartBar({Elid : 'bottomCon'});
        });
    }
});
