$(function(){
	function ajaxs(data,callback_success){
		var type = data.type||'post';
		var url = data.url;
		var datas = data.data||'';
		var dataType = data.dataType;
		$.ajax({
			type:type,
			url:url,
			data: datas,
			dataType: dataType||'json',
			success: function(data){
			   callback_success(data)
			},
			error: function(xhr, type){
			    console.log('异常错误!');
			}
		})
	}
	//登录页面
	$('body').height(window.screen.height)
	$('#login .btnLoginFn').tap(function(){
		
		

		var btnEmail = $('#login .btnEmail').val();
		var btnPwd = $('#login .btnPwd').val();
		if(!btnEmail || !btnPwd){
			alert('邮箱或密码不能为空！')
			return;
		}
		ajaxs({
			url:'/admin/common/login',
			data: {
				 email: btnEmail,
				 password: btnPwd
				}
			},
			function(data){
			   var flag = data.status;
			   if(flag == 1){
			   		window.location.href = "/admin";
			   }else{
			   	 	alert(data.msg);
			   }
			}
		)
	})
	//忘记密码页面
	$("#findpsd .btnFindpwdFn").tap(function(){
		
		//alert($('#sub').attr("lock"));
		if($('#sub').attr("lock")=='true'){			
			return ;		
		}
		$('#sub').attr("lock",true);
		var btnEmail = $('#findpsd .btnEmail').val();
		var btnYzm = $('#findpsd .btnYzm').val();
		if(!btnEmail || !btnYzm){
			alert('邮箱或验证码不能为空！');
			$('#sub').attr("lock",false);
			return;
		}
		
		
		ajaxs({
			url:'/admin/common/findPassword',
			data: {
				 email: btnEmail,
				 verify: btnYzm
				}
			},
			function(data){
			   
			   var flag = data.status;
			   if(flag == 1){
			   		$('#sub').attr("lock",false);
					$("#findpsd").addClass('isFindpsdShow');
			   }else{
			   		$('#sub').attr("lock",false);
					$('#findpsd .btnYzm').val('');
			   	 	alert(data.msg);
			   	 	$("#changeYzm").trigger('tap');
			   	 	
			   }
			}
		)
	})
	//忘记密码验证码给换
	$("#changeYzm").tap(function(){
		var datacode = new Date().getTime();
		var src = $(this).attr('src').split('?')[0];
		src += '?width=70&height=36&time='+datacode;
		$(this).attr('src',src);
	})

	//注册多级联动 
	var select_department_one = $('#select_department_one');
	var select_leader = $('#select_leader');
	if(select_department_one){
		ajaxs({
			url:'/Admin/Common/departmentList'
		},function(data){
			var data = data;
			var htmls ='<option value="">请选择一级部门</option>';
			for(var i=0;i<data.length;i++){
				htmls += '<option value="'+data[i].id+'">'+data[i].name+'</option>'
			}
			$('#select_department_one').html(htmls);
		})
	}
	if(select_leader){
		ajaxs({
			url:'/Admin/Common/leaderList'
		},function(data){
			var data = data;
			var htmls ='<option value="">请选择分管领导</option>';
			for(var i=0;i<data.length;i++){
				htmls += '<option value="'+data[i].id+'">'+data[i].name+'</option>'
			}
			$('#select_leader').html(htmls);
		})
	}
	$('#select_department_one').change(function(){
		var flag = $(this).val();
		if(flag){
			ajaxs({
				type:'get',
				url:'/Admin/Common/departmentList',
				data:{
					'department_id':flag
				}
			},function(data){
				var data = data;
				var htmls ='<option value="">请选择二级部门</option>';
				for(var i=0;i<data.length;i++){
					htmls += '<option value="'+data[i].id+'">'+data[i].name+'</option>'
				}
				$('#select_department_two').html(htmls);
			})
		}
	})
	$('#select_department_two').change(function(){
		var flag = $(this).val();
		if(flag){
			ajaxs({
				type:'get',
				url:'/Admin/Common/positionList',
				data:{
					'department_id':flag
				}
			},function(data){
				var data = data;
				var htmls ='<option value="">请选择职位</option>';
				for(var i=0;i<data.length;i++){
					htmls += '<option value="'+data[i].id+'">'+data[i].name+'</option>'
				}
				$('#select_job').html(htmls);
			})

		}
	})
	//注册提交
	$('#register_btn').tap(function(){
		var flag = {};
		flag.email = $('#select_email').val();
		flag.password = $('#select_pwd').val();
		flag.realname = $('#select_name').val();
		flag.department_id = $('#select_department_two').val();
		flag.position_id = $('#select_job').val();
		flag.leader_id = $('#select_leader').val();
		flag.organization_id = $('#organization_id').val();
		var mes  = {
			email:'邮箱不能为空！',
			password:'密码不能为空！',
			department_id:'二级部门不能为空！',
			position_id:'职位不能为空！',
			leader_id:'分管领导不能为空！',
			realname:'姓名不能为空'
		};
		for(var i in flag){
			if(!flag[i]){
				alert(mes[i]);
				return;
			}
		}
		ajaxs({
			url:'/Admin/Common/register',
			data:{
				email:flag.email,
				password:flag.password,
				department_id:flag.department_id,
				position_id:flag.position_id,
				leader_id:flag.leader_id,
				realname:flag.realname,
				organization_id:flag.organization_id
			}
		},function(data){
			if(data.status == 1){
				$('#register').removeClass('showOne showTwo').addClass('showThree');
			}else{
				alert(data.msg);
			}
		})
	})
	//注册下一步
	$('#register_next').tap(function(){
		var flag = {};
		flag.email = $('#select_email').val();
		flag.password = $('#select_pwd').val();
		flag.select_pwd_confirm = $('#select_pwd_confirm').val() == $('#select_pwd').val()?true:false;
		var mes  = {
			email:'邮箱不能为空！',
			password:'密码不能为空！',
			select_pwd_confirm:'两次密码输入不一致！'
		};
		for(var i in flag){
			if(!flag[i]){
				alert(mes[i]);
				return;
			}
		}
		$('#register').removeClass('showOne').addClass('showTwo');
	})
	//注册上一步
	$('#register_prev').tap(function(){
		$('#register').removeClass('showTwo').addClass('showOne');
	})
})