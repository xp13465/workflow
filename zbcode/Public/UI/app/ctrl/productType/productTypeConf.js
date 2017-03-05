/**
 * Created by Administrator on 2015/12/7 0007.
 * operationButtons : 操作按钮的定义
 * searchFileds     : 查询字段的定义
 * listOperationButtons : 条目操作按钮的定义
 */
Ext.define('ui.ctrl.productType.productTypeConf',{
    extend: 'ui.extend.baseClass.baseConf',
    modelName : "产品类型",
    topicalName : '产品类型',
    modelCode : 'productType',
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
        'get.productType.list' : { url : "productCategory/ProductCategoryList" , 'pmsCode' : 'get.productType.list' , checkpms : 0 },
        'get.productType.view' : { url : "productCategory/getCategoryInfo" , 'pmsCode' : 'get.productType.info' , checkpms : 0 },
        'get.productType.add' : { url : "productCategory/addSecondCategory" , 'pmsCode' : 'get.productType.add' , checkpms : 0 },
        'get.productType.add_first' : { url : "productCategory/addFirstCategory" , 'pmsCode' : 'get.productType.add_first' , checkpms : 0 },
        'get.productType.edit' : { url : "productCategory/UpdateProductCategory" , 'pmsCode' : 'set.productType.info' , checkpms : 0 },
        'set.productType.delete' : { url : "productCategory/DelProductCategory" , 'pmsCode' : 'set.productType.delete' , checkpms : 0 },
        'set.productType.change' : { url : "productCategory/changeCategoryStatus" , 'pmsCode' : 'set.productType.changeNode' , checkpms : 0 },
        'get.CateLeaveOne' : { url : "productCategory/getFirstCategory" , 'pmsCode' : 'set.productType.changeNode' , checkpms : 0 }
    },
    _opButtons : [
        { text : '新增类型+' , pmsCode : 'productType.add' ,recKey : ['id']  , checkpms:1 ,'permissionCode' : "producttype.add"},
        { text : '批量注销-' , pmsCode : 'productType.cexiao' ,recKey : ['id']  , checkpms:1 ,'permissionCode' : "producttype.logoff" }
    ],
    _lstOpButtons : [
        { text : '查看' , pmsCode : 'productType.view' , recKey : ['id']/*所需record之关键字列表*/  , checkpms:1, iconCls : '','permissionCode' : "producttype.view"},
        { text : '编辑' , pmsCode : 'productType.edit' , recKey : ['id']/*所需record之关键字列表*/  , checkpms:1 ,iconCls : '','permissionCode' : "producttype.edit"},
        { text : '启用' , pmsCode : 'productType.start' , recKey : ['id','status']/*所需record之关键字列表*/  , checkpms:1 ,iconCls : '','permissionCode' : "producttype.start"},
        { text : '禁用' , pmsCode : 'productType.stop' , recKey : ['id','status']/*所需record之关键字列表*/  , checkpms:1 ,iconCls : '','permissionCode' : "producttype.stop"},
        { text : '注销' , pmsCode : 'productType.delete' , recKey : ['id','status']/*所需record之关键字列表*/  , checkpms:1 ,iconCls : '','permissionCode' : "producttype.logoff"}
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
        'edit' : [{text : '保存' , fnName : 'save'}],
        'add' : [{text : '新增保存' , fnName : 'save'}]
    },
    _sub_win_defparams : { width:500 , height:350 },  //子窗口初始参数
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
    //_addInfo : [],
    _viewInfo : [],
    _publicInfo : [
        {
            title : '基本信息',
            xtype : 'form',
            layout : 'column',
            padding : 10,
            myStamp : 'theform',
            autoScroll : true,
            items :[
                {
                    fieldLabel : '产品类型ID',
                    labelWidth: 80,
                    name : 'id',
                    margin: 6,
                    columnWidth :1,
                    mytype:"typeid",
                    readOnly:true,
                    hidden:true,
                    filedType : 'Number'
                },{
                    fieldLabel : '一级名称',
                    labelWidth: 80,
                    name : 'pid',
                    allowBlank :false,
                    editable:false,
                    blankText:"请选择类型",
                    columnWidth :.8,
                    mytype:"firstLevel",
                    margin: 1,
                    filedType : 'ComboBox',
                    // editable:false,
                    displayField    : 'category_name',
                    valueField  : "id",
                    store : "{{getFirstCateStore}}"
                },{
                    text:'添加',
                    margin: 6,
                    columnWidth :.2,
                    mytype : 'addbtn',
                    filedType : 'Button',
                    handler:"{{getAddBtnEvent}}"
                },{
                    fieldLabel : '二级名称',
                    labelWidth: 80,
                    name : 'category_name',
                    columnWidth :1,
                    margin: 6,
                    filedType : 'Text'
                }
            ]
        }
    ],

    getFirstCateStore : function(key , params , theform){
        var me = this;
        return new Ext.data.ArrayStore({
            fields  :   ['id', 'category_name'] ,
            //data    :   [[1,'基金']],
            autoLoad : true,
            proxy: Ext.create('ui.extend.base.Ajax',{
                url : me.urls.get('get.CateLeaveOne').url //'../productCategory/getLeavelOne'
            })
        })
    },

    getAddBtnEvent : function(key , params , theform) {
        var me = this;
        var ctrl = me.ctrl;

        return function (btn) {
            var firstCatefield = btn.previousSibling();
            var value = firstCatefield.getValue();

            var win = Ext.create("Ext.window.Window",{

                title : "请输入一级分类名称",
                width : 350,
                height: 200,
                layout : 'fit',
                listeners : {
                    'close' : function(){
                        theform.setDisabled(false);
                        this.setDisabled(false);
                    },
                    'render' : function(){
                        theform.setDisabled(true);
                        this.setDisabled(false);
                    }
                },
                buttons : [
                    {
                        xtype : 'button',
                        text : '新增一级类别',
                        handler : function(){

                            var form = $findByparam( win , { myStamp : "theform" });
                            form = form[0];
                            if(!form) return false;
                            var param = form.getValues();

                            ctrl.$requestAjax({
                                url: me.urls.get('get.productType.add_first').url,
                                method: "POST",
                                params: param,
                                scope: me,
                                backParams: {},
                                callback: function (response, backParams) {
                                    //console.log(response.responseText);
                                    var param = Ext.decode(response.responseText);
                                    if (param.status === 1) {
                                        Ext.MessageBox.alert("成功", param.msg);
                                        win.close();
                                        firstCatefield.getStore().reload();
                                        setTimeout(function(){
                                            firstCatefield.setValue(param.data.id);
                                        },100);
                                    } else {
                                        Ext.MessageBox.alert("失败", param.msg);
                                    }
                                }
                            });
                        }
                    }
                ],
                items : [
                    {
                        xtype : 'form',
                        layout : 'column',
                        myStamp : "theform",
                        padding : 10,
                        border : 0,
                        items : [
                            {
                                xtype : 'textfield',
                                fieldLabel : '分类名称',
                                value : "",
                                name : 'category_name',
                                labelWidth : 100,
                                allowBlank :false,
                                blankText:"请输入类别名称",
                                columnWidth  : 1
                            }
                        ]
                    }
                ]
            });
            //theform.add(win);
            theform.doLayout();
            Ext.override(Ext.Window, {
                closeAction: 'hide'
            })
            win.show();

        }
    }
});