/**
 * Created by Administrator on 2015/12/17 0017.
 */

Ext.define('ui.ctrl.summarys.usermessage.usermessageCtrl', {
    extend: 'ui.extend.baseClass.baseCtrl',
    uses : [
        'ui.ctrl.summarys.usermessage.usermessageConf',
        'ui.view.summarys.usermessage.usermessageView'
    ],
    views : [
        'ui.view.summarys.usermessage.usermessageView'
    ],
    constructor : function (cfg){
        this.modelConf = Ext.create('ui.ctrl.summarys.usermessage.usermessageConf');
        this.callParent(arguments);
    },

    init:function(){
        this.control({       //这里的this相当于这个控制层

        });

    },

    initComponent : function(){
        //this.
    }
});