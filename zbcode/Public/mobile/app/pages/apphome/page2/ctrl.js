(function(){
    var ctrl = $M.ctrl.extend({
        init : function(){
            this._super.prototype.constructor.call( this , arguments );
        },

        click_button : function(){
            alert('bbb');
        }

    });

    return new ctrl();
})()