<?php
namespace Admin\Model;
use Think\Model;

class ProductCategoryModel extends Model{
     
     //找子孙树
     public function GetSubTree($arr,$id){                               
        $subs=array();
        foreach($arr as $v){                                     
            if($v['pid']==$id){                                 
                $subs[]=$v;
                $subs=array_merge($subs,$this->GetSubTree($arr,$v['id'])); 
             }
        }
        return $subs;                                                   
     }
     
     /*根据Id获取单条记录*/
     public function getData($id){
         $find_list = $this->where('id='.$id)->find();
         return $find_list;
     }
     
     /*根据Id获取父类信息,当前产品信息*/
     public function getFather($id)
     {   
         $data['s_list'] = $this->getData($id);
         $data['f_list'] = $this->where('id='.$data['s_list']['pid'])->find();
         return $data;
     }

    /**
     * 获取一级产品类型
     * @param int $leavel 等级
     * @return mixed
     */
     public function getFirstLeavelList($leavel = 1)
     {
       $where['leavel'] = $leavel;
       $where['status'] = 1;
       $first_list = $this->where($where)->select();
       return $first_list;
     }
    public function getDownCategoryList($pid = 0){
        $data = array();
        if($pid){
            $where['pid'] = $pid;
            $where['status'] = 1;
            $data = $this->where($where)->select();
        }
        return $data;
    }
}
 