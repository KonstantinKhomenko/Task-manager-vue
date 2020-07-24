<template>
  <div>
    <h4>Tasks list</h4>

    <div class="row">
      <div class="input-field col s4">
        <select ref="select" v-model="filter">
          <option value disabled selected>Choose your filter</option>
          <option value>All tasks</option>
          <option value="active">Active tasks</option>
          <option value="outdated">Outdated tasks</option>
          <option value="complete">Complete tasks</option>
        </select>
        <label>Status filter</label>
      </div>
    </div>

    <button v-if="filter" class="btn btn-small red" @click="filter = null">Clear filter</button>

    <hr />

    <table v-if="tasks.length">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Date</th>
          <th>Description</th>
          <th>Status</th>
          <th>Open</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(task, index) in displayTasks" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ task.title }}</td>
          <td>{{ new Date(task.date).toLocaleDateString() }}</td>
          <td class="td-description">
            <div class="task-description">{{ task.description }}</div>
          </td>
          <td>{{ task.status }}</td>
          <td>
            <router-link tag="button" class="btn btn-small" :to="`/task/${task.id}`">Open</router-link>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>No tasks</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'List',
  data: () => ({
    filter: null
  }),

  computed: {
    ...mapGetters(['tasks']),
    displayTasks() {
      if (!this.filter) return this.tasks;
      return this.tasks.filter(task => task.status === this.filter);
    }
  },

  mounted() {
    // eslint-disable-next-line no-undef
    M.FormSelect.init(this.$refs.select);
  }
};
</script>

<style lang="scss" scoped>
.td-description {
  max-width: 300px;
  .task-description {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
