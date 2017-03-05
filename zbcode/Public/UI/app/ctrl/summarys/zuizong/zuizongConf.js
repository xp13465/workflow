/**
 * Created by Administrator on 2015/12/7 0007.
 */
Ext.define('ui.ctrl.summarys.zuizong.zuizongConf', {
    extend: 'ui.extend.baseClass.baseConf',
    modelName : "系统参数设置",
    constructor: function(){
        this.callParent(arguments);
        var param = arguments[0];
        var ret = param || {};

        //在此配置此summary类型容器 的模块
        this.loadModelsList = this.loadModelsList || [];
        Ext.merge(this.loadModelsList ,[
            { name: '产品签单统计', iconCls: 'notebook-icon', module: 'role', group : '' , desc : "" , type : 1  , msgs : 0},
            { name: '权限分配', iconCls : 'process-table-icon',  module: 'role' , group : '' , desc : "" , type : 1 , msgs : 0},
            { name: '菜单节点分配', iconCls : 'process-table-icon',  module: 'node' , group : '' , desc : "" , type : 1 , msgs : 0}
        ]);

        Ext.apply(ret,this.getDefaultWinSize());
        Ext.apply(this,ret);
    }
});