<?php
namespace Workflow\Controller;
use Think\Controller;
class  FormManagerController extends  WorkflowController{
      //表单所有字段查看
    public  function  viewFormTable(){
        if (I('get.formtableid')&&is_numeric(I('get.formtableid'))) {
                $formtable_fields=M('formtable_fields');
                $where['a.formtableid']=I('get.formtableid');
                //分页
                $page_size = I('post.limit') ? I('post.limit') : 20;
                $page_size = is_numeric($page_size) ? $page_size : 20;
                $limit_1 = I('post.start');
                $total = $formtable_fields->where($where)->alias('a')->join("__FORMTABLE_FIELDS_TYPE__ b on a.fieldtype = b.id","left")->join("__FORMTABLE_FIELDS_TYPE_CHILD__ c on a.fieldtypechild=c.id","left")->field('a.fieldid,a.fieldtitle,a.fieldname,a.fieldtype,a.fieldtypechild,a.length,b.name,c.name as childname')->where($where)->count();
                $data=$formtable_fields->alias('a')->join("__FORMTABLE_FIELDS_TYPE__ b on a.fieldtype = b.id","left")->join("__FORMTABLE_FIELDS_TYPE_CHILD__ c on a.fieldtypechild=c.id","left")->field('a.fieldid,a.fieldtitle,a.fieldname,a.fieldtype,a.fieldtypechild,(case when (a.length)=0 then "无" else a.length end) as `length`,(case when (a.decimal)=0 then "无" else a.decimal end) as `decimal`,b.name,c.name as childname')->where($where)->limit("$limit_1,$page_size")->select();
                $return_data = array(
                    'success' => 1,
                    'msg' => '成功',
                    'total' => $total,
                    'items' => $data,
                );
                // $this->assign('data',$data);
                // $this->display('test');
                // exit();

               $this->printJson($return_data);
        }else{
            $this->returnFalse();
        }
    }
    //ajax 返回字段子类型
    public  function  childReturn(){
        if(I('post.typeid')&&is_numeric(I('post.typeid'))) {
             $formtable_fields_type_child = M('formtable_fields_type_child');
             $data=$formtable_fields_type_child->field('id,name')->where(['typeid'=>I('post.typeid')])->select();
             $this->printJson($data);
        }else{
             $this->returnFalse();
        }
    }
   //返回所有字段类型
    public function  allFieldType(){
        if($_SERVER['REQUEST_METHOD'] == 'POST' || $_SERVER['REQUEST_METHOD']='GET'){
                $formtable_fields_type=M('formtable_fields_type');
                $data=$formtable_fields_type->select();
                $return_data = array(
                    'success' => 1,
                    'msg' => '成功',
                    'items' => $data,
                );
         } else {
               $return_data = array(
                'success' => 0,
                'msg' => '异常请求',
                'items' => array(),
            );
        }
           $this->printJson($return_data);
    }
    //表单字段新增和编辑
    public  function addEditFormField(){
         if(I('post.formtableid')&&is_numeric(I('post.formtableid'))){
              $formtableid=I('post.formtableid');
              $sub_data=I('post.');
              $formtable_fields=D('formtable_fields');
              $formtable_fields_type_child=M('formtable_fields_type_child');
              $count_add=$count_edit=0;
              //记录新增数据主键
              $id=array();
              //记录数据更新记录
              $update_data=array();
             //记录更新前的数据
             $old_data=array();
              foreach($sub_data['fieldtitle'] as $k=>$v){
                             //验证，必填字段不为空
                             if(empty($v)||empty($sub_data['fieldname'][$k])||empty($sub_data['name'][$k])||empty($sub_data['childname'][$k])) continue;
                              $data['formtableid']=$formtableid;
                              $data['fieldname']=$sub_data['fieldname'][$k];
                              $data['fieldtitle']=$v;
                              $data['fieldtype']=$sub_data['name'][$k];
                              $data['fieldtypechild']=$sub_data['childname'][$k];
                              //取出fieldstr
                              $data['fieldstr']=$formtable_fields_type_child->where(['id'=>$sub_data['childname'][$k]])->getField('fieldstr');
                              $data['length']=!empty($sub_data['length'][$k])?$sub_data['length'][$k]:0;
                              $data['decimal']=!empty($sub_data['decimal'][$k])?$sub_data['decimal'][$k]:0;
                            //新增
                            if(empty($sub_data['fieldid'][$k])){
                                 //验证字段名是否重复
                                 if($formtable_fields->is_one($formtableid,$sub_data['fieldname'][$k]))continue;
                                 $data['createuser'] = $data['modifyuser'] = $this->uid;
                                 $data['createtime'] = $data['modifytime'] = date('Y-m-d H:i:s');
                                 if($formtable_fields->add($data)){
                                     $count_add++;
                                     $id[]=$formtable_fields->getLastInsID();
                                 }
                            }
                            //编辑
                            else{
                                $where['fieldid']=$sub_data['fieldid'][$k];
                                $newdata=$formtable_fields->editField($data,$where['fieldid']);
                                //没何任何数据更新，跳过
                                if(empty($newdata))continue;
                                //查出更改前的数据值
                                $old_data=$this->selectData($where['fieldid'],$newdata);
                                $update_data['olddata'][]=$old_data;
                                $update_data['newdata'][]=$newdata;
                                $update_data['fieldid'][]=$where['fieldid']=$sub_data['fieldid'][$k];
                                $newdata['modifyuser'] = $this->uid;
                                $newdata['modifytime'] = date('Y-m-d H:i:s');
                                    if($formtable_fields->where($where)->save($data)){
                                        $count_edit++;
                                     }
                            }
              }
                  if($count_add>0)$this->add_fields($formtableid,$id,empty(I('post.parentid'))?'':I('post.parentid'));
                  if($count_edit>0)$this->update_fields($formtableid,$update_data,empty(I('post.parentid'))?'':I('post.parentid'));
                  $this->setSuccess('操作成功,成功新增'.$count_add.'组字段,'.$count_edit.'组字段被更新');
          }else{
                $this->display('add');
             //  $this->returnFalse();
          }
    }

  //自定义表单主表和明细表增加字段,专门用于新增(表单id,自定义字段id) eg:暂未加入错误回滚
   public function  add_fields($formtableid,array $fieldid,$parentid){
       $tableName='workflow_formtable' . $formtableid;
       if(!empty($parentid)) {
           $tableName=$tableName.'dt'.$parentid;
       }
       $db=M($tableName);
       $formtable_fields=M('formtable_fields');
       $map['fieldid']=['in',$fieldid];
       $add_fields=$formtable_fields->where($map)->select();
       foreach($add_fields as $k=>$v){
           $sql='ALTER TABLE '.$tableName.' ADD '.$v['fieldname'].' '.$v['fieldstr'];
           if($v['fieldstr']!='datetime'&&$v['fieldstr']!='date') {
               $v['fieldstr'] != 'decimal' ? $sql = $sql . '(' . $v['length'] . ')' : $sql = $sql . '(' . $v['length'] . ',' . $v['decimal'] . ')';
           }
                switch($v['fieldstr']){
                    case 'datetime':
                        $sql=$sql.' NOT NULL DEFAULT \'0000-00-00 00:00:00\'';
                        break;
                    case 'date':
                        $sql=$sql.' NOT NULL DEFAULT \'0000-00-00\'';
                        break;
                    case 'int':
                    case 'decimal':
                        $sql=$sql.' NOT NULL DEFAULT 0';
                        break;
                    default:
                        $sql=$sql.' NOT NULL DEFAULT \'\'';
                        break;
                }
             $sql=$sql.' COMMENT '.'\''.$v['fieldtitle'].'\'';
             $db->execute($sql,true);
       }
   }
    //自定义主表字段更改,专门用于主表和明细表编辑
    public  function  update_fields($formtableid,array $update_data,$parentid){
        $formtable_fields=D('formtable_fields');
        $tableName='workflow_formtable' . $formtableid;
        if(!empty($parentid)) {
            $tableName=$tableName.'dt'.$parentid;
        }
        $db=M($tableName);
        //${'workflow_formtable'.$formtableid}=M('workflow_formtable'.$formtableid);
        foreach($update_data['olddata'] as $k=>$v){
            $sql = 'ALTER TABLE '.$tableName. ' CHANGE column ';
            $fieldstr=$formtable_fields->getFieldValue($update_data['fieldid'][$k],'fieldstr');
            if($v['fieldname']){
                 $sql=$sql.$v['fieldname'].' '.$update_data['newdata'][$k]['fieldname'].' ';
            }else{
                $column=$formtable_fields->getFieldValue($update_data['fieldid'][$k],'fieldname');
                $sql=$sql.$column.' '.$column.' ';
            }
            $sql=$sql.$fieldstr;
            //判断是否为日期类型
            if($fieldstr=='datetime'){
                 $sql=$sql.' NOT NULL DEFAULT \'0000-00-00 00:00:00\'';
            }elseif($fieldstr=='date'){
                 $sql = $sql . ' NOT NULL DEFAULT \'0000-00-00\'';
            }elseif($fieldstr=='decimal'){
                 if($v['lenght']){
                     if($v['decimal']){
                         $sql = $sql . '(' . $update_data['newdata']['length'] . ',' . $update_data['newdata']['decimal'] . ')';
                     }else{
                         $decimal=$formtable_fields->getFieldValue($update_data['fieldid'][$k],'decimal');
                         $sql = $sql . '(' . $update_data['newdata']['length'] . ',' . $decimal . ')';
                     }
                 }else{
                      $length=$formtable_fields->getFieldValue($update_data['fieldid'][$k],'length');
                        if($v['decimal']){
                             $sql = $sql . '(' . $length . ',' . $update_data['newdata']['decimal'] . ')';
                        }else{
                             $decimal=$formtable_fields->getFieldValue($update_data['fieldid'][$k],'decimal');
                             $sql = $sql . '(' . $length . ',' . $decimal . ')';
                         }
                 }
            }
            else{
                    if($v['lenght']){
                        $sql = $sql . '(' . $v['length'] . ')';
                    }else{
                        $length=$formtable_fields->getFieldValue($update_data['fieldid'][$k],'length');
                        $sql = $sql . '(' . $length . ')';
                    }
            }
                    if($v['default']){
                        if($fieldstr!='datetime' || $fieldstr=='date'){
                            $sql=$sql.' NOT NULL DEFAULT' .$update_data['newdata']['default'];
                        }
                    }else{
                           $default=$formtable_fields->getFieldValue($update_data['fieldid'][$k],'default');
                           $default=$default==''?'\'\'':$default;
                           $sql=$sql.' NOT NULL DEFAULT ' .$default;
                    }
                   if($v['fieldtitle']){
                       $sql=$sql.' COMMENT '.'\''.$update_data['newdata'][$k]['fieldtitle'].'|||'.$update_data['fieldid'][$k].'\'';
                   }else{
                       $fieldtitle=$formtable_fields->getFieldValue($update_data['fieldid'][$k],'fieldtitle');
                       $sql=$sql.' COMMENT '.'\''.$fieldtitle.'|||'.$update_data['fieldid'][$k].'\'';
                   }
              $db->execute($sql,true);
        }
    }
    //查看更新数据前被更新字段的旧数据
   public function selectData($fieldid,array $newdata){
       $field='';
       foreach($newdata as $k=>$v){
           $field.=$k.',';
       }
       $field=substr($field,0,-1);
       $formtable_fields=M('formtable_fields');
       $data=$formtable_fields->field($field)->where(['fieldid'=>$fieldid])->find();
       return $data;
   }
   //查询自定义表单是否有数据
   public  function  isData($_tablename){
        $_tablename=M($_tablename);
         $data=$_tablename->field('id')->limit(1)->select();
         if(!empty($data)){
             return true;
         }else{
             return false;
         }
  }
    //删除主表或明细表自定义字段(支持批量删除)
    public function dropField(){
        if (I('post.formtableid')&&is_numeric(I('post.formtableid'))&&I('post.parentid')&&is_numeric(I('post.formtableid'))){
            $data=I('post.');
            $tableName='workflow_formtable' . I('post.formtableid');
            $formtable_fields=D('formtable_fields');
            if(!empty(I('post.parentid'))) {
                $tableName=$tableName.'dt'.I('post.parentid');
            }
            $db=M($tableName);
            foreach($data['fieldid'] as $k=>$v){
                if(empty($v)||!is_numeric($v))continue;
                $fieldname=$formtable_fields->getFieldValue($v,'fieldname');
                if($formtable_fields->where('fieldid='.$v)->delete()){
                    $sql='alter table '.$tableName.' drop column '.$fieldname;
                     echo $sql;
                    $db->execute($sql,true);
                }
            }

            $this->setSuccess('删除成功!');

        }else{
           $this->returnFalse();
           // $this->display('add');
        }
    }


    public function returnFalse(){
       $return_data = array(
            'success' => 0,
            'msg' => '非post提交或参数错误!',
            'items' => array(),
        );
        $this->printJson($return_data);
    }
}