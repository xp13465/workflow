;(function(){
	$M = $M || {};
	$M.popPages = $M.pageBox.extend({
		init : function(){
			var option = {
				pop : true ,
				mode : "xy",
				pages : []
			}
			this._super.prototype.constructor.call(this , option);
		},

		goPrevPage : function(){  //
			var me = this;
			// var mectrl = me.
			var cur = this.silder.curPageIndex;
			var ret = this.silder.goPrevPage.call(this.silder , true , function( silder ){
				me.pages.splice( cur , 1 );
			});

			if(ret === -1){
				this.hideBox();
			}

			 
		},

		hideBox : function(){
			var me = this;
			$(me.el).animate({"left" : SCREENWIDTH}, 200);
		}

	});
})();