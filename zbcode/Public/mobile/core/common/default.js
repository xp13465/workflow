;(function($){
   var Type = {};
   var list = ['String','Array','Boolean','Object','Function','Number']
   for(var i=0;i<list.length;i++){
     (function(type){
        Type['is'+type]= function(obj){
           return Object.prototype.toString.call(obj) == '[object '+type+']'
        }
     })(list[i])
   }
  // Type.isArray([])
	$M.Type = Type;
})($)