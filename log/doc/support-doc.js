环境
1. 基于ES6代码构造，加入了flow静态检测环境
2. 基于webpack开发环境，基于rollup发布打包
3. 编写了全套基于node的build，开发、调试、压缩、发布

核心：
1. 采用ES6编写，加入了eslint检测与flow静态语法规则
2. 面向OOP设计，继承、封装、多态大量实现
3. 引入了场景的概念，按场景与容器分层处理
4.

多媒体
1. 音频自适应适配设备(5种)
2. 视频自适应适配设备(3种)
3. 修复音频在移动端不能自动播放的问题

动画类
1. 2D普通精灵动画
2. 2.5D高级精灵动画
3. PPT动画（56种）
4. 页面零件动画
5. iframe零件动画（81种）

事件类
事件分为2大块
  全局事件，又全局控制并且委派，主要控制翻页，与用户的组要行为
  独立事件，作用于每个独立的对象上
    1. 普通tap与click事件
    2. 对象拖动与拖拽
    3. 多种hammer.js支持的事件(14种)

content对象保持4种缩放比值
1. 自适应屏幕100%
2. 强制按照正比缩放，保持横纵比
3. 页眉页脚对象溢出后抛弃
4. 模式3的情况下，溢出宽度，强制改成非溢出处理

支持2种页面缩放
1. page页面级缩放
2. 图片放大后并缩放

图片后缀
1. mini平台下支持高清与普通，3种图片后缀处理
2. 高压缩模式处理
