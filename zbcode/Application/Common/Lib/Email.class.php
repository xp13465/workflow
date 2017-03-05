<?php

/**
* 邮件发送类
*/

namespace Common\Lib;

require_once __DIR__ . '/Email/class.phpmailer.php';
require_once __DIR__ . '/Email/class.smtp.php';

class Email {

    /**
     * 邮件类配置
     * @var array
     */
    protected $config = array(
        'smtp_host'      => 'smtp.qq.com',  //smtp主机
        'smtp_port'      => '465',          //端口号
        'smtp_ssl'       => false,          //安全链接
        'smtp_username'  => '',             //邮箱帐号
        'smtp_password'  => '',             //邮箱密码
        'smtp_from_to'   => '',             //发件人邮箱
        'smtp_from_name' => 'email',       //发件人
    );

    /**
    * @var objcet 邮件对象
    */
   protected $mail;

    /**
     * 构建函数
     * @param array $config 邮箱配置
     */
    public function __construct( $config = array() ) {
        $this->config = array_merge($this->config, $config);
        $this->mail = new \PHPMailer();
        $this->mail->isSMTP();
        $this->mail->isHTML(true);
        $this->mail->CharSet = 'UTF-8';
        $this->mail->SMTPDebug  = 0;                     // enables SMTP debug information (for testing)
        $this->mail->SMTPAuth   = true;                  // enable SMTP authentication
        $this->mail->Host       = $this->config['smtp_host']; //smtp.exmail.qq.com// sets the SMTP server
        $this->mail->Port       = $this->config['smtp_port'];                    // set the SMTP port for the GMAIL server
        $this->mail->Username   = $this->config['smtp_username']; //"xiaowen@zillionfortune.com";//543616070@qq.com // SMTP account username
        $this->mail->Password   = $this->config['smtp_password'];//"Zibang@12";        // SMTP account password
        $this->mail->SMTPSecure = $this->config['smtp_ssl'] ? 'ssl' : '';
        //$this->mail->AddReplyTo('name@yourdomain.com', 'First Last');
        $this->mail->SetFrom($this->config['smtp_username'], $this->config['smtp_from_name']);//('xiaowen@zillionfortune.com', '资邦');
    }

   public function sendMail($tomail, $title = '邮件发送测试', $content = '您的新密码是：<br/>123456'){
       set_time_limit(10000);
       $email_list = array();
       if (is_array($tomail)){
           foreach ($tomail as $m){
               $this->mail->AddAddress($m, 'user');
           }
           $email_list = &$tomail;
       }else{
           $email_list[] = $tomail;
           $this->mail->AddAddress($tomail, 'user');
       }
       $email_list = implode(',', $email_list);
       $this->mail->Subject = $title;
//       $this->mail->AddAttachment(ROOT_PATH .'Public/UI/images/backbround_1.png', '背景图.png');//('images/phpmailer_mini.gif'); // attachment
//       $this->mail->AddAttachment(ROOT_PATH .'Public/UI/images/login_bg2.png', '登录背景图.png');
       $this->mail->MsgHTML($content);
       if($this->mail->Send()){
           return true;
       }else{
           \Think\Log::write('邮件发送错误信息：' . $this->getError() . '; 发送帐号:' . $email_list);
           return false;
       }

//       $this->mail = new \PHPMailer();
//       $this->mail->IsSMTP(); // telling the class to use SMTP
//
//       try {
//           //$this->mail->Host       = "smtp.qq.com"; // SMTP server
//           $this->mail->CharSet = 'UTF-8';
//           $this->mail->SMTPDebug  = 2;                     // enables SMTP debug information (for testing)
//           $this->mail->SMTPAuth   = true;                  // enable SMTP authentication
//           $this->mail->Host       = "smtp.exmail.qq.com"; //smtp.exmail.qq.com// sets the SMTP server
//           $this->mail->Port       = 465;                    // set the SMTP port for the GMAIL server
//           $this->mail->Username   = "xiaowen@zillionfortune.com";//543616070@qq.com // SMTP account username
//           $this->mail->Password   = "Zibang@12";        // SMTP account password
//           $this->mail->SMTPSecure = 'ssl';
//           //$this->mail->AddReplyTo('name@yourdomain.com', 'First Last');
//           $this->mail->AddAddress('543616070@qq.com');
//           $this->mail->SetFrom('xiaowen@zillionfortune.com', '资邦');
//           $this->mail->AddAddress('543616070@qq.com');
//           //$this->mail->AddReplyTo('name@yourdomain.com', 'First Last');
//           $this->mail->Subject = '邮件发送测试';
//           //$this->mail->AltBody = 'To view the message, please use an HTML compatible email viewer!'; // optional - MsgHTML will create an alternate automatically
//           //$content = preg_replace("/\/",'','您的新密码是：<br/>123456'); //对邮件内容进行必要的过滤
//           $this->mail->MsgHTML('您的新密码是：<br/>123456');
//           //$this->mail->AddAttachment('images/phpmailer.gif');      // attachment
//           //$this->mail->AddAttachment('images/phpmailer_mini.gif'); // attachment
//           if($this->mail->Send()){
//               echo "Message Sent OK</p>\n";
//           }else{
//               echo 'Message Sent failed';
//           }
//
//       } catch (phpmailerException $e) {
//           echo $e->errorMessage(); //Pretty error messages from PHPMailer
//       } catch (Exception $e) {
//           echo $e->getMessage(); //Boring error messages from anything else!
//       }
   }
    /**
     * 设置邮件附件，多个附件，调用多次
     * @access public
     * @param string $file 文件地址
     * @param string $title 文件名称
     * @return boolean
     */
    public function addAttachment($file, $title = '') {
        $status = false;
        if(file_exists($file)){
            if($title != ''){
                $file_type = getFileType($file);
                $status = $this->mail->AddAttachment($file, $title . '.' . $file_type);
            }else{
                $status = $this->mail->AddAttachment($file);
            }
        }
        return $status;
    }
    /**
     * 返回错误信息
     * @return string
     */
    public function getError(){
        return $this->mail->ErrorInfo;
    }
    /**
     * 设置抄送，多个抄送，调用多次
     * @param array $ccs 抄送地址
     * @return objcet
     */
    public function setCc($ccs) {
        if(is_array($ccs) && !empty($ccs)){
            foreach($ccs as $cc) {
                if (preg_match("/^([_a-z0-9-]+)(\.[_a-z0-9-]+)*@([a-z0-9-]+)(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/", $cc)) {
                    $this->mail->addCC($cc);
                }
            }
        }
        return $this;
    }
    /**
     * 设置秘密抄送，多个秘密抄送，调用多次
     * @param string $bcc 秘密抄送地址
     * @return objcet
     */
    public function setBcc($bccs) {
        if(is_array($bccs) && !empty($bccs)){
            foreach ($bccs as $bcc) {
                if (preg_match("/^([_a-z0-9-]+)(\.[_a-z0-9-]+)*@([a-z0-9-]+)(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/", $bcc)) {
                    $this->mail->addBCC($bcc);
                }
            }
        }
        return $this;
    }
    /**
     * 析构函数
     */
    public function __destruct(){
        $this->mail->SmtpClose();
        $this->mail = null;
    }
}