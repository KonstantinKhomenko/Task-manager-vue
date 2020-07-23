<template>
  <nav class="navbar light-blue">
    <div class="nav-wrapper">
      <router-link to="/" class="brand-logo">Tasks</router-link>

      <ul class="right hide-on-med-and-down">
        <router-link tag="li" to="/" exact active-class="active">
          <a href="#">Create</a>
        </router-link>

        <router-link tag="li" to="/list" active-class="active">
          <a href="#">List</a>
        </router-link>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar'
};
</script>

<style lang="scss" scoped>
.navbar {
  padding: 0 2rem;
  box-shadow: 0 10px 20px rgba(107, 73, 73, 0.3);

  .nav-wrapper {
    max-width: 980px;
    margin: 0 auto;
  }
}
</style>
