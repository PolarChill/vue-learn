/**
 * 扫描模板中的所有依赖, 创建更新函数和watcher
 */
class Compile {
  /**
   *
   * @param {*} el el是宿主或其选择器
   * @param {*} vm 当前vue实例
   */
  constructor(el, vm) {
    this.$vm = vm;
    this.$el = document.querySelector(el);
    if (this.$el) {
      // 将dom节点转换为Fragment高效执行
      this.$fragment = this.node2Fragment(this.$el);
      // 执行编译
      this.compile(this.$fragment);
      // 将生成的结果追加到宿主元素上
      this.$el.appendChild(this.$fragment);
    }
  }
  node2Fragment(el) {
    // 创建文档碎片, dom接口 (dom节点, 但不在dom树上, 使用时添加到dom上)
    let fragment = document.createDocumentFragment();
    // 将原生节点拷贝到fragment上
    let child;
    while ((child = el.firstChild)) {
      // 相当于移动操作
      fragment.appendChild(child);
    }
    return fragment;
  }
  // 编译指导片段
  compile(el) {
    let childNodes = el.childNodes;
    Array.from(childNodes).forEach(node => {
      let text = node.textContent;
      // 表达式是文本
      let reg = /\{\{(.*)\}\}/;
      // 按元素节点的方式编译
      if (this.isElementNode(node)) {
        // 元素节点, 只识别k-xx @xx
        this.compileElement(node);
      } else if (this.isTextNode(node) && reg.test(text)) {
        // 文本节点
        this.compileText(node, RegExp.$1);
      }
      // 递归遍历子节点
      if (node.childNodes && node.childNodes.length) {
        this.compile(node);
      }
    });
  }
  compileElement(node) {
    console.log('编译元素节点');
    let nodeAttrs = node.attributes;
    Array.from(nodeAttrs).forEach(attr => {
      // 规定指令 以k-text="test",
      let attrName = attr.name; // 属性名k-text
      let exp = attr.value; // 属性值 test
      if (this.isDirective(attrName)) {
        let dir = attrName.substring(2); // 指令名
        //普通指令
        this[dir] && this[dir](node, this.$vm, exp);
      } else if (this.iseEventDirective(attrName)) {
        let dir = attrName.substring(1);
        this.eventHandler(node, this.$vm, exp, dir);
      }
    });
  }

  compileText(node, exp) {
    console.log('编译文本节点');
    this.text(node, this.$vm, exp);
  }
  isDirective(attrName) {
    return attrName.indexOf('k-') === 0;
  }
  iseEventDirective(attrName) {
    return attrName.indexOf('@') === 0;
  }
  isElementNode(node) {
    return node.nodeType === 1;
  }
  isTextNode(node) {
    return node.nodeType === 3;
  }

  text(node, vm, exp) {
    this.update(node, vm, exp, 'text');
  }
  html(node, vm, exp) {
    this.update(node, vm, exp, 'html');
  }
  // 双向绑定
  model(node, vm, exp) {
    this.update(node, vm, exp, 'model');
    // 处理视图对模型的更新
    node.addEventListener('input', e => {
      vm[exp] = e.target.value;
    });
  }

  update(node, vm, exp, dir) {
    let updaterFn = this[dir + 'Updater'];
    // 执行更新, 调用了get函数
    updaterFn && updaterFn(node, vm[exp]);
    // 同时创建监听器  
    // 巧妙之处, 如果将订阅添加到该属性的依赖关系中, 通过访问该属性的get属性, 然后将watch加入, 
    // 但是去哪加watch呢, 就需要给watcher临时添加到Dep的原型上, 添加完毕后将Dep原型上的该属性置为null
    new Watcher(vm, exp, function(value) {
      updaterFn && updaterFn(node, value);
    });
  }
  eventHandler(node, vm, exp, dir) {
    let fn = vm.$options.methods && vm.$options.methods[exp];
    if (dir && fn) {
      node.addEventListener(dir, fn.bind(vm), false);
    }
  }
  textUpdater(node, value) {
    node.textContent = value;
  }
  htmlUpdater(node, value) {
    node.innerHTML = value;
  }
  modelUpdater(node, value) {
    node.value = value;
  }
}
