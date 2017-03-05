/**
 * Created by Administrator on 2015/12/24 0024.
 */
Ext.define( 'ui.view.producttypeparam.Coms.subTabPanel', {
    extend: 'ui.extend.base.Panel',
    alias: 'widget.producttypeparamviewpanel',
    layout : 'column',
    padding : 10,
    fields : [],
    autoScroll : true,
    myStamp : 'theForm',
    closeAction : "destroy",
    constructor : function(cfg){
        Ext.apply(this,cfg);
        this.callParent(arguments);

        var me = this;
        var ctrl = this.ctrl;
        var fields = this.fields;
        var optype = this.opType;

        if(optype==='edit') {
            var addPanel = Ext.create("ui.extend.base.Panel", {
                border: 0,
                columnWidth: 1,
                padding: 8,
                items: [
                    {
                        xtype: 'button',
                        text: '新增字段',
                        width: 100,
                        height: 30,
                        handler: function () {
                            var filedpanel = me.getFieldPanel.call(me, {
                                field_id: "",
                                field_type: "",
                                field_option: "",
                                category_id: me.category_id
                            });
                            me.insert(1, filedpanel);
                            me.doLayout();
                        }
                    }
                ]
            });
        }

        this.add(addPanel);

        for(var i in fields){
            if(this.opType === 'edit'||this.opType === 'view'){
                var filedconf = {};
                Ext.apply(filedconf , fields[i]);

                var thefieldPanel = me.getFieldPanel(filedconf);


                this.add(thefieldPanel);
                this.doLayout();
            }
        }
    },

    getFieldPanel : function(filedconf){
        //if(!filedconf)return null;
        var me =  this;
        var ctrl = me.ctrl;

        var fieldtitle = Ext.create("Ext.form.field.Text",{
            fieldLabel : '标题',
            labelWidth: 50,
            myStamp : 'field',
            name : 'field_name',
            allowBlank :false,
            blankText:"请填写标题",
            field_id : filedconf.id,
            category_id  : filedconf.category_id,
            value : filedconf.field_name,
            readOnly : true,
            columnWidth :.26
        });
        var fieldtype =  Ext.create("Ext.form.field.ComboBox",{
            fieldLabel : '类型',
            labelWidth:50,
            myStamp : 'field',
            name : 'field_type',
            columnWidth:.26,
            margin: 6,
            field_id : filedconf.id,
            filedType : 'ComboBox',
            allowBlank :false,
            blankText:"请选择字段类型",
            editable:false,
            displayField	: 'display',
            valueField 	: "value",
            readOnly : true,
            value : filedconf.field_type,
            store : new Ext.data.ArrayStore({
                fields	: 	['value', 'display'],
                data	:	[[1,'短文本'],[2,'单选列表'],[5,'富文本']]
            })
        });

        var canelbutton = Ext.create( "Ext.button.Button",{
            text : '取消',
            height: 25,
            margin: '0 0 0 5',
            hidden : true,
            myStamp : 'btn',
            myMode : 'cancelbtn',
            bodyCls : 'button-qianyanse',
            columnWidth :.07,
            handler : function(btn){
                var filedPnale = $findFatherByFieldName(btn , { myStamp : 'thefieldPanel'});
                var edtbtn = this.previousSibling();
                edtbtn.setText('编辑');
                filedPnale.setBorder(0);
                edtbtn.enable();
                edtbtn.opmode = 'view';
                var fileds = fieldPanel.queryBy(function(){
                    return this.myStamp?true:false;
                });
                for(var i in fileds){
                    if(fileds[i].name == 'field_type') fileds[i].setValue(fieldPanel.theData.field_type);
                    if(fileds[i].name == 'field_name') fileds[i].setValue(fieldPanel.theData.field_name);
                    if(fileds[i].name == 'field_option') fileds[i].setValue(fieldPanel.theData.field_option);
                    fileds[i].setReadOnly(true);
                    this.setVisible(false);
                }

            }
        });

        var fieldoption = Ext.create("Ext.form.field.Text",{
            fieldLabel : '选项',
            labelWidth: 50,
            myStamp : 'field',
            name : 'field_option',
            emptyText:"选项以逗号分隔(如:是,否)" ,
            field_id : filedconf.id,
            category_id  : filedconf.category_id,
            value : filedconf.field_option,
            readOnly : true,
            columnWidth :.26
        });

        var editbutton = Ext.create( "Ext.button.Button",{
            text : '编辑',
            height: 25,
            margin: '0 0 0 10',
            opmode : 'view',
            myStamp : 'btn',
            myMode : 'editbtn',
            field_id  : filedconf.id,
            category_id  : filedconf.category_id,
            cancelBtn : canelbutton,
            bodyCls : 'button-qianyanse',
            columnWidth :.07,
            handler : function(){
                var btn = this;
                var filedPnale = $findFatherByFieldName(btn , { myStamp : 'thefieldPanel'});
                console.log(filedPnale);
                var fileds = fieldPanel.queryBy(function(f){
                    return f.myStamp === 'field'?true:false;
                });

                if( btn.opmode === 'view' ){
                    btn.setText("提交");
                    filedPnale.addCls("backgroundhuise");
                    btn.cancelBtn.setVisible(true);
                    btn.opmode = 'submit';
                    btn.disable();
                    var fn = function(f){
                        btn.enable();
                    }
                    for(var j in fileds){
                        fileds[j].setReadOnly(false);
                        fileds[j].un('change',fn ,btn);
                        fileds[j].on('change',fn ,btn);
                    }
                }else if(btn.opmode === 'submit'){
                    if(!fieldPanel.getForm().isValid()) return;

                    var postdata = fieldPanel.getForm().getValues();
                    Ext.apply(postdata,{id : btn.field_id , category_id : btn.category_id });
                    ctrl.__edit_category_field_by_id.call(ctrl,postdata , function(back){
                        if(back.status == 1){
                            if(postdata.field_option) fieldPanel.theData.field_option = postdata.field_option;
                            if(postdata.field_name) fieldPanel.theData.field_name = postdata.field_name;
                            if(postdata.field_type) fieldPanel.theData.field_type = postdata.field_type;
                            btn.opmode = 'view';
                            btn.setText('编辑');
                            filedPnale.setBorder(0);
                            btn.nextSibling().setVisible(false);
                            for(var j in fileds){
                                fileds[j].setReadOnly(true);
                            }
                        }
                    });
                }
            }
        });

        var delbutton = Ext.create( "Ext.button.Button",{
            text : '删除',
            height: 25,
            margin: '0 0 0 5',
            myStamp : 'btn',
            myMode : 'delbtn',
            field_id  : filedconf.id,
            category_id  : filedconf.category_id,
            bodyCls : 'button-qianyanse',
            columnWidth :.07,
            handler : function(btn){
                var filedPnale = $findFatherByFieldName(btn , { myStamp : 'thefieldPanel'});
                if(!btn.field_id){
                    filedPnale.destroy();
                    return;
                }
                me.ctrl.__del_group_field_by_id.call(me.ctrl , {field_id : btn.field_id},function(p){
                    if(p.status == 1 ){
                        filedPnale.destroy();
                    }
                });
            }
        });


        var addbutton = Ext.create( "Ext.button.Button",{
            text : '新增',
            height: 25,
            margin: '0 0 0 5',
            hidden : true,
            myStamp : 'btn',
            myMode : 'addbtn',
            field_id  : filedconf.id,
            category_id : filedconf.category_id,
            bodyCls : 'button-qianyanse',
            columnWidth :.07,
            handler : function(btn){
                var filedPnale = $findFatherByFieldName(btn , { myStamp : 'thefieldPanel'});

                if(!filedPnale.getForm().isValid())return ;
                var fileds = fieldPanel.queryBy(function(f){
                    return f.myStamp === 'field'?true:false;
                });
                var  btns = fieldPanel.queryBy(function(f){
                    return f.myStamp === 'btn'?true:false;
                });
                var postdata = filedPnale.getForm().getValues();
                Ext.apply(postdata,{category_id : btn.category_id});
                me.ctrl.__add_category_field_by_data.call(me.ctrl , postdata ,function(back){
                    if(back.status == 1){
                        var backdata = back.data;
                        backdata = backdata[0];
                        if(postdata.field_option) fieldPanel.theData.field_option = postdata.field_option;
                        if(postdata.field_name) fieldPanel.theData.field_name = postdata.field_name;
                        if(postdata.field_type) fieldPanel.theData.field_type = postdata.field_type;
                        filedPnale.setBorder(0);
                        btn.setVisible(false);
                        for(var j in fileds){
                            fileds[j].setReadOnly(true);
                        }
                        for(var j in btns){
                            btns[j].field_id = backdata.id ;
                            btns[j].category_id = backdata.category_id ;
                            if(btns[j].myMode === "editbtn"){
                                btns[j].setVisible(true);
                            }
                        }
                    }
                });
            }
        });

        if(this.opType==='edit'){
            var typeField=[fieldtitle , fieldtype , fieldoption , addbutton , editbutton , canelbutton , delbutton];
        }else{
            var typeField=[fieldtitle , fieldtype , fieldoption ];
        }

        var fieldPanel = Ext.create("ui.extend.base.Form" , {
            layout : 'column',
            columnWidth : 1,
            myStamp : 'thefieldPanel',
            border : 0,
            margin: "5 0",
            theData : filedconf,
            items :typeField ,
            listeners :　{
                'render' : function(thispanel){
                    var fileds = [fieldtitle , fieldtype , fieldoption];
                    //alert('render');
                    var flag = true;
                    for(var i in fileds){
                        if(!fileds[i].field_id){
                            flag = false;
                        }
                    }
                    if(!flag){
                        addbutton.setVisible(true);
                        editbutton.setVisible(false);
                        canelbutton.setVisible(false);

                        for(var i in fileds){
                            //alert('dddsss')
                            fileds[i].setReadOnly(false);
                        }
                    }
                }
            }
        });

        return fieldPanel;
    }
});