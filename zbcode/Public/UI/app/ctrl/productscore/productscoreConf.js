/**
 * Created by Administrator on 2015/12/7 0007.
 * operationButtons : 操作按钮的定义
 * searchFileds     : 查询字段的定义
 * listOperationButtons : 条目操作按钮的定义
 */

Ext.define('ui.ctrl.productscore.productscoreConf',{
    extend: 'ui.extend.baseClass.baseConf',
    modelName : "评分规则",
    topicalName : '评分规则',
    modelCode : 'productscore',
    groupCode : '',
    requires : [
        'ui.view.productscore.Coms.extraFieldPanel'
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
        //
        var param = arguments[0];
        var ret = param || {};
        Ext.apply(ret,this.getDefaultWinSize());
        Ext.apply(this,ret);
    },

    _urls : {  //productFirstSubmit   ParamScore
        'get.productscore.list' : { url : "ParamScore/getParamList" , 'pmsCode' : 'set.productrecycle.info' , checkpms : 0 },
        'get.addScoreGroup' : { url : "ParamScore/addScoreGroup" , 'pmsCode' : 'set.productType.changeNode' , checkpms : 0 },
        'get.delScoreGroup' : { url : "ParamScore/delScoreGroup" , 'pmsCode' : 'set.productType.changeNode' , checkpms : 0 },
        'get.ScoreGroupView' : { url : "ParamScore/getCategoryField" , 'pmsCode' : 'set.productType.changeNode' , checkpms : 0 },
        'get.delScoreField' : { url : "ParamScore/delScoreField" , 'pmsCode' : 'set.productType.changeNode' , checkpms : 0 },
        'get.editScoreField' : { url : "ParamScore/editScoreField" , 'pmsCode' : 'set.productType.changeNode' , checkpms : 0 },
        'get.addScoreField' : { url : "ParamScore/addScoreField" , 'pmsCode' : 'set.productType.changeNode' , checkpms : 0 }
    },

    _opButtons : [
        //{ text : '批量注销-' , pmsCode : 'productscore.cancel' , permissionCode : 'product.cancel' ,recKey : ['id']  , checkpms:1 }
    ],

    _lstOpButtons : [
        { text : '预览' , pmsCode : 'productscore.view' , permissionCode : 'product.view', recKey : ['id']/*所需record之关键字列表*/  , checkpms:1, iconCls : '','permissionCode' : "score.view"},
        { text : '编辑' , pmsCode : 'productscore.edit'  , permissionCode : 'product.edit', recKey : ['id']/*所需record之关键字列表*/  , checkpms:1 ,iconCls : '','permissionCode' : "score.score"},
        //{ text : '注销' , pmsCode : 'productscore.cancel'  , permissionCode : 'product.cancel', recKey : ['id']/*所需record之关键字列表*/  , checkpms:1 ,iconCls : '','permissionCode' : "score.reject"}
    ],

    _scFields : [
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
        'edit' : [{text : '预览' , fnName : 'view'}],
        'add' : [{text : '新建提交' , fnName : 'save'}]
    },
    /*
     * grid数据列表的头部定义*/
    _listGridHeader : [
        { header: '序号',width: 80,  dataIndex: 'id' } ,
        { header: '一级名称',width: 220,   dataIndex: 'firstcategory_name',flex:1} ,
        { header: '二级名称', width: 160,  dataIndex: 'category_name' }
    ] ,
    //_addInfo : [],
    _sub_win_defparams : { width:1000 , height:500 },  //子窗口初始参数

    _editInfo : [
        {
            title : '新增组+',
            xtype : 'form',
            layout : 'column',
            typeMode : ["edit"],
            padding : 10,
            autoScroll : true,
            myStamp : 'theAddGroup',
            html : "&nbsp;",
            items : []
        }
    ],

    _viewInfo : [
        {
            title : '评分组预览',
            xtype : 'form',
            layout : 'column',
            typeMode : ["view"],
            padding : 10,
            autoScroll : true,
            myStamp : 'theViewGroup',
            html : "&nbsp;",
            items : []
        }
    ],

    _publicInfo : [
    ],

    checkIscloseBtn : function(key , params , type){
        if(type === 'edit'){
            return true;
        }else {
            return false;
        }
    },

    getFirstCateStore : function(key , params , theform){
        var me = this;
        return new Ext.data.ArrayStore({
            fields	: 	['id', 'category_name'] ,
            proxy: Ext.create( 'ui.extend.base.Ajax',{
                url : me.urls.get('get.CateLeaveOne').url //'../Product/getSecondCategory'
            }),
            listeners :{
                'beforeload' : function(store , operation, eOpts){
                    store.getProxy().extraParams = {'category_id' : store.firstCategoryid}
                }
            }
        })
    },

    getSecondCateStore : function(key , params , theform){
        var me = this;
        return new Ext.data.ArrayStore({
            fields	: 	['id', 'category_name'] ,
            proxy: Ext.create( 'ui.extend.base.Ajax',{
                url : me.urls.get('get.CateLeaveOne').url //'../Product/getSecondCategory'
            }),
            listeners :{
                'beforeload' : function(store , operation, eOpts){
                    theform . getForm().findField('pid');
                    store.getProxy().extraParams = {'category_id' : store.firstCategoryid}
                }
            }
        })
    }
});