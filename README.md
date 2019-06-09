#### VUE学习
![VUE底层原理关系图](VueTheroyLearn/vue.png?raw=true)

问题? watch  computed
设计表单组件   
三层 


1.  input  
首先实现双向绑定  v:value @input(v-model的本质)
子 input改变时 通过$parent.$emit派发校验事件

2.  formItem lable prop 

父 在create时 监听子传来的校验事件, 并调用校验方法校验规则, 更新错误提示.(改为异步的方式, 校验结果上层要用,因此为异步)
(若校验改为同步的方式, 则可以将事件传给上层,直接调用)
==关键==: 每个formItem挂在时 , 如果有prop(校验属性标志), 则将其validate方法派发给Form, $parent.$emit('validate', this.validate)

3. form 绑定数据模型 添加校验规则

form在创建时, 监听validate, 将所有的派发事件放到一个数组时(每个校验的promise).

在进行提交 通过实例回调时, 将promise转换为任务数组, 获取所有结果, 通过实例的回调将结果返回出去, 即完成提交时校验

```
    // 将formItem数组转换为valiadate()返回的prmoise数组
    const tasks = this.fileds.map( item => item.validate())
    // 获取所有结果统一处理
    const results = await Promise.all(tasks)
```



### 路由
1.  $router为VueRouter实例，主要是实现路由跳转使用。想要导航到不同URL，则使用router.push方法，
2.  $route 路由信息对象，表示当前激活的路由的状态信息，包含了完整路径、当前 URL 解析得到的信息，还有 URL 匹配到的 route records（路由记录）

1. 配置路由
2. 安放路由出口
3. 导航链接
4. 传参
   - 获取
5. 嵌套
6. 异步路由
7. 守卫


## vuex
1. 配置

   ```
   {
   	state:{}
   	mutations:{}
   	getters:{}
   	actions:{}
   }
   ```

2. 使用

   - store.state.xx
   - store.getters.xx
   - store.commit(xxx)
   - store.dispatch(xxx)

3. 帮助方法

   - mapState
   - mapGetters
   - mapMutations
   - mapActions

4. 模块化


[][]






