/**
 * 控制整个事件流程
 */
ScreenWidth = window.screen.availWidth;
ScreenHeight = window.screen.availHeight;

Ext.define('ui.ctrl.sysCtrl', {
    extend: 'ui.extend.baseClass.baseCtrl',
    constructor : function (cfg){
        this.modelConf = Ext.create('ui.conf.sysConfig');
        this.callParent(arguments);
    },
    requires : [
        'ui.conf.sysConfig'
    ],
    views : [
        'ui.mux.desknew.Desktop',
        'ui.extend.baseClass.baseWindow',
        'ui.extend.baseSummary.baseSummaryWindow'
    ],

    init: function() {
        Ext.getElementById("loading-mask").style.display = 'block';

        var me = this;
        //this.mask.show();//使用 mask 需手动调用show() 方法下

        this.control({
            'viewport > desknew': {
                //scope :
                render: function(e){
                    //console.log(e.ids);
                }
            },
            "ntaskbar" : {
                render : function(e){
                    //startbar render事件
                }
            },
            "deskcenterdataview" : {
                render : function(e){
                    var theme = this;
                    e.store.theCtrl = me;
                    e.getStore().load();   //调入桌面
                    var userMsgDiv = Ext.getElementById("user-message-box");
                    if(userMsgDiv){
                        userMsgDiv.style.display = 'block';
                        this.initUsrDiv1();
                        this.initUsrDiv2();
                    }
                    e.on('itemclick',this.nodeitemclick,this);
                    e.el.on('contextmenu' , e.onDesktopMenu,e); // 右键菜单
                    setInterval(function(){
                        theme.initUsrDiv1();
                    },600000)
                    setInterval(function(){
                        theme.initUsrDiv2();
                    },120000)
                }
            },
            "ndeskcenter" : {
                render : function(){
                    var theme = this;
                    var ctrl = this.ctrl;
                    var screenHeight = $(window).height();
                    var screenWidth = $(window).width();
                    var t1 = $("#table-hover-ganying-div").mouseenter(function(e){
                        $("#main-message-box .panel-hide-show-btn").width($("#main-message-box").width()).height($("#main-message-box").height()).show(150);
                    }).mouseleave(function(e){
                        $("#main-message-box .panel-hide-show-btn").hide(50);
                    });

                    $("#publicmore").click(function(){
                        me.$fireModuleEvents("publishednotice","view",{id:1});
                    });
                    // $("#table-logo").css('left', Math.round((screenWidth-388)/2)+"px");
                    // $("#table-logo").css('top', Math.round((screenHeight-175)/3)+"px");
                    // $(window).resize(function(){
                    //     var screenHeight = $(window).height();
                    //     var screenWidth = $(window).width();

                    //     $("#table-logo").css('left', Math.round((screenWidth-388)/2)+"px");
                    //     $("#table-logo").css('top', Math.round((screenHeight-175)/3)+"px");
                    // });

                    $("#main-message-box .panel-hide-show-btn .hs-btn-a,#user-message-box .message-box-title-close,#user-worktable-box .message-box-title-close").click(function(e){
                        var screenHeight = $(window).height();
                        var screenWidth = $(window).width();
                        var mewidth = $("#main-message-box").width();
                        var btn = $("#main-message-box .panel-hide-show-btn .hs-btn-a ");

                        if(!($("#main-message-box").hasClass('hidebar'))){
                            $("#main-message-box").addClass('hidebar').animate({
                                right : -(mewidth-2)+"px"
                            }, 100);
                            btn.html("&lt;");
                        }else{
                            $("#main-message-box").animate({
                                right : "10px"
                            }, 100).removeClass('hidebar').show();
                            btn.html("&gt;");
                        }
                    });
                    $('body').on('click','#user-message-box .message-box-content a',function(e){
                        var theid = $(this).attr('attrId');
                        me.$fireModuleEvents("firstnotice","view",{id:theid});
                    })
                    $('body').on('click','#user-worktable-box .message-box-content a',function(e){
                        var theid = $(this).attr('attrId');
                        me.$fireModuleEvents("dosomething","view",{id:theid});
                    })
                    $('body').on('click','#newMsgBtn',function(){
                         theme.initUsrDiv1()
                    }) 
                    $('body').on('click','#newSameBtn',function(){
                        theme.initUsrDiv2()
                    })
                    $('body').on('mouseenter','#main-message-box .message-box-content',function(){
                        $(this).addClass('active');
                    })
                    $('body').on('mouseleave','#main-message-box .message-box-content',function(){
                        $(this).removeClass('active');
                    })
                    
                }
            }
        });
    },

    initUsrDiv1 : function(div){
        //最新公告
        //Ext.DomHelper.append("user-message-box",'<a href="#">你好</a>');
         function __html2(tit,text,id,is_view){
            if(is_view == '0'){
                is_view = '<i class="btn_is_view">新</i>'
            }else{
                is_view = ''
            }
            var html ='';
            html +=' <div class="message-box-content">',
            html +='        <div class="message-box-content-ls">',
            html +='                <span class="myli message-box-content-ls-checkbtn">&nbsp;</span>',
            html +='                <div class="myli message-box-content-ls-content">',
            html +='                    <span class="message-box-content-ls-content-li tit">'+tit+'</span>',
            html +='                    <span class="message-box-content-ls-content-li text">'+text+'</span>',
            html +='                    '+ is_view ,
            html +='                </div>',
            html +='                <a href="javascript:;" class="myli-a my-li-a-transparent" attrId="'+id+'"></a>',
            html +='            </div> </div>';
            
            return html;
        }
        $.ajax({
             type: "POST",
             url: "/Admin/Message/getPublicMessageList",
             data: {'limit':2},
             dataType: "json",
             success: function(data){
                var items = data.items;
                $('#user-message-box .message-box-content').remove();
                for(var i =0;i<items.length;i++){
                    Ext.DomHelper.append("user-message-box",__html2(items[i].add_time,items[i].title,items[i].id,items[i].is_view));
                }
             }

        }) 
    },
    initUsrDiv2 : function(div){
        //待办事项
        //Ext.DomHelper.append("user-message-box",'<a href="#">你好</a>');
        
        function __html(tit,text,id,is_view){
            if(is_view == '1'){
                is_view = '<i class="btn_is_view">新</i>'
            }else{
                is_view = ''
            }
            var html ='';
            html +=' <div class="message-box-content">',
            html +='        <div class="message-box-content-ls">',
            html +='                <span class="myli message-box-content-ls-checkbtn">&nbsp;</span>',
            html +='                <div class="myli message-box-content-ls-content">',
            html +='                    <span class="message-box-content-ls-content-li tit">'+tit+'</span>',
            html +='                    <span class="message-box-content-ls-content-li text">'+text+'</span>',
            html +='                    '+ is_view  ,
            html +='                </div>',
            html +='                <a href="javascript:;" class="myli-a my-li-a-transparent" attrId="'+id+'"></a>',
            html +='            </div> </div>';

            return html;
        }
        $.ajax({
             type: "POST",
             url: "/Admin/Message/getUserMessageList",
             data: {'limit':5,'is_view':1},
             dataType: "json",
             success: function(data){
                var items = data.items;
                $('#user-worktable-box .message-box-content').remove();
                for(var i =0;i<items.length;i++){
                    Ext.DomHelper.append("user-worktable-box",__html(items[i].add_time,items[i].title,items[i].id,items[i].is_view));
                }
             }

        }) 
    },
    idsss: 'sysctrl',
    nodeitemclick : function(me, record, item, index, e, Opts ){
        var me = this;
        if(Ext.isEmpty(record.data.module)){
            this.loadFail("不能识别的模块标识");
        }else{
            var groupstr = record.data.group?record.data.group+".":"";  //指定模块目录
            var clsname = "ui.ctrl." + groupstr + record.data.module + "." + record.data.module +"Ctrl";
            var module = record.data.module;
            if(record.data.url){
                window.open(record.data.url);
                return;
            }
            //var confname = "ui.ctrl." + record.data.module + "." + record.data.module +"Conf";

            Ext.Loader.require([
                clsname
            ],function(d){
                var modelX = me.$createCtrlByClassName(clsname , module);
                if(!modelX) return;
                modelX.$fireEvent({
                    eventName :  'openManager',
                    params :　{node : record } ,
                    callback : function(p){
                        var panel = p . retobj;
                        var winparams = me.$getConfig('initwindowparams');

                        //panel.nodeData = record.data;
                        Ext.apply( winparams ,{
                            items : [panel] ,
                            iconCls : record.data.iconcls + '-win' ,
                            title : panel.title,
                            nodeData : record.data
                        });
                        if(record.data.group == 'summarys'){    //如果为summary容器，调用容器window
                            var win = Ext.create( 'ui.extend.baseSummary.baseSummaryWindow' , winparams );
                        }else{
                            var win = Ext.create( 'ui.extend.baseClass.baseWindow' , winparams );
                        }

                        if(startCommone) {
                            win.btnTo = startCommone.createBtn({
                                icon : win.iconCls,
                                title : win.title,
                                winTo : win
                            });
                        }
                        //var deskcenter = Ext.getCmp("mainDeskCenter");
                        me.$addWinToDesktop(win);

                        win.show();
                    }
                });
            },this);
        }
    },

    loadFail : function(msg){
        Ext.MessageBox.alert('调入模块失败', msg);
    }

});
