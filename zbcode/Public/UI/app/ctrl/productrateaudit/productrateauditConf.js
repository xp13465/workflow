/**
 * Created by Administrator on 2015/12/7 0007.
 * operationButtons : 操作按钮的定义
 * searchFileds     : 查询字段的定义
 * listOperationButtons : 条目操作按钮的定义
 */
Ext.define('ui.ctrl.productrateaudit.productrateauditConf',{
    extend: 'ui.extend.baseClass.baseConf',
    modelName : "费率管理",
    topicalName : '费率管理',
    modelCode : 'productrateaudit',
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
        'get.productrateaudit.list' : { url : "product/productFeesCheckList" , 'pmsCode' : 'get.productrateaudit.list' , checkpms : 0 },
        'set.productrateaudit.approve' : { url : "product/passProductFees" , 'pmsCode' : 'set.productrateaudit.change' , checkpms : 0 },
        'set.productrateaudit.reject' : { url : "product/backProductFees" , 'pmsCode' : 'set.productrateaudit.change' , checkpms : 0 }
    },
    _opButtons : [
       
    ],
    _lstOpButtons : [
        { text : '查看' , pmsCode : 'productrateaudit.view' , recKey : ['id']/*所需record之关键字列表*/  , checkpms:1, iconCls : '','permissionCode' : "product.view"},
        { text : '同意' , pmsCode : 'productrateaudit.approve' , recKey : ['id']/*所需record之关键字列表*/  , checkpms:1 ,iconCls : '','permissionCode' : "rateothers.agree"},
        { text : '退回' , pmsCode : 'productrateaudit.reject' , recKey : ['id']/*所需record之关键字列表*/  , checkpms:1 ,iconCls : '','permissionCode' : "rateothers.reject"}
    ],
    _scFields : [
        {fieldLabel : '录入时间' ,labelWidth : 80,editable:false, name : 'add_time' , fieldtype : 'Ext.form.field.ComboBox',displayField	: 'display', valueField 	: "value", value : 0,
            store : new Ext.data.ArrayStore({
                fields	: 	['value', 'display'],
                data    :   [[0,'不限'],[1,'1周内'],[2,'1个月内'],[3,'3个月内'],[4,'3个月以上']],
            }), pmsCode:'' , checkpms:0   },
        {fieldLabel : '方案状态' ,labelWidth : 80,editable:false, name : 'fee_status' , fieldtype : 'Ext.form.field.ComboBox',displayField	: 'display', valueField 	: "value", value : 0,
            store : new Ext.data.ArrayStore({
                fields	: 	['value', 'display'],
                data	:	[[0,'不限'],[2,'已提交'],[4,'已通过']]
            }), pmsCode:'' , checkpms:0   },
        {fieldLabel : '关键字' ,labelWidth :80, name : 'keyword' , fieldtype : 'Ext.form.field.Text',
            emptyText:"(名称、简称)" ,value : "", pmsCode:'' , checkpms:0   } ,
         {text : '查询' ,iconCls : '', fieldtype : 'Ext.button.Button'  , submitBtn : true , clickFn : '$search', pmsCode:'' , checkpms:0 }
    ],

    /*
    * 配置信息面板里的按钮，并制定事件后缀： fnName
    * */
    _infoPanelButtons : {
        'all' : [],
        'view' : [],
        'edit' : [{text : '保存' , fnName : 'save'}],
        'add' : []
    },
    /*
     * grid数据列表的头部定义*/
    _listGridHeader : [
        { header: '序号',width: 80,  dataIndex: 'id' } ,
        { header: '产品全称',width: 100,   dataIndex: 'full_name'} ,
        { header: '产品简称', width: 160,  dataIndex: 'short_name' } ,
        { header: '推荐人', width: 180,  dataIndex: 'creater' },
        { header: '录入时间', width: 180,  dataIndex: 'add_time' },
        { header: '是否已同意', width: 90,  dataIndex: 'is_agree' , renderer : function(v){
            if(v == 1){
                return '<font color="green">已同意</font>';
            }else if(v == 0){
                return '未同意';
            }
            return v;
        }},
        { header: '方案状态', width: 180,  dataIndex: 'fee_status' , dataIndex: 'fee_status',renderer : function(v){
            if(v == 1){
                return '未提交';
            }else if(v == 2){
                return '已提交';
            }else if(v == 3){
                return '未通过';
            }else if(v == 4){
                return '已通过';
            }
            return v;
        }}
    ] ,
    //_addInfo : [],
    _sub_win_defparams : { width:600 , height:480 },  //子窗口初始参数
    _viewInfo : [],
    _publicInfo : [

    ]
});