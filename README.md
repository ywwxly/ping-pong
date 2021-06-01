# ping-pong

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 2021.04.01

1. 初版完成，视觉运动追踪训练

    - 打开“平滑运动视觉追踪训练”，使用者可根据需要按加速或减速键控制球
          的飞行速度，还可以根绝需要选择球的大小，同时系统提供了防止训练者分心的
          65 按键装置。分心按键设置如下：在飞行的球体上会随机呈现数字“ 0 ”或“ 1
          ”， 默认呈现时间为 500ms（可自行调节）
          ，当数字出现时要求被试尽快按下相应的按键（出现“ 0 ”请按 下“ Z或方向左
          ”键，出现“ 1 ”请按下“ M或方向右 ”键），其中飞行速度默认为 30m/s
          ，球体大小，“0”或“1”变化时间间隔，窗口大小等可调，
          使用者可根据不同训练者的需要选用不同参数的视觉运动追踪训练。系统会自动记录训练者按键正确的次数和数字呈现的总次数，并显示在界面
          下方中央。
    - 可切换3d或2d
    - electron 打包成exe文件夹 > Inno Setup 打包成exe安装文件

### 2021.04.02

1. 修复可连续开始的bug

2. 优化UI

3. 修复3d调节窗口大小后，球体位置错乱的bug

4. 优化3d界面，调节球体大小，间隔时间可实时更新。

### 2021.05.25

1. 新增抽象模拟模式

2. 优化UI体验

3. 添加按键防抖功能

4. 去除防抖功能，改为每次生成0/1，只能选择一次

5. 添加部分注释

6. 调整平滑训练模式UI

7. 增加导出当前模式数据表格/删除功能

8. 增加登录页面

9. 调整/优化UI

10. 优化导出文件名称

### 2021.06.01

1. 优化模拟场景效果
