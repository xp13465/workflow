<?php
namespace Admin\Controller;

use Think\Controller;
use Think\Vendor;

/**
 * 产品追踪控制器
 * Class PerformController
 * @package Admin\Controller
 * @author Zhou Xin
 */
Class PerformController extends  AdminController
{   
    public function index()
    {      
    }    
    
    /*产品追踪数据增加*/
    public function addOrUpdatePerform()
    {   
        /*接受type,json数组,时间参数*/
        $PerModel  = M('Perform');
        $form_data = I('param.');
        $value  = $form_data['value'];
        $type = $form_data['type'];
        $time = $form_data['time'];
        
        /*获取系统当前年月*/
        $d_time = date('Y-m-d',time());
        $d_time_month = substr($d_time,0,7);
 
        if(!empty($value) && !empty($type)){
           $data['type']  = $type;
           $data['value'] = serialize(json_decode($value));
           $data['time'] = time();
           if($time == $d_time_month){
                $data['id'] = I('post.id');
                if($PerModel->save($data)){
                    $this->setSuccess('修改成功');
                }else{
                    $this->setError('修改失败');
                }
           }else{
                if($PerModel->add($data)){
                    $this->setSuccess('添加成功');
                }else{
                    $this->setError('添加失败');
                }
           }
        }else{
           $this->setError('参数有误');
        }
     }
     
     /*根据查询条件(月)查询产品列表*/
     public function selectMonthPerform()
     {    
         $PerModel = D('Perform');
         $type = I('param.type');
         $time = I('param.time');
 
         if(!empty($time) && !empty($type))
         {
            $PerList = $PerModel->ConTimeType($time,$type);
            print_r($PerList);
         }else
         {
            $this->setError('参数有误');
         }
     }
    
     /*导出报表信息*/
     public function DaoExcel()
     {
        $PerModel       = D('Perform');
        $type           = I('param.type');
        $time           = I('param.time');
        $sub_month      = substr($time,5,7);
        if(!empty($time) && !empty($type)){
            $PerList = $PerModel->ConTimeType($time,$type);
            
            Vendor("PHPExcel");
            Vendor("PHPExcel.IOFactory");
            Vendor("PHPExcel.Reader.Excel5");
            
            $objPHPExcel = new \PHPExcel;
           
            if($type == 1){//人均销售业绩统计报表
                
                //合并cell  
                $objPHPExcel->getActiveSheet()->mergeCells('A1:H1');

                //设置一列的宽度
                $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(30);

                $objPHPExcel->getActiveSheet()->getRowDimension('1')->setRowHeight(50);

                $objPHPExcel->getActiveSheet()->getDefaultStyle('A1')->getFont()->setSize(15);

                //设置单元格背景颜色
                //$objPHPExcel->getActiveSheet()->getStyle('A1:H1')->getFill()->getStartColor()->setARGB('FF808080');
                
                //设置加粗
                $objPHPExcel->getActiveSheet()->getStyle('A1')->getFont()->setBold(true);
                $objPHPExcel->getActiveSheet()->getStyle('A2')->getFont()->setBold(true);
                $objPHPExcel->getActiveSheet()->getStyle('A3')->getFont()->setBold(true);
                $objPHPExcel->getActiveSheet()->getStyle('A4')->getFont()->setBold(true);
                $objPHPExcel->getActiveSheet()->getStyle('A5')->getFont()->setBold(true);

                //设置边框
                $objPHPExcel->getActiveSheet()->getStyle('A1:H5')->getBorders()->getAllBorders()->setBorderStyle(\PHPExcel_Style_Border::BORDER_THIN); 

                //设置水平居中
                $objPHPExcel->getActiveSheet()->getStyle('A1')->getAlignment()->setHorizontal(\PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
                $objPHPExcel->getActiveSheet()->getStyle('A1')->getAlignment()->setVertical(\PHPExcel_Style_Alignment::VERTICAL_CENTER);
                $objPHPExcel->getActiveSheet()->getStyle('A2')->getAlignment()->setHorizontal(\PHPExcel_Style_Alignment::HORIZONTAL_CENTER);  
                $objPHPExcel->getActiveSheet()->getStyle('B2')->getAlignment()->setHorizontal(\PHPExcel_Style_Alignment::HORIZONTAL_CENTER);  
                $objPHPExcel->getActiveSheet()->getStyle('C2')->getAlignment()->setHorizontal(\PHPExcel_Style_Alignment::HORIZONTAL_CENTER);  
                $objPHPExcel->getActiveSheet()->getStyle('D2')->getAlignment()->setHorizontal(\PHPExcel_Style_Alignment::HORIZONTAL_CENTER);  
                $objPHPExcel->getActiveSheet()->getStyle('E2')->getAlignment()->setHorizontal(\PHPExcel_Style_Alignment::HORIZONTAL_CENTER);  
                $objPHPExcel->getActiveSheet()->getStyle('F2')->getAlignment()->setHorizontal(\PHPExcel_Style_Alignment::HORIZONTAL_CENTER); 
                $objPHPExcel->getActiveSheet()->getStyle('G2')->getAlignment()->setHorizontal(\PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
                $objPHPExcel->getActiveSheet()->getStyle('H2')->getAlignment()->setHorizontal(\PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
                $objPHPExcel->getActiveSheet()->getStyle('A3')->getAlignment()->setHorizontal(\PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
                $objPHPExcel->getActiveSheet()->getStyle('A4')->getAlignment()->setHorizontal(\PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
                $objPHPExcel->getActiveSheet()->getStyle('A5')->getAlignment()->setHorizontal(\PHPExcel_Style_Alignment::HORIZONTAL_CENTER);

                $objPHPExcel->setActiveSheetIndex(0)
                           //设置表的名称标题
                           ->setCellValue('A1',$sub_month."月人均销售业绩统计表（万元）")
                           ->setCellValue('A2',"门店地区")
                           ->setCellValue('B2',"上海")
                           ->setCellValue('C2',"深圳")
                           ->setCellValue('D2',"成都")
                           ->setCellValue('E2',"苏州")
                           ->setCellValue('F2',"长沙")
                           ->setCellValue('G2',"南京")
                           ->setCellValue('H2',"总计")
                           ->setCellValue('A3',"销售总额")
                           ->setCellValue('A4',"在线销售人数")
                           ->setCellValue('A5',"人均销售额");

                foreach($PerList as $k => $v)
                {
                     $num=$k+3;
                     $objPHPExcel->setActiveSheetIndex(0)
                     //Excel的第A列，uid是你查出数组的键值，下面以此类推
                     ->setCellValue('P'.$num);
                }
                 //  sheet命名
                $objPHPExcel->getActiveSheet()->setTitle('业绩分类表');  

                // Set active sheet index to the first sheet, so Excel opens this as the first sheet  
                $objPHPExcel->setActiveSheetIndex(0);  
                
                // excel头参数  
                header('Content-Type: application/vnd.ms-excel'); 
                header('Content-Disposition: attachment;filename="业绩分类表('.date('Y-m-d H:i:s').').xls"');  //日期为文件名后缀  
                header('Cache-Control: max-age=0');

                $objWriter = \PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');  //excel5为xls格式，excel2007为xlsx格式  
                $objWriter->save('php://output');
            }else if($type == 2){//财富管理中心产品签单统计表
                
                //合并单元格
                $objPHPExcel->getActiveSheet()->mergeCells('A1:H1');
                $objPHPExcel->getActiveSheet()->mergeCells('A2:A3');
                $objPHPExcel->getActiveSheet()->mergeCells('B2:G2');
                
                //设置一列的宽度
                $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(30);

                $objPHPExcel->getActiveSheet()->getRowDimension('1')->setRowHeight(50);

                $objPHPExcel->getActiveSheet()->getDefaultStyle('A1')->getFont()->setSize(15);
                
                //设置加粗
                $objPHPExcel->getActiveSheet()->getStyle('A1')->getFont()->setBold(true);
                $objPHPExcel->getActiveSheet()->getStyle('A2')->getFont()->setBold(true);
                $objPHPExcel->getActiveSheet()->getStyle('A3')->getFont()->setBold(true);
                $objPHPExcel->getActiveSheet()->getStyle('A4')->getFont()->setBold(true);
                $objPHPExcel->getActiveSheet()->getStyle('A5')->getFont()->setBold(true);
                $objPHPExcel->getActiveSheet()->getStyle('A6')->getFont()->setBold(true);
                $objPHPExcel->getActiveSheet()->getStyle('A7')->getFont()->setBold(true);
                $objPHPExcel->getActiveSheet()->getStyle('A8')->getFont()->setBold(true);
                
                //设置边框
                $objPHPExcel->getActiveSheet()->getStyle('A1:H8')->getBorders()->getAllBorders()->setBorderStyle(\PHPExcel_Style_Border::BORDER_THIN);
                
                //设置水平居中
                $objPHPExcel->getActiveSheet()->getStyle('B2')->getAlignment()->setHorizontal(\PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
                $objPHPExcel->getActiveSheet()->getStyle('B3')->getAlignment()->setHorizontal(\PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
                $objPHPExcel->getActiveSheet()->getStyle('C3')->getAlignment()->setHorizontal(\PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
                $objPHPExcel->getActiveSheet()->getStyle('D3')->getAlignment()->setHorizontal(\PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
                $objPHPExcel->getActiveSheet()->getStyle('E3')->getAlignment()->setHorizontal(\PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
                $objPHPExcel->getActiveSheet()->getStyle('F3')->getAlignment()->setHorizontal(\PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
                $objPHPExcel->getActiveSheet()->getStyle('G3')->getAlignment()->setHorizontal(\PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
                $objPHPExcel->getActiveSheet()->getStyle('H3')->getAlignment()->setHorizontal(\PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
                
                for($i=1;$i<=8;$i++){
                     $objPHPExcel->getActiveSheet()->getStyle('A'.$i)->getAlignment()->setHorizontal(\PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
                }
                
                //设置垂直居中
                $objPHPExcel->getActiveSheet()->getStyle('A1')->getAlignment()->setVertical(\PHPExcel_Style_Alignment::VERTICAL_CENTER);
                $objPHPExcel->getActiveSheet()->getStyle('A2')->getAlignment()->setVertical(\PHPExcel_Style_Alignment::VERTICAL_CENTER); 
                
                $objPHPExcel->setActiveSheetIndex(0)
                //设置表的名称标题
                ->setCellValue('A1',$sub_month."月财富管理中心产品签单统计表（万元）")
                ->setCellValue('A2',"产品名称")
                ->setCellValue('B2',"产品签单额（日）")
                ->setCellValue('B3',$time."-13")
                ->setCellValue('C3',$time."-17")
                ->setCellValue('D3',$time."-19")
                ->setCellValue('E3',$time."-23")
                ->setCellValue('F3',$time."-25")
                ->setCellValue('G3',$time."-26")
                ->setCellValue('H3',$time)
                ->setCellValue('H2',$sub_month."月签单总额")
                ->setCellValue('A4',"澜贰号新三板定向投资基金")
                ->setCellValue('A5',"恒瑞投资基金计划")
                ->setCellValue('A6',"绿地九江私募债券")
                ->setCellValue('A7',"富善CTA十期")
                ->setCellValue('A8',"总和");

                foreach($PerList as $k => $v)
                {
                     $num=$k+3;
                     $objPHPExcel->setActiveSheetIndex(0)
                     //Excel的第A列，uid是你查出数组的键值，下面以此类推
                     ->setCellValue('P'.$num);
                }
                //  sheet命名
                $objPHPExcel->getActiveSheet()->setTitle('财富管理中心产品签单统计表');

                // Set active sheet index to the first sheet, so Excel opens this as the first sheet  
                $objPHPExcel->setActiveSheetIndex(0);
                
                // excel头参数
                header('Content-Type: application/vnd.ms-excel'); 
                header('Content-Disposition: attachment;filename="财富管理中心产品签单统计表('.date('Y-m-d H:i:s').').xls"');  //日期为文件名后缀  
                header('Cache-Control: max-age=0');  

                $objWriter = \PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');  //excel5为xls格式，excel2007为xlsx格式
                $objWriter->save('php://output');
            }else if($PerList['type'] == 3){//产品签单信息表
//                //合并单元格
//                $objPHPExcel->getActiveSheet()->mergeCells('A1:H1');
//                
//                 //设置一列的宽度
//                $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(30);
//
//                $objPHPExcel->getActiveSheet()->getRowDimension('1')->setRowHeight(50);
//
//                $objPHPExcel->getActiveSheet()->getDefaultStyle('A1')->getFont()->setSize(15);
//                
//                //设置加粗 
//                $objPHPExcel->getActiveSheet()->getStyle('A1')->getFont()->setBold(true);
//                $objPHPExcel->getActiveSheet()->getStyle('A2')->getFont()->setBold(true);
//                $objPHPExcel->getActiveSheet()->getStyle('A3')->getFont()->setBold(true);
//                $objPHPExcel->getActiveSheet()->getStyle('A4')->getFont()->setBold(true);
//                $objPHPExcel->getActiveSheet()->getStyle('A5')->getFont()->setBold(true);
//                $objPHPExcel->getActiveSheet()->getStyle('A6')->getFont()->setBold(true);
//                $objPHPExcel->getActiveSheet()->getStyle('A7')->getFont()->setBold(true);
//                
//                $objPHPExcel->getActiveSheet()->getStyle('A2')->getFont()->setBold(true);
//                $objPHPExcel->getActiveSheet()->getStyle('B2')->getFont()->setBold(true);
//                $objPHPExcel->getActiveSheet()->getStyle('C2')->getFont()->setBold(true);
//                $objPHPExcel->getActiveSheet()->getStyle('D2')->getFont()->setBold(true);
//                $objPHPExcel->getActiveSheet()->getStyle('E2')->getFont()->setBold(true);
//                $objPHPExcel->getActiveSheet()->getStyle('F2')->getFont()->setBold(true);
//                $objPHPExcel->getActiveSheet()->getStyle('G2')->getFont()->setBold(true);
//                $objPHPExcel->getActiveSheet()->getStyle('H2')->getFont()->setBold(true);
//                
//                //设置边框
//                $objPHPExcel->getActiveSheet()->getStyle('A1:H7')->getBorders()->getAllBorders()->setBorderStyle(\PHPExcel_Style_Border::BORDER_THIN);                 
                
            }else if($PerList['type'] == 4){
                
            }else if($PerList['type'] == 5){
                
            }else if($PerList['type'] == 6){
                
            }
        }else{
             $this->setError('参数有误');
        }
    }
}    