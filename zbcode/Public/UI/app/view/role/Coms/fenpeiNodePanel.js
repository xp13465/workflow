/**
 * Created by Administrator on 2015/12/24 0024.
 */
Ext.define( 'ui.view.role.Coms.fenpeiNodePanel', {
    extend: 'ui.extend.baseClass.coms.baseBusTabPanel',
    alias: 'widget.rolefenpeinodepanel',
    opType : 'fenpeinode',
    opTitle : '分配菜单',
    opIconCls : '',
    constructor : function(){
        this.callParent(arguments);
    },
    initComponent : function(){
        var me = this;
        me.formsList = [];
        me.ctrl.$assembleInfoPanel.call( me.ctrl , me , 'fenpeiNode');
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