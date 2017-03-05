/**
 * Created by Administrator on 2015/12/7 0007.
 */

Ext.define('ui.ctrl.role.roleCtrl', {
    extend: 'ui.extend.baseClass.baseCtrl',
    requires : [
        'ui.ctrl.role.roleConf',
        'ui.view.role.roleView',
        'ui.view.role.Coms.viewPanel'
    ],
    views : [
        'ui.view.role.roleView'
    ],

    refs:[
        {ref:'roleWin' , selector:'rolewindow'}
    ],

    constructor : function (cfg){
        this.modelConf = Ext.create('ui.ctrl.role.roleConf');
        this.callParent(arguments);
    },

    init:function(){
        this.control({      //这里的this相当于这个控制层
            'rolepagecentergrid' : {
                render : function(e){
                    //e.grid.getStore().load();
                }
            }
        });
    },

    //配置功能按钮功能  对应Conf类中定义的operationButtons > pmsCode { text : '新增角色+' , pmsCode : 'role.add' }
    //‘.’替换为 $  ,方法前加__
    __role$add : function( btna , params ){
        var me = this;
        var pmsCode = btna.pmsCode?btna.pmsCode:($(btna).attr('pmscode')?$(btna).attr('pmscode'):null);
        if(!pmsCode) return;
        me.$showOptionsPanel('add', pmsCode ,function(panel ,win){
            //这里对panel进行处理
        },{ height : 360 });
    },

    //listbtn  list的处理按钮事件，方法名前 加 '__'  ，根据权限pmscode指定方法名， .更换为$...方法前加__
    __role$view : function( btna , params ){
        var me = this;
        var pmsCode = btna.pmsCode?btna.pmsCode:($(btna).attr('pmscode')?$(btna).attr('pmscode'):null);
        if(!pmsCode) return;
        var param  = params || {};
        Ext.apply( param , { pmsCode : pmsCode} );

        me.$showOptionsPanel('view', param ,function( panel ,win ){
            //这里对panel进行处理
        });
    },

    __role$edit : function( btna , params ){
        var me = this;
        var pmsCode = btna.pmsCode?btna.pmsCode:($(btna).attr('pmscode')?$(btna).attr('pmscode'):null);
        if(!pmsCode) return;
        var param  = params || {};
        Ext.apply( param , { pmsCode : pmsCode} );

        me.$showOptionsPanel('edit', param ,function( panel ,win ){
            //这里对panel进行处理
        });
    },

    __role$fenpei : function(btna , params ){
        var me = this;
        var pmsCode = btna.pmsCode?btna.pmsCode:($(btna).attr('pmscode')?$(btna).attr('pmscode'):null);
        if(!pmsCode) return;
        var param  = params || {};
        Ext.apply( param , { pmsCode : pmsCode} );
        var records=me.$getGridSelections();

        if(records.length === 0 ){
            Ext.Msg.show({
                title : '失败',
                msg  : '请选择用户记录',
                icon: Ext.Msg.ERROR,
            });
            return;
        }else if( records.length >1 ){
            Ext.Msg.show({
                title : '失败',
                msg  : '每次只能编辑一条记录',
                icon: Ext.Msg.ERROR,
            });
            return;
        }

        var params = {id : records[0].data.id};

        me.$showOptionsPanel( 'fenpei', params ,function( panel ,win ){
            //这里对panel进行处理
        },{ width:700 , height: 500 });
    },

    __role$fenpeinode : function(btna , params ){
        var me = this;
        var pmsCode = btna.pmsCode?btna.pmsCode:($(btna).attr('pmscode')?$(btna).attr('pmscode'):null);
        if(!pmsCode) return;
        var param  = params || {};
        Ext.apply( param , { pmsCode : pmsCode} );
        var records=me.$getGridSelections();

        if(records.length === 0 ){
            Ext.Msg.show({
                title : '失败',
                msg  : '请选择角色记录',
                icon: Ext.Msg.ERROR,
            });
            return;
        }else if( records.length >1 ){
            Ext.Msg.show({
                title : '失败',
                msg  : '每次只能编辑一条记录',
                icon: Ext.Msg.ERROR,
            });
            return;
        }

        var params = {id : records[0].data.id};

        me.$showOptionsPanel( 'fenpeiNode', params ,function( panel ,win ){
            //这里对panel进行处理

        },{ width:700 , height: 500 });
    },

    __role$disable : function( btna , params ){
        var me = this;
        if(params.status == 2){
            Ext.Msg.show({
                title : '失败',
                msg  : '已经是禁用状态！',
                icon: Ext.Msg.ERROR,
            });
            return;
        }
        params.status = 2;
        me.__role_disable_by_list(params);
    },

    __role_disable_by_list : function(params){
        var me = this;
        me.$askYestNo({
            msg : '确认禁用角色吗',
            yes : function(){
                me.$requestAjax({
                    url     :   me.$getUrlstrByUrlcode('get.role.changerole'),
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
    * 回参为 按钮和 本信息面板自己
    */
    __editPanel$save : function( btn , infopanel ){
        var me = this;
        var editparams = me.$getFormsParams(infopanel);

        me.$requestFromDataAjax(
            'get.role.edit',
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
            'get.role.edit',
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
            'get.role.view',
            mydata,
            thepanel
        );
    },

    __edit_main_render : function(thepanel){
        var me = this;
        var mydata = thepanel.getMyDatas();
        me.$requestFromDataAjax(
            'get.role.view',
            mydata,
            thepanel,
            function(params){
                //Ext.MessageBox.alert(Ext.encode(params));
            }
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
        if(field.name === 'update_time') field.readOnly = true;
        if(field.name === 'status') field.hidden = true;
        if(field.name === 'id') field.hidden = true;
    },

    __add_fieldinit : function(field){
        if(!field) return;
        if(field.name === 'id') field.disabled = true;
        if(field.name === 'update_time') field.hidden = true;
        if(field.name === 'status') {field.disabled = true , field.hidden = true};
    }

});