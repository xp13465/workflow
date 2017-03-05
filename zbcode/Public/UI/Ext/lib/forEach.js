//if (!Array.prototype.forEach) {
    $MY = {};
    $MY.forEach = function(list , callback, thisArg) {
        var T, k;
        if (list == null) {
            throw new TypeError(" this is null or not defined");
        }
        var O = Object(list);
        var len = O.length >>> 0; // Hack to convert O.length to a UInt32
        if ({}.toString.call(callback) != "[object Function]") {
            throw new TypeError(callback + " is not a function");
        }
        if (thisArg){
            T = thisArg;
        }
        k = 0;
        while (k < len){
            var kValue;
            if (k in O){
                kValue = O[k];
                callback.call(T, kValue, k, O);
            }
            k++;
        }
    };

    if (!Array.prototype.forEach){
        //Array.prototype.forEach = $MY.forEach;
    }
//}