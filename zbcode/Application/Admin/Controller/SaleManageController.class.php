<?php
/**
 * Created by PhpStorm.
 * Author: Wen Bing
 * Date: 2016/1/18
 * Time: 21:21
 */

namespace Admin\Controller;


class SaleManageController extends AdminController
{
    /*****************************************
     **************表格数据读写功能区**********
     *****************************************/
    /*
    * 新建表格
    */
    public function addSignContract(){
        $post = getPostJson();
        if($post['type']){
            $where['type'] = $post['type'];
            $where['year'] = date('Y');
            $where['month'] = date('m');
            $where['status'] = 1;

            $pscd_model = M('product_sale_count_data');
            if($pscd_model->where($where)->count()){
                unset($where['status']);
                $data = $this->getTableData($where);//读取当月数据,相当于编辑当月数据。
                $this->printJson($data);//输出数据
            }else{
                //输出产品列表数据和表类型，年，月
                $this->getProductList();
                $this->printJson([null]);
            }
        }
    }
    /*
    * 添加表格数据
    */
    public function addSignContractData(){
        /*
         * 前端传递过来的数据格式
         *
         * */
//      签单和打款统计表json数据结构
        $value = [
                    'type'=>1,
                    "year"=>"2016",
                    "month"=>1,
                    "title"=> [
                                            "12月财富管理中心产品签单统计表","产品签单额（日）"
                                        ],
                    "value"=>[

                                        [
                                            null,null,01,02,03
                                        ],

                                        [
                                            10,'澜二号新三板定向投资基金',100,200,300,
                                        ],
                                        [
                                            15,'恒瑞投资基金计划',100,200,300,
                                        ],
                                ],
                ];

//      签单和打款分布统计表json数据结构
        $value = [
            'type'=>3,
            "year"=>"2016",
            "month"=>1,
            "title"=> [
                "12月产品签单分布信息表（万元）","门店","产品名称"
            ],
            "value"=>[

                [
                    null,null,"上海世纪金融广场店","上海广东路店","深圳南山店"
                ],

                [
                    10,'澜二号新三板定向投资基金',100,200,300,
                ],
                [
                    15,'恒瑞投资基金计划',100,200,300,
                ],
            ],
        ];
//      人均销售统计表json数据结构
        $value = [
            'type'=>5,
            "year"=>"2016",
            "month"=>1,
            "title"=> [
                "12月人均业绩销售统计表 （万元）","门店名称"
            ],
            "value"=>[

                [
                    null,"上海世纪金融广场店","上海广东路店","深圳南山店"
                ],

                [
                    "销售总额",100,200,300,
                ],
                [
                    "人数",100,200,300,
                ],
            ],
        ];
        $post = getPostJson();
        $data['type'] = $post['type'];
        $data['year'] = $post['year'];
        $data['month'] = $post['month'];
        $data['value'] = json_encode($post['value']);
        $data['add_time'] =date('Y-m-d H:i:s');
        $data['update_time'] =$data['add_time'];
        $pscd_model = M('product_sale_count_data');
        $pscd_model->add($data);
    }

    /*
     * 读取表格数据
     * 如果不指明具体时间，则默认读取当月的数据。
     */
    public function getTableData($param = []){
        $post = $param ? $param : getPostJson();//接收参数
        $pscd_model = M('product_sale_count_data');

        /*查询条件*/
        if($post['id']){
            $where['id'] = $post['id'];//编辑产品的时候使用
        }else{//用于读取指定类型,指定年月的数据
            if($post['type']){//如果指定表格类型
                $where['type'] = $post['type'];
                /*如果不指明具体时间，则默认读取当前年月的数据*/
                $where['year'] = $post['year'] ? $post['year'] : date('Y');
                $where['month'] = $post['month'] ? $post['month'] : date('m');
            }
        }
        $tb_data = $pscd_model->where($where)->select();//读取数据
        foreach($tb_data as &$value){
            $value['value'] = json_decode($value['value']);
        }
        //如果是内部调用，则return数据
        if($param){
            return $tb_data;
        }
        //浏览器端请求
        $this->printJson($tb_data);//输出数据
    }

    /*
    * 编辑表格数据
    */
    public function editSignContractData(){
        //前端数据结构应包含：id，
        $post = getPostJson();//接收数据
        /*id为必传参数*/
        if($post['id']){
            $where['id'] = $post['id'];
        }else{
            $this->setError('系统参数错误！');
        }
        /*如果只有id参数，没有传递value参数，则读取指定id的数据并输出*/
        if(!isset($post['value'])){
            $data = $this->getTableData($where);
            $this->printJson($data);
        }

        /*下面是数据更新逻辑*/
        $pscd_model = M('product_sale_count_data');

        $data['value'] = json_encode($post['value']);//提取要更新的值
        $update = $pscd_model->where($where)->save($data);//更新数据
        if($update){
            $table_arr = ['1'=>'产品签单统计表','2'=>'产品打款统计表','3'=>'产品签单分布统计表','4'=>'产品打款分布统计表','5'=>'产品人均销售统计表'];

            $opt_str = $this->getUname().'于'.date('Y-m-d H:i:s').'更新了'.$table_arr[$post['type']].$post['year'].'年'.$post['month'].'月的数据';
            $this->createOperationLog($opt_str);
            $this->setSuccess('数据更新成功！');
        }
        $this->setError('数据更新失败！');
    }

    /*
     *按照月份，表格类型。读取数据，供前端显示列表。从产品那里再确认一下列表需求
     */
//    public function getTableListData(){
//        $post = getPostJson();
//        if($post['type'] && $post['year'] && $post['month']) {
//            $where['type'] = $post['type'];
//            $where['year'] = $post['year'];
//            $where['month'] = $post['month'];
//        }
//        $where['status'] = 1;
//        $pscd_model = M('product_sale_count_data');
//        $data = $pscd_model->where($where)->select();
//        $this->printJson($data);
//    }

    /*
   * 生成excel报表，数据结构
   */
    public function produceExcel($condition){
        $type = $condition['type'];
        $year = $condition['year'];
        $month = $condition['month'];

        $data = $this->getTableYearMonthData($condition);
        $value = json_decode($data['value']);
        if($type == 1 || $type == 2){//register-登记的意思。
            //对value进行提取，并结合其它字段值整理出excel表格所需要的数据结构。获取可以直接利用value写出excel

        }
        if($type == 3 || $type == 4){//spread-分布的意思

        }
        if($type == 5){//sale_perform：销售业绩

        }
    }

    /*
    * 导出excel报表
    */
    public function downloadExcel(){
        $condition = getPostJson();
        $excel_data = $this->produceExcel($condition);
        //下面生成excel表格，数据处理用独立的方法

    }

    /*
     *图表所需数据。
     *
     */
    public function getPictureData(){
        /*前端传入的参数为：type，year,month
        *输出的数据为：id,type,year,month,value
        * 当type=1时，前端显示多张图。每一个门店一张图，排列出来
        * 当type=2时，前端显示一张图。各个门店当月业绩占当月总销售额的比例分布图
        * 当type=3时，各个产品的总销售额占当月总销售额的比例分布图。一张图。
        */
        //year 为四位数字，month为2位数字
        //读取所需数据，并整理出数据结构，输出到前端。
        $post = getPostJson();
        $type = $post['type'] = 3;//前端传递过来的type，表示需要那一部分数据
        if(in_array($type, [1,2,3])){
            $where['type'] = 4;
            $where['year'] = $post['year'] ? $post['year'] : date('Y');
            $where['month'] = $post['month'] ? $post['month'] : date('m');
            $where['status'] = 1;

            $pscd_model = M('product_sale_count_data');
            $data = $pscd_model->where($where)->field('id,year,month,type,value')->find();
            $value = $data['value'];
            $value = json_decode($value,1);
            $value = [
                [
                    null,null,"上海世纪金融广场店","上海广东路店","深圳南山店"
                ],

                [
                    10,'澜二号新三板定向投资基金',100,200,300,
                ],
                [
                    15,'恒瑞投资基金计划',100,200,300,
                ],
            ];


            //数据结构重构，步骤二：整出出前端需要的数据结构
            $shop_data = [];
            $product_sale = [];
            $shop_arr = [];
            $product_arr = [];
            $sale_arr = [];

            //数据结构重构，步骤一：去掉多余的数据
            foreach($value as $k => $v){
                if($k == 0){
                    foreach($v as $s){
                        if($s){
                            array_push($shop_arr, $s);
                        }
                    }
                }
                if($k > 0){
                    foreach($v as $key => $p){
                        if($key){
                            $product_sale[$k][] = $p;
                        }
                    }

                }
            }
            foreach($product_sale as $k => $v){
                $product_arr[] = array_shift($v);
                $sale_arr[] = $v;
            }

            if($type == 1){//分店各产品销售比例分配图
                $shop_data = $this->getProductSaleStruc($shop_arr, $product_arr, $sale_arr);
                $pic_data = $this->printJson($shop_data);
            }

            if($type == 2){//分店销售占比图表
                $pic_data = $this->getShopTotalSale($shop_arr, $product_arr, $product_sale);
            }
            if($type == 3){//单个产品销售占比图表
                $pic_data = $this->getProductTotalSale($product_sale);
            }
            $data['value'] = $pic_data;
            $this->printJson($data);
        }else{
            $this->setError('参数传递错误！');
        }
    }

    /*
     *生成产品销售数据结构
     */
    public function getProductSaleStruc($shop_arr = [], $product_arr = [], $sale_arr = []){
        $shop_product_sale = [];
        $product_sale_data = [];
        foreach($shop_arr as $key => $value){
            $shop_product_sale[$key]['shop'] = $value;
            $shop_product_sale[$key]['data'] = [];
            foreach($product_arr as $k => $v){
                $data['product'] = $v;
                $data['sale'] = $sale_arr[$k][$key];
                array_push($shop_product_sale[$key]['data'], $data);

            }
        }
        return $product_sale_data;
    }

    /*
     *生成各个门店月销售总额数据结构
     */
    public function getShopTotalSale($shop_arr = [], $product_arr = [], $product_sale = []){
        $p_num = count($product_arr);
        $shop_sale = [];

        foreach($shop_arr as $k => $v){
            $shop_sale[$k]['shop'] = $v;
            $shop_sale[$k]['total'] = 0;
            for($i=0; $i<$p_num; $i++){
              $shop_sale[$i]['shop'] = $shop_arr[$i];
              $shop_sale[$k]['total'] += $product_sale[$i+1][$k+1];
            }
        }

        return $shop_sale;
    }

    /*
     *生成各个产品月销售总额数据结构
     */
    public function getProductTotalSale($product_sale = []){
        foreach($product_sale as $k => $v){
            $product_total[$k]['product'] = array_shift($v);
            $product_total[$k]['total'] = array_sum($v);
        }
        return $product_total;
    }

    /*****************************************
     **************本功能模块公共代码区*******
     *****************************************/
    /*
    * 读取页面表格所需产品id和名称
    */
    public function getProductList($condition = []){
        $product_list = [];
        if($condition && is_array($condition)){
            $y_m_arr['year'] = $condition['year'];
            $y_m_arr['month'] = $condition['month'];
            $month_date = $this->getMonthStartEndDate($y_m_arr = []);
        }else{
            $month_date = $this->getMonthStartEndDate($y_m_arr = []);//获取当月月首和月尾的日期
        }


        $p_model = M('product');
        $where['online_start_time'] = ['ELT', $month_date['end'].'23:59:59'];
        $where['end_time'] = ['EGT', $month_date['begin'].'00:00:00'];
        $where['status'] = ['in', '6,7,10'];//6，10在销售的和暂下架的，7：已过期。说明:已到期的系统会有定时任务每天跑一遍。
        //读取指定年月在线或者曾经在线的产品
        $product_list = $p_model->where($where)->field('id,full_name')->select();

        if($condition){//内部请求
            return $product_list;
        }
        //发送数据
        $this->printJson($product_list);
    }

    /*
     * 生成当月的第一天和最后一天
     */
    private function getMonthStartEndDate($y_m_arr = []){
        if($y_m_arr){//返回指定年月的开始和结尾日期。
            $date['begin'] = $y_m_arr['year'].'-'.$y_m_arr['month'].'-01';
            $date['end'] = date('Y-m-d', strtotime($date['begin']." + 1 month -1 day"));
            return $date;
        }
        $begin_date=date('Y-m-01', strtotime(date("Y-m-d")));//当月第一天的日期
        $end_date = date('Y-m-d', strtotime("$begin_date +1 month -1 day"));//当月最后一天的日期
        $date['begin'] = $begin_date;
        $date['end'] = $end_date;
        return $date;
    }

    /*
   * 读取指定年月和类型的数据
   */
    public function getTableYearMonthData($condition){
        if($condition){
            $where = $condition;
        }else{
            $where = getPostJson();//前端传递过来的数据为三个值，type，year,month,或者id
        }
        $data = M('product_sale_count_data')->where($where)->find();
        if($condition){
            return $data;
        }
        $this->printJson($data);
    }
}