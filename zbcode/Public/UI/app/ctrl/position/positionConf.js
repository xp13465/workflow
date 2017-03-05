/**
 * Created by Administrator on 2015/12/7 0007.
 * operationButtons : 操作按钮的定义
 * searchFileds     : 查询字段的定义
 * listOperationButtons : 条目操作按钮的定义
 */
Ext.define('ui.ctrl.position.positionConf',{
    extend: 'ui.extend.baseClass.baseConf',
    modelName : "职位管理",
    topicalName : '职位',
    modelCode : 'position',
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
        'get.position.list' : { url : "system/getPositionList" , 'pmsCode' : 'get.position.list' , checkpms : 0 },
        'get.position.view' : { url : "system/getPositionInfo" , 'pmsCode' : 'get.position.info' , checkpms : 0 },
        'get.position.edit' : { url : "system/savePosition" , 'pmsCode' : 'set.position.info' , checkpms : 0 },
        'set.position.delete' : { url : "system/changePosition" , 'pmsCode' : 'set.position.delete' , checkpms : 0 },
        'set.position.change' : { url : "system/changePosition" , 'pmsCode' : 'set.position.changeNode' , checkpms : 0 },
        'get.department.list' : { url : "system/getDepartmentList" , 'pmsCode' : 'get.getdepartmentList' , checkpms : 0 },
        'get.organization.list': { url : "system/getOrganizationList" , 'pmsCode' : 'get.getOrganizationList' , checkpms : 0 }
    },
    _opButtons : [
        { 'permissionCode' : "position.add",checkpms:1 , text : '新增职位+' , pmsCode : 'position.add' ,recKey : ['id']   },
        { 'permissionCode' : "position.logoff",checkpms:1 , text : '批量撤销-' , pmsCode : 'position.cexiao' ,recKey : ['id']   }
    ],
    _lstOpButtons : [
        { 'permissionCode' : "position.view",checkpms:1 , text : '查看' , pmsCode : 'position.view' , recKey : ['id']/*所需record之关键字列表*/  , iconCls : ''},
        { 'permissionCode' : "position.edit",checkpms:1 , text : '编辑' , pmsCode : 'position.edit' , recKey : ['id']/*所需record之关键字列表*/   ,iconCls : ''},
        { 'permissionCode' : "position.start",checkpms:1 , text : '启用' , pmsCode : 'position.start' , recKey : ['id','status']/*所需record之关键字列表*/   ,iconCls : ''},
        { 'permissionCode' : "position.stop",checkpms:1 , text : '禁用' , pmsCode : 'position.stop' , recKey : ['id','status']/*所需record之关键字列表*/   ,iconCls : ''},
        { 'permissionCode' : "position.logoff",checkpms:1 , text : '注销' , pmsCode : 'position.delete' , recKey : ['id','status']/*所需record之关键字列表*/   ,iconCls : ''}
    ],
    _scFields : [
        {fieldLabel : '职位名' ,labelWidth : 50, name : 'name' , fieldtype : 'Ext.form.field.Text', pmsCode:'' , checkpms:0   },
        {fieldLabel : '机构名' ,labelWidth : 50, name : 'organization_name' , fieldtype : 'Ext.form.field.Text', pmsCode:'' , checkpms:0   },
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
        { header: '职位名称',width: 100,   dataIndex: 'name'} ,
        { hidden: true,width: 100,   dataIndex: 'if_leader'} ,
        { header: '所属机构', width: 150,  dataIndex: 'organization_name' } ,
        { header: '一级部门', width: 160,  dataIndex: 'firstdepartment_name' } ,
        { header: '二级部门', width: 160,  dataIndex: 'department_name' } ,
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
            autoScroll : true,
            myStamp : 'theForm',
            items :[
                {
                    fieldLabel : '职位ID',
                    labelWidth: 70,
                    name : 'id',
                    margin: 6,
                    columnWidth :1,
                    readOnly:true,
                    filedType : 'Number'
                },{
                    fieldLabel : '职位名称',
                    labelWidth: 70,
                    name : 'name',
                    columnWidth :1,
                    allowBlank :false,
                    blankText:"请输入职位名称",
                    margin: 6,
                    filedType : 'Text'
                },{
                    fieldLabel : '是否是领导',
                    labelWidth: 70,
                    name : 'if_leader',
                    columnWidth :1,
                    allowBlank :false,
                    blankText:"请输入是否是领导",
                    margin: 6,
                    filedType : 'ComboBox',
                    editable:false,
                    displayField    : 'text',
                    valueField  : "value",
                    store : new Ext.data.ArrayStore({
                        fields  :   ['value', 'text'],
                        data    :   [[1,'是'],[0,'否']]
                       
                    })
                },{
                    fieldLabel : '所属机构',
                    labelWidth: 70,
                    name : 'organization_id',
                    allowBlank :false,
                    blankText:"请选择机构",
                    allowBlank :false,
                    blankText:"请输入所属机构",
                    columnWidth :1,
                    margin: 6,
                    filedType : 'ComboBox',
                    editable:false,
                    displayField    : 'organization_name',
                    valueField  : "organization_id",
                    store : "{{getOrganizationListStore}}"

                },{
                    fieldLabel : '所属部门',
                    labelWidth: 70,
                    name : 'department_pid',
                    columnWidth :.5,
                    margin: 6,
                    allowBlank :false,
                    blankText:"请输入所属部门",
                    editable:false,
                    filedType : 'ComboBox',
                    displayField    : 'name',
                    valueField  : "id",
                    store : "{{getDepartmentPidListStore}}"
                },{
                    fieldLabel : '',
                    labelWidth: 70,
                    name : 'department_id',
                    columnWidth :.5,
                    margin: 6,
                    filedType : 'ComboBox',
                    displayField    : 'name',
                    valueField  : "id",
                    store : "{{getDepartmentListStore}}"
                }
            ]
        }
    ],

    getOrganizationListStore : function(){
        var me = this;
        return new Ext.data.ArrayStore({
            fields  :   ['organization_id', 'organization_name'],
            //data    :   [[1,'基金']],
            autoLoad:true,
            proxy: Ext.create( 'ui.extend.base.Ajax',{
                url : '/Admin/system/getOrganizationList'
            })
        })
    },
    getDepartmentPidListStore : function(){
        var me = this;
        return new Ext.data.ArrayStore({
            fields  :   ['id', 'name'],
            autoLoad:true,
            //data    :   [[1,'基金']],
            proxy: Ext.create( 'ui.extend.base.Ajax',{
                url : me.urls.get('get.department.list').url, //'../system/getdepartmentList'
                extraParams : {option : 1 , pid : 0}
            }),
            listeners :{
                'beforeload' : function(store , operation, dd , eOpts , e){
                    if(typeof(store.organization_id) === 'undefined') return false;
                    var extraParams = store.getProxy().extraParams;
                    Ext.apply(extraParams,{ organization_id:  store.organization_id , option : 1 , pid : 0  , position : 1 } );
                    store.getProxy().extraParams = extraParams;
                }
            }
        })
    },
    getDepartmentListStore : function(){
        var me = this;
        return new Ext.data.ArrayStore({
            fields  :   ['id', 'name'],
            //data    :   [[1,'基金']],
            autoLoad:true,
            proxy: Ext.create( 'ui.extend.base.Ajax',{
                url : me.urls.get('get.department.list').url, // '../system/getdepartmentList'
                extraParams : {option : 1}
            }),
            listeners :{
                'beforeload' : function(store , operation, eOpts){
                    if(typeof(store.pid) === 'undefined') return false;

                    var extraParams = store.getProxy().extraParams;
                    Ext.apply(extraParams,{ organization_id:  store.organization_id , option : 1 , pid : store.pid   , position : 1 , dd:11} );
                    store.getProxy().extraParams = extraParams;
                }
            }
        })
    }
});