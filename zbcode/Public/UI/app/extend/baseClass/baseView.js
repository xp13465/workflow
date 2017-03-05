/**
 * Created by Administrator on 2015/12/7 0007.
 */
Ext.define('ui.extend.baseClass.baseView', {
    extend: 'Ext.panel.Panel',
    _$theFormGridObj : {},   //指向本view的form 与 grid 对象。 及其他需要只想的对象

    constructor : function(cfg){
        var params = cfg || {};
        Ext.apply(this,params);
        Ext.apply(this,{ border : 0});
        Ext.apply(this , this.ctrl.$getConfig('initwindowparams'));//params.modelConf.initwindowparams);
        this.callParent(arguments);

        this.on('render' , function(themainview){
            var opbuttons = themainview.buttonArray || [];
            if(opbuttons && opbuttons.length ==0 && typeof(themainview.getPageHeader) === 'function') themainview.getPageHeader().hide();
        });
    },

    initComponent : function(){
        this.callParent(arguments);
        this.$initButtons();
        this.$initFieldList();
    },

    init: function() {
    },

    initFormGridC : function(obj){
        var me =  this;
        var def = {
            formPanel : Ext.emptyFn,
            gridPanel : Ext.emptyFn
        }
        Ext.apply(def,obj);

        me._$theFormGridObj = def;

        $.each(me._$theFormGridObj, function(title , item) {
            var fnname = title.replace(/(\w)/,function(v){return v.toUpperCase()});
            var str = "me.get" + fnname + "= function(){return me._$theFormGridObj."+title+";}";
            eval("("+str+")");
        });
    } ,

    $initButtons : function (){
        var me  = this;
        var ctrl = this.ctrl;
        var buttonslist = ctrl.$getConfig('operationButtons');
        var buttonArray = [];
        for(var i=0 ; i < buttonslist.length ; i++){
            if(!isCheckPermissionCode(buttonslist[i]) || (isCheckPermissionCode(buttonslist[i]) && ctrl.$checkPms(buttonslist[i].permissionCode))){
                var btncfg = buttonslist[i];
                if(i>0 && !btncfg.margin){
                    Ext.apply(btncfg,{margin : '0 0 0 15'});
                }
                var btn = Ext.create('Ext.Button',btncfg);
                buttonArray.push(btn);
            }
        }
        me.buttonArray = buttonArray;
        me.$buttonsAddEvents(buttonArray);
    },

    $buttonsAddEvents :function(buttonArray){ //在此处定义按钮的 事件
        var me = this;
        var ctrl = me.ctrl;

        var btnlist  = buttonArray?buttonArray:ctrl.buttonsArray;

        //alert(btnlist.length);
        if(btnlist.length<=0) {
            me.pageheader.setVisible(false);
            return;
        }
        btnlist.forEach(function(btn){
            var pmscode = btn.pmsCode;
            pmscode = pmscode.replace(/\./, "$");

            if(typeof(ctrl['__all_button_Event']) === 'function'){
                btn.on('click',function(){
                    ctrl['__all_button_Event'].call(ctrl,btn,btn.pmsCode);
                })
            };
            if(typeof(ctrl["__"+pmscode]) === 'function'){
                btn.on('click',function(){
                    ctrl["__"+pmscode].call(ctrl, btn, btn.pmsCode);
                })
            }else{
                btn.on('click',ctrl.__);
            }
            me.pageheader.add(btn);
        })
    },

    $initFieldList : function (){
        var me  = this;
        var ctrl = me.ctrl;
        var fieldlist = ctrl.$getConfig('searchFileds');
        var fieldsArray = [];
        var formPanel = me.getFormPanel();

        for(var i=0 ; i < fieldlist.length ; i++){
            if(!isCheckPermissionCode(fieldlist[i]) || (isCheckPermissionCode(fieldlist[i]) && ctrl.$checkPms(fieldlist[i].premissionCode))){
                var fieldcfg = fieldlist[i];

                if(i>0 && !fieldcfg.margin){
                    Ext.apply(fieldcfg,{margin : '0 0 0 10'});
                }

                Ext.apply(fieldcfg,{ labelAlign : 'right'}); //所有字段默认配置加入
                if(fieldcfg.submitBtn){
                    Ext.apply( fieldcfg, {  handler : function(b){
                            ctrl.$searchDataList.call(ctrl , b  ,ctrl);
                        }
                    });
                }

                var field  = Ext.create( fieldcfg.fieldtype ,fieldcfg );

                formPanel.add(field);
                fieldsArray.push(field);
            }
            this.fieldsArray = fieldsArray;
        }

    }
});