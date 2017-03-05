<?php
namespace Admin\Controller;

use Think\Controller;

/**
 * @function:产品管理控制器
 * @package Admin\Controller
 * @author: xiaowen
 * @time 2016/1/4
 */
class ProductController extends AdminController
{
    /**
     *获取产品信息
     */
    public function getProductInfo()
    {
        //产品信息
        $product_id = I('param.id');
        if($this->checkUserPermission('contact.view')){
            $field = 'id,product_num,category_id,full_name,short_name,contact_tel,contacter,channel_fee,creater,creater_uid,term,add_time,end_time,total_moeny,introduction,status';
        }else{
            $field = 'id,product_num,category_id,full_name,short_name,channel_fee,creater,creater_uid,term,add_time,end_time,total_moeny,introduction,status';
        }
        //产品基本信息(包括新增信息)
        if($this->checkUserPermission('product.view')){
            $data['baseInfo']['base'] = $this->getProductFieldValue($product_id, $field);//基本信息
            $cate_id = $data['baseInfo']['base']['category_id'];
            $data['baseInfo']['base']['firstCateValue'] = $this->getFirstCategoryValue($cate_id);//分类信息
            $p_cate_info = $this->getProductCategoryFieldValue($product_id);
            $data['baseInfo']['cate'] = $p_cate_info;//分类信息
            $data['selfInfo'] = $this->productGetSelfFieldValue($product_id);
        }

        //评分字段信息
        if($this->checkUserPermission('score.view')){
            $data['scoreInfo'] = $this->getProductScoreField($product_id);
        }

        //读取评分结果
        //检查用户是否拥有查看评分结果和理由的权限，有的话显示所有评分结果，无的话查看当前用户的评分结果
        $uid = $this->checkUserPermission('reason.view') ? 0 : $this->uid;
        $data['scoreResult'] = $this->getProductScoreResult($product_id, $uid);
        //读取附件信息
        $data['attatch'] = array();
        if($this->checkUserPermission('attachments.view')){
            $data['attatch']['img'] = $this->getProductAttachment();
        }
        if($this->checkUserPermission('contract.view')){
            $data['attatch']['doc'] = $this->productGetContract($product_id);
        }
        if($this->checkUserPermission('rate.view')){
            $data['feeInfo'] = $this->getProductFeeInfo($product_id);
            $data['feeInfo']['feeRemark'] = $this->getProductFeesRemarkInfo($product_id);
        }
        if($this->checkUserPermission('productMeeting.view')){
            $data['meetingRemark'] = D('Product')->getProductMeetingRemark($product_id);
        }
        $this->printJson($data);
    }

    /**
     * 读取产品基本字段信息及其值
     * @param int $product_id 产品ID
     * @param string $field 字段名
     * @return boolean
     */
    public function getProductFieldValue($product_id = 0, $field = '')
    {
        $product_id = $product_id ? $product_id : I('param.product_id');
        $where['id'] = $product_id;
        $field = $field ? $field : 'id,product_num,category_id,full_name,short_name,contact_tel,contacter,channel_fee,creater,creater_uid,term,end_time,total_moeny,introduction,status';
        $product_info = M('product')->where($where)->field($field)->find();
        if ($product_id) {
            return $product_info ? $product_info : (object)[];
        } else {
            $this->printJson($product_info);
        }
    }

    /**
     * 读取一级分类的值
     */
    public function getFirstCategoryValue($cate_id = 0)
    {
        $cid = $cate_id ? $cate_id : I('param.id');
        $pc_model = M('product_category');
        $product_id_arr = $pc_model->where(['id' => $cid])->field('pid')->find();
        return $product_id_arr['pid'] ? $product_id_arr['pid'] : '';
    }

    /**
     * 读取分类对应的字段及其值,编辑产品信息和查看产品信息的时候使用
     */
    public function getProductCategoryFieldValue($product_id = 0)
    {
        $product_id = $product_id ? $product_id : I('param.id');
        $where['product_id'] = $product_id;
        $where['pcfv.status'] = 1;
        $pcf_model = M('product_category_field_value as pcfv');
        $product_cate_field = $pcf_model
            ->join('__' . strtoupper('product_category_field') . '__ as pcf ON pcfv.field_id = pcf.id ', 'left')
            ->field("pcf.field_type,pcf.field_option,pcfv.field_id,pcfv.field_name,pcfv.field_value")
            ->where($where)
            ->select();
        if ($product_id) {
            return count($product_cate_field) ? $product_cate_field : (object)[];
        } else {
            $this->printJson($product_cate_field);
        }
    }

    /**
     *获取产品自增信息
     */
    public function productGetSelfFieldValue($product_id = 0)
    {
        $product_id = $product_id ? $product_id : I('param.product_id');
        $selfFieldValue = M('product_self_field_value')->where(['product_id' => $product_id])->select();
        if ($product_id) {
            return count($selfFieldValue) ? $selfFieldValue : (object)[];
        } else {
            $this->printJson($selfFieldValue);
        }
    }

    /**
     * 读取产品合同
     * @param int $product_id
     * @return mixed|object
     */
    public function productGetContract($product_id = 0)
    {
        $where['product_id'] = $product_id ? $product_id : I('param.id');
        $where['type'] = 2;
        $where['status'] = 1;
        $contract_arr = M('product_attachment')->where($where)->field('id,attachment_name,attachment_url,uid,source')->select();
        if ($product_id) {
            return $contract_arr ? $contract_arr : (object)null;
        } else {
            $this->printJson($contract_arr);
        }
    }

    /**
     *添加/编辑 产品自增字段
     */
    public function saveProductSelfField($product_id = 0)
    {
        $product_id = $product_id ? $product_id : I('param.product_id');
        $field_id = I('param.field_id') ? intval(I('param.field_id')) : 0;
        if ($product_id) {
            $data['product_id'] = $product_id;
            $data['field_name'] = I('param.field_name');
            $data['field_type'] = I('param.field_type');
            $data['field_option'] = I('param.field_option');
            $data['update_time'] = date('Y-m-d H:i:s');
            if ($field_id) {
                $data['id'] = $field_id;
                unset($data['field_type']);
                unset($data['field_option']);
                $status = M('product_self_field')->save($data);
                $where['product_id'] = $product_id;
                $where['field_id'] = $field_id;
                $value_data = array(
                    'field_name' => $data['field_name'],
                );
                M('product_self_field_value')->where($where)->save($value_data);
            } else {
                //插入成功后 $status 是新插入的field_id
                $status = M('product_self_field')->add($data);
                $value_data = array(
                    'product_id' => $product_id,
                    'field_id' => $status,
                    'field_name' => $data['field_name'],
                );
                //给新字段初始一个空值
                M('product_self_field_value')->add($value_data);
                $field_id = $status;
            }
            if ($status) {
                $this->setSuccess('产品字段保存成功！', array('field_id' => $field_id));
            } else {
                $this->setError('产品字段保存失败！');
            }
        }
        $this->setError('参数有误');
    }

    /**
     * 删除产品自身字段信息
     */
    public function delProductSelfField()
    {
        $field_id = I('param.field_id') ? intval(I('param.field_id')) : 0;
        $product_id = I('param.product_id') ? intval(I('param.product_id')) : 0;
        if ($field_id && $product_id) {
            $where['product_id'] = $product_id;
            $where['id'] = $field_id;
            $status = M('product_self_field')->where($where)->delete();
            $where['field_id'] = $field_id;
            unset($where['id']);
            M('product_self_field_value')->where($where)->delete();
            if ($status) {
                $this->setSuccess('删除成功');
            } else {
                $this->setError('删除失败');
            }
        }
        $this->setError('参数有误');
    }

    /**
     * 保存产品自身新增字段信息
     * @param array $dataSelfFieldValue
     * @return boolean $status
     */
    public function saveProductSelfFieldValue($dataSelfFieldValue = array())
    {
        //获取传递过来的json数据 数据结构应为 array(
        //                                    0 =>array('field_id'=>1, product_id'=>1, 'field_name'=>name, 'field_value'=>field_value),
        //                                    1 =>array('field_id'=>1, product_id'=>1, 'field_name'=>name, 'field_value'=>field_value)
        //                                      )
        $data = empty($dataSelfFieldValue) ? getPostJson() : $dataSelfFieldValue;
        if (!empty($data)) {
            $status = true;
            foreach ($data as $key => $value) {
                $where['product_id'] = $value['product_id'];
                $where['field_id'] = $value['field_id'];
                $data['field_name'] = $value['field_name'];
                $data['field_value'] = $value['field_value'];
                $data['update_time'] = date('Y-m-d H:i:s');
                $s = M('product_self_field_value')->where($where)->save($data);
                $status = $status && $s;
            }
            if (count($dataSelfFieldValue)) {
                return $status ? true : false;
            }
            if ($status) {
                $this->setSuccess('保存成功');
            } else {
                $this->setError('保存失败');
            }
        }
        $this->setError('获取参数出错');
    }

    /**
     * 读取产品基本字段信息
     */
    public function getProductField()
    {
        $shift_arr = ['id', 'add_time', 'update_time'];
        $new_field = [];
        $product_fields = M('product')->getDbFields();
        foreach ($product_fields as $v) {
            if (!in_array($v, $shift_arr)) {
                array_push($new_field, $v);
            }
        }
        return $new_field;
    }

    /**
     * 读取一级分类
     */
    public function getFirstCategory()
    {
        $cate_arr = M('product_category')->where(['status' => 1, 'pid' => 0])->select();
        $this->printJson($cate_arr);
    }

    /**
     * 读取二级分类
     */
    public function getSecondCategory()
    {
        $cid = I('param.category_id');
        if ($cid) {
            $where['status'] = 1;
            $where['pid'] = $cid;
            $cate_arr = M('product_category')->where($where)->select();
        }
        $this->printJson($cate_arr);
    }

    /**
     * 读取分类对应的字段
     * @param int $cate_id
     * @return boolean
     */
    public function getProductCategoryField($cate_id = 0)
    {
        $cid = $cate_id ? $cate_id : I('param.category_id');
        $pcf_model = M('product_category_field');

        if ($cid) {
            $where['category_id'] = $cid;
            $where['status'] = 1;
            $product_cate_field = $pcf_model->where($where)->field('id,field_name,field_en_name,field_type,field_option')->order('field_type ASC')->select();
            if (empty($product_cate_field)) {//默认模板
                $where['is_special'] = 1;
                unset($where['category_id']);
                $product_cate_field = $pcf_model->where($where)->field('id,field_name,field_en_name,field_type,field_option')->order('field_type ASC')->select();
            }
        }
        if ($cate_id) {//如果是从类内部调用，则
            return $product_cate_field;
        }
        $this->printJson($product_cate_field);
    }

    /**
     * @functioin 添加产品信息
     * @包括所有产品通用信息项和产品所属分类信息项目两部分
     */
    public function productAddInfo()
    {
        /*
         * 前端传过来的数据结构：
         * baseInfo为一维数组，cateInfo为二维数组
         * [
         *      ['baseInfo'=>[
         *                      ‘a’=>'b',‘c’=>'d',
         *      ]
         *      ['cateInfo'=>[
         *                      ['field_id'=>1,'field_name'=>'a','field_value'=>'b']
         *                      []
         *                  ]
         *      ]
         * ]
         * */
        //获取并解析前端传过来的json数据
        $data = getPostJson();
        //基本信息
        $baseInfo = $data['baseInfo'];
        //分类字段信息
        $cateInfo = $data['cateInfo'];
        $category_id = $baseInfo['category_id'];
        M()->startTrans();
        $p_model = M('Product');
        //添加产品基本信息
        $baseInfo['creater_uid'] = $this->uid; //产品推荐人ID 取当前操作用户ID
        $baseInfo['creater'] = $this->getUname();//产品推荐人 取当前操作用户的真实姓名
        $baseInfo['product_num'] = $this->getProductNum(); //生成产品编号
        $baseInfo['add_time'] = date('Y-m-d H:i:s');
        $baseInfo['update_time'] = date('Y-m-d H:i:s');
        $product_id = $p_model->add($baseInfo);

        //添加分类之后的产品信息
        if ($product_id > 0) {
            //构造数据结构，为分类字段值添加product_id
            if (!empty($cateInfo)) {
                foreach ($cateInfo as $k => $v) {
                    $cateInfo[$k]['product_id'] = $product_id;
                    $cateInfo[$k]['add_time'] = date('Y-m-d H:i:s');
                    $cateInfo[$k]['update_time'] = date('Y-m-d H:i:s');
                }
                //保存分类产品的字段值
                $filed_value_model = M('product_category_field_value');
                //初始产品 评分参数数据
                $status_init_data = $this->createInitScoreValue($product_id, $category_id);
                if ($filed_value_model->addAll($cateInfo) && $status_init_data) {
                    M()->commit();
                    $this->createOperationLog('添加产品,产品编号为:' . $product_id);
                    //superone 返回新增产品的id
                    //$this->printJson(array("status"=>1 , "msg"=>"产品添加成功" , "product_id"=>$product_id));
                    $this->setSuccess('添加产品成功' , array("product_id"=>$product_id));
                } else {
                    M()->rollback();
                    $this->setError('添加产品失败');
                }
            } else {
                M()->rollback();
                $this->setError('添加产品失败,无法获取产品类型参数');
            }
        } else {
            M()->rollback();
            $this->setError('添加产品失败，无法保存基本信息');

        }
    }
    /**
     * 上会区工作台(产品员自己录入的产品列表)
     */
    public function getMyProductMeetingList()
    {
        $get = I('param.');
        $page = $get['page'] ? $get['page'] : 1;
        $limit = $get['limit'] ? $get['limit'] : 20;
        $param['add_time'] = $get['add_time'];
        if(trim($get['keyword'])){
            $param['keyword'] = $get['keyword'];
        }
        $param['status'] = 99;
        if($get['start_time'] && $get['end_time']){
            $param['start_time'] = $get['start_time'];
            $param['end_time'] = $get['end_time'];
        }
        $data = $this->getProductList($param, $page, $limit, $this->uid);
        $this->printJson($data);
    }
    /**
     * 上会审核区
     */
    public function getProductWaitMeetingList()
    {
        $get = I('param.');
        $page = $get['page'] ? $get['page'] : 1;
        $limit = $get['limit'] ? $get['limit'] : 20;
        $param['add_time'] = $get['add_time'];
        if(trim($get['keyword'])){
            $param['keyword'] = $get['keyword'];
        }
        $param['status'] = 99;
        if($get['start_time'] && $get['end_time']){
            $param['start_time'] = $get['start_time'];
            $param['end_time'] = $get['end_time'];
        }
        $data = $this->getProductList($param, $page, $limit);
        if(!empty($data['items'])){
            foreach($data['items'] as $key=>&$value){
                $where['product_id'] = $value['id'];
                $where['uid'] = $this->uid;
                $where['type'] = 1;
                $where['status'] = 1;
                $check_log = M('product_meeting_log')->where($where)->find();
                $value['is_check'] = !empty($check_log) ? 1 : 2;
            }
        }
        $this->printJson($data);
    }

    /**
     * 上会区显示所有产品(分管领导)查看
     */
    public function getProductMeetingList()
    {
        $get = I('param.');
        $page = $get['page'] ? $get['page'] : 1;
        $limit = $get['limit'] ? $get['limit'] : 20;
        $param['add_time'] = $get['add_time'];
        if(trim($get['keyword'])){
            $param['keyword'] = $get['keyword'];
        }
        $param['status'] = 0;
        if($get['start_time'] && $get['end_time']){
            $param['start_time'] = $get['start_time'];
            $param['end_time'] = $get['end_time'];
        }
        $data = $this->getProductList($param, $page, $limit);
        $this->printJson($data);
    }

    /**
     * 上会产品通过审核
     */
    public function passProductMeeting(){
        $post = I('param.');
        $product_id = $post['id'];
        if($product_id){
            $is_check = D('Product')->isCheckProductMeetingByUser($product_id, $this->uid);
            if($is_check){
                $this->setError('您已同意过该产品过会了，无须再操作');
            }
            $data['product_id'] = $product_id;
            $data['type'] = 1;
            $data['reason'] = $post['reason'];
            $data['uid'] = $this->uid;
            $data['user_department'] = $this->getDpName();
            $data['add_time'] = date('Y-m-d H:i:s');
            M()->startTrans();
            if(M('product_meeting_log')->add($data)){
                $num = $this->getCheckMeetingNum($product_id);
                if($num == 3){
                    $s = $this->changeProductStatus($product_id, 1);
                    if($s){
                        M()->commit();
                        $this->setSuccess('操作成功');
                    }else{
                        M()->rollback();
                        $this->setError('进入产品工作台失败');
                    }
                }else{
                    M()->commit();
                    $this->setSuccess('操作成功');
                }
            }else{
                M()->rollback();
                $this->setError('操作失败');
            }
        }
        $this->setError('参数有误');
    }
    /**
     * 上会产品拒绝审核
     */
    public function backProductMeeting(){
        $post = I('param.');
        $product_id = $post['id'];
        if($product_id){
            $is_check = D('Product')->isCheckProductMeetingByUser($product_id, $this->uid);
            if($is_check){
                $this->setError('您已同意过该产品过会了，无须再操作');
            }
            $data['product_id'] = $product_id;
            $data['type'] = 2;
            $data['reason'] = $post['reason'];
            $data['uid'] = $this->uid;
            $data['user_department'] = $this->getDpName();
            $data['add_time'] = date('Y-m-d H:i:s');
            M()->startTrans();
            $status = M('product_meeting_log')->add($data);
            $clear_meeting_status = D('Product')->clearProductMeetingLog($product_id);
            if($status && $clear_meeting_status){
                M()->commit();
                $this->setSuccess('操作成功');
            }else{
                M()->rollback();
                $this->setError('操作失败');
            }
        }
        $this->setError('参数有误');
    }
    /**
     * 创建产品初始 评分信息
     * @param int $product_id
     * @param int $cate_id
     * @return boolean
     */
    protected function createInitScoreValue($product_id = 0, $cate_id = 0)
    {
        if ($product_id && $cate_id) {
            $p_model = M('product');
            //验证参数是否存在对应产品数据
            $product_info = $p_model->where('id = ' . $product_id)->field('id, category_id')->find();
            if ($product_id == $product_info['id'] && $cate_id == $product_info['category_id']) {
                $cg_mode = M('category_group');
                $field_str = 'id';
                //查找当前分类下是否存在评分配置参数
                $data_group = $cg_mode->where(['category_id' => $cate_id, 'status' => 1])
                    ->field($field_str)
                    ->select();
                if (!empty($data_group)) {
                    foreach ($data_group as $value) {
                        $groupArr[] = $value['id'];
                    }
                } else {
                    $groupArr = $this->getCateDefaultScoreGroup($cate_id);
                }
                $field_arr = $this->getScoreFieldByGroup($groupArr);
                $status = $this->initScoreFileValueData($product_id, $field_arr);
                return $status;
            }
        }
        return false;
    }

    /**
     * @param int $cate_id
     * @return array|bool
     */
    protected function getCateDefaultScoreGroup($cate_id = 0)
    {
        if ($cate_id) {
            $default_1 = array(
                8, 9, 10, 11, 12, 13
            );
            $default_2 = array(
                2, 3, 4, 5, 6, 7
            );
            if (in_array($cate_id, $default_1)) {
                $is_special = 1;
                $where['is_special'] = $is_special;
                //unset($where['category_id']);
            } else if (in_array($cate_id, $default_2)) {
                $is_special = 2;
                $where['is_special'] = $is_special;
                //unset($where['category_id']);
            } else {
                $where['is_special'] = 1;
            }
            $where['status'] = 1;
            $group_data = M('category_group')->field('id')->where($where)->select();
            if (!empty($group_data)) {
                foreach ($group_data as $value) {
                    $data[] = $value['id'];
                }
            }
            return $data;
        }
        return false;
    }

    /**
     * 根据评分组ID 获取评分字段
     * @param int $group
     * @return mixed
     */
    protected function getScoreFieldByGroup($group = 0)
    {
        $group_ids = array();
        if (is_array($group)) {
            $group_ids = $group;
        } elseif (intval($group) > 0) {
            $group_ids[] = $group;
        }
        $where['group_id'] = array('in', $group_ids);
        $where['status'] = 1;
        $field_arr = M('category_group_field')->field('id as field_id, field_name')->where($where)->select();
        return $field_arr;
    }

    /**
     * 填充产品评分参数 初始值数据
     * @param int $product_id
     * @param $data
     * @return bool|string
     */
    protected function initScoreFileValueData($product_id = 0, $data)
    {
        if ($product_id && !empty($data)) {
            foreach ($data as $key => $value) {
                $data[$key]['product_id'] = $product_id;
                $data[$key]['field_id'] = $value['field_id'];
                $data[$key]['field_name'] = $value['field_name'];;
                $data[$key]['add_time'] = date('Y-m-d H:i:s');
            }
            $status = M('category_group_field_value')->addAll($data);
            return $status;
        }
        return false;
    }

    /**
     * @function 编辑产品信息
     */
    public function productEditInfo()
    {
        /*
        * 前端传过来的数据结构：
        * 产品id为数字，baseInfo为一维数组，cateInfo为二维数组
        * [
        *  ['id'] =>int(1)
         * ['baseInfo'=>[
        *                      ‘a’=>'b',‘c’=>'d',
        *               ]
        *      ['cateInfo'=>[
        *                      ['field_id'=>1,'field_name'=>'a','product_id'=>1,'field_value'=>'b']
        *                      []
        *                  ]
         *      ;['scoreInfo'] => [
         *          ]
        *      ]
        * ]
        * */
        $data = getPostJson();
        //产品id
        $product_id = $data['id'];
        //$category_id = $data['baseInfo']['category_id'];
        if ($product_id) {
            //基本信息
            $baseInfo = $data['baseInfo'];
            //更新时间
            $update_time = date('Y-m-d H:i:s');
            $baseInfo['update_time'] = $update_time;
            //分类字段信息
            $cateInfo = $data['cateInfo'];
            $scoreInfo = $data['scoreInfo'];
            $selfInfo = $data['selfInfo'];
            $where_pid['id'] = $product_id;
            $p_model = M('product');
            $p_model->startTrans();
            //更新产品基本信息和所属分类对应的分类信息
            if ($p_model->where($where_pid)->save($baseInfo)) {
                //保存分类产品的字段值
                $pcfv_model = M('product_category_field_value');
                $update_status = true;
                //构造数据结构，为分类字段值添加product_id
                //更新产品类型配置字段值信息
                if (!empty($cateInfo)) {
                    foreach ($cateInfo as $k => $v) {
                        $v['product_id'] = $product_id;
                        $v['update_time'] = $update_time;
                        $where_cate['product_id'] = $product_id;
                        $where_cate['field_id'] = $v['field_id'];
                        if (!isset($v['product_id']) || !isset($v['field_id']) || $v['field_id'] == 0) {
                            $s = true;
                        } else {
                            $s = $pcfv_model->where($where_cate)->save($v);
                        }
                        $update_status = $s && $update_status;
                    }
                }
                if (!$update_status) {
                    $p_model->rollback();
                    $this->setError('产品类型参数信息保存失败！');
                }
                //更新产品类型评分字段值信息
                if (!empty($scoreInfo)) {
                    foreach ($scoreInfo as $key => $value) {
                        $value['product_id'] = $product_id;
                        $value['add_time'] = date('Y-m-d H:i:s');
                        $where = array();
                        $where['product_id'] = $product_id;
                        $where['field_id'] = $value['field_id'];
                        $s = M('category_group_field_value')->where($where)->save($value);
                        $update_status = $s && $update_status;
                    }
                }
                if (!$update_status) {
                    $p_model->rollback();
                    $this->setError('产品评分参数信息保存失败！');
                }
                //更新产品自身字段
                if (!empty($selfInfo)) {
                    foreach ($selfInfo as $key => $value) {
                        $value['product_id'] = $product_id;
                        $value['update_time'] = date('Y-m-d H:i:s');
                        $where = array();
                        $where['product_id'] = $product_id;
                        $where['field_id'] = $value['field_id'];
                        $s = M('product_self_field_value')->where($where)->save($value);
                        $update_status = $s && $update_status;
                    }
                }
                if (!$update_status) {
                    $p_model->rollback();
                    $this->setError('产品新增信息保存失败！');
                }
                if ($update_status) {
                    $p_model->commit();
                    $this->createOperationLog($this->getUname() . '更新产品,产品编号为:' . $product_id);
                    $this->setSuccess('产品编辑成功！');
                } else {
                    $p_model->rollback();
                    $this->setError('产品编辑失败！');
                }

            } else {
                $p_model->rollback();
                $this->setError('更新产品失败');
            }
        }
        $this->setError('参数有误');
    }

    /**
     * 新产品提交
     */
    public function productFirstSubmit()
    {
        $this->checkPermission('product.add');
        $product_id = I('param.id');
        if ($product_id) {
            $data['id'] = $product_id;
            $data['status'] = 2;
            $data['update_time'] = date('Y-m-d H:i:s');
            //新录入产品提交时，验证产品评分内容是否填写
            $model = M('category_group_field_value');
            $where['product_id'] = $product_id;
            $where['status'] = 1;
            $score_field_value = $model->where($where)->select();
            if (!empty($score_field_value)) {
                $has_value = true;
                foreach($score_field_value as $key=>$value){
                    $s = $value['field_value'] || $value['field_value'] === '0' ? true : false; //填0可以允许通过
                    $has_value = $has_value && $s;
                }
                if(!$has_value){
                    $this->setError('产品评分内容未填写，无法提交！');
                }
            }
            $p_model = M('product');
            $product_info = $this->getProductFieldValue($product_id);
            if($product_info['status'] > 1){
                $this->setError('该产品已经提交过了，无法再次提交');
            }
            if ($p_model->save($data)) {
                //给参与评分的各部门总监发送消息
                $this->sendScoreUserMessage($product_info);
                //写日志
                $this->createOperationLog($this->getUname().',部门：' . $this->getDpName() . ',提交新产品，产品ID：' . $product_id);
                $this->setSuccess('操作成功');
            } else {
                $this->setError('操作失败');
            }
        }
        $this->setError('参数有误');

    }

    /*******************************************************************************************************************************************
     *****************************************************评分信息功能区************************************************************************
     *******************************************************************************************************************************************/

    /**
     * @function 为产品上传图片
     */
    public function addProductAttachment()
    {
        set_time_limit(1000);
        $product_id = I('param.product_id');
        if($product_id){
            $pa_model = M('product_attachment');
            $up_data = fileUplode();
            if ($up_data['status']) {
                $add_time = date('Y-m-d H:i:s');
                $att = array();
                $last_insert_id = 0;
                foreach ($up_data['info'] as $key=>$v) {
                    $data['product_id'] = $product_id;
                    $data['uid'] = $this->uid;
                    $data['attachment_url'] = $v['url'];
                    $data['type'] = 1;
                    $data['attachment_name'] = $v['name'];
                    $data['status'] = 1;
                    $data['add_time'] = $add_time;
                    $last_insert_id = $pa_model->add($data);

                    $att['name'] = $v['name'];
                    $att['type'] = $v['type'];
                    $att['url'] = $v['url'];
                }
                //$this->printJson($url);
                $att = $pa_model->find($last_insert_id);
                $this->printJson(array('success'=>true, 'msg'=>'上传成功', 'data'=>$att));
            }
            $this->printJson(array('success'=>false, 'msg'=>'上传失败'));
        }
        $this->setError('参数有误');

    }

    /**
     * 删除产品图片
     */
    public function delProductAttachment(){
        $id = I('param.id');//产品图片ID
        if($id){
            $data['id'] = $id;
            $data['status'] = 2;
            $status = M('product_attachment')->save($data);
            if($status){
                $this->setSuccess('删除成功');
            }else{
                $this->setError('删除失败');
            }
        }
        $this->setError('参数有误');
    }
    /**
     * 获取产品图片附件
     */
    public function getProductAttachment(){
        $product_id = I('param.id');
        $img_data = array();
        if($product_id){
            $where['product_id'] = $product_id;
            $where['type'] = 1;
            $where['status'] = 1;
            $img_data = M('product_attachment')->field('id,type,attachment_name,attachment_url,uid,source')->where($where)->select();
        }
        return $img_data;
    }
    /**
     * 产品部上传合同
     */
    public function productAddContract()
    {
        set_time_limit(1000);
        $this->checkPermission('contractupload.submit');
        $product_id = I('param.product_id');
        if($product_id){
            $c_data = fileUplode();
            $add_time = date('Y-m-d H:i:s');
            $pa_model = M('product_attachment');
            if ($c_data['status']) {
                $pa_model->startTrans();
                $status = true;
                $last_insert_id = 0;
                //添加新数据
                foreach ($c_data['info'] as $v) {
                    $data['product_id'] = $product_id;
                    $data['uid'] = $this->uid;
                    $data['attachment_url'] = $v['url'];
                    $data['type'] = 2;
                    $data['attachment_name'] = $v['name'];
                    $data['status'] = 1;
                    $data['add_time'] = $add_time;
                    $data['source'] = 1;
                    $last_insert_id = $s = $pa_model->add($data);
                    $status = $status && $s;

                }
                if($status){
                    $pa_model->commit();
                    $att = $pa_model->find($last_insert_id);
                    $this->printJson(array('success'=>true, 'msg'=>'上传成功', 'data'=>$att));
                    //$this->setSuccess('合同上传成功！', $url);
                }else{
                    $pa_model->rollback();
                    $this->printJson(array('success'=>false, 'msg'=>'上传失败'));
                    //$this->setError('合同添加失败');
                }

            }
            //$this->setError('合同上传失败');
            $this->printJson(array('success'=>false, 'msg'=>'合同上传失败'));
        }
        $this->setError('参数有误');
    }
    /**
     * 法务部上传合同
     */
    public function lawAddContract()
    {
        set_time_limit(1000);
        $this->checkPermission('contractaudit.edit');
        $product_id = I('param.product_id');
        if($product_id){
            $c_data = fileUplode();
            $add_time = date('Y-m-d H:i:s');
            $pa_model = M('product_attachment');
            if ($c_data['status']) {
                $pa_model->startTrans();
                $status = true;
                //添加新数据
                $last_insert_id = 0;
                foreach ($c_data['info'] as $v) {
                    $data['product_id'] = $product_id;
                    $data['attachment_url'] = $v['url'];
                    $data['type'] = 2;
                    $data['attachment_name'] = $v['name'];
                    $data['status'] = 1;
                    $data['add_time'] = $add_time;
                    $data['source'] = 2;
                    $data['uid'] = $this->uid;
                    $last_insert_id = $s = $pa_model->add($data);
                    $status = $status && $s;

                }
                if($status){
                    $pa_model->commit();
                    $att = $pa_model->find($last_insert_id);
                    $this->printJson(array('success'=>true, 'msg'=>'上传成功', 'data'=>$att));
                }else{
                    $pa_model->rollback();
                    $this->printJson(array('success'=>false, 'msg'=>'合同添加失败'));
                }

            }
            $this->setError('合同上传失败');

        }
        $this->setError('参数有误');
    }
    /**
     *
     */
    public function saveProductLawRemark(){
        $post = I('param.');
        $product_id = $post['id'];
        if($product_id){
            $where['id'] = intval($product_id);
            $data['law_remark'] = $post['law_remark'];
            $data['update_time'] = date('Y-m-d H:i:s');
            $status = M('Product')->where($where)->save($data);
            if($status){
                $this->setSuccess('操作成功');
            }else{
                $this->setError('操作失败');
            }
        }
        $this->setError('参数有误');
    }
    /**
     * @产品删除合同
     */
    public function delProductContract()
    {
        $product_id = I('param.product_id');
        $attachment_id = I('param.id');
        $pa_model = M('product_attachment');
        if ($product_id && $attachment_id) {
            $info = $pa_model->find($attachment_id);
            if($this->uid == $info['uid']){
                $where['product_id'] = $product_id;
                $where['id'] = $attachment_id;
                $where['type'] = 2;
                $data['status'] = 2;
                $data['update_time'] = date('Y-m-d H:i:s');
                $status = $pa_model->where($where)->save($data);
                if($status){
                    $this->setSuccess('合同删除成功！');
                }else{
                    $this->setError('合同删除失败');
                }
            }
            $this->setError('合同不是你自己上传的，无法删除');
        }
        $this->setError('参数异常');
    }

    /**
     * 获取用户上传的产品合同
     */
    public function getUserUploadContractList(){
        $post = I('param.');
        if($post['product_id']){ //产品ID
            $data = $this->getUserUploadContract($post['product_id'], $this->uid);
            $this->printJson($data);
        }
        $this->setError('参数有误');
    }
    /**
     * 获取上传的产品合同(法务)
     */
    public function getUploadContractList(){
        $post = I('param.');
        if($post['product_id']){ //产品ID
            $data = $this->getUserUploadContract($post['product_id']);
            if(!empty($data)){
                foreach($data as $key=>&$value){
                    $value['mine'] = $value['uid'] == $this->uid ? 1 : 0;
                }
            }
            $this->printJson($data);
        }
        $this->setError('参数有误');
    }
    /**
     * 产品工作台列表
     */
    public function productWorkList()
    {
        $get = I('param.');
        $page = $get['page'] ? $get['page'] : 1;
        $limit = $get['limit'] ? $get['limit'] : 20;
        $param['add_time'] = $get['add_time'];
        if(trim($get['keyword'])){
            $param['keyword'] = $get['keyword'];
        }
        $param['status'] = array(1, 2, 3, 4, 5, 6, 10);
        if($get['status']){
            $param['status'] = $get['status'];
        }

        if($get['start_time'] && $get['end_time']){
            $param['start_time'] = $get['start_time'];
            $param['end_time'] = $get['end_time'];
        }
        $data = $this->getProductList($param,$page, $limit, $this->uid);
        $this->printJson($data);
    }
    /**
     * 产品工作台列表(领导)
     */
    public function productLeaderWorkList()
    {
        $get = I('param.');
        $page = $get['page'] ? $get['page'] : 1;
        $limit = $get['limit'] ? $get['limit'] : 20;
        $param['add_time'] = $get['add_time'];
        if(trim($get['keyword'])){
            $param['keyword'] = $get['keyword'];
        }
        $param['status'] = array(1, 2, 3, 4, 5, 6, 10);
        if($get['status']){
            $param['status'] = $get['status'];
        }
        if($get['start_time'] && $get['end_time']){
            $param['start_time'] = $get['start_time'];
            $param['end_time'] = $get['end_time'];
        }
        $data = $this->getProductList($param,$page, $limit);
        $this->printJson($data);
    }
    public function productQuickList(){
        $get = I('param.');
        $page = $get['page'] ? $get['page'] : 1;
        $limit = $get['limit'] ? $get['limit'] : 20;
        $param['add_time'] = $get['add_time'];
        $param['keyword'] = $get['keyword'];
        $param['status'] = $get['status'] ? $get['status'] : 0;
        if($get['start_time'] && $get['end_time']){
            $param['start_time'] = $get['start_time'];
            $param['end_time'] = $get['end_time'];
        }
        $data = $this->getProductList($param, $page, $limit);
        $this->printJson($data);
    }
    /**
     * 产品评分区列表
     */
    public function productScoreList(){
        $get = I('param.');
        $page = $get['page'] ? $get['page'] : 1;
        $limit = $get['limit'] ? $get['limit'] : 20;
        $param['add_time'] = $get['add_time'];
        $param['keyword'] = $get['keyword'];
        $param['status'] = 2;
        $param['is_score'] = 1;
        if($get['start_time'] && $get['end_time']){
            $param['start_time'] = $get['start_time'];
            $param['end_time'] = $get['end_time'];
        }
        $data = $this->getProductList($param, $page, $limit);
        if(!empty($data)){
            foreach($data['items'] as $key=>&$value){
                $where['uid'] = $this->uid;
                $where['product_id'] = $value['id'];
                $where['is_used'] = 1;
                $score_log = M('product_score_reason')->where($where)->find();
                $value['is_score'] = !empty($score_log) ? 1 : 2;
            }
        }
        $this->printJson($data);
    }
    /**
     * 保存产品评分分数 状态 原因
     *  //前端传递的数据结构应为：
     * //        $data = [
     * //            'score'=>[['product_id' => $product_id, 'score' => 5, 'group_id' => 100, 'uid' => $uid],
     * //            ['product_id' => $product_id, 'score' => 3, 'group_id' => 101, 'uid' => $uid],
     * //            ['product_id' => $product_id, 'score' => 4, 'group_id' => 102, 'uid' => $uid],
     * //            ['product_id' => $product_id, 'score' => 4, 'group_id' => 103, 'uid' => $uid]]
     * // 'result'=>[
     * //  'product_id'='1',
     * //  'reason'='理由',
     * //  'status'='态度',
     * //],
     * //        ];
     */
    public function saveProductScoreStatus()
    {
        $data = getPostJson();
        if (!empty($data) && is_array($data)) {
            $uid = $this->uid;
            $add_time = date('Y-m-d H:i:s');
            if (!empty($data['score']) && !empty($data['result'])) {
                M()->startTrans();
                foreach ($data['score'] as $key => $value) {
                    $data['score'][$key]['uid'] = $uid;
                    $data['score'][$key]['add_time'] = $add_time;
                }
                $dp_name = $this->getDpName();
                $user_name = $this->getUserInfo()['realname'];
                $pgs_model = M('product_group_score');
                if ($pgs_model->addAll($data['score'])) {
                    $product_id = $data['result']['product_id'];
                    $reason = $data['result']['reason'] ? trim($data['result']['reason']) : '';
                    $status = $data['result']['status'];
                    if ($product_id && in_array($status, array(1, 2, 3))) {
                        $data['result']['product_id'] = $product_id;
                        $data['result']['reason'] = $reason;
                        $data['result']['status'] = $status;
                        $data['result']['uid'] = $uid;
                        $data['result']['add_time'] = date('Y-m-d H:i:s');
                        if(!$this->checkUserIsScore($product_id, $uid)){
                            if (M('product_score_reason')->add($data['result'])) {
                                //评分操作完成后，给产品录入人发送站内消息
                                $product_info = $this->getProductFieldValue($product_id);
                                //获取该产品已评价记录数
                                $num = $this->getProductScoreNum($product_id);
                                //判断已评价数是否与设置的总评价数相等，如相等 则说明各部门对产品完成评价，产品进入下个状态
                                if ($num == C('PASS_SCORE_NUM')) {
                                    if ($this->changeProductStatus($product_id, 3)) {
                                        //评分全部完成后，给推荐人发送消息。准备上传合同
                                        $title = '【'.$product_info['short_name'].'】' . $this->getDpName() . '已完成评分';
                                        $content = '【'.$product_info['short_name'].'】已完成评分，进入合同待上传流程，请及时处理，谢谢！<br/>';
                                        $this->sendUserMessage($title, $content, $product_info['creater_uid']);

                                        $this->createOperationLog($dp_name . $user_name . '做了评分理由及态度,产品编号为：' . $product_id);
                                        M()->commit();
                                        $this->setSuccess('操作成功');

                                    } else {
                                        M()->rollback();
                                        $this->setError('产品状态更新失败');
                                    }
                                } else {
                                    $title = '【'.$product_info['short_name'].'】 ' . $this->getDpName() . ' 已评分';
                                    $content = '【'.$product_info['short_name'].'】 ' . $this->getDpName() . ' 已评分，等待进入合同待上传流程，请知悉，谢谢！<br/>';

                                    $this->sendUserMessage($title, $content, $product_info['creater_uid']);
                                    M()->commit();
                                    $this->setSuccess('操作成功');
                                }
                            } else {
                                M()->rollback();
                                $this->setError('操作失败');
                            }
                        }else{
                            M()->rollback();
                            $this->setError('对不起，您评过分了');
                        }

                    } else {
                        M()->rollback();
                        $this->setError('评分状态参数不合法');
                    }
                } else {
                    M()->rollback();
                    $this->setError('评分添加失败');
                }
            }
        }
        $this->setError('参数有误');
    }
    /**
     * 评分区退回(产品总监权限)
     */
    public function backProductScore(){
        $this->checkPermission('score.reject');
        $post = I('param.');
        if($post['product_id']){
            M()->startTrans();
            //获取该产品已评价记录数,判断退回时是否需要清除原来的评分数据
            $num = $this->getProductScoreNum($post['product_id']);
            $clear_score_status = $num > 0 ? D('Product')->clearProductScoreInfo($post['product_id']) : true;
            if($clear_score_status){
                if($this->changeProductStatus($post['product_id'], 1)){
                    $product_info = $this->getProductFieldValue($post['product_id']);
                    $title = '【'.$product_info['short_name'].'】评分被退回';
                    $content = '【'.$product_info['short_name'].'】在评分环节被退回，请及时处理，谢谢!<br/>';
                    $content .= $post['reason'] ? '退回理由：' . $post['reason'] : '';
                    $this->sendUserMessage($title, $content, $product_info['creater_uid']);
                    M()->commit();
                    $this->setSuccess('操作成功');
                }else{
                    M()->rollback();
                    $this->setError('产品状态更新失败');
                }
            }else{
                $this->setError('评分数据清除失败');
            }

        }
        $this->setError('参数有误');
    }
    /*******************************************************************************************************************************************
     *****************************************************产品审核区************************************************************************
     *******************************************************************************************************************************************/
    //产品部 合同待上传列表
    public function productWaitContractList(){
        $get = I('param.');
        $page = $get['page'] ? $get['page'] : 1;
        $limit = $get['limit'] ? $get['limit'] : 20;
        $param['add_time'] = $get['add_time'];
        if(trim($get['keyword'])){
            $param['keyword'] = $get['keyword'];
        }
        $param['status'] = 3;
        if($get['start_time'] && $get['end_time']){
            $param['start_time'] = $get['start_time'];
            $param['end_time'] = $get['end_time'];
        }
        $data = $this->getProductList($param, $page, $limit);
        $this->printJson($data);
    }
    //法务部审核列表，合同待审核
    public function contractWaitAuditList(){
        $get = I('param.');
        $page = $get['page'] ? $get['page'] : 1;
        $limit = $get['limit'] ? $get['limit'] : 20;
        $param['add_time'] = $get['add_time'];
        if(trim($get['keyword'])){
            $param['keyword'] = $get['keyword'];
        }
        $param['status'] = 4;
        if($get['start_time'] && $get['end_time']){
            $param['start_time'] = $get['start_time'];
            $param['end_time'] = $get['end_time'];
        }
        $data = $this->getProductList($param, $page, $limit);
        $this->printJson($data);
    }
    //分管领导待审核列表
    public function productLeaderAuditList(){
        $get = I('param.');
        $page = $get['page'] ? $get['page'] : 1;
        $limit = $get['limit'] ? $get['limit'] : 20;
        $param['add_time'] = $get['add_time'];
        if(trim($get['keyword'])){
            $param['keyword'] = $get['keyword'];
        }
        //2016 适应wap端搜索状态
        if(!empty(trim($get['status']))){
            $param['status'] = $get['status'];
        }else{
            $param['status'] = array(3, 5);
        }

        if($get['start_time'] && $get['end_time']){
            $param['start_time'] = $get['start_time'];
            $param['end_time'] = $get['end_time'];
        }
        $data = $this->getProductList($param, $page, $limit);
        $this->printJson($data);
    }

    /**
     * 产品部合同提交
     */
    public function productContractSubmit(){
        //验证产品部上传合同权限
        $this->checkPermission('contractupload.submit');
        $get = I('param.');
        if($get['product_id']){
            //验证是否已上传合同
            $contract_data = $this->getUserUploadContract($get['product_id'], $this->uid, 1);
            if(!empty($contract_data)){
                //更新产品状态为 合同待审核
                $status = $this->changeProductStatus($get['product_id'], 4);
                if($status){
                    $this->createOperationLog('产品部提交合同成功，产品ID：' . $get['product_id']);
                    $product_info = $this->getProductFieldValue($get['product_id']);
                    $title= '【' . $product_info['short_name'] . '】进入合同待审核流程';
                    $content = '【' . $product_info['short_name'] . '】已完成合同上传，进入合同待审核流程，请及时处理，谢谢！<br/>';
                    //给法务发消息
                    //$uid = M('user')->where(array('position_id'=>47, 'status'=>1))->getField('id');
                    $uid = D('User')->companyLawUser();
                    $this->sendUserMessage($title, $content, $uid);

                    $this->setSuccess('产品合同提交成功');
                }else{
                    $this->setError('产品合同提交失败');
                }
            }
            $this->setError('请先上传您的合同后再提交');

        }
        $this->setError('参数有误');
    }
    /**
     * 法务通过合同
     */
    public function lawPassProduct(){
        $this->checkPermission('contractaudit.pass');
        $get = I('param.');
        if($get['product_id']){
            //验证是否已上传合同
            $contract_data = $this->getUserUploadContract($get['product_id'], $this->uid, 2);
            if(!empty($contract_data)){
                if($this->changeProductStatus($get['product_id'], 5)){
                    $product_info = $this->getProductFieldValue($get['product_id']);
                    $this->createOperationLog('法务 产品审核区，通过操作!产品ID：' . $get['product_id']);
                    $title= '【' . $product_info['short_name'] . '】进入产品待审核流程';
                    $content = '【' . $product_info['short_name'] . '】已完成合同审核，进入产品待审核流程，请及时处理，谢谢！<br/>';
                    //分管领导的用户ID
                    //$uid = M('user')->where(array('position_id'=>42, 'status'=>1))->getField('id');
                    $uid = D('User')->companyLeaders();
                    //给分管领导发消息
                    $this->sendUserMessage($title, $content, $uid);
                    //给推荐人发消息
                    $this->sendUserMessage($title, $content, $product_info['creater_uid']);
                    $this->setSuccess('操作成功');
                }else{
                    $this->setError('操作失败');
                }
            }
            $this->setError('请先上传您的合同，再通过');
        }
        $this->setError('参数有误');
    }
    /**
     * 法务退回
     */
    public function lawBackProduct(){
        $this->checkPermission('contractaudit.reject');
        $get = I('param.');
        if($get['product_id']){
            if($this->changeProductStatus($get['product_id'], 3)){
                $product_info = $this->getProductFieldValue($get['product_id']);
                $this->createOperationLog('法务审核退回。产品名称：'. $product_info['short_name']);
                $title= '【' . $product_info['short_name'] . '】合同被退回';
                $content = '【' . $product_info['short_name'] . '】在合同审核环节被退回，请及时处理，谢谢！<br/>';
                $content .= $get['reason'] ? '退回理由：' . $get['reason'] : '';

                $this->sendUserMessage($title, $content, $product_info['creater_uid']);
                $this->setSuccess('退回成功');
            }else{
                $this->setError('退回失败');
            }

        }
        $this->setError('参数有误');
    }
    /**
     * 分管领导通过审核
     */
    public function leaderPassProduct(){
        $get = I('param.');
        if($get['product_id']){
            if($this->checkUserPermission('productleader.pass')){
                $product_info = $this->getProductFieldValue($get['product_id']);
                if($product_info['status'] != 5){
                    $this->setError('产品还未进入最终审核阶段');
                }
                $productModel = M('product');
                $data['id'] = $get['product_id'];
                $data['status'] = 6;
                $data['fee_status'] = 1;
                $data['online_start_time'] = date('Y-m-d H:i:s');
                $productModel->startTrans();
                if($productModel->save($data)){
                    $status = $this->initProductFeeValue($get['product_id']);
                    if($status){

                        //生成操作日志及发送推荐人消息
                        $this->createOperationLog('产品审核通过，产品ID:' . $get['product_id']);

                        $title= '【' . $product_info['short_name'] . '】进入产品销售中流程';
                        $content = '【' . $product_info['short_name'] . '】已完成产品审核，进入产品销售中流程，请知悉！<br/>';
                        $this->sendUserMessage($title, $content, $product_info['creater_uid']);

                        //给编辑费率方案的人发送消息
                        //$uid = M('User')->where(array('position_id'=>45, 'status'=>1))->getField('id'); //暂定 职位ID：45 运营总监

                        $content = '【' . $product_info['short_name'] . '】已完成产品审核，进入产品销售中流程，请及时处理，谢谢！<br/>';
                        $uid = D('User')->companyOperationLeaders();
                        $this->sendUserMessage($title, $content, $uid);

                        $productModel->commit();
                        $this->setSuccess('操作成功');
                    }else{
                        $productModel->rollback();
                        $this->setError('初始化费率值失败');
                    }
                }else{
                    $productModel->rollback();
                    $this->setError('产品状态更新失败');
                }
            }
            $this->setError('您没有产品审核领导通过权限');
        }
        $this->setError('产品参数有误');
    }
    /**
     * 分管领导审核 退回
     */
    public function leaderBackProduct(){
        $get = I('param.');
        if($get['product_id']){
            if($this->checkUserPermission('productleader.reject')){
                M()->startTrans();
                $clear_score_status = D('Product')->clearProductScoreInfo($get['product_id']);
                $clear_contract_status = D('Product')->clearProductContract($get['product_id']);
                if($clear_contract_status && $clear_score_status){
                    $status = $this->changeProductStatus($get['product_id'], 1);
                    if($status){
                        //生成操作日志并发送消息给推荐人
                        $this->createOperationLog('产品被退回，产品ID' . $get['product_id']);
                        $product_info = $this->getProductFieldValue($get['product_id']);
                        $title= '【' . $product_info['short_name'] . '】被退回';
                        $content = '【' . $product_info['short_name'] . '】在产品审核环节被退回，请及时处理，谢谢！<br/>';
                        $content .= $get['reason'] ? '退回理由：' . $get['reason'] : '';
                        $this->sendUserMessage($title, $content, $product_info['creater_uid']);
                        //提交事务
                        M()->commit();
                        $this->setSuccess('退回成功');
                    }else{
                        M()->rollback();
                        $this->setError('操作失败');
                    }
                }else{
                    M()->rollback();
                    $this->setError('退回失败');
                }
            }
           $this->setError('您没有产品审核领导退回权限');

        }
        $this->setError('产品参数有误');
    }
    /**
     * 分管领导审核终止
     */
    public function leaderCutoutProduct(){
        $this->checkPermission('productleader.terminate');

        $get = I('param.');
        if($get['product_id']){
            M()->startTrans();
            $product_info = $this->getProductFieldValue($get['product_id']);
            if($this->moveProductToRecycle($get['product_id'], $product_info['status'], 9)){
                $status = $this->changeProductStatus($get['product_id'], 9);
                if($status){
                    $this->createOperationLog('分管领导终止产品，产品ID' . $get['product_id']);
                    $title= '【' . $product_info['short_name'] . '】被终止';
                    $content = '【' . $product_info['short_name'] . '】在产品审核环节被终止，请知悉，谢谢！<br/>';
                    $content .= $get['reason'] ? '终止理由：' . $get['reason'] : '';

                    $this->sendUserMessage($title, $content, $product_info['creater_uid']);
                    M()->commit();
                    $this->setSuccess('终止成功');
                }else{
                    M()->rollback();
                    $this->setError('终止失败');
                }
            }else{
                M()->rollback();
                $this->setError('进入回收站失败');
            }

        }
        $this->setError('产品参数有误');
    }
    //产品撤销
    public function productRevoke()
    {
        $this->checkPermission('product.cancel');
        $param = I('param.');//前端传过来的是一个用逗号隔开的字符串
        //print_r($param);
        if ($param['id']) {
            $product_id = explode(',', $param['id']);
            //$condition['id'] = array('in', $product_id);
            //print_r($product_id);
            $data['status'] = 8;
            $product_model = M('Product');
            $product_model->startTrans();
            $status = true;
            //将产品先移到回收站，再修改产品状态为：被撤销
            foreach($product_id as $k=>$v){
                $where['id'] = $v;
                $old_status = $product_model->where($where)->getField('status');
                $toRecycle_status = $this->moveProductToRecycle($v, $old_status, 8);
                if ($toRecycle_status) {
                    $s = $product_model->where($where)->save($data);
                    $status = $status && $s;
                    if ($s) {
                        $dep_name = $this->getDpName();//部门名称
                        $user_name = $this->getUname();
                        $this->createOperationLog($dep_name . $user_name . '撤销产品：产品ID为:' . $param['id']);
                        //$product_model->commit();
                        //$this->setSuccess('撤销成功');
                    } else {
                        $product_model->rollback();
                        $this->setError('撤销失败');
                    }
                } else {
                    $product_model->rollback();
                    $this->setError('移至回收站失败');
                }
            }
            if($status){
                $product_model->commit();
                $this->setSuccess('撤销成功');
            }else{
                $product_model->rollback();
                $this->setError('撤销失败');
            }
        }
        $this->setError('参数有误');
    }

    /**********************************************************************************************************************
     *****************************产品费率管理方案*************************************************************************
     **********************************************************************************************************************/
    /**
     * 产品费率管理列表（运营）
     */
    public function productFeesList(){
        //验证权限
//        $this->checkPermission('rateoperation.view');

        $get = I('param.');
        $page = $get['page'] ? $get['page'] : 1;
        $limit = $get['limit'] ? $get['limit'] : 20;
        $param = array();
        $param['add_time'] = $get['add_time'];
        if(trim($get['keyword'])){
            $param['keyword'] = $get['keyword'];
        }
        if($get['fee_status']){
            $param['fee_status'] = $get['fee_status'];
        }else{
            $param['fee_status'] = array('gt', 0);
        }
        $data = $this->getProductList($param, $page, $limit);
        $this->printJson($data);
    }
    /**
     * 费率审核列表（三个部门）
     */
    public function productFeesCheckList(){
        //验证权限
        //$this->checkPermission('rateothers.view');

        $get = I('param.');
        $page = $get['page'] ? $get['page'] : 1;
        $limit = $get['limit'] ? $get['limit'] : 20;
        $param['add_time'] = $get['add_time'];
        $param = array();
        if(trim($get['keyword'])){
            $param['keyword'] = $get['keyword'];
        }
        if($get['fee_status']){
            $param['fee_status'] = $get['fee_status'];
        }else{
            $param['fee_status'] = array('in', [2, 4]);
        }
        $data = $this->getProductList($param, $page, $limit);
        if(!empty($data['items'])){
            foreach($data['items'] as $key=>&$value){
                $value['is_agree'] = $this->isCheckProductFee($value['id'], $this->uid) ? 1 : 0;
            }
        }
        $this->printJson($data);
    }
    /**
     * 获取产品费率字段，供前端显示费率输入表单
     */
    public function productGetFeeField()
    {
        $get = I('param.');
        $get['product_id'] = 1;
        $where['id'] = $get['product_id'];
        if($get['product_id']){
            $product_info = M('product')->where($where)->field('channel_fee, category_id')->find();
            $cff_model = M('category_fees_field');
            $feild_name_arr = $cff_model->where('category_id = ' . $product_info['category_id'])->select();
            //如果未设定费率方案，则选取is_special=1的方案。
            if (empty($feild_name_arr)) {
                $feild_name_arr = $cff_model->where(['is_special' => 1])->select();
            }
            $data['channel_fee'] = $product_info['channel_fee'];
            $data['fee_field'] = $feild_name_arr;
            $this->printJson($data);
        }
        $this->setError('产品参数有误');
    }

    /**
     * 获取产品费率方案详情
     */
    public function productGetFeeFieldValue()
    {
        $post = I('param.');
        if($post['product_id']){
            $data = $this->getProductFeeInfo($post['product_id']);
//            $where['fv.product_id'] = $post['product_id'];
//            $where['fv.status'] = 1;
//            $pcf_model = M('category_fees_field_value as fv');
//            $data['product_id'] = $post['product_id'];
//            //产品渠道费用
//            $data['channel_fee'] = $this->getProductFieldValue($post['product_id'], 'channel_fee');
//            //产品费率方案值
//            $data['fee'] = $pcf_model->field('fv.product_id, fv.field_id,fv.field_value,fv.field_name')
//                ->where($where)
//                ->select();
            $this->printJson($data);
        }
        $this->setError('参数有误');
    }

    /**
     * 提交保存费率方案值
     */
    public function saveProductFeeValue()
    {
        //验证权限
        $this->checkPermission('rateoperation.edit');

        $post = getPostJson();//I('param.');
        //$product_id = 1;
        //前端传递的数据结构应为：
        //$add_time = date('Y-m-d H:i:s');
//        $data = [
//            ['product_id' => 1, 'feild_id' => 5, 'feild_value' => 10, 'update_time' => $add_time],
//            ['product_id' => 1, 'feild_id' => 6, 'feild_value' => 50, 'update_time' => $add_time],
//            ['product_id' => 1, 'feild_id' => 7, 'feild_value' => 40, 'update_time' => $add_time],
//        ];
        if($post['product_id']){
            $model = M('category_fees_field_value');
            $fee_status = $this->getProductFieldValue($post['product_id'], 'fee_status');

            if(in_array($fee_status['fee_status'], array(1,3))){
                $status = true;
                M()->startTrans();
                $time = date('Y-m-d H:i:s');
                $data['id'] = $post['product_id'];
                $data['channel_fee'] = $post['channel_fee']['channel_fee'];
                $data['fee_status'] = 2;
                $data['update_time'] = $time;
                if(M('Product')->save($data)){
                    foreach ($post['fee'] as $k => $v) {
                        $where['product_id'] = $v['product_id'];
                        $where['field_id'] = $v['field_id'];
                        $v['update_time'] = $time;
                        $s = $model->where($where)->save($v);
                        $status = $status && $s;
                    }
                    if($status){
                        $product_info = $this->getProductFieldValue($post['product_id']);
                        $title = '【' . $product_info['short_name'] . '】完成费率方案编辑';
                        $content = '【' . $product_info['short_name'] . '】已完成费率方案编辑，请及时处理，谢谢！';

                        $uid = D('User')->companyFeesUser();
                        $this->sendUserMessage($title, $content, $uid);

                        $this->createOperationLog($this->getUname() . '为编号为' . $post['product_id'] . '的产品编辑费率方案');
                        M()->commit();
                        $this->setSuccess('编辑费率成功');

                    }else{
                        M()->rollback();
                        $this->setError('编辑费率失败');
                    }
                }else{
                    M()->rollback();
                    $this->setError('渠道费率保存失败');
                }
            }
            $this->setError('只有未提交和未通过才能编辑费率');
        }
        $this->setError('参数有误');
    }
    /**
     * 审核 通过产品费率方案
     */
    public function passProductFees(){
        $this->checkPermission('rateothers.agree');
        $post = I('param.');
        $post['product_id'] = $post['id'];
        if($post['product_id']){
            $isCheck = $this->isCheckProductFee($post['product_id'], $this->uid);
            if($isCheck){
                $this->setError('您已经同意过该方案');
            }
            $data['product_id'] = $post['product_id'];
            $data['uid'] = $this->uid;
            $data['type'] = 1;
            $data['reason'] = trim($post['reason']) ? trim($post['reason']) : '';
            $data['user_department'] = $this->getDpName() ? $this->getDpName() : '';
            $data['add_time'] = date('Y-m-d H:i:s');
            $feeLogModel = M('product_fees_log');
            $feeLogModel->startTrans();
            $status = $feeLogModel->add($data);
            if($status){
                $where['product_id'] = $post['product_id'];
                $where['type'] = 1;
                $where['status'] = 1;
                $checkLogNum = $feeLogModel->where($where)->count();
                if($checkLogNum == C('PASS_SCORE_NUM')){
                    $productData = array(
                        'id' => $post['product_id'],
                        'fee_status' => 4,
                    );
                    $status = M('Product')->save($productData);
                    if($status){
                        $product_info = $this->getProductFieldValue($post['product_id']);
                        $title = '【' . $product_info['short_name'] . '】通过费率方案';
                        $content = '【' . $product_info['short_name'] . '】通过费率方案，请知悉，谢谢！';
                        //$uid = M('User')->where(array('position_id'=>45, 'status'=>1))->getField('id'); //暂定 职位ID：45 运营总监
                        $uid = D('User')->companyFeesUser();
                        $this->sendUserMessage($title, $content, $uid);

                        $feeLogModel->commit();
                        $this->setSuccess('操作成功');
                    }else{
                        $feeLogModel->rollback();
                        $this->setError('操作失败');
                    }
                }else{
                    $feeLogModel->commit();
                    $this->setSuccess('操作成功');
                }

            }else{
                $feeLogModel->rollback();
                $this->setError('操作失败');
            }
        }
        $this->setError('参数有误');
    }
    /**
     * 审核 退回产品费率方案
     */
    public function backProductFees(){
        $this->checkPermission('rateothers.reject');

        $post = I('param.');
        $post['product_id'] = $post['id'];
        if($post['product_id']){
            if($this->isCheckProductFee($post['product_id'])){
                $this->setError('您已经同意过该产品费率方案，不能再退回！');
            }
            $data['product_id'] = $post['product_id'];
            $data['uid'] = $this->uid;
            $data['type'] = 2;
            $data['reason'] = trim($post['reason']) ? trim($post['reason']) : '';
            $data['user_department'] = $this->getDpName();
            $data['add_time'] = date('Y-m-d H:i:s');
            $feeLogModel = M('product_fees_log');
            $feeLogModel->startTrans();
            $status = $feeLogModel->add($data);
            //将该产品 之前同意的记录清除
            $where = array('product_id'=>$post['product_id'], 'status'=>1, 'type'=>1);
            $feeLogModel->where($where)->save(array('status'=>2));
            //之前审核同意记录清除成功且当前拒绝记录插入成功，则改变产品费率状态
            if($status){
                $product_data = array(
                    'id' => $post['product_id'],
                    'fee_status' => 3,
                );

                if(M('Product')->save($product_data)){
                    $product_info = $this->getProductFieldValue($post['product_id']);
                    $title = '【' . $product_info['short_name'] . '】费率方案被'.$this->getDpName().'退回';
                    $content = '【' . $product_info['short_name'] . '】费率方案被'.$this->getDpName().'退回，请及时处理，谢谢！<br/>';

                    $content .= $post['reason'] ? '退回理由:'.$post['reason'] : '';
                    //编辑费率人员
                    //$uid = M('User')->where(array('position_id'=>45, 'status'=>1))->getField('id'); //暂定 职位ID：45 运营总监
                    $uid = D('User')->companyFeesUser();
                    $this->sendUserMessage($title, $content, $uid);
                    $feeLogModel->commit();
                    $this->setSuccess('操作成功');
                }else{
                    $feeLogModel->rollback();
                    $this->setError('更新费率状态失败');
                }
            }else{
                $feeLogModel->rollback();
                $this->setError('操作失败');
            }
        }
        $this->setError('参数有误');
    }
    /**********************************************************************************************************************
     *****************************产品回收站管理***************************************************************************
     **********************************************************************************************************************/
    /**
     * 产品回收站列表
     */
    public function productGetTrashList()
    {
        $get = I('param.');
        $page = $get['page'] ? $get['page'] : 1;
        $limit = $get['limit'] ? $get['limit'] : 20;
        $where = array();
        $where['pc.status'] = 1;
        if ($get['status']) {
            $where['p.status'] = intval($get['status']);
        }
        if($get['add_time']){
            $time = $get['add_time'];
            switch ($time) {
                case 1 ://一周
                    $time_end  = date('Y-m-d H:i:s');
                    $time_start= date('Y-m-d H:i:s', time() - 7 * 24 * 60 * 60);
                    $time_condition = ['between', $time_start . ',' . $time_end];
                    break;
                case 2://一个月
                    $time_end = date('Y-m-d H:i:s');
                    $time_start = date('Y-m-d H:i:s', time() - 30 * 24 * 60 * 60);
                    $time_condition = ['between', $time_start . ',' . $time_end];
                    break;
                case 3://三个月
                    $time_end = date('Y-m-d H:i:s');
                    $time_start = date('Y-m-d H:i:s', time() - 90 * 24 * 60 * 60);
                    $time_condition = ['between', $time_start . ',' . $time_end];
                    break;
                case 4:
                    $time_start = date('Y-m-d H:i:s', time() - 90 * 24 * 60 * 60);
                    $time_condition = ['lt', $time_start];
                default:
                    break;
            }
            $where['pc.add_time'] = $time_condition;
        }
        $pr_model = M('product_recycle as pc');
        $count = $pr_model->join('left join '.C('DB_PREFIX').'product as p ON pc.product_id = p.id')->where($where)->count();
        $field = 'p.*,pc.add_time as recycle_add_time, pc.product_id';
        $rows = $pr_model->field($field)->where($where)
                          ->join('left join '.C('DB_PREFIX').'product as p ON pc.product_id = p.id')
                          ->page($page, $limit)->order('pc.id desc')->select();
        $data['total'] = $count;
        $data['items'] = $rows;
        $this->printJson($data);
    }
    /**
     *把产品移动到到回收站
     */
    public function productRemoveToTrash()
    {
        $product_id = I('param.product_id');
        if($product_id){
            $data['status'] = 8;
            $condition['id'] = $product_id;
            $p_model = M('product');
            $old_status = $p_model->where(['id' => $product_id])->getField('status');//读取进入回收站之前的状态
            $status = $this->moveProductToRecycle($product_id, $old_status, 8);
            if($status){
                $this->setSuccess('产品放入回收站成功');
            }else{
                $this->setError('产品放入回收站失败');
            }
        }
        $this->setError('参数有误');

    }

    /**
     * 从回收站还原产品
     */
    public function restoreProduct(){
        $this->checkPermission('producbin.return');
        $post = I('param.');
        if($post['product_id']){
            $where['product_id'] = $post['product_id'];
            $where['status'] = 1;
            $recycle_model = M('product_recycle');
            $old_status = $recycle_model->where($where)->getField('from_status');
            M()->startTrans();
            $clear_score_status = D('Product')->clearProductScoreInfo($post['product_id']);
            $clear_contarct_status = D('Product')->clearProductContract($post['product_id']);
            if($clear_score_status && $clear_contarct_status){
                $data['id'] = $post['product_id'];
                $data['status'] = 1;//所有从回收站恢复的产品，都改为未完成 状态//$old_status;
                $data['update_time'] = date('Y-m-d H:i:s');

                if(M('product')->save($data)){
                    $recycle_data = array(
                        'status' => 3,
                        'update_time' => date('Y-m-d H:i:s'),

                    );
                    if($recycle_model->where($where)->save($recycle_data)){
                        $product_info = $this->getProductFieldValue($post['product_id']);
                        $title = '【' . $product_info['short_name'] . '】被还原';
                        $content = '【' . $product_info['short_name'] . '】已被还原到您的产品部工作台，请知悉，谢谢！';
                        $this->sendUserMessage($title, $content, $product_info['creater_uid']);
                        M()->commit();
                        $this->setSuccess('还原成功');
                    }else{
                        M()->rollback();
                        $this->setError('还原失败');
                    }
                }else{
                    M()->rollback();
                    $this->setError('还原产品状态失败');
                }
            }else{
                M()->rollback();
                $this->setError('还原产品状态失败');
            }

        }
        $this->setError('参数有误');
    }
    /**********************************************************************************************************************
     *****************************产品上线区管理*************************************************************************
     **********************************************************************************************************************/
    /**
     * 产品上线区列表
     */
    public function productOnlineList(){
        //$this->checkPermission('productlaunch.view');

        $get = I('param.');
        $page = $get['page'] ? $get['page'] : 1;
        $limit = $get['limit'] ? $get['limit'] : 20;
        $param['add_time'] = $get['add_time'];
        $param['keyword'] = $get['keyword'];
        $param['status'] = array(6, 10);
        if($get['status']){
            $param['status'] = $get['status'];
        }
        if($get['start_time'] && $get['end_time']){
            $param['start_time'] = $get['start_time'];
            $param['end_time'] = $get['end_time'];
        }
        $data = $this->getProductList($param, $page, $limit);
        $this->printJson($data);
    }

    /**
     * 产品上线区暂停
     */
    public function stopOnlineProduct(){
        $this->checkPermission('productlaunch.stopsell');
        $post = I('param.');
        if($post['product_id']){
            $status = $this->changeProductStatus($post['product_id'], 10);
            if($status){
                $this->createOperationLog('从上线区暂停产品');
                //$content = $this->getUname() . '从产品上线区，将产品暂停，产品变更为【暂下架】状态。产品ID：'.$post['product_id'];
                $product_info = $this->getProductFieldValue($post['product_id']);
                $title = '【' . $product_info['short_name'] . '】被暂停';
                $content = '【' . $product_info['short_name'] . '】已被暂停，进入暂下回状态。请知悉，谢谢！';
                $this->sendUserMessage($title, $content, $product_info['creater_uid']);

                $this->setSuccess('操作成功');
            }else{
                $this->setError('操作失败');
            }
        }
        $this->setError('参数有误');
    }
    /**
     * 产品上线区起售
     */
    public function startSaleOnlineProduct(){
        $this->checkPermission('productlaunch.startsell');

        $post = I('param.');
        if($post['product_id']){
            $pinfo = $this->getProductFieldValue($post['product_id']);
            if($pinfo['status'] == 10){
                $status = $this->changeProductStatus($post['product_id'], 6);
                if($status){
                    $this->createOperationLog('从上线区起售产品');
                    //$content = $this->getUname() . '从产品上线区，将产品起售，产品变更为【销售中】状态。产品ID：'.$post['product_id'];
                    $product_info = $this->getProductFieldValue($post['product_id']);
                    $title = '【' . $product_info['short_name'] . '】已起售';
                    $content = '【' . $product_info['short_name'] . '】已起售，进入销售中状态。请知悉，谢谢！';
                    $this->sendUserMessage($title, $content, $pinfo['creater_uid']);

                    $this->setSuccess('操作成功');
                }else{
                    $this->setError('操作失败');
                }
            }
            $this->setError('产品必须是从暂时下架状态起售');
        }
        $this->setError('参数有误');
    }
    /**
     * 产品上线区注销
     */
    public function cancelOnlineProduct(){
        $this->checkPermission('productlaunch.logoff');

        $post = I('param.');
        if($post['product_id']){
            $product_info = $this->getProductFieldValue($post['product_id']);
            $status = $this->changeProductStatus($post['product_id'], 11);
            if($status){
                $this->createOperationLog('从上线区下架产品');
                $this->moveProductToRecycle($post['product_id'], $product_info['status'], 11);
                $title = '【' . $product_info['short_name'] . '】已下架';
                $content = '【' . $product_info['short_name'] . '】已下架，进入被下架状态。请知悉，谢谢！';
                $this->sendUserMessage($title, $content, $product_info['creater_uid']);
                $this->setSuccess('操作成功');
            }else{
                $this->setError('操作失败');
            }
        }
        $this->setError('参数有误');
    }

    /*********************************************
     * *************内部功能性方法****************
     * *******************************************
     */

    /**
     * 更改产品状态
     * @param int $product_id
     * @param int $status
     * @return bool|int
     */
    protected function changeProductStatus($product_id = 0, $status = 0)
    {
        if ($product_id && $status) {
            $data['id'] = $product_id;
            $data['status'] = $status;
            $data['update_time'] = date('Y-m-d H:i:s');
            $status = M('Product')->save($data);
            return $status;
        }
        return false;
    }

    /**
     * 获取产品评分记录数
     * @param int $product_id
     * @return int
     */
    public function getProductScoreNum($product_id = 0)
    {
        if ($product_id) {
            $where['product_id'] = $product_id;
            $where['is_used'] = 1;
            $num = M('product_score_reason')->where($where)->count();
            return $num;
        }
        return 0;
    }

    /**
     *读取评分字段
     * @param int $cate_id 分类ID
     * @return array
     **/
    protected function getScoreField($cate_id = 0)
    {
        $cid = $cate_id ? $cate_id : I('param.category_id');
        $where['cg.category_id'] = $cid;
        if (in_array($cid, [])) {//[]为第一套模板的category_id
            $where['cg.is_special'] = 1;
            unset($where['cg.category_id']);
        }
        if (in_array($cid, [])) {//[]为第二套模板的category_id
            $where['cg.is_special'] = 2;
            unset($where['cg.category_id']);
        }
        $cg_model = M('category_group as cg');
        $field_arr = $cg_model->join('left join zb_category_group_field as cgf on cg.id = cgf.group_id')
            ->field('cg.id,cg.id as group_id,cg.group_name,cgf.id as field_id,cgf.field_name,cgf.field_type,cgf.field_option')
            ->where($where)
            ->select();
        $arr = array();
        if (!empty($field_arr)) {
            foreach ($field_arr as $key => $value) {
                $tmp['field_id'] = $value['field_id'];
                $tmp['field_name'] = $value['field_name'];
                $tmp['field_type'] = $value['field_type'];
                $tmp['field_option'] = $value['field_option'];
                if (!in_array($value['group_id'], $arr)) { //如果当前数据的group_id 不在所有数组中，则插入数组中
                    $arr[$value['group_id']]['group_id'] = $value['group_id'];
                    $arr[$value['group_id']]['group_name'] = $value['group_name'];
                    if ($tmp['field_id']) {
                        $arr[$value['group_id']]['fields'][] = $tmp;
                    }
                } else {
                    if ($tmp['field_id']) {
                        $arr[$value['group_id']]['fields'][] = $tmp;
                    }
                }
            }
        }
        return $arr;
    }

    /**
     * 读取评分字段及其值
     * @param int $cate_id 分类ID
     * @return array
     */
    protected function getScoreFieldValue($cate_id = 0)
    {
        $cid = $cate_id ? $cate_id : I('param.category_id');
        $where['cg.category_id'] = $cid;
        $cg_model = M('category_group as cg');
        if (in_array($cid, [])) {//[]为第一套模板的category_id
            $where['cg.is_special'] = 1;
        }
        if (in_array($cid, [])) {//[]为第二套模板的category_id
            $where['cg.is_special'] = 2;
        }
        $field_arr = $cg_model
            ->join('left join zb_category_group_field as cgf on cg.id = cgf.group_id')
            ->join('left join zb_category_group_field_value as cgfv on cgf.id = cgfv.field_id')
            ->field('cg.id,cg.group_name,cg.group_en_name,cgf.field_type,cgf.field_option,cgfv.field_value,cgfv.field_id,cgfv.field_name')
            ->where($where)
            ->select();
        return $field_arr;
    }

    /**
     * @param int $product_id
     * @param int $uid
     * @return bool true:评过分 false:未评过
     */
    protected function checkUserIsScore($product_id = 0, $uid=0){
        if($product_id){
            if($uid){
                $where['product_id'] = $product_id;
                $where['uid'] = $uid;
                $where['is_used'] = 1;
                $data = M('product_score_reason')->where($where)->find();
                return !empty($data) ? true : false;
            }
        }
        return true;
    }
    /**
     * 获取产品列表
     * @param array $param
     * @param int $page
     * @param int $limit
     * @param int $uid
     * @return array $data
     */
    protected function getProductList($param = array(), $page = 1 , $limit = 20, $uid = 0)
    {
        $status = isset($param['status']) && $param['status'] > 0 ? $param['status'] : 0;

        if ($status) {
            if(is_array($param['status'])){
                $condition['product.status'] = array('in', $status);
            }else{
               if(!empty($status)){
                   $condition['product.status'] = $status;
               }else{
                   //$condition['product.status'] = array('in', '1,2,3,4,5,6,10');
               }
            }
        }
        if($param['fee_status']){
            $condition['product.fee_status'] = $param['fee_status'];
        }
        //默认取用户自己录入的产品列表，如要显示所有产品 传is_leader = 1
        if ($uid) {
            $condition['creater_uid'] = $this->uid;
        }
        if ($param['add_time']) {//录入时间
            $time = $param['add_time'];
            $time_condition = '';
            switch ($time) {
                case 1 ://一周
                    $time_end  = date('Y-m-d H:i:s');
                    $time_start= date('Y-m-d H:i:s', time() - 7 * 24 * 60 * 60);
                    $time_condition = ['between', $time_start . ',' . $time_end];
                    break;
                case 2://一个月
                    $time_end = date('Y-m-d H:i:s');
                    $time_start = date('Y-m-d H:i:s', time() - 30 * 24 * 60 * 60);
                    $time_condition = ['between', $time_start . ',' . $time_end];
                    break;
                case 3://三个月
                    $time_end = date('Y-m-d H:i:s');
                    $time_start = date('Y-m-d H:i:s', time() - 90 * 24 * 60 * 60);
                    $time_condition = ['between', $time_start . ',' . $time_end];
                    break;
                case 4:
                    $time_start = date('Y-m-d H:i:s', time() - 90 * 24 * 60 * 60);
                    $time_condition = ['lt', $time_start];
                default:
                    break;
            }
            $condition['product.add_time'] = $time_condition;
        }
        if($param['start_time'] && $param['end_time']){
            $condition['product.add_time'] = array('between', $param['start_time'] . ',' . $param['end_time']);
        }
        if (trim($param['keyword'])) {
            $word = trim($param['keyword']);
            $condition['_string'] = "full_name like '%" . $word . "%'" . " or short_name like '%" . $word . "%'";
        }
        $p_model = M('product as product');

        $count = $p_model->where($condition)->count();
        $list = $p_model->field("product.*, IFNULL(product.law_remark, '') as law_remark")->where($condition)->page($page, $limit)->order('id desc')->select();

        $data['total'] = $count;
        $data['items'] = $list;
        return $data;

    }

    /**
     * 获取生成的产品编号
     */
    protected function getProductNum()
    {
        $num = date('YmdHis');
        if ($num) {
            return $num;
        }
        return;
    }
    /**
     *读取评分字段
     * @param int $product_id 分类ID
     * @return array
     **/
    public function getProductScoreField($product_id = 0)
    {
        $product_id = $product_id ? $product_id : I('param.product_id');
        $where['cgfv.product_id'] = $product_id;
        $cg_model = M('category_group_field_value as cgfv');
        $field = 'cgfv.id,cgfv.field_value,cgf.group_id,cg.group_name,cgf.id as field_id,cgf.field_name,cgf.field_type,cgf.field_option';
        $field_arr = $cg_model->join('left join zb_category_group_field as cgf on cgfv.field_id = cgf.id')
            ->join('left join zb_category_group as cg on cg.id = cgf.group_id')
            ->field($field)
            ->where($where)
            ->order('cgf.field_type ASC')
            ->select();
        $arr = array();
        if (!empty($field_arr)) {
            foreach ($field_arr as $key => $value) {
                $tmp['field_id'] = $value['field_id'];
                $tmp['field_name'] = $value['field_name'];
                $tmp['field_type'] = $value['field_type'];
                $tmp['field_option'] = $value['field_option'];
                $tmp['field_value'] = $value['field_value'];
                if (!in_array($value['group_id'], $arr)) { //如果当前数据的group_id 不在所有数组中，则插入数组中
                    $arr[$value['group_id']]['group_id'] = $value['group_id'];
                    $arr[$value['group_id']]['group_name'] = $value['group_name'];
                    if ($tmp['field_id']) {
                        $arr[$value['group_id']]['fields'][] = $tmp;
                    }
                } else {
                    if ($tmp['field_id']) {
                        $arr[$value['group_id']]['fields'][] = $tmp;
                    }
                }
            }
        }
        //$this->printJson($arr);
        return $arr;
    }
    public function getProductScoreResult($product_id = 0, $uid = 0){
        $data = array();
        if($product_id){
            $where['s.product_id'] = $product_id;
            if($uid){
                $where['s.uid'] = $uid;
            }
            $where['s.status'] = 1;
            $scoreData = M('product_group_score as s')->field('s.*,g.group_name,d.name as department_name,d.id as department_id')
                ->where($where)
                ->join('__'.strtoupper('category_group').'__ as g ON g.id = s.group_id', 'left')
                ->join('__'.strtoupper('user').'__ as u ON s.uid = u.id', 'left')
                ->join('__'.strtoupper('department').'__ as d ON u.department_id = d.id', 'left')
                ->select();
            unset($where['s.status']);
            $where['s.is_used'] = 1;
            $resultData = M('product_score_reason as s')->where($where)->select();

            if(!empty($scoreData)){
                //$DepartmentModel = D('Department');
                foreach($scoreData as $key=>$value){
                    $data[$value['uid']]['department_name'] = $value['department_name'];
                    if(!in_array($value['uid'], $data)){
                        $data[$value['uid']]['scoreList'][] = $value;
                    }else{
                        $data[$value['uid']]['scoreList'][] = $value;
                    }
                }
                foreach($resultData as $key=>$value){
                    $data[$value['uid']]['result'][] = $value;
                }

            }
        }
        return $data;
    }

    /**
     * 获取产品费率字段
     * @param int $product_id
     * @return mixed|void
     */
    public function getProductFeeField($product_id = 0)
    {
        $data = array();
        if($product_id){
            $where['id'] = $product_id;
            $category_id = M('product')->where($where)->getField('category_id');
            $cff_model = M('category_fees_field');
            $data = $cff_model->where('category_id = ' . $category_id)->select();
            //如果未设定费率方案，则选取is_special=1的方案。
            if (empty($data)) {
                $data = $cff_model->where(['is_special' => 1])->select();
            }
            return $data;
        }
        return $data;
    }

    /**
     * 初始化产品费率方案值
     * @param $product_id
     * @return bool|string
     */
    public function initProductFeeValue($product_id){
        if($product_id){
            $fee_field_value_model = M('category_fees_field_value');
            $field_arr = $this->getProductFeeField($product_id);
            $fee_init_data = array();
            if(!empty($field_arr)){
                foreach($field_arr as $key=>$value){
                    $tmp['product_id'] = $product_id;
                    $tmp['field_id'] = $value['id'];
                    $tmp['field_name'] = $value['field_name'];
                    $tmp['add_time'] = date('Y-m-d H:i:s');
                    $fee_init_data[] = $tmp;
                }
                $status = $fee_field_value_model->addAll($fee_init_data);
                return $status;
            }
        }
        return false;
    }
    /**
     * 将产品移到回收站
     * @param int $product_id
     * @param int $from_status
     * @param int $to_status
     * @return boolean
     */
    protected function moveProductToRecycle($product_id = 0, $from_status = 0, $to_status = 0)
    {
        $data = array(
            'product_id' => $product_id,
            'from_status' => $from_status,
            'to_status' => $to_status,
            'add_time' => date('Y-m-d H:i:s'),
        );
        $status = M('product_recycle')->add($data);
        return $status;
    }

    /**
     * 获取用户上传的产品合同
     * @param int $product_id
     * @param int $uid
     * @param int $source
     * @return array $data
     */
    public function getUserUploadContract($product_id = 0, $uid = 0, $source = 0){
        $data = array();
        if($product_id){
            $where['product_id'] = $product_id;
            if($uid){
                $where['uid'] = $uid;
            }
            $where['type'] = 2;
            if($source){
                $where['source'] = $source;
            }
            $where['status'] = 1;
            $data = M('product_attachment')->where($where)->select();
        }
       return $data;
    }

    /**
     * 获取产品费率方案详情
     * @param int $product_id
     * @return array
     */
    public function getProductFeeInfo($product_id = 0){
        $data = array();
        if($product_id){
            $where['fv.product_id'] = $product_id;//$post['product_id'];
            $where['fv.status'] = 1;
            $pcf_model = M('category_fees_field_value as fv');
            $data['product_id'] = $product_id;//$post['product_id'];
            //产品渠道费用
            $data['channel_fee'] = $this->getProductFieldValue($product_id, 'channel_fee');
            //产品费率方案值
            $data['fee'] = $pcf_model->field('fv.product_id, fv.field_id,fv.field_value,fv.field_name')
                ->where($where)
                ->select();
            //jdp 2016,3,7 格式化数据，方便前端直接获取数据
            if(!empty($data['fee'])){
                foreach($data['fee'] as $f=>$v){
                    //格式化field_value
                    if(!empty($v['field_value'])){

                        if(strpos($v['field_value'],'%')===true){
                            $per=explode('%',$v['field_value']);
                        }else{
                            $per=$v['field_value'];
                        }
                        $data['fee'][$f]['result']= ($per* $data['channel_fee']['channel_fee'])/100;
                    }else{

                        $data['fee'][$f]['result']=0;
                    }

                }

            }
        }
        return $data;
    }
    public function isCheckProductFee($product_id = 0, $uid = 0){
        $feeLogModel = M('product_fees_log');
        $where['product_id'] = $product_id;
        $where['uid'] = $uid;
        $where['type'] = 1;
        $where['status'] = 1;
        $checkLogNum = $feeLogModel->where($where)->count();
        return $checkLogNum;
    }

    /**
     * 给评分人发送站内消息(产品部总监、调研部总监、运营部总监)
     * @return bool
     */

    public function sendScoreUserMessage($data){
        $positionArr = C('SCORE_POSITION') ? C('SCORE_POSITION') : array(43, 45, 48);
        $where['position_id'] = array('in', $positionArr);
        $where['status'] = 1;
        $userList = M('user')->field('id')->where($where)->select();
        //$uidArr = array();
        $title = "【{$data['short_name']}】进入待评分流程";
        $content = "【{$data['short_name']}】已完成提交，进入待评分流程，请及时处理，谢谢！";
        $status = false;
        if($userList){
            foreach($userList as $k=>$value){
                //$uidArr[] = $value;
                $status = $this->sendUserMessage($title, $content, $value['id']);
            }
        }
        return $status;
    }
    /**
     * 获取产品费率审核备注信息
     */
    public function getProductFeesRemarkInfo(){
        $data = array();
        $post = I('param.');
        $product_id = $post['id'];
        if($product_id){
            $feeLogModel = M('product_fees_log');
            $where = array('product_id'=>$product_id, 'status'=>1, 'type'=>1);
            $data = $feeLogModel->where($where)->select();
            return $data;
        }
        return $data;
    }

    /**
     * @param $product_id
     * @return mixed
     */
    public function getCheckMeetingNum($product_id){
        $where['type'] = 1;
        $where['status'] = 1;
        $where['product_id'] = $product_id;
        $num = M('product_meeting_log')->where($where)->count();
        return $num;
    }

}