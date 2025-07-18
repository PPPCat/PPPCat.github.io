# CSS

## flx

#### flex布局常见使用场景

![image-20250717204343847](C:\Users\player\AppData\Roaming\Typora\typora-user-images\image-20250717204343847.png)

#### 实现flex布局排版知识点详解

```css
.container{
    //设置容器为flex布局
    display:flex;
}
```

flex排版方式为水平方向和垂直方向，一般默认设置主轴方向为水平方向，交叉轴设置为垂直方向

```css
.container{
    flex-direction(主轴方向):row(默认)、row-reverse、column、column-reverse;
}
```

调整元素主轴水平方向的排列方式

```javascript
.container{
    justify-content(主轴排列方向):flex-start(从左到右)、flex-end(从右到左)、center、space-between(左右靠边，项目之间均匀分布剩余空间)space-around(项目之间均匀分布剩余空间)baseline(第一行文本的基线对齐);
}
```

交叉轴排列方式

```css
.container{
    align-items(垂直轴排列方式):stretch(默认，前提是Flex项目未设置高度)flex-start、flex-end、center、baseline(第一行文本的基线对齐);
}
```

多行元素的垂直方向排版

```css
.container{
    align-contents(多行垂直轴排列方式):stretch(默认，前提是FLex项目未设置高度)flex-start、flex-end、center、space-between、space-around(上下对齐，间距相等);
}
```

#### 手动实现flex布局

还原常见布局图

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      /*2.给容器设置默认样式*/
      .container {
        width: 1000px;
        height: 1000px;
        background-color: aquamarine;
        padding-left: 15px;

        /* 5.开启flex */
        display: flex;

        /* 6.给盒子设置间距 */
        gap: 15px;

        /* 7.盒子拥挤,设置换行方式  */
        flex-wrap: wrap;

        /* 8.两行间距太大，设置多行交叉轴排列方式 */
        align-content: flex-start;

        /* 9.让盒子居中排列 */
        align-content: center;
      }
      /*4.给内容盒子设置默认样式*/
      .box {
        width: 150px;
        height: 200px;
        background-color: antiquewhite;
        border-radius: 12px;
      }
      /* 10.定义内容区域样式 */
      .box .img {
        width: 100%;
        height: 135px;
        background-color: cadetblue;
      }
      .box .title {
        font-size: 28px;
      }
    </style>
  </head>
  <body>
    <!--1.定义容器-->
    <div class="container">
      <div class="box">
        <div class="img"></div>
        <div class="title">标题</div>
        <div class="subTitle">副标题</div>
      </div>
      <!--3定义内容盒子-->
      <div class="box">im box</div>
      <div class="box">im box</div>
      <div class="box">im box</div>
      <div class="box">im box</div>
      <div class="box">im box</div>

      <!-- 7.设置第二行盒子 -->
      <div class="box">im box</div>
      <div class="box">im box</div>
      <div class="box">im box</div>
      <div class="box">im box</div>
      <div class="box">im box</div>
      <div class="box">im box</div>

      <div class="box">im box</div>
    </div>
  </body>
</html>
```

