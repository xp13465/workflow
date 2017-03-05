<?php
/**
 * Class CommonController
 * @package Home\Controller
 */
namespace Admin\Controller;

use Think\Controller;
use Think\Log;

/**
 * 后台总控制器
 * Class AdminController
 * @package Admin\Controller
 */
class AdminController extends Controller
{
    public $data = array();
    public $uid;

    public function __construct()
    {
        header("content-type:text/html;charset=utf-8");
        //初始化框架控制器 以使用自带的初始化所有方法
        parent::__construct();
        /*全局变量 $data  用于action 结束之后的 统一输出*/
        $GLOBALS['data'] = &$this->data;
        //当前登陆用户的ID
        $this->uid = $this->getUid();
        $this->assign('system_name', C('SYSTEM_NAME'));
        if (strtolower(MODULE_NAME) == 'admin' && !in_array(strtolower(CONTROLLER_NAME), array('common', 'admin'))) {
            if (strtolower(CONTROLLER_NAME) == 'index' && ACTION_NAME == 'index') {
                $this->isLogin(0);
            } else {
                $this->isLogin();
            }
        }
    }

    /*在action结束之后调用  用于统一输出*/
    public static function afterAction()
    {
        //echo json_encode($GLOBALS['data']);
    }

    /**
     * 判断是否登陆
     */
    protected function isLogin($ajax = 1)
    {
        if (!session('user')) {
            if ($ajax == 1) {
                //echo json_encode(array('errorcode'=>10011, 'syserror'=>1, 'msg'=>'请先登陆！'));
                $this->setStatus('login_status', 0);
            } else {
                //$this->setStatus('login_status', 0);
                $this->redirect('common/login');
            }
        }
    }

    /*以下三个函数 设置 返回数据格式*/
    protected function setSuccess($msg, $data='')
    {
        $this->data = array('status' => 1, 'msg' => $msg);
        if($data){
            $this->data['data'] = $data;
        }
        echo json_encode($this->data);
        exit;
    }

    protected function setError($msg, $status_code = 0)
    {
        $this->data = array('status' => $status_code, 'msg' => $msg);
        echo json_encode($this->data);
        exit;
    }

    protected function setStatus($status, $msg = '')
    {
        $this->data = array($status => $msg);
        echo json_encode($this->data);
        exit;
    }

//    protected function getDataFormat($data , $tbname){
//        return array('field'->getxxxx($data)    , 'data'->$data);
//    }
    /**
     * 输出数据列表及总条数
     * @param $items
     * @param $total
     */
    protected function printJson($items, $total = '')
    {
        $json = array();
        if ($items && $total != '') {
            $json = array(
                'total' => $total,
                'items' => $items,
            );
        } else if (isset($items['total']) && isset($items['items'])) {
            $json = &$items;
        } else if (is_array($items)) {
            $json = &$items;
        }
        if(I('post.page') && isMobile()){
            $json['page'] = intval(I('post.page'));
        }
        $this->echoJson($json);
    }

    /**
     * 统一的json输出方法
     * @param $data
     */
    protected function echoJson($data)
    {
        //header('Content-type:text/html; charset=utf-8');
        $type = C('PRINT_JSON');
        if ($type == 'json') {
            echo json_encode($data);
        } else if ($type == 'json_base64') {
            echo base64_encode(json_encode($data));
        } else {
            echo $this->setError('未知的数据格式');
        }
        exit;
    }

    protected function setData($data)
    {
        $this->data = $data;
    }

    /**
     * 生成缓存文件
     */
    protected function setCacheFile($name, $data)
    {
        if ($data) {
            $cache_dir = C('ADMIN_CACHE_PATH');
            return F($name, $data, $cache_dir);
        }
    }

    /**
     * 获取缓存文件内容
     */
    protected function getCacheFile($name)
    {
        if ($name) {
            $cache_dir = C('ADMIN_CACHE_PATH');
            $data = file_get_contents($cache_dir . $name . '.php');
            return mb_unserialize($data);
        }
    }

    /**
     * 发送公共消息
     * @param $title 标题
     * @param $content 内容
     * @return boolean
     */
    protected function sendPublicMessage($title, $content)
    {
        $MsgModel = M('PublicMessage');
        $data = array(
            'title' => $title,
            'content' => $content,
            'add_time' => date('Y-m-d H:i:s'),
        );
        return $MsgModel->add($data);
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

    /**
     * 获取登陆用户的基本信息
     */
    protected function getUserInfo()
    {
        $info = session('user_info');
        if ($info) {
            return $info;
        }
        return false;
    }

    /**
     * 用户ID
     */
    protected function getUid()
    {
        $info = $this->getUserInfo();
        return $info['id'];
    }

    /**
     * 用户姓名
     */
    protected function getUname()
    {
        $info = $this->getUserInfo();
        return $info['realname'];
    }

    /**
     * 用户部门名称
     */
    protected function getDpName()
    {
        $info = $this->getUserInfo();
        $where['id'] = $info['department_id'];
        $dp_model = M('department');
        return $dp_model->where($where)->getField('name');
    }

    /**
     * 记录操作日志
     * @param  $content_log
     * @return boolean
     */
    protected function createOperationLog($content_log)
    {
        if ($content_log) {
            $data['uid'] = $this->uid;
            $data['add_time'] = date('Y-m-d H:i:s');
            $data['content'] = $content_log;
            $status = M('OperationLog')->add($data);
            return $status;
        }
        return false;
    }

    /**
     *  发送邮件 可带附件
     * @param $tomail
     * @param $title
     * @param $content
     * @param array $Attachment 附件数据 格式 array(
     *                                           0 => array('path'=>附件地址1, 'title'=>附件标题),
     *                                           1 => array('path'=>附件地址2, 'title'=>附件标题),
     *                                           )
     * @param array $cc 抄送地址 格式 array(
     *                                       0 => '抄送地址1',
     *                                       1 => '抄送地址2',
     *                                      )
     * @return boolean
     */
    protected function sendMail($tomail, $title, $content, $Attachment = array(), $cc = array())
    {
        $config = C('EMAIL_SERVER');
        $mail = new \Common\Lib\Email($config); // the true param means it will throw exceptions on errors, which we need to catch
        if (!empty($Attachment)) {
            foreach ($Attachment as $key => $value) {
                $mail->addAttachment($value['path'], $value['title']);
            }
        }
        if (!empty($cc) && is_array($cc)) {
            $mail->setCc($cc);
        }
        $status = $mail->sendMail($tomail, $title, $content);
        return $status;
    }

    /**
     * 发送产品合同 邮件到财务及董办
     * @param $title
     * @param $content
     * @param array $Attachment
     * @param array $cc
     * @return bool
     */
    protected function sendProductContractMail($title, $content, $Attachment = array(), $cc = array())
    {
        //获取 财务及董办的邮箱
        $mailList = C('SEND_MSG_MAIL_LIST');
        $mail_array = array();
        if (!empty($mailList)) {
            foreach ($mailList as $key => $value) {
                $mail_array[] = $value['mail'];
            }
        }
        $status = $this->sendMail($mail_array, $title, $content, $Attachment, $cc);
        return $status;
    }
    /**
     * 检查用户是否拥有该权限
     * @param $permissionCode
     * @return boolean $status
     */
    public function checkUserPermission($permissionCode = '')
    {
        $is_check = true;
        if(!$is_check){
            return true;
        }
        if(!$permissionCode){
            $permission_code = I('post.permission_code');
        }else{
            $permission_code = $permissionCode;
        }
        if ($permission_code) {
            $permission_all = $this->getUserPermissionAll();
            if ($permission_all) {
                $codeArr = array();
                foreach ($permission_all as $k => $v) {
                    $codeArr[] = $v['permission_code'];
                }
                $status = in_array($permission_code, $codeArr) ? true : false;
                if($permissionCode){
                    return $status;
                }
                if ($status) {
                    $this->setStatus('access_status', 1);
                } else {
                    $this->setStatus('access_status', 0);
                }
            }
        }
        $this->setError('参数有误');
    }

    /**
     * 获取用户所有操作权限
     */
    public function getUserPermissionAll()
    {
        $data = array();
        if ($this->uid) {
            $role_info = D('User')->getUserRole($this->uid);
            if ($role_info) {
                $data = D('User')->getRolePermissionList($role_info);
                return $data;
            }
        }
        return $data;
    }

    /**
     * @param string $permissionCode
     */
    public function checkPermission($permissionCode=''){
        if($permissionCode){
            if(!$this->checkUserPermission($permissionCode)){
                $this->setError('您没有此权限');
            }
        }

    }

}