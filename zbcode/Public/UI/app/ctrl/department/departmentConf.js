/**
 * Created by Administrator on 2015/12/7 0007.
 * operationButtons : 操作按钮的定义
 * searchFileds     : 查询字段的定义
 * listOperationButtons : 条目操作按钮的定义
 */
Ext.define('ui.ctrl.department.departmentConf',{
    extend: 'ui.extend.baseClass.baseConf',
    modelName : "部门管理",
    topicalName : '部门',
    modelCode : 'department',
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
        'get.department.list' : { url : "system/getdepartmentList" , 'pmsCode' : 'get.department.list' , checkpms : 0 },
        'get.department.view' : { url : "system/getdepartmentInfo" , 'pmsCode' : 'get.department.info' , checkpms : 0 },
        'get.department.edit' : { url : "system/savedepartment" , 'pmsCode' : 'set.department.info' , checkpms : 0 },
        'set.department.delete' : { url : "system/changedepartment" , 'pmsCode' : 'set.department.delete' , checkpms : 0 },
        'set.department.change' : { url : "system/changedepartment" , 'pmsCode' : 'set.department.changeNode' , checkpms : 0 },
        'get.department.list' : { url : "system/getdepartmentList" , 'pmsCode' : 'get.getdepartmentList' , checkpms : 0 },
        'get.organization.list': { url : "system/getOrganizationList" , 'pmsCode' : 'get.getOrganizationList' , checkpms : 0 }
    },
    _opButtons : [
        { text : '新增部门+' , pmsCode : 'department.add' ,recKey : ['id']  , 'permissionCode' : "department.add" , checkpms : 1 , checkpms:0 },
        { text : '批量注销-' , pmsCode : 'department.cexiao' ,recKey : ['id']  , 'permissionCode' : "department.logoff" , checkpms : 1 , checkpms:0 }
    ],
    _lstOpButtons : [
        { text : '查看' , pmsCode : 'department.view' , recKey : ['id']/*所需record之关键字列表*/  , 'permissionCode' : "department.view" , checkpms : 1, iconCls : ''},
        { text : '编辑' , pmsCode : 'department.edit' , recKey : ['id']/*所需record之关键字列表*/  , 'permissionCode' : "department.edit"  , checkpms : 1 ,iconCls : ''},
        { text : '启用' , pmsCode : 'department.start' , recKey : ['id','status']/*所需record之关键字列表*/  , 'permissionCode' : "department.start"  , checkpms : 1 ,iconCls : ''},
        { text : '禁用' , pmsCode : 'department.stop' , recKey : ['id','status']/*所需record之关键字列表*/  , 'permissionCode' : "department.stop"  , checkpms : 1 ,iconCls : ''},
        { text : '注销' , pmsCode : 'department.delete' , recKey : ['id','status']/*所需record之关键字列表*/  , 'permissionCode' : "department.logoff"  , checkpms : 1 ,iconCls : ''}
    ],
    _scFields : [
        {fieldLabel : '部门名称' ,labelWidth : 70, name : 'name' , fieldtype : 'Ext.form.field.Text', pmsCode:'' , checkpms:0   },
        {fieldLabel : '机构名称' ,labelWidth : 70, name : 'organization_full_name' , fieldtype : 'Ext.form.field.Text', pmsCode:'' , checkpms:0   },
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
        { header: '序号',width: 80,  dataIndex: 'id' } ,
        { hidden:true,width: 150,   dataIndex: 'status'} ,
        { header: '部门名称',width: 150,   dataIndex: 'name'} ,
        { header: '所属机构',width: 150,   dataIndex: 'organization_full_name'} ,
        { header: '上级部门',width: 150,   dataIndex: 'firstdepartment_name'} 
    ] ,
    //_addInfo : [],
    _viewInfo : [],
    _publicInfo : [
        {
            title : '基本信息',
            xtype : 'form',
            layout : 'column',
            padding : 10,
            myStamp : 'theForm',
            autoScroll : true,
            items :[
                {
                    fieldLabel : '部门ID',
                    labelWidth: 70,
                    name : 'id',
                    margin: 6,
                    columnWidth :1,
                    readOnly:true,
                    filedType : 'Number'
                },{
                    fieldLabel : '部门名称',
                    labelWidth: 70,
                    name : 'name',
                    allowBlank :false,
                    blankText:"请输入部门名称",
                    columnWidth :1,
                    
                    margin: 6,
                    filedType : 'Text'
                },{
                    fieldLabel : '所属机构',
                    labelWidth: 70,
                    name : 'organization_id',
                    allowBlank :false,
                    blankText:"请选择机构",
                  
                    columnWidth :1,
                    margin: 6,
                    editable:false,
                    filedType : 'ComboBox',
                    displayField    : 'organization_name',
                    valueField  : "organization_id",
                    store : "{{getOrganizationList}}"

                },{
                    fieldLabel : '上级部门',
                    labelWidth: 70,
                    name : 'pid',
                    columnWidth :1,
                    allowBlank :false,
                    blankText:"请输入上级部门",
                    margin: 6,
                    editable:false,
                    filedType : 'ComboBox',
                    displayField    : 'name',
                    valueField  : "id",
                    value : 0,
                    store :  "{{getSecendDepartment}}"
                }
            ]
        }
    ],

    getOrganizationList : function(){
        var me = this;
        return new Ext.data.ArrayStore({
            fields  :   ['organization_id', 'organization_name'],
            //data    :   [[1,'基金']],
            proxy: Ext.create( 'ui.extend.base.Ajax',{
                url : me.urls.get('get.organization.list').url, // '../system/getOrganizationList',
                extraParams : {option : 1 }
            })
        })
    },

    getSecendDepartment :  function(){
        var me = this;
        return new Ext.data.ArrayStore({
            fields  :   ['id', 'name'],
            //data    :   [[1,'基金']],
            proxy: Ext.create( 'ui.extend.base.Ajax',{
                url : me.urls.get('get.department.list').url,
                extraParams : {option : 1 , pid : 0 }
            }),
            listeners :{
                'beforeload' : function(store , operation, eOpts){
                    var extraParams = store.getProxy().extraParams;
                    Ext.apply(extraParams,{'organization_id' : store.organization_id  });
                    store.getProxy().extraParams = extraParams;
                }
            }
        })
    }
});