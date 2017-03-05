/**
 * Created by Administrator on 2015/12/7 0007.
 * operationButtons : 操作按钮的定义
 * searchFileds     : 查询字段的定义
 * listOperationButtons : 条目操作按钮的定义
 */
Ext.define( 'ui.ctrl.node.nodeConf',{
    extend: 'ui.extend.baseClass.baseConf',
    modelName : "菜单节点管理",
    topicalName : '菜单节点',
    modelCode : 'node',
    groupCode : '',

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
        'get.node.list' : { url : "system/getNodeList" , 'pmsCode' : 'get.node.list' , checkpms : 0 },
        'get.node.view' : { url : "system/getNodeInfo" , 'pmsCode' : 'get.node.info' , checkpms : 0 },
        'get.node.edit' : { url : "system/saveNode" , 'pmsCode' : 'set.node.info' , checkpms : 0 },
        'set.node.delete' : { url : "system/deleteNode" , 'pmsCode' : 'set.node.delete' , checkpms : 0 },
        'set.node.change' : { url : "system/changeNode" , 'pmsCode' : 'set.node.changeNode' , checkpms : 0 }
    },

    _opButtons : [
        { text : '新增菜单节点+' , pmsCode : 'node.add' ,recKey : ['id'] , 'permissionCode' : "node.add"   , checkpms:0 }
    ],

    _lstOpButtons : [
        { text : '查看' , pmsCode : 'node.view' , recKey : ['id']/*所需record之关键字列表*/  , 'permissionCode' : "node.view"  , checkpms:1, iconCls : ''},
        { text : '编辑' , pmsCode : 'node.edit' , recKey : ['id']/*所需record之关键字列表*/  , 'permissionCode' : "node.edit"   , checkpms:1 ,iconCls : ''},
        { text : '启用' , pmsCode : 'node.start' , recKey : ['id','status']/*所需record之关键字列表*/  , 'permissionCode' : "node.start"   , checkpms:1 ,iconCls : ''},
        { text : '禁用' , pmsCode : 'node.stop' , recKey : ['id','status']/*所需record之关键字列表*/  , 'permissionCode' : "node.stop"   , checkpms:1 ,iconCls : ''},
        { text : '注销' , pmsCode : 'node.delete' , recKey : ['id','status']/*所需record之关键字列表*/  , 'permissionCode' : "node.logoff"   , checkpms:1 ,iconCls : ''}
    ],

    _scFields : [
        {fieldLabel : '节点名' ,labelWidth : 50, name : 'name' , fieldtype : 'Ext.form.field.Text', pmsCode:'' , checkpms:0   },
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

    /*
    * grid数据列表的头部定义*/
    _listGridHeader : [
        { header: 'ID', width: 80,  dataIndex: 'id' } ,
        { header: '父节点',width: 160,   dataIndex: 'p_node_name', renderer : function(v){
            if(!v){
                return '无';
            }
            return v;
        }} ,
        { header: '节点名称',width: 160,   dataIndex: 'name'} ,
        { header: '节点编码',width: 100,   dataIndex: 'module'} ,
        { header: '节点分组',width: 100,   dataIndex: 'group'} ,
        { header: '状态', width: 60,  dataIndex: 'status' , renderer : function(v){
            if(v == 1){
                return '正常';
            }else if(v == 2){
                return '无效';
            }
            return v;
        }} ,
        { header: '排序', width: 60,  dataIndex: 'sort' } ,
        { header: '最后更新', width: 180,  dataIndex: 'update_time' }
    ] ,

    //_addInfo : [],
    _sub_win_defparams : { width:600 , height:450  , maximizable : true},  //子窗口初始参数

    _viewInfo : [],

    _publicInfo : [
        {
            title : '基本信息',
            xtype : 'form',
            layout : 'column',
            padding : 10,
            autoScroll : true,
            items :[
                {
                    fieldLabel : '节点ID',
                    labelWidth: 70,
                    name : 'id',
                    margin: 6,
                    columnWidth :1,
                    readOnly:true,
                    filedType : 'Number'
                },{
                    fieldLabel : '节点名',
                    labelWidth: 70,
                    name : 'name',
                    columnWidth:.5,
                    margin: 6,
                    allowBlank :false,
                    blankText:"请输入节点名",
                    filedType : 'Text'
                },{
                    fieldLabel : '节点分组',
                    labelWidth: 70,
                    name : 'group',
                    columnWidth:.5,
                    margin: 6,
                    filedType : 'Text'
                },{
                    fieldLabel : '节点编码',
                    labelWidth: 70,
                    name : 'module',
                    allowBlank :false,
                    blankText:"请输入节点编码",
                    columnWidth :.5,
                    margin: 6,
                    filedType : 'Text'
                },{
                    fieldLabel : '图标类',
                    labelWidth: 70,
                    name : 'iconcls',
                    allowBlank :false,
                    blankText:"请输入图标类",
                    columnWidth:.5,
                    margin: 6,
                    filedType : 'Text'
                },{
                    fieldLabel : '节点连接',
                    labelWidth: 70,
                    name : 'url',
                    columnWidth:1,
                    margin: 6,
                    filedType : 'Text'
                },{
                    fieldLabel : '节点状态',
                    labelWidth: 70,
                    name : 'status',
                    columnWidth :1,
                    margin: 6,
                    editable:false,
                    filedType : 'ComboBox',
                    displayField	: 'display',
                    valueField 	: "value",
                    value : 1,
                    readOnly : true,
                    store : new Ext.data.ArrayStore({
                        fields	: 	['value', 'display'],
                        data	:	[[1,'正常'],[2,'无效'],[-1,'已删除']]
                    })
                },{
                    fieldLabel : '移动端显示',
                    labelWidth: 70,
                    name : 'ismobi',
                    columnWidth :1,
                    margin: 6,
                    editable:false,
                    filedType : 'ComboBox',
                    displayField	: 'display',
                    valueField 	: "value",
                    value : 1,
                    store : new Ext.data.ArrayStore({
                        fields	: 	['value', 'display'],
                        data	:	[[1,'显示'],[0,'不显示']]
                    })
                },{
                    fieldLabel : '父节点',
                    labelWidth: 80,
                    name : 'pid',
                    margin: 6,
                    editable:false ,
                    columnWidth:1,
                    filedType : 'ComboBox' ,
                    displayField	: 'name' ,
                    valueField 	: "id" ,
                    value : 0 ,
                    store : "{{getnodelist_store}}"
                }
            ]
        }
    ],

    getnodelist_store : function(){
        var me = this;
        return new Ext.data.ArrayStore({
            fields	: 	['id', 'name'],
            autoLoad : {params : {option : 1}},
            proxy : Ext.create('ui.extend.base.Ajax',{
                url : me.urls.get('get.node.list').url , //'../Product/getFirstCategory'
                extraParams : { option : 1 , pid : 0 }
            })
        });
    }

});