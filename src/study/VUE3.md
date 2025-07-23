

# VUE3



## 1组件开发

### 1.1setup

<script setup>

是vue3推荐的语法糖写法（等价于setup ()函数，但是更简洁）

```html
<script setup>
import { ref } from 'vue';

const count = ref(0);
const increment = () => count.value++;
</script>

<template>
  <button @click="increment">点击 {{ count }}</button>
</template>

```



### 1.2核心响应式api

| API             | 作用                                     |
| --------------- | ---------------------------------------- |
| ref（）         | 创建基本类型响应式数据（数值、字符串等） |
| reactive（）    | 创建对象类型响应式数据                   |
| computed（）    | 计算属性                                 |
| watch（）       | 监听指定变量变化                         |
| watchEffect（） | 自动依赖收集的响应式监听                 |

#### 1.2.1计算属性computed

在 Vue 3 的组合式 API 中，`computed` 是一个非常重要的**响应式** API，用于创建基于其他响应式数据的计算属性。一般存在return的函数建议替换为计算属性

```html
<template>
  <div>
    <p>原始值: {{ count }}</p>
    <p>计算值: {{ doubleCount }}</p>
    <button @click="count++">增加计数</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const count = ref(0)
  
// 创建一个计算属性
const doubleCount = computed(() => count.value * 2)
</script>
```

##### 1.2.1.1可写计算属性

默认情况下，计算属性是只读的。但你可以通过提供一个带有 `get` 和 `set` 函数的对象来创建一个可写的计算属性

```javascript
const firstName = ref('张')
const lastName = ref('三')

const fullName = computed({
  // getter
  get() {
    return firstName.value + ' ' + lastName.value
  },
  // setter
  set(newValue) {
    [firstName.value, lastName.value] = newValue.split(' ')
  }
})

// 现在可以这样设置
fullName.value = '李 四' // firstName 变为 '李'，lastName 变为 '四'
```

##### 1.2.1.2计算属性的缓存特性

计算属性会基于它们的依赖关系进行缓存，只有当依赖发生变化时才会重新计算

```javascript
const now = computed(() => Date.now())
// 这个计算属性永远不会更新，因为它没有依赖任何响应式数据
```

##### 1.2.1.3计算属性 vs 方法

计算属性和方法的主要区别在于：

1. **计算属性**：有缓存，只有依赖变化时才重新计算
2. **方法**：每次调用都会执行函数体

```javascript
// 计算属性 - 有缓存
const computedMessage = computed(() => '计算属性: ' + Date.now())

// 方法 - 无缓存
const methodMessage = () => '方法: ' + Date.now()
```

##### 1.2.1.4注意事项

1. **避免在计算属性中产生副作用**：计算属性应该是纯函数，不要在其中执行异步操作或修改DOM
2. **避免直接修改计算属性值**：除非你明确提供了setter
3. **计算属性应该返回一个值**：不像方法，计算属性必须返回一个值



#### 1.2.2watch

`watch` 是 Vue 3 组合式 API 中用于观察和响应数据变化的强大工具

```html
<template>
  <div>
    <p>原始值: {{ count }}</p>
    <p>计算值: {{ doubleCount }}</p>
    <button @click="count++">增加计数</button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const count = ref(0)

// 观察单个 ref
watch(count, (newValue, oldValue) => {
  console.log(`计数从 ${oldValue} 变为 ${newValue}`)
})
</script>
```

##### 观察不同类型的数据源

###### 观察 ref

```javascript
const count = ref(0)

watch(count, (newVal, oldVal) => {
  console.log('count变化:', oldVal, '→', newVal)
})
```

###### 观察 reactive 对象

watch不能直接观察对象,需要通过匿名函数监听

```javascript
const state = reactive({ count: 0 })

// 观察整个 reactive 对象
watch(() => state.count, (newVal, oldVal) => {
  console.log('count变化:', oldVal, '→', newVal)
})
```

###### 观察 getter 函数

```javascript
const state = reactive({ 
  count: 0,
  double: computed(() => state.count * 2)
})

watch(() => state.double, (newVal) => {
  console.log('double值变为:', newVal)
})
```

###### 观察多个数据源

```javascript
const count = ref(0)
const name = ref('张三')

// 观察多个值
watch([count, name], ([newCount, newName], [oldCount, oldName]) => {
  console.log(`count: ${oldCount}→${newCount}`)
  console.log(`name: ${oldName}→${newName}`)
})
```

###### 深度观察对象

```javascript
const user = reactive({
  name: '李四',
  address: {
    city: '北京'
  }
})

// 深度观察
watch(
  () => user,
  (newVal, oldVal) => {
    console.log('用户信息变化:', oldVal, '→', newVal)
  },
  { deep: true }
)
```

###### 立即执行回调

```javascript
const count = ref(0)

// 立即执行一次
watch(count, (newVal) => {
  console.log('当前值:', newVal)
}, { immediate: true })
```

###### 观察响应式数组

```javascript
const list = reactive([1, 2, 3])

watch(
  () => [...list], // 创建数组副本
  (newVal, oldVal) => {
    console.log('数组变化:', oldVal, '→', newVal)
  }
)
```

###### 停止观察

```javascript
const count = ref(0)

// watch 返回一个停止函数
const stop = watch(count, (newVal) => {
  console.log('count变化:', newVal)
})

// 调用停止函数来停止观察
stop()
```

###### 副作用清理

```javascript
const id = ref(1)

watch(id, (newId, oldId, onCleanup) => {
  const timer = setTimeout(() => {
    console.log(`获取ID ${newId} 的数据`)
  }, 1000)
  
  // 清理函数
  onCleanup(() => {
    clearTimeout(timer)
  })
})
```

###### watchEffect

`watchEffect` 是 `watch` 的简化版，自动追踪依赖

```javascript
import { watchEffect } from 'vue'

const count = ref(0)

// 自动追踪count
watchEffect(() => {
  console.log('count值:', count.value)
})
```

###### watch vs watchEffect

|   特性   |          watch           |       watchEffect        |
| :------: | :----------------------: | :----------------------: |
| 依赖收集 |         显式指定         |         自动收集         |
| 立即执行 | 需要配置 immediate: true |       总是立即执行       |
|  新旧值  |        提供新旧值        |       只提供当前值       |
| 适用场景 |  需要精确控制观察目标时  | 依赖自动追踪的副作用场景 |



### 1.3 生命周期

#### 1.3.1 常见的生命周期钩子对应表

| Vue 2 选项式    | Vue 3 组合式 API                                             |
| --------------- | ------------------------------------------------------------ |
| `beforeCreate`  | ❌ 不再需要（`setup` 执行前）                                 |
| `created`       | ❌ 不再需要（`setup` 执行时）                                 |
| `beforeMount`   | `onBeforeMount()`组件挂载到节点上之前执行的函数=>页面开始渲染 |
| `mounted`       | `onMounted()`组件挂载完成后执行的函数（页面开始渲染后执行，mounted只会执行一次）可用来实现页面初始化 |
| `beforeUpdate`  | `onBeforeUpdate()`组件更新之前执行的函数（Dom更新前执行）=>dom更新 |
| `updated`       | `onUpdated()`组件更新完成之后执行的函数（Dom更新后执行）=>页面销毁 |
| `beforeUnmount` | `onBeforeUnmount()`组件卸载之前执行的函数                    |
| `unmounted`     | `onUnmounted()`组件卸载完成之后执行的函数                    |
| `errorCaptured` | `onErrorCaptured()`捕获子组件中的错误                        |
| `activated`     | `onActivated()`（仅 `<keep-alive>`）                         |
| `deactivated`   | `onDeactivated()`（仅 `<keep-alive>`）                       |

#### 1.3.2 code view

```html
<template>
    <div>
        im a component
        <span ref="span">{{msg}}</span>
        <button @click="change">新</button>
    </div>
</template>
<script setup>
    import {ref, onBeforeMount, onMounted, onBeforeUpdata, onUpdated, onBeforeUnmount, ouUnmount, onErrorCaptured} from "vue";
    const msg = ref("shaka");
    const span = ref();//获取dom
    const change = () => {
        msg.value = "virgo";
    }
    
    //setup
    onBeforeMount(()=>{console.log(span.value?.innerText);})//创建前//输出undefind
    onMounted(()=>{console.log(span.value?.innerText);})//创建完//输出shaka
    //mount对：代表DOM的创建过程
    //可选链："?." 可以避免undefind报错
    
    onBeforeUpdata(()=>{console.log(span.value?.innerText)};)//更新前的DOM//输出shaka
    onUpdated(()=>{console.log(span.value?.innerText)};})//更新完成的DOM//输出virgo
    //update对：DOM的更新过程
    
    onBeforeUnmount(()=>{console.log("销毁了")})//在父组件中a组件进行v-if(false)判定前输出
    ouUnmount(()=>{console.log("销毁了")})//在父组件中a组件进行v-if(false)判定时输出
    //Unmount对：销毁的生命周期
                        
    onErrorCaptured((err, instance, info) => {
        console.error('捕获到错误：', err);
        return false; // false 表示继续向上传播
    });
</script>
```



#### 1.3.3 父子组件生命周期的执行顺序

##### 1.3.3.1 执行顺序总览（挂载阶段）

父子组件挂载时生命周期钩子执行顺序

| 顺序 | 生命周期钩子             | 所属组件 |
| ---- | ------------------------ | -------- |
| 1    | 父组件 `setup()`         | 父       |
| 2    | 父组件 `onBeforeMount()` | 父       |
| 3    | 子组件 `setup()`         | 子       |
| 4    | 子组件 `onBeforeMount()` | 子       |
| 5    | 子组件 `onMounted()`     | 子       |
| 6    | 父组件 `onMounted()`     | 父       |



##### 1.3.3.2 更新阶段顺序（比如 prop 改变时）

```
父 onBeforeUpdate
→ 子 onBeforeUpdate
→ 子 onUpdated
父 onUpdated

```

##### 1.3.3.3 卸载阶段顺序

```
父 onBeforeUnmount
→ 子 onBeforeUnmount
→ 子 onUnmounted
父 onUnmounted

```



### 1.4模板语法与组件通信

#### 1.4.1父子组件通信

##### defineProps：父向子传值

Vue3 中使用 `defineProps` 来接收父组件传入的属性（props）。该方法在 `<script setup>` 中直接使用，能够实现类型验证、默认值设置、值校验等。

###### 示例：父子组件传值

1. 父组件（ParentComponent.vue）

```html
<template>
  <ChildComponent :message="parentMessage" :count="count" />
</template>

<script setup>
import { ref } from 'vue';
import ChildComponent from './ChildComponent.vue';

const parentMessage = ref('Hello from Parent!');
const count = ref(0);
</script>
```

2. 子组件（ChildComponent.vue）

```html
<template>
  <div>
    <p>{{ message }}</p>
    <p>Count: {{ count }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  message: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    default: 0
  }
});
</script>
```

###### props 类型、默认值与校验

可以使用 `defineProps` 设置类型、默认值与自定义验证函数，增强组件健壮性

```javascript
defineProps({
  // 基础类型检查
  title: String,
  // 多个可能的类型
  value: [String, Number],
  // 带默认值的对象
  user: {
    type: Object,
    default: () => ({ name: 'Guest' })
  },
  // 自定义验证函数
  age: {
    validator: (value) => value >= 18,
    default: 18
  }
});
```

###### 实践建议

1. **单向数据流**：在 Vue.js 中，`props` 是单向的，即数据只能从父组件流向子组件。子组件不应该直接修改 `props` 的值。如果需要修改，可以通过触发事件通知父组件进行修改
2. **命名规范**：`props` 的命名建议使用驼峰式命名法，例如 `userName`。在父组件中传递 `props` 时，建议使用短横线分隔符，例如 `user-name`
3. **动态 props**：可以通过 `v-bind` 或 `:` 动态绑定 `props`，例如 `:message="parentMessage"`



##### defineEmits：子向父通信

在 Vue3 中，`emits` 属性用于定义一个组件可以触发的事件。

`emits` 是一个数组或对象，用于明确声明组件将触发哪些自定义事件。

通过 `emits` 属性，开发者可以更好地管理组件的事件，并提高代码的可读性和可维护性

###### 为什么使用 emits 属性

在 Vue2 中，父组件通过 `v-on` 监听子组件的事件，而子组件通过 `$emit` 方法触发事件。这种方式虽然简单直接，但随着项目规模的增长，事件的管理可能会变得混乱。Vue3 引入 `emits` 属性，有以下好处：

1. **清晰的事件声明**：通过 `emits` 属性，开发者可以明确知道组件会触发哪些事件
2. **代码可读性**：在组件中查看 `emits` 属性，可以快速了解组件的事件交互
3. **类型检查和警告**：如果触发的事件未在 `emits` 中声明，Vue 会在开发模式下发出警告，帮助开发者发现潜在问题



###### 如何使用 emits 属性

基本用法

在组件中，`emits` 可以是一个数组，数组中列出所有自定义事件的名称

1.子组件

```html
<template>
  <button @click="handleClick">Submit</button>
</template>

<script setup>
const emit = defineEmits(['submit', 'update:count']);

function handleClick() {
  emit('submit', { data: 'some data' });
  emit('update:count', 5);
}
</script>
```

2.父组件

```html
<template>
  <ChildComponent 
    @submit="handleSubmit" 
    @update:count="count = $event" 
  />
</template>

<script setup>
import { ref } from 'vue';

const count = ref(0);

function handleSubmit(payload) {
  console.log('Received:', payload);
}
</script>
```



对象用法、参数校验

`emits` 也可以是一个对象，对象的键是事件名称，值是一个验证函数。验证函数用于检查传递的事件参数是否有效。

```html
<template>
  <button @click="handleClick">Submit</button>
</template>

<script setup>
const emit = defineEmits({
  submit: (payload) => {
    if (typeof payload === 'string') return true;
    console.warn('Submit event payload must be a string!');
    return false;
  }
});

function handleClick() {
  emit('submit', 'Form submitted!');
}
</script>
```

在这个例子中，`submit` 事件的验证函数会检查 `payload` 是否为字符串。如果不是，会在控制台中输出警告信息。

与 v-model 结合使用

结合 `v-model` 可实现自定义双向绑定，需定义 `modelValue` 和 `update:modelValue`：

```html
<template>
  <input :value="modelValue" @input="updateValue" />
</template>

<script setup>
const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

function updateValue(event) {
  emit('update:modelValue', event.target.value);
}
</script>
```

在这个例子中，当输入框的值发生变化时，会触发 `update:modelValue` 事件，并将新的值传递给父组件

###### 实践建议

1. **事件名称大小写**：Vue 中的事件名称是大小写不敏感的，但建议使用 kebab-case（短横线分隔）命名方式
2. **验证函数的返回值**：如果验证函数返回 `false`，Vue 会在开发模式下发出警告，但事件仍然会被触发
3. **默认事件**：某些原生事件（如 `click`）不需要在 `emits` 中声明，除非你需要验证它们的参数



#### 1.4.2defineExpose：暴露组件内部方法

在 Vue3 中，`expose()` 函数是一个用于在组合式 API 中暴露组件内部方法和属性的工具。

`expose()` 通常与 `setup()` 函数一起使用，允许开发者明确指定哪些组件内部的属性和方法可以被外部访问

##### 为什么需要 expose() 函数

在 Vue2 中，组件的属性和方法默认是公开的，外部可以直接访问。然而，这种设计可能会导致一些问题，例如：

1. **安全性问题**：内部方法被意外暴露，可能会导致不安全的操作。
2. **维护性问题**：难以追踪哪些属性和方法是被外部使用的，增加了维护的复杂性。

Vue3 引入了 `expose()` 函数，允许开发者更精确地控制组件的公共接口，从而解决上述问题

##### 如何使用 expose() 函数

```javascript
export default {
  setup(props, context) {
    const internalMethod = () => {
      console.log('This is an internal method');
    };

    const publicMethod = () => {
      console.log('This is a public method');
    };

    // 暴露 publicMethod 方法
    context.expose({
      publicMethod
    });

    return {
      internalMethod
    };
  }
};
```

在上面的代码中，我们定义了两个方法：`internalMethod` 和 `publicMethod`。通过 `context.expose()`，我们只暴露了 `publicMethod`，而 `internalMethod` 则不会被外部访问

##### 示例场景

###### 1. 父子组件通信

假设我们有一个父组件和一个子组件，父组件需要调用子组件的某个方法。

子组件

```html
<template>
  <div>Child component</div>
</template>

<script setup>
const childMethod = () => {
  console.log('Child method called');
};

defineExpose({
  childMethod
});
</script>
```

父组件

```html
<template>
  <ChildComponent ref="childRef" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ChildComponent from './ChildComponent.vue';

const childRef = ref(null);

onMounted(() => {
  childRef.value?.childMethod();
});
</script>
```

###### 2.封装组件库

在开发组件库时，我们可能希望只暴露一部分方法和属性，以保持组件的封装性和安全性

```html
<script setup>
import { ref } from 'vue';

const internalState = ref('internal state');
const publicState = ref('public state');

const publicMethod = () => {
  console.log('Public method called');
};

defineExpose({
  publicState,
  publicMethod
});
</script>
```

##### 实践建议

1. **多次调用 expose()**：如果多次调用 `expose()`，只有最后一次调用的内容会被暴露
2. **与 ref 结合使用**：在父组件中，可以通过 `ref` 引用子组件，并调用其暴露的方法
3. **兼容性**：`expose()` 是 Vue3 的新特性，确保你的项目使用的是 Vue3 及以上版本



### 1.5模块化逻辑复用：**组合函数**

把响应式逻辑封装为函数模块，复用性强

```javascript
// useCounter.js
import { ref } from 'vue';

export function useCounter() {
  const count = ref(0);
  const inc = () => count.value++;
  return { count, inc };
}

```

```vue
<script setup>
import { useCounter } from './useCounter.js';
const { count, inc } = useCounter();
</script>

```

### 1.6CSS 相关

Vue 3 支持：

- <style scoped> 局部样式

- <style module> 模块化 CSS

- <style> 支持 lang="scss" 等预处理器

### 1.7异步 & 请求封装

使用 `onMounted` 搭配 `async`

```javascript
onMounted(async () => {
  const res = await fetch('/api/data');
  data.value = await res.json();
});

```

推荐将 API 封装成模块进行复用

### 1.8其他进阶内容

| 内容                 | 简介                       |
| -------------------- | -------------------------- |
| teleport             | 传送门，渲染到 body 外     |
| suspense             | 异步组件加载               |
| provide/inject       | 父子通信/依赖注入          |
| defineExpose         | 暴露子组件方法给父组件     |
| defineOptions        | 定义组件名称等（Vue 3.4+） |
| `v-model` 绑定多个值 | 多个 prop 双向绑定         |
| Pinia                | 替代 Vuex 的状态管理       |



## 2Pinia

Pinia 是 Vue 3 的官方状态管理库，用来**跨组件共享数据（状态）**



### 2.1Pinia使用

#### 2.1.1安装 Pinia

```bash
npm install pinia
```

在 `main.js` 中引入并使用

```javascript
import { createPinia } from 'pinia'
const app = createApp(App)
app.use(createPinia())
```

#### 2.1.2创建一个 Store

文件名：`src/stores/counter.js`

```javascript
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  getters: {
    double: (state) => state.count * 2
  },
  actions: {
    increment() {
      this.count++
    }
  }
})
```

#### 2.1.3在组件中使用 Store

```vue
<script setup>
import { useCounterStore } from '@/stores/counter'
const counter = useCounterStore()
</script>

<template>
  <h2>count = {{ counter.count }}</h2>
  <h2>double = {{ counter.double }}</h2>
  <button @click="counter.increment()">+1</button>
</template>
```



### 2.2理解状态管理的意义

Vue 组件之间传值有两种方式：

- 父子通信用 `props` / `emit`
- 多个组件共享状态时（如登录信息、购物车），就需要 **状态管理**

Pinia 就是帮你在全局管理这些 **可共享的状态**



### 2.3Pinia和VUEX对比

| 功能/特性              | **Vuex**（经典）                      | **Pinia**（Vue 3 推荐）                   |
| ---------------------- | ------------------------------------- | ----------------------------------------- |
| 📦 状态结构             | state / getters / mutations / actions | state / getters / actions（无 mutations） |
| 🔧 语法复杂度           | 高（需要分离 mutation、action）       | 低（直接操作 state，无 mutation）         |
| 🚀 TypeScript 支持      | 支持但配置繁琐                        | 内建优秀的类型推导                        |
| 🧩 模块化               | 手动配置 `modules`                    | 每个 store 就是一个模块                   |
| 📘 文档易读性           | 中等                                  | 简洁、清晰                                |
| ⚡ Composition API 支持 | 不太适配                              | 原生支持，和 `<script setup>` 完美集成    |
| 📦 体积                 | 相对大                                | 更轻量                                    |
| 🛠️ 插件生态             | 成熟，但偏老旧                        | 新兴，正在成长                            |
| ✅ 开发体验             | 规范但繁琐                            | 简单、直观                                |
| 🔄 热重载               | 需要额外配置                          | 默认支持                                  |



**状态结构区别示例**

Vuex 示例（必须写 mutation 才能改 state）

```javascript
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++
    }
  },
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => commit('increment'), 1000)
    }
  }
})
```

Pinia 示例（直接在 actions 修改 state）

```javascript
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  actions: {
    increment() {
      this.count++
    }
  }
})
```

