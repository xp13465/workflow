/**
 * Created by Administrator on 2015/12/7 0007.
 * operationButtons : 操作按钮的定义
 * searchFileds     : 查询字段的定义
 * listOperationButtons : 条目操作按钮的定义
 */
Ext.define('ui.ctrl.publishednotice.publishednoticeConf',{
    extend: 'ui.extend.baseClass.baseConf',
    modelName : "已发布",
    topicalName : '已发布',
    modelCode : 'publishednotice',
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
        'get.publishednotice.list' : { url : "Message/getReleasedPublicMessageList" , 'pmsCode' : 'get.publishednotice.list' , checkpms : 0 },
        'get.publishednotice.view' : { url : "Message/getPublicMessageInfo" , 'pmsCode' : 'get.publishednotice.getPublicMessageInfo' , checkpms : 0 },
        'set.publishednotice.cancel' : { url : "Message/revokeSenderPublicMessage" , 'pmsCode' : 'set.publishednotice.cancel' , checkpms : 0 },
        'set.publishednotice.edit' : { url : "Message/editPublicMessage " , 'pmsCode' : 'set.publishednotice.edut' , checkpms : 0 },
        'set.publishednotice.add' : { url : "Message/addPublicMessage" , 'pmsCode' : 'set.firstnotice.add' , checkpms : 0 }
    },
    _opButtons : [
        { text : '新增公告+' , pmsCode : 'publishednotice.add' ,recKey : ['id']  , checkpms:1,'permissionCode' : "announcement.add" }
    ],
    _lstOpButtons : [
        { text : '查看' , pmsCode : 'publishednotice.view' , recKey : ['id']/*所需record之关键字列表*/  ,'permissionCode' : "announcement.view" , checkpms:1, iconCls : ''},
        { text : '撤销' , pmsCode : 'publishednotice.cancel' , recKey : ['id']/*所需record之关键字列表*/  ,'permissionCode' : "announcement.cancel"  , checkpms:1, iconCls : ''},
        { text : '编辑' , pmsCode : 'publishednotice.edit' , recKey : ['id']/*所需record之关键字列表*/  ,'permissionCode' : "announcement.edit"  , checkpms:1, iconCls : ''}
    ],
    _scFields : [
         {fieldLabel : '发布时间' ,labelWidth : 80, width:250,editable:false,name : 'add_time' , fieldtype : 'Ext.form.field.ComboBox',displayField   : 'display', valueField     : "value", value : 0,
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
        'edit' : [{text : '保存' , fnName : 'save'}],
        'add' : [{text : '暂存' , fnName : 'draftsave'},{text : '发布' , fnName : 'save'}]
    },
    _sub_win_defparams : { width:800 , height:480 },  //子窗口初始参数
    /*
     * grid数据列表的头部定义*/
    _listGridHeader : [
        { header: '序号',width: 80,  dataIndex: 'id' } ,
        { header: '主题',width: 250,   dataIndex: 'title',flex:1} ,
        { header: '发布时间', width: 170,  dataIndex: 'add_time' }
    ] ,
    _addInfo : [{
        title : '基本信息',
        typeMode : ["view","edit","add"],
        xtype : 'form',
        layout : 'column',
        padding : 10,
        autoScroll : true,
        items :[
            {
                fieldLabel : '主题',
                labelWidth: 70,
                name : 'title',
                margin: 6,
                columnWidth :1,
                filedType : 'Text'
            },{
                fieldLabel : '公告来源',
                labelWidth: 70,
                name : 'source',
                allowBlank :false,
                blankText:"请输入公告来源",
                columnWidth :1,
                margin: 6,
                filedType : 'Text'
            },{
                fieldLabel : '正文',
                labelWidth: 70,
                name : 'content',
                allowBlank :false,
                blankText:"请输入公告正文",
                columnWidth :1,
                margin: 6,
                filedType : 'TextArea'
            },{
                fieldLabel : '是否定时',
                labelWidth: 70,
                name : 'content',
                allowBlank :false,
                blankText:"请输入公告正文",
                columnWidth :1,
                margin: 2,
                filedType : 'RadioGroup',
                items: [
                    { boxLabel: '是', name: 'is_clock', inputValue: '1' },
                    { boxLabel: '否', name: 'is_clock', inputValue: '0', checked: true}
                ]
            },
            {
                fieldLabel : '定时发布',
                labelWidth: 70,
                name : 'clock_time',
                columnWidth:1,
                format:'Y-m-d H:i:s',
                margin: 6,
                filedType : 'DateTime'
            },
            {
                fieldLabel : '状态',
                labelWidth: 70,
                name : 'status',
                margin: 6,
                columnWidth :1,
                hidden:true,
                filedType : 'Number'
            }
        ]
    }],
    _editInfo : [{
        title : '基本信息',
        typeMode : ["view","edit","add"],
        xtype : 'form',
        layout : 'column',
        padding : 10,
        autoScroll : true,
        items :[
            {
                fieldLabel : '公告ID',
                labelWidth: 70,
                name : 'id',
                margin: 6,
                columnWidth :1,
                hidden:true,
                filedType : 'Number'
            },
            {
                fieldLabel : '主题',
                labelWidth: 70,
                name : 'title',
                margin: 6,
                columnWidth :1,
                filedType : 'Text'
            },{
                fieldLabel : '公告来源',
                labelWidth: 70,
                name : 'source',
                allowBlank :false,
                blankText:"请输入公告来源",
                columnWidth :1,
                margin: 6,
                filedType : 'Text'
            },{
                fieldLabel : '正文',
                labelWidth: 70,
                name : 'content',
                allowBlank :false,
                blankText:"请输入公告正文",
                columnWidth :1,
                margin: 6,
                filedType : 'TextArea'
            },{
                fieldLabel : '是否定时',
                labelWidth: 70,
                allowBlank :false,
                blankText:"请输入公告正文",
                columnWidth :1,
                margin: 2,
                filedType : 'RadioGroup',
                items: [
                    { boxLabel: '是', name: 'is_clock', inputValue: 1 },
                    { boxLabel: '否', name: 'is_clock', inputValue: 0}
                ]
            },{
                fieldLabel : '定时发布',
                labelWidth: 70,
                name : 'clock_time',
                columnWidth:1,
                format:'Y-m-d H:i:s',
                margin: 6,
                filedType : 'DateTime'
            }

        ]
    }],
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