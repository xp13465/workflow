/**
 * Created by Administrator on 2015/12/17 0017.
 */

Ext.define('ui.ctrl.summarys.productfeetable.productfeetableCtrl', {
    extend: 'ui.extend.baseClass.baseCtrl',
    uses : [
        'ui.ctrl.summarys.productfeetable.productfeetableConf',
        'ui.view.summarys.productfeetable.productfeetableView'
    ],
    constructor : function (cfg){
        this.modelConf = Ext.create('ui.ctrl.summarys.productfeetable.productfeetableConf');
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