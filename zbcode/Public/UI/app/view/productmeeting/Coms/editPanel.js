/**
 * Created by Administrator on 2015/12/24 0024.
 */
Ext.define( 'ui.view.productmeeting.Coms.editPanel', {
    extend: 'ui.extend.baseClass.coms.baseBusTabPanel',
    alias: 'widget.productmeetingviewpanel',
    opType : 'edit',
    opTitle : '编辑',
    opIconCls : '',
    constructor : function(){
        this.callParent(arguments);
    },
    initComponent : function(){
        var me = this;
        me.formsList = [];
        me.ctrl.$assembleInfoPanel.call( me.ctrl , me , 'edit' );

        this.callParent(arguments);

        for(var i=0 ; i<this.formsList.length; i++){
           this.addPanel(this.formsList[i]);
        }

    }
});