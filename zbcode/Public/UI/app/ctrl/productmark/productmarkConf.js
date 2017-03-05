/**
 * Created by Administrator on 2015/12/7 0007.
 * operationButtons : 操作按钮的定义
 * searchFileds     : 查询字段的定义
 * listOperationButtons : 条目操作按钮的定义
 */
Ext.define('ui.ctrl.productmark.productmarkConf',{
    extend: 'ui.extend.baseClass.baseConf',
    modelName : "产品评分区",
    topicalName : '产品评分区',
    modelCode : 'productmark',
    groupCode : '',

    infoIconCls : {view:'',edti:'',score:''},
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
        'get.productmark.list' : { url : "product/productScoreList" , 'pmsCode' : 'get.productmark.list' , checkpms : 0 },
        'get.productmark.view' : { url : "system/getProductMarkInfo" , 'pmsCode' : 'get.productmark.info' , checkpms : 0 },
        'get.productmark.score' : { url : "product/getProductInfo" , 'pmsCode' : 'set.productmark.info' , checkpms : 0 },
        'get.productmark.scorepost' : { url : "product/saveProductScoreStatus" , 'pmsCode' : 'set.productmark.info' , checkpms : 0 },
        'get.productmark.backProductScore' : { url : "product/backProductScore" , 'pmsCode' : 'set.productmark.info' , checkpms : 0 }
    },

    _opButtons : [],

    _lstOpButtons : [
        { 'permissionCode' : "product.view",checkpms:1 , text : '查看' , pmsCode : 'productmark.view' , recKey : ['id']/*所需record之关键字列表*/  , iconCls : ''},
        { 'permissionCode' : "score.score",checkpms:1 , text : '评分' , pmsCode : 'productmark.score' , recKey : ['id','is_score']/*所需record之关键字列表*/   ,iconCls : ''},
        { 'permissionCode' : "score.reject",checkpms:1 , text : '退回' , pmsCode : 'productmark.reject' , recKey : ['id','is_score']/*所需record之关键字列表*/   ,iconCls : ''}
    ],

    _scFields : [
        {fieldLabel : '录入时间' ,labelWidth : 80, editable:false,name : 'add_time' , fieldtype : 'Ext.form.field.ComboBox',displayField	: 'display', valueField 	: "value", value : 0,
            store : new Ext.data.ArrayStore({
                fields	: 	['value', 'display'],
                data    :   [[0,'不限'],[1,'1周内'],[2,'1个月内'],[3,'3个月内'],[4,'3个月以上']]
            }), pmsCode:'' , checkpms:0   },
        {fieldLabel : '关键字' ,labelWidth :80, name : 'keyword' , fieldtype : 'Ext.form.field.Text',
            emptyText:"(名称、简称)" , value : "", pmsCode:'' , checkpms:0   } ,
         {text : '查询' ,iconCls : '', fieldtype : 'Ext.button.Button'  , submitBtn : true , clickFn : '$search', pmsCode:'' , checkpms:0 }
    ],

    /*
    * 配置信息面板里的按钮，并制定事件后缀： fnName
    * */
    _infoPanelButtons : {
        'score' : [{text : '评分提交' , fnName : 'save'}]
    },
    /*
     * grid数据列表的头部定义*/
    _listGridHeader : [
        { header: '序号',width: 80,  dataIndex: 'id' } ,
        { header: '产品全称',width: 100,   dataIndex: 'full_name'} ,
        { header: '产品简称', width: 160,  dataIndex: 'short_name' } ,
        { header: '推荐人', width: 180,  dataIndex: 'creater' },
        { header: '是否评', width: 180,  dataIndex: 'is_score' ,renderer:function(v){
            if(v == 1){
                return "<font color='#1571FA'>已评分</font>";
            }else if(v == 2){
                return '未评分';
            }
            return v;
        }},
        { header: '录入时间', width: 180,  dataIndex: 'add_time' },
        { header: '产品状态', width: 180,  dataIndex: 'status',renderer:function(v){
            if(v == 1){
                return '未完成';
            }else if(v == 2){
                return '待评分';
            }else if(v == 3){
                return '合同待上传';
            }else if(v == 4){
                return '合同待审核';
            }else if(v == 5){
                return '产品待审核';
            }else if(v == 6){
                return '销售中';
            }else if(v == 7){
                return '已过期';
            }else if(v == 8){
                return '被撤销';
            }else if(v == 9){
                return '被终止';
            }else if(v == 10){
                return '暂下架';
            }else if(v == 11){
                return '以下架';
            }
            return v;
        } }
    ] ,
    //_addInfo : [],
    _sub_win_defparams : { width : 750 , height : 500 },  //子窗口初始参数

    _viewInfo : [],

    _publicInfo : [
        {
            title : '评分表',
            myStamp : 'thePingfen',
            xtype : 'form',
            layout : 'column',
            padding : 10,
            autoScroll : true,
            items : []
        }
    ]
});