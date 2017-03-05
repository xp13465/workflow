/**
 * Created by Administrator on 2015/12/7 0007.
 * operationButtons : 操作按钮的定义
 * searchFileds     : 查询字段的定义
 * listOperationButtons : 条目操作按钮的定义
 */
Ext.define('ui.ctrl.addressbook.addressbookConf',{
    extend: 'ui.extend.baseClass.baseConf',
    modelName : "通讯录",
    topicalName : '通讯录',
    modelCode : 'addressbook',
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
        'get.addressbook.list' : { url : "user/getUserList" , 'pmsCode' : 'get.addressbook.list' , checkpms : 0 },
        'get.addressbook.view' : { url : "system/getaddressbookInfo" , 'pmsCode' : 'get.addressbook.info' , checkpms : 0 },
        'get.addressbook.edit' : { url : "system/saveaddressbook" , 'pmsCode' : 'set.addressbook.info' , checkpms : 0 }
    },
    _opButtons : [
    ],
    _lstOpButtons : [

    ],
    _scFields : [
        {fieldLabel : '一级部门' ,labelWidth : 70, editable:false,name : 'add_time' , fieldtype : 'Ext.form.field.ComboBox',displayField	: 'display', valueField 	: "value", value : 1,
            store : new Ext.data.ArrayStore({
                fields	: 	['value', 'display'],
                data	:	[[1,'全部'],[2,'战略发展部']]
            }), pmsCode:'' , checkpms:0   },
        {fieldLabel : '关键字' ,labelWidth : 70, name : 'name' , fieldtype : 'Ext.form.field.Text', pmsCode:'' , checkpms:0,emptyText:"(姓名或邮箱)"},
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
    /*
     * grid数据列表的头部定义*/
    _listGridHeader : [
        { header: '序号',width: 80,  dataIndex: 'id' } ,
        { header: '姓名',width: 100,   dataIndex: 'realname'} ,
        { header: '邮箱', width: 160,  dataIndex: 'email' } ,
        { header: '二级部门', width: 180,  dataIndex: 'subdepartmentname' },
        { header: '担任职位', width: 180,  dataIndex: 'position_name' }
    ] ,
    //_addInfo : [],
    _viewInfo : [],
    _publicInfo : [

    ]
});