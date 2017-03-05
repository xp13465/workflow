/**
 * Ext JS Library
 * Copyright(c) 2006-2014 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 * @class Ext.ux.desktop.App
 */
Ext.define('ui.mux.desknew.App', {
    //extend: 'Ext.app.Controller',
    mixins: {
        observable: 'Ext.util.Observable'
    },
    requires: [
        'Ext.container.Viewport',
        'ui.mux.desknew.Desktop'
    ],

    constructor: function (config) {
        var me = this;

        me.mixins.observable.constructor.call(this, config);

        if (Ext.isReady) {
            Ext.Function.defer(me.init, 10, me);
        } else {
            Ext.onReady(me.init, me);
        }
    },

    init: function() {
        var me = this;

        if (me.useQuickTips) {
            Ext.QuickTips.init();
        }

        me.desktop = new ui.mux.desknew.Desktop(); //Ext.create('ui.mux.desknew.Desktop',me);
        me.desktop.app = me;
        me.viewport = new Ext.container.Viewport({
            layout: 'fit',
            items: [ me.desktop]
        });
        me.isReady = true;
    }
});
