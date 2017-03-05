/**
 * Created by Administrator on 2015/12/7 0007.
 */

Ext.define('ui.ctrl.productaudit.productauditCtrl', {
    extend: 'ui.extend.baseClass.baseCtrl',
    requires : [
        'ui.ctrl.productaudit.productauditConf',
        'ui.view.productaudit.productauditView',
        'ui.view.productaudit.Coms.viewPanel'
    ],
    views : [
        'ui.view.productaudit.productauditView'
    ],

    refs:[
        {ref:'productauditWin' , selector:'productauditwindow'}
    ],

    constructor : function (cfg){
        this.modelConf = Ext.create('ui.ctrl.productaudit.productauditConf');
        this.callParent(arguments);
    },

    init:function(){
        this.control({      //这里的this相当于这个控制层
            'productauditpagecentergrid' : {
                render : function(e){
                    //e.grid.getStore().load();
                }
            }
        });
    },
    //配置功能按钮功能  对应Conf类中定义的operationButtons > pmsCode { text : '新增角色+' , pmsCode : 'productaudit.add' }
    //‘.’替换为 $  ,方法前加__
    __productaudit$add : function( btna , params ){
        var me = this;
        var pmsCode = btna.pmsCode?btna.pmsCode:($(btna).attr('pmscode')?$(btna).attr('pmscode'):null);
        if(!pmsCode) return;
       me.$showOptionsPanel('add', pmsCode ,function(panel ,win){
            //这里对panel进行处理
        },me.$getConfig('_sub_win_defparams'));
    },

    //listbtn  list的处理按钮事件，方法名前 加 '__'  ，根据权限pmscode指定方法名， .更换为$...方法前加__
    __productaudit$view : function( btna , params ){
        var me = this;
        var view = this.$getView();
        Ext.apply(params,{callback: function(panel,win){
            //me.$addWindowToFather(win);
        }});
        this.$fireModuleEvents('workplatform','view',params);
    },

    __productaudit$upload : function( btna , params ){
        var me = this;
        //getUserUploadContract
        var theDocspanel = Ext.create("ui.extend.base.Panel",{
            border : 0 ,
            columnWidth :1 ,
            myStamp : 'theDocsList',
            layout : 'column',
            items : []
        });

        me.$requestAjax({
            url : me.$getConfig('urls').get('get.getUserUploadContractList').url,
            method : "POST",
            params : {
                product_id: params.id
            },
            scope : me ,
            backParams: {} ,
            callback : function(response , backParams){
                //console.log(response.responseText);
                var param = Ext.decode(response.responseText);
                if(param.length>0){
                    me.__sub_showuploadlist_panel(param , theDocspanel ,params);
                }
            }
        });

        var uploadPanel = Ext.create( "ui.extend.base.Form",{
            columnWidth :1,
            layout : 'column',
            border :  0,
            padding : 10,
            styleHtmlCls : 'fileuploadfieldclass',
            styleHtmlContent : true,
            items : [{
                xtype: 'filefield',
                buttonConfig : {
                    text : '选择附件'
                },
                name: 'file',
                columnWidth:.9,
                border : 0 ,
                blankText: '请上传文件',
                listeners:{
                    "change" : function( field, str , eOpts ){
                        field.nextSibling().enable();
                    }
                },
                anchor : '100%'
            },{
                xtype : 'button',
                columnWidth:.15,
                margin : "0 5" ,
                text : '上传提交' ,
                disabled : true ,
                handler : function(btn){
                    uploadPanel.getForm().submit({
                        url: me.$getConfig('urls').get('get.productAddContract').url , //'../Product/productAddContract',
                        params: {
                            product_id: params.id
                        },
                        success: function(form, action){
                            Ext.Msg.alert('成功','上传成功.');
                            //winUpload.hide();
                            me.__sub_showuploadlist_panel([action.result.data] , theDocspanel ,params);
                        },
                        failure: function(form, action){
                            Ext.Msg.alert('Error', action.result.msg);
                        }
                    })
                }
            }]
        });

        var winUpload=Ext.create('Ext.window.Window', {
            title: '添加合同',
            width: 600,
            height:300,
            minWidth: 300,
            minHeight: 100,
            bodyStyle:'padding:5px;',
            buttonAlign : 'center' ,
            autoScroll : true,
            items : [theDocspanel],
            buttons: [uploadPanel]
        });
        winUpload.show();
    },

    __productaudit$edit : function( btna , params ){
        var me = this;
        var pmsCode = btna.pmsCode?btna.pmsCode:($(btna).attr('pmscode')?$(btna).attr('pmscode'):null);
        if(!pmsCode) return;
        var param  = params || {};
        Ext.apply( param , { pmsCode : pmsCode} );

        me.$showOptionsPanel('edit', param ,function( panel ,win ){
            //这里对panel进行处理
        });
    },

    __productaudit$change : function( btna , params ){
        var me = this;
        params = me.$getArrayOne(params);
        if(params.status == 4){
            Ext.Msg.show({
                title : '失败',
                msg  : '已经是待审核状态！',
                icon: Ext.Msg.ERROR,
            });
            return;
        }
        params.status = 3;
        var postdata = {product_id : params.id}
        me.$askYestNo({
            msg : '确认提交吗',
            yes : function(){
                me.$requestAjax({
                    url     :   me.$getUrlstrByUrlcode('set.productaudit.change'),
                    method :    'POST',
                    params :    postdata,
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


    __sub_showuploadlist_panel : function(param , fatherpanel ,proinfo){
        var me = this;
        for(var i in param){
            var tmpanel = Ext.create("ui.extend.base.Panel" , {
                border : 0 ,
                columnWidth :1 ,
                margin : 10 ,
                layout : 'column',
                items : [
                    {
                        xtype : 'panel' ,
                        border : 0 ,
                        items : [] ,
                        columnWidth:.7 ,
                        html : "<a href='"+ param[i].attachment_url +"'>"+ param[i].attachment_name+"</a>"
                    },
                    {
                        xtype : 'button',
                        columnWidth:.1 ,
                        text : '下载',
                        atturl : param[i].attachment_url,
                        handler : function(btn){
                            window.open(btn.atturl);
                        }
                    },
                    {
                        xtype : 'button',
                        columnWidth:.1 ,
                        text : '删除',
                        margin : "0 2",
                        attid : param[i].id,
                        product_id :  proinfo.id,
                        handler : function(btn){
                            me.$askYestNo({
                                msg: '确认删除吗?',
                                yes: function () {
                                    me.$requestAjax({
                                        url : me.$getConfig('urls').get('get.delProductContract').url,
                                        method : "POST",
                                        params : {id : btn.attid , product_id : btn.product_id},
                                        backParams: { } ,
                                        callback   :	function(response , backParams){
                                            //console.log(response.responseText);
                                            var param = Ext.decode(response.responseText);
                                            var father  = btn.ownerCt;
                                            father.hide(200,function(){
                                                father.destroy();
                                            });
                                            Ext.MessageBox.alert("删除成功",param.msg);
                                        }
                                    });
                                }
                            })
                        }
                    }
                ]
            });
            fatherpanel.add(tmpanel);
        }
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
            'get.productaudit.edit',
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
            'get.productaudit.view',
            mydata,
            thepanel
        );
    },

    __edit_main_render : function(thepanel){
        var me = this;
        var mydata = thepanel.getMyDatas();
        me.$requestFromDataAjax(
            'get.productaudit.view',
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
    }

});