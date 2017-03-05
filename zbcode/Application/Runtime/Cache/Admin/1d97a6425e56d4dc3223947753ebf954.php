<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
<link>
<meta charset="UTF-8">
<title>注册-<?php echo ($system_name); ?></title>
<link rel="stylesheet" href="/Public/UI/bootstarp/css/bootstrap.min.css">
<script src="/Public/UI/bootstarp/js/jquery.min.js"></script>
<script src="/Public/UI/bootstarp/js/bootstrap.min.js"></script>
<script src="/Public/UI/js/layer/layer.js"></script>
<link href="/Public/UI/css/zb.css">
<style type="text/css">
	html,body {
		height: 100%;
		padding: 0;
		margin: 0;
		background:url(/Public/UI/images/login_bg1.png);
		filter:"progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale')";
		-moz-background-size:100% 100%;
		background-size:100% 100%;
	}
	.box {
		#filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#6699FF', endColorstr='#6699FF'); /*  IE */
		#background-image:linear-gradient(bottom, #6699FF 0%, #6699FF 100%);
		#background-image:-o-linear-gradient(bottom, #6699FF 0%, #6699FF 100%);
		#background-image:-moz-linear-gradient(bottom, #6699FF 0%, #6699FF 100%);
		#background-image:-webkit-linear-gradient(bottom, #6699FF 0%, #6699FF 100%);
		#background-image:-ms-linear-gradient(bottom, #6699FF 0%, #6699FF 100%);
		#background-image: url("/Public/UI/images/backbround_2.png");
		-moz-background-size:100%;
		-webkit-background-size:100%;
		-o-background-size:100%;
		background-size:100%;
		margin: 0 auto;
		position: relative;
		width: 100%;
		height: 100%;
	}
	.login-box {
		width: 100%;
		max-width:400px;
		height: 400px;
		position: absolute;
		top: 35%;
		margin-top: -200px;

		left: 50%;
		/*设置负值，为要定位子盒子的一半宽度*/
		margin-left: -200px;
		/*设置负值，为要定位子盒子的一半高度*/

	}
	@media screen and (min-width:400px){
		.login-box {
			left: 50%;
			/*设置负值，为要定位子盒子的一半宽度*/
			margin-left: -200px;
		}
	}

	.form {
		width: 100%;
		max-width:500px;
		height: 275px;
		margin: 10px auto 0px auto;
		padding-top: 5px;
	}
	.login-content {
		height: 300px;
		width: 100%;
		max-width:400px;
		#background-color: rgba(255, 250, 2550, .5);
		float: left;
	}


	.input-group {
		margin: 0px 0px 20px 0px !important;
		display:block;
	}
	.form-control,
	.input-group {
		height: 50px;
		border-radius: 6px;
	}

	.form-group {
		margin-bottom: 0px !important;
	}
	.login-title {
		padding: 20px 10px;
		#background-color: rgba(0, 0, 0, .6);
	}
	.login-title h1 {
		margin-top: 10px !important;
	}
	.login-title small {
		color: #fff;
	}

	.link p {
		color: #fff;
		line-height: 20px;
		margin-top: 30px;
	}
	.btn-sm {
		padding: 8px 24px !important;
		font-size: 16px !important;
		background-color: rgba(64, 122, 206, .6);
		#background-color: #5bc0de;
		border-color: #5E9EE1;
		font-weight:bolder;

	}
	.btn-info:hover {
		color: #fff;
		background-color: #31b0d5;
		border-color: #269abc;
		background-color: rgba(64, 122, 206, .8);

	}
	#username{
		background: url(/Public/UI/images/icon-u.png)no-repeat;
		padding-left: 40px;
		background-color: #FFFFFF;
		background-position: 1px -3px;
	}
	#realname{
		background: url(/Public/UI/images/icon-u.png)no-repeat;
		padding-left: 40px;
		background-color: #FFFFFF;
		background-position: 1px -3px;
	}
	#password{
		background: url(/Public/UI/images/icon-p.png)no-repeat;
		background-color: #FFFFFF;
		background-position: 1px -3px;
		padding-left: 40px;
	}
	#repassword{
		background: url(/Public/UI/images/icon-p.png)no-repeat;
		background-color: #FFFFFF;
		background-position: 1px -3px;
		padding-left: 40px;
	}
	.col-xs-6 a:hover{
		text-decoration: none;
	}
	.hide{
		display: none;
	}
	#upstep-btn{
		background-color: #000;
		border-color: #000;
		background-color: rgba(0, 0, 0, .8);
	}
	#upstep-btn:hover{
		background-color: #000;
		border-color: #000;
		background-color: rgba(0, 0, 0, .9);
	}
</style>

</head>

<body>
<div class="box">
	<div class="login-box">
		<div class="text-center">
			<h1><small><img src="/Public/UI/images/logo_1.png"/> </small></h1>
		</div>
		<div class="login-content ">
			<div class="form">
				<form action="/Admin/common/register.html" method="post" autocomplete="off">
					<div class="first-step">
					<div class="form-group">
						<div class="col-xs-12">
							<div class="input-group">
								<!--<span class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span>-->
								<input type="text" id="username" name="email" class="form-control input-text" style="border-radius: 5px;" placeholder="邮箱">
							</div>
						</div>
					</div>
					<div class="form-group">
						<div class="col-xs-12">
							<div class="input-group">

								<input type="password" id="password" name="password" class="form-control" style="border-radius: 5px;" placeholder="密码">
							</div>
						</div>
					</div>

					<div class="form-group">
						<div class="col-xs-12">
							<div class="input-group">

								<input type="password" id="repassword" name="text" class="form-control" style="border-radius: 5px;" placeholder="确认密码">
							</div>
						</div>
					</div>
					</div>
					<div class="next-step" style="display: none;">
						<div class="form-group">
							<div class="col-xs-12">
								<div class="input-group">

									<input type="text" id="realname" name="realname" class="form-control" style="border-radius: 5px;" placeholder="姓名">
								</div>
							</div>
						</div>
						<!--<div class="form-group">-->
							<!--<div class="col-xs-12">-->
								<!--<div class="input-group">-->
									<!--&lt;!&ndash;<input type="text" id="realname" name="realname" class="form-control" style="border-radius: 5px;" placeholder="确认密码">&ndash;&gt;-->

									<!--<select id="organization" name="organization_id" class="input-lg form-control " style="border-radius: 5px;">-->
										<!--<option value="0">所属机构</option>-->
									<!--</select>-->
								<!--</div>-->
							<!--</div>-->
						<!--</div>-->
						<input type="hidden" id="organization" name="organization_id" value="<?php echo C('DEFAULT_ORGANIZATION');?>">
						<div class="form-group">
							<div class="col-xs-12">
								<div class="input-group">
									<!--<input type="text" id="realname" name="realname" class="form-control" style="border-radius: 5px;" placeholder="确认密码">-->

									<select id="dpment" name="department_id" class="input-lg form-control " style="border-radius: 5px;">
										<option value="0">所在部门</option>
									</select>
								</div>
							</div>
						</div>
						<div class="form-group" id="second_department_form" style="display: none;">
							<div class="col-xs-12">
								<div class="input-group">
									<!--<input type="text" id="realname" name="realname" class="form-control" style="border-radius: 5px;" placeholder="确认密码">-->

									<select id="second_department" name="department_id" class="input-lg form-control " style="border-radius: 5px;">
										<option value="0">所在部门</option>
									</select>
								</div>
							</div>
						</div>
						<div class="form-group">
							<div class="col-xs-12">
								<div class="input-group">

									<!--<input type="text" id="realname" name="realname" class="form-control" style="border-radius: 5px;" placeholder="确认密码">-->

									<select id="job" name="position_id" class="form-control input-lg" style="border-radius: 5px;">
										<option value="0" >职位</option>
									</select>
								</div>
							</div>
						</div>
						<div class="form-group">
							<div class="col-xs-12">
								<div class="input-group">
									<!--<input type="text" id="realname" name="realname" class="form-control" style="border-radius: 5px;" placeholder="确认密码">-->

									<select id="leader" name="leader_id" class="form-control input-lg" style="border-radius: 5px;">
										<option value="0" >分管领导</option>
									</select>
								</div>
							</div>
						</div>
					</div>
					<div class="form-group form-actions">
						<div class="col-xs-12 next-step-option hide">

							<button type="button" id="upstep-btn" class="btn btn-sm btn-info col-xs-5" style=" float: left;  border: 1px #000 solid;"><span class="glyphicon" style="font-size: 18px;">返回上一步</span></button>

							<button type="button" id="submit-btn" class="btn btn-sm btn-info col-xs-5"  style="float: right;"><span class="glyphicon" style="font-size: 18px;">提交</span></button>
						</div>
						<div class="col-xs-12 first-step-option">
							<button type="button" id="next-btn" class="btn btn-sm btn-info col-xs-12"><span class="glyphicon" style="font-size: 18px;">下一步</span></button>
						</div>
					</div>
					<div class="link">
						<!--<span class="col-xs-6" style="color: #FFFFFF; height: 20px; line-height: 20px; padding-top: 5px;"><input type="checkbox" id="remandme" style="padding-top: -10px;"> <small>五天内自动登陆</small></span>-->
						<span class="col-xs-6" style="color: #FFFFFF; height: 20px; line-height: 20px;"><a href="<?php echo U('common/findpassword');?>" style="float: left; color: #FFFFFF; padding-top: 10px; border-bottom: 1px #FFFFFF solid; "><small>忘记密码？</small></a> </span>

						<span class="col-xs-6" style="color: #FFFFFF; height: 20px; line-height: 20px;"><a href="<?php echo U('common/login');?>" style="float: right; color: #FFFFFF ;padding-top: 10px; border-bottom: 1px #FFFFFF solid; "><small>直接登录</small></a> </span>
					</div>
					<!--<div class="form-group">-->
					<!--<div class="col-xs-6 link">-->
					<!--<p class="text-center remove-margin"><small>忘记密码？</small> <a href="javascript:void(0)" ><small>找回</small></a>-->
					<!--</p>-->
					<!--</div>-->
					<!--<div class="col-xs-6 link">-->
					<!--<p class="text-center remove-margin"><small>还没注册?</small> <a href="javascript:void(0)" ><small>注册</small></a>-->
					<!--</p>-->
					<!--</div>-->
					<!--</div>-->
				</form>
			</div>
		</div>
	</div>
	<div id="layer-notice" class="hide" style="text-align: center;">
		<div style="vertical-align: middle; margin-top: 60px;">
			<div class="tip-msg" style="font-weight: bold; font-size: large;">提交成功<br/><span id="error_msg">等待审核</span><br/><br/></div>
			<div id="tips"><button type="button" class=" btn btn-success btn-lg " onclick="window.location.href = '<?php echo U('common/login');?>'">回到首页</button></div>
		</div>
	</div>
</div>
</body>
<script type="text/javascript">
	var screenH = $(window).height();
	var screenW = $(window).width();
//	alert(screenH);
//	alert(screenW);
	var bgArr = ['/Public/UI/images/login_bg1.png', '/Public/UI/images/login_bg2.png','/Public/UI/images/login_bg3.png'];
	setInterval(function(){
		//console.log(fRandomBy(0,2));
		$('body').css('background','url('+bgArr[fRandomBy(0,2)]+')').css({filter:"progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale')",'-moz-background-size':'100% 100%','background-size':'100% 100%'});

	}, 50000);
	//设定随机数的范围
	function fRandomBy(under, over){
		switch(arguments.length){
			case 1: return parseInt(Math.random()*under+1);
			case 2: return parseInt(Math.random()*(over-under+1) + under);
			default: return 0;
		}
	}

	$('#next-btn').click(function(){
		var email = $('#username').val();
		var password = $('#password').val();
		var repassword = $('#repassword').val();
		if(!email){
			//alert('邮箱不能为空');
			showMsg('邮箱不能为空', 'username');
			return false;
		}
		if(!CheckMail(email)){
			//alert('邮箱格式不正确');
			showMsg('邮箱格式不正确', 'username');
			return false;
		}
		if(!password){
			//alert('密码不能为空');
			showMsg('密码不能为空', 'password');
			return false;
		}
		if(!repassword){
			//alert('密码不能为空');
			showMsg('确认密码不能为空', 'repassword');
			return false;
		}
		if(password != repassword){
			//alert('两次密码不一致');
			showMsg('两次密码不一致', 'repassword');
			return false;
		}
		$('.next-step').show();
		$('.first-step').hide();
		$('.next-step-option').removeClass('hide');
		$('.first-step-option').addClass('hide');

	});

	$('#upstep-btn').click(function(){
		$('.next-step').hide();
		$('.first-step').show();
		$('.next-step-option').addClass('hide');
		$('.first-step-option').removeClass('hide');
	});

	function CheckMail(mail) {
		var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if (filter.test(mail)) {
			return true;
		}
		else {
			return false;
		}
	}
	(function(){
		$.get(
				'/Admin/Common/departmentList',
				function(data){
					if(data.length > 0){
						var _data = $.parseJSON(data);
						//console.log(_data);
						var _option = '<option value="0">所在部门</option>';

						for(var i in _data){
							_option += '<option value=' +_data[i].id+'>'+_data[i].name+'</option>';
						}
						//console.log(_option);
						$('#dpment').html(_option);
					}

				}
		);
		$.getJSON(
				'/Admin/Common/leaderList',
				function(_data){
					var _option = '<option value="0">分管领导</option>';
					if(_data.length > 0){
						for(var i in _data) {
							_option += '<option value=' + _data[i].id + '>' + _data[i].name + '</option>';
						}
					}
					$('#leader').html(_option);
				}
		)

	})();
	$('#dpment,#second_department').change(function(){
		var department_id = $(this).val();
		if(department_id){
			if($(this).attr('id') == 'dpment'){
				$.getJSON(
						'/Admin/Common/departmentList?department_id='+department_id,
						function(_data){
							var _option = '<option value="0">选择部门</option>';
							if(_data.length > 0){
								for(var i in _data) {
									_option += '<option value=' + _data[i].id + '>' + _data[i].name + '</option>';
								}
							}
							$('#second_department').html(_option);
							if(_data.length){
								$('#second_department_form').show();
							}else{
								$('#second_department_form').hide();
							}
						}
				);
			}
			$.getJSON(
					'/Admin/Common/positionList?department_id='+department_id,
					function(_data){
						var _option = '<option value="0">职位</option>';
						if(_data.length > 0){
							for(var i in _data) {
								_option += '<option value=' + _data[i].id + '>' + _data[i].name + '</option>';
							}
						}
						$('#job').html(_option);
					}
			);

		}
	});

	$('#submit-btn').click(function(){
		var realname = $('#realname').val();
		if(!realname){
			showMsg('姓名不能为空', 'realname');
			return false;
		}
		$.post(
				'/Admin/common/register.html',
				$('form').serialize(),
				function(_data){
				if(_data.status == 1){
					//layer.alert(_data.msg);
					$('#layer-notice').removeClass('hide').show();
					layer.open({
						type: 1,
						title:false,
						closeBtn:0,
						//skin: 'layui-layer-rim', //加上边框
						area: ['420px', '240px'], //宽高
						content: $('#layer-notice'),
					});

				}else{
					layer.alert(_data.msg);
//					layer.alert(_data.msg, function(){
//						window.location.href = "<?php echo U('common/login');?>";
//					});
				}
		},
		'json');
	});
	function showMsg(msg, id){
		layer.tips(msg, '#'+id);
	}
</script>
</html>