;(function($){
	
	var uiClasses={
		bodyWrap:'numbertext-bodyWrap',
		touchWrap:'numbertext-touchWrap',
		inputWrap:'numbertext-inputWrap',
		inputEl:'numbertext-inputEl',
		skipWrap:'numbertext-skipWrap',
		skipUp:'numbertext-skipUp',
		skipDown:'numbertext-skipDown',
	};
	
	function init (target){
		$(target).addClass(uiClasses['inputEl']);
				 // .wrap('<div class='+uiClasses['inputWrap']+'></div>');
		create(target);
	}
	function create(target){
		var opts=$(target).data('numbertext').options
		  	,domWrap=$('<div class=numbertext-bodyWrap>'
					 +'</div>')
			,domTouchWrap=$('<div class=numbertext-touchWrap>'
							+'<div class=numbertext-inputWrap>'
								// +'<input type=text class="m-numbertext numbertext-inputEl" data-options={"minValue":0,"maxValue":100,"stepValue":10,"decimalPrecision":0,"allowDecimals":false}"/>'
							+'</div>'
						+'</div>')
			,uiSkip=$('<div></div>')
					.addClass(uiClasses['skipWrap'])
			,skipUp=$('<div></div>')
					.addClass(uiClasses['skipUp'])
					// .bind('click',doUp)
					.bind('click',function(){
						var opts=$(target).data('numbertext').options
							,targetValue=$(target).val();

						targetValue===''?$(target).val(opts.stepValue):$(target).val(opts.allowDecimals?parseInt(targetValue)+opts.stepValue:parseFloat(targetValue)+opts.stepValue);
					})
			,skipDown=$('<div></div>')
					.addClass(uiClasses['skipDown'])
					// .bind('click',doDown)
					.bind('click',function(){
						var opts=$(target).data('numbertext').options
							,targetValue=$(target).val();
						targetValue===''?$(target).val(opts.stepValue):$(target).val(opts.allowDecimals?parseInt(targetValue)-opts.stepValue:parseFloat(targetValue)-opts.stepValue);

					});
		uiSkip.append(skipUp).append(skipDown);	

		if(opts.displaySkip)	
			uiSkip.appendTo(domTouchWrap);
		domWrap.append(domTouchWrap);
		
		var ui=$(target).wrap(domWrap);
		// opts.displaySkip?$(target).wrap(domTemp).find('.numbertext-touchWrap').append(uiSkip):$(target).wrap(domTemp);
		
			// ui.find('.numbertext-touchWrap').append(uiSkip);
	}
	function addEvents(target){

	}
	function setValue(target,value){
		$(target).val(value);
	}
	var doUp=function (target){
		var opts=$(target).data('numbertext').options
			,targetValue=$(target).val();

		$(target).val()===''?opts.stepValue:allowDecimals?parseInt(targetValue)+opts.stepValue:parseFloat(targetValue)+opts.stepValue;
	}
	 	,doDown=function (target){
		var opts=$(target).data('numbertext').options
			,targetValue=$(target).val();

		$(target).val()===''?opts.stepValue:allowDecimals?parseInt(targetValue)-opts.stepValue:parseFloat(targetValue)-opts.stepValue;
	}
	$.fn.numbertext=function(options){
		options=options || {};
		var self=this,
			key='numbertext',
			attribute='data-options',
			attributePostfix='options';
		self.each(function(){
			var data =$(this).data(key);
			if(data) $.extend(data.options,options);
			else{
				if(this.hasAttribute(attribute))
					$.extend(options,JSON.parse(this.dataset[attributePostfix]));
				data=$(this).data(key,'{"options":'+
					JSON.stringify($.extend({},$.fn.numbertext.defaults,options))
				+'}');
			}
			init(this);
		});
		
	}
	$.fn.numbertext.defaults={
		minValue:0,
		maxValue:100,
		stepValue:1,
		allowDecimals:false,
		decimalPrecision:2,
		displaySkip:false,

	};
})($);