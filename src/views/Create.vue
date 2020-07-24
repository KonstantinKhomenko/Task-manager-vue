<template>
  <div class="row">
    <div class="col s6 offset-s3">
      <h4>Create task</h4>

      <form :model="formData" @submit.prevent="submitHandler">
        <div class="input-field">
          <input id="title" type="text" class="validate" required v-model="formData.title" />
          <label for="title">Title</label>
          <span class="helper-text" data-error="Title is required"></span>
        </div>

        <div class="chips" ref="chips"></div>

        <div class="input-field">
          <textarea id="description" class="materialize-textarea" v-model="formData.description"></textarea>
          <label for="description">Description</label>
          <span
            class="character-counter"
            style="float: right; font-size: 12px;"
          >{{ formData.description.length || 0 }}/2048</span>
        </div>

        <input type="text" ref="datepicker" v-model="formData.date" />

        <button class="btn" type="submit">Create task</button>
      </form>
    </div>
  </div>
</template>

<script>
import M from 'materialize-css';

export default {
  name: 'Create',
  data: () => ({
    formData: {
      title: '',
      chips: null,
      description: '',
      date: null
    }
  }),

  methods: {
    submitHandler() {
      const task = {
        title: this.formData.title,
        description: this.formData.description,
        id: Date.now(),
        status: 'active',
        tags: this.formData.chips.chipsData,
        date: this.formData.date.date
      };

      this.$store.dispatch('createTask', task);
      this.$router.push({ name: 'List' });
    }
  },

  mounted() {
    this.formData.chips = M.Chips.init(this.$refs.chips, {
      placeholder: 'Task tags'
    });

    this.formData.date = M.Datepicker.init(this.$refs.datepicker, {
      format: 'dd.mm.yyyy',
      defaultDate: new Date(),
      setDefaultDate: true
    });
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
.btn {
  margin-top: 20px;
}
</style>
