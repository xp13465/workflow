/**
 * Created by Administrator on 2015/12/7 0007.
 */

Ext.define('ui.ctrl.productrate.productrateCtrl', {
    extend: 'ui.extend.baseClass.baseCtrl',
    requires : [
        'ui.ctrl.productrate.productrateConf',
        'ui.view.productrate.productrateView',
        'ui.view.productrate.Coms.viewPanel'
    ],
    constructor : function (cfg){
        this.modelConf = Ext.create('ui.ctrl.productrate.productrateConf');
        this.callParent(arguments);
    },

    init:function(){
        this.control({      //这里的this相当于这个控制层
            'productratepagecentergrid' : {
                render : function(e){
                    //e.grid.getStore().load();
                }
            }
        });
    },
    //配置功能按钮功能  对应Conf类中定义的operationButtons > pmsCode { text : '新增角色+' , pmsCode : 'productrate.add' }
    //‘.’替换为 $  ,方法前加__
    __productrate$add : function( btna , params ){
        var me = this;
        var pmsCode = btna.pmsCode?btna.pmsCode:($(btna).attr('pmscode')?$(btna).attr('pmscode'):null);
        if(!pmsCode) return;
       me.$showOptionsPanel('add', pmsCode ,function(panel ,win){
            //这里对panel进行处理
        },me.$getConfig('_sub_win_defparams'));
    },

    //listbtn  list的处理按钮事件，方法名前 加 '__'  ，根据权限pmscode指定方法名， .更换为$...方法前加__
    __productrate$view : function( btna , params ){
        var me = this;
        var view = this.$getView();
        Ext.apply(params,{callback: function(panel,win){
            //me.$addWindowToFather(win);
        }});
        this.$fireModuleEvents('workplatform','view',params);
    },

    __productrate$edit : function( btna , params ){
        var me = this;
        var pmsCode = btna.pmsCode?btna.pmsCode:($(btna).attr('pmscode')?$(btna).attr('pmscode'):null);
        //if(!pmsCode) return;
        var param  = params || {};
        Ext.apply( param , { pmsCode : pmsCode} );

        me.$showOptionsPanel('edit', param ,function( panel ,win ){
            //这里对panel进行处理
            if(typeof(params.callback) === 'function'){
                params.callback.call( me , panel , win );
            }
        },me.$getConfig('_sub_win_defparams'));
    },

    __productrate$edit_ : function( btna , params ){
        var me = this;
        //getUserUploadContract
        var theEditpanel = Ext.create("ui.extend.base.Panel",{
            border : 0 ,
            columnWidth :1 ,
            myid:'feePanel',
            layout : 'column',
            items : []
        });
        me.$requestAjax({
            url : me.$getConfig('urls').get('get.productrate.edit').url,
            method : "POST",
            params : {
                product_id: params.id
            },
            scope : me ,
            backParams: {} ,
            callback : function(response , backParams){
                //console.log(response.responseText);
                var param = Ext.decode(response.responseText);
                var feeTextCmp= Ext.create('Ext.form.field.Text',{
                    name: 'channel_fee',
                    fieldLabel: '渠道费用',
                    value:param.channel_fee.channel_fee
                });
                var hiddenCmp= Ext.create('Ext.form.field.Hidden',{
                    name:'product_id',
                    product_id: param.product_id
                });
                theEditpanel.add(feeTextCmp);
                theEditpanel.add(hiddenCmp);
                for(var i=0;i<param.fee.length;i++){
                    var newCmp= Ext.create('Ext.form.field.Text',{
                        field_id: param.fee[i].field_id,
                        product_id:param.fee[i].product_id,
                        fieldLabel:param.fee[i].field_name,
                        value:param.fee[i].field_value
                    });
                    theEditpanel.add(newCmp);
                }
            }
        });
        var winUpload=Ext.create('Ext.window.Window', {
            title: '编辑费率',
            width: 600,
            height:300,
            minWidth: 300,
            minHeight: 100,
            bodyStyle:'padding:5px;',
            buttonAlign : 'center' ,
            autoScroll : true,
            items : [theEditpanel],
            buttons: [{
                text: '提交',
                listeners: {
                    click: function() {
                        var postparams = {
                            product_id : '',
                            fee:[]
                        }
                        var fieldList=Ext.getCmp('feePanel').items;
                        for(var i=0;i<fieldList.length;i++ ){
                            console.log(fieldList.items[i]);
                            if(fieldList.items[i].name=='product_id'){
                                postparams.product_id=fieldList.items[i].product_id;
                            }
                            else if(fieldList.items[i].name=='channel_fee'){
                                postparams.channel_fee=fieldList.items[i].value;
                            }
                            else{
                                postparams.fee.push({
                                    field_id:fieldList.items[i].field_id,
                                    field_name:fieldList.items[i].fieldLabel,
                                    field_value:fieldList.items[i].value,
                                    product_id:fieldList.items[i].product_id
                                })
                            }
                        }
                        me.$requestFromDataAjax(
                            'set.productrate.save',
                            Ext.encode(postparams),
                            null,
                            function(params){
                                Ext.MessageBox.alert("操作成功",params.msg);
                            }
                        );
                    }
                }
            },{
                text: '关闭',
                listeners: {
                    click: function() {
                       winUpload.close();
                    }
                }
            }]
        });
        winUpload.show();
    },
   /* 接口：
    * 信息面板里的 按钮 事件
    * 方法名规则  __ + 信息面板类型(view,edit,add等) + Panel + $ + 按钮定义的fnName .
    * 回参为 按钮和 本信息面板自己
    */
    __editPanel$save : function( btn , infopanel ){
        var me = this;

        var channelfileds = infopanel.queryBy(function(){
            return this.myStamp === "theMainfield"?true:false;
        });
        channelfileds = channelfileds[0];

        var inputfileds = infopanel.queryBy(function(){
            return this.myStamp === "theinputfield"?true:false;
        });

        var params ={channel_fee : {channel_fee:String(channelfileds.getValue())+"%"}};
        params.product_id = channelfileds.product_id;
        params.fee = [];
        for(var k in inputfileds){
            params.fee.push({
                field_id : inputfileds[k].field_id ,
                field_value : String(inputfileds[k].getValue())+"%",
                product_id : inputfileds[k].product_id
            })
        }

        me.$requestFromDataAjax(
            'set.productrate.save',
            Ext.encode(params),
            null,
            function(params){
                if(typeof(infopanel.ownerCt) != 'undefined' && typeof(infopanel.ownerCt.close) === 'function'){
                    infopanel.ownerCt.close();
                    Ext.MessageBox.alert("成功", "编辑费率成功！");
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
            'get.productrate.view',
            mydata,
            thepanel
        );
    },

    __edit_main_render : function(thepanel){
        var me = this;
        var mydata = thepanel.getMyDatas();
        me.$requestFromDataAjax(
            'get.productrate.view',
            { product_id : mydata.id },
            thepanel
        );
    },

    __all_post_after_main_event : function(thepanel){
        var me = this;
        var optype = thepanel.optype;
        var thePostData = thepanel.getMyDatas();
        var data = thepanel.$postValue;

        var closeButton = thepanel.queryBy(function(){
            return this.myStamp === "thesavebtn"?true:false;
        });
        closeButton = closeButton[0];
        var channel_fee_panel = thepanel.queryBy(function(){
            return this.myStamp === "thefeechannl"?true:false;
        });
        channel_fee_panel = channel_fee_panel[0];
        if(!channel_fee_panel){
            Ext.MessageBox.alert("数据调入失败","未找到相应数据项");
            return;
        }

//============================================
        var inputfileds_panel = thepanel.queryBy(function(){
            return this.myStamp === "theinputfileds"?true:false;
        });
        inputfileds_panel = inputfileds_panel[0];
        if(!inputfileds_panel){
            Ext.MessageBox.alert("数据调入失败","未找到相应数据项");
            return;
        }

        var outputfileds_panel = thepanel.queryBy(function(){
            return this.myStamp === "theoutputfileds"?true:false;
        });
        outputfileds_panel = outputfileds_panel[0];
        if(!outputfileds_panel){
            Ext.MessageBox.alert("数据调入失败","未找到相应数据项");
            return;
        }

        var thechagefn = function(){
            var channelfileds = channel_fee_panel.queryBy(function(){
                return this.myStamp === "theMainfield"?true:false;
            });
            channelfileds = channelfileds[0];
            var channelfileds_value = channelfileds.getValue();

            var inputfileds = inputfileds_panel.queryBy(function(){
                return this.myStamp === "theinputfield"?true:false;
            });

            var outputfileds = outputfileds_panel.queryBy(function(){
                return this.myStamp === "theoutputfield"?true:false;
            });

            var tipfileds = thepanel.queryBy(function(){
                return this.myStamp === "thelabletip"?true:false;
            });
            tipfileds = tipfileds[0];

            if(!channelfileds_value || channelfileds_value < 0 ){
                tipfileds.setText("请填写渠道费率");
                return;
            }
            var sum = 0;
            for(var i in inputfileds){
                sum += parseFloat(inputfileds[i].getValue());
            }
            if(sum != 100){
                if(tipfileds){
                    tipfileds.setText("× 费率占比和值需为100%");
                    tipfileds.removeCls('font-blue-label-tip');
                    tipfileds.addCls('font-red-label-tip');
                }
                for(var k in outputfileds){
                    outputfileds[k].setText("");
                }
                closeButton.disable();
            }else{
                tipfileds.setText("√ 填写正确");
                tipfileds.removeCls('font-red-label-tip');
                tipfileds.addCls('font-blue-label-tip');
                closeButton.enable();

                for(var k in inputfileds){
                    var input = inputfileds[k].getValue();
                    var output = (input/100)*(channelfileds_value/100);
                    outputfileds[k].setText(String(parseInt(output*10000)/100)+"%");
                }

            }
        }
        var channel_fee = Ext.create("Ext.form.field.Number",{
            fieldLabel : "渠道费率%",
            columnWidth : .8,
            labelWidth: 120,
            readOnly : (optype==='edit')?false:true,
            myStamp : "theMainfield",
            minValue : 1,
            maxValue : 100,
            allowBlank :false,
            blankText:"请输入渠道费率",
            product_id : data.product_id,
            value : String(data.channel_fee?data.channel_fee.channel_fee:'').replace("%",""),
            listeners : {
                "change" : thechagefn
            }
        });
        channel_fee_panel.add(channel_fee);

        for(var i in data.fee){
            var field_lable = Ext.create("Ext.form.Label",{
                text : data.fee[i].field_name + "：",
                columnWidth : .5,
                labelWidth: 80,
                height: 40,
                baseCls : 'lablelablename'
            });

            var field_value = Ext.create("Ext.form.Label",{
                text : "",
                columnWidth :.5,
                labelWidth: 80,
                height: 40,
                myStamp : "theoutputfield",
                baseCls : 'labletextcenter'
            });

            var field = Ext.create("Ext.form.field.Number",{
                xtype : 'textfield',
                fieldLabel : data.fee[i].field_name + "占比%",
                columnWidth : 1,
                labelWidth: 120,
                readOnly : (optype==='edit')?false:true,
                height: 40,
                minValue : 0,
                maxValue : 100,
                product_id : data.fee[i].product_id,
                field_id : data.fee[i].field_id,
                value : String(data.fee[i].field_value).replace("%",""),
                allowBlank :false,
                myStamp : "theinputfield",
                baseCls : 'lineheight40',
                blankText:"请输入渠道费率",
                listeners : {
                    "change" : thechagefn
                }
            });

            outputfileds_panel.add(field_lable);
            outputfileds_panel.add(field_value);
            inputfileds_panel.add(field);
        }


        thechagefn();

//==================================================================
        //theoutputfileds



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
        if(cfg.pmsCode === 'productrate.edit'){
            if(record.data.fee_status !=1 && record.data.fee_status !=3 )return false;
        }
        
        return true;
    }

});