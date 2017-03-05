/**
 * Created by Administrator on 2015/12/7 0007.
 * operationButtons : 操作按钮的定义
 * searchFileds     : 查询字段的定义
 * listOperationButtons : 条目操作按钮的定义
 */
Ext.define('ui.ctrl.role.roleConf',{
    extend: 'ui.extend.baseClass.baseConf',
    modelName : "角色管理",
    topicalName : '角色',
    modelCode : 'role',
    groupCode : '',

    requires : [
        'ui.view.role.Coms.fenpeiNodeLeft',
        'ui.view.role.Coms.fenpeiRight',
        'ui.view.role.Coms.fenpeiNodeRight',
        'ui.view.role.Coms.fenpeiLeft'
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

    _urls : {
        'get.role.list' : { url : "system/getRoleList" , 'pmsCode' : 'get.role.list' , checkpms : 0 },
        'get.role.view' : { url : "system/getRoleInfo" , 'pmsCode' : 'get.role.info' , checkpms : 0 },
        'get.role.edit' : { url : "system/saveRole" , 'pmsCode' : 'set.role.info' , checkpms : 0 },
        'get.role.premissionlist' : { url : "system/getRolePermissionList" , 'pmsCode' : 'get.role.premissionlist' , checkpms : 0 },
        'get.role.allpremissionlist' : { url : "system/getPermissionList" , 'pmsCode' : 'get.role.allpremissionlist' , checkpms : 0 },

        'set.role.delrolepermission' : { url : "access/delRolePermission" , 'pmsCode' : 'set.user.delRoles' , checkpms : 0 },
        'set.role.addrolepermission' : { url : "access/setRolePermission" , 'pmsCode' : 'get.user.setRoles' , checkpms : 0 },
        'get.role.changerole' : { url : "system/changeRole" , 'pmsCode' : 'get.role.allnodelist' , checkpms : 0 },

        'get.role.nodelist' : { url : "system/getRoleNodeList" , 'pmsCode' : 'get.role.nodelist' , checkpms : 0 },
        'get.role.allnodelist' : { url : "system/getAllNodeList" , 'pmsCode' : 'get.role.allnodelist' , checkpms : 0 },

        'get.role.delrolenode' : { url : "access/delRoleNode" , 'pmsCode' : 'get.role.delrolenode' , checkpms : 0 },
        'get.role.addrolenode' : { url : "access/setRoleNode" , 'pmsCode' : 'get.role.addrolenode' , checkpms : 0 }
    },

    _opButtons : [
        { text : '新增角色+' , pmsCode : 'role.add' ,recKey : ['id'] ,'permissionCode' : "role.add" , checkpms:1 },
        { text : '权限分配' , pmsCode : 'role.fenpei' ,recKey : ['id'] ,'permissionCode' : "role.fenpei" , checkpms:1 },
        { text : '分配菜单节点' , pmsCode : 'role.fenpeinode' ,recKey : ['id'] ,'permissionCode' : "role.fenpeinode" , checkpms:1 }
    ],

    _lstOpButtons : [
        { text : '查看' , pmsCode : 'role.view' , recKey : ['id']/*所需record之关键字列表*/  , checkpms:1, iconCls : '','permissionCode' : "role.view"},
        { text : '编辑' , pmsCode : 'role.edit' , recKey : ['id']/*所需record之关键字列表*/  , checkpms:1 ,iconCls : '','permissionCode' : "role.edit"},
        { text : '禁用' , pmsCode : 'role.disable' , recKey : ['id','status']/*所需record之关键字列表*/  , checkpms:1 ,iconCls : '','permissionCode' : "role.stop"}
    ],

    _scFields : [
        {fieldLabel : '角色名' ,labelWidth : 50, name : 'title' , fieldtype : 'Ext.form.field.Text', pmsCode:'' , checkpms:0   },
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
        { header: 'ID',width: 80,  dataIndex: 'id' } ,
        { header: '角色名',width: 160,   dataIndex: 'title'} ,
        { header: '描述信息', width: 160,  dataIndex: 'remark' ,flex:1} ,
        { header: '状态', width: 60,  dataIndex: 'status' ,renderer:function(v){
            if(v == 1){
                return '正常';
            }else if(v == 2){
                return '删除';
            }else if(v == 3){
                return '禁用';
            }
            return v;
        }} ,
        // { header: '排序', width: 60,  dataIndex: 'sort' } ,
        { header: '最后更新', width: 180,  dataIndex: 'update_time' }
    ] ,
    //_addInfo : [],
    _sub_win_defparams : { width:500 , height:450  , maximizable : true },  //子窗口初始参数
    _fenpeiInfo : [
        {
            title   :   '权限分配',
            xtype   :   'panel',
            layout  :   'border',
            items :[
                {comsType : 'ui.view.role.Coms.fenpeiLeft'} ,
                {comsType : 'ui.view.role.Coms.fenpeiRight'}
            ]
        }
    ],

    _fenpeiNodeInfo : [
        {
            title   :   '菜单分配',
            xtype   :   'panel',
            layout  :   'border',
            items :[
                {comsType : 'ui.view.role.Coms.fenpeiNodeLeft'} ,
                {comsType : 'ui.view.role.Coms.fenpeiNodeRight'}
            ]
        }
    ],

    _publicInfo : [
        {
            title : '基本信息',
            typeMode : ["view","edit","add"],
            xtype : 'form',
            layout : 'column',
            padding : 10,
            autoScroll : true,
            items :[
                {
                    fieldLabel : '角色ID',
                    labelWidth: 70,
                    name : 'id',
                    margin: 6,
                    columnWidth :1,
                    readOnly:true,
                    filedType : 'Number'
                },{
                    fieldLabel : '角色名',
                    labelWidth: 70,
                    name : 'title',
                    allowBlank :false,
                    blankText:"请输入角色名",
                    columnWidth :1,
                    margin: 6,
                    filedType : 'Text'
                },{
                    fieldLabel : '角色说明',
                    labelWidth: 70,
                    name : 'remark',
                    columnWidth :1,
                    margin: 6,
                    filedType : 'Text'
                },{
                    fieldLabel : '角色状态',
                    labelWidth: 70,
                    name : 'status',
                    columnWidth :1,
                    editable:false,
                    margin: 6,
                    readOnly : true,
                    filedType : 'ComboBox',
                    displayField	: 'display',
                    valueField 	: "value",
                    value : 1,
                    store : new Ext.data.ArrayStore({
                        fields	: 	['value', 'display'],
                        data	:	[[1,'正常'],[0,'已禁用'],[-1,'已删除']]
                    })
                }
            ]
        }
    ]
});