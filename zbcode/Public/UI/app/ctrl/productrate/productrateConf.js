/**
 * Created by Administrator on 2015/12/7 0007.
 * operationButtons : 操作按钮的定义
 * searchFileds     : 查询字段的定义
 * listOperationButtons : 条目操作按钮的定义
 */
Ext.define('ui.ctrl.productrate.productrateConf',{
    extend: 'ui.extend.baseClass.baseConf',
    modelName : "费率编辑",
    topicalName : '费率编辑',
    modelCode : 'productrate',
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
        'get.productrate.list' : { url : "product/productFeesList" , 'pmsCode' : 'get.productrate.list' , checkpms : 0 },
        'get.productrate.view' : { url : "product/productGetFeeFieldValue" , 'pmsCode' : 'get.productrate.info' , checkpms : 0 },
        'get.productrate.edit' : { url : "product/productGetFeeFieldValue" , 'pmsCode' : 'set.productrate.info' , checkpms : 0 },
        'set.productrate.save' : { url : "product/saveProductFeeValue" , 'pmsCode' : 'set.productrate.info' , checkpms : 0 }
    },

    _opButtons : [
    ],

    _lstOpButtons : [
        { 'permissionCode' : "product.view",checkpms:1 , text : '查看' , pmsCode : 'productrate.view' , recKey : ['id']/*所需record之关键字列表*/  , iconCls : ''},
        { 'permissionCode' : "rateoperation.edit",checkpms:1 , text : '编辑' , pmsCode : 'productrate.edit' , recKey : ['id']/*所需record之关键字列表*/  , iconCls : ''}
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
                data	:	[[0,'不限'],[1,'未提交'],[2,'已提交'],[3,'未通过'],[4,'已通过']]
            }), pmsCode:'' , checkpms:0   },
        {fieldLabel : '关键字' ,labelWidth :80, name : 'keyword' , fieldtype : 'Ext.form.field.Text',
            emptyText:"(名称、简称)" , value : "", pmsCode:'' , checkpms:0   } ,
         {text : '查询' ,iconCls : '', fieldtype : 'Ext.button.Button'  , submitBtn : true , clickFn : '$search', pmsCode:'' , checkpms:0 }
    ],

    /*
    * 配置信息面板里的按钮，并制定事件后缀： fnName
    * */
    _infoPanelButtons : {
        'all' : [],
        'view' : [],
        'edit' : [{text : '提交' , fnName : 'save' , myStamp : 'thesavebtn'}],
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
        {
            title : '费率方案',
            xtype : 'form',
            layout : 'column',
            padding : 10,
            autoScroll : true,
            myStamp : 'theForm',
            items : [{
                    labelWidth: 80,
                    baseCls : '',
                    margin: 6,
                    layout : 'column',
                    columnWidth :1,
                    filedType : 'Panel',
                    myStamp : 'thefeechannl',
                    items : [
                    ]
                },{
                    columnWidth:1,
                    filedType : 'Panel',
                    height:50,
                    border : 0,
                    html : "&nbsp;",
                    myStamp : 'thelabelpanel',
                    items :[{
                        xtype : 'label',
                        text : "[请填写/修改以下费率占比]",
                        columnWidth : 1,
                        labelWidth: 180,
                        myStamp : "thelabletip",
                        height: 50,
                        baseCls : 'lablelablename'
                    }]
                },{
                    labelWidth: 80,
                    baseCls : '',
                    margin: 6,
                    layout : 'column',
                    columnWidth:.5,
                    filedType : 'Panel',
                    myStamp : 'theinputfileds',
                    items : [
                    ]
                },{
                    labelWidth: 80,
                    margin: 6,
                    layout : 'column',
                    columnWidth:.5,
                    filedType : 'Panel',
                    myStamp : 'theoutputfileds',
                    items : [
                    ]
                }
            ]
        }
    ]
});