/**
 * Created by Administrator on 2015/12/7 0007.
 * operationButtons : 操作按钮的定义
 * searchFileds     : 查询字段的定义
 * listOperationButtons : 条目操作按钮的定义
 */

Ext.define('ui.ctrl.workplatform.workplatformConf',{
    extend: 'ui.extend.baseClass.baseConf',
    modelName : "产品",
    topicalName : '产品',
    modelCode : 'workplatform',
    groupCode : '',
    requires : [
        'ui.view.workplatform.Coms.extraFieldPanel'
    ],

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

        this.$extendConfigJson('permissionCheckList',this._permissionCheckList);
        //
        var param = arguments[0];
        var ret = param || {};
        Ext.apply(ret,this.getDefaultWinSize());
        Ext.apply(this,ret);
    },

    _urls : {  //productFirstSubmit
        'get.workplatform.list' : { url : "product/productWorkList" , 'pmsCode' : 'get.workplatform.list' , checkpms : 0 },
        'get.workplatform.view' : { url : "product/getProductInfo" , 'pmsCode' : 'get.workplatform.info' , checkpms : 0 },
        'get.workplatform.edit' : { url : "product/productEditInfo" , 'pmsCode' : 'set.workplatform.info' , checkpms : 0 },
        'get.workplatform.add' : { url : "product/productAddInfo" , 'pmsCode' : 'set.workplatform.info' , checkpms : 0 },
        'get.secondcategory' : { url : "Product/getSecondCategory" , 'pmsCode' : 'set.workplatform.info' , checkpms : 0 },
        'get.firstcategory' : { url : "Product/getFirstCategory" , 'pmsCode' : 'set.workplatform.info' , checkpms : 0 },
        'get.saveproductselffield' : { url : "Product/saveProductSelfField" , 'pmsCode' : 'set.workplatform.info' , checkpms : 0 },
        'get.getProductCategoryField' : { url : "Product/getProductCategoryField" , 'pmsCode' : 'set.workplatform.info' , checkpms : 0 },

        'get.delproductselffield' : { url : "Product/delProductSelfField" , 'pmsCode' : 'set.workplatform.info' , checkpms : 0 },
        'get.cexiaoproduct' : { url : "Product/productRevoke" , 'pmsCode' : 'set.workplatform.revoke' , checkpms : 0 },
        'get.submitproduct' : { url : "Product/productFirstSubmit" , 'pmsCode' : 'set.workplatform.revoke' , checkpms : 0 },
        'get.uploadproductatt' : { url : "Product/addProductAttachment" , 'pmsCode' : 'set.workplatform.revoke' , checkpms : 0 },
        'get.delProductAttachment' : { url : "Product/delProductAttachment" , 'pmsCode' : 'set.workplatform.revoke' , checkpms : 0 }
    },
    _permissionCheckList : [
        {'permissionCode' : "attachments.delete" , checkpms:1}
    ],
    _opButtons : [
    ],

    _lstOpButtons : [
        { text : '查看' , pmsCode : 'workplatform.view' , permissionCode : 'product.view', recKey : ['id']/*所需record之关键字列表*/  , checkpms:1, iconCls : ''},
        { text : '编辑' , pmsCode : 'workplatform.edit'  , permissionCode : 'product.edit', recKey : ['id']/*所需record之关键字列表*/  , checkpms:1 ,iconCls : ''},
        { text : '提交' , pmsCode : 'workplatform.submit'  , permissionCode : 'product.submit', recKey : ['id']/*所需record之关键字列表*/  , checkpms:1 ,iconCls : ''},
        { text : '撤销' , pmsCode : 'workplatform.cancel'  , permissionCode : 'product.cancel', recKey : ['id']/*所需record之关键字列表*/  , checkpms:1 ,iconCls : ''}
    ],

    _scFields : [
        {fieldLabel : '产品状态' ,labelWidth :80, name : 'status' , fieldtype : 'Ext.form.field.ComboBox',
            displayField	: 'display', valueField 	: "value", value : 0,
            editable:false,
            store : new Ext.data.ArrayStore({
                fields	: 	['value', 'display'],
                data	:	[[0,'不限'],[1,'未完成'],[2,'待评分'],[3,'合同待上传'],[4,'合同待审核'],[5,'产品待审核'],[6,'销售中'],[10,'暂下架']]
            }) , pmsCode:'' , checkpms:0   } ,
        {fieldLabel : '录入时间' ,labelWidth : 80, name : 'add_time' , fieldtype : 'Ext.form.field.ComboBox',
            displayField	: 'display', valueField 	: "value", value : 0,
            editable:false,
            store : new Ext.data.ArrayStore({
                fields	: 	['value', 'display'],
                data	:	[[0,'不限'],[1,'1周内'],[2,'1个月内'],[3,'3个月内'],[4,'3个月以上']]
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
        'edit' : [{text : '暂存数据' , fnName : 'save'}],
        'add' : [{text : '提交->编辑' , fnName : 'save'}]
    },
    /*
     * grid数据列表的头部定义*/
    _listGridHeader : [
        { header: '序号',width: 80,  dataIndex: 'id' } ,
        { header: '产品全称',width: 220,   dataIndex: 'full_name'} ,
        { header: '产品简称', width: 160,  dataIndex: 'short_name' } ,
        { header: '推荐人', width: 180,  dataIndex: 'creater' },
        { header: '录入时间', width: 180,  dataIndex: 'add_time' },
        { header: '产品状态', width: 180,  dataIndex: 'status',renderer : function(v){
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
    _sub_win_defparams : { width:800 , height:550 },  //子窗口初始参数

    _addInfo : [] ,

    _publicInfo : [
        {
            title : '基本信息',
            xtype : 'form',
            layout : 'column',
            padding : 10,
            autoScroll : true,
            myStamp : 'theForm',
            //collapsible:true,
            items :[
                {
                    fieldLabel : '产品全称',
                    labelWidth: 80,
                    name : 'full_name',
                    allowBlank :false,
                    blankText:"请输入产品全称",
                    margin: 6,
                    columnWidth :.5,
                    filedType : 'Text'
                },
                {
                    fieldLabel : '产品全称',
                    labelWidth: 80,
                    name : 'hidden_field',
                    margin: 6,
                    columnWidth :.5,
                    hidden : true,
                    filedType : 'Text'
                },{
                    fieldLabel : '产品简称',
                    labelWidth: 80,
                    name : 'short_name',
                    allowBlank :false,
                    blankText:"请输入产品简称",
                    columnWidth:.5,
                    margin: 6,
                    filedType : 'Text'
                },{
                    fieldLabel : '渠道费用%',
                    labelWidth: 80,
                    minValue : 0,
                    maxValue : 100,
                    allowBlank :false,
                    blankText:"请输入渠道费用",
                    name : 'channel_fee',
                    margin: 6,
                    columnWidth :.5,
                    filedType : 'Number'
                },{
                    fieldLabel : '联系人',
                    labelWidth: 80,
                    permissionCode : 'contact.view',
                    checkpms:1,
                    name : 'contacter',
                    allowBlank :false,
                    blankText:"请输入联系人",
                    columnWidth:.5,
                    margin: 6,
                    filedType : 'Text'
                },{
                    fieldLabel : '联系电话',
                    labelWidth: 80,
                    permissionCode : 'contact.view',
                    checkpms:1,
                    name : 'contact_tel',
                    columnWidth:.5,
                    allowBlank :false,
                    blankText:"请输入联系电话",
                    margin: 6,
                    filedType : 'Text'
                },{
                    fieldLabel : '推荐人',
                    labelWidth: 80,
                    name : 'creater',
                    columnWidth:.5,
                    margin: 6,
                    filedType : 'Text'
                },{
                    fieldLabel : '产品周期(天)',
                    labelWidth: 80,
                    name : 'term',
                    columnWidth:.5,
                    allowBlank :false,
                    blankText:"请输入产品周期",
                    margin: 6,
                    filedType : 'Number'
                },{
                    fieldLabel : '下架时间',
                    labelWidth: 80,
                    editable:false,
                    name : 'end_time',
                    columnWidth:.5,
                    format:'Y-m-d H:i:s',
                    allowBlank :false,
                    blankText:"请选择下架时间",
                    margin: 6,
                    filedType : 'DateTime',
                    minValue: new Date(new Date().valueOf() + 1 * 24 * 60 * 60 * 1000),
                },{
                    fieldLabel : '产品类型',
                    labelWidth: 80,
                    name : 'firstCateValue',
                    columnWidth:.3,
                    margin: 6,
                    editable:false ,
                    filedType : 'ComboBox' ,
                    displayField	: 'category_name' ,
                    valueField 	: "id" ,
                    value : 1,
                    listeners:"{{category_id_main_event}}",
                    store : "{{getfirstcategory_store}}"
                },{
                    fieldLabel : '',
                    name : 'category_id',
                    //id:'catgory_id',
                    columnWidth:.2,
                    margin: 6,
                    editable:false,
                    filedType : 'ComboBox',
                    displayField	: 'category_name',
                    valueField 	: "id",
                    listeners:"{{category_id_events}}",
                    store :"{{getcategory_id_store}}"
                },{
                    fieldLabel : '新增时间',
                    labelWidth: 80,
                    name : 'add_time',
                    columnWidth:.5,
                    margin: 6,
                    filedType : 'Text'
                },
                {comsType : 'ui.view.workplatform.Coms.extraFieldPanel'}
            ]
        },{
            title : '新增信息',
            xtype : 'form',
            myStamp : 'selfField',
            typeMode : ["view","edit",'pingfen'],
            layout : 'column',
            padding : 10,
            autoScroll : true,
            //collapsible:true,
            items :[]
        },{
            title : '评分表',
            xtype : 'form',
            myStamp : 'thePingfen',
            typeMode : ["view","edit",'pingfen'],
            layout : 'column',
            padding : 10,
            autoScroll : true,
            //collapsible:true,
            items :[]
        },{
            title : '附件资料',
            xtype : 'panel',
            myStamp : 'theFujianEdit',
            typeMode : ["view","edit",'pingfen'],
            layout : 'column',
            padding : 10,
            autoScroll : true,
            //collapsible:true,
            items :[]
        }
    ],

    getcategory_id_store : function(){
        var me = this;
        return new Ext.data.ArrayStore({
            fields	: 	['id', 'category_name'] ,
            proxy: Ext.create( 'ui.extend.base.Ajax',{
                url : me.urls.get('get.secondcategory').url //'../Product/getSecondCategory'
            }),
            listeners :{
                'beforeload' : function(store , operation, eOpts){
                    store.getProxy().extraParams = {'category_id' : store.firstCategoryid}
                }
            }
        })
    },

    getfirstcategory_store : function(){
        var me = this;
        return new Ext.data.ArrayStore({
            fields	: 	['id', 'category_name'],
            autoLoad : true,
            proxy : Ext.create('ui.extend.base.Ajax',{
                url : me.urls.get('get.firstcategory').url //'../Product/getFirstCategory'
            })
        });
    },

    category_id_main_event : function(){
        return {
        }
    },

    category_id_events : function(){
        var me = this;
        return {
        }
    },

    updateCategoryidList : function(field , params){
    }
});