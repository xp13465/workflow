/**
 * Created by Administrator on 2016/1/10 0010.
 */
isDefined = function (pa){
    //if(!pa) return false;
    return (typeof(pa)==='undefined')?false:true;
}

$findByparam = function(the , param){
    return  the.queryBy(function(){
        var flag = true;
        for(var i in param){
            flag = flag && (this[i] === param[i])
        }
        return flag;
    });
}

isCheckPermissionCode = function(params){
    return (isDefined(params.checkpms) && params.checkpms == 1 && isDefined( params.permissionCode ) && params.permissionCode!="" );
}

$findFatherByFieldName = function(theone,option){
    if(!option || !theone) return null;
    var father = theone.ownerCt;
    var key ='', value = null;
    var tmparr = [];var flag = true;
    while(father){
        tmparr = [];
        for(var k in option){
            tmparr.push((father[k] === option[k]));
        }
        flag = true;
        for(k in tmparr){
            flag = (flag && tmparr[k]);
        }
        if(flag) {
            return father;
        }else{
            father = father.ownerCt;
        }
    }
    return null;
}

$findChldByFieldName  = function(theList , option){
    if(!option || !theList) return null;
    var key ='', value = null;
    var tmparr = [];var flag = true;
//console.log(theList);return;
    for(var i in theList){
        tmparr = [];
        for(var k in option){
            tmparr.push((theList[i] && theList[i][k] && theList[i][k] === option[k]));
        }
        flag = true;
        for(k in tmparr){
            flag = (flag && tmparr[k]);
        }
        if(flag) {
            return theList[i];
        }
    }
    return null;
}