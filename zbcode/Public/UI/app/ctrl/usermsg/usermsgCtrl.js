/**
 * Created by Administrator on 2015/12/7 0007.
 */
Ext.define('ui.ctrl.usermsg.usermsgCtrl', {
    extend: 'ui.extend.baseClass.baseCtrl',
    uses : [
        'ui.ctrl.usermsg.usermsgConf',
        'ui.view.usermsg.usermsgView'
    ],

    views : [
        'ui.view.usermsg.usermsgView'
    ],

    refs:[
        {ref:'usermsgWin' , selector:'usermsgwindow'}
    ],

    constructor : function (cfg){
        this.confs = Ext.create('ui.ctrl.usermsg.usermsgConf');
        this.callParent(arguments);
    },

    init:function(){
        this.control({      //这里的this相当于这个控制层

        });

    },
    initComponent : function(){
        //this.
    }

});