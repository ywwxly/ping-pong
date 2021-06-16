<template>
  <div>
    <div style="position: absolute; right: 50px">Version 1.7.6</div>
    <template v-if="showInputUserName">
      <h3 style="margin: 20px 0">视觉追踪训练</h3>
      <div class="input-box">
        <div class="input-div">
          <el-form label-position="right" label-width="80px">
            <el-form-item label="训练模式">
              <div class="from-item">
                <el-radio-group v-model="testType" @change="radioChange">
                  <el-radio-button
                    :label="item.value"
                    v-for="item in typeList"
                    :key="item.value"
                    >{{ item.name }}</el-radio-button
                  >
                </el-radio-group>
              </div>
            </el-form-item>
            <el-form-item label="姓名">
              <div class="from-item" style="width: 292px">
                <el-input
                  placeholder="请输入姓名"
                  suffix-icon="el-icon-user"
                  v-model="userName"
                >
                </el-input>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="from-item">
                <el-button type="primary" @click="onSubmit">立即登入</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div></template
    >
    <template v-else>
      <div style="position: absolute; left: 50px">姓名：{{ userName }}</div>
      <h3 style="margin: 20px 0">{{ getModeString }}视觉追踪训练</h3>
      <div class="flex" style="justify-content: center">
        <div style="position: relative">
          <!-- 右侧按钮 -->
          <div
            class="flex"
            style="
              flex-direction: column;
              align-items: flex-end;
              position: absolute;
              bottom: 20px;
              right: -60px;
            "
          >
            <el-tooltip effect="dark" content="重新登入" placement="left-start">
              <div class="item">
                <el-button
                  type="primary"
                  @click="backHome"
                  icon="el-icon-refresh-right"
                  circle
                ></el-button>
              </div>
            </el-tooltip>
            <el-tooltip effect="dark" content="帮助" placement="left-start">
              <div class="item">
                <el-button
                  type="primary"
                  @click="helpDialogVisible = true"
                  icon="el-icon-info"
                  circle
                ></el-button>
              </div>
            </el-tooltip>
            <el-tooltip
              effect="dark"
              content="删除当前模式数据"
              placement="left-start"
            >
              <div class="item">
                <el-button
                  type="primary"
                  @click="deleteData"
                  icon="el-icon-delete"
                  circle
                ></el-button>
              </div>
            </el-tooltip>
            <el-tooltip
              effect="dark"
              :content="'导出' + getModeString + '训练数据'"
              placement="left-start"
            >
              <div class="item">
                <download-excel
                  class="export-excel-wrapper"
                  :data="json_data"
                  :fields="json_fields"
                  :beforeGenerate="beforeGenerate"
                  :name="
                    getModeString +
                    '模式训练数据' +
                    getNowTime('yy.mm.dd hh-MM-ss') +
                    '.xls'
                  "
                >
                  <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->

                  <el-button
                    type="primary"
                    icon="el-icon-download"
                    circle
                  ></el-button>
                </download-excel>
              </div>
            </el-tooltip>
            <el-tooltip effect="dark" content="设置" placement="left-start">
              <div class="item">
                <el-button
                  type="primary"
                  @click="dialogVisible = true"
                  icon="el-icon-setting"
                  circle
                ></el-button>
              </div>
            </el-tooltip>
            <el-tooltip
              effect="dark"
              :content="isStart ? '关闭' : '开始'"
              placement="left-start"
            >
              <div class="item">
                <el-button
                  type="primary"
                  @click="init"
                  icon="el-icon-thumb"
                  circle
                ></el-button>
              </div>
            </el-tooltip>
          </div>
          <!-- 平滑运动 -->
          <div
            id="wrap"
            :style="{
              height: wrapHeight + 'px',
              width: setW + 'px',
              backgroundImage: showImageBg ? bg2D && 'url(' + bg2D + ')' : null,
            }"
            :class="showImageBg && 'wrap-bg'"
            v-if="testType == '2d'"
          ></div>
          <!-- 抽象场景 -->
          <template v-else-if="testType == 'simulation'">
            <div
              class="box"
              :style="{
                '--scales': ballSize / 40,
                '--ballSpeed': 30 / ballSpeed + '',
              }"
            >
              <div class="container">
                <!-- <div class="floor"></div> -->
                <div class="table">
                  <!-- <div class="leg"></div>
                <div class="leg"></div>
                <div class="leg"></div>
                <div class="leg"></div> -->
                  <div class="net">
                    <div class="top"></div>
                    <div class="left"></div>
                    <div class="right"></div>
                  </div>
                  <!-- <div class="front">Table tenniCSS - @Amit_Sheen</div>
                <div class="back">Table tenniCSS - @Amit_Sheen</div> -->
                  <div class="left"></div>
                  <div class="right"></div>
                </div>
                <div class="ballWrapper" v-show="ballWrapperShow">
                  <div class="ball">
                    <span class="ball-text">{{ showText }}</span>
                  </div>
                  <div class="ballShadow"></div>
                </div>
              </div>
            </div>
          </template>
          <!-- 三维运动 -->
          <div v-else-if="testType == '3d'">
            <div
              style="
                width: 700px;
                margin: 0 auto;
                perspective: 460px;
                background-color: rgb(28, 121, 167);
              "
              :style="{
                width: wrapHeight + 'px',
                height: wrapHeight + 'px',
              }"
            >
              <div
                class="pit"
                style="
                  width: 700px;
                  height: 700px;
                  transform-style: preserve-3d;
                "
                :style="{
                  width: wrapHeight + 'px',
                  height: wrapHeight + 'px',
                }"
              >
                <div
                  style="
                    position: absolute;
                    box-shadow: 0px -15px 50px 50px rgb(0 0 0 / 30%) inset;
                    left: 0px;
                    top: 0px;
                    width: 700px;
                    height: 700px;
                    transform: translateZ(-1400px);
                  "
                  :style="{
                    width: wrapHeight + 'px',
                    height: wrapHeight + 'px',
                    transform: 'translateZ(-' + 2 * wrapHeight + 'px)',
                  }"
                  class="ball3d-bg"
                ></div>
                <div
                  style="
                    position: absolute;
                    box-shadow: -50px 0px 50px 35px rgb(0 0 0 / 30%) inset;
                    left: 0px;
                    top: 0px;
                    width: 1400px;
                    height: 700px;
                    transform-origin: 0% 50%;
                    transform: rotateY(90deg);
                  "
                  class="ball3d-bg"
                  :style="{
                    width: 2 * wrapHeight + 'px',
                    height: wrapHeight + 'px',
                  }"
                ></div>
                <div
                  style="
                    position: absolute;
                    box-shadow: 50px 0px 50px 35px rgb(0 0 0 / 30%) inset;
                    top: 0px;
                    width: 1400px;
                    height: 700px;
                    right: 0px;
                    transform-origin: 100% 50%;
                    transform: rotateY(-90deg);
                  "
                  class="ball3d-bg"
                  :style="{
                    width: 2 * wrapHeight + 'px',
                    height: wrapHeight + 'px',
                  }"
                ></div>
                <div
                  style="
                    position: absolute;
                    box-shadow: 0px -50px 50px 35px rgb(0 0 0 / 30%) inset;
                    left: 0px;
                    top: 0px;
                    width: 700px;
                    height: 1400px;
                    transform-origin: 50% 0%;
                    transform: rotateX(-90deg);
                  "
                  class="ball3d-bg"
                  :style="{
                    width: wrapHeight + 'px',
                    height: 2 * wrapHeight + 'px',
                  }"
                ></div>
                <div
                  style="
                    position: absolute;
                    box-shadow: 0px 50px 50px 35px rgb(0 0 0 / 30%) inset;
                    left: 0px;
                    width: 700px;
                    height: 1400px;
                    bottom: 0px;
                    transform-origin: 50% 100%;
                    transform: rotateX(90deg);
                  "
                  class="ball3d-bg"
                  :style="{
                    width: wrapHeight + 'px',
                    height: 2 * wrapHeight + 'px',
                  }"
                ></div>
                <canvas
                  id="canvas"
                  :height="wrapHeight + 'px'"
                  :width="wrapHeight + 'px'"
                ></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex bottom">
        <div style="width: 50%">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column
              align="center"
              prop="testCount"
              label="当前测试数量"
            >
            </el-table-column>
            <el-table-column align="center" prop="correct" label="正确数量">
            </el-table-column>
            <el-table-column align="center" prop="mistake" label="错误数量">
            </el-table-column>
            <el-table-column align="center" prop="nulls" label="选空数量">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div id="text" class="ball-text" v-show="seletedTextShow">
        <p
          v-for="(item, index) in textArr"
          :key="index"
          @click.stop="seletedText"
        >
          {{ item }}
        </p>
      </div>
      <!-- 设置 -->
      <el-dialog
        title="设置"
        width="45%"
        top="8vh"
        :visible.sync="dialogVisible"
      >
        <el-form label-width="180px">
          <el-form-item label="切换视觉追踪训练模式">
            <el-radio-group v-model="testType" @change="radioChange">
              <el-radio-button
                :label="item.value"
                v-for="item in typeList"
                :key="item.value"
                >{{ item.name }}</el-radio-button
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item label="速度" v-if="testType != '3d'">
            <el-input-number
              :min="10"
              :max="120"
              v-model="ballSpeed"
              :step="10"
            ></el-input-number>
          </el-form-item>
          <el-form-item
            :label="
              testType == '3d' ? '高低点检测时间（ms）' : '间隔时间（ms）'
            "
          >
            <el-input-number
              :min="testType == '3d' ? 100 : 300"
              :max="testType == '3d' ? 700 : 10000"
              v-model="textTime"
              :step="100"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="每组测试次数">
            <el-input-number
              :min="120"
              :max="12000"
              v-model="maxTestCount"
              :step="10"
            ></el-input-number>
          </el-form-item>
          <el-form-item
            :label="
              testType !== 'simulation'
                ? '球体大小'
                : '球体大小(整体大小将改变)'
            "
          >
            <el-input-number
              :min="10"
              :max="100"
              v-model="ballSize"
              :step="5"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="测试窗口大小" v-if="testType !== 'simulation'">
            <el-input-number
              :min="400"
              :max="700"
              v-model="wrapHeight"
              :step="50"
            ></el-input-number>
          </el-form-item>
          <!-- <el-form-item label="训练数据">
            <download-excel
              class="export-excel-wrapper"
              :data="json_data"
              :fields="json_fields"
              :beforeGenerate="beforeGenerate"
              :name="getModeString + '模式训练数据'"
            >
           

              <el-button type="primary" size="small"
                >导出{{ getModeString }}训练数据</el-button
              >
            </download-excel>
          </el-form-item> -->
          <!-- <el-form-item
          :label="(showImageBg ? '关闭' : '加载') + '抽象模拟'"
          v-if="testType == '2d'"
        >
          <el-button
            size="small"
            type="primary"
            @click="showImageBg = !showImageBg"
            >{{ showImageBg ? "关闭" : "加载" }}抽象模拟</el-button
          >
        </el-form-item>
        <el-form-item
          label="更换抽象模拟场景"
          v-if="testType == '2d' && showImageBg"
        >
          <el-upload class="upload-demo" action="#" :on-change="uploadOnChange">
            <el-button size="small" type="primary">点击选择场景图片</el-button>
          </el-upload>
        </el-form-item> -->
        </el-form>

        <el-button
          style="margin-top: 30px"
          type="primary"
          @click="dialogVisible = false"
          >确 定</el-button
        >
      </el-dialog>
      <el-dialog
        title="本次测试结果"
        width="30%"
        :visible.sync="rulsetShow"
        :close-on-click-modal="false"
      >
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column align="center" prop="allCount" label="本组总数">
          </el-table-column>
          <el-table-column align="center" prop="correct" label="正确数量">
          </el-table-column>
          <el-table-column align="center" prop="mistake" label="错误数量">
          </el-table-column>
          <el-table-column align="center" prop="nulls" label="选空数量">
          </el-table-column>
        </el-table>
        <el-button
          style="margin-top: 30px"
          type="primary"
          @click="rulsetShow = false"
          >确 定</el-button
        >
      </el-dialog>
      <el-dialog title="帮助" width="90%" :visible.sync="helpDialogVisible">
        <div style="text-align: left">
          <h3 style="text-align: left">（ 1 ）产品介绍</h3>
          <p>
            运用视觉运动追踪的理论和原则结合计算机技术，初步设计开发“视觉运动
            追踪训练系统”。该训练系统包括 3
            个模块：平滑运动视觉追踪训练、三维运动
            视觉追踪训练和抽象模拟场景视觉追踪训练。平滑运动视觉追踪训练系统不但可
            以对个体的视觉运动追踪能力进行任意时长的训练，同时为了防止训练者在训练
            过程中出现注意力不集中，系统专门设计了防止训练者分心的按键装置，同时该
            系统还可随时设置物体运动的速度和运动物体的大小，以满足不同训练者的训练
            需求；三维运动视觉追踪训练系统运用 3D
            效果制作三维球体由远及近以及由近及
            远的两段飞行视频，飞行速度可自行调节，使用者可以根据不同训练
            者的需要进行选择，用以训练个体的时空视知觉；抽象模拟场景视觉追踪训练模
            块在抽象模拟乒乓球运动场景的基础上，根据乒乓球比赛真实视频中乒乓球的飞行线路、
            落点进行抽象模拟，用于乒乓球运动的专项视觉运动追踪训练。根据练习者的不同
            训练要求可随时更改球的速度、落点、球体的大小以及训练时长，同时训练系统
            仍然提供了防止练习者分心的按键设置，并给予量化评价。
          </p>
          <h3 style="text-align: left">（ 2 ）平滑运动视觉追踪训练使用说明</h3>
          <p>
            打开“平滑运动视觉追踪训练”，使用者可根据需要按加速或减速键控制球
            的飞行速度，还可以根绝需要选择球的大小，同时系统提供了防止训练者分心的
            65 按键装置。分心按键设置如下：在飞行的球体上会随机呈现数字“ 0 ”或“
            1 ”， 默认呈现时间为 500ms（可自行调节）
            ，当数字出现时要求被试尽快按下相应的按键（出现“ 0 ”请按 下“
            Z或方向左 ”键，出现“ 1 ”请按下“ M或方向右 ”键），其中飞行速度默认为
            30m/s ，球体大小，“0”或“1”变化时间间隔，窗口大小等可调，
            使用者可根据不同训练者的需要选用不同参数的视觉运动追踪训练。系统会自动记录训练者按键正确的次数和数字呈现的总次数，并显示在界面
            下方中央。
          </p>
          <h3 style="text-align: left">（ 3 ）三维运动视觉追踪训练使用说明</h3>
          <p>
            打开“三维运动视觉追踪训练”，其中飞行速度默认为 30m/s
            ，球体大小，“0”或“1”变化时间间隔，窗口大小等可调，
            使用者可根据不同训练者的需要选用不同参数的视觉运动追踪训练。
          </p>
          <h3 style="text-align: left">
            （ 4 ）抽象模拟场景视觉追踪训练使用说明
          </h3>
          <p>
            切换“平滑运动视觉追踪训练”，点击设置按钮，加载模拟场景（可自行更换场景图片），界面默认会呈现一个抽象的模拟乒乓球场和
            位于对方底线中央的视觉追踪目标乒乓球，按下“开始”键，乒乓球将以“ 20
            ”的初
            始速度进行模拟比赛飞行，训练者以运动员的视角进行视觉运动追踪训练。界面
            底部提供可以随时调节球飞行速度、大小、落点的按键，同时系统还提供了防止
            训练者分心的按键装置和分心量化评价统计系统。分心按键设置如下：在飞行的球体上会随机呈现数字“
            0 ”或“ 1 ”， 默认呈现时间为 500ms（可自行调节）
            ，当数字出现时要求被试尽快按下相应的按键（出现“ 0 ”请按 下“
            Z或方向左 ”键，出现“ 1 ”请按下“ M或方向右 ”键）。其中飞行速度默认为
            30m/s ，球体大小，“0”或“1”变化时间间隔，窗口大小等可调，
            使用者可根据不同训练者的需要选用不同参数的视觉运动追踪训练。系统会自动记录训练者按键正确的次数和数字呈现的总次数，并显示在界面
            下方中央。
          </p>
          <h3>（5）操作说明</h3>
          <p>
            点击开始后,随机出现数字,0 ：请按 下“ Z或方向左 ”键 ; “ 1 ”：请按下“
            M或方向右
            ”键。设置：球体运动速度，数字变化时间间隔，每组测试总数，测试窗口大小等可自行调节。
            点击“关闭”自动保存本组数据。
          </p>
        </div>

        <el-button
          style="margin-top: 30px"
          type="primary"
          @click="helpDialogVisible = false"
          >确 定</el-button
        >
      </el-dialog>
    </template>
  </div>
</template>

<script>
var x1, y1, x2, y2;
/**
 * 生成并返回一个从m到n全区间的随机数
 * @param {Object} m
 * @param {Object} n
 */
function randomNum(m, n) {
  return Math.floor(Math.random() * (n - m + 1) + m);
}
/**
 * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
 *
 * @param {Function} func 要执行的回调函数
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return null
 */
var timeout = null;
function debounce(func, wait = 250, immediate = false) {
  // 清除定时器
  if (timeout !== null) clearTimeout(timeout);
  // 立即执行，此类情况一般用不到
  if (immediate) {
    var callNow = !timeout;
    timeout = setTimeout(function () {
      timeout = null;
    }, wait);
    if (callNow) typeof func === "function" && func();
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout = setTimeout(function () {
      typeof func === "function" && func();
    }, wait);
  }
}
import timeFormat from "@/util/timeFormat";
export default {
  name: "pingpong",
  data() {
    return {
      userName: "", //当前测试人员姓名
      showInputUserName: true, //输入姓名
      //this.获得wrapDiv
      wrapDiv: document.getElementById("wrap"),
      wrapHeight: 500, //测试界面高度
      //定义数组存储所有的小球
      balls: [],
      textArr: ["0", "1"],
      showText: "", //要展示的文本
      show3dSet: "", //三维位置高低点
      show3dText: "", //是否展示笑哭脸
      seletedTextShow: false, //选项是否显示
      timer: null,
      setW: window.innerWidth * 0.8,
      textTime: 500, //间隔时间
      ballSize: 40, //球的大小 px
      ballSpeed: 30, //初始速度
      helpDialogVisible: false, //帮助信息
      dialogVisible: false, //是否显示设置
      rulsetShow: false, //结果显示
      testCount: 0, //测试数量
      maxTestCount: 120, //最大测试数量
      animationStop: true, //动画是否停止
      tableData: [
        //记录训练过程
        {
          testCount: 0, //当前测试数量
          allCount: 0, //本组总数
          correct: 0, //正确数量
          mistake: 0, //错误数量
          nulls: 0, //选空数量
        },
      ], //结果表格
      testType: "2d", //测试类型
      oldTestType: "2d", //上次选择的模式
      circles: [], //3d球数组
      context3D: null, //3d canvas 对象
      uploadImg: [],
      bg2D: "", //模拟场景背景
      showImageBg: false,
      isStart: false, //是否开始
      ballWrapperShow: false, //抽象场景球体显示/隐藏
      isClickEnd: false, //当前生成是否已选择过
      //训练模式
      typeList: [
        {
          name: "平滑运动",
          value: "2d",
        },
        {
          name: "三维运动",
          value: "3d",
        },
        {
          name: "抽象模拟",
          value: "simulation",
        },
      ],
      json_fields: {
        姓名: "name", //常规字段
        "时间间隔/高低点检测时间(ms)": "textTime", //时间间隔
        球体速度: "ballSpeed",
        球体大小: "ballSize",
        本组总数: "allCount", //支持嵌套属性
        正确数量: "correct",
        错误数量: "mistake",
        选空数量: "nulls",
        时间: "time",
      },

      json_data: [],
    };
  },
  watch: {
    wrapHeight(e, oldHieght) {
      if (this.context3D) {
        console.log(this.context3D, e, oldHieght);
        this.$nextTick(() => {
          this.context3D.translate(
            this.wrapHeight / 2,
            this.wrapHeight / 2 - 50
          );
        });
      }
    },
    textTime() {
      this.randomText();
    },
    ballSpeed() {
      if (this.testType == "3d" && this.isStart) {
        this.circles = [
          {
            x: 0,
            y: 100,
            z: 50,
            // r: this.ballSize,
            xspeed: this.ballSpeed / 6,
            yspeed: this.ballSpeed / 6,
            zspeed: this.ballSpeed,
          },
        ];
      }
    },
  },
  computed: {
    getModeString() {
      return this.testType == "2d"
        ? "平滑运动"
        : this.testType == "simulation"
        ? "抽象模拟"
        : "三维运动";
    },
  },
  mounted() {
    window.onresize = () => {
      this.setW = document.body.clientWidth * 0.8;
      console.log(this.setW);
    };
  },
  methods: {
    onSubmit() {
      debounce(() => {
        if (this.userName) {
          this.showInputUserName = false;
        } else {
          this.$message({
            message: "请输入训练人员名称",
            center: true,
            type: "warning",
            duration: 1000,
            offset: 100,
          });
        }
      }, 500);
    },
    backHome() {
      location.reload();
    },
    callFile() {
      //点击添加图片按钮，触发type:"file"的input标签
      let fileDom = document.querySelector("#file");
      fileDom.click();
    },
    uploadOnChange(file) {
      // console.log(file, fileList);
      this.getPicture(file);
    },
    getPicture(e) {
      // console.log(e, "---getPicture");
      var files = e.target ? e.target.files[0] : e.raw;
      //预览图片
      let src = window.URL.createObjectURL(files);
      this.uploadImg.push(src);
      // console.log(this.uploadImg, "---this.uploadImg");
      //将图片文件转化成base64格式图片
      var reader = new FileReader();
      reader.onload = (res) => {
        // console.log(res, "---res");
        this.bg2D = res.target.result;
        //e.target.result  就是从本地读取的图片的base64格式,将它上传给服务器即可
        //使用axios的post方法上传即可
      };
      reader.readAsDataURL(files);
    },
    //模式切换响应
    radioChange(e) {
      // console.log(e, this.testType, "---radioChange");
      console.log(e, "---radioChange");
      this.oldTestType = e.toString();
      //停止当前模式，并展示结果
      this.stopTest();
    },
    // 随机生成0/1/""
    randomText() {
      var isN = true;
      clearTimeout(this.timer);
      this.createdText();
      this.timer = setInterval(() => {
        //clearTimeout(timer);
        this.isClickEnd = true; //未选择的状态值
        if (isN) {
          this.createdText();
        } else {
          if (this.testType == "2d") {
            this.wrapDiv.childNodes[0].innerText = "";
          } else {
            this.showText = "";
          }
        }
        isN = !isN;
      }, this.textTime);
    },
    //在球体上创建0/1
    createdText() {
      if (this.testCount >= this.maxTestCount) {
        this.stopTest();
      } else {
        this.testCount++;
        this.tableData[0].testCount = this.testCount.toString();
        // console.log(this.testCount);
        var r = randomNum(0, 1);
        if (this.testType == "2d") {
          this.wrapDiv.childNodes[0].innerText = this.textArr[r];
        } else {
          this.showText = this.textArr[r];
        }
      }
    },
    //改变间隔时间
    changeTextTime(type) {
      type ? (this.textTime += 100) : (this.textTime -= 100);
      // document.getElementById("textTime").innerText = textTime + "ms";
    },
    //改变球体速度
    changeBallSpeed(type) {
      console.log(111, type);
      type ? this.ballSpeed++ : this.ballSpeed--;
      // document.getElementById("ballSpeed").innerText = ballSpeed * 10;
    },
    //选择0/1
    seletedText(event) {
      // console.log(event.target.innerText, this.testType, this.show3dSet);
      if (this.isClickEnd) {
        //未选择时
        this.isClickEnd = false; //选择后的状态值
        if (this.testType == "3d") {
          let got =
            (this.show3dSet == "L" && event.target.innerText == 0) ||
            (this.show3dSet == "H" && event.target.innerText == 1);
          console.log(this.show3dSet, event.target.innerText, got);
          if (got) {
            this.show3dText = "😀";
            console.log("选对了");
            this.tableData[0].correct++;
          } else {
            this.show3dText = "☹️";
            this.tableData[0].mistake++;
            console.log("选错了");
          }
          if (!this.show3dSet) {
            this.show3dText = "☹️";
            this.tableData[0].nulls++;
            console.log("选空了");
          }
        } else {
          let showText =
            this.testType == "2d"
              ? this.wrapDiv.childNodes[0].innerText
              : this.showText;
          if (showText) {
            if (event.target.innerText == showText) {
              console.log("选对了");
              this.tableData[0].correct++;
              this.randomText();
            } else {
              this.tableData[0].mistake++;
              console.log("选错了");
            }
          } else {
            this.tableData[0].nulls++;
            console.log("选空了");
          }
        }
      }
    },
    //2d测试初始化
    init2D() {
      this.wrapDiv = document.getElementById("wrap");
      this.createBalls();
    },
    //初始化
    init() {
      if (!this.isStart) {
        this.tableData = [
          {
            testCount: 0,
            allCount: 0,
            correct: 0,
            mistake: 0,
            nulls: 0,
          },
        ];
        this.animationStop = false;
        if (this.testType == "2d") {
          this.init2D();
        } else if (this.testType == "3d") {
          //三维模式速度固定
          this.ballSpeed = 30;
          this.create3DBall();
        } else {
          this.ballWrapperShow = true;
        }
        this.seletedTextShow = true;
        for (var i = 0; i < this.balls.length; i++) {
          //将所有的小球传到函数中,来实现对小球的移动
          this.moveBall(this.balls[i]);
        }
        if (this.testType != "3d") {
          this.randomText();
        }
        this.addEventListener();
        this.isStart = true;
      } else {
        this.stopTest();
      }
    },
    //停止当前模式，并展示结果
    stopTest() {
      console.log("停止");
      if (this.isStart) {
        this.ballWrapperShow = false;
        this.isStart = false;
        document.removeEventListener("keydown", this.eventKey);
        clearTimeout(this.timer);
        cancelAnimationFrame(this.add);
        this.animationStop = true;
        this.balls = [];
        this.tableData[0].allCount = this.testCount.toString();
        this.tableData[0].testCount = 0;
        let tableData = localStorage.getItem(this.oldTestType)
          ? JSON.parse(localStorage.getItem(this.oldTestType))
          : [];
        tableData.push(
          Object.assign(
            {
              ballSize: this.ballSize,
              ballSpeed: this.ballSpeed,
              textTime: this.textTime,
              time: this.getNowTime(),
              name: this.userName,
            },
            this.tableData[0]
          )
        );
        localStorage.setItem(this.oldTestType, JSON.stringify(tableData));
        this.oldTestType = this.testType.toString();
        console.log(this.tableData, this.getNowTime(), "--this.tableData");
        this.testCount = 0;
        if (this.testType == "2d" && this.wrapDiv) this.wrapDiv.innerHTML = "";
        this.seletedTextShow = false;
        this.rulsetShow = true;
        this.circles = [];
        if (this.context3D) {
          this.context3D.clearRect(
            -this.wrapHeight / 2,
            -(this.wrapHeight / 2 - 50),
            this.wrapHeight,
            this.wrapHeight
          );
          this.context3D.translate(
            -this.wrapHeight / 2,
            -(this.wrapHeight / 2 - 50)
          );
        }

        console.log(this.tableData, "this.tableData");
      }
    },
    //监听按键事件
    addEventListener() {
      document.addEventListener("keydown", this.eventKey, false);
    },
    //按键响应函数
    eventKey(keyEvent) {
      keyEvent = keyEvent ? keyEvent : window.event;
      var keyCode =
        keyEvent.keyCode || keyEvent.which || keyEvent.charCode || keyEvent;
      console.log(keyCode, "--keyCode");
      switch (keyCode) {
        case 90: //Z
        case 37: //方向左
          this.seletedText({
            target: {
              innerText: 0,
            },
          });
          break;
        case 77: //M
        case 39: //方向右
          this.seletedText({
            target: {
              innerText: 1,
            },
          });
          break;
        default:
          break;
      }
    },
    //三维训练模式初始化
    create3DBall() {
      // if (!this.context3D) {
      var canvas = document.getElementById("canvas");
      this.context3D = canvas.getContext("2d");
      // window.context3D = this.context3D;
      this.context3D.shadowColor = "#000";
      //设置阴影水平偏移
      this.context3D.shadowOffsetX = 0;
      //设置阴影竖直偏移
      this.context3D.shadowOffsetY = 3;
      //设置阴影模糊程度
      this.context3D.shadowBlur = 5;
      this.context3D.fouse = 1000; //焦距
      // }
      this.context3D.translate(this.wrapHeight / 2, this.wrapHeight / 2 - 50);
      // this.circles = [];
      this.draw3dBall();
      for (var i = 0; i < 1; i++) {
        var obj = {
          x: 0,
          y: 100,
          z: 50,
          // r: this.ballSize,
          xspeed: this.ballSpeed / 6,
          yspeed: this.ballSpeed / 6,
          zspeed: this.ballSpeed,
        };
        this.circles.push(obj);
      }
      this.moveBall();
    },
    //三维训练模式：绘制球体
    draw3dBall() {
      this.context3D.clearRect(
        -this.wrapHeight / 2,
        -(this.wrapHeight / 2 - 50),
        this.wrapHeight,
        this.wrapHeight
      );
      for (var i = 0; i < this.circles.length; i++) {
        var circle = this.circles[i];
        circle.x += circle.xspeed;
        if (circle.x > 250 || circle.x < -250) {
          circle.xspeed *= -1;
        }
        circle.y += circle.yspeed;
        if (circle.y > 250 || circle.y < -250) {
          circle.yspeed *= -1;
        }
        circle.z += circle.zspeed;
        let oldShow3dSet = this.show3dSet;
        if (circle.z < this.textTime - 50 || circle.z > 1500 - this.textTime) {
          if (circle.z > 1500 - this.textTime) {
            //console.log(new Date().getTime());
            // console.log(circle.z, (100 + this.textTime / 10));
            //console.log("最低点");
            this.show3dSet = "L";
          }
          if (circle.z < this.textTime - 50) {
            // console.log(circle.z);
            //console.log("最高点");
            this.show3dSet = "H";
          }
        } else {
          this.show3dSet = "";
          // clearTimeout(this.timer);
          //  this.show3dText = "";
        }

        if (!this.show3dSet && oldShow3dSet) {
          // console.log(this.show3dSet, oldShow3dSet, "-----oldShow3dSet");
          if (this.testCount >= this.maxTestCount) {
            this.stopTest();
          } else {
            this.isClickEnd = true;
            this.testCount++;
            this.tableData[0].testCount = this.testCount.toString();
          }
        }

        if (circle.z > 1500 || circle.z < -50) {
          circle.zspeed *= -1;
        }
        var scale = this.context3D.fouse / (this.context3D.fouse + circle.z);
        this.context3D.save();
        this.context3D.scale(scale, scale);
        this.context3D.beginPath();

        var radiusBg = this.context3D.createRadialGradient(
          circle.x,
          circle.y,
          0,
          circle.x,
          circle.y,
          this.ballSize
        );
        radiusBg.addColorStop(0, "#fbf5dd");
        radiusBg.addColorStop(1, "#e4c03b");
        this.context3D.fillStyle = radiusBg;
        this.context3D.arc(circle.x, circle.y, this.ballSize, 0, Math.PI * 2);
        this.context3D.fill();
        // 设置颜色
        this.context3D.fillStyle = "#000";
        this.context3D.font = this.ballSize * 2 + "px" + " bold 黑体";
        this.context3D.textAlign = "center";
        this.context3D.fillText(this.show3dText, circle.x, circle.y + 30);
        this.context3D.restore();
      }
    },
    //平滑训练模式：生成小球函数
    createBalls() {
      this.wrapDiv.innerHTML = "";
      for (var i = 0; i < 1; i++) {
        var ball = document.createElement("p");
        ball.style.width = ball.style.height = this.ballSize + "px";
        ball.className = "ball-text";
        //随机小球起始的X坐标和小球的Y坐标
        ball.x = randomNum(0, this.setW);
        ball.y = randomNum(0, this.wrapHeight);
        //随机小球的移动速度
        ball.speed = this.ballSpeed / 10;
        //随机小球移动的方向
        if (Math.random() - 0.5 > 0) {
          ball.xflag = true;
        } else {
          ball.xflag = false;
        }
        if (Math.random() - 0.5 > 0) {
          ball.yflag = true;
        } else {
          ball.yflag = false;
        }
        //随机小球的背景颜色
        ball.style.backgroundColor = "#ffffff";
        // ball.innerHTML = i + 1;
        //this.将小球插入当wrapDiv中
        this.wrapDiv.appendChild(ball);
        //将所有的小球存储到数组中
        this.balls.push(ball);
      }
    },
    //平滑/三维训练模式 动画
    moveBall(ballObj) {
      //requestAnimationFrame效果
      // let diffTime = 16.7;
      // let nowTime = Date.now();
      // let lastTime = Date.now();
      this.add = () => {
        if (!this.animationStop) {
          requestAnimationFrame(this.add); // 下一帧渲染之前继续执行 this.add 方法
          //记录当前时间
          // nowTime = Date.now();
          // // 当前时间-上次执行时间如果大于diffTime，那么执行动画，并更新上次执行时间
          // if (nowTime - lastTime > diffTime) {
          //   lastTime = nowTime;
          if (this.testType == "2d") {
            this.moveBalls(ballObj);
          } else {
            this.draw3dBall();
          }
          // }
        }
      };
      requestAnimationFrame(this.add);
    },
    //平滑训练模式小球移动函数，判断小球的位置
    moveBalls(ballObj) {
      // setInterval(function () {
      ballObj.style.top = ballObj.y + "px";
      ballObj.style.left = ballObj.x + "px";
      //判断小球的标志量，对小球作出相应操作
      if (ballObj.yflag) {
        //小球向下移动
        ballObj.y += ballObj.speed;
        if (ballObj.y >= this.wrapHeight - ballObj.offsetWidth) {
          ballObj.y = this.wrapHeight - ballObj.offsetWidth;
          ballObj.yflag = false;
        }
      } else {
        //小球向上移动
        ballObj.y -= ballObj.speed;
        if (ballObj.y <= 0) {
          ballObj.y = 0;
          ballObj.yflag = true;
        }
      }
      if (ballObj.xflag) {
        //小球向右移动
        ballObj.x += ballObj.speed;
        if (ballObj.x >= this.setW - ballObj.offsetHeight) {
          ballObj.x = this.setW - ballObj.offsetHeight;
          ballObj.xflag = false;
        }
      } else {
        //小球向左移动
        ballObj.x -= ballObj.speed;
        if (ballObj.x <= 0) {
          ballObj.x = 0;
          ballObj.xflag = true;
        }
      }
      this.crash(ballObj);
      // }, 10);
    },
    //平滑训练模式碰撞函数
    crash(ballObj) {
      //通过传过来的小球对象来获取小球的X坐标和Y坐标
      x1 = ballObj.x;
      y1 = ballObj.y;
      for (var i = 0; i < this.balls.length; i++) {
        //确保不和自己对比
        if (ballObj != this.balls[i]) {
          x2 = this.balls[i].x;
          y2 = this.balls[i].y;
          //判断位置的平方和小球的圆心坐标的关系
          if (
            Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + 800 <=
            Math.pow(ballObj.offsetWidth + this.balls[i].offsetWidth, 2)
          ) {
            //判断传过来的小球对象，相对于碰撞小球的哪个方位
            if (ballObj.x < this.balls[i].x) {
              if (ballObj.y < this.balls[i].y) {
                //小球对象在被碰小球的左上角
                ballObj.yflag = false;
                ballObj.xflag = false;
              } else if (ballObj.y > this.balls[i].y) {
                //小球对象在被碰小球的左下角
                ballObj.xflag = false;
                ballObj.yflag = true;
              } else {
                //小球对象在被撞小球的正左方
                ballObj.xflag = false;
              }
            } else if (ballObj.x > this.balls[i].x) {
              if (ballObj.y < this.balls[i].y) {
                //小球对象在被碰撞小球的右上方
                ballObj.yflag = false;
                ballObj.xflag = true;
              } else if (ballObj.y > this.balls[i].y) {
                //小球对象在被碰撞小球的右下方
                ballObj.xflag = true;
                ballObj.yflag = true;
              } else {
                //小球对象在被撞小球的正右方
                ballObj.xflag = true;
              }
            } else if (ballObj.y > this.balls[i].y) {
              //小球对象在被撞小球的正下方
              ballObj.yflag = true;
            } else if (ballObj.y < this.balls[i].y) {
              //小球对象在被撞小球的正上方
              ballObj.yflag = false;
            }
          }
        }
      }
    },
    //获取当前时间
    getNowTime(format) {
      return timeFormat(Date.now(), format || "yy/mm/dd hh:MM:ss");
    },
    //删除某模式数据
    deleteData() {
      this.$confirm(
        "确定删除该" + this.getModeString + "训练模式数据?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          localStorage.removeItem(this.testType);
          this.$message({
            type: "success",
            message: "删除成功!",
            offset: 100,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
            offset: 100,
          });
        });
    },
    //点击导出表格时
    beforeGenerate() {
      let tableData = localStorage.getItem(this.testType)
        ? JSON.parse(localStorage.getItem(this.testType))
        : [];
      if (tableData.length === 0) {
        this.$message({
          message: "此训练模式暂无数据",
          center: true,
          type: "warning",
          offset: 100,
        });
      } else {
        this.json_data = tableData;
      }

      console.log(this.json_data, "---this.json_data");
    },
  },
};
</script>

<style>
.input-box {
  width: 100vw;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.input-div {
  width: 35%;
  background-color: #fafafa;
  box-shadow: 1px 1px 10px 3px #00000066;
  padding: 30px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
}
.from-item {
  display: flex;
  width: 100%;
}
#wrap {
  height: 600px;
  width: 90%;
  border: 1px solid rgba(216, 145, 68, 0.782);
  /*小球设置相对定位*/
  position: relative;
  margin: 0 auto;
  overflow: hidden;
  background-color: #0045c2;
  background-size: 100% 100%;
}
.wrap-bg {
  background-image: url(../assets/cx.png);
}
#wrap > p {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: red;
  position: absolute;
  top: 0;
  left: 0;
  color: #000000;
  font-size: 25px;
  text-align: center;
  line-height: 40px;
}

.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.ball-text {
  display: flex;
  justify-content: center;
  align-items: center;
}
.bottom {
  width: 90%;
  margin: 0 auto;
  justify-content: center;
}

.flex-speed {
  display: flex;
  /* justify-content: space-around; */
  align-items: center;
  font-size: 28px;
}

#ballSpeed {
  margin: 10px;
}

.flex-speed > button {
  /* width: 30%; */
  font-size: 28px;
  margin: 0 10px;
}

#text {
  width: 100%;
}

#text > p {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: #274b69;
  border-radius: 10px;
  color: #fff;
  margin: 0;
  padding: 0;
}
.ball3d-bg {
  background-image: url(../assets/bg.jpg);
}
.item {
  margin-top: 20px;
}
/* 抽象 */
.box {
  font-family: "Montserrat", sans-serif;
  background-color: #111;
  color: #fff;
  /* min-height: 100vh; */
  width: calc(700px * var(--scales));
  height: calc(333px * var(--scales));
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1800px;
  perspective-origin: calc(50%) calc(50%);
  overflow: hidden;
  zoom: 1;
  transform: scale(1);
}
.container {
  position: absolute;
  top: calc(46%);
  transform-style: preserve-3d;
  transform: rotateY(-90deg) rotateX(0deg) rotateZ(16deg);
}
.floor {
  position: absolute;
  width: 100vmax;
  height: 100vmax;
  background-image: radial-gradient(#000d, #0000 33%, #111 66%),
    repeating-linear-gradient(#afa3 0, transparent 1px 40px, #afa3 41px),
    repeating-linear-gradient(
      to left,
      #afa3 0,
      transparent 1px 40px,
      #afa3 41px
    );
  transform: translate(-50%, -50%) rotateX(90deg) translateZ(-180px);
}

.leg {
  position: absolute;
  transform-style: preserve-3d;
  transform: rotateX(-90deg);
  transform-origin: top;
}
.leg:nth-child(1) {
  top: 36px;
  left: 36px;
}
.leg:nth-child(2) {
  top: 36px;
  right: 36px;
}
.leg:nth-child(3) {
  top: 324px;
  left: 36px;
}
.leg:nth-child(4) {
  top: 324px;
  right: 36px;
}
.leg::after {
  content: "";
  position: absolute;
  top: 18px;
  left: -18px;
  width: 22px;
  height: 162px;
  background-image: linear-gradient(#111, #1111),
    linear-gradient(to left, #222, #777, #222);
  border-radius: 0 0 50% 50%/0 0 5px 5px;
  /* animation: rotate 80s linear infinite reverse; */
  transform: rotateY(90deg);
}

.table {
  position: absolute;
  top: calc(-180px * var(--scales));
  left: calc(-360px * var(--scales));
  height: calc(360px * var(--scales));
  width: calc(720px * var(--scales));
  background-color: #066;
  background-image: radial-gradient(#fff1, #0003),
    linear-gradient(
      to left,
      #fff 6px,
      #fff0 6px calc(100% - 6px),
      #fff calc(100% - 6px)
    ),
    linear-gradient(
      #fff 6px,
      #fff0 6px calc(50% - 3px),
      #fff calc(50% - 3px) calc(50% + 3px),
      #fff0 calc(50% + 3px) calc(100% - 6px),
      #fff calc(100% - 6px)
    );
  transform: rotateX(90deg);
  transform-style: preserve-3d;
}
.table > .net {
  position: absolute;
  width: 5%;
  height: 100%;
  left: 50%;
  transform: rotateY(-90deg);
  transform-origin: left;
  transform-style: preserve-3d;
  background-image: repeating-linear-gradient(
      45deg,
      #ababab calc(0px) 1px,
      hsla(0, 0%, 67%, 0) 1px 4px
    ),
    repeating-linear-gradient(
      135deg,
      #ababab calc(0px) 1px,
      hsla(0, 0%, 67%, 0) 1px 4px
    );
  border: 2px solid #fff;
}
.table > .net > .top {
  position: absolute;
  top: 0;
  right: -1px;
  width: 2px;
  height: 100%;
  background-color: #ddd;
  transform: rotateY(90deg);
}
.table > .net > .left {
  position: absolute;
  top: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #ccc;
  transform: rotateX(90deg);
}
.table > .net > .right {
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #ccc;
  transform: rotateX(90deg);
}
.table > .front {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 18px;
  background-color: #004d4d;
  transform: rotateX(-90deg);
  transform-origin: top;
}
.table > .back {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 18px;
  background-color: #004d4d;
  transform: rotateX(-90deg) rotateY(180deg);
  transform-origin: top;
}
.table > .front,
.table > .back {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10.8px;
  color: #fff9;
}
.table > .left {
  position: absolute;
  top: 0;
  left: 0;
  width: 18px;
  height: 100%;
  background-color: #003333;
  transform: rotateY(90deg);
  transform-origin: left;
}
.table > .right {
  position: absolute;
  top: 0;
  right: 0;
  width: 18px;
  height: 100%;
  background-color: #003333;
  transform: rotateY(-90deg);
  transform-origin: right;
}

.ballWrapper {
  position: absolute;
  bottom: 1px;
  transform-style: preserve-3d;
  /*   -webkit-animation: ballLeft 2.5s infinite cubic-bezier(0.4, 0.5, 0.6, 0.6), ballHeight 0.625s -2.1875s infinite ease-in alternate, ballZ 20s infinite cubic-bezier(0.4, 0.5, 0.6, 0.6); */
  animation: ballLeft calc(2s * var(--ballSpeed)) infinite
      cubic-bezier(0.4, 0.5, 0.6, 0.6),
    ballHeight calc(0.5s * var(--ballSpeed)) calc(-1.75s * var(--ballSpeed))
      infinite ease-in alternate,
    ballZ calc(16s * var(--ballSpeed)) infinite cubic-bezier(0.4, 0.5, 0.6, 0.6);
}
@-webkit-keyframes ballLeft {
  0%,
  100% {
    left: calc(-354.006px * var(--scales));
  }
  50% {
    left: calc(354.006px * var(--scales));
  }
}
@keyframes ballLeft {
  0%,
  100% {
    left: calc(-354.006px * var(--scales));
  }
  50% {
    left: calc(354.006px * var(--scales));
  }
}
@-webkit-keyframes ballHeight {
  0% {
    height: calc(54px * var(--scales));
  }
  100% {
    height: 0;
  }
}
@keyframes ballHeight {
  0% {
    height: calc(54px * var(--scales));
  }
  100% {
    height: 0;
  }
}
@-webkit-keyframes ballZ {
  0%,
  100% {
    transform: translateZ(var(--pos0));
  }
  6.25% {
    transform: translateZ(var(--pos1));
  }
  12.5% {
    transform: translateZ(var(--pos2));
  }
  18.75% {
    transform: translateZ(var(--pos3));
  }
  25% {
    transform: translateZ(var(--pos4));
  }
  31.25% {
    transform: translateZ(var(--pos5));
  }
  37.5% {
    transform: translateZ(var(--pos6));
  }
  43.75% {
    transform: translateZ(var(--pos7));
  }
  50% {
    transform: translateZ(var(--pos8));
  }
  56.25% {
    transform: translateZ(var(--pos9));
  }
  62.5% {
    transform: translateZ(var(--pos10));
  }
  68.75% {
    transform: translateZ(var(--pos11));
  }
  75% {
    transform: translateZ(var(--pos12));
  }
  81.25% {
    transform: translateZ(var(--pos13));
  }
  87.5% {
    transform: translateZ(var(--pos14));
  }
  93.75% {
    transform: translateZ(var(--pos15));
  }
}
@keyframes ballZ {
  0%,
  100% {
    transform: translateZ(var(--pos0));
  }
  6.25% {
    transform: translateZ(var(--pos1));
  }
  12.5% {
    transform: translateZ(var(--pos2));
  }
  18.75% {
    transform: translateZ(var(--pos3));
  }
  25% {
    transform: translateZ(var(--pos4));
  }
  31.25% {
    transform: translateZ(var(--pos5));
  }
  37.5% {
    transform: translateZ(var(--pos6));
  }
  43.75% {
    transform: translateZ(var(--pos7));
  }
  50% {
    transform: translateZ(var(--pos8));
  }
  56.25% {
    transform: translateZ(var(--pos9));
  }
  62.5% {
    transform: translateZ(var(--pos10));
  }
  68.75% {
    transform: translateZ(var(--pos11));
  }
  75% {
    transform: translateZ(var(--pos12));
  }
  81.25% {
    transform: translateZ(var(--pos13));
  }
  87.5% {
    transform: translateZ(var(--pos14));
  }
  93.75% {
    transform: translateZ(var(--pos15));
  }
}
.ballWrapper .ball {
  position: absolute;
  top: calc(-11.988px * var(--scales));
  left: calc(-5.994px * var(--scales));
  width: calc(11.988px * var(--scales));
  height: calc(11.988px * var(--scales));
  background-color: #fff;
  background-image: radial-gradient(
    circle at 50% 10%,
    #fff,
    rgb(136, 136, 136)
  );
  border-radius: 50%;
  transform: rotateY(90deg);
  text-align: center;
}
.ball-text {
  line-height: calc(11.988px * var(--scales));
  color: #000;
  font-size: 16px;
  transform: scale(0.8);
}
.ballWrapper .ballShadow {
  position: absolute;
  bottom: 0;
  left: 0;
  width: calc(35.964px * var(--scales));
  height: calc(35.964px * var(--scales));
  background-image: radial-gradient(#000, #0000 50%);
  transform: rotateX(-90deg) translateY(calc(11.988px * var(--scales)));
  /* -webkit-animation: ballShadowTransform 0.625s -2.1875s infinite ease-in alternate; */
  animation: ballShadowTransform calc(0.5s * var(--ballSpeed))
    calc(-1.75s * var(--ballSpeed)) infinite ease-in alternate;
}
@-webkit-keyframes ballShadowTransform {
  from {
    transform: translate(-50%, 50%) rotateX(90deg) scale(4);
    opacity: 0.1;
  }
  to {
    transform: translate(-50%, 50%) rotateX(90deg) scale(1);
    opacity: 0.6;
  }
}
@keyframes ballShadowTransform {
  from {
    transform: translate(-50%, 50%) rotateX(90deg) scale(4);
    opacity: 0.1;
  }
  to {
    transform: translate(-50%, 50%) rotateX(90deg) scale(1);
    opacity: 0.6;
  }
}
:root {
  --pos0: calc(35px * var(--scales));
  --pos1: calc(-80px * var(--scales));
  --pos2: calc(105px * var(--scales));
  --pos3: calc(-10px * var(--scales));
  --pos4: calc(-125px * var(--scales));
  --pos5: calc(60px * var(--scales));
  --pos6: calc(-55px * var(--scales));
  --pos7: calc(130px * var(--scales));
  --pos8: calc(15px * var(--scales));
  --pos9: calc(-100px * var(--scales));
  --pos10: calc(85px * var(--scales));
  --pos11: calc(-30px * var(--scales));
  --pos12: calc(-145px * var(--scales));
  --pos13: calc(40px * var(--scales));
  --pos14: calc(-75px * var(--scales));
  --pos15: calc(110px * var(--scales));
  --scales: 1.5;
  --ballSpeed: 1;
}
</style>