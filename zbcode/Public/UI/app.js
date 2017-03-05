/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */
 
Ext.Loader.setConfig({enabled:true});
Ext.Loader.setPath({
	'Ext.ux':'/Public/UI/Ext/ux'
});
Ext.dirRecText = "/Public/UI/";
Ext.application({
    name: 'ui',
	appFolder: '/Public/UI/app',

    controllers : [
        "ui.ctrl.sysCtrl"
    ],
    //-------------------------------------------------------------------------
    // Most customizations should be made to Desktop.Application. If you need to
    // customize this file, doing so below this section reduces the likelihood
    // of merge conflicts when upgrading to new versions of Sencha Cmd.
    //-------------------------------------------------------------------------

    requires: [
        'ui.App'
    ],
    init: function() {
        var app = new ui.App();
    }
});


$$$ = function(){
    var me = this;
    this.domsArrList = [
        /*{id : 'id' , dom : dom , handler : fn , callback : fn }*/
    ];
    return function(obj){
        obj.handler();
    }
}();
