/**
 * Created by Administrator on 2015/12/7 0007.
 */

Ext.define('ui.ctrl.node.nodeCtrl', {
    extend: 'ui.extend.baseClass.baseCtrl',
    requires : [
        'ui.ctrl.node.nodeConf',
        'ui.view.node.nodeView',
        'ui.view.node.Coms.viewPanel'
    ],
    views : [
        'ui.view.node.nodeView'
    ],

    refs:[
        {ref:'nodeWin' , selector:'nodewindow'}
    ],

    constructor : function (cfg){
        this.modelConf = Ext.create('ui.ctrl.node.nodeConf');
        this.callParent(arguments);
    },

    init:function(){
        this.control({      //这里的this相当于这个控制层
            'nodepagecentergrid' : {
                render : function(e){
                    //e.grid.getStore().load();
                }
            }
        });
    },


    //配置功能按钮功能  对应Conf类中定义的operationButtons > pmsCode { text : '新增角色+' , pmsCode : 'node.add' }
    //‘.’替换为 $  ,方法前加__
    __all_button_Event : function(btna , pmscode){
        //alert(pmscode);
    },

    __node$add : function( btna , params ){
        var me = this;
        var pmsCode = btna.pmsCode?btna.pmsCode:($(btna).attr('pmscode')?$(btna).attr('pmscode'):null);
        if(!pmsCode) return;
        me.$showOptionsPanel('add', pmsCode ,function(panel ,win){
            //这里对panel进行处理
        },{width:500 , height:480});
    },

    //listbtn  list的处理按钮事件，方法名前 加 '__'  ，根据权限pmscode指定方法名， .更换为$...方法前加__
    __node$view : function( btna , params ){
        var me = this;
        var pmsCode = btna.pmsCode?btna.pmsCode:($(btna).attr('pmscode')?$(btna).attr('pmscode'):null);
        if(!pmsCode) return;
        params = me.$getArrayOne(params);//返回数组中第一个元素，如果为对象直接返回
        var param  = params || {};
        Ext.apply( param , { pmsCode : pmsCode} );

        me.$showOptionsPanel('view', param ,function( panel ,win ){
            //这里对panel进行处理
        },{width:550 , height:480});
    },

    __node$edit : function( btna , params ){
        var me = this;
        var pmsCode = btna.pmsCode?btna.pmsCode:($(btna).attr('pmscode')?$(btna).attr('pmscode'):null);
        if(!pmsCode) return;
        params = me.$getArrayOne(params);//返回数组中第一个元素，如果为对象直接返回

        var param  = params || {};
        Ext.apply( param , { pmsCode : pmsCode} );

        me.$showOptionsPanel('edit', param ,function( panel ,win ){
            //这里对panel进行处理
        },{width:550 , height:480});
    },

    __node$delete : function( btna , params ){
        var me = this;
        params = me.$getArrayOne(params);
        if(params.status == 1){
            Ext.Msg.show({
                title : '失败',
                msg  : '节点不是无效状态！',
                icon: Ext.Msg.ERROR,
            });
            return;
        }

        me.$askYestNo({
            msg : '确认删除吗',
            yes : function(){
                me.$requestAjax({
                    url     :   me.$getUrlstrByUrlcode('set.node.delete'),
                    method :	'POST',
                    params :	params,
                    scope  :	me,
                    backParams:	{} ,
                    callback   :	function(response , backParams){
                        //console.log(response.responseText);
                        var param = Ext.decode(response.responseText);
                        if(param.status > 0){
                            Ext.MessageBox.alert('成功','删除成功！');
                            me.$reloadViewGrid();
                        }
                    }
                });
            }
        });
    },

    __node$start : function( btna , params ){
        var me = this;
        params = me.$getArrayOne(params);
        if(params.status == 1){
            Ext.Msg.show({
                title : '失败',
                msg  : '已经是启用状态！',
                icon: Ext.Msg.ERROR,
            });
            return;
        }
        params.status = 1;
        me.$askYestNo({
            msg : '确认启用吗',
            yes : function(){
                me.$requestAjax({
                    url     :   me.$getUrlstrByUrlcode('set.node.change'),
                    method :	'POST',
                    params :	params,
                    scope  :	me,
                    backParams:	{},
                    callback   :	function(response , backParams){
                        //console.log(response.responseText);
                        var param = Ext.decode(response.responseText);
                        if(param.status > 0){
                            Ext.MessageBox.alert('成功','启用成功！');
                            me.$reloadViewGrid();
                        }
                    }
                });
            }
        });
    },

    __node$stop : function( btna , params ){
        var me = this;
        params = me.$getArrayOne(params);
        if(params.status == 2){
            Ext.Msg.show({
                title : '失败',
                msg  : '已经是禁用状态！',
                icon: Ext.Msg.ERROR,
            });
            return;
        }
        params.status = 2;
        me.$askYestNo({
            msg : '确认禁用吗',
            yes : function(){
                me.$requestAjax({
                    url     :   me.$getUrlstrByUrlcode('set.node.change'),
                    method :	'POST',
                    params :	params,
                    scope  :	me,
                    backParams:	{},
                    callback   :	function(response , backParams){
                        //console.log(response.responseText);
                        var param = Ext.decode(response.responseText);
                        if(param.status > 0){
                            Ext.MessageBox.alert('成功','禁用成功！');
                            me.$reloadViewGrid();
                        }
                    }
                });
            }
        });
    },

   /* 接口：
    * 信息面板里的 按钮 事件
    * 方法名规则  __ + 信息面板类型(view,edit,add等) + Panel + $ + 按钮定义的fnName .
    * 回参为 按钮和 本信息面板自己 */

    //所有面板按钮事件的公共方法，所有按钮先触发
    __allPanel$event : function( btn , infopanel ){
        alert('__allPanel$event');
    },

    __editPanel$save : function( btn , infopanel ){
        var me = this;
        var editparams = me.$getFormsParams(infopanel);

        me.$requestFromDataAjax(
            'get.node.edit',
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

    __addPanel$save : function( btn , infopanel ){
        var me = this;
        var editparams = me.$getFormsParams(infopanel);

        me.$requestFromDataAjax(
            'get.node.edit',
            editparams,
            null,
            function(params){
                if(typeof(infopanel.ownerCt) != 'undefined' && typeof(infopanel.ownerCt.close) === 'function'){
                    infopanel.ownerCt.close();
                }
                me.$reloadViewGrid();
            }
        );
    },

    /* 接口：
     * 功能信息面板子form的 render 处理
     * 命名规则： __  +  optype(操作类型) + _sub_render*/
    __view_sub_render : function(theform){
        //alert('ss'+theform.getForm());
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
            'get.node.view',
            mydata,
            thepanel
        );
    },

    __edit_main_render : function(thepanel){
        var me = this;
        var mydata = thepanel.getMyDatas();
        me.$requestFromDataAjax(
            'get.node.view',
            mydata,
            thepanel
        );
    },


    /* 接口：
     * 功能信息面板的 字段组件的 初始 方法
     * 命名规则： __  +  optype(操作类型) + _fieldinit
     */

    __view_fieldinit : function(field){
        var me = this;
        me.$setFieldStyle(field , 'readonly');
    },

    __add_fieldinit : function(field){
        var me = this;
        if(field.name == 'update_time') me.$setFieldStyle(field , 'hidden');
        if(field.name == 'status') me.$setFieldStyle(field , 'hidden');
        if(field.name == 'id') me.$setFieldStyle(field , 'disabled');
    },

    __edit_fieldinit : function(field){
        if(!field)return;
        if(field.name == 'update_time') this.$setFieldStyle(field , 'disabled');
        if(field.name == 'id') this.$setFieldStyle(field , 'readonly');
    },

    __all_fieldinit : function(field){
        if(!field)return;
        if(field.name == 'update_time') this.$setFieldStyle(field , 'readonly');
    },


});