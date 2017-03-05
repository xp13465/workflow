/**
 * Created by Administrator on 2015/12/7 0007.
 * operationButtons : 操作按钮的定义
 * searchFileds     : 查询字段的定义
 * listOperationButtons : 条目操作按钮的定义
 */
Ext.define('ui.ctrl.accountaudit.accountauditConf',{
    extend: 'ui.extend.baseClass.baseConf',
    modelName : "注册帐号审核",
    topicalName : '注册帐号审核',
    modelCode : 'accountaudit',
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
        'get.accountaudit.list' : { url : "user/getRegisterUserList" , 'pmsCode' : 'get.accountaudit.list' , checkpms : 0 },
        'get.accountaudit.view' : { url : "system/getaccountauditInfo" , 'pmsCode' : 'get.accountaudit.info' , checkpms : 0 },
        'get.accountaudit.edit' : { url : "system/saveaccountaudit" , 'pmsCode' : 'set.accountaudit.info' , checkpms : 0 },
        'set.accountaudit.reject' : { url : "user/changeUser" , 'pmsCode' : 'set.accountaudit.info' , checkpms : 0 }
    },
    _opButtons : [

    ],
    _lstOpButtons : [
        { text : '角色分配' , pmsCode : 'accountaudit.view' , recKey : ['id']/*所需record之关键字列表*/  , 'permissionCode' : "role.fenpei"   , checkpms:1, iconCls : ''},
        // { text : '重置密码' , pmsCode : 'accountaudit.edit' , recKey : ['id']/*所需record之关键字列表*/  , checkpms:1 ,iconCls : ''},
        { text : '拒绝' , pmsCode : 'accountaudit.reject' , recKey : ['id']/*所需record之关键字列表*/   , 'permissionCode' : "accountaudit.refuse"  , checkpms:1 ,iconCls : ''}
    ],
    _scFields : [
        {fieldLabel : '' ,labelWidth : 50, name : 'name' , fieldtype : 'Ext.form.field.Text', pmsCode:'' , checkpms:0   },
        {text : '查询' ,iconCls : '', fieldtype : 'Ext.button.Button'  , submitBtn : true , clickFn : '$search', pmsCode:'' , checkpms:0 }
    ],

    /*
    * 配置信息面板里的按钮，并制定事件后缀： fnName
    * */
    _infoPanelButtons : {
        'all' : [],
        'view' : [],
        'edit' : [{text : '确定' , fnName : 'save'}],
        'add' : [{text : '取消' , fnName : 'save'}]
    },
    /*
     * grid数据列表的头部定义*/
    _listGridHeader : [
        { header: '序号',width: 80,  dataIndex: 'id' } ,
        { header: '姓名',width: 100,   dataIndex: 'realname'} ,
        { header: '所属机构', width: 160,  dataIndex: 'organization_name' } ,
        { header: '一级部门', width: 180,  dataIndex: 'firstdepartmentname' },
        { header: '二级部门', width: 180,  dataIndex: 'subdepartmentname' },
        { header: '担任职位', width: 180,  dataIndex: 'position_name' }
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
                    fieldLabel : '姓名',
                    labelWidth: 70,
                    name : 'name',
                    margin: 6,
                    columnWidth :1,
                    filedType : 'Text'
                },{
                    fieldLabel : '邮箱',
                    labelWidth: 70,
                    name : 'email',
                    columnWidth :1,
                    margin: 6,
                    filedType : 'Text'
                },{
                    fieldLabel : '所属机构',
                    labelWidth: 70,
                    name : 'organization',
                    columnWidth :1,
                    margin: 6,
                    filedType : 'ComboBox',
                    editable:false,
                    displayField	: 'display',
                    valueField 	: "value",
                    value : 1,
                    store : new Ext.data.ArrayStore({
                        fields	: 	['value', 'display'],
                        data	:	[[1,'资邦财富']]
                    })
                },{
                    fieldLabel : '所属部门',
                    labelWidth: 70,
                    name : 'firstdepartment',
                    columnWidth:.5,
                    margin: 6,
                    editable:false,
                    editable:false,
                    filedType : 'ComboBox',
                    displayField	: 'display',
                    valueField 	: "value",
                    value : 1,
                    store : new Ext.data.ArrayStore({
                        fields	: 	['value', 'display'],
                        data	:	[[1,'战略发展部']]
                    })
                },{
                    fieldLabel : '',
                    name : 'subdepartment',
                    columnWidth:.5,
                    margin: 6,
                    filedType : 'ComboBox',
                    displayField	: 'display',
                    valueField 	: "value",
                    value : 1,
                    store : new Ext.data.ArrayStore({
                        fields	: 	['value', 'display'],
                        data	:	[[1,'发展部'],[2,'投资部']]
                    })
                },{
                    fieldLabel : '担任职位',
                    labelWidth: 70,
                    name : 'position',
                    columnWidth :1,
                    margin: 6,
                    editable:false,
                    filedType : 'ComboBox',
                    displayField	: 'display',
                    valueField 	: "value",
                    value : 1,
                    store : new Ext.data.ArrayStore({
                        fields	: 	['value', 'display'],
                        data	:	[[1,'经理'],[2,'产品专员']]
                    })
                },{
                    fieldLabel : '分管领导',
                    labelWidth: 70,
                    columnWidth:1,
                    editable:false,
                    margin: 6,
                    name : 'leadername',
                    filedType : 'ComboBox',
                    displayField	: 'display',
                    valueField 	: "value",
                    value : 1,
                    store : new Ext.data.ArrayStore({
                        fields	: 	['value', 'display'],
                        data	:	[[1,'xxx'],[2,'xxx']]
                    })
                }
            ]
        }
    ]
});