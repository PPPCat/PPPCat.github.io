# JavaScript

### 影响原数组的七个方法（pop、push、shift、unshift、reverse、sort、splice）

| 方法名      | 作用说明                                                     |
| ----------- | ------------------------------------------------------------ |
| `pop()`     | 删除数组最后一个元素，并返回该元素。                         |
| `push()`    | 向数组末尾添加一个或多个元素，并返回新长度。                 |
| `shift()`   | 删除数组第一个元素，并返回该元素。                           |
| `unshift()` | 向数组开头添加一个或多个元素，并返回新长度。                 |
| `reverse()` | 反转数组中元素的顺序。                                       |
| `sort()`    | 对数组元素进行排序（默认按照字符串升序），**可传入比较函数**。 |
| `splice()`  | 添加、删除或替换数组中的元素。**最强大也最复杂的修改方法**。 |

```javascript
let arr = [1, 2, 3, 4, 5];

arr.pop();       // 移除最后一个 => [1, 2, 3, 4]
arr.push(6);     // 添加到末尾 => [1, 2, 3, 4, 6]
arr.shift();     // 移除第一个 => [2, 3, 4, 6]
arr.unshift(0);  // 添加到开头 => [0, 2, 3, 4, 6]
arr.reverse();   // 反转顺序 => [6, 4, 3, 2, 0]
arr.sort();      // 排序（按字符串） => [0, 2, 3, 4, 6]
arr.splice(2, 1, 99); // 从索引2删除1个元素，添加99 => [0, 2, 99, 4, 6]

```



### 数组遍历forEach、map、filter、some、find、findIndex

| 方法名      | 是否返回新数组 | 是否跳出循环       | 返回值类型               | 功能简述                                       |
| ----------- | -------------- | ------------------ | ------------------------ | ---------------------------------------------- |
| `forEach`   | ❌ 否           | ❌ 否               | `undefined`              | 遍历数组，每项执行一次回调函数，不返回新数组。 |
| `map`       | ✅ 是           | ❌ 否               | 新数组                   | 遍历数组，对每项执行回调并生成新数组。         |
| `filter`    | ✅ 是           | ❌ 否               | 新数组（过滤结果）       | 遍历数组，筛选满足条件的元素组成新数组。       |
| `some`      | ❌ 否           | ✅ 是（返回true时） | 布尔值                   | 只要有一个元素满足条件就返回 `true`。          |
| `find`      | ❌ 否           | ✅ 是（找到时）     | 单个元素（或 undefined） | 找到第一个满足条件的元素并返回。               |
| `findIndex` | ❌ 否           | ✅ 是（找到时）     | 索引（或 -1）            | 找到第一个满足条件元素的索引并返回。           |

```javascript
let arr = [1, 2, 3, 4, 5];

// forEach
arr.forEach(item => {
  console.log("forEach:", item);
});

// map
let squared = arr.map(item => item * item);  // [1, 4, 9, 16, 25]

// filter
let even = arr.filter(item => item % 2 === 0);  // [2, 4]

// some
let hasGreaterThan3 = arr.some(item => item > 3);  // true

// find
let firstEven = arr.find(item => item % 2 === 0);  // 2

// findIndex
let indexOfFirstEven = arr.findIndex(item => item % 2 === 0);  // 1

```

| 场景                         | 建议方法    |
| ---------------------------- | ----------- |
| 只想遍历，不关心返回         | `forEach`   |
| 每项都要加工处理             | `map`       |
| 筛选符合条件的元素           | `filter`    |
| 判断是否有一个满足条件       | `some`      |
| 找到第一个符合条件的元素     | `find`      |
| 找到第一个符合条件元素的索引 | `findIndex` |