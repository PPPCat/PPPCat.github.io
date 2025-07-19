# VUE3

### 父子组件通信

#### defineProps：父向子传值

Vue3 中使用 `defineProps` 来接收父组件传入的属性（props）。该方法在 `<script setup>` 中直接使用，能够实现类型验证、默认值设置、值校验等。

##### 示例：父子组件传值

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

##### props 类型、默认值与校验

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

##### 实践建议

1. **单向数据流**：在 Vue.js 中，`props` 是单向的，即数据只能从父组件流向子组件。子组件不应该直接修改 `props` 的值。如果需要修改，可以通过触发事件通知父组件进行修改
2. **命名规范**：`props` 的命名建议使用驼峰式命名法，例如 `userName`。在父组件中传递 `props` 时，建议使用短横线分隔符，例如 `user-name`
3. **动态 props**：可以通过 `v-bind` 或 `:` 动态绑定 `props`，例如 `:message="parentMessage"`



### defineEmits：子向父通信

在 Vue3 中，`emits` 属性用于定义一个组件可以触发的事件。

`emits` 是一个数组或对象，用于明确声明组件将触发哪些自定义事件。

通过 `emits` 属性，开发者可以更好地管理组件的事件，并提高代码的可读性和可维护性

##### 为什么使用 emits 属性

在 Vue2 中，父组件通过 `v-on` 监听子组件的事件，而子组件通过 `$emit` 方法触发事件。这种方式虽然简单直接，但随着项目规模的增长，事件的管理可能会变得混乱。Vue3 引入 `emits` 属性，有以下好处：

1. **清晰的事件声明**：通过 `emits` 属性，开发者可以明确知道组件会触发哪些事件
2. **代码可读性**：在组件中查看 `emits` 属性，可以快速了解组件的事件交互
3. **类型检查和警告**：如果触发的事件未在 `emits` 中声明，Vue 会在开发模式下发出警告，帮助开发者发现潜在问题



##### 如何使用 emits 属性

###### 基本用法

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



###### 对象用法、参数校验

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

###### 与 v-model 结合使用

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

##### 实践建议

1. **事件名称大小写**：Vue 中的事件名称是大小写不敏感的，但建议使用 kebab-case（短横线分隔）命名方式
2. **验证函数的返回值**：如果验证函数返回 `false`，Vue 会在开发模式下发出警告，但事件仍然会被触发
3. **默认事件**：某些原生事件（如 `click`）不需要在 `emits` 中声明，除非你需要验证它们的参数



### defineExpose：暴露组件内部方法

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