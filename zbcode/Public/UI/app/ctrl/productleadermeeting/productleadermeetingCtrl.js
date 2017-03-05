/**
 * Created by Administrator on 2015/12/7 0007.
 */

Ext.define('ui.ctrl.productleadermeeting.productleadermeetingCtrl', {
    extend: 'ui.extend.baseClass.baseCtrl',
    requires : [
        'ui.ctrl.productleadermeeting.productleadermeetingConf',
        'ui.view.productleadermeeting.productleadermeetingView',
        'ui.view.productleadermeeting.Coms.viewPanel'
    ],
    constructor : function (cfg){
        this.modelConf = Ext.create('ui.ctrl.productleadermeeting.productleadermeetingConf' , {ctrl : cfg.ctrl});
        this.callParent(arguments);
    },

    init : function(){
        this.control({      //这里的this相当于这个控制层
            'productleadermeetingpagecentergrid' : {
                render : function(e){
                    //e.grid.getStore().load();
                }
            }
        });
    },

    //listbtn  list的处理按钮事件，方法名前 加 '__'  ，根据权限pmscode指定方法名， .更换为$...方法前加__
    __productleadermeeting$view : function( btna , params ){
        var me = this;
        var view = this.$getView();
        Ext.apply(params,{callback: function(panel,win){
            //me.$addWindowToFather(win);
        }});
        this.$fireModuleEvents('workplatform','view',params);
    },

   /* 接口：
    * 信息面板里的 按钮 事件
    * 方法名规则  __ + 信息面板类型(view,edit,add等) + Panel + $ + 按钮定义的fnName .
    * 回参为 按钮和 本信息面板自己
    */
    __editPanel$save : function( btn , infopanel ){
    },
    /* 接口：
     * 功能信息面板子form的 render 处理
     * 命名规则： __  +  optype(操作类型) + _sub_render
     */
    __view_sub_render : function(theform){
        //alert(theform.getForm());
    },

    /* 接口：
     * 功能信息面板的 render 处理
     * 命名规则： __  +  optype(操作类型) + _main_render
     * 作用域 ctrl
     */
    __all_main_render : function(thepanel){


    },
    //表单数据加载之后
    __all_post_after_main_event : function(thepanel){

    },
/*SUBSUBSUBSUB*/
/*添加字段及编辑删除自定义字段的事件定义*/
/*添加字段及编辑删除自定义字段的事件定义--end*/
/*SUBSUBSUBSUB-----END*/

    __view_main_render : function(thepanel){
        var me = this;
        var mydata = thepanel.getMyDatas();
        me.$requestFromDataAjax(
            'get.productleadermeeting.view',
            mydata,
            thepanel,
            function(params){
                // console.log(params);
            }
        );
    },

    __add_main_render : function(thepanel){
        var me = this;
        // var mydata = thepanel.getMyDatas();
        // me.$requestFromDataAjax(
        //     'get.productleadermeeting.view',
        //     mydata,
        //     thepanel,
        //     function(params){
        //         console.log(thepanel);
        //         console.log(params);
        //     }
        // );
    },

    __edit_main_render : function(thepanel){
        var me = this;
        var mydata = thepanel.getMyDatas();
        me.$requestFromDataAjax(
            'get.productleadermeeting.view',
            mydata,
            thepanel
        );
    },

    /* 接口：
     * 功能信息面板的 字段组件的 初始 方法
     * 命名规则： __  +  optype(操作类型) + _fieldinit
     */
    __view_fieldinit : function(field){
        if(field) field.readOnly = true;
    },

    __edit_fieldinit : function(field){
        if(!field) return;
        if(field.name === 'update_time') this.$setFieldStyle(field , 'disabled');
        if(field.name === 'firstCateValue') this.$setFieldStyle(field , 'readonly');
        if(field.name === 'category_id') this.$setFieldStyle(field , 'readonly');
        if(field.name === 'end_time') this.$setFieldStyle(field , 'disabled');
        if(field.name === 'add_time') this.$setFieldStyle(field , 'disabled');


    },

    __add_fieldinit : function(field){
        if(!field) return;
        if(field.name === 'update_time') this.$setFieldStyle(field , 'hidden');
        if(field.name === 'add_time') this.$setFieldStyle(field , 'hidden');
        if(field.name === 'creater') this.$setFieldStyle(field , 'hidden');
    },

    __all_fieldinit : function(field){
        var me = this;
        if(field.name === 'update_time') this.$setFieldStyle(field , 'disabled');
        if(field.name === 'add_time') this.$setFieldStyle(field , 'disabled');
        if(field.name === 'end_time') this.$setFieldStyle(field , 'readonly');


        if(field.name == "contact" || field.name == "contact_tel"){
            me.$checkPms("product.content" ,function(flag){
                if(!flag){
                    if(field) me.$setFieldStyle(field , 'disabled');
                }
            });
        }
    },

    __check_list_btn_event : function(cfg ,record){
        if(cfg.pmsCode === 'productleadermeeting.submit' || cfg.pmsCode === 'productleadermeeting.unsubmit'){
            if(record.data.status != 99  || record.data.is_check == 1) return false;
        }
        return true;
    }

});