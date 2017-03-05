/**
 * Created by Administrator on 2015/12/7 0007.
 * operationButtons : 操作按钮的定义
 * searchFileds     : 查询字段的定义
 * listOperationButtons : 条目操作按钮的定义
 */
Ext.define('ui.ctrl.permission.permissionConf',{
    extend: 'ui.extend.baseClass.baseConf',
    modelName : "权限管理",
    topicalName : '权限',
    modelCode : 'permission',
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
        'get.permission.list' : { url : "system/getPermissionList" , 'pmsCode' : 'get.permission.list' , checkpms : 0 },
        'get.permission.view' : { url : "system/getPermissionInfo" , 'pmsCode' : 'get.permission.info' , checkpms : 0 },
        'get.permission.edit' : { url : "system/savePermission" , 'pmsCode' : 'set.permission.info' , checkpms : 0 },
        'set.permission.delete' : { url : "system/changePermission" , 'pmsCode' : 'set.permission.delete' , checkpms : 0 },
        'set.permission.change' : { url : "system/changePermission" , 'pmsCode' : 'set.permission.changeNode' , checkpms : 0 }
    },

    _opButtons : [
        {'permissionCode' : "permission.add",checkpms:1 , text : '新增权限+' , pmsCode : 'permission.add' ,recKey : ['permission_id']   },
        {'permissionCode' : "permission.logoff",checkpms:1 , text : '批量撤销-' , pmsCode : 'permission.cexiao' ,recKey : ['permission_id']   }
    ],

    _lstOpButtons : [
        {'permissionCode' : "permission.view",checkpms:1 , text : '查看' , pmsCode : 'permission.view' , recKey : ['permission_id']/*所需record之关键字列表*/  , iconCls : ''},
        {'permissionCode' : "permission.edit",checkpms:1 , text : '编辑' , pmsCode : 'permission.edit' , recKey : ['permission_id']/*所需record之关键字列表*/   ,iconCls : ''},
        {'permissionCode' : "permission.start",checkpms:1 , text : '启用' , pmsCode : 'permission.start' , recKey : ['permission_id','status']/*所需record之关键字列表*/   ,iconCls : ''},
        {'permissionCode' : "permission.stop",checkpms:1 , text : '禁用' , pmsCode : 'permission.stop' , recKey : ['permission_id','status']/*所需record之关键字列表*/   ,iconCls : ''},
        {'permissionCode' : "permission.logoff",checkpms:1 , text : '注销' , pmsCode : 'permission.delete' , recKey : ['permission_id','status']/*所需record之关键字列表*/   ,iconCls : ''}
    ],

    _scFields : [
        {fieldLabel : '权限名' ,labelWidth : 50, name : 'permission_name' , fieldtype : 'Ext.form.field.Text', pmsCode:'' , checkpms:0   },
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
        { header: '序号',width: 80,  dataIndex: 'permission_id' } ,
        { header: '权限名称',width: 100,   dataIndex: 'permission_name' , flex : 1} ,
        { header: '权限编码', width: 150,  dataIndex: 'permission_code' } ,
        { header: '状态', width: 60,  dataIndex: 'status'  , renderer : function(v){
            if(v == 1){
                return '正常';
            }else if(v == 2){
                return '无效';
            }else if(v == 3){
                return '已注销';
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
            items :[
                {
                    fieldLabel : '权限ID',
                    labelWidth: 70,
                    name : 'permission_id',
                    margin: 6,
                    columnWidth :1,
                    hidden:true,
                    readOnly:true,
                    filedType : 'Number'
                },{
                    fieldLabel : '权限编码',
                    labelWidth: 70,
                    name : 'permission_code',
                    columnWidth :1,
                    margin: 6,
                    filedType : 'Text'
                },{
                    fieldLabel : '权限名称',
                    labelWidth: 70,
                    name : 'permission_name',
                    columnWidth :1,
                    margin: 6,
                    filedType : 'Text'
                }
            ]
        }
    ]
});