<?php
namespace Workflow\Model;
use Think\Model;
class  FormtableFieldsModel extends Model{
    //取出formtable_fields字段值
    public function  getFieldValue($fieldid,$fildname){
        $value=$this->where(['fieldid'=>$fieldid])->getField($fildname);
        return $value;
    }
    //验证字段名是否重复
    public function  is_one($formtableid,$fieldname){
        $where['formtableid']=$formtableid;
        $where['fieldname']=$fieldname;
        $data=$this->where($where)->select();
        if(!empty($data)){
            return true;
        }else{
            return false;
        }
    }
    public function editField(array $edit_data,$fieldid){
        $new_data=array();
        //先取出数据,通过比较，取出有变动的数据
        $data=$this->where(['fieldid'=>$fieldid])->find();
        if($edit_data['fieldname']!=$data['fieldname'])$new_data['fieldname']=$edit_data['fieldname'];
        if($edit_data['fieldtitle']!=$data['fieldtitle'])$new_data['fieldtitle']=$edit_data['fieldtitle'];
        if($edit_data['length']!=$data['length'])$new_data['length']=$edit_data['length'];
        if($edit_data['decimal']!=$data['decimal'])$new_data['decimal']=$edit_data['decimal'];
        if($edit_data['default']!=$data['default'])$new_data['default']=$edit_data['default'];
        return $new_data;
    }
}