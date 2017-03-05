(function($){
	$M = $M || {};
	function createDialog (title,content,buttons){
		var uiDialog=(self.uiDialog)=$('<div class='+uiDialogClasses['window']+'></div>').appendTo(document.body),
			uiHeader=$('<div></div>').addClass(uiDialogClasses['header']),
			uiTitle=$('<div>'+title+'</div>').addClass(uiDialogClasses['title']),
			uiTool=$('<div></div>').addClass(uiDialogClasses['tool']),
			uiToolClose=$('<a href="javascript:void(0)"></a>').addClass(uiDialogClasses['close']),
			uiBody=$('<div></div>').addClass(uiDialogClasses['body']);
		uiTool.append(uiToolClose);
		uiHeader.append(uiTitle).append(uiTool);
		uiBody.append(content)
		uiDialog.append(uiHeader);
		uiDialog.append(uiBody);

		if(!!buttons){
			var tb=$('<div class='+uiDialogClasses['btnContainer']+'></div>').appendTo(uiDialog);
				for(var btn in buttons){
					$('<button class='+uiDialogClasses['btn']+'></button>')
						// .attr('href', 'javascript:void(0)')
						.text(btn)
						// .css('margin-left', 10)
						.bind('click', eval(buttons[btn]))
						.appendTo(tb);
					
				}
			}
		return uiDialog;
	}
	var uiDialogClasses={
		mask:'message-mask',
		window:'message-window',
		header:'message-header',
		title:'message-title',
		tool:'message-tool',
		close:'message-tool-close',
		btnContainer:'message-btnContainer',
		btnContainer:'message-btn',
		btn:'btn',
		body:'message-body',
		content:'message-content',
		iconContainer:'message-iconContainer',
		reject:'message-icon-reject',
		pause:'message-icon-pause',
		cancel:'message-icon-cancel',
		continue:'message-icon-continue',
		submit:'message-icon-submit',
		input:'message-input'
	},
	
	 message= Class.extend({
		defaults: {
			
			buttons: {
				ok:'确定',
				cancel:'取消'
			},
			isShade:true,
			
		},
		init: function( options ){
			var self = this.self = this;
			$M.apply( this , options );
			self._isOpen=false;
		},
		
		// _create:function(data){
		// 	var self = this,
		// 	options = self.options,
		// 	title = options.title || '&#160;',
		// 	 uiDialogTlp = '';
		// 		uiDialogTlp += '	<div class="alerts">';
		// 		uiDialogTlp += '		<div class="bg"></div>';
		// 		uiDialogTlp += '		<div class="con groupCon">';
		// 		uiDialogTlp += '			<div class="tit moveTitle">';
		// 		uiDialogTlp += '				<p>'+ data+'</p>';
		// 		uiDialogTlp += '			</div>';
		// 		uiDialogTlp += '			<div class="bt">';
		// 		uiDialogTlp += '				<a href="javascript:void(0);" class="btnOk">确定</a>';
		// 		uiDialogTlp += '			</div>';
		// 		uiDialogTlp += '		</div>';
		// 		uiDialogTlp += '	</div>';

		// 	uiDialog = (self.uiDialog = $(uiDialogTlp))
		// 		.appendTo(document.body)
		// 		// .append('body')
		// 		.hide()
		// 		.addClass(uiDialogClasses + options.dialogClass)
		// 		.css({
		// 			zIndex: options.zIndex
		// 		})
		// 		// setting tabIndex makes the div focusable
		// 		// setting outline to 0 prevents a border on focus in Mozilla
		// 		.attr('tabIndex', -1).css('outline', 0).keydown(function(event) {
		// 			if (options.closeOnEscape && !event.isDefaultPrevented() && event.keyCode &&
		// 				event.keyCode === $.ui.keyCode.ESCAPE) {
						
		// 				self.close(event);
		// 				event.preventDefault();
		// 			}
		// 		})
		// 		// .attr({
		// 		// 	role: 'dialog',
		// 		// 	'aria-labelledby': titleId
		// 		// })
		// 		// .mousedown(function(event) {
		// 		// 	self.moveToTop(false, event);
		// 		// });
		// 		$('.btnOk').on('click',function(){ 
		// 			uiDialog.remove();
		// 		})
			
				

		// },
		
		show:function(data){
			var self=this;
			self._create(data);
			self.uiDialog.show();
		},
		isOpen: function() {
			return this._isOpen;
		},
		alert:function(title,msg,fn,icon){
			var self=this;
			if(self.isOpen()) return;
			var content='<div class='+uiDialogClasses['content']+'>'+msg+'</div>';
			content='<div class='+uiDialogClasses['info']+'></div>'+content;
			// switch(icon){
			// 	case 'error':
			// 		content='<div class='+uiDialogClasses['error']+'></div>'+content;
			// 	case 'warn':
			// 		content='<div class='+uiDialogClasses['warn']+'></div>'+content;
			// 	case 'info':
			// 		content='<div class='+uiDialogClasses['info']+'></div>'+content;

			// } 	
			
			var buttons={};
			buttons[self.defaults.buttons.ok]=function(){
				alertDialog.remove();
				self.uiMask.remove();
				self._isOpen=false;
				if(fn && typeof fn==='function'){
					fn();
				}
				
			};
			// buttons[self.defaults.buttons.cancel]=function(){
			// 	alertDialog.remove();
			// 	self._isOpen=false;
			// };
			
			var alertDialog=createDialog(title,content,buttons);
			if(self.defaults.isShade){
				uiMask=(self.uiMask)=$('<div class='+uiDialogClasses['mask']+'></div>').appendTo('body');
				
			}
			self._isOpen=true;
		},
		confirm:function(title,msg,icon,fn){
			var self=this;
			if(self.isOpen()) return;
			icon=icon || 'question';
			var content='<div class='+uiDialogClasses['content']+'>'+msg+'</div>';
			content='<div class='+uiDialogClasses['iconContainer']+'><i class="message-icon-common '+uiDialogClasses[icon]+'" /></div>'+content;
			
			var buttons={};
			buttons[self.defaults.buttons.ok]=function(){
				confirmDialog.remove();
				uiMask.remove();
				self._isOpen=false;
				if(fn && typeof fn==='function'){
					fn(true);
				}
				
			};
			buttons[self.defaults.buttons.cancel]=function(){
				confirmDialog.remove();
				uiMask.remove();
				self._isOpen=false;
				if(fn && typeof fn==='function'){
					fn(false);
				}
			};
			
			var confirmDialog=createDialog(title,content,buttons);
			if(self.defaults.isShade){
				uiMask=$('<div class='+uiDialogClasses['mask']+'></div>').appendTo('body');
				
			}
			self._isOpen=true;
		},
		prompt:function(title,msg,fn){
			var self=this;
			if(self.isOpen()) return;
			var content='<div class='+uiDialogClasses['question']+'></div>'
						+'<div class='+uiDialogClasses['content']+'>'+msg+'</div>'
						+'<input class='+uiDialogClasses['input']+' type="text"/>';
			var buttons={};
			buttons[self.defaults.buttons.ok]=function(){
				promptDialog.remove();
				uiMask.remove();
				self._isOpen=false;
				if(fn && typeof fn==='function'){

					fn($('.'+uiDialogClasses['input'],promptDialog).val());
				}
				
			};
			buttons[self.defaults.buttons.cancel]=function(){
				promptDialog.remove();
				uiMask.remove();
				self._isOpen=false;
				if(fn && typeof fn==='function'){
					fn(false);
				}
			};
			
			var promptDialog=createDialog(title,content,buttons);
			if(self.defaults.isShade){
				uiMask=$('<div class='+uiDialogClasses['mask']+'></div>').appendTo('body');
				
			}
			self._isOpen=true;
		}
		
	});

	window.Message = $M.Message=new message;
})($);