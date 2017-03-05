<?php
namespace Admin\Controller;

use Think\Controller;

Class ProductCategoryController extends  AdminController{

    CONST STATUS = 1;
    CONST LEAVEL = 1;
    CONST PID    = 1;
    public function index(){}


    /*---------------------产品类型begin---------------------*/

    //产品类型列表
    //可根据类型名称模糊查询
    public function ProductCategoryList()
    {
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
        //$where['d.leavel'] = 1;
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
    }

    /**
     * 获取类型信息
     */
    public function getCategoryInfo(){
        $id = I('param.id');
        if($id){
            $where['c.id'] = $id;
            $data = M('product_category as c')->field('c.*,pc.category_name as firstCategoryName')
                    ->where($where)
                    ->join(C('DB_PREFIX') . 'product_category as pc ON c.pid = pc.id')
                    ->find();
            $this->printJson($data);
        }
        $this->setError('参数有误');
    }

    //获取一级栏目数组
    public function getFirstCategory()
    {
        $CateModel = D('ProductCategory');
        $data = $CateModel->getFirstLeavelList(self::LEAVEL);
        $this->printJson($data);
    }

    //获取二级栏目数组
    public function getSecondCategory()
    {
        $data = array();
        $pid = I('param.pid');
        if($pid){
            $CateModel = D('ProductCategory');
            $data = $CateModel->getDownCategoryList($pid);
        }
        $this->printJson($data);
    }

    //修改产品类型
    public function UpdateProductCategory()
    {
        $CateModel = D('ProductCategory');
        $pid = I('param.pid');
        $id = I('param.id');
        if($id && $pid && I('param.category_name')){
            $data['pid'] = $pid;
            $data['id'] = $id;
            $data['category_name'] = trim(I('param.category_name'));
            $CateModel->startTrans();
            $status = $CateModel->save($data);
            if($status){
                $CateModel->commit();
                $this->setSuccess('修改成功');
            }else{
                $CateModel->rollback();
                $this->setError('修改失败');
            }
        }
        $this->setError('参数有误');
    }

    //删除产品类型接口
    //注：支持批量,单个删除,若产品类型是开启状态,产品类型下有产品,则无法删除
    public function DelProductCategory(){
        $model = M('product');
        if(I('param.id')){
            $id = trim(I('param.id'), ',');
            $id = explode(',', $id);
            $where['category_id'] = array('in', $id);
            $is_product = $model->where($where)->find();
            if(!empty($is_product)){
                $this->setError('此类型下有产品,不能删除');
            }else{
                $data['status'] = 3;
                $where['id'] = array('in', $id);
                unset($where['category_id']);
                $status = M('product_category')->where($where)->save($data);
                if($status){
                    $this->setSuccess('注销成功');
                }else{
                    $this->setError('注销失败');
                }
            }
        }
        $this->setError('参数有误');
    }

    /**
     * 启用、禁用状态改变
     */
    public function changeCategoryStatus(){
        $CateModel = D('ProductCategory');
        if(I('param.id') && I('param.status')){
            $id = trim(I('param.id'), ',');
            $id = explode(',', $id);
            $where['id'] = array('in', $id);
            $data['status'] = I('param.status');
            $status = $CateModel->where($where)->save($data);
            if($status){
                $this->setSuccess('操作成功');
            }else{
                $this->setError('操作失败');
            }
        }
        $this->setError('参数有误');
    }
    //增加一级产品类型
    public function addFirstCategory()
    {
        $CateModel = D('ProductCategory');
        $data['category_name'] = I('param.category_name');
        $data['add_time'] = date('Y-m-d H:i:s');
        $data['leavel'] = self::LEAVEL;
        $data['pid'] = 0;
        if(trim(I('param.category_name'))){
            $last_id = $CateModel->add($data);
            if($last_id){
                $this->setSuccess('添加成功', array('id'=>$last_id));
            }else{
                $this->setError('添加失败');
            }
        }
        $this->setError('参数有误');
    }
    //增加产品类型(二级产品类型名称)
    public function addSecondCategory(){
        $CateModel = D('ProductCategory');
        $data['pid'] = I('param.pid');
        $data['category_name'] = I('param.category_name');
        if($data['pid'] && $data['category_name']){
            $data['add_time'] = date('Y-m-d H:i:s');
            $data['leavel'] = 2;
            $is_inset = $CateModel->add($data);
            if($is_inset){
                $this->setSuccess('增加类型成功');
            }else{
                $this->setError('增加类型失败');
            }
        }
        $this->setError('参数有误');
    }

    /*---------------------产品类型end---------------------*/



    /*---------------------产品信息配置begin---------------------*/

    //查看产品基本信息字段视图方法
    //return 产品类型ID,类型pid,类型名,字段名,字段类型,字段类型值
    public function getCategoryField(){
        $fieldModel = M('product_category_field as zpcf');
        $CateModel = M('product_category');
        $id = I('param.id');
        //echo $id;
        /*获取父级信息*/
        if($id){
            $red = $CateModel->where('id='.$id)->find();
            $look_f_find = $CateModel->where('id='.$red['pid'])->find();
            $where['zpcf.category_id'] = $id;
            $where['zpcf.is_special'] = 0;
            $where['zpcf.status'] = 1;
            $fieldData = $fieldModel->where($where)->select();
            $data['category_id'] = $red['id'];
            $data['f_category_name'] = $look_f_find['category_name'];
            $data['category_name'] = $red['category_name'];
            $data['items'] = $fieldData;

            $this->printJson($data);
        }else{
            $this->setError('参数错误');
        }
    }

    /*产品信息配置end*/

    /**********************产品类型参数化数据列表，添加，修改，删除****************************/
    /**
     * @author xiaowen eidter
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
            ->select();
        $this->printJson($data);
//        $page = I('post.page') ? intval(I('post.page')) : 1;
//        $limit = I('post.limit') ? intval(I('post.limit')) : 10;
//        $category_name = I('post.category_name');
//        $where = '';
//        if($category_name){
//            //$where .= " c.category_name like '%" . trim($category_name) . "%'  and ";
//            $where['c.category_name'] = array('like', '%' . trim($category_name) . '%');
//        }
//
//        $where['f.status'] = array('in', '1,2');
//        $where['f.is_special'] = 0;
//
//        $data['total'] = M()->field('f.*,c.category_name')
//            ->table('__' . strtoupper('product_category_field') . '__ as f')
//            ->where($where)
//            ->join('__' . strtoupper('product_category') . '__ as c ON c.id = f.category_id', 'left')
//            ->count();
//
//        //$subsql = M()->field('cc.category_name')->table('__' . strtoupper('product_category') . '__ as cc ')->where('cc.id = c.pid')->buildSql();
//        $data['items'] = M()->field('f.*,c.category_name,pc.category_name as first_category_name')
//            ->table('__' . strtoupper('product_category_field') . '__ as f')
//            ->where($where)
//            ->join('__' . strtoupper('product_category') . '__ as c ON c.id = f.category_id', 'left')
//            ->join('__' . strtoupper('product_category') . '__ as pc ON pc.id = c.pid', 'left')
//            ->page($page, $limit)
//            ->select();
        //$this->printJson($data);
    }

    //增加产品基础参数
    public function addParamField()
    {
        $FieldModel = M('ProductCategoryField');
        $category_id = I('param.category_id');
        if(isset($category_id) && $category_id == 0){ //添加通用字段
            $add_data['category_id'] = 0;
            $add_data['is_special'] = 1;
        }else{
            //添加类型下的字段
            $add_data['category_id'] = $category_id;
        }
        if(!is_numeric($add_data['category_id'])){
            $this->setError('参数错误');
        }
        $field_name[] = I('param.field_name');
        $field_type[] = I('param.field_type');
        $field_option[] = I('param.field_option');

        foreach($field_type as $key=>$val){
            if($field_type[$key] == 3 || $field_type[$key]  == 4 || $field_type[$key]  == 2){
                $add_data['field_type']  = $field_type[$key];
                if(empty($field_option[$key])){
                    $this->setError('必填项');
                }else{
                    $add_data['field_option'] = str_replace('，', ',', trim($field_option[$key]));
                }
            }else if($field_type[$key] == 1 || $field_type[$key] == 5){
                $add_data['field_type']  = $field_type[$key];
                $add_data['field_option'] = '';
            }
            $add_data['field_name'] = $field_name[$key];
            $add_data['add_time'] = date('Y-m-d H:i:s');
            $is_insert = $FieldModel->add($add_data);
        }
        if($is_insert){
            $add_data['id'] = $is_insert;
            $this->setSuccess('添加成功', $add_data);
        }else{
            $this->setError('添加失败');
        }
    }

    /**
     * 编辑产品类型字段
     */
    public function editParamField(){
        $model = M('ProductCategoryField');
        $category_id = I('post.category_id') ? I('post.category_id') : 0;
        $field_name = I('post.field_name') ? I('post.field_name') : '';
        $field_id = I('post.id');
        $field_type = I('post.field_type');
        $field_option = I('post.field_option');
        $is_special = I('post.is_special'); //如果是添加默认分类的评分模块，取默认分类 1
        if($is_special){
            $data['is_special'] = $is_special;

        }
        if(($field_name && $field_id)){
            if(in_array($field_type, array(2,3,4))){
                if(trim($field_option)== ''){
                    $this->setError('该字段类型，选项值不能为空');
                }
            }
            $data['id'] = $field_id;
            $data['field_option'] = str_replace('，', ',', trim($field_option));
            $data['field_type'] = $field_type;
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
    public function getParamFieldInfo(){
        $field_id = I('post.id');
        if($field_id){
            $where['f.id'] = $field_id;
            //$subsql = M()->field('cc.category_name')->table('__' . strtoupper('product_category') . '__ as cc ')->where('cc.id = c.pid')->buildSql();
            $data = M()->field('f.*,c.category_name,c.pid,pc.category_name as first_category_name')
                ->table('__' . strtoupper('product_category_field') . '__ as f')
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
    public function delParamField(){
        $model = M('ProductCategoryField');
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
    /**
    //     * 添加费率字段
    //     */
//    public function addParamField(){
//        $model = M('ProductCategoryField');
//        $category_id = I('post.category_id') ? I('post.category_id') : 0;
//        $field_name = I('post.field_name') ? I('post.field_name') : '';
//        $is_special = I('post.is_special'); //如果是添加默认分类的评分模块，取默认分类 1
//        if($is_special){
//            $data['is_special'] = 1;
//
//        }
//        if($field_name && ($category_id > 0 || $is_special)){
//            $data['category_id'] = $category_id ? $category_id : 0;
//            $data['field_name'] = $field_name;
//            $data['add_time'] = date('Y-m-d H:i:s');
//            $status = $model->add($data);
//            if($status){
//                $this->setSuccess('添加成功'); //添加成功返回 {status = 1, msg = 成功插入的记录ID}
//            }else{
//                $this->setError('添加失败');
//            }
//        }
//        $this->setError('参数有误');
//    }
}