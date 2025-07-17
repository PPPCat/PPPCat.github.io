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

```css
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script>
      const p = new Promise((resolve, reject) => {
        //1.创建对象
        const xhr = new XMLHttpRequest();
        //2.初始化
        xhr.open("GET", "https://api.apiopen.top/getJoke");
        //3.发送
        xhr.send();
        //4.绑定事件，处理响应结果
        xhr.onreadystatechange = function () {
          //判断
          if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
              console.log(xhr.response);
            } else {
              console.error(xhr.status);
            }
          }
        };
      });
    </script>
  </body>
</html>

```

