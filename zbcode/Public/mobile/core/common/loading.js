;~(function($){
	$M = $M || {};
	function create (){
		var uiLoadingTemplate='<div class="spinner">'
							  +'<div class="spinner-container container1">'
								  +'<div class="circle1"></div>'
								  +'<div class="circle2"></div>'
								  +'<div class="circle3"></div>'
								  +'<div class="circle4"></div>'
							  +'</div>'
							  +'<div class="spinner-container container2">'
								  +'<div class="circle1"></div>'
								  +'<div class="circle2"></div>'
								  +'<div class="circle3"></div>'
								  +'<div class="circle4"></div>'
							  +'</div>'
							  +'<div class="spinner-container container3">'
								  +'<div class="circle1"></div>'
								  +'<div class="circle2"></div>'
								  +'<div class="circle3"></div>'
								  +'<div class="circle4"></div>'
							  +'</div>'
							  +'</div>';
							  
		var uiLoading=$('<div class='+uiLoadingClasses['loading']+'></div>').append(uiLoadingTemplate);
					
		return uiLoading;
	}
	var uiLoadingClasses={
		loading:'loading-img',
		mask:'loading-mask'
		
	},
	
	 loading= Class.extend({
		defaults: {
			isShade:true,
		},
		init: function( options ){
			var self = this.self = this;
			$M.apply( this , options );
			self._isShow=false;
		},

		show:function(dom,isShade){
			var self=this
				 ,renderEle=$(dom)
				 ,uiLoading=(self.uiLoading)=create()
				 ,elem=renderEle[0],
					elemPosition=renderEle.css('position');
			uiLoading.appendTo($(dom));
			// self.isShade=isShade;
			if(elemPosition=='static' && elem.nodeName.toLowerCase()!='body') renderEle.css({position:'relative'});
			if(!!isShade || typeof(isShade)==='undefined'?self.defaults.isShade:isShade){
				renderEle.data('isShade',true );
				uiMask=(self.uiMask)=$('<div class='+uiLoadingClasses['mask']+'></div>').appendTo(renderEle);
			}
			// self._isShow=true;
			renderEle.data('_isShow',true);
		},
		hide:function(dom){
			var self=this
				,renderEle=$(dom);

			// self.uiLoading.remove();
			$(dom).find('.loading-img').remove();
			if(renderEle.data('isShade')){
			// 	self.uiMask.remove();
				$(dom).find('.loading-mask').remove();
			}
			// self._isShow=false;
			renderEle.data('_isShow',false);
		}
		
		
	});

	$M.Loading=new loading;
})($);