(function(){
    var ctrl = $M.ctrl.extend({
        init : function(){
            this._super.prototype.constructor.call(this,arguments);
        },

        __linkpage__ : function(){
            App.linkPage({
                loads : {
                    remotedataUrl : "/Public/mobile/app/pages/apphome/template/json.json", //远程获取数据的url
                    templateUrl : "/Public/mobile/app/pages/apphome/template/view.html",
                    ctrljsUrl : "/Public/mobile/app/pages/apphome/template/ctrl.js",   //js地址
                    csscodeUrl : "/Public/mobile/app/pages/apphome/template/css.css",  //js地址
                },
                style : 'background:red;',
                width : this.elWidth,
                height : this.elHeight
            });
        } ,
        __submit_product__ : function(b){
            var me=this;
            var params = me.__getParams( b );
            var postData={'score':[]},
                productid;
			var j=0;
            $('.hiddiv').each(function(){
                var data={'group_id':'','product_id':'','score':''};
                data['group_id']=$(this).find('input[name="groupid"]').val();
                if(!productid) productid=data['product_id']=$(this).find('input[name="productid"]').val();
                if($(this).find('input[name="scorevalue"]').val()!=''){
					data['score']=$(this).find('input[name="scorevalue"]').val();
					postData['score'].push(data);
				}				
				j++;				
            });
            var status= $('input[name="status"]:checked').val(),
                reason=$('textarea[name="reason"]').val();
		

			if(postData['score'].length!=j){
				$M.Message.alert('提示','请输入完整的评分值','info');
			}

            postData['result']={'product_id':productid,'status':status,'reason':reason};
            console.log(postData);
            $M.Message.confirm('提示','确认操作吗','submit',function(result){
                console.log(result);
                if(result==true){
                    $M.Ajaxs({
                        url:'/product/saveProductScoreStatus',
                        data:JSON.stringify(postData),
                    },function(data){
                        if(data.status>0){
                            $M.Message.alert('提示','操作成功','info');
                            me.getPage().fatherPage.fatherPage.reloadPage();
                            App.backPrevPage();App.backPrevPage();
                        }else{
                            $M.Message.alert('提示',data.msg,'info');
                        }

                    });
                }
            });

        },
        __cancel_product__ : function(b){
            var me=this;
            var params = me.__getParams( b );
            $M.Message.confirm('提示','确认操作吗','submit',function(result){
                console.log(result);
                if(result==true){
                    $M.Ajaxs({
                        url:'/product/productRevoke',
                        data:{id:params.id},
                    },function(data){
                        if(data.status>0){
                            $M.Message.alert('提示','操作成功','info');
                        }else{
                            $M.Message.alert('提示',data.msg,'info');
                        }

                    });
                }
            });

        }      

    });

    return new ctrl();
})();