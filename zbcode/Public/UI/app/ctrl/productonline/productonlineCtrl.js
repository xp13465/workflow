/**
 * Created by Administrator on 2015/12/7 0007.
 */

Ext.define('ui.ctrl.productonline.productonlineCtrl', {
    extend: 'ui.extend.baseClass.baseCtrl',
    requires : [
        'ui.ctrl.productonline.productonlineConf',
        'ui.view.productonline.productonlineView',
        'ui.view.productonline.Coms.viewPanel'
    ],
    views : [
        'ui.view.productonline.productonlineView'
    ],

    refs:[
        {ref:'productonlineWin' , selector:'productonlinewindow'}
    ],

    constructor : function (cfg){
        this.modelConf = Ext.create('ui.ctrl.productonline.productonlineConf');
        this.callParent(arguments);
    },

    init:function(){
        this.control({      //这里的this相当于这个控制层
            'productonlinepagecentergrid' : {
                render : function(e){
                    //e.grid.getStore().load();
                }
            }
        });
    },

    //配置功能按钮功能  对应Conf类中定义的operationButtons > pmsCode { text : '新增角色+' , pmsCode : 'productonline.add' }
    //‘.’替换为 $  ,方法前加__
    __productonline$add : function( btna , params ){
        var me = this;
        var pmsCode = btna.pmsCode?btna.pmsCode:($(btna).attr('pmscode')?$(btna).attr('pmscode'):null);
        if(!pmsCode) return;
       me.$showOptionsPanel('add', pmsCode ,function(panel ,win){
            //这里对panel进行处理
        },me.$getConfig('_sub_win_defparams'));
    },
    __productonline$sale : function( btna , params ){
        var me = this;
        params = me.$getArrayOne(params);
        console.log(params);

        me.$askYestNo({
            msg : '确定继续销售该产品？',
            yes : function(){
                if(params.status == 8){
                    Ext.Msg.show({
                        title : '失败',
                        msg  : '已经是销售状态！',
                        icon: Ext.Msg.ERROR,
                    });
                    return;
                }
                // params.status = 8;
                me.$askYestNo({
                    msg : '确认提交吗',
                    yes : function(){
                        me.$requestAjax({
                            url     :   me.$getUrlstrByUrlcode('set.productonline.sale'),
                            method :    'POST',
                            params :    {product_id:params.id},
                            scope  :    me,
                            backParams: {},
                            callback   :    function(response , backParams){
                                //console.log(response.responseText);
                                var param = Ext.decode(response.responseText);
                                if(param.status > 0){
                                    Ext.MessageBox.alert('成功','提交成功！');
                                    me.$reloadViewGrid();
                                }
                            }
                        });
                    }
                });
            }
        });
        
    },
    __productonline$unsale : function( btna , params ){
        var me = this;
        params = me.$getArrayOne(params);
        console.log(params);
        if(params.status == 11){
            Ext.Msg.show({
                title : '失败',
                msg  : '已经是暂下架状态！',
                icon: Ext.Msg.ERROR,
            });
            return;
        }
        // params.status = 11;
        me.$askYestNo({
            msg : '确定暂停销售该产品？',
            yes : function(){
                me.$requestAjax({
                    url     :   me.$getUrlstrByUrlcode('set.productonline.unsale'),
                    method :    'POST',
                    params :    {product_id:params.id},
                    scope  :    me,
                    backParams: {},
                    callback   :    function(response , backParams){
                        //console.log(response.responseText);
                        var param = Ext.decode(response.responseText);
                        if(param.status > 0){
                            Ext.MessageBox.alert('成功','提交成功！');
                            me.$reloadViewGrid();
                        }
                    }
                });
            }
        });
    },
    __productonline$disable : function( btna , params ){
        var me = this;
        params = me.$getArrayOne(params);
        console.log(params);
        if(params.status == 9){
            Ext.Msg.show({
                title : '失败',
                msg  : '已经是注销状态！',
                icon: Ext.Msg.ERROR,
            });
            return;
        }
        if(params.status != 10){
            Ext.Msg.show({
                title : '失败',
                msg  : '产品不是暂下架状态！',
                icon: Ext.Msg.ERROR,
            });
            return;
        }
        // params.status = 9;
        me.$askYestNo({
            msg : '确定注销该产品？',
            yes : function(){
                me.$requestAjax({
                    url     :   me.$getUrlstrByUrlcode('set.productonline.disable'),
                    method :    'POST',
                    params :    {product_id:params.id},
                    scope  :    me,
                    backParams: {},
                    callback   :    function(response , backParams){
                        //console.log(response.responseText);
                        var param = Ext.decode(response.responseText);
                        if(param.status > 0){
                            Ext.MessageBox.alert('成功','提交成功！');
                            me.$reloadViewGrid();
                        }
                    }
                });
            }
        });
    },
    //listbtn  list的处理按钮事件，方法名前 加 '__'  ，根据权限pmscode指定方法名， .更换为$...方法前加__
    __productonline$view : function( btna , params ){
        var me = this;
        var view = this.$getView();
        Ext.apply(params,{callback: function(panel,win){
            //me.$addWindowToFather(win);
        }});
        this.$fireModuleEvents('workplatform','view',params);
    },

    __productonline$edit : function( btna , params ){
        var me = this;
        var pmsCode = btna.pmsCode?btna.pmsCode:($(btna).attr('pmscode')?$(btna).attr('pmscode'):null);
        if(!pmsCode) return;
        var param  = params || {};
        Ext.apply( param , { pmsCode : pmsCode} );

        me.$showOptionsPanel('edit', param ,function( panel ,win ){
            //这里对panel进行处理
        });
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
            'get.productonline.edit',
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
            'get.productonline.view',
            mydata,
            thepanel
        );
    },

    __edit_main_render : function(thepanel){
        var me = this;
        var mydata = thepanel.getMyDatas();
        me.$requestFromDataAjax(
            'get.productonline.view',
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
        if(cfg.pmsCode == 'productonline.sale'){
            if(record.data.status != 10 ) return false;
        }
        if(cfg.pmsCode == 'productonline.unsale'){
            if(record.data.status != 6 ) return false;
        }
        return true;
    }

});