(function(){
    var ctrl = $M.ctrl.extend({
        init : function(){
            this._super.prototype.constructor.call(this,arguments);
        },

        __gotoitem__ : function(li){
            var status=$(li).attr('status');
            alert(status);
        },

        __assign_user_role__ : function(b){
            var me=this;
            
            var user_id=$('#uid').val();
            var params = me.__getParams( b );			
			var className=$(b).attr('class');

			$(b).addClass("cur");
			
			//return false;
			if(className=='cur'){
				
				$M.Message.confirm('提示','确定取消分配吗？','submit',function(result){
                console.log(result);
                if(result==true){
						$M.Ajaxs({
							url:'/access/delRole',
							data:{uid:user_id,role_id:params.id},
						},function(data){
							if(data.status>0){
								$M.Message.alert('提示','操作成功','info');
							}else{
								$M.Message.alert('提示',data.msg,'info');
							}

						});
					 }
				});
			
			}else{
				
				$M.Message.confirm('提示','确定分配吗？','submit',function(result){
                console.log(result);
                if(result==true){
						$M.Ajaxs({
							url:'/access/setRole',
							data:{uid:user_id,role_id:params.id},
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

			
			

            

        }
    });

    return new ctrl();
})();