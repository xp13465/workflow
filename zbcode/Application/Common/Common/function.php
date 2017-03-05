<?php
/**
 * 项目公共函数库
 */
//function sendEmail($toemail, $title, $content){
//    $title = trim($title) == '' ? '资邦投资云平台' : $title;
//    $config = C('EMAIL_SERVER');
//    $Email = new \Common\Lib\Email($config);
//    $Email->setMail($title,$content);
//    $status = true;
//    if(is_array($toemail)){
//        foreach($toemail as $mail){
//            $status = $Email->sendMail($mail);
//            if($status == false){
//                //$status = false;
//                \Think\Log::write($mail . ':发送邮件失败！标题：' . $title . ', 内容：' . $content . '。【错误信息】:' . $Email->getError());
//            }
//        }
//    }else{
//        $status = $Email->sendMail($toemail);
//    }
//    return $status;
//}
/**
 * /**
 * 文件上传
 *  默认七牛云上传
 * @param $file
 * @return array
 */
function fileUplode(){
    $config = C('UPLOAD_SITEIMG_QINIU');
    $uplode = new \Think\Upload($config);
    $uplode->maxSize = 20971520;
    $info = $uplode->upload($_FILES);
    $result = array();
    if(!$info){
        $result = array('status'=>'0', 'error'=>$uplode->getError());
    }else{
        $result['status'] = 1;
        foreach($info as $k=>$value){
            $result['info'][$k]['url'] = $value['url'];
            $result['info'][$k]['type'] = $value['ext'];
            $result['info'][$k]['name'] = $_FILES[$value['key']]['name'];
        }
    }
    return $result;
}
function Qiniu_Encode($str) // URLSafeBase64Encode
{
    $find = array('+', '/');
    $replace = array('-', '_');
    return str_replace($find, $replace, base64_encode($str));
}
function Qiniu_Sign($url) {//$info里面的url
    $setting = C('UPLOAD_SITEIMG_QINIU');
    $duetime = NOW_TIME + 86400;//下载凭证有效时间
    $DownloadUrl = $url . '?e=' . $duetime;
    $Sign = hash_hmac( 'sha1', $DownloadUrl, $setting["driverConfig"]["secretKey"], true );
    $EncodedSign = Qiniu_Encode ($Sign);
    $Token = $setting ["driverConfig"] ["accessKey"] . ':' . $EncodedSign;
    $RealDownloadUrl = $DownloadUrl . '&token=' . $Token;
    return $RealDownloadUrl;
}
function showMessage($type = 1){
   $message = C('MESSAGE_TYPE');
    if(isset($message[$type])){
        return $message[$type];
    }
    return;
}
// utf8 解决反序列化数据时 返回的false问题
function mb_unserialize($serial_str) {
    $serial_str= preg_replace('!s:(\d+):"(.*?)";!se', "'s:'.strlen('$2').':\"$2\";'", $serial_str );
    $serial_str= str_replace("\r", "", $serial_str);
    return unserialize($serial_str);
}
/**
 * 获取文件扩展名
 * @param string $filename 文件名称
 * @return string 文件类型
 */
function getFileType($filename) {
    $info = pathinfo($filename);
    return strtolower($info['extension']);
}
/**
 * 获取文件名称
 * @param $filename $filename 文件名称
 * @return mixed
 */
function getFileName($filename){
    $arr = explode('.', $filename);
    return $arr[0];
}
function getStatusName($status = 0){
    $statusArr = array(
        1 => '启用',
        2 => '禁用',
        3 => '注销',
    );
    if($status){
        return $statusArr[$status];
    }else{
        return $statusArr;
    }
}

/**
 * 生成树形结构
 * @param array $arr 数组
 * @param int $id 父级ID 0为从最顶级开始
 * @param string $key 关联ID
 * @param string $pkey 父级ID
 * @param string $child 子级key
 * @return array
 */
function GetTree($arr, $id = 0, $key='id', $pkey = 'pid', $child='child'){
    $data = array();
    foreach($arr as $k=>$v){
        if($v[$pkey] == $id){
            $v[$child] = GetTree($arr, $v[$key]);
            if(empty($v[$child])){
                unset($v[$child]);
            }
            $data[] = $v;
        }
    }
    return $data;
}

/**
 * 获取并解析前端传过来的json数据
 * return array $data
 */
function getPostJson(){
    $json = trim(trim(file_get_contents("php://input")), ',');
    $data = json_decode($json, true);
    return $data;
}
function check_int($id){
    if(empty($id)){
        return false;
    }else{
        if(preg_match("/^[1-9]\d*$/", $id))
        {
            return true;
        }else{
            return false;
        }
    }
}

/**
 * 部门对应的合同来源 默认返回允许上传合同的部门ID 数组
 * @param int $dp
 * @return array
 */
function ContractDepartment($dp = 0){
    $dpArr = array(
        55 => 1, //来源产品部
        57 => 2,//来源法务部
    );
    if(in_array($dp, array_keys($dpArr))){
        return $dpArr[$dp];
    }
    return array_keys($dpArr);
}
function isMobile(){
    $useragent=isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '';
    $useragent_commentsblock=preg_match('|\(.*?\)|',$useragent,$matches)>0?$matches[0]:'';

    $mobile_os_list=array('Google Wireless Transcoder','Windows CE','WindowsCE','Symbian','Android','armv6l','armv5','Mobile','CentOS','mowser','AvantGo','Opera Mobi','J2ME/MIDP','Smartphone','Go.Web','Palm','iPAQ');
    $mobile_token_list=array('Profile/MIDP','Configuration/CLDC-','160×160','176×220','240×240','240×320','320×240','UP.Browser','UP.Link','SymbianOS','PalmOS','PocketPC','SonyEricsson','Nokia','BlackBerry','Vodafone','BenQ','Novarra-Vision','Iris','NetFront','HTC_','Xda_','SAMSUNG-SGH','Wapaka','DoCoMo','iPhone','iPod');

    $found_mobile=CheckSubstrs($mobile_os_list,$useragent_commentsblock) ||
        CheckSubstrs($mobile_token_list,$useragent);

    if ($found_mobile){
        return true;
    }else{
        return false;
    }
}
function CheckSubstrs($substrs,$text){
    foreach($substrs as $substr)
        if(false!==strpos($text,$substr)){
            return true;
        }
    return false;
}


