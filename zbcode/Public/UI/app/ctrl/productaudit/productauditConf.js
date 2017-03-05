/**
 * Created by Administrator on 2015/12/7 0007.
 * operationButtons : 操作按钮的定义
 * searchFileds     : 查询字段的定义
 * listOperationButtons : 条目操作按钮的定义
 */
Ext.define('ui.ctrl.productaudit.productauditConf',{
    extend: 'ui.extend.baseClass.baseConf',
    modelName : "产品审核区",
    topicalName : '产品审核区',
    modelCode : 'productaudit',
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
        'get.productaudit.list' : { url : "product/productWaitContractList" , 'pmsCode' : 'get.productaudit.list' , checkpms : 0 },
        //'set.productaudit.upload' : { url : "" , 'pmsCode' : 'set.productaudit.upload' , checkpms : 0 },
        'get.productaudit.edit' : { url : "system/saveproductaudit" , 'pmsCode' : 'set.productaudit.info' , checkpms : 0 },
        'set.productaudit.change' : { url : "product/productContractSubmit" , 'pmsCode' : 'set.productaudit.change' , checkpms : 0 },
        'get.productAddContract' :  { url : "product/productAddContract" , 'pmsCode' : 'set.productaudit.change' , checkpms : 0 },
        'get.getUserUploadContractList' :  { url : "product/getUserUploadContractList" , 'pmsCode' : 'set.productaudit.change' , checkpms : 0 },
        'get.delProductContract' :  { url : "product/delProductContract" , 'pmsCode' : 'set.productaudit.change' , checkpms : 0 }
    },

    _opButtons : [
       
    ],

    _lstOpButtons : [
        { 'permissionCode' : "contractupload.uploadcontract",checkpms:1 , text : '上传合同' , pmsCode : 'productaudit.upload' , recKey : ['id']/*所需record之关键字列表*/  , iconCls : ''},
        { 'permissionCode' : "contractupload.submit",checkpms:1 , text : '提交' , pmsCode : 'productaudit.change' , recKey : ['id','status']/*所需record之关键字列表*/  , iconCls : ''}
    ],

    _scFields : [
        {fieldLabel : '录入时间' ,editable:false,labelWidth : 80, name : 'add_time' , fieldtype : 'Ext.form.field.ComboBox',displayField	: 'display', valueField 	: "value", value : 1,
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
        { header: '法务意见',width: 220,   dataIndex: 'law_remark',renderer : function(v){
            return "<div title='"+v+"' style='word-break: break-all;word-wrap: break-word;'>"+v+"</div>"
        }} ,
        { header: '推荐人', width: 180,  dataIndex: 'creater' },
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
    _sub_win_defparams : { width:600 , height:480 },  //子窗口初始参数
    _viewInfo : [],
    _publicInfo : []
});