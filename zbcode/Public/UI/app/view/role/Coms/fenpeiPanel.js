/**
 * Created by Administrator on 2015/12/24 0024.
 */
Ext.define( 'ui.view.role.Coms.fenpeiPanel', {
    extend: 'ui.extend.baseClass.coms.baseBusTabPanel',
    alias: 'widget.userviewpanel',
    opType : 'fenpei',
    opTitle : '分配权限',
    opIconCls : '',
    constructor : function(){
        this.callParent(arguments);
    },
    initComponent : function(){
        var me = this;
        me.formsList = [];
        me.ctrl.$assembleInfoPanel.call( me.ctrl , me , 'fenpei');
        this.callParent(arguments);
        for(var i=0 ; i<this.formsList.length; i++){
           this.addPanel(this.formsList[i]);
        }
        this.doLayout();
    },

    getGridByType : function(type){
        var forms = this.getFormsList();
    }
});