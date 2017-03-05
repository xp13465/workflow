<?php
namespace Admin\Controller;

use Think\Controller;

/**
 * 消息管理控制器
 * Class MessageController
 * @package Admin\Controller
 */
class MessageController extends AdminController
{
    /**
     * 获取用户消息
     */
    public function getUserMessageList()
    {
        $page = I('param.page') ? I('param.page') : 1;
        $limit = I('param.limit') ? I('param.limit') : 20;
        //0：全都 1 未查看，2 已查看
        $is_view = I('post.is_view') ? I('post.is_view') : 0;
        //0：全都 1 有效，2 已删除
        $param['status'] = I('post.status') ? I('post.status') : 1;
        if(I('param.add_time')){
            $param['add_time'] = I('param.add_time');
        }
        $data = D('UserMessage')->getUserMessageList($this->uid, $is_view, $param, $page, $limit);
        $this->printJson($data);
    }

    /**
     * 查看用户消息
     */
    public function getUserMessageInfo(){
        $id = I('param.id');
        if($id){
            $data['id'] = $id;
            $data['is_view'] = 2;
            $data['handle_time'] = date('Y-m-d H:i:s');
            $status = D('UserMessage')->save($data);
            if($status){
                $data = D('UserMessage')->find($id);
                $this->printJson($data);
            }else{
                $this->setError('操作失败');
            }
        }
        $this->setError('参数有误');
    }
    /**
     * 删除用户消息
     */
    public function delUserMessage(){
        $id = I('param.id');
        if($id){
            $data['id'] = $id;
            $data['status'] = 2;
            $data['handle_time'] = date('Y-m-d H:i:s');
            $status = D('UserMessage')->save($data);
            if($status){
                $this->createOperationLog('删除待办事项，消息ID：' . $id);
                $this->setSuccess('操作成功');
            }else{
                $this->setError('操作失败');
            }
        }
        $this->setError('参数有误');
    }
    /**
     * 获取公共消息
     * $type 0：全都 1 未查看，2 已查看
     */
    public function getPublicMessageList()
    {
        $page = I('param.page') ? I('param.page') : 1;
        $limit = I('param.limit') ? I('param.limit') : 20;
        //$uid = $this->uid;
        $type = I('post.type') > 0 ? I('post.type') : 0;
        $param['title'] = I('param.title');
        if($param['title']){
            $param['title'] = $param['title'];
        }
        if(I('param.add_time')){
            $param['add_time'] = intval(I('param.add_time'));
        }
        //0：全都 1 未查看，2 已查看
        $data = D('UserMessage')->getPublicMessageList($this->uid, $type, $param, $page, $limit);
        $this->printJson($data);
    }
    /**
     * 删除用户自己发布的公告(只有删除自己发布的公告)
     */
    public function delPublicMessage(){
        $this->checkPermission('announcement.delete');
        $id = I('post.id');
        if($id){
            $model = D('PublicMessage');
            $sender_uid = $model->where('id = ' . $id)->getField('sender_uid');
            if($sender_uid == $this->uid){
                $data['status'] = 2;
                $data['update_time'] = date('Y-m-d H:i:s');
                $status = $model->where('id = ' . $id)->save($data);
                if($status){
                    $this->createOperationLog('删除公告，公告ID：' . $id);
                    $this->setSuccess('操作成功');
                }else{
                    $this->setError('操作失败');
                }

            }
            $this->setError('对不起，此公告不是您发布的，无权进行删除');

        }
        $this->setError('参数有误');
    }
    /**
     * 获取己发布的公告
     */
    public function getReleasedPublicMessageList()
    {
        //$uid = $this->uid;
        $page = I('param.page') ? I('param.page') : 1;
        $limit = I('param.limit') ? I('param.limit') : 20;
        //sender_status：公告发送者所属状态 1 正常，2 草稿 3删除
        $param['status'] = 1;
        $param['title'] = I('param.title');
        if($param['title']){
            $param['title'] = $param['title'];
        }
        if(I('param.add_time')){
            $param['add_time'] = intval(I('param.add_time'));
        }
        $data = $this->getMyPublicMessage($this->uid, $param, $page, $limit);
        $this->printJson($data);
    }
    /**
     * 获取草稿箱公告
     */
    public function getDraftPublicMessageList()
    {
        $page = I('param.page') ? I('param.page') : 1;
        $limit = I('param.limit') ? I('param.limit') : 20;
        //sender_status：公告发送者所属状态 1 正常，2 草稿 3删除
        $param['status'] = 3;
        $param['title'] = I('param.title');
        if($param['title']){
            $param['title'] = $param['title'];
        }
        if(I('param.add_time')){
            $param['add_time'] = intval(I('param.add_time'));
        }
        $data = $this->getMyPublicMessage($this->uid, $param, $page, $limit);
        $this->printJson($data);
    }
    /**
     * 获取已撤销公告
     */
    public function getCanceledPublicMessageList()
    {
        $page = I('param.page') ? I('param.page') : 1;
        $limit = I('param.limit') ? I('param.limit') : 20;
        //sender_status：公告发送者所属状态 1 正常，2 草稿 3删除
        $param['status'] = 4;
        $param['title'] = I('param.title');
        if($param['title']){
            $param['title'] = $param['title'];
        }
        if(I('param.add_time')){
            $param['add_time'] = intval(I('param.add_time'));
        }
        $data = $this->getMyPublicMessage($this->uid, $param, $page, $limit);
        $this->printJson($data);
    }
    /**
     * 撤销公告
     */
    public function revokeSenderPublicMessage(){
        $this->checkPermission('announcement.cancel');

        $id = I('post.id');
        if($id){
            $model = D('PublicMessage');
            $sender_uid = $model->where('id = ' . $id)->getField('sender_uid');
            if($sender_uid == $this->uid){
                $where['id'] = $id;
                $where['sender_uid'] = $this->uid;
                $data['status'] = 4;
                $data['update_time'] = date('Y-m-d H:i:s');
                $status = $model->where($where)->save($data);
                if($status){
                    $this->createOperationLog('删除公告，公告ID：' . $id);
                    $this->setSuccess('操作成功');
                }else{
                    $this->setError('操作失败');
                }
            }else{
                $this->setError('对不起，此公告不是您发布的，无权进行撤销');
            }
        }
        $this->setError('参数有误');
    }
    /**
     * 还原公告
     */
    public function restoreSenderPublicMessage(){
        $this->checkPermission('announcement.return');

        $id = I('post.id');
        if($id){
            $model = D('PublicMessage');
            $sender_uid = $model->where('id = ' . $id)->getField('sender_uid');
            if($sender_uid == $this->uid){
                $where['id'] = $id;
                $where['sender_uid'] = $this->uid;
                $data['status'] = 1; //还原成 有效
                $data['update_time'] = date('Y-m-d H:i:s');
                $status = $model->where($where)->save($data);
                if($status){
                    $this->createOperationLog('恢复公告，公告ID：' . $id);
                    $this->setSuccess('操作成功');
                }else{
                    $this->setError('操作失败');
                }
            }else{
                $this->setError('对不起，此公告不是您发布的，无权进行撤销');
            }
        }
        $this->setError('参数有误');
    }
    /**
     * 用户消息详情
     */
    public function getUserMessageDetail()
    {
        $id = I('post.id');
        if ($id) {
            $data = D('UserMessage')->where('status = 1')->find($id);
            //更改查看状态
            D('UserMessage')->where('id = ' . intval($id))->save(array('is_view' => 2));
            $this->printJson($data);
        }
        $this->setError('参数有误');
    }

    /**
     * 查看公告
     */
    public function getPublicMessageInfo()
    {
        $id = I('post.id');
        if ($id) {
            $data = D('PublicMessage')->find($id);
            if($data['sender_uid'] != $this->uid && in_array($data['status'], array(2, 4))){
                $msg = array(
                    2 =>'对不起，该公告已被删除！',
                    4 =>'对不起，该公告已被撤销！',
                    );
                $this->setError($msg[$data['status']]);
            }
            $where = array(
                'message_id' => intval($id),
                'uid' => $this->uid,
            );
            $is_have = M('public_message_log')->where($where)->find();
            //如果该用户没查看此公告，则插入该用户已查看公告记录
            if(empty($is_have)){
                $log_data = array(
                    'message_id' => intval($id),
                    'uid' => $this->uid,
                    'handle_time' => date('Y-m-d H:i:s'),
                );
                M('PublicMessageLog')->add($log_data);
            }

            $this->printJson($data);
        }
        $this->setError('参数有误');
    }

    /**
     * 发布公告
     */
    public function addPublicMessage(){
        $this->checkPermission('announcement.add');
        $post = I('param.');
        if(!empty($post)){
            $data['title'] = trim($post['title']);
            $data['content'] = $post['content'];
            $data['sender_uid'] = $this->uid;
            $data['source'] = $post['source'] ? $post['source'] : '';
            if(!empty(trim($post['clock_time']))){
                $data['clock_time'] = trim($post['clock_time']);
            }
            //如果是定时发布，则存成草稿。如果不是定时发布，则直接发布
            if($post['is_clock'] == 1){
                $data['status'] = 3;
            }else{
                $data['status'] = $post['status'] ? $post['status'] : 1;
            }
            //$data['status'] = $post['is_clock'] == 1 ? 3 : 1;
            $data['is_clock'] = intval($post['is_clock']);
            $data['add_time'] = date('Y-m-d H:i:s');
            $status = M('public_message')->add($data);
            if($status){
                $this->setSuccess('发布成功');
            }else{
                $this->setError('发布失败');
            }
        }
        $this->setError('参数有误');
    }
    /**
     * 编辑公告
     */
    public function editPublicMessage(){
        //$this->checkPermission('announcement.add');
        $post = I('param.');
        if(!empty($post)){
            $model = D('PublicMessage');
            $sender_uid = $model->where('id = ' . $post['id'])->getField('sender_uid');
            if($sender_uid == $this->uid){
                $data['id'] = $post['id'];
                $data['title'] = trim($post['title']);
                $data['content'] = $post['content'];
                $data['is_clock'] = intval($post['is_clock']);
                $data['source'] = $post['source'] ? $post['source'] : '';
                if(!empty(trim($post['clock_time']))){
                    $data['clock_time'] = trim($post['clock_time']);
                }
                if($post['status']){
                    $data['status'] = $post['status'];
                }
                $data['update_time'] = date('Y-m-d H:i:s');
                $status = $model->save($data);
                if($status){
                    $this->setSuccess('编辑成功');
                }else{
                    $this->setError('编辑失败');
                }
            }else{
                $this->setError('对不起，此公告不是您发布的，无权进行编辑');
            }

        }
        $this->setError('参数有误');
    }

    /**
     * 草稿箱公告发布
     */
    public function releasedPublicMessage(){
        $id = I('param.id');
        if($id){
            $data['id'] = $id;
            $data['status'] = 1;
            $status = M('public_message')->save($data);
            if($status){
                $this->setSuccess('发布成功');
            }else{
                $this->setError('发布失败');
            }
        }
        $this->setError('参数有误');
    }
    /**
     * 获取自己发布的公告消息
     * @param int $uid
     * @param int $page
     * @param int $limit
     * @param array $param
     * @return mixed
     */
    protected function getMyPublicMessage($uid = 0, $param = array(), $page=1, $limit = 20){
        if($uid){
            $model = D('PublicMessage');
            $where['sender_uid'] = $uid;
            if($param['title']){
                $where['title'] = array('like', '%' . trim($param['title']) . '%');
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
            if($param['status'] > 0){
                $where['status'] = intval($param['status']);
            }
            $data['total'] = $model->where($where)->count();
            $data['items'] = $model->where($where)->page($page, $limit)->order('id desc')->select();
        }
        return $data;
    }
}