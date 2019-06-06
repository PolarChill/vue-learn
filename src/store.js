import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 1,
    prevCount: 1,
  },
  //同步
  mutations: {
    increase(state) {
      let temp = state.count
      state.count += state.prevCount;
      state.prevCount = temp
    }
  },
  // 派生状态
  getters: {
    money: state => {
      return state.count + '元';
    }
  },
  // 异步
  actions: {
    increaseAsync({ commit }) {
      setTimeout(() => {
        commit('increase');
      }, 1000);
    }
  },

  //使用严格模式, 不能$sotre.state.count = xxx 去修改值, (单向数据流)
  strict: true
});
