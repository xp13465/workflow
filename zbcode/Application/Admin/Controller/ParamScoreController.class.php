<?php
/**
 * 评分参数配置
 * Class ParamScoreController
 * @package Home\Controller
 */
namespace Admin\Controller;
use Think\Controller;

class ParamScoreController extends AdminController
{
    /**
     * 评分参数列表
     */
    public function getParamList(){
        $page = I('param.page') ? I('param.page') : 1;
        $limit = I('param.limit') ? I('param.limit') : 20;
        $CateModel = D('ProductCategory');
        $category_name = I('param.category_name');
        $where = '';
        if(!empty($category_name)){
            $where['d.category_name'] = array('like', "%" . $category_name . "%");
        }
        $where['d.status'] = array('in', array(1,2));
        if(I('param.status')){
            $where['d.status'] = intval(I('param.status'));
        }
        $where['d.leavel'] = 2;
        $data['total'] = $CateModel->table('__' . strtoupper('product_category'). '__ as d')->where($where)->count();
        $data['items'] = $CateModel
            ->field('d.*,d1.category_name as firstcategory_name')
            ->table('__' . strtoupper('product_category'). '__ as d')
            ->where($where)
            ->join('__' . strtoupper('product_category'). '__ as d1 ON d.pid = d1.id','left')
            ->page($page, $limit)
            ->order('d.id desc')
            ->select();
        $this->printJson($data);
//        $page = I('post.page') ? intval(I('post.page')) : 1;
//        $limit = I('post.limit') ? intval(I('post.limit')) : 10;
//        $category_name = I('post.category_name');
//        //$category_name = '基金';
//        $where = '';
//        if($category_name){
//            $where .= " c.category_name like '%" . trim($category_name) . "%'  and ";
//        }
//        $where .= " f.status = 1 and g.is_special = 0";
//        $data['total'] = M()->field('f.*,g.group_name')
//            ->table('__' . strtoupper('category_group_field') . '__ as f')
//            ->where($where)
//            ->join('__' . strtoupper('category_group') . '__ as g ON g.id = f.group_id', 'left')
//            ->join('__' . strtoupper('product_category') . '__ as c ON c.id = g.category_id', 'left')
//            ->count();
//
//        //$subsql = M()->field('cc.category_name')->table('__' . strtoupper('product_category') . '__ as cc ')->where('cc.id = c.pid')->buildSql();
//        $data['items'] = M()->field('f.*,g.group_name,c.category_name,c.pid,pc.category_name as first_category_name')
//            ->table('__' . strtoupper('category_group_field') . '__ as f')
//            ->where($where)
//            ->join('__' . strtoupper('category_group') . '__ as g ON g.id = f.group_id', 'left')
//            ->join('__' . strtoupper('product_category') . '__ as c ON c.id = g.category_id', 'left')
//            ->join('__' . strtoupper('product_category') . '__ as pc ON c.pid = pc.id', 'left')
//            ->page($page, $limit)
//            ->select();
//        //echo M()->getLastSql();
//        $this->printJson($data);
    }
    /**
     * 添加评分组
     */
    public function addScoreGroup(){
        $model = M('CategoryGroup');
        $category_id = I('post.category_id') ? I('post.category_id') : 0;
        $is_special = I('post.is_special'); //如果是添加默认分类的评分模块，取默认分类 1
        //$is_special = 2;
        if($is_special){
            $data['is_special'] = $is_special;

        }
        $group_name = I('post.group_name') ? I('post.group_name') : '';
        //$group_name = '管理人评价';
        if(($category_id && $group_name) || $is_special > 0){
            $data['category_id'] = $category_id ? $category_id : 0;
            $data['group_name'] = $group_name;
            $data['add_time'] = date('Y-m-d H:i:s');
            $status = $model->add($data);
            if($status){
                $data['id'] = $status;
                $this->setSuccess('模块添加成功', $data);
                //$this->setSuccess($status); //添加成功返回 {status = 1, msg = 成功插入的记录ID}
            }else{
                $this->setError('评分模块添加失败');
            }
        }
        $this->setError('参数有误');
    }
    /**
     * 删除评分组
     */
    public function delScoreGroup(){
        $group_id = I('param.group_id');
        if($group_id){
            $where['group_id'] = $group_id;
            $where['status'] = 1;
            $fields = M('category_group_field')->where($where)->find();
            if(!empty($fields)){
                $this->setError('该组下存在参数字段，不能删除');
            }
            $data['id'] = $group_id;
            $data['status'] = 2;
            $status = M('CategoryGroup')->save($data);
            if($status){
                $this->setSuccess('操作成功');
            }else{
                $this->setError('操作失败');
            }
        }
        $this->setError('参数有误');
    }
    /**
     * 添加评分组字段
     */
    public function addScoreField()
    {
        $FieldModel = M('CategoryGroupField');
        //$category_id = I('param.category_id');
        $group_id = I('param.group_id');
        //$group_id = 1;
        if($group_id){
            $field_name[] = I('param.field_name');//'产品是否曾清盘';//
            $field_type[] = I('param.field_type');//'3';
            $field_option[] = I('param.field_option');//'是,否';

            $re_data = array();

            foreach($field_type as $key=>$val){
                if($field_type[$key] == 3 || $field_type[$key]  == 4 || $field_type[$key]  == 2){
                    $add_data['field_type']  = $field_type[$key];
                    if(empty(trim($field_option[$key], ','))){
                        $this->setError('必填项');
                    }else{
                        $add_data['field_option'] = trim($field_option[$key], ',');
                    }
                }else if($field_type[$key] == 1 || $field_type[$key] == 5){
                    $add_data['field_type']  = $field_type[$key];
                    $add_data['field_option'] = '';
                }
                $add_data['field_name'] = $field_name[$key];
                $add_data['add_time'] = date('Y-m-d H:i:s');
                $add_data['group_id'] = intval($group_id);

                $is_insert = $FieldModel->add($add_data);//superone 返回新增字段信息
                if($is_insert){
                    $re_data[] = array(
                        "field_id" => $is_insert,
                        "field_name" => $add_data['field_name'],
                        "field_type" => $add_data['field_type'],
                        "field_option" => $add_data['field_option'],
                        "group_id"  => $add_data['group_id']
                    );
                }
            }
            if(count($re_data)>0){
                $this->printJson(array('status'=> 1, 'msg'=>'添加字段成功', 'data'=> $re_data ));
                $this->setSuccess('添加成功');
            }else{
                $this->setError('添加失败');
            }
        }
        $this->setError('参数有误，无法获取评分模块ID');
    }
    /**
     * 编辑评分组字段
     */
    public function editScoreField()
    {
        $FieldModel = M('CategoryGroupField');
        $field_id = I('param.id');
        if($field_id){
            $field_name[] = I('param.field_name');
            $field_type[] = I('param.field_type') ? I('param.field_type') : 1;
            $field_option[] = I('param.field_option') ? I('param.field_option') : '';
            foreach($field_type as $key=>$val){
                if($field_type[$key] == 3 || $field_type[$key]  == 4 || $field_type[$key]  == 2){
                    $add_data['field_type']  = $field_type[$key];
                    if(empty(trim($field_option[$key], ','))){
                        $this->setError('选项表为必填项');
                    }else{
                        $add_data['field_option'] = trim($field_option[$key], ',');
                    }
                }else if($field_type[$key] == 1 || $field_type[$key] == 5){
                    $add_data['field_type']  = $field_type[$key];
                    $add_data['field_option'] = '';
                }
                $add_data['id'] = $field_id;
                $add_data['field_name'] = $field_name[$key];
                $add_data['update_time'] = date('Y-m-d H:i:s');
                $status = $FieldModel->save($add_data);
            }
            if($status){
                $this->setSuccess('修改成功');
            }else{
                $this->setError('修改失败');
            }
        }
        $this->setError('参数有误，无法获取评分模块ID');
    }
    /**
     * 获取参数字段信息
     */
    public function getScoreFieldInfo(){
        $field_id = I('post.id');
        //$field_id = 3;
        if($field_id){
            $where['f.id'] = $field_id;
            $subsql = M()->field('cc.category_name')->table('__' . strtoupper('product_category') . '__ as cc ')->where('cc.id = c.pid')->buildSql();
            $data = M()->field('f.*,g.group_name,c.category_name,c.pid,' . $subsql . ' as first_category_name')
                ->table('__' . strtoupper('category_group_field') . '__ as f')
                ->where($where)
                ->join('__' . strtoupper('category_group') . '__ as g ON g.id = f.group_id', 'left')
                ->join('__' . strtoupper('product_category') . '__ as c ON c.id = g.category_id', 'left')
                ->find();
            $this->printJson($data);
        }
        $this->setError('参数有误，无法获取字段ID');
    }
    /**
     * 注销、删除评分规则
     */
    public function delScoreField(){
        $model = M('CategoryGroupField');
        //$category_id = I('post.category_id') ? intval(I('post.category_id')) : 0;
        $field_id = I('param.field_id') ? I('param.field_id') : 0;
        //$field_id = '2,4';
        if($field_id){
            $field_id = explode(',', $field_id);
            $data['status']  = 2;
            $where['id']  = array('in', $field_id);
            $status = $model->where($where)->save($data);
            if($status){
                $this->setSuccess('操作成功');
            }else{
                $this->setError('操作失败');
            }
        }
        $this->setError('参数有误');
    }

    /**
     * 查看指定产品类型下所有的评分参数
     */
    public function getCategoryField(){
        $CateModel = D('ProductCategory as pc');
        $category_id = I('param.id');
        //$category_id = 15;
        /*获取父级信息*/
        if(!empty($category_id)){
            $red = $CateModel->where('id='.$category_id)->find();
            $look_f_find = $CateModel->where('id='.$red['pid'])->find();
            $data['f_category_name'] = $look_f_find['category_name'];
            $data['category_name'] = $red['category_name'];
            $data['items'] = M()->field(true)->table('__'.strtoupper('category_group').'__ as cg ')->where(array('category_id'=>$category_id, 'status'=>1))->select();
            foreach($data['items'] as $key=>$value){
                $data['items'][$key]['fields']= M()->field(true)->table('__'.strtoupper('category_group_field').'__ as cgf ')
                                                        ->where(array('group_id'=>$value['id'], 'status'=>1))
                                                        ->select();
            }
            $this->printJson($data);
        }else{
            $this->setError('参数错误');
        }
    }
}
