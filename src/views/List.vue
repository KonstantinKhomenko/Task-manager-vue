<template>
  <div>
    <h4>List</h4>

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
        <tr v-for="(task, index) in tasks" :key="index">
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
  computed: {
    ...mapGetters(['tasks'])
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
