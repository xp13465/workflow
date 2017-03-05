/**
 * Created by Administrator on 2015/12/7 0007.
 * operationButtons : 操作按钮的定义
 * searchFileds     : 查询字段的定义
 * listOperationButtons : 条目操作按钮的定义
 * initwindowparams : 窗口默认参数
 * urls : 提供 get() 和 set() 方法
 * */

Ext.define('ui.extend.baseClass.baseConf',{
    extend: 'Ext.util.Observable',
    infoIconCls : {view:'',edit:'',add:''},
    constructor : function(){
        this.callParent(arguments);
        var me = this;
        var screenWidth = window.screen.availWidth;
        var screenHeight = window.screen.availHeight;
        this.initwindowparams = {
            title : this.modelName,
            minHeight : 300,
            minWidth : 300,
            resize : true,
            //maximized : true,
            constrain :true,
            maximizable : true,
            minimizable : true,
            width: (screenWidth-200),
            height : (screenHeight-150),
            iconCls: 'accordion',
            animCollapse: false,
            bodyBorder: Ext.themeName !== 'neptune'
        };
        this.urlprefix = '/Admin/';
        //初始值,放置模块所需要所有url ，及权限
        this.urlslist  = {
            'check.permission' : { url : "access/checkPermission" , 'pmsCode' : '' , checkpms : 0 , sm : '权限检测公共url'}
        };
        //模块需要额外检测的权限列表
        this.permissionCheckList = [];
        //模块所需要的操作按钮
        //{ text : '' , handler : emptyFn , callback : emptyFn }
        this.operationButtons = [];
        //模块所需要的查询条件配置
        //{ text : '' , handler : emptyFn , callback : emptyFn }
        this.searchFileds = [];
        //条目操作按钮的定义
        this.listOperationButtons = [];

        this.urls = function(){
            return {
                get : function(code){
                    if(typeof(me.urlslist[code]) === 'string'){
                        return me.urlprefix + me.urlslist[code];
                    }else if(typeof(me.urlslist[code]) == 'object'){
                        var ret = {};
                        Ext.apply(ret,me.urlslist[code]);        //将对象加入前缀后返回
                        ret.url = me.urlprefix + ret.url;
                        return  ret;
                    }
                },
                set : function(code , url){
                    me.urlslist[code] = url;
                }
            }
        }();
//一下定义summary类型容器所需配置
        this.loadModelsList = [];

        //定义主grid的右键菜单
        this.gridRightMenuConf = [
            {text : '刷新' , pmsCode:'refresh' , checkpms:0 , iconCls : ''}
        ];

        this.infoPanelButtons = {};

        this.fieldClassNameArr = {
            'Text' : 'Ext.form.field.Text',
            'Number' : 'Ext.form.field.Number',
            'ComboBox' : 'Ext.form.field.ComboBox',
            'TextArea' : 'Ext.form.field.TextArea',
            'Radio' : 'Ext.form.field.Radio',
            'Checkbox' : 'Ext.form.field.Checkbox',
            'Button' : 'Ext.button.Button',
            'DateTime' : 'Ext.form.field.Date',
            'Panel' : 'Ext.panel.Panel',
            'RadioGroup' : 'Ext.form.RadioGroup'
        };
    },

    $getInitWinParams : function(){
        var screenWidth = window.screen.availWidth;
        var screenHeight = window.screen.availHeight;
        this.initwindowparams = {
            title : this.modelName,
            minHeight : 300,
            minWidth : 300,
            resize : true,
            //maximized : true,
            constrain :true,
            maximizable : true,
            minimizable : true,
            width: (screenWidth-400),
            height : (screenHeight-200),
            iconCls: 'accordion',
            animCollapse: false,
            bodyBorder: Ext.themeName !== 'neptune'
        };
    },

    $getModelsListArr : function(){
        return this.loadModelsList?this.loadModelsList:[];
    },

    getDefaultWinSize : function(){
        var screenWidth = window.screen.availWidth;
        var screenHeight = window.screen.availHeight;
        return {
            width: (screenWidth-400),
            height : (screenHeight-300)
        }
    },

    $extendConfigArr : function(type , params){
        if(typeof(this[type]) === 'undefined')  this[type] = [];
        this[type] = this[type].concat(params);
        return this[type];
    },

    $extendConfigJson : function(type , params){
        if(typeof(this[type]) === 'undefined')  this[type] = {};
        Ext.apply(this[type] , params);
        return this[type];
    }
});