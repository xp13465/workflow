/**
 * Created by Administrator on 2015/12/7 0007.
 * operationButtons : 操作按钮的定义
 * searchFileds     : 查询字段的定义
 * listOperationButtons : 条目操作按钮的定义
 */
Ext.define('ui.ctrl.addressbookout.addressbookoutConf',{
    extend: 'ui.extend.baseClass.baseConf',
    modelName : "通讯录",
    topicalName : '通讯录',
    modelCode : 'addressbookout',
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
        'get.addressbookout.list' : { url : "user/getProductCustomerList" , 'pmsCode' : 'get.addressbookout.list' , checkpms : 0 },
        'get.addressbookout.view' : { url : "system/getaddressbookoutInfo" , 'pmsCode' : 'get.addressbookout.info' , checkpms : 0 },
        'get.addressbookout.edit' : { url : "system/saveaddressbookout" , 'pmsCode' : 'set.addressbookout.info' , checkpms : 0 }
    },
    _opButtons : [
    ],
    _lstOpButtons : [

    ],
    _scFields : [
        {fieldLabel : '' ,labelWidth : 50, name : 'name' , fieldtype : 'Ext.form.field.Text', pmsCode:'' , checkpms:0   },
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
        { header: '产品全称',width: 100,   dataIndex: 'full_name'} ,
        { header: '产品简称', width: 160,  dataIndex: 'short_name' } ,
        { header: '联系人', width: 180,  dataIndex: 'contacter' },
        { header: '联系电话', width: 180,  dataIndex: 'contact_tel' }
    ] ,
    //_addInfo : [],
    _viewInfo : [],
    _publicInfo : [

    ]
});