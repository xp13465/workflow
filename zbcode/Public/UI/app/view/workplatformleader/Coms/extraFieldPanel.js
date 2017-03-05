/**
 * Created by Administrator on 2015/12/24 0024.
 */
Ext.define('ui.view.workplatformleader.Coms.extraFieldPanel', {
    extend: 'ui.extend.base.Panel',
    alias: 'widget.workplatformleaderextraFieldPanel',
    opTitle : '扩展字段',
    border : 0,
    myStamp : "theFieldPanel",
    layout : 'column',
    items : [],
    columnWidth:1,
    //html : "<a href='javascript:;'>收起</a>",
    constructor : function(){
        this.callParent(arguments);
    },

    listeners :{
        'render'  : function(){

        }
    },

    addField : function(field){
        if(!field) return;
        this.add(field);
        if(!this.isVisible()){
            this.isVisible(true);
        }
    },

    delField : function(field){
        if(!field) return;
        this.add(field);
        if(!this.isVisible()){
            this.isVisible(true);
        }
    }
});