/**
 * Created by Administrator on 2015/12/7 0007.
 */

Ext.define('ui.ctrl.productmymeeting.productmymeetingCtrl', {
    extend: 'ui.extend.baseClass.baseCtrl',
    requires : [
        'ui.ctrl.productmymeeting.productmymeetingConf',
        'ui.view.productmymeeting.productmymeetingView',
        'ui.view.productmymeeting.Coms.viewPanel'
    ],
    constructor : function (cfg){
        this.modelConf = Ext.create('ui.ctrl.productmymeeting.productmymeetingConf' , {ctrl : cfg.ctrl});
        this.callParent(arguments);
    },

    init : function(){
        this.control({      //这里的this相当于这个控制层
            'productmymeetingpagecentergrid' : {
                render : function(e){
                    //e.grid.getStore().load();
                }
            }
        });
    },

    //配置功能按钮功能  对应Conf类中定义的operationButtons > pmsCode { text : '新增角色+' , pmsCode : 'productmymeeting.add' }
    //‘.’替换为 $  ,方法前加__
    __productmymeeting$add : function( btna , params ){
        var me = this;
        var view = this.$getView();
        Ext.apply(params,{callback: function(panel,win){
            //me.$addWindowToFather(win);
        }});
        this.$fireModuleEvents('workplatform','add',params);
    },

    //listbtn  list的处理按钮事件，方法名前 加 '__'  ，根据权限pmscode指定方法名， .更换为$...方法前加__
    __productmymeeting$view : function( btna , params ){
        var me = this;
        var view = this.$getView();
        Ext.apply(params,{callback: function(panel,win){
            //me.$addWindowToFather(win);
        }});
        this.$fireModuleEvents('workplatform','view',params);
    },

    __productmymeeting$edit : function( btna , params ){
        var me = this;
        var view = this.$getView();
        Ext.apply(params,{callback: function(panel,win){
            //me.$addWindowToFather(win);
        }});
        this.$fireModuleEvents('workplatform','edit',params);
    },

    __productmymeeting$submit : function(btna , params){
        var me = this;
        var pmsCode = btna.pmsCode?btna.pmsCode:($(btna).attr('pmscode')?$(btna).attr('pmscode'):null);
        var records = me.$getGridSelections();
        me.__sub_submit_product.call(me,params);
    },

    __productmymeeting$unsubmit : function( btna , params ){
        var me = this;
        if(!btna.pmsCode){
            if($(btna).hasClass('grid-list-operation-btns-disable')) return;
        }
        var pmsCode = btna.pmsCode?btna.pmsCode:($(btna).attr('pmscode')?$(btna).attr('pmscode'):null);
        var records = me.$getGridSelections();
        me.__sub_submit_product.call(me,params , 'un');
    },

    __productmymeeting$cancel : function( btna , params ){
        var me = this;
        var pmsCode = btna.pmsCode?btna.pmsCode:($(btna).attr('pmscode')?$(btna).attr('pmscode'):null);
        //var records = me.$getGridSelections();
        me.__sub_cexiao_product.call(me,params);
    },

    __sub_cexiao_product : function(params){
       var me = this;
        me.$askYestNo({
            msg : '确认撤销吗?',
            yes : function(){
                me.$requestAjax({
                    url     :   me.$getUrlstrByUrlcode('get.productcancel'),
                    method :	'POST',
                    params :	params,
                    scope  :	me,
                    backParams: {} ,
                    callback   :	function(response , backParams){
                        //console.log(response.responseText);
                        var param = Ext.decode(response.responseText);
                        if(param.status > 0){
                            Ext.MessageBox.alert('成功','撤销成功！');
                            me.$reloadViewGrid();
                        }
                    }
                });
            }
        });
    },

    __sub_submit_product : function(params , type){
        var me = this;
        if(!params.id){
            Ext.Msg.show({
                title : '失败',
                msg  : '请选择产品！',
                icon: Ext.Msg.ERROR,
            });
            return;
        }

        var me = this;
        params = me.$getArrayOne(params);

        var thetip = type=='un'?'不通过':"通过";

        me.$askYestNo({
            msg : '确认'+thetip+'吗',
            yes : function(){

                var win = Ext.create("Ext.window.Window",{
                    title : "请输入"+thetip+"原因",
                    layout : 'fit',
                    width : 400,
                    height: 350,
                    buttons : [
                        {
                            xtype : 'button',
                            text : '确认'+thetip+'',
                            handler : function(){
                                var form = win.items.items[0];
                                form  = form.getForm();
                                var par = form.getValues();
                                Ext.apply(params , par );
                                var url = me.$getUrlstrByUrlcode('get.productsubmit');
                                if(type && type=='un'){
                                    url = me.$getUrlstrByUrlcode('get.productunsubmit');
                                }

                                me.$requestAjax({
                                    url     :   url,
                                    method :    'POST',
                                    params :    params,
                                    scope  :    me,
                                    backParams: {},
                                    callback   :    function(response , backParams){
                                        //console.log(response.responseText);
                                        var param = Ext.decode(response.responseText);
                                        if(param.status > 0){
                                            Ext.MessageBox.alert('成功','操作成功！');
                                            me.$reloadViewGrid();
                                        }
                                    }
                                });
                                win.close();
                            }
                        }
                    ],
                    items : [
                        {
                            xtype : 'form',
                            layout : 'fit',
                            items : [
                                {
                                    xtype : 'textarea',
                                    height : 80 ,
                                    name : 'reason',
                                    fieldLable : ""+thetip+"原因：",
                                    emptyText : "请输入"+thetip+"原因"
                                }
                            ]
                        }
                    ]
                });
                win.show();
            }
        });

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
            'get.productmymeeting.view',
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
        //     'get.productmymeeting.view',
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
            'get.productmymeeting.view',
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
        if(cfg.pmsCode === 'productmymeeting.submit' || cfg.pmsCode === 'productmymeeting.unsubmit'){
            if(record.data.status != 99  || record.data.is_check == 1) return false;
        }
        return true;
    }

});