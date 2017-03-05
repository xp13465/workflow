<?php
/**
 * 费率参数配置
 * Class ParamFeesController
 * @package Home\Controller
 */
namespace Admin\Controller;
use Think\Controller;

class ParamFeesController extends AdminController
{
    /**
     * 参数列表
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
//        $where = '';
//        if($category_name){
//            $where .= " c.category_name like '%" . trim($category_name) . "%'  and ";
//        }
//        $where .= " f.status = 1 and f.is_special = 0";
//        $data['total'] = M()->field('f.*,c.category_name')
//            ->table('__' . strtoupper('category_fees_field') . '__ as f')
//            ->where($where)
//           // ->join('__' . strtoupper('category_group') . '__ as g ON g.id = f.group_id', 'left')
//            ->join('__' . strtoupper('product_category') . '__ as c ON c.id = f.category_id', 'left')
//            ->count();
//
//        //$subsql = M()->field('cc.category_name')->table('__' . strtoupper('product_category') . '__ as cc ')->where('cc.id = c.pid')->buildSql();
//        $data['items'] = M()->field('f.*,c.category_name,c.pid, pc.category_name as first_category_name')
//            ->table('__' . strtoupper('category_fees_field') . '__ as f')
//            ->where($where)
//            ->join('__' . strtoupper('product_category') . '__ as c ON c.id = f.category_id', 'left')
//            ->join('__' . strtoupper('product_category') . '__ as pc ON c.pid = pc.id', 'left')
//
//            ->page($page, $limit)
//            ->select();
//        //echo M()->getLastSql();
//        $this->printJson($data);
    }
    /**
     * 添加费率字段
     */
    public function addFeesField(){
        $model = M('CategoryFeesField');
        $category_id = I('post.category_id') ? I('post.category_id') : 0;
        $field_name = I('post.field_name') ? I('post.field_name') : '';
        $is_special = I('post.is_special'); //如果是添加默认分类的评分模块，取默认分类 1
        //$is_special = 1;
        if($is_special){
            $data['is_special'] = $is_special;

        }
        //$field_name = '渠道分成';
        if($field_name && ($category_id > 0 || $is_special)){
            $data['category_id'] = $category_id ? $category_id : 0;
            $data['field_name'] = $field_name;
            //$data['group_name'] = $group_name;
            $data['add_time'] = date('Y-m-d H:i:s');
            $status = $model->add($data);
            if($status){
                $data['id'] = $status;
                $this->setSuccess('添加成功', $data); //添加成功返回 {status = 1, msg = 成功插入的记录ID}
            }else{
                $this->setError('添加失败');
            }
        }
        $this->setError('参数有误');
    }

    /**
     * 编辑费率字段
     */
    public function editFeesField(){
        $model = M('CategoryFeesField');
        $category_id = I('post.category_id') ? I('post.category_id') : 0;
        $field_name = I('post.field_name') ? I('post.field_name') : '';
        $is_special = I('post.is_special'); //如果是添加默认分类的评分模块，取默认分类 1
        $field_id = I('param.id');
        //$is_special = 1;
        if($is_special){
            $data['is_special'] = $is_special;
        }
        //$field_name = '渠道分成';
        if($field_name && $field_id){
            $data['id'] = $field_id;
            $data['category_id'] = $category_id ? $category_id : 0;
            $data['field_name'] = $field_name;
            $data['update_time'] = date('Y-m-d H:i:s');
            $status = $model->save($data);
            if($status){
                $this->setSuccess('修改成功'); //添加成功返回 {status = 1, msg = 成功插入的记录ID}
            }else{
                $this->setError('修改失败');
            }
        }
        $this->setError('参数有误');
    }

    /**
     * 获取参数字段信息
     */
    public function getFeesFieldInfo(){
        $field_id = I('post.id');
        //$field_id = 2;
        if($field_id){
            $where['f.id'] = $field_id;
            $data = M()->field('f.*,c.category_name,c.pid,pc.category_name as first_category_name')
                ->table('__' . strtoupper('category_fees_field') . '__ as f')
                ->where($where)
                ->join('__' . strtoupper('product_category') . '__ as c ON c.id = f.category_id', 'left')
                ->join('__' . strtoupper('product_category') . '__ as pc ON c.pid = pc.id', 'left')
                ->find();
            $this->printJson($data);
        }
        $this->setError('参数有误，无法获取字段ID');
    }
    /**
     * 注销、删除费率字段
     */
    public function delFeesField(){
        $model = M('CategoryFeesField');
        $field_id = I('post.id') ? I('post.id') : 0;
        if($field_id){
            $field_id = explode(',', $field_id);
            $data['status']  = 2;
            $data['add_time']  = date('Y-m-d H:i:s');
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
    public function getCategoryField(){
        $fieldModel = M('category_fees_field as cff');
        $CateModel = M('product_category');
        $category_id = I('param.id');
        //$category_id = 18;
        /*获取父级信息*/
        if(!empty($category_id)){
            $red = $CateModel->where('id='.$category_id)->find();
            $look_f_find = $CateModel->where('id='.$red['pid'])->find();
            $where['cff.category_id'] = $category_id;
            $where['cff.is_special'] = 0;
            $where['cff.status'] = 1;
            $fieldData = $fieldModel->where($where)->select();
            $data['f_category_name'] = $look_f_find['category_name'];
            $data['category_name'] = $red['category_name'];
            $data['category_id'] = $red['id'];
            $data['items'] = $fieldData;
            $this->printJson($data);
        }else{
            $this->setError('参数错误');
        }
    }
}
