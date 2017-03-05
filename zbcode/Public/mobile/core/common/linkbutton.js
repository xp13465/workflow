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
		error:'message-error',
		warn:'message-warn',
		info:'message-info',
		question:'message-question',
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
		
		
		
		show:function(data){
			var self=this;
			self._create(data);
			self.uiDialog.show();
		},
		isOpen: function() {
			return this._isOpen;
		},
		alert:function(title,msg,icon,fn){
			var self=this;
			if(self.isOpen()) return;
			var content='<div class='+uiDialogClasses['content']+'>'+msg+'</div>';
			switch(icon){
				case 'error':
					content='<div class='+uiDialogClasses['error']+'></div>'+content;
				case 'warn':
					content='<div class='+uiDialogClasses['warn']+'></div>'+content;
				case 'info':
					content='<div class='+uiDialogClasses['info']+'></div>'+content;

			} 	
			
			var buttons={};
			buttons[self.defaults.buttons.ok]=function(){
				alertDialog.remove();
				uiMask.remove();
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
				uiMask=$('<div class='+uiDialogClasses['mask']+'></div>').appendTo('body');
				
			}
			self._isOpen=true;
		},
		confirm:function(title,msg,fn){
			var self=this;
			if(self.isOpen()) return;
			var content='<div class='+uiDialogClasses['content']+'>'+msg+'</div>';
			content='<div class='+uiDialogClasses['question']+'></div>'+content;	
			
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