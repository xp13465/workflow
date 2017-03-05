/**
 * Created by Administrator on 2015/12/7 0007.
 */

Ext.define('ui.ctrl.draftnotice.draftnoticeCtrl', {
    extend: 'ui.extend.baseClass.baseCtrl',
    requires : [
        'ui.ctrl.draftnotice.draftnoticeConf',
        'ui.view.draftnotice.draftnoticeView',
        'ui.view.draftnotice.Coms.viewPanel'
    ],
    views : [
        'ui.view.draftnotice.draftnoticeView'
    ],

    refs:[
        {ref:'draftnoticeWin' , selector:'draftnoticewindow'}
    ],

    constructor : function (cfg){
        this.modelConf = Ext.create('ui.ctrl.draftnotice.draftnoticeConf');
        this.callParent(arguments);
    },

    init:function(){
        this.control({      //这里的this相当于这个控制层
            'draftnoticepagecentergrid' : {
                render : function(e){
                    //e.grid.getStore().load();
                }
            }
        });
    },

    //配置功能按钮功能  对应Conf类中定义的operationButtons > pmsCode { text : '新增角色+' , pmsCode : 'draftnotice.add' }
    //‘.’替换为 $  ,方法前加__
    __draftnotice$add : function( btna , params ){
        var me = this;
        var pmsCode = btna.pmsCode?btna.pmsCode:($(btna).attr('pmscode')?$(btna).attr('pmscode'):null);
        if(!pmsCode) return;
        me.$showOptionsPanel('add', pmsCode ,function(panel ,win){
            //这里对panel进行处理
        });
    },

    //listbtn  list的处理按钮事件，方法名前 加 '__'  ，根据权限pmscode指定方法名， .更换为$...方法前加__
    __draftnotice$view : function( btna , params ){
        var me = this;
        var pmsCode = btna.pmsCode?btna.pmsCode:($(btna).attr('pmscode')?$(btna).attr('pmscode'):null);
        if(!pmsCode) return;
        var param  = params || {};
        Ext.apply( param , { pmsCode : pmsCode} );

        me.$showOptionsPanel('view', param ,function( panel ,win ){
            //这里对panel进行处理
        });
    },

    __draftnotice$edit : function( btna , params ){
        var me = this;
        var view = this.$getView();
        Ext.apply(params,{callback: function(panel,win){
            //me.$addWindowToFather(win);
        }});
        this.$fireModuleEvents('publishednotice','edit',params);
    },

    __draftnotice$fabu : function( btna , params ){
        var me = this;
        params = me.$getArrayOne(params);
        me.$askYestNo({
            msg : '确认发布此公告吗',
            yes : function(){
                me.$requestAjax({
                    url     :   me.$getUrlstrByUrlcode('set.draftnotice.fabu'),
                    method :    'POST',
                    params :    params,
                    scope  :    me,
                    backParams: {},
                    callback   :    function(response , backParams){
                        //console.log(response.responseText);
                        var param = Ext.decode(response.responseText);
                        if(param.status > 0){
                            Ext.MessageBox.alert('成功','发布公告成功！');
                            me.$reloadViewGrid();
                        }
                    }
                });
            }
        });
    },

    __draftnotice$del : function( btna , params ){
        var me = this;
        params = me.$getArrayOne(params);
        me.$askYestNo({
            msg : '确认删除吗',
            yes : function(){
                me.$requestAjax({
                    url     :   me.$getUrlstrByUrlcode('set.draftnotice.del'),
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
            'get.draftnotice.edit',
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
            'get.draftnotice.view',
            mydata,
            thepanel
        );
    },

    __edit_main_render : function(thepanel){
        var me = this;
        var mydata = thepanel.getMyDatas();
        me.$requestFromDataAjax(
            'get.draftnotice.view',
            mydata,
            thepanel
        );
    },
    __all_post_after_main_event : function(thepanel){
        var data = thepanel.$postValue;
        var optype = thepanel.optype;
        if(optype === 'view'){
            var feilds = $findByparam(thepanel , {myStamp : 'theField'});
            for(var i in feilds){
                if(feilds[i].name == 'title'){
                    feilds[i].setHtml('<b>'+data.title+'</b>'+'<br>发布时间：'+data.add_time);
                }else if(feilds[i].name == 'content'){
                    feilds[i].setHtml(data.content+"<br><br>"+'公告来源：'+data.source);
                }
            }
        }
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
    }

});