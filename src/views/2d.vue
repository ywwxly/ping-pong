<template>
  <div>
    <div id="wrap"></div>
    <div class="flex bottom">
      <div class="flex-speed">
        <button class="button button-primary" onclick="changeBallSpeed()">
          -
        </button>
        <div id="ballSpeed">{{ ballSpeed * 10 }}</div>
        <button class="button button-primary" onclick="changeBallSpeed(1)">
          +
        </button>
        <button class="button button-primary" onclick="init()">开始</button>
      </div>
      <div class="flex-speed">
        <button class="button button-primary" onclick="changeTextTime()">
          -
        </button>
        <div id="textTime">{{ textTime + "ms" }}</div>
        <button class="button button-primary" onclick="changeTextTime(1)">
          +
        </button>
      </div>
      <div id="text" class="flex"></div>
    </div>
  </div>
</template>

<script>
/**
 * 生成并返回一个从m到n全区间的随机数
 * @param {Object} m
 * @param {Object} n
 */
// function randomNum(m, n) {
//   return Math.floor(Math.random() * (n - m + 1) + m);
// }
/**
 * 生成一个随机颜色，并返回rgb字符串值
 */
// function randomColor() {
//   var r = randomNum(0, 255);
//   var g = randomNum(0, 255);
//   var b = randomNum(0, 255);
//   return "rgb(" + r + "," + g + "," + b + ")";
// }
export default {
  name: "d",
  data() {
    return {
      ballSpeed: 3, //初始速度
      //获得wrapDiv
      wrapDiv: document.getElementById("wrap"),
      //定义数组存储所有的小球
      balls: [],
      textArr: ["0", "1"],
      timer: null,
      setW: window.innerWidth * 0.9,
      textTime: 500,
    };
  },
  methods: {
    init() {
      //   createBalls();
      //   for (var i = 0; i < balls.length; i++) {
      //     //将所有的小球传到函数中,来实现对小球的移动
      //     moveBall(balls[i]);
      //   }
      //   var textEle = document.getElementById("text");
      //   textEle.innerHTML = "";
      //   for (let i = 0; i < textArr.length; i++) {
      //     var eleP = document.createElement("p");
      //     eleP.innerText = textArr[i];
      //     textEle.addEventListener("click", seletedText, false);
      //     // textEle.onclick = `seletedText('${textArr[i]}')`
      //     textEle.appendChild(eleP);
      //   }
      this.randomText();
    },
    randomText() {
      //var textTime = randomNum(3, 10);
      //   var isN = true;
      //   clearTimeout(this.timer);
      //   createdText();
      //   this.timer = setInterval(function () {
      //     //clearTimeout(timer);
      //     if (isN) {
      //       createdText();
      //     } else {
      //       wrapDiv.childNodes[0].innerText = "";
      //     }
      //     isN = !isN;
      //   }, textTime);
      //   function createdText() {
      //     var r = randomNum(0, 1);
      //     console.log(r, "---index");
      //     wrapDiv.childNodes[0].innerText = textArr[r];
      //   }
    },
  },
};
</script>

<style>
</style>
