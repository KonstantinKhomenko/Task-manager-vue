import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
    currentTask: {}
  },
  getters: {
    tasks: ({ tasks }) => tasks,
    taskById: ({ tasks }) => id => tasks.find(task => task.id === id),
    currentTask: ({ currentTask }) => currentTask
  },
  mutations: {
    CREATE_TASK(state, task) {
      state.tasks.push(task);

      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },

    SET_CURRENT_TASK(state, task) {
      state.currentTask = task;
    },

    UPDATE_TASK(state, { id, description, date }) {
      const index = state.tasks.findIndex(task => task.id === id);
      const task = state.tasks[index];
      const status = new Date(date) > new Date() ? 'active' : 'outdated';

      state.tasks[index] = { ...task, description, date, status };

      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },

    STATUS_COMPLETE(state, id) {
      const index = state.tasks.findIndex(task => task.id === id);
      state.tasks[index].status = 'complete';

      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    }
  },
  actions: {
    createTask({ commit }, task) {
      commit('CREATE_TASK', task);
    },

    findTaskById({ getters, commit }, id) {
      const { taskById } = getters;
      const task = taskById(id);
      commit('SET_CURRENT_TASK', task);
    },

    updateTask({ commit }, task) {
      commit('UPDATE_TASK', task);
    },

    changeStatus({ commit }, id) {
      commit('STATUS_COMPLETE', id);
    }
  },
  modules: {}
});
