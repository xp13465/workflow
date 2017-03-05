<?php
/**
 * Class CommonController
 * @package Home\Controller
 */
namespace Admin\Controller;

//use Think\Build;
use Think\Controller;
use Think\Verify;
use Admin\Model\UserModel;
use Common\Lib\HTML_TO_DOC;

class CommonController extends AdminController
{

    /**
     * 登录
     */
    public function login()
    {
        if (IS_POST) {
            if ($this->_checkLogin(I('post.'))) {
                session('user', I('post.email'));
                $user_info = D('User')->getUserInfo(session('user'));
                session('user_info', $user_info);
                $this->setSuccess('登陆成功');
            } else {
                $this->setError('邮箱帐号或密码错误');
            }
        } else {

            $tpl = isMobile() ? 'login_mobile' : 'login';
            $this->display($tpl);
        }
    }

    /**
     * 登陆验证
     * @param $post
     */
    private function _checkLogin($post)
    {
        if (!$post['email'] || strlen(trim($post['email'])) < 6) {
            $this->setError('请输入正确用户名或邮箱');
        }
        if (!$post['password'] || strlen($post['password']) < 6 || strlen($post['password']) > 16) {
            $this->setError('请输入6-16位字符的密码');
        }
        $m = D('User');
        return $m->checkLogin($post);
    }

    /**
     * 注册
     */
    public function register()
    {
        if (IS_POST) {
            $post = I('post.');
            if (!$post['department_id']) {
                $this->setError('请选择部门');
            }
            if (!$post['position_id']) {
                $this->setError('请选择职位');
            }
            if (!$post['leader_id']) {
                $this->setError('请选择分管领导');
            }
            $Model = D('User');
            $create = $Model->create();
            if (!$create) {
                $this->setError($Model->getError());
            } else {
                $status = $Model->add();
                if ($status) {
                    $this->setSuccess('注册成功，请等待审核');

                } else {
                    $this->setError('注册失败，请等联系管理人员');
                }
            }

        } else {
            $tpl = isMobile() ? 'register_mobile' : 'register';
            $this->display($tpl);
        }
    }

    /**
     * @param int $email
     */
    public function isEmailUsed($email=''){
        $user_email = I('param.email') ? I('param.email') : $email;
        $where['email'] = $user_email;
        $id = D('User')->where($where)->getField('id');
        echo $id ? 1 : 0;
    }
    /**
     * 修改密码页
     */
    public function activate()
    {
        $email = I('get.email');
        $passtime = I('get.passtime');
        $Encrypter = new \Think\Crypt();
        $key = C('CRYPT_KEY');
        $email = $Encrypter->decrypt($email, $key);
        $passtime = $Encrypter->decrypt($passtime, $key);
        $jump_url = U('common/findpassword');
        $error_info = array();//定义错误信息
        $error_info['status'] = 0;
        if ($email && $passtime) {
            if (time() < $passtime) { //验证有效期
                //验证邮箱合法性
                $where = array(
                    'email' => $email,
                );
                $info = D('User')->where($where)->find();
                if ($info) {
                    if ($info['status'] == 1) {
                        $error_info['status'] = 1;
                        $error_info['email'] = $email;
                    } else {
                        $error_info['msg'] = '此帐号还未审核通过，请重新操作！';
                        //$this->setError('此帐号还未审核通过');
                    }
                } else {
                    $error_info['msg'] = '帐号不存在，请重新操作！';
                    //$this->setError('帐号不存在');
                }
            } else {
                $error_info['msg'] = '找回密码链接已过期，请重新操作！';
            }
            //$this->setError('找回密码操作已过期，请重新操作！');
        } else {
            $error_info['msg'] = '非法操作，请重新操作！';
        }

        $this->assign('error_info', $error_info);
        $this->display();
        //$this->setError('非法操作');
    }

    /**
     * 修改密码处理
     */
    public function updatePassword()
    {
        $data = I('post.');
        if ($data) {
            if (!empty($data['email']) && !empty($data['password'])) {
                $data['password'] = md5(trim($data['password']));
                $where['email'] = $data['email'];
                //D('User')->create();
                $data['update_time'] = date('Y-m-d H:i:s');
                $status = D('User')->where($where)->save($data);
                if ($status) {
                    $this->setSuccess('密码修改成功');
                } else {
                    $this->setError('密码修改失败，请重新操作');
                }
            }
        }
        $this->setError('非法操作');
    }

    /**
     * 验证码
     */
    public function verify()
    {
        $varify = new \Think\Verify();
        if(I('param.height') && I('param.width')){
            $varify->imageH = intval(I('param.height'));
            $varify->imageW = intval(I('param.width'));
            $varify->length = 3;
            $varify->useCurve = false;
            $varify->useNoise = false;
            $varify->fontSize = 12;
        }
        $varify->entry();
    }

    /**
     * 退出
     */
    public function loginOut()
    {
        session(null);
        $this->redirect('common/login');
    }

    /**
     * 部门列表
     */
    public function departmentList()
    {
        //默认所有的均为资邦财富的部门 (资邦财富 organization_id = 1)
        $where = 'organization_id = ' . C('DEFAULT_ORGANIZATION') . ' and status = 1';
        $department_id = I('param.department_id');
        //$department_id = 2;
        if(intval($department_id) > 0){
            $where .= ' and pid = ' . intval($department_id);
        }else{
            $where .= ' and pid = 0';
        }
        $data = M('department')->where($where)->select();
        $this->printJson($data);
    }

    /**
     * 部门职位
     */
    public function positionList()
    {
        $params['department_id'] = I('param.department_id');
        if (!$params['department_id']) {
            $this->setError('参数错误');
        }
        $params['status'] = 1;
        $data = M('position')->where($params)->select();
        $this->printJson($data);
    }

    /**
     * 分管领导下拉选项 取机构下的所有领导职位
     */
    public function leaderList()
    {
        $params['id'] = I('param.organization_id') ? I('param.organization_id') : C('DEFAULT_ORGANIZATION');
        if (!$params['id']) {
            $this->setError('参数错误');
        }
        //$subsql= M('position')->field('pid')->where($params)->buildSql();
        $data = M('position')->where(' if_leader = 1 and organization_id = ' . intval($params['id']))->select();
        $this->printJson($data);
    }

    /**
     * 找回密码页面
     */
    public function findPassword()
    {
        if (I('post.')) {
            if (I('post.email') && I('post.verify')) {
                $where['email'] = I('post.email');
                $info = D('User')->where($where)->find();
                if ($info) {
                    $varify = new \Think\Verify();
                    if ($varify->check(I('post.verify'))) {
                        $validity = 30 * 60;
                        $passtime = time() + $validity;
                        $Encrypter = new \Think\Crypt();
                        $key = C('CRYPT_KEY');
                        $sign = 'email=' . $Encrypter->encrypt($info['email'], $key) . '&passtime=' . $Encrypter->encrypt($passtime, $key);
                        $data = array(
                            'realname' => $info['realname'],
                            'act_url' => C('DOMAIN_HOST') . U('common/activate') . '?' . $sign,
                            'time' => time(),
                        );
                        $this->assign('data', $data);
                        $content = $this->fetch('Common:email_template');
                        $status = $this->sendMail($info['email'], '找回登陆密码-资邦云投资管理平台', $content);
                        if ($status) {
                            $this->setSuccess('邮件发送成功');
                        } else {
                            $this->setError('邮件发送失败');
                        }
                    }
                    $this->setError('验证码错误，请重新输入', 3);
                }
                $this->setError('邮箱帐号不存在，请重新输入', 2);
            }
            $this->setError('邮箱和验证码不能为空');

        } else {
            $tpl = isMobile() ? 'findPassword_mobile' : 'findPassword';
            $this->display($tpl);
        }
    }

    /**
     * 文件上传测试
     */
    public function uploadFile()
    {
        if (IS_POST) {
            //print_r($_POST);
            //$file = __ROOT__ . '/Public/UI/images/success.png';
            print_r($_FILES);
            echo '<hr/>';
            $result = fileUplode();
            print_r($result);
        } else {
            $this->display('upload');
        }
    }
    public function test(){
        $productModel = D('Product');
        //phpinfo();
        //$html2doc = new \Common\Lib\HTML_TO_DOC();
        import('\Common\Lib\HTML_TO_DOC');
        $html2doc = new HTML_TO_DOC();

        //$data[''] = $productModel->(11);

       // $this->assign('data', $data);
        $content = $this->fetch("Common:product_baseInfo");
        //$content = $this->fetch("Common:product_baseInfo");
        $html2doc->createDoc($content, ROOT_PATH.'Public/Attachment/ProductInfo/test.doc');
        //$p->initProductFeeValue(21);
//        $data = $p->getProductScoreResult(2, 2);
//       // print_r($data);
//        Vendor("PHPWord.PHPWord");
//        $PHPWord = new \PHPWord();
//        $document = $PHPWord->loadTemplate( ROOT_PATH .'Public/Attachment/Tpl/Template.docx');
//
//        $document->setValue('Value1', 'Sun');
//        $document->setValue('Value2', 'Mercury');
//        $document->setValue('Value3', 'Venus');
//        $document->setValue('Value4', 'Earth');
//        $document->setValue('Value5', 'Mars');
//        $document->setValue('Value6', 'Jupiter');
//        $document->setValue('Value7', 'Saturn');
//        $document->setValue('Value8', 'Uranus');
//        $document->setValue('Value9', 'Neptun');
//        $document->setValue('Value10', 'Pluto');
//        $document->setValue('myReplacedValue', iconv('UTF-8', 'GB2312//IGNORE','产品审核信息'));
//        $document->setValue('weekday', date('l'));
//        $document->setValue('time', date('H:i'));
//
//        $status = $document->save(iconv('UTF-8', 'GBK','产品基本信息3.docx'));
//        echo $status ? '成功' : '失败';
        //Vendor("PHPWord.IOFactory");
        //Vendor("PHPWord.Reader.Excel5");
        //echo $p->getProductScoreNum(9);
//        if(IS_POST){
//            print_r($_POST);
//        }
//        $this->display();
//        $field_id = array(2,5);
//        $field_name = array('s66','s88');
//        $cate_id = 17;
//        $time = date('Y-m-d H:i:s');
//        foreach($field_id  as $k=>$value){
//            $tmp = array(
//                'category_id' => $cate_id,
//                'field_name' => $field_name[$k],
//                'update_time'=>$time,
//            );
//            $where['id'] = $value;
//            $where['clock'] = 0;
//            $status  = M('ProductCategoryField')->where($where)->save($tmp);
//            echo $status ? '成功' : '失败';
//            echo '<br/>';
//        }
//        $aa = explode(',', 'weirwo,eri');
//        print_r($aa);
//        exit;
        $config = array (
            'host'          => '139.196.190.93',
            'port'          => 6379,
            'timeout'       => 1000,
            'persistent'    => false,
            );
        $redis = new \Redis();
        $redis->connect('139.196.190.93',6379);

        try{
            $value = 'value_'.date('Y-m-d H:i:s');
            $redis->lPush('key1',$value);
            sleep(rand()%3);
            echo $value."\n";
        }catch(Exception $e){
            echo $e->getMessage()."\n";
        }

    }
    public function test2(){
        $queue = new \Common\Lib\queue();
        $queue->setKey('product_package_queue');
        echo $queue->getTask('product_package_queue') . '<br/>';
//        $redis = new \Redis();
//        $redis->pconnect('139.196.190.93',6379);
//        try{
//            echo $redis->rPop('product_package_queue')."\n";
//        }catch(Exception $e){
//            echo $e->getMessage()."\n";
//        }
//        sleep(rand()%3);

    }
    public function test3(){
        $queue = new \Common\Lib\queue();
        $queue->setKey('product_package_queue');
        $queue->addTask(11);
//        $redis = new \Redis();
//        $redis->pconnect('139.196.190.93',6379);
//        try{
//           $redis->lPush('product_package_queue', 11);
//        }catch(Exception $e){
//            echo $e->getMessage()."\n";
//        }
//        sleep(rand()%3);

        // 建立一个指向新COM组件的索引
        $word = new \COM("word.application") or die("Can't start Word!");
// 显示目前正在使用的Word的版本号
//echo “Loading Word, v. {$word->Version}<br>”;
// 把它的可见性设置为0（假），如果要使它在最前端打开，使用1（真）
// to open the application in the forefront, use 1 (true)
//$word->Visible = 0;
        echo $word->Version;
        if(file_exists('D:/WWW/zbcode/zbcode/my.docx')){
            echo '有文件<br/>';
        }
        $word->Documents->OPen("D:/WWW/zbcode/zbcode/my.docx") or die('打开失败');
//读取文档内容
        //$test= readfile('D:/WWW/zbcode/zbcode/my.docx');//$word->ActiveDocument->content->Text;
        $test = "产品产品！！！";
        echo $test;
        echo '<br>';
//将文档中需要换的变量更换一下
//        $test=str_replace('<{变量}>','这是变量',$test);
//        echo $test;
        $word->Documents->Add();
// 在新文档中添加文字
        $word->Selection->TypeText('$test');
//把文档保存在目录中
        $word->Documents[1]->SaveAs("test2.doc");
// 关闭与COM组件之间的连接
        $word->Quit();
    }
}
