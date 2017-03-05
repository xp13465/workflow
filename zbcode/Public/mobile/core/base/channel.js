;(function(){
	$M = $M || {};
	$M.channel = $M.pageBox.extend({
		init : function(){
			this._super.prototype.constructor.apply(this , arguments);
		}
	});
})();