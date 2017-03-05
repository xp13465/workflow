<?php
/**
 * Created by PhpStorm.
 * Author: Wen Bing
 * Date: 2015/12/14
 * Time: 17:04
 */

namespace Admin\Model;


use Think\Model;

class ProductModel extends Model
{
    /**
     * 获取产品信息
     */
    public function getProductInfo()
    {

    }

    /**
     * 获取产品基本信息
     * @param int $product_id
     * @param string $field
     * @return array|mixed
     */
    public function getProductBaseInfo($product_id = 0, $field = '')
    {
        $data = array();
        if ($product_id) {
            $field = $field ? $field : true;
            $data = M('Product')->field($field)->find($product_id);
        }
        return $data;
    }

    /**
     * 获取产品类型参数信息
     * @param int $product_id
     * @return array|mixed
     */
    public function getProductCateInfo($product_id = 0)
    {
        $data = array();
        if ($product_id) {
            //M('product_category_field_value');
            $where = array(
                'status' => 1,
                'product_id' => $product_id,
            );
            $data = M('product_category_field_value')->field(true)->where($where)->select();
        }
        return $data;
    }

    /**
     * 获取产品新增信息
     * @param int $product_id
     * @return array
     */
    public function getProductSelfInfo($product_id = 0)
    {
        $arr = array();
        if ($product_id) {
            $where['cgfv.product_id'] = $product_id;
            $cg_model = M('category_group_field_value as cgfv');
            $field = 'cgfv.id,cgfv.field_value,cgf.group_id,cg.group_name,cgf.id as field_id,cgf.field_name,cgf.field_type,cgf.field_option';
            $field_arr = $cg_model->join('left join zb_category_group_field as cgf on cgfv.field_id = cgf.id')
                ->join('left join zb_category_group as cg on cg.id = cgf.group_id')
                ->field($field)
                ->where($where)
                ->order('cgf.field_type ASC')
                ->select();
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

        }
        return $arr;
    }

    /**
     * 获取产品合同
     * @param int $product_id
     * @return array|mixed
     */
    public function getProductContract($product_id = 0)
    {
        $data = array();
        if ($product_id) {
            $where['product_id'] = $product_id;
            $where['type'] = 2; //类型 2：合同
            $where['status'] = 1;
            $where['source'] = 2; //取来源 法务部的合同
            $data = M('product_attachment')->where($where)->select();
        }
        return $data;
    }

    /**
     * 清除产品评分记录、合同记录
     * @param int $product_id
     * @return bool
     */
    public function clearProductScoreInfo($product_id = 0)
    {
        if ($product_id) {
            $where['product_id'] = $product_id;
            $where['status'] = 1;
            $data['status'] = 2;
            M()->startTrans();
            $scoreInfo = M('product_group_score')->where($where)->select();
            $status = !empty($scoreInfo) ? M('product_group_score')->where($where)->save($data) : true;
            if ($status) {
                unset($where['status']);
                $where['is_used'] = 1;
                unset($data['status']);
                $data['is_used'] = 2;
                $score_reason_info = M('product_score_reason')->where($where)->select();
                $s = !empty($score_reason_info) ? M('product_score_reason')->where($where)->save($data) : true;
                if ($s) {
                    M()->commit();
                    return true;
                } else {
                    M()->rollback();
                    return false;
                }
            } else {
                M()->rollback();
                return false;
            }

        }
        return false;
    }

    /**
     * 清除产品合同记录
     * @param int $product_id
     * @return bool
     */
    public function clearProductContract($product_id = 0)
    {
        if ($product_id) {
            $where['product_id'] = $product_id;
            $where['type'] = 2; //类型 2：合同
            $where['status'] = 1;
            $data['status'] = 2; //修改为无效状态
            //产品合同存在则需要删除，如果没有产品合同，则返回true
            $contractInfo = M('product_attachment')->where($where)->select();
            $status = !empty($contractInfo) ? M('product_attachment')->where($where)->save($data) : true;
            return $status;
        }
        return false;
    }

    /**
     * @param $product_id
     * @param string $field
     * @return mixed|object
     */
    public function getProductFieldValue($product_id, $field = '')
    {
        $product_id = $product_id ? $product_id : I('param.product_id');
        $where['id'] = $product_id;
        $field = $field ? $field : 'id,product_num,category_id,full_name,short_name,contact_tel,contacter,channel_fee,creater,creater_uid,term,end_time,total_moeny,introduction,status';
        $product_info = M('product')->where($where)->field($field)->find();
        return $product_info;
    }

    /**
     * 读取分类对应的字段及其值,编辑产品信息和查看产品信息的时候使用
     * @param int $product_id
     * @return mixed|object
     */
    public function getProductCategoryFieldValue($product_id = 0)
    {
        $product_id = $product_id;
        $where['product_id'] = $product_id;
        $where['pcfv.status'] = 1;
        $pcf_model = M('product_category_field_value as pcfv');
        $product_cate_field = $pcf_model->join('__' . strtoupper('product_category_field') . '__ as pcf ON pcfv.field_id = pcf.id ', 'left')
            ->field("pcf.field_type,pcf.field_option,pcfv.field_id,pcfv.field_name,pcfv.field_value")
            ->where($where)
            ->select();

        return $product_cate_field;

    }

    /**
     * 获取产品自增信息
     * @param int $product_id
     * @return mixed|object
     */
    public function productGetSelfFieldValue($product_id = 0)
    {
        $product_id = $product_id ? $product_id : I('param.product_id');
        $selfFieldValue = M('product_self_field_value')->where(['product_id' => $product_id])->select();
        return $selfFieldValue;
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
        return $arr;
    }

    /**
     * 获取产品评分结果
     * @param int $product_id
     * @param int $uid
     * @return array
     */
    public function getProductScoreResult($product_id = 0, $uid = 0)
    {
        $data = array();
        if ($product_id) {
            $where['s.product_id'] = $product_id;
            if ($uid) {
                $where['s.uid'] = $uid;
            }
            $where['s.status'] = 1;
            $scoreData = M('product_group_score as s')->field('s.*,g.group_name,d.name as department_name,d.id as department_id')
                ->where($where)
                ->join('__' . strtoupper('category_group') . '__ as g ON g.id = s.group_id', 'left')
                ->join('__' . strtoupper('user') . '__ as u ON s.uid = u.id', 'left')
                ->join('__' . strtoupper('department') . '__ as d ON u.department_id = d.id', 'left')
                ->select();
            unset($where['s.status']);
            $where['s.is_used'] = 1;
            $resultData = M('product_score_reason as s')->where($where)->select();

            if (!empty($scoreData)) {
                foreach ($scoreData as $key => $value) {
                    $data[$value['uid']]['department_name'] = $value['department_name'];
                    if (!in_array($value['uid'], $data)) {
                        $data[$value['uid']]['scoreList'][] = $value;
                    } else {
                        $data[$value['uid']]['scoreList'][] = $value;
                    }
                }
                foreach ($resultData as $key => $value) {
                    $data[$value['uid']]['result'][] = $value;
                }
            }
        }
        return $data;
    }

    /**
     * 获取产品费率方案详情
     * @param int $product_id
     * @return array
     */
    public function getProductFeeInfo($product_id = 0)
    {
        $data = array();
        if ($product_id) {
            $where['fv.product_id'] = $product_id;//$post['product_id'];
            $where['fv.status'] = 1;
            $pcf_model = M('category_fees_field_value as fv');
            $data['product_id'] = $product_id;
            //产品渠道费用
            $data['channel_fee'] = $this->getProductFieldValue($product_id, 'channel_fee');
            //产品费率方案值
            $data['fee'] = $pcf_model->field('fv.product_id, fv.field_id,fv.field_value,fv.field_name')
                ->where($where)
                ->select();
        }
        return $data;
    }

    /**
     * 获取评分备注
     * @param int $product_id
     * @return array|mixed
     */
    public function getProductFeesRemarkInfo($product_id=0)
    {
        $data = array();
        if ($product_id) {
            $feeLogModel = M('product_fees_log');
            $where = array('product_id' => $product_id, 'status' => 1, 'type' => 1);
            $data = $feeLogModel->where($where)->select();
            return $data;
        }
        return $data;
    }

    /**
     * 读取产品合同
     * @param int $product_id
     * @return mixed|object
     */
    public function productGetContract($product_id = 0)
    {
        $where['product_id'] = $product_id;
        $where['type'] = 2;
        $where['status'] = 1;
        $contract_arr = M('product_attachment')->where($where)->field('id,attachment_name,attachment_url,uid,source')->select();
        return $contract_arr;
    }

    /**
     * 获取产品普通附件
     * @param $product_id
     * @return array|mixed
     */
    public function getProductAttachment($product_id)
    {
        $img_data = array();
        if ($product_id) {
            $where['product_id'] = $product_id;
            $where['type'] = 1;
            $where['status'] = 1;
            $img_data = M('product_attachment')->field('id,type,attachment_name,attachment_url,uid,source')->where($where)->select();
        }
        return $img_data;
    }

    /**
     * 生成产品资料包，包括产品所有相关的信息
     * @param int $product_id
     */
    public function productInfoCreatePackage($product_id = 0){

    }

    /**
     * 到期产品过期
     * @return bool $status
     */
    public function overdueProduct(){
        $status = true;
        $product_info = $this->field('id, status,short_name,creater_uid, end_time')->select();
        if($product_info){
            foreach($product_info as $key=>$value){
                $now = time();
                $end_time = strtotime($product_info['end_time']);
                //================产品过期时间前3天，给产品录入人发送待办消息==========================================
                $three_days = $end_time + (3 * 86400);
                if($now >= $three_days){
                    $title = "【" . $value['short_name'] . "】即将过期";
                    $content = "【" . $value['short_name'] . "】即将于" . $value['end_time'] . "过期，请知悉，谢谢！";
                    $status = D('UserMessage')->sendUserMessage($title, $content, $value['creater_uid']);
                }
                //=====================================================================================================
                if($now >= $end_time){
                    $data['id'] = $value['id'];
                    $data['status'] = 7;
                    $status = $this->save($data); //修改产品为已下架
                    $this->moveProductToRecycle($value['id'], $value['status'], 7); //将产品移入回收站
                    //产品已过期，给录入人发送待办消息
                    $title = "【" . $value['short_name'] . "】已过期";
                    $content = "【". $value['short_name'] . "】已于" . $value['end_time'] . "过期，请知悉，谢谢！";
                    D('UserMessage')->sendUserMessage($title, $content, $value['creater_uid']);
                }
            }
        }

        return $status;
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
     * 清除产品上会审核记录
     * @param int $product_id
     * @return bool
     */
    public function clearProductMeetingLog($product_id = 0)
    {
        if ($product_id) {
            $where['product_id'] = $product_id;
            $where['status'] = 1;
            $data['status'] = 2;
            M()->startTrans();
            $meetingInfo = M('product_meeting_log')->where($where)->select();
            $status = !empty($meetingInfo) ? M('product_meeting_log')->where($where)->save($data) : true;
            if ($status) {
                M()->commit();
                return true;
            } else {
                M()->rollback();
                return false;
            }
        } else {
            M()->rollback();
            return false;
        }

        return false;
    }

    /**
     * 获取产品上会审核意见
     * @param int $product_id 产品ID
     * @return array|mixed
     */
    public function getProductMeetingRemark($product_id = 0)
    {
        $data = array();
        if($product_id){
            $where['product_id'] = $product_id;
            $where['type'] = 1;
            $where['status'] = 1;
            $data = M('product_meeting_log')->where($where)->select();
        }
        return $data;
    }

    /**
     * 检测用户是否同意过待上会产品
     * @param $product_id
     * @param $uid
     * @return boolean
     */

    public function isCheckProductMeetingByUser($product_id, $uid){
        $where['product_id'] = $product_id;
        $where['uid'] = $uid;
        $where['type'] = 1;
        $where['status'] = 1;
        $is_check = M('product_meeting_log')->where($where)->find();
        return !empty($is_check) ? true : false;
    }
}