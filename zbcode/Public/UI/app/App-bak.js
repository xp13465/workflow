/*!
 * Ext JS Library
 * Copyright(c) 2006-2014 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('ui.App', {
    extend: 'ui.mux.desktop.App',

    requires: [
        'Ext.window.MessageBox',
        'ui.mux.desktop.ShortcutModel',

        'ui.mux.desktop.old.SystemStatus',
        'ui.mux.desktop.old.VideoWindow',
        'ui.mux.desktop.old.GridWindow',
        'ui.mux.desktop.old.TabWindow',
        'ui.mux.desktop.old.AccordionWindow',
        'ui.mux.desktop.old.Notepad',
        'ui.mux.desktop.old.BogusMenuModule',
        'ui.mux.desktop.old.BogusModule',

//        'Desktop.Blockalanche',
        'ui.mux.desktop.old.Settings'
    ],

    init: function() {
        // custom logic before getXYZ methods get called...

        this.callParent();

        // now ready...
    },

    getModules : function(){
        return [
            new ui.mux.desktop.old.VideoWindow(),
            //new Desktop.Blockalanche(),
            new ui.mux.desktop.old.SystemStatus(),
            new ui.mux.desktop.old.GridWindow(),
            new ui.mux.desktop.old.TabWindow(),
            new ui.mux.desktop.old.AccordionWindow(),
            new ui.mux.desktop.old.Notepad(),
            new ui.mux.desktop.old.BogusMenuModule(),
            new ui.mux.desktop.old.BogusModule()
        ];
    },

    getDesktopConfig: function () {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            //cls: 'ux-desktop-black',

            contextMenuItems: [
                { text: 'Change Settings', handler: me.onSettings, scope: me }
            ],

            shortcuts: Ext.create('Ext.data.Store', {
                model: 'ui.mux.desktop.ShortcutModel',
                data: [
                    { name: 'Grid Window', iconCls: 'grid-shortcut', module: 'grid-win' },
                    { name: 'Accordion Window', iconCls: 'accordion-shortcut', module: 'acc-win' },
                    { name: 'Notepad', iconCls: 'notepad-shortcut', module: 'notepad' },
                    { name: 'System Status', iconCls: 'cpu-shortcut', module: 'systemstatus'}
                ]
            }),

            wallpaper: Ext.dirRecText + 'resources/images/wallpapers/Blue-Sencha.jpg',
            wallpaperStretch: false
        });
    },

    // config for the start menu
    getStartConfig : function() {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            title: 'Don Griffin',
            iconCls: 'user',
            height: 300,
            toolConfig: {
                width: 100,
                items: [
                    {
                        text:'Settings',
                        iconCls:'settings',
                        handler: me.onSettings,
                        scope: me
                    },
                    '-',
                    {
                        text:'Logout',
                        iconCls:'logout',
                        handler: me.onLogout,
                        scope: me
                    }
                ]
            }
        });
    },

    getTaskbarConfig: function () {
        var ret = this.callParent();

        return Ext.apply(ret, {
            quickStart: [
                { name: 'Accordion Window', iconCls: 'accordion', module: 'acc-win' },
                { name: 'Grid Window', iconCls: 'icon-grid', module: 'grid-win' }
            ],
            trayItems: [
                { xtype: 'trayclock', flex: 1 }
            ]
        });
    },

    onLogout: function () {
        Ext.Msg.confirm('Logout', 'Are you sure you want to logout?');
    },

    onSettings: function () {
        var dlg = new ui.mux.desktop.Settings({
            desktop: this.desktop
        });
        dlg.show();
    }
});
