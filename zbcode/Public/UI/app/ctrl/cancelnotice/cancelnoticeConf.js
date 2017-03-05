/**
 * Created by Administrator on 2015/12/7 0007.
 * operationButtons : 操作按钮的定义
 * searchFileds     : 查询字段的定义
 * listOperationButtons : 条目操作按钮的定义
 */
Ext.define('ui.ctrl.cancelnotice.cancelnoticeConf',{
    extend: 'ui.extend.baseClass.baseConf',
    modelName : "已撤销",
    topicalName : '已撤销',
    modelCode : 'cancelnotice',
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
        'get.cancelnotice.list' : { url : "Message/getCanceledPublicMessageList" , 'pmsCode' : 'get.cancelnotice.list' , checkpms : 0 },
        'get.cancelnotice.view' : { url : "Message/getPublicMessageInfo" , 'pmsCode' : 'get.cancelnotice.info' , checkpms : 0 },
        'set.cancelnotice.back' : { url : "Message/restoreSenderPublicMessage" , 'pmsCode' : 'set.cancelnotice.back' , checkpms : 0 }
    },

    _opButtons : [
    ],

    _lstOpButtons : [
         { text : '查看' , pmsCode : 'cancelnotice.view' , recKey : ['id']/*所需record之关键字列表*/  , 'permissionCode' : "announcement.view", checkpms:1, iconCls : ''},
        { text : '还原' , pmsCode : 'cancelnotice.back' , recKey : ['id']/*所需record之关键字列表*/  , 'permissionCode' : "announcement.return" , checkpms:1, iconCls : ''}
        
    ],
    _scFields : [
         {fieldLabel : '撤销时间' ,labelWidth : 80, width:250,editable:false,name : 'add_time' , fieldtype : 'Ext.form.field.ComboBox',displayField   : 'display', valueField     : "value", value : 0,
            store : new Ext.data.ArrayStore({
                fields  :   ['value', 'display'],
                data    :   [[0,'不限'],[1,'1周内'],[2,'1个月内'],[3,'3个月内'],[4,'3个月以上']]
            }), pmsCode:'' , checkpms:0   },
        {fieldLabel : '' ,labelWidth : 50, name : 'title' , fieldtype : 'Ext.form.field.Text', pmsCode:'' , checkpms:0 ,width:230  },
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
    _sub_win_defparams : { width:800 , height:480 },  //子窗口初始参数
    /*
     * grid数据列表的头部定义*/
    _listGridHeader : [
        { header: '序号',width: 80,  dataIndex: 'id' } ,
        { header: '主题',width: 250,   dataIndex: 'title',flex:1} ,
        { header: '撤销时间', width: 170,  dataIndex: 'add_time' }
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
                height: 50,
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