<template>
  <div class="row">
    <div v-if="currentTask" class="col s6 offset-s3">
      <h4>{{ currentTask.title }}</h4>

      <form :model="formData" @submit.prevent="submitHandler">
        <div class="chips" ref="chips"></div>

        <div class="input-field">
          <textarea
            style="min-height: 100px"
            id="description"
            class="materialize-textarea"
            v-model="formData.description"
          ></textarea>
          <label for="description">Description</label>
          <span
            class="character-counter"
            style="float: right; font-size: 12px;"
          >{{ formData.description.length || 0 }}/2048</span>
        </div>

        <input type="text" ref="datepicker" v-model="formData.date" />

        <button class="btn btn-update" type="submit">Update</button>

        <button class="btn green" type="button">Complete task</button>
      </form>
    </div>

    <p v-else>Task not found</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import M from 'materialize-css';

export default {
  name: 'Task',
  data: () => ({
    formData: {
      chips: null,
      description: '',
      date: null
    }
  }),

  computed: {
    ...mapGetters(['currentTask'])
  },

  methods: {
    ...mapActions(['findTaskById', 'updateTask']),
    submitHandler() {
      this.updateTask({
        description: this.formData.description,
        id: this.currentTask.id,
        date: this.formData.date.date
      });

      this.$router.push({ name: 'List' });
    }
  },

  mounted() {
    this.findTaskById(+this.$route.params.id);
    this.formData.description = this.currentTask.description;

    this.formData.chips = M.Chips.init(this.$refs.chips, {
      placeholder: 'Task tags',
      data: this.currentTask.tags
    });

    this.formData.date = M.Datepicker.init(this.$refs.datepicker, {
      format: 'dd.mm.yyyy',
      defaultDate: new Date(this.currentTask.date),
      setDefaultDate: true
    });

    setTimeout(() => {
      M.updateTextFields();
    }, 0);
  },

  destroyed() {
    if (this.formData.date && this.formData.date.destroy) {
      this.formData.date.destroy();
    }

    if (this.formData.chips && this.formData.chips.destroy) {
      this.formData.chips.destroy();
    }
  }
};
</script>

<style lang="scss" scoped>
.btn-update {
  margin-right: 20px;
}
</style>
