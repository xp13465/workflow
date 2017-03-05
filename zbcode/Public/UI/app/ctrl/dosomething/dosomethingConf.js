/**
 * Created by Administrator on 2015/12/7 0007.
 * operationButtons : 操作按钮的定义
 * searchFileds     : 查询字段的定义
 * listOperationButtons : 条目操作按钮的定义
 */
Ext.define('ui.ctrl.dosomething.dosomethingConf',{
    extend: 'ui.extend.baseClass.baseConf',
    modelName : "待办事项",
    topicalName : '待办事项',
    modelCode : 'dosomething',
    groupCode : '',

    infoIconCls : {view:'',edti:'',add:''},
    init : function(){
        this.callParent(arguments);
    },

    constructor: function(){
        var me = this;
        this.callParent(arguments);

        this.urlslist = this.urlslist || {};
        this.$extendConfigJson('urlslist', this._urls);
        //模块的操作按钮
        this.$extendConfigArr('operationButtons',this._opButtons);
        //查询条件field设置
        this.$extendConfigArr('searchFileds',this._scFields);
        //条目操作按钮的定义
        this.$extendConfigArr('listOperationButtons',this._lstOpButtons);

        this.$extendConfigJson('infoPanelButtons',this._infoPanelButtons);
        //
        var param = arguments[0];
        var ret = param || {};
        Ext.apply(ret,this.getDefaultWinSize());
        Ext.apply(this,ret);
    },

    _urls : {
        'get.dosomething.list' : { url : "Message/getUserMessageList" , 'pmsCode' : 'get.dosomething.list' , checkpms : 0 },
        'get.dosomething.del' : { url : "Message/delUserMessage" , 'pmsCode' : 'get.dosomething.info' , checkpms : 0 },
        'get.dosomething.view' : { url : "Message/getUserMessageInfo" , 'pmsCode' : 'set.dosomething.info' , checkpms : 0 }
    },

    _opButtons : [],

    _lstOpButtons : [
        { text : '查看' , pmsCode : 'dosomething.view' , recKey : ['id']/*所需record之关键字列表*/   , 'permissionCode' : "dosomething.view" , checkpms:1, iconCls : ''},
        { text : '删除' , pmsCode : 'dosomething.del' , recKey : ['id']/*所需record之关键字列表*/  , 'permissionCode' : "dosomething.delete" , checkpms:1, iconCls : ''},
    ],

    _scFields : [
        {fieldLabel : '发送时间' ,editable:false,labelWidth : 80, name : 'add_time' , fieldtype : 'Ext.form.field.ComboBox',displayField    : 'display', valueField     : "value", value : 0,
            store : new Ext.data.ArrayStore({
                fields  :   ['value', 'display'],
                data    :   [[0,'不限'],[1,'1周内'],[2,'1个月内'],[3,'3个月内'],[4,'3个月以上']]
            }), pmsCode:'' , checkpms:0   },
        {fieldLabel : '' ,emptyText : "(关键字:名称，简称)" , labelWidth : 50, name : 'name' , fieldtype : 'Ext.form.field.Text', pmsCode:'' , checkpms:0   },
        {text : '查询' ,iconCls : '', fieldtype : 'Ext.button.Button'  , submitBtn : true , clickFn : '$search', pmsCode:'' , checkpms:0 }
    ],

    /*
    * 配置信息面板里的按钮，并制定事件后缀： fnName
    * */
    _infoPanelButtons : {
        'all' : [],
        'view' : [],
        'edit' : [],
        'add' : []
    },
    _sub_win_defparams : { width:700 , height:470 },  //子窗口初始参数
    /*
     * grid数据列表的头部定义*/
    _listGridHeader : [
        { header: '序号',width: 80,  dataIndex: 'id' } ,
        { header: '主题',width: 400,   dataIndex: 'title'} ,
        { header: '发送时间', width: 160,  dataIndex: 'add_time' } ,
        { header: '是否查看', width: 160,  dataIndex: 'is_view' ,renderer : function(v){
            if(v == 1){
                return '未查看';
            }else if(v == 2){
                return '已查看';
            }
            return v;
        } } 
    ] ,
    //_addInfo : [],
    _viewInfo : [{
            title : '详细信息',
            xtype : 'form',
            layout : 'border',
            myStamp : 'theMessage',
            padding : 10,
            autoScroll : true,
            items :[
                {
                    region : 'north',
                    myStamp : 'theField',
                    name : 'title',
                    height: 30,
                    border : 0,
                    filedType : 'Panel',
                    html : ''
                },
                {
                    region : 'center',
                    myStamp : 'theField',
                    name : 'content',
                    height: 30,
                    border : 0,
                    filedType : 'Panel',
                    html : ''
                }
            ]
        }],
    _publicInfo : [

    ]
});