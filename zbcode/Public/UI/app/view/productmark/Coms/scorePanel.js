/**
 * Created by Administrator on 2015/12/24 0024.
 */

Ext.define( 'ui.view.productmark.Coms.scorePanel', {
    extend: 'ui.extend.baseClass.coms.baseBusTabPanel',
    alias: 'widget.productmarkscorepanel',
    opType : 'score',
    opTitle : '评分',
    opIconCls : '',
    constructor : function(){
        this.callParent(arguments);
    },
    initComponent : function(){
        var me = this;
        me.formsList = [];
        me.ctrl.$assembleInfoPanel.call( me.ctrl , me , 'score' );

        this.callParent(arguments);

        for(var i=0 ; i<this.formsList.length; i++){
           this.addPanel(this.formsList[i]);
        }

    }
});