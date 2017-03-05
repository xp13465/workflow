;(function($){
	function Ajaxs(data,callback_success){
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
	$M.Ajaxs = Ajaxs;
})($)