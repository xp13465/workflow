/**
 * Created by Administrator on 2015/12/7 0007.
 * operationButtons : 操作按钮的定义
 * searchFileds     : 查询字段的定义
 * listOperationButtons : 条目操作按钮的定义
 */
Ext.define('ui.ctrl.organization.organizationConf',{
    extend: 'ui.extend.baseClass.baseConf',
    modelName : "机构管理",
    topicalName : '机构',
    modelCode : 'organization',
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
        'get.organization.list' : { url : "system/getOrganizationList" , 'pmsCode' : 'get.organization.list'  , checkpms : 0 },
        'get.organization.view' : { url : "system/getOrganizationInfo" , 'pmsCode' : 'get.organization.info' , checkpms : 0 },
        'get.organization.edit' : { url : "system/saveOrganization" , 'pmsCode' : 'set.organization.info' , checkpms : 0 },
        'set.organization.delete' : { url : "system/changeorganization" , 'pmsCode' : 'set.organization.delete' , checkpms : 0 },
        'set.organization.change' : { url : "system/changeorganization" , 'pmsCode' : 'set.organization.changeNode' , checkpms : 0 }
    },
    _opButtons : [
        { text : '新增+' , pmsCode : 'organization.add' ,recKey : ['organization_id'] , 'permissionCode' : "organization.add"  , checkpms : 1 },
        { text : '批量注销-' , pmsCode : 'organization.disable' ,recKey : ['organization_id'] , 'permissionCode' : "organization.logoff"  , checkpms : 1 }
    ],
    _lstOpButtons : [
        { text : '查看' , pmsCode : 'organization.view' , recKey : ['organization_id']/*所需record之关键字列表*/  , 'permissionCode' : "organization.view"  , checkpms:1, iconCls : ''},
        { text : '编辑' , pmsCode : 'organization.edit' , recKey : ['organization_id']/*所需record之关键字列表*/  , 'permissionCode' : "organization.edit"  , checkpms:1 ,iconCls : ''},
        { text : '启用' , pmsCode : 'organization.start' , recKey : ['organization_id','status']/*所需record之关键字列表*/  , 'permissionCode' : "organization.start" , checkpms:1 ,iconCls : ''},
        { text : '禁用' , pmsCode : 'organization.stop' , recKey : ['organization_id','status']/*所需record之关键字列表*/  , 'permissionCode' : "organization.stop" , checkpms:1 ,iconCls : ''},
        { text : '注销' , pmsCode : 'organization.delete' , recKey : ['organization_id','status']/*所需record之关键字列表*/  , 'permissionCode' : "organization.logoff" , checkpms:1 ,iconCls : ''}
    ],
    _scFields : [
        {fieldLabel : '机构名称' ,labelWidth : 80, name : 'organization_name' , fieldtype : 'Ext.form.field.Text', pmsCode:'' , checkpms:0   },
        {text : '查询' ,iconCls : '', fieldtype : 'Ext.button.Button'  , submitBtn : true , clickFn : '$search', pmsCode:'' , checkpms:0 }
    ],

    /*
    * 配置信息面板里的按钮，并制定事件后缀： fnName
    * */
    _infoPanelButtons : {
        'all' : [],
        'view' : [],
        'edit' : [{text : '保存' , fnName : 'save'}],
        'add' : [{text : '新增' , fnName : 'save'}]
    },
    /*
     * grid数据列表的头部定义*/
    _listGridHeader : [
        { header: '序号',width: 80,  dataIndex: 'organization_id' } ,
        { header: '机构全称',width: 250,   dataIndex: 'organization_full_name' , flex : 1} ,
        { header: '机构简称', width: 150,  dataIndex: 'organization_name' } 
        // { header: '状态', width: 60,  dataIndex: 'status' } ,
        // { header: '最后更新', width: 180,  dataIndex: 'update_time' }
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
            items :[
                {
                    fieldLabel : '机构ID',
                    labelWidth: 70,
                    name : 'organization_id',
                    margin: 6,
                    columnWidth :1,
                    readOnly:true,
                    filedType : 'Number'
                },{
                    fieldLabel : '机构全称',
                    labelWidth: 70,
                    name : 'organization_full_name',
                    allowBlank :false,
                    blankText:"请输入机构全称",
                    columnWidth :1,
                    margin: 6,
                    filedType : 'Text'
                },{
                    fieldLabel : '机构简称',
                    labelWidth: 70,
                    name : 'organization_name',
                    allowBlank :false,
                    blankText:"请输入机构简称",
                    columnWidth :1,
                    margin: 6,
                    filedType : 'Text'
                }
            ]
        }
    ]
});