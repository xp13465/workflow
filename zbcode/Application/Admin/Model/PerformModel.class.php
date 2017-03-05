<?php

namespace Admin\Model;
use Think\Model;

class PerformModel extends Model
{   
    //通过时间,类型参数查找序列报表信息
    public function ConTimeType($time,$type){
        $Month['start_time'] = strtotime($time);
        $start_end_time = $time.'-'.date('t',date('m',$Month['start_time'])).' 23:59:59';
        $Month['end_time'] = strtotime($start_end_time);
        
        $line['type']    = $type;
        $line['_string'] = "time > ".$Month['start_time'] ." AND time < ".$Month['end_time'];
        $list            = $this->where($line)->select();
        $count           = count($list);
        for($i=0;$i<$count;$i++){
             $PerList['type'] = $list[$i]['type'];
             $PerList[]   = unserialize($list[$i]['value']);
        }
        return $list;
    }
}

