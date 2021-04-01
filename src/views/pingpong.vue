<template>
  <div>
    <div class="flex" style="justify-content: center">
      <div style="position: relative">
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
          <el-tooltip effect="dark" content="帮助" placement="top-start">
            <div class="item">
              <el-button
                type="primary"
                @click="helpDialogVisible = true"
                icon="el-icon-info"
                circle
              ></el-button>
            </div>
          </el-tooltip>
          <el-tooltip effect="dark" content="设置" placement="top-start">
            <div class="item">
              <el-button
                type="primary"
                @click="dialogVisible = true"
                icon="el-icon-setting"
                circle
              ></el-button>
            </div>
          </el-tooltip>
          <el-tooltip effect="dark" content="开始" placement="top-start">
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
        <div
          id="wrap"
          :style="{
            height: wrapHeight + 'px',
            width: setW + 'px',
            backgroundImage: showImageBg && bg2D && 'url(' + bg2D + ')',
          }"
          :class="showImageBg && 'wrap-bg'"
          v-if="testType == '2d'"
        ></div>
        <div v-else>
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
              style="width: 700px; height: 700px; transform-style: preserve-3d"
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
      <!-- <div class="flex-speed">
        <el-form label-width="80px">
          <el-form-item label="速度">
            <el-input-number
              :min="10"
              v-model="ballSpeed"
              :step="10"
            ></el-input-number>
          </el-form-item>
        </el-form>
      </div>
      <div class="flex-speed">
        <el-form label-width="150px">
          <el-form-item label="间隔时间（ms）">
            <el-input-number
              :min="300"
              v-model="textTime"
              :step="100"
            ></el-input-number>
          </el-form-item>
        </el-form>
      </div>
      <div class="flex-speed">
        <el-form label-width="150px">
          <el-form-item label="大小">
            <el-input-number
              :min="10"
              :max="100"
              v-model="ballSize"
              :step="5"
            ></el-input-number>
          </el-form-item>
        </el-form>
      </div> -->
      <div style="width: 50%">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column align="center" prop="testCount" label="当前测试数量">
          </el-table-column>
          <el-table-column align="center" prop="correct" label="正确数量">
          </el-table-column>
          <el-table-column align="center" prop="Mistake" label="错误数量">
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
    <el-dialog title="设置" width="35%" top="8vh" :visible.sync="dialogVisible">
      <el-form label-width="170px">
        <el-form-item label="切换视觉追踪训练模式">
          <el-switch
            v-model="testType"
            active-color="#13ce66"
            inactive-color="#ff4949"
            inactive-value="3d"
            active-value="2d"
            inactive-text="三维运动"
            active-text="平滑运动"
            @change="switchChange"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="速度">
          <el-input-number
            :min="10"
            v-model="ballSpeed"
            :step="10"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="间隔时间（ms）">
          <el-input-number
            :min="300"
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
        <el-form-item label="球体大小">
          <el-input-number
            :min="10"
            :max="100"
            v-model="ballSize"
            :step="5"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="测试界面大小">
          <el-input-number
            :min="400"
            :max="700"
            v-model="wrapHeight"
            :step="50"
          ></el-input-number>
        </el-form-item>
        <el-form-item
          :label="(showImageBg ? '关闭' : '加载') + '抽象模拟场景'"
          v-if="testType == '2d'"
        >
          <el-button
            size="small"
            type="primary"
            @click="showImageBg = !showImageBg"
            >{{ showImageBg ? "关闭" : "加载" }}抽象模拟场景</el-button
          >
        </el-form-item>
        <el-form-item label="更换抽象模拟场景" v-if="testType == '2d'">
          <el-upload class="upload-demo" action="#" :on-change="uploadOnChange">
            <el-button size="small" type="primary">点击选择场景图片</el-button>
          </el-upload>
        </el-form-item>
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
        <el-table-column align="center" prop="Mistake" label="错误数量">
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
    <el-dialog
      title="帮助"
      width="90%"
      :visible.sync="helpDialogVisible"
      :close-on-click-modal="false"
    >
      <div style="text-align: left">
        <h3 style="text-align: left">（ 1 ）产品介绍</h3>
        <p>
          运用视觉运动追踪的理论和原则结合计算机技术，初步设计开发“视觉运动
          追踪训练系统”。该训练系统包括 3 个模块：平滑运动视觉追踪训练、三维运动
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
          65 按键装置。分心按键设置如下：在飞行的球体上会随机呈现数字“ 0 ”或“ 1
          ”， 默认呈现时间为 500ms（可自行调节）
          ，当数字出现时要求被试尽快按下相应的按键（出现“ 0 ”请按 下“ Z或方向左
          ”键，出现“ 1 ”请按下“ M或方向右 ”键），其中飞行速度默认为 30m/s
          ，球体大小，“0”或“1”变化时间间隔，窗口大小等可调，
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
          ，当数字出现时要求被试尽快按下相应的按键（出现“ 0 ”请按 下“ Z或方向左
          ”键，出现“ 1 ”请按下“ M或方向右 ”键）。其中飞行速度默认为 30m/s
          ，球体大小，“0”或“1”变化时间间隔，窗口大小等可调，
          使用者可根据不同训练者的需要选用不同参数的视觉运动追踪训练。系统会自动记录训练者按键正确的次数和数字呈现的总次数，并显示在界面
          下方中央。
        </p>
      </div>

      <el-button
        style="margin-top: 30px"
        type="primary"
        @click="helpDialogVisible = false"
        >确 定</el-button
      >
    </el-dialog>
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
 * 生成一个随机颜色，并返回rgb字符串值
 */
function randomColor() {
  var r = randomNum(0, 255);
  var g = randomNum(0, 255);
  var b = randomNum(0, 255);
  return "rgb(" + r + "," + g + "," + b + ")";
}
export default {
  name: "pingpong",
  data() {
    return {
      ballSpeed: 30, //初始速度
      //this.获得wrapDiv
      wrapDiv: document.getElementById("wrap"),
      wrapHeight: 500, //测试界面高度
      //定义数组存储所有的小球
      balls: [],
      textArr: ["0", "1"],
      showText: "", //要展示的文本
      seletedTextShow: false, //选项是否显示
      timer: null,
      setW: window.innerWidth * 0.9,
      textTime: 500, //间隔时间
      ballSize: 40, //球的大小 px
      helpDialogVisible: false, //帮助信息
      dialogVisible: false, //是否显示设置
      rulsetShow: false, //结果显示
      testCount: 0, //测试数量
      maxTestCount: 120, //最大测试数量
      animationStop: true, //动画是否停止
      tableData: [
        //记录训练过程
        {
          testCount: 0,
          allCount: 0,
          correct: 0,
          Mistake: 0,
          nulls: 0,
        },
      ], //结果表格
      testType: "2d", //测试类型
      circles: [], //3d球数组
      context3D: null, //3d canvas 对象
      uploadImg: [],
      bg2D: "", //模拟场景背景
      showImageBg: false,
    };
  },
  mounted() {},
  methods: {
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
    switchChange() {
      this.stopTest();
    },
    randomText() {
      var isN = true;
      clearTimeout(this.timer);
      this.createdText();
      this.timer = setInterval(() => {
        //clearTimeout(timer);
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
    createdText() {
      if (this.testCount >= this.maxTestCount) {
        this.stopTest();
      } else {
        this.testCount++;
        this.tableData[0].testCount = this.testCount.toString();
        console.log(this.testCount);
        var r = randomNum(0, 1);
        if (this.testType == "2d") {
          this.wrapDiv.childNodes[0].innerText = this.textArr[r];
        } else {
          this.showText = this.textArr[r];
        }
      }
    },
    changeTextTime(type) {
      type ? (this.textTime += 100) : (this.textTime -= 100);
      // document.getElementById("textTime").innerText = textTime + "ms";
    },

    changeBallSpeed(type) {
      console.log(111, type);
      type ? this.ballSpeed++ : this.ballSpeed--;
      // document.getElementById("ballSpeed").innerText = ballSpeed * 10;
    },

    seletedText(event) {
      console.log(event.target.innerText);
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
          this.tableData[0].Mistake++;
          console.log("选错了");
        }
      } else {
        this.tableData[0].nulls++;
        console.log("选空了");
      }
    },
    //2d测试初始化
    init2D() {
      this.wrapDiv = document.getElementById("wrap");
      this.createBalls();
    },
    init() {
      this.tableData = [
        {
          testCount: 0,
          allCount: 0,
          correct: 0,
          Mistake: 0,
          nulls: 0,
        },
      ];
      this.animationStop = false;
      if (this.testType == "2d") {
        this.init2D();
      } else {
        console.log(111);
        this.create3DBall();
      }
      this.seletedTextShow = true;
      for (var i = 0; i < this.balls.length; i++) {
        //将所有的小球传到函数中,来实现对小球的移动
        this.moveBall(this.balls[i]);
      }
      this.randomText();
      this.addEventListener();
    },
    stopTest() {
      console.log("停止");
      if (this.testCount) {
        document.removeEventListener("keydown", this.eventKey);
        clearTimeout(this.timer);
        cancelAnimationFrame(this.add);
        this.animationStop = true;
        this.balls = [];
        this.tableData[0].allCount = this.testCount.toString();
        this.tableData[0].testCount = 0;
        this.testCount = 0;
        if (this.testType == "2d" && this.wrapDiv) this.wrapDiv.innerHTML = "";
        this.seletedTextShow = false;
        this.rulsetShow = true;
        this.circles = [];
        if (this.context3D) this.context3D.clearRect(-250, -250, 500, 500);
        console.log(this.tableData, "this.tableData");
      }
    },
    addEventListener() {
      document.addEventListener("keydown", this.eventKey, false);
    },
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
    create3DBall() {
      // if (!this.context3D) {
      var canvas = document.getElementById("canvas");
      this.context3D = canvas.getContext("2d");
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
          r: this.ballSize,
          xspeed: 5,
          yspeed: 5,
          zspeed: 30,
        };
        this.circles.push(obj);
      }
      this.moveBall();
    },
    draw3dBall() {
      this.context3D.clearRect(-250, -250, 500, 500);
      for (var i = 0; i < this.circles.length; i++) {
        var circle = this.circles[i];
        // circle.x += circle.xspeed;
        // if (circle.x > 250 || circle.x < -250) {
        //     circle.xspeed *= -1;
        // }
        // circle.y += circle.yspeed;
        // if (circle.y > 250 || circle.y < -250) {
        //     circle.yspeed *= -1;
        // }
        circle.z += circle.zspeed;
        if (circle.z > 1200 || circle.z < -50) {
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
          circle.r
        );
        radiusBg.addColorStop(0, "#fbf5dd");
        radiusBg.addColorStop(1, "#e4c03b");
        this.context3D.fillStyle = radiusBg;

        this.context3D.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2);
        this.context3D.fill();
        // 设置颜色
        this.context3D.fillStyle = "#000";
        this.context3D.font = "18px bold 黑体";
        this.context3D.textAlign = "center";
        this.context3D.fillText(this.showText || "", circle.x, circle.y + 15);
        this.context3D.restore();
      }
    },
    //生成小球函数
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
        ball.style.backgroundColor = randomColor();
        // ball.innerHTML = i + 1;
        //this.将小球插入当wrapDiv中
        this.wrapDiv.appendChild(ball);
        //将所有的小球存储到数组中
        this.balls.push(ball);
      }
    },
    moveBall(ballObj) {
      this.add = () => {
        if (!this.animationStop) {
          requestAnimationFrame(this.add); // 下一帧渲染之前继续执行 this.add 方法
          if (this.testType == "2d") {
            this.moveBalls(ballObj);
          } else {
            this.draw3dBall();
          }
        }
      };
      requestAnimationFrame(this.add);
    },
    //小球移动函数，判断小球的位置
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
    //碰撞函数
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
  },
};
</script>

<style>
#wrap {
  height: 600px;
  width: 90%;
  border: 1px solid rgba(216, 145, 68, 0.782);
  /*小球设置相对定位*/
  position: relative;
  margin: 0 auto;
  overflow: hidden;
  background-color: #44715a;
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
  color: white;
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
</style>
