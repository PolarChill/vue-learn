/**
 * 劫持所有属性 , 增加监听
 */
class KVue {
  constructor(options) {
    this.$data = options.data; //保存data属性
    this.observer(this.$data); //监听所有属性(执行响应式)
    this.$options = options;
    // 新建一个Watcher观察者对象, 这个时候Dep.target会指向这个Watcher对象昂
    // new Watcher();
    // 模拟render的过程, 触发某个属性的get函数
    // console.log('模拟render', this.$data.test);
    this.$compile = new Compile(options.el, this);
  }
  /**
   * 劫持监听所有属性
   * @param {*} data
   */
  observer(data) {
    if (!data || Object.prototype.toString.call(data) !== '[object Object]') {
      return;
    }

    Object.keys(data).forEach(key => {
      // 为每一个key定义响应式
      this.defineReactive(data, key, data[key]);
      // 为vue  data做属性代理
      this.proxyData(key);
    });
  }

  defineReactive(obj, key, val) {
    this.observer(val);
    // 每个属性值在多个地方使用, 因此收集每个属性对应的依赖
    const dep = new Dep(); // 每个属性拥有一个依赖数组
    Object.defineProperty(obj, key, {
      enumerable: true, //可枚举
      configurable: true, // 可修改或删除
      get() {
        // 将Dep.target(即当前的watcher对象存入deps中)
        Dep.target && dep.addDep(Dep.target);
        console.log(dep.deps);
        return val;
      },
      set(newVal) {
        if (newVal === val) return;
        // 数据更新了
        console.log(`${key}, 数据更新了 ${val}=> ${newVal}`);
        val = newVal;
        // 在set时触发dep的notify来通知所有watcher对象
        dep.notify();
      }
    });
  }
  proxyData(key) {
    // 将data中的属性定义到vue的实例上
    Object.defineProperty(this, key, {
      enumerable: true, //可枚举
      configurable: false, // 可修改或删除
      get() {
        // 代理
        return this.$data[key];
      },
      set(newVal) {
        this.$data[key] = newVal;
      }
    });
  }
}

/**
 * 依赖收集与追踪
 * 什么时候收集依赖?   模板中每个对属性的使用, 就是一个依赖, 需要观察属性变化, 变化时, 更新视图
 * 编译template时,将node中绑定的属性进行依赖收集(访问属性, 即在get中设置)
 * 什么时候将收集的依赖触发呢
 * 进行set式, 通知依赖更新
 */

// 依赖管理器: 负责将视图中的所有依赖收集管理, 包括依赖添加和通知
class Dep {
  constructor() {
    this.deps = []; //deps里边存放的石watcher对象( 监听器)
  }
  addDep(dep) {
    this.deps.push(dep);
  }
  // 通知所有监听器去更新视图
  notify() {
    this.deps.forEach(dep => {
      dep.update();
    });
  }
}

// watcher 具体的更新执行者
class Watcher {
  constructor(vm, key, cb) {
    // 在new一个监听器对象时将该对象赋值给Dep.target，在get中会用到 // 将 Dep.target 指向自己
    // 然后触发属性的 getter 添加监听
    // 最后将 Dep.target 置空
    this.cb = cb;
    this.vm = vm;
    this.key = key;
    Dep.target = this; // ????
    this.vm[this.key]; // 触发get 将watcher添加到deps
    Dep.target = null;
  }
  update() {
    this.cb.call(this.vm, this.vm[this.key]);
  }
}
