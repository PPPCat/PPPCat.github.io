# CSS

## 盒模型

#### 什么是CSS 盒模型

页面布局中，一个元素的外边距（margin）、 边框（border）、内边距（padding）、内容（content）组成一个盒模型。盒模型可分为**标准盒模型** 和 **代替（IE）盒模型**



#### 标准盒模型

在标准模型中，如果你给盒设置 `width` 和 `height`，实际设置的是内容区域( *content box*)的宽高。 `padding` 和 `border` 再加上设置的宽高一起决定整个盒子的大小

```css
 .box {
  width: 100px;
  height: 50px;
  margin: 10px;
  padding: 25px;
  border: 5px solid black;
}
```

如果使用标准模型，元素总宽度 = 160px （100+25+25+5+5），总高度 = 110px (50 + 25 + 25 + 5 + 5)，即内容区域`content box`加 `padding` 和 `border`

**注**: margin 不计入实际大小 —— 当然，它会影响盒子在页面所占空间，但是影响的是盒子外部空间。



#### 代替（IE）盒模型

你可能会认为盒子的大小还要加上边框和内边距，这样很麻烦。 因为这个原因，css还有一个替代盒模型。使用这个模型，所有宽度都是可见宽度，所以内容宽度是该宽度减去边框和填充部分。使用上面相同的样式得到总宽高是 width = 100px, height = 50px。

默认浏览器会使用标准模型。如果需要使用替代模型，您可以通过为其设置 `box-sizing: border-box` 来实现。 这样就可以告诉浏览器使用 `border-box` 来定义区域，从而设定您想要的大小

```css
.box { 
  box-sizing: border-box; 
} 
```

#### box-sizing属性

CSS中的 **`box-sizing`** 属性用于告诉浏览器如何计算一个元素是总宽度和总高度

在 [CSS盒子模型 (opens new window)](https://developer.mozilla.org/zh-CN/docs/CSS/Box_model)的默认定义里，你对一个元素所设置的 [`width` (opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/width)与 [`height` (opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/height)只会应用到这个元素的内容区。如果这个元素有任何的 [`border` (opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border)或 [`padding` (opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding)，绘制到屏幕上时的盒子宽度和高度会加上设置的边框和内边距值。这意味着当你调整一个元素的宽度和高度时需要时刻注意到这个元素的边框和内边距。当我们实现响应式布局时，这个特点尤其烦人。

box-sizing 属性可以被用来调整这些表现:

- `content-box` 是默认值。如果你设置一个元素的宽为100px，那么这个元素的内容区会有100px 宽，并且任何边框和内边距的宽度都会被增加到最后绘制出来的元素宽度中。

  - 尺寸计算公式：

    `width` = 内容的宽度

    `height` = 内容的高度

- `border-box` 告诉浏览器：你想要设置的边框和内边距的值是包含在width内的。也就是说，如果你将一个元素的width设为100px，那么这100px会包含它的border和padding，内容区的实际宽度是width减去(border + padding)的值。大多数情况下，这使得我们更容易地设定一个元素的宽高。

  - 尺寸计算公式：

    *`width` = border + padding + 内容的宽度*

    *`height` = border + padding + 内容的高度*



## position

position 属性指定了元素的定位类型。

position 属性的五个值：

- [static](https://www.runoob.com/css/css-positioning.html#position-static)
- [relative](https://www.runoob.com/css/css-positioning.html#position-relative)
- [fixed](https://www.runoob.com/css/css-positioning.html#position-fixed)
- [absolute](https://www.runoob.com/css/css-positioning.html#position-absolute)
- [sticky](https://www.runoob.com/css/css-positioning.html#position-sticky)

元素可以使用的`top`顶部，`bottom`底部，`left`左侧和`right`右侧属性定位。然而，这些属性无法工作，除非事先设定position属性。他们也有不同的工作方式，这取决于定位方法。



#### static定位

HTML 元素的默认值，即没有定位，遵循正常的文档流对象。

静态定位的元素不会受到 top, bottom, left, right影响

```css
div.static {
    position: static;
    border: 3px solid #73AD21;
}
```



#### fixed 定位

元素的位置相对于浏览器窗口是固定位置。

即使窗口是滚动的它也不会移动

```css
p.pos_fixed
{
    position:fixed;
    top:30px;
    right:5px;
}
```

**注意：** Fixed 定位在 IE7 和 IE8 下需要描述 !DOCTYPE 才能支持。

Fixed定位使元素的位置与文档流无关，因此不占据空间。

Fixed定位的元素和其他元素重叠。



#### relative 定位

相对定位元素的定位是相对其正常位置

```css
h2.pos_left
{
    position:relative;
    left:-20px;
}
h2.pos_right
{
    position:relative;
    left:20px;
}
```

移动相对定位元素，但它原本所占的空间不会改变

```css
h2.pos_top
{
    position:relative;
    top:-50px;
}
```

相对定位元素经常被用来作为绝对定位元素的容器块



#### absolute 定位

绝对定位的元素的位置相对于最近的已定位父元素，如果元素没有已定位的父元素，那么它的位置相对于根元素<html>

```css
h2
{
    position:absolute;
    left:100px;
    top:150px;
}
```

absolute 定位使元素的位置与文档流无关，因此不占据空间。

absolute 定位的元素和其他元素重叠。

absolute 如果没有指定top等属性的值则不改变位置，绝对定位必须指定位置

#### sticky 定位

sticky 英文字面意思是粘，粘贴，所以可以把它称之为粘性定位。

**position: sticky;** 基于用户的滚动位置来定位。

粘性定位的元素是依赖于用户的滚动，在 **position:relative** 与 **position:fixed** 定位之间切换。

它的行为就像 **position:relative;** 而当页面滚动超出目标区域时，它的表现就像 **position:fixed;**，它会固定在目标位置。

元素定位表现为在跨越特定阈值前为相对定位，之后为固定定位。

这个特定阈值指的是 top, right, bottom 或 left 之一，换言之，指定 top, right, bottom 或 left 四个阈值其中之一，才可使粘性定位生效。否则其行为与相对定位相同。

**注意:** Internet Explorer, Edge 15 及更早 IE 版本不支持 sticky 定位。 Safari 需要使用 -webkit- prefix 

```css
div.sticky {
    position: -webkit-sticky; /* Safari */
    position: sticky;
    top: 0;
    background-color: green;
    border: 2px solid #4CAF50;
}
```



#### 重叠的元素

元素的定位与文档流无关，所以它们可以覆盖页面上的其它元素

z-index属性指定了一个元素的堆叠顺序（哪个元素应该放在前面，或后面）

一个元素可以有正数或负数的堆叠顺序

```css
img
{
    position:absolute;
    left:0px;
    top:0px;
    z-index:-1;
}
```

具有更高堆叠顺序的元素总是在较低的堆叠顺序元素的前面。

**注意：** 如果两个定位元素重叠，没有指定z - index，最后定位在HTML代码中的元素将被显示在最前面



## float

#### 属性定义及使用说明

float属性指定一个盒子（元素）是否应该浮动。

**注意：** 绝对定位的元素忽略float属性！

| 默认值：          | none                           |
| :---------------- | ------------------------------ |
| 继承：            | no                             |
| 版本：            | CSS1                           |
| JavaScript 语法： | *object*.style.cssFloat="left" |

#### 属性值

| 值      | 描述                                                 |
| :------ | :--------------------------------------------------- |
| left    | 元素向左浮动。                                       |
| right   | 元素向右浮动。                                       |
| none    | 默认值。元素不浮动，并会显示在其在文本中出现的位置。 |
| inherit | 规定应该从父元素继承 float 属性的值。                |



## flex

### flex布局体验

#### flex布局常见使用场景

![image-20250717204343847](C:\Users\player\AppData\Roaming\Typora\typora-user-images\image-20250717204343847.png)



#### 传统布局与flex布局

**传统布局**

- 兼容性好
- 布局繁琐
- 局限性

**flex弹性布局**

- 操作方便，布局极为简单，移动端应用广泛
- PC浏览器支持情况差
- IE11或更低版本，不支持或仅部分支持

**建议：**

1. PC端页面布局使用传统布局
2. 移动端或者不考虑兼容性问题的PC端页面布局使用flex布局

### flex布局原理

#### 基本概念

flex 是flexible Box的缩写，意为“弹性布局”，用来为和模型提供最大的灵活性

- 设为 Flex 布局以后，子元素的`float`、`clear`和`vertical-align`属性将失效。

- 伸缩布局=弹性布局=伸缩盒布局=弹性盒布局=flex布局

采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"

![bg2015071004](D:\PPPcat\PPPCat.github.io\src\img\bg2015071004.png)

容器默认存在两根轴：水平的主轴（或x轴）（main axis）和垂直的交叉轴（或y轴）（cross axis）。主轴的开始位置（与边框的交叉点）叫做`main start`，结束位置叫做`main end`；交叉轴的开始位置叫做`cross start`，结束位置叫做`cross end`

项目默认沿主轴排列。单个项目占据的主轴空间叫做`main size`，占据的交叉轴空间叫做`cross size`

任何容器都可以指定为flex布局

```css
.box{
  display: flex;
}
```

行内元素也可以使用flex布局

```css
.box{
  display: inline-flex;
}
```

Webkit内核的浏览器，必须加上 -webkit前缀

```css
.box{
  display: -webkit-flex; /* Safari */
  display: flex;
}
```



#### 容器属性

```css
.container{
    //设置容器为flex布局
    display:flex;
}
```

###### flex-direction

flex排版方式为水平方向和垂直方向，一般默认设置主轴方向为水平方向，交叉轴设置为垂直方向

```css
.container{
    flex-direction(主轴方向):row(默认)、row-reverse、column、column-reverse;
}
```

###### flex-wrap

默认情况下，项目都排在一条线（又称"轴线"）上。`flex-wrap`属性定义，如果一条轴线排不下，如何换行

```css
.box{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

nowrap：不换行，压缩item宽度

wrap：换行，第一行在上方

wrap-reverse：换行，第一行在下方

###### flex-flow

`flex-flow`属性是`flex-direction`属性和`flex-wrap`属性的简写形式，默认值为`row nowrap`。

```css
.box {
  flex-flow: <flex-direction> || <flex-wrap>;
}
```



###### justify-content

调整元素主轴水平方向的排列方式

```javascript
.container{
    justify-content(主轴排列方向):flex-start(从左到右)、flex-end(从右到左)、center、space-between(左右靠边，项目之间均匀分布剩余空间)space-around(项目之间均匀分布剩余空间)baseline(第一行文本的基线对齐);
}
```

###### align-items

交叉轴排列方式

```css
.container{
    align-items(垂直轴排列方式):stretch(默认，前提是Flex项目未设置高度)flex-start、flex-end、center、baseline(第一行文本的基线对齐);
}
```

###### align-content

多行元素的垂直方向排版

```css
.container{
    align-content(多行垂直轴排列方式):stretch(默认，前提是FLex项目未设置高度)flex-start、flex-end、center、space-between、space-around(上下对齐，间距相等);
}
```



#### 项目属性

###### order属性

`order`属性定义项目的排列顺序。数值越小，排列越靠前，默认为0

```css
.item {
  order: <integer>;
}
```



###### flex-grow

`flex-grow`属性定义项目的放大比例，默认为`0`，即如果存在剩余空间，也不放大

```css
.item {
  flex-grow: <number>; /* default 0 */
}
```

如果所有项目的`flex-grow`属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的`flex-grow`属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍



###### flex-shrink

`flex-shrink`属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小

```css
.item {
  flex-shrink: <number>; /* default 1 */
}
```

如果所有项目的`flex-shrink`属性都为1，当空间不足时，都将等比例缩小。如果一个项目的`flex-shrink`属性为0，其他项目都为1，则空间不足时，前者不缩小

负值对该属性无效



###### flex-basis

`flex-basis`属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为`auto`，即项目的本来大

```css
.item {
  flex-basis: <length> | auto; /* default auto */
}
```

它可以设为跟`width`或`height`属性一样的值（比如350px），则项目将占据固定空间



###### flex

`flex`属性是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`。后两个属性可选

```css
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```

该属性有两个快捷值：`auto` (`1 1 auto`) 和 none (`0 0 auto`)。

**建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。**



###### align-self

`align-self`属性允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性。默认值为`auto`，表示继承父元素的`align-items`属性，如果没有父元素，则等同于`stretch`

```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
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

