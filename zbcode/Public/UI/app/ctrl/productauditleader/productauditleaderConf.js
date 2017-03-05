/**
 * Created by Administrator on 2015/12/7 0007.
 * operationButtons : 操作按钮的定义
 * searchFileds     : 查询字段的定义
 * listOperationButtons : 条目操作按钮的定义
 */
Ext.define('ui.ctrl.productauditleader.productauditleaderConf',{
    extend: 'ui.extend.baseClass.baseConf',
    modelName : "产品审核区",
    topicalName : '产品审核区',
    modelCode : 'productauditleader',
    groupCode : '',

    infoIconCls : {view:'',edti:'',add:''},
    init : function(){
        this.callParent(arguments);
    },

    __mainview_render : function(themainview){
        this.callParent(arguments);

        var opbuttons = this.buttonsArray || [];
        if(opbuttons.length ==0 ) themainview.getPageHeader().hide();
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
        'get.productauditleader.list' : { url : "product/productLeaderAuditList" , 'pmsCode' : 'get.productauditleader.list' , checkpms : 0 },
        'get.productauditleader.view' : { url : "system/getproductauditleaderInfo" , 'pmsCode' : 'get.productauditleader.info' , checkpms : 0 },
        'get.productauditleader.pass' : { url : "product/leaderPassProduct" , 'pmsCode' : 'set.productauditleader.change' , checkpms : 0 },
        'get.productauditleader.back' : { url : "product/leaderBackProduct" , 'pmsCode' : 'set.productauditleader.change' , checkpms : 0 },
        'get.productauditleader.stop' : { url : "product/leaderCutoutProduct" , 'pmsCode' : 'set.productauditleader.change' , checkpms : 0 }
    },
    _opButtons : [
       
    ],
    _lstOpButtons : [
        { 'permissionCode' : "product.view",checkpms:1 , text : '查看' , pmsCode : 'productauditleader.view' , recKey : ['id']/*所需record之关键字列表*/  , iconCls : ''},
        { 'permissionCode' : "productleader.pass",checkpms:1 , text : '通过' , pmsCode : 'productauditleader.approve' , recKey : ['id','status']/*所需record之关键字列表*/   ,iconCls : ''},
        { 'permissionCode' : "productleader.reject",checkpms:1 , text : '退回' , pmsCode : 'productauditleader.reject' , recKey : ['id','status']/*所需record之关键字列表*/   ,iconCls : ''},
        { 'permissionCode' : "productleader.terminate",checkpms:1 , text : '终止' , pmsCode : 'productauditleader.abort' , recKey : ['id','status']/*所需record之关键字列表*/   ,iconCls : ''}
    ],
    _scFields : [
        {fieldLabel : '录入时间' ,editable:false,labelWidth : 80, name : 'add_time' , fieldtype : 'Ext.form.field.ComboBox',displayField	: 'display', valueField 	: "value", value : 0,
            store : new Ext.data.ArrayStore({
                fields	: 	['value', 'display'],
                data    :   [[0,'不限'],[1,'1周内'],[2,'1个月内'],[3,'3个月内'],[4,'3个月以上']],
                
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
        { header: '推荐人', width: 180,  dataIndex: 'creater' },
        { header: '法务意见',width: 220,   dataIndex: 'law_remark',renderer : function(v){
            return "<div title='"+v+"' style='word-break: break-all;word-wrap: break-word;'>"+v+"</div>"
        }} ,
        { header: '录入时间', width: 180,  dataIndex: 'add_time' },
        { header: '产品状态', width: 180,  dataIndex: 'status' ,renderer:function(v){
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
        }}
    ] ,
    //_addInfo : [],
    _sub_win_defparams : { width:600 , height:480 },  //子窗口初始参数
    _viewInfo : [],
    _publicInfo : [
        // {
        //     title : '基本信息',
        //     xtype : 'form',
        //     layout : 'column',
        //     padding : 10,
        //     autoScroll : true,
        //     //collapsible:true,
        //     items :[
        //         {
        //             fieldLabel : '产品全称',
        //             labelWidth: 70,
        //             name : 'name',
        //             margin: 6,
        //             columnWidth :.5,
        //             filedType : 'Text'
        //         },{
        //             fieldLabel : '产品简称',
        //             labelWidth: 70,
        //             name : 'email',
        //             columnWidth:.5,
        //             margin: 6,
        //             filedType : 'Text'
        //         },{
        //             fieldLabel : '联系人',
        //             labelWidth: 70,
        //             name : 'email',
        //             columnWidth:.5,
        //             margin: 6,
        //             filedType : 'Text'
        //         },{
        //             fieldLabel : '联系电话',
        //             labelWidth: 70,
        //             name : 'email',
        //             columnWidth:.5,
        //             margin: 6,
        //             filedType : 'Text'
        //         },{
        //             fieldLabel : '推荐人',
        //             labelWidth: 70,
        //             name : 'email',
        //             columnWidth:.5,
        //             margin: 6,
        //             filedType : 'Text'
        //         },{
        //             fieldLabel : '下架时间',
        //             labelWidth: 70,
        //             name : 'email',
        //             columnWidth:.5,
        //             margin: 6,
        //             filedType : 'Text'
        //         },{
        //             fieldLabel : '产品类型',
        //             labelWidth: 70,
        //             name : 'organization',
        //             columnWidth:.5,
        //             margin: 6,
        //             filedType : 'ComboBox',
        //             displayField	: 'display',
        //             valueField 	: "value",
        //             value : 1,
        //             store : new Ext.data.ArrayStore({
        //                 fields	: 	['value', 'display'],
        //                 data	:	[[1,'基金']]
        //             })
        //         },{
        //             fieldLabel : '',
        //             name : 'firstdepartment',
        //             columnWidth:.5,
        //             margin: 6,
        //             filedType : 'ComboBox',
        //             displayField	: 'display',
        //             valueField 	: "value",
        //             value : 1,
        //             store : new Ext.data.ArrayStore({
        //                 fields	: 	['value', 'display'],
        //                 data	:	[[1,'股票']]
        //             })
        //         },{
        //             fieldLabel : '基金管理人',
        //             labelWidth: 70,
        //             name : 'email',
        //             columnWidth:.5,
        //             margin: 6,
        //             filedType : 'Text'
        //         },{
        //             fieldLabel : '基金托管人',
        //             labelWidth: 70,
        //             name : 'email',
        //             columnWidth:.5,
        //             margin: 6,
        //             filedType : 'Text'
        //         },{
        //             fieldLabel : '投资顾问',
        //             labelWidth: 70,
        //             name : 'email',
        //             columnWidth:.5,
        //             margin: 6,
        //             filedType : 'Text'
        //         },{
        //             fieldLabel : '基金规模',
        //             afterSubTpl:'万元',
        //             labelWidth: 70,
        //             name : 'email',
        //             columnWidth:.5,
        //             margin: 6,
        //             filedType : 'Text'
        //         },{
        //             fieldLabel : '渠道费用',
        //             labelWidth: 70,
        //             name : 'email',
        //             columnWidth:.5,
        //             margin: 6,
        //             filedType : 'Text'
        //         },{
        //             fieldLabel : '期限',
        //             labelWidth: 70,
        //             name : 'email',
        //             columnWidth:.5,
        //             margin: 6,
        //             filedType : 'Text'
        //         },{
        //             fieldLabel : '项目收益',
        //             labelWidth: 70,
        //             name : 'email',
        //             columnWidth:1,
        //             margin: 6,
        //             filedType : 'TextArea'
                    
        //         },{
        //             fieldLabel : '资金投向',
        //             labelWidth: 70,
        //             name : 'email',
        //             columnWidth:1,
        //             margin: 6,
        //             filedType : 'TextArea'
                    
        //         },{
        //             fieldLabel : '收益来源',
        //             labelWidth: 70,
        //             name : 'email',
        //             columnWidth:1,
        //             margin: 6,
        //             filedType : 'TextArea'
                    
        //         },{
        //             fieldLabel : '项目风控',
        //             labelWidth: 70,
        //             name : 'email',
        //             columnWidth:1,
        //             margin: 6,
        //             filedType : 'TextArea'
                    
        //         },{
        //             fieldLabel : '资金管理人简介',
        //             labelWidth: 70,
        //             name : 'email',
        //             columnWidth:1,
        //             margin: 6,
        //             filedType : 'TextArea'
                    
        //         },{
        //             fieldLabel : '投资顾问简介',
        //             labelWidth: 70,
        //             name : 'email',
        //             columnWidth:1,
        //             margin: 6,
        //             filedType : 'TextArea'
                    
        //         },{
        //             fieldLabel : '项目简介',
        //             labelWidth: 70,
        //             name : 'email',
        //             columnWidth:1,
        //             margin: 6,
        //             filedType : 'TextArea'
                    
        //         }
        //     ]
        // },{
        //     title : '评分表',
        //     xtype : 'form',
        //     layout : 'column',
        //     padding : 10,
        //     autoScroll : true,
        //     //collapsible:true,
        //     items :[
        //         // {
        //         //     fieldLabel : '收益率',
        //         //     labelWidth: 70,
        //         //     name : 'email',
        //         //     columnWidth:.5,
        //         //     margin: 6,
        //         //     filedType : 'Text'
        //         // },{
        //         //     fieldLabel : '担保',
        //         //     labelWidth: 70,
        //         //     name : 'email',
        //         //     columnWidth:.5,
        //         //     margin: 6,
        //         //     filedType : 'Text'
        //         // },{
        //         //     fieldLabel : '抵押比例',
        //         //     labelWidth: 70,
        //         //     name : 'email',
        //         //     columnWidth:.5,
        //         //     margin: 6,
        //         //     filedType : 'Text'
        //         // },{
        //         //     fieldLabel : '连带责任',
        //         //     labelWidth: 70,
        //         //     name : 'email',
        //         //     columnWidth:.5,
        //         //     margin: 6,
        //         //     filedType : 'Text'
        //         // },{
        //         //     fieldLabel : '产品规模',
        //         //     labelWidth: 70,
        //         //     name : 'email',
        //         //     columnWidth:.5,
        //         //     margin: 6,
        //         //     filedType : 'Text'
        //         // },{
        //         //     fieldLabel : '产品期限',
        //         //     labelWidth: 70,
        //         //     name : 'email',
        //         //     columnWidth:.5,
        //         //     margin: 6,
        //         //     filedType : 'Text'
        //         // },{
        //         //     fieldLabel : '总资产',
        //         //     labelWidth: 70,
        //         //     name : 'email',
        //         //     columnWidth:.5,
        //         //     margin: 6,
        //         //     filedType : 'Text'
        //         // },{
        //         //     fieldLabel : '业内排名',
        //         //     labelWidth: 70,
        //         //     name : 'email',
        //         //     columnWidth:.5,
        //         //     margin: 6,
        //         //     filedType : 'Text'
        //         // },{
        //         //     fieldLabel : '资产负债率',
        //         //     labelWidth: 70,
        //         //     name : 'email',
        //         //     columnWidth:.5,
        //         //     margin: 6,
        //         //     filedType : 'Text'
        //         // },{
        //         //     fieldLabel : '流动比率',
        //         //     labelWidth: 70,
        //         //     name : 'email',
        //         //     columnWidth:.5,
        //         //     margin: 6,
        //         //     filedType : 'Text'
        //         // },{
        //         //     fieldLabel : '现金流情况',
        //         //     labelWidth: 70,
        //         //     name : 'email',
        //         //     columnWidth:.5,
        //         //     margin: 6,
        //         //     filedType : 'Text'
        //         // },{
        //         //     fieldLabel : '速动比率',
        //         //     labelWidth: 70,
        //         //     name : 'email',
        //         //     columnWidth:.5,
        //         //     margin: 6,
        //         //     filedType : 'Text'
        //         // },{
        //         //     fieldLabel : '近期项目销售情况',
        //         //     labelWidth: 70,
        //         //     name : 'email',
        //         //     columnWidth:1,
        //         //     margin: 6,
        //         //     filedType : 'TextArea'
        //         // },{
        //         //     fieldLabel : '是否有不良记录和报道',
        //         //     labelWidth: 70,
        //         //     name : 'email',
        //         //     columnWidth:1,
        //         //     margin: 6,
        //         //     filedType : 'Text'
        //         // },{
        //         //     fieldLabel : '项目位置',
        //         //     labelWidth: 70,
        //         //     name : 'email',
        //         //     columnWidth:1,
        //         //     margin: 6,
        //         //     filedType : 'Text'
        //         // },{
        //         //     fieldLabel : '项目公司监管',
        //         //     labelWidth: 70,
        //         //     name : 'email',
        //         //     columnWidth:1,
        //         //     margin: 6,
        //         //     filedType : 'Text'
        //         // },{
        //         //     fieldLabel : '周边项目优势',
        //         //     labelWidth: 70,
        //         //     name : 'email',
        //         //     columnWidth:1,
        //         //     margin: 6,
        //         //     filedType : 'Text'
        //         // },{
        //         //     fieldLabel : '财政支持',
        //         //     labelWidth: 70,
        //         //     name : 'email',
        //         //     columnWidth:1,
        //         //     margin: 6,
        //         //     filedType : 'Text'
        //         // },{
        //         //     fieldLabel : '政策风险',
        //         //     labelWidth: 70,
        //         //     name : 'email',
        //         //     columnWidth:1,
        //         //     margin: 6,
        //         //     filedType : 'Text'
        //         // },{
        //         //     fieldLabel : '销售进度',
        //         //     labelWidth: 70,
        //         //     name : 'email',
        //         //     columnWidth:.5,
        //         //     margin: 6,
        //         //     filedType : 'Text'
        //         // },{
        //         //     fieldLabel : '还款项目规模/借款金额',
        //         //     labelWidth: 70,
        //         //     name : 'email',
        //         //     columnWidth:.5,
        //         //     margin: 6,
        //         //     filedType : 'Text'
        //         // }
                
        //     ]
        // }
    ]
});