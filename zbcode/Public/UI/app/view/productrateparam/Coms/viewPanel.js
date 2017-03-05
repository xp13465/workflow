/**
 * Created by Administrator on 2015/12/24 0024.
 */

Ext.define( 'ui.view.productrateparam.Coms.viewPanel', {
    extend: 'ui.extend.baseClass.coms.baseBusTabPanel',
    alias: 'widget.productrateparamviewpanel',
    opType : 'view',
    opTitle : '查看',
    opIconCls : '',
    constructor : function(){
        this.callParent(arguments);
    },
    initComponent : function(){
        var me = this;
        me.formsList = [];
        me.ctrl.$assembleInfoPanel.call( me.ctrl , me , 'view' );

        this.callParent(arguments);

        for(var i=0 ; i<this.formsList.length; i++){
           this.addPanel(this.formsList[i]);
        }

    }
});