/**
 * Created by Administrator on 2015/12/7 0007.
 */

Ext.define('ui.ctrl.productmark.productmarkCtrl', {
    extend: 'ui.extend.baseClass.baseCtrl',
    requires : [
        'ui.ctrl.productmark.productmarkConf',
        'ui.view.productmark.productmarkView',
        'ui.view.productmark.Coms.scorePanel'
    ],
    views : [
        'ui.view.productmark.productmarkView'
    ],

    constructor : function (cfg){
        this.modelConf = Ext.create('ui.ctrl.productmark.productmarkConf');
        this.callParent(arguments);
    },

    init:function(){
        this.control({      //这里的this相当于这个控制层
            'productmarkpagecentergrid' : {
                render : function(e){
                    //e.grid.getStore().load();
                }
            }
        });
    },
    //配置功能按钮功能  对应Conf类中定义的operationButtons > pmsCode { text : '新增角色+' , pmsCode : 'productmark.add' }
    //‘.’替换为 $  ,方法前加__

    __productmark$view : function( btna , params ){
        var me = this;
        var view = this.$getView();
        Ext.apply(params,{callback: function(panel,win){
            //me.$addWindowToFather(win);
        }});
        this.$fireModuleEvents('workplatform','view',params);
    },
    __productmark$score : function( btna , params ){
        var me = this;
        var pmsCode = btna.pmsCode?btna.pmsCode:($(btna).attr('pmscode')?$(btna).attr('pmscode'):null);
        if(!pmsCode) return;
        var param  = params || {};
        Ext.apply( param , { pmsCode : pmsCode} );console.log(param);
        if(param.is_score == 1){
            Ext.MessageBox.alert("失败","您已经提交过评过分");
            return;
        }
        me.$showOptionsPanel('score', param ,function( panel ,win ){
            //这里对panel进行处理
        },me.$getConfig('_sub_win_defparams'));
    },

    __productmark$reject : function( btna , params ){
        var me = this;
        var pmsCode = btna.pmsCode?btna.pmsCode:($(btna).attr('pmscode')?$(btna).attr('pmscode'):null);
        if(!pmsCode) return;
        var param  = params || {};
        Ext.apply( param , { pmsCode : pmsCode} );

        param = {product_id : params.id};
        me.$askYestNo({
            msg : '确认退回吗?',
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
                                Ext.apply(param , par );
                                me.$requestAjax({
                                    url     :   me.$getUrlstrByUrlcode('get.productmark.backProductScore'),
                                    method :	'POST',
                                    params :	param,
                                    scope  :	me,
                                    backParams: {},
                                    callback   :	function(response , backParams){
                                        //console.log(response.responseText);
                                        var param = Ext.decode(response.responseText);
                                        if(param.status > 0){
                                            Ext.MessageBox.alert('成功','退回成功！');
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

   /* 接口：
    * 信息面板里的 按钮 事件
    * 方法名规则  __ + 信息面板类型(view,edit,add等) + Panel + $ + 按钮定义的fnName .
    * 回参为 按钮和 本信息面板自己
    */
    __scorePanel$save : function( btn , infopanel ){
        var me = this;
        var saveparams = me.$getFormsParams(infopanel);
        var myData = infopanel.getMyDatas();

        var pinfenform = infopanel.findTabPanel({ myStamp : 'thePingfen'});

        if(!pinfenform.getForm().isValid()){
            Ext.MessageBox.alert("失败","请完整填写评分值");
            return ;
        }

        var pinfens = pinfenform.queryBy(function(f){
            if(typeof(this.group_id) === 'undefined'){
                return false;
            }else{
                return true;
            }
        });

        var theparms = [];
        for(var i in pinfens){
            var theparm = {};
            Ext.apply( theparm , {
                group_id : pinfens[i].group_id,
                product_id : pinfens[i].product_id,
                score : pinfens[i].getValue()
            });
            theparms.push(theparm);
        }


        var win = Ext.create("Ext.window.Window" , {
            title : "请输入评分理由",
            width : 450,
            height : 250,
            layout : 'fit',
            infoPanel : infopanel,
            product_id : myData.id,
            postParams : theparms,
            items : [
                {
                    xtype : 'form',
                    layout : 'fit',
                    myStamp : 'thereasonForm',
                    padding : 10,
                    buttons : [
                        {
                            text : '通过',
                            width: 100,
                            handler : function(){
                                me.__sub_post_to_pingfen.call(me,win , 1);
                                me.$reloadViewGrid();
                            }
                        },
                        {
                            text : '不通过',
                            width: 100,
                            handler : function(){
                                me.__sub_post_to_pingfen.call(me,win , 2);
                                me.$reloadViewGrid();
                            }
                        },
                        {
                            text : '暂观望',
                            width: 100,
                            handler : function(){
                                me.__sub_post_to_pingfen.call(me,win , 3);
                                me.$reloadViewGrid();
                            }
                        }
                    ],
                    items : [
                        {
                            xtype : "textarea" ,
                            fieldLabel : "评分理由",
                            lableWidth : 90,
                            name : 'reason'
                        }
                    ]
                }
            ]
        });
        win.on('show' , function(){
            infopanel.setDisabled(true);
            this.setDisabled(false);
        })
        win.on('close' , function(){
            infopanel.setDisabled(false);
        })

        infopanel.add(win);
        win.show();

    },

    __sub_post_to_pingfen : function(thewin , type){
        var me = this;
        var theform = thewin.items.items[0];
        var formdata = theform.getForm();
        if(!formdata.isValid()) return;

        formdata = formdata.getValues();
        if(formdata){
            var postdata = {
                score : thewin.postParams,
                result : {
                    product_id : thewin.product_id,
                    status : type
                }
            }
            if(formdata.reason){
                Ext.apply( postdata.result , {
                    reason : formdata.reason
                });
            }

            me.$requestFromDataAjax(
                'get.productmark.scorepost',
                Ext.encode(postdata) ,
                null,
                function(params){
                    if(params.status === 1){
                        Ext.MessageBox.alert("成功","产品评分成功");
                        var fatherWin = thewin.infoPanel.ownerCt;
                        if(typeof(fatherWin.close) === 'function') fatherWin.close();
                        thewin.close();
                        me.$reloadGrid;
                    }else{
                        Ext.MessageBox.alert("失败",params.msg);
                    }
                }
            );
        }
    },
    /* 接口：
     * 功能信息面板子form的 render 处理
     * 命名规则： __  +  optype(操作类型) + _sub_render
     */
    __view_sub_render : function(theform){
    },
    /* 接口：
     * 功能信息面板的 render 处理
     * 命名规则： __  +  optype(操作类型) + _main_render
     * 作用域 ctrl
     */
    __all_main_render : function(thepanel){
        var me = this;
        var optype = thepanel.optype;
    },

    //表单数据加载之后
    __all_post_after_main_event : function(thepanel){
        var optype = thepanel.optype;
        var data = thepanel.$postValue;
        var me = this;
        if(!data) return;

        var scoreInfo = data.scoreInfo;
        var myData = thepanel.getMyDatas();
        var product_id = myData.id;
        if(optype === 'score'){
            var thepinfenPanel = thepanel.findTabPanel({myStamp: 'thePingfen'});
            //alert(thepinfenPanel);
            if (thepinfenPanel){
                for (var k in scoreInfo){
                    if (scoreInfo[k]['group_id'] && scoreInfo[k]['fields'] && scoreInfo[k]['fields'].length) {
                        var fieldset = Ext.create("Ext.form.FieldSet", {
                            myStamp : "theFieldSet",
                            title: scoreInfo[k]['group_name'] ? scoreInfo[k]['group_name'] : ("分组" + scoreInfo[k]['group_id']),
                            columnWidth: 1,
                            layout: 'column',
                            padding : 10,
                            autoHeight: true
                        });
                        var fieldList = me.$createFieldTrend(scoreInfo[k]['fields']);
                        for (var i in fieldList){
                            fieldList[i].readOnly = true;
                            fieldList[i].columnWidth = 1;
                            me.$checkFieldInitfn(optype,fieldList[i]);
                            fieldset.add(fieldList[i]);
                        }
                        var tp = this.$getConfig('fieldClassNameArr');
                        var pingfen = Ext.create( tp['Number'] , {
                            labelWidth : 100 ,
                            fieldLabel: "评分结果" ,
                            allowBlank :false,
                            blankText:"请输入评分结果",
                            regex:/^[1-9]\d*$/,
                            regexText:'不能为负数',
                            margin : "20 0 20 0",
                            minValue: 0,
                            group_id : scoreInfo[k]['group_id'] ,
                            product_id : product_id ,
                            columnWidth : 1
                        });
                        var pingfenpanel = Ext.create("ui.extend.base.Panel",{
                            border : 1,
                            layout : "column",
                            columnWidth : 1 ,
                            style : "background:#aaa;padding:10px;border-color:red;",
                            items : [pingfen]
                        });

                        fieldset.add(pingfenpanel);
                        thepinfenPanel.add(fieldset);
                        thepinfenPanel.doLayout();
                    }
                }
            }
        }

    },

    /* 接口：
     * 功能信息面板的 render 处理
     * 命名规则： __  +  optype(操作类型) + _main_render
     * 作用域 ctrl
     */

    __score_main_render : function(thepanel){
        var me = this;
        var mydata = thepanel.getMyDatas();
        me.$requestFromDataAjax(
            'get.productmark.score',
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
        this.$setFieldStyle(field , 'readonly');
        if(field.name === 'update_time') field.hide();
    },
    __check_list_btn_event : function(cfg ,record){
        if(cfg.pmsCode === 'productmark.score'){
            if(record.data.is_score == 1 ) return false;
        }
        if(cfg.pmsCode === 'productmark.reject'){
            if(record.data.is_score == 1 ) return false;
        }
        return true;
    }

});