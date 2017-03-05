<?php
/**
 * Class CommonController
 * @package Home\Controller
 */
namespace Workflow\Controller;

use Think\Controller;

/**
 * 前台公共控制器
 * Class AdminController
 * @package Admin\Controller
 */
class WorkflowController extends Controller
{
	public $mid;
    public $uid;
	public function __construct(){
        header("Content-type:text/html;charset=utf-8");
        parent::__construct();
		$user = session('user_info');
        $this->uid = $user['id'];
        $this->mid = $user['id'];
		if(empty($user)){
			$this->redirect('Admin/common/login');
		}
		// if(!in_array(CONTROLLER_NAME,array("Index","Access","Tjotcapi"))){
			// $Permission_code =(MODULE_NAME  ."-".CONTROLLER_NAME   ."-".ACTION_NAME )  ;
			// if(C('URL_CASE_INSENSITIVE')== true){
				// $Permission_code =strtolower($Permission_code);
			// }
			// if(D('User')->checkPermission($Permission_code)==false){
				// echo $this->setError('没有该功能的访问权限');
			// }
		 // }
		// $this->mid = $user['id'];
	}
	
	
	/*以下三个函数 设置 返回数据格式*/
    protected function setSuccess($msg)
    {
        $this->data = array('status' => 1, 'msg' => $msg);
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
}

?>