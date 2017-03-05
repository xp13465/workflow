/**
 * Created by Administrator on 2015/12/7 0007.
 * operationButtons : 操作按钮的定义
 * searchFileds     : 查询字段的定义
 * listOperationButtons : 条目操作按钮的定义
 */
Ext.define('ui.ctrl.producttypeparam.producttypeparamConf',{
    extend: 'ui.extend.baseClass.baseConf',
    modelName : "产品类型参数",
    topicalName : '产品类型参数',
    modelCode : 'producttypeparam',
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
        'get.producttypeparam.list' : { url : "productCategory/ProductCategoryList" , 'pmsCode' : 'get.producttypeparam.list' , checkpms : 0 },
        'get.producttypeparam.view' : { url : "productCategory/getCategoryField" , 'pmsCode' : 'get.producttypeparam.info' , checkpms : 0 },
        'get.producttypeparam.edit' : { url : "productCategory/getCategoryField" , 'pmsCode' : 'set.producttypeparam.info' , checkpms : 0 },
        'get.producttypeparam.del' : { url : "productCategory/delParamField" , 'pmsCode' : 'set.productCategory.delScoreField' , checkpms : 0 },
        'set.producttypeparam.add_field' : { url : "productCategory/addParamField" , 'pmsCode' : 'set.producttypeparam.changeNode' , checkpms : 0 },
        'get.producttypeparam.editScoreField' : { url : "productCategory/editParamField" , 'pmsCode' : 'set.productType.changeNode' , checkpms : 0 },
        'get.producttypeparam.firstcategory' :{url : 'productCategory/getFirstCategory', 'pmsCode' : 'set.producttypeparam.getFirstCategory' , checkpms : 0 },
        'get.producttypeparam.adCategoryField' : { url : "productCategory/addParamField" , 'pmsCode' : 'set.producttypeparam.adCategoryField' , checkpms : 0 }
    },
    _opButtons : [
        //{ text : '新增参数+' , pmsCode : 'producttypeparam.add' ,recKey : ['id']  , checkpms:0 },
    ],
    _lstOpButtons : [
        { text : '查看' , pmsCode : 'producttypeparam.view' , recKey : ['id']/*所需record之关键字列表*/  , checkpms:1, iconCls : '','permissionCode' : "parameterstyle.view"},
        { text : '编辑' , pmsCode : 'producttypeparam.edit' , recKey : ['id']/*所需record之关键字列表*/  , checkpms:1 ,iconCls : '','permissionCode' : "parameterstyle.edit"},


    ],
    _scFields : [
        {fieldLabel : '产品类型(二级)' ,labelWidth : 105, name : 'category_name' , fieldtype : 'Ext.form.field.Text', pmsCode:'' , checkpms:0   },
        {text : '查询' ,iconCls : '', fieldtype : 'Ext.button.Button'  , submitBtn : true , clickFn : '$search', pmsCode:'' , checkpms:0 }
    ],

    /*
    * 配置信息面板里的按钮，并制定事件后缀： fnName
    * */
    _infoPanelButtons : {
        'all' : [],
        'view' : [],
        'edit' : [],
        'add' : [{text : '新增保存' , fnName : 'save'}]
    },
    /*
     * grid数据列表的头部定义*/
    _listGridHeader : [
        { header: '序号',width: 50,  dataIndex: 'id' } ,
        { header: '一级名称',width: 100,   dataIndex: 'firstcategory_name',flex:1} ,
        { header: '二级名称', width: 150,  dataIndex: 'category_name' } ,
        { header: '状态', width: 60,  dataIndex: 'status'  , renderer : function(v){
            if(v == 1){
                return '正常';
            }else if(v == 2){
                return '无效';
            }
            return v;
        }}
        
    ] ,
    _addInfo :  [],
    _viewInfo : [],
    _editInfo : [],
    _sub_win_defparams : { width:1000 , height:500 },  //子窗口初始参数
    _publicInfo : [],
	get_first_category : function(){
		var me = this;
		return new Ext.data.ArrayStore({
                fields  :   ['id', 'category_name'],
                //data    :   [[1,'基金']],
                autoLoad:true,
                proxy: Ext.create( 'ui.extend.base.Ajax',{
                    url : me.urls.get('get.producttypeparam.firstcategory').url
                })
        });
	},
    get_second_category :  function(){
        var me = this;
        return new Ext.data.ArrayStore({
            fields  :   ['id', 'category_name'],
            //data    :   [[1,'基金']],
            proxy: Ext.create( 'ui.extend.base.Ajax',{
                url : me.urls.get('get.producttypeparam.secondcategory').url,
                extraParams : {option : 1 , pid : 0 }
            }),
            listeners :{
                'beforeload' : function(store , operation, eOpts){
                    var extraParams = store.getProxy().extraParams;
                    Ext.apply(extraParams,{'pid' : store.pid  });
                    store.getProxy().extraParams = extraParams;
                }
            }
        })
    }
});