;(function(window){
	var alerts = function(){};
	alerts.prototype.show = function(data){
		var temp = '';
		temp += '	<div class="alerts">';
		temp += '		<div class="bg"></div>';
		temp += '		<div class="con groupCon">';
		temp += '			<div class="tit moveTitle">';
		temp += '				<p>'+ data +'</p>';
		temp += '			</div>';
		temp += '			<div class="bt">';
		temp += '				<a href="javascript:;" class="btnOk">确定</a>';
		temp += '			</div>';
		temp += '		</div>';
		temp += '	</div>';
		var template = $(temp);
		$('body').append(template);
		$('.btnOk').on('tap',function(){ 
			$(template).remove();
		})
		// setTimeout(function(){
		// 	$(template).remove();
		// },5000)
	}
	window.alerts = new alerts;
})(window)

;(function(window){
	var confirms = function(){};
	confirms.prototype.show = function(data,callback){
		var temp = '';
		temp += '	<div class="confirms ">';
		temp += '		<div class="bg"></div>';
		temp += '		<div class="con groupCon">';
		temp += '			<div class="icon">';
		temp += '				<img src="images/icon_stop.png">';
		temp += '			</div>';
		temp += '			<div class="tit moveTitle">';
		temp += '				<p>'+ data +'</p>';
		temp += '			</div>';
		temp += '			<div class="tigs">';
		temp += '				<p>Are you sure to reject?</p>';
		temp += '			</div>';
		temp += '			<div class="bt">';
		temp += '				<a href="javascript:;" class="ok btnOk">确定</a>';
		temp += '				<a href="javascript:;" class="off btnReset">取消</a>';
		temp += '			</div>';
		temp += '		</div>';
		temp += '	</div>';
		var template = $(temp);
		$('body').append(template);
		$('.btnOk').on('tap',function(){
			callback(true);
			$(template).remove();
		})
		$('.btnReset').on('tap',function(){
			callback(false);
			$(template).remove();
		})
		// setTimeout(function(){
		// 	$(template).remove();
		// },2000)
	}
	window.confirms = new confirms;
})(window)