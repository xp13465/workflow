/**
 * Created by Administrator on 2015/12/21 0021.
 */
//用于编辑查看等操作的信息录入tab
Ext.define('ui.extend.baseClass.coms.baseBusTabPanel',{
    extend: 'ui.extend.base.Panel',
    layout : 'fit',
    //border : 1,
    enableTabScroll : true,
    baseCls : 'my-panel-no-border',
    activeTab: 0,
    requires : [
        'ui.extend.base.TabPanel',
        'ui.extend.base.Form',
        'ui.extend.base.Button'
    ],

    constructor : function(){
        var me = this;
        this.buttons = [
            {text : '关闭' ,myStamp : "closeButton", handler : function(){
                if(typeof(me.ownerCt.close)=='function') me.ownerCt.close();
            }}
        ];
        this.callParent(arguments);
    },

    initComponent : function(){
        this.tabpanel = Ext.create('ui.extend.base.TabPanel',{
            items : []
        });
        this.items = [this.tabpanel];
        this.callParent(arguments);
        //if(this.ctrl && this.ctrl.)
    },

    addPanel : function (panel){
        this.tabpanel.add(panel);
        if (this.tabpanel.items.length == 1){
            this.tabpanel.setActiveTab(panel);
        };
        this.doLayout();

    },

    getFormsList : function(){
        return this.formsList;
    },
    getParams : function(){
        var formlist = this.getFormsList();
        var params = {};var tmp = null;
        for(var i=0 ; i<formlist.length; i++){
            if(typeof(formlist[i].getForm) === 'function') {
                tmp = formlist[i].getForm().getFieldValues();
                Ext.apply(params,tmp);
            }
        }
        return params;
    },
    getButtonsList : function(){
        return this.buttons;
    },

    getMyDatas : function(){
        return this.myData?this.myData:{};
    },

    checkValid : function(){
        var tmparr = [];
        var formlist = this.getFormsList();
        var flag = true;
        for(var i in formlist){
            if(typeof(formlist[i].getForm) === 'function'){
                flag = formlist[i].getForm() && flag;
            }
        }
        return flag;
    },

    findTabPanel : function(option){
        if(!option) return null;
        var formlist = this.getFormsList();
        var key ='', value = null;
        var tmparr = [];var flag = true;

        for(var i in formlist){
            tmparr = [];
            for(var k in option){
                tmparr.push((formlist[i][k] === option[k]));
            }
            flag = true;
            for(k in tmparr){
                flag = (flag && tmparr[k]);
            }
            if(flag) {
                return formlist[i];
            }
        }
        return null;
    }
});