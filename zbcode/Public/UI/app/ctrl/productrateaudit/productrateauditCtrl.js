/**
 * Created by Administrator on 2015/12/7 0007.
 */

Ext.define('ui.ctrl.productrateaudit.productrateauditCtrl', {
    extend: 'ui.extend.baseClass.baseCtrl',
    requires : [
        'ui.ctrl.productrateaudit.productrateauditConf',
        'ui.view.productrateaudit.productrateauditView',
        'ui.view.productrateaudit.Coms.viewPanel'
    ],
    constructor : function (cfg){
        this.modelConf = Ext.create('ui.ctrl.productrateaudit.productrateauditConf');
        this.callParent(arguments);
    },

    init:function(){
        this.control({      //这里的this相当于这个控制层
            'productrateauditpagecentergrid' : {
                render : function(e){
                    //e.grid.getStore().load();
                }
            }
        });
    },
    //配置功能按钮功能  对应Conf类中定义的operationButtons > pmsCode { text : '新增角色+' , pmsCode : 'productrateaudit.add' }
    //‘.’替换为 $  ,方法前加__
    __productrateaudit$add : function( btna , params ){
        var me = this;
        var pmsCode = btna.pmsCode?btna.pmsCode:($(btna).attr('pmscode')?$(btna).attr('pmscode'):null);
        if(!pmsCode) return;
       me.$showOptionsPanel('add', pmsCode ,function(panel ,win){
            //这里对panel进行处理
        },me.$getConfig('_sub_win_defparams'));
    },

    //listbtn  list的处理按钮事件，方法名前 加 '__'  ，根据权限pmscode指定方法名， .更换为$...方法前加__
    __productrateaudit$view : function( btna , params ){
        var me = this;
        var view = this.$getView();
        Ext.apply(params,{callback: function(panel,win){
            //me.$addWindowToFather(win);
        }});
        this.$fireModuleEvents('workplatform','view',params);
    },
    __productrateaudit$approve : function( btna , params ){
        var me = this;
        params = me.$getArrayOne(params);
        
        me.$askYestNo({
            msg : '确认同意吗',
            yes : function(){
                var win = Ext.create("Ext.window.Window",{
                    title : "请输入同意理由文本",
                    layout : 'fit',
                    width : 400,
                    height: 350,
                    buttons : [
                        {
                            xtype : 'button',
                            text : '提交',
                            handler : function(){
                                var form = win.items.items[0];
                                form  = form.getForm();
                                var par = form.getValues();
                                var post = {id : params.id }
                                Ext.apply(post , par );

                                me.$requestAjax({
                                    url     :   me.$getUrlstrByUrlcode('set.productrateaudit.approve'),
                                    method :    'POST',
                                    params :    post,
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
                                    emptyText : "请输入同意理由文本"
                                }
                            ]
                        }
                    ]
                });
                win.show();
            }
        });
    },
    __productrateaudit$reject : function( btna , params ){
        var me = this;
        params = me.$getArrayOne(params);
        
        me.$askYestNo({
            msg : '确认退回吗',
            yes : function(){
                

                var win = Ext.create("Ext.window.Window",{
                    title : "请输入退回原因",
                    layout : 'fit',
                    width : 400,
                    height: 350,
                    buttons : [
                        {
                            xtype : 'button',
                            text : '确认退回',
                            handler : function(){
                                var form = win.items.items[0];
                                form  = form.getForm();
                                var par = form.getValues();
                                Ext.apply(params , par );
                                me.$requestAjax({
                                    url     :   me.$getUrlstrByUrlcode('set.productrateaudit.reject'),
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
                                    fieldLable : "退回原因：",
                                    emptyText : "请输入退回原因"
                                }
                            ]
                        }
                    ]
                });
                win.show();
            }
        });

    },
    __productrateaudit$edit : function( btna , params ){
        var me = this;
        var pmsCode = btna.pmsCode?btna.pmsCode:($(btna).attr('pmscode')?$(btna).attr('pmscode'):null);
        if(!pmsCode) return;
        var param  = params || {};
        Ext.apply( param , { pmsCode : pmsCode} );

        me.$showOptionsPanel('edit', param ,function( panel ,win ){
            //这里对panel进行处理
        },me.$getConfig('_sub_win_defparams'));
    },
   /* 接口：
    * 信息面板里的 按钮 事件
    * 方法名规则  __ + 信息面板类型(view,edit,add等) + Panel + $ + 按钮定义的fnName .
    * 回参为 按钮和 本信息面板自己
    */
    __editPanel$save : function( btn , infopanel ){
        var me = this;
        var editparams = me.$getFormsParams(infopanel);

        me.$requestFromDataAjax(
            'get.productrateaudit.edit',
            editparams,
            null,
            function(params){
                if(typeof(infopanel.ownerCt) != 'undefined' && typeof(infopanel.ownerCt.close) === 'function'){
                    infopanel.ownerCt.close();
                    me.$reloadViewGrid();
                }
            }
        );
    },

    /* 接口：
     * 功能信息面板子form的 render 处理
     * 命名规则： __  +  optype(操作类型) + _sub_render
     */
    __view_sub_render : function(theform){
        alert(theform.getForm());
    },

    /* 接口：
     * 功能信息面板的 render 处理
     * 命名规则： __  +  optype(操作类型) + _main_render
     * 作用域 ctrl
     */
    __view_main_render : function(thepanel){
        var me = this;
        var mydata = thepanel.getMyDatas();
        me.$requestFromDataAjax(
            'get.productrateaudit.view',
            mydata,
            thepanel
        );
    },

    __edit_main_render : function(thepanel){
        var me = this;
        var mydata = thepanel.getMyDatas();
        me.$requestFromDataAjax(
            'get.productrateaudit.view',
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
        if(field.name === 'update_time') field.disabled = true;
    },
    __add_fieldinit : function(field){
        if(!field) return;
        if(field.name === 'update_time') field.hide();
    },
    __check_list_btn_event : function(cfg ,record){
        if(cfg.pmsCode === 'productrateaudit.approve'){
            if( record.data.fee_status == 4 ) return false;
        }
        if(cfg.pmsCode === 'productrateaudit.approve'){
            if(record.data.is_agree == 1) return false;
        }
        if(cfg.pmsCode === 'productrateaudit.reject'){
            if(record.data.fee_status == 4 ) return false;
        }

        return true;
    }

});