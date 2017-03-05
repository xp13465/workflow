/**
 * Created by Administrator on 2015/12/7 0007.
 * operationButtons : 操作按钮的定义
 * searchFileds     : 查询字段的定义
 * listOperationButtons : 条目操作按钮的定义
 */
Ext.define('ui.ctrl.user.userConf',{
    extend: 'ui.extend.baseClass.baseConf',
    modelName : "账号管理",
    topicalName : '账号',
    modelCode : 'user',
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
        'get.user.list' : { url : "user/getUserList" , 'pmsCode' : 'get.user.list' , checkpms : 0 },
        'get.user.view' : { url : "user/getUserInfoDetail" , 'pmsCode' : 'get.user.info' , checkpms : 0 },
        'get.user.edit' : { url : "user/saveUser" , 'pmsCode' : 'set.user.info' , checkpms : 0 },
        'set.user.change' : { url : "user/changeUser" , 'pmsCode' : 'set.user.changeUser' , checkpms : 0 },
        'set.user.modirole' : { url : "user/changeUser" , 'pmsCode' : 'set.user.changeUser' , checkpms : 0 },
        'set.user.resetPassword' : { url : "user/resetPassword" , 'pmsCode' : 'set.user.resetPassword' , checkpms : 0 },
        'get.role.userlist' : { url : "user/getUserRoleList" , 'pmsCode' : 'get.user.userRoleList' , checkpms : 0 },
        'get.role.alllist' : { url : "system/getAllUsedRole" , 'pmsCode' : 'get.user.userRoleList' , checkpms : 0 },
        'set.role.deluserrole' : { url : "access/delRole" , 'pmsCode' : 'set.user.delRoles' , checkpms : 0 },
        'set.role.adduserrole' : { url : "access/setRole" , 'pmsCode' : 'get.user.setRoles' , checkpms : 0 },
        'get.user.getOrganizationList' : { url : "system/getOrganizationList" , 'pmsCode' : 'get.user.organizationlist' , checkpms : 0 },
        'get.user.getDepartmentList' : { url : "system/getDepartmentList" , 'pmsCode' : 'get.user.departmentlist' , checkpms : 0 },
        'get.user.getPositionList' : { url : "Common/positionList" , 'pmsCode' : 'get.user.departmentlist' , checkpms : 0 },
        'get.user.leaderList' : { url : "Common/leaderList" , 'pmsCode' : 'get.user.departmentlist' , checkpms : 0 },
        'get.user.addUser' : { url : "User/saveUser" , 'pmsCode' : 'get.user.departmentlist' , checkpms : 0 }
    },
    _opButtons : [
        { text : '新增' , pmsCode : 'user.add' ,recKey : ['id']  , checkpms:0,'permissionCode' : "user.add" },
        //{ text : '批量注销' , pmsCode : 'user.cexiao' ,recKey : ['id']  , checkpms:0 },
        { text : '分配角色' , pmsCode : 'user.modirole' ,recKey : ['id']  ,'permissionCode' : "role.fenpei", checkpms:0 }
    ],
    _lstOpButtons : [
        { text : '查看' , pmsCode : 'user.view' , recKey : ['id']/*所需record之关键字列表*/  , checkpms:1, iconCls : '','permissionCode' : "user.view"},
        { text : '编辑' , pmsCode : 'user.edit' , recKey : ['id']/*所需record之关键字列表*/  , checkpms:1 ,iconCls : '','permissionCode' : "user.edit"},
        { text : '启用' , pmsCode : 'user.start' , recKey : ['id','status']/*所需record之关键字列表*/  , checkpms:1 ,iconCls : '','permissionCode' : "user.start"},
        { text : '禁用' , pmsCode : 'user.stop' , recKey : ['id','status']/*所需record之关键字列表*/  , checkpms:1 ,iconCls : '','permissionCode' : "user.stop"},
        { text : '修改密码' , pmsCode : 'user.resetpassword' , recKey : ['id']/*所需record之关键字列表*/  , hidden : 1 , checkpms:0 ,iconCls : ''}

    ],
    _scFields : [
        {fieldLabel : '用户名' ,labelWidth : 50, name : 'realname' , fieldtype : 'Ext.form.field.Text', pmsCode:'' , checkpms:0   },
        {fieldLabel : '状态' ,labelWidth : 50,editable:false, name : 'status' , fieldtype : 'Ext.form.field.ComboBox', pmsCode:'' , checkpms:0,
            displayField	: 'display',
            valueField 	: "value",
            store : new Ext.data.ArrayStore({
                fields	: 	['value', 'display'],
                data	:	[[1,'启用'],[2,'禁用'],[3,'待审核']]
            })   },
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
        { header: '序号',width: 80,  dataIndex: 'id' } ,
        { header: '姓名',width: 100,   dataIndex: 'realname'} ,
        { header: '状态', width: 80,  dataIndex: 'status' , renderer : function(v){
            if(v == 1){
                return '<font color="#4AB53F">启用</font>';
            }else if(v == 2){
                return '禁用';
            }else if(v == 3){
                return '<font color="red">待审核</font>';
            }
            return v;
        }} ,
        { header: '所属机构', width: 160,  dataIndex: 'organization_name' } ,
        { header: '一级部门', width: 180,  dataIndex: 'firstdepartmentname' },
        { header: '二级部门', width: 180,  dataIndex: 'subdepartmentname' },
        { header: '担任职位', width: 180,  dataIndex: 'position_name' }
    ] ,
    //_addInfo : [],
    _sub_win_defparams : { width:500 , height:470  , maximizable : true },  //子窗口初始参数

    _viewInfo : [] ,

    _modiroleInfo : [
        {
            title   :   '角色分配',
            xtype   :   'panel',
            layout  :   'border',
            items :[
                {comsType : 'ui.view.user.Coms.modiroleLeft'} ,
                {comsType : 'ui.view.user.Coms.modiroleRight'}
            ]
        }
    ],

    _viewInfo : [],

    _publicInfo : [
        {
            typeMode : ["view","edit","add"] ,
            title : '基本信息',
            xtype : 'form',
            myStamp : 'theBasePanel',
            layout : 'column',
            padding : 10,
            autoScroll : true,
            items :[
                {
                    fieldLabel : '用户ID',
                    labelWidth: 70,
                    name : 'id',
                    myStamp : 'id',
                    margin: 6,
                    readOnly : true,
                    hidden : true,
                    columnWidth :1,
                    filedType : 'Text'
                },
                {
                    fieldLabel : '姓名',
                    labelWidth: 70,
                    name : 'realname',
                    margin: 6,
                    allowBlank :false,
                    blankText:"请输入姓名",
                    columnWidth :1,
                    filedType : 'Text'
                },{
                    fieldLabel : '邮箱',
                    labelWidth: 70,
                    name : 'email',
                    columnWidth :1,
                    vtype       : "email",//email格式验证
                    vtypeText   : "不是有效的邮箱地址",//错误提示信息,默认值我就不说了
                    allowBlank :false,
                    blankText:"请输入邮箱",
                    margin: 6,
                    filedType : 'Text'
                },{
                    fieldLabel : '所属机构',
                    labelWidth: 70,
                    name : 'organization_id',
                    editable:false,
                    columnWidth :1,
                    margin: 6,
                    filedType : 'ComboBox',
                    displayField    : 'organization_name',
                    valueField  : "organization_id",
                    store : "{{get_organization_store}}",
                    listeners : "{{get_organization_listeners}}"
                },{
                    fieldLabel : '所属部门',
                    labelWidth: 70,
                    name : 'firstdepartment_id',
                    columnWidth:.5,
                    margin: 6,
                    editable:false,
                    filedType : 'ComboBox',
                    displayField	: 'name',
                    valueField 	: "id",
                    store : "{{get_department_store}}",
                    listeners : "{{get_department_listeners}}"

                },{
                    fieldLabel : '',
                    name : 'department_id',
                    columnWidth:.5,
                    margin: 6,
                    filedType : 'ComboBox',
                    editable:false,
                    displayField	: 'name',
                    valueField 	: "id",
                    store :  "{{get_secenddepartment_store}}",
                    listeners :  "{{get_secenddepartment_listeners}}"

                },{
                    fieldLabel : '担任职位',
                    labelWidth: 70,
                    name : 'position_id',
                    columnWidth :1,
                    margin: 6,
                    editable:false,
                    filedType : 'ComboBox',
                    displayField	: 'name',
                    valueField 	: "id",
                    store :  "{{get_position_store}}"
                },{
                    fieldLabel : '上级领导',
                    labelWidth: 70,
                    columnWidth:1,
                    margin: 6,
                    editable:false,
                    name : 'leader_id',
                    filedType : 'ComboBox',
                    displayField	: 'name',
                    valueField 	: "id",
                    extras : { 'organization_id' : '' },
                    store : "{{get_leadername_store}}"
                }
            ]
        }
    ],

    get_organization_listeners : function(key , params , theform){

        return {
            'change' : function(field){
/*                var firstDepField = theform.getForm().findField('firstdepartment_id');
                var depField = theform.getForm().findField('department_id');
                var leadField = theform.getForm().findField('leader_id');

                var org_value = field.getValue();
                var tmp = firstDepField.getStore().getProxy().extraParams;
                Ext.apply( tmp , {organization_id : org_value} );
                firstDepField.getStore().getProxy().extraParams = tmp;
                firstDepField.getStore().load();
                firstDepField.setValue('');*/
            }
        }
    },

    get_department_listeners : function(key , params , theform){
        return {
            'change' : function(field){
            }
        }
    },

    get_secenddepartment_listeners : function(key , params , theform){
        return {
            'change' : function(field){

            }
        }
    },

    get_leadername_store : function(){
        var me = this;
        return new Ext.data.ArrayStore({
            fields	: 	['id', 'name'] ,
            proxy: Ext.create( 'ui.extend.base.Ajax',{
                url :  me.urls.get("get.user.leaderList").url // me.ctrl.$getUrlstrByUrlcode("get.user.leaderList") //'../Product/getSecondCategory'
            })
        })
    },

    get_position_store : function(key , params , theform){  //职位列表
        var me = this;
        return new Ext.data.ArrayStore({
            fields  :   ['id', 'name'],
            proxy: Ext.create( 'ui.extend.base.Ajax',{
                extraParams : {department_id : 0}, //department_id
                url : me.urls.get("get.user.getPositionList").url //'../system/getDepartmentList'
            })
        })
    },

    get_department_store  : function( key , params , theform){  //一级部门
        var me = this;
        return new Ext.data.ArrayStore({
            fields  :   ['id', 'name'],
            proxy: Ext.create( 'ui.extend.base.Ajax',{
                extraParams : { option :  1 , pid : 0 },
                url : me.urls.get("get.user.getDepartmentList").url //'../system/getDepartmentList'
            })
        })
    },

    get_secenddepartment_store : function(){  //二级部门
        var me = this;
        return new Ext.data.ArrayStore({
            fields  :   ['id', 'name'] ,
            proxy: Ext.create( 'ui.extend.base.Ajax',{
                extraParams : { option :  1 } ,
                url :  me.urls.get("get.user.getDepartmentList").url  //me.ctrl.$getUrlstrByUrlcode('get.user.getOrganizationList') //'../system/getOrganizationList'
            })
        })
    },

    get_organization_store : function( key , params , theform){ //机构
        var me = this;
        return Ext.create( 'Ext.data.ArrayStore', {
            fields  :   ['id', 'organization_name'] ,
            autoLoad : {params : {option : 1 }},
            proxy: Ext.create( 'ui.extend.base.Ajax',{
                extraParams : { option :  1 } ,
                url :  me.urls.get("get.user.getOrganizationList").url  //me.ctrl.$getUrlstrByUrlcode('get.user.getOrganizationList') //'../system/getOrganizationList'
            })
        })
    }

});