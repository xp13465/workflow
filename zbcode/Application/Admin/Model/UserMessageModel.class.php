<?php
namespace Admin\Model;

use Think\Log;
use Think\Model;

class UserMessageModel extends Model
{
    protected $_validate = array(
        array('title', 'require', '请填写消息标题'),
        array('content', 'require', '请填写消息内容'),
    );
    protected $_auto = array(
        array('add_time', 'date', 3, 'function', 'Y-m-d H:i:s'),
    );

    /**
     * 获取用户消息
     * @param $uid
     * @param int $is_view 0：所有 1:未查看 2：已查看
     * @param array $param 查询参数
     * @param int $page 页数
     * @param int $limit 每页条数
     * @return array $data
     */
    public function getUserMessageList($uid, $is_view = 0, $param = array(), $page, $limit)
    {
        $data = array();
        if ($uid) {
            $where['uid'] = intval($uid);
            //$where['status'] = 1;
            if ($is_view > 0) {
                $where['is_view'] = $is_view;
            }
            if ($param['status']) {
                $where['status'] = $param['status'];
            }
            if($param['add_time'] > 0){

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
                $where['add_time'] = $time_condition;
                //$condition['add_time'] = $time_condition;
            }
            $data['total'] = $this->where($where)->count();
            $data['items'] = $this->where($where)->page($page, $limit)->order('add_time desc')->select();
        }
        return $data;
    }

    /**
     * 获取公共用户消息
     * @param $uid
     * @param int $is_view 0:所有 1:未查看 2：已查看
     * @param array $param 查询参数
     * @param $page
     * @param $limit
     * @return mixed
     */
    public function getPublicMessageList($uid, $is_view = 0, $param = array(), $page, $limit)
    {
        if ($uid) {
            $model = M('PublicMessage');
            $where = '';
            $where .= ' a.status = 1';
            if($param['title']){
                $where .= " and a.title like '%" . $param['title'] . "%'";
            }
            $time_condition = '';
            if($param['add_time']){
                $time = $param['add_time'];
                $time_condition = ' and a.add_time ';
                switch ($time) {
                    case 1 ://一周
                        $time_end  = date('Y-m-d H:i:s');
                        $time_start= date('Y-m-d H:i:s', time() - 7 * 24 * 60 * 60);
                        $time_condition .= " between '{$time_start}' and '{$time_end}' ";//['between', $time_start . ',' . $time_end];
                        break;
                    case 2://一个月
                        $time_end = date('Y-m-d H:i:s');
                        $time_start = date('Y-m-d H:i:s', time() - 30 * 24 * 60 * 60);
                        $time_condition .= " between '{$time_start}' and '{$time_end}' ";
                        break;
                    case 3://三个月
                        $time_end = date('Y-m-d H:i:s');
                        $time_start = date('Y-m-d H:i:s', time() - 90 * 24 * 60 * 60);
                        $time_condition .= " between '{$time_start}' and '{$time_end}' ";
                        break;
                    case 4:
                        $time_start = date('Y-m-d H:i:s', time() - 90 * 24 * 60 * 60);
                        $time_condition .= " <= '{$time_start}' ";
                    default:
                        break;
                }

            }
            $where .= $time_condition;
            if ($is_view == 1) {
                $where .= ' and IF(ISNULL(b.id), 0, 1) = 0';
            } else if ($is_view == 2) {
                $where .= ' and IF(ISNULL(b.id), 0, 1) = 1';
            }

            $data['total'] = $model->field('a.*, IF(ISNULL(b.id), 0, 1) as is_view')
                ->table('__PUBLIC_MESSAGE__ as a')
                ->join('__PUBLIC_MESSAGE_LOG__ as b on a.id = b.message_id and b.uid = ' . intval($uid), 'left')
                ->where($where)
                ->count();
            $data['items'] = $model->field('a.*, IF(ISNULL(b.id), 0, 1) as is_view')
                ->table('__PUBLIC_MESSAGE__ as a')
                ->join('__PUBLIC_MESSAGE_LOG__ as b on a.id = b.message_id and b.uid = ' . intval($uid), 'left')
                ->where($where)
                ->page($page, $limit)
                ->order('a.add_time desc')
                ->select();
            return $data;
        }
    }
    /**
     * 发送用户消息
     * @param $title
     * @param $content
     * @param $to_user
     * @return bool
     */
    protected function sendUserMessage($title, $content, $to_user)
    {
        $MsgModel = M('UserMessage');
        if ($to_user) {
            $uid = array();
            if(is_array($to_user)){
                $uid = $to_user;
            }else{
                $uid[] = $to_user;
            }
            $status = true;
            if ($uid) {
                $data = array();
                if(!empty($uid)){
                    foreach($uid as $key=>$value){
                        $tmp = array(
                            'title' => $title,
                            'content' => $content,
                            'uid' => $value,
                            'add_time' => date('Y-m-d H:i:s'),
                        );
                        $data[] = $tmp;
                    }
                    $status = $MsgModel->addAll($data);
                }
                return $status;
            }
        }
        return false;
    }
}