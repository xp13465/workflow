//==================================
Ext.define('ui.App', {
    extend: 'ui.mux.desknew.App',

    uses: [
        'Ext.window.MessageBox',
        'ui.ctrl.sysCtrl',
        'ui.conf.I18n',
        'ui.conf.sysConfig'
    ],

    ids : 'THEAPP',
    //appName : '资邦OAP',

    constructor : function(cfg){
        var me = this;
        this.app = this;

        this.confs = new ui.conf.sysConfig(me);
        this.i18n = new ui.conf.I18n(me);
        this.ctrls = new ui.ctrl.sysCtrl(me);

        this.callParent();
    }
    //
});