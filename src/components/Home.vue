<template>
  <div class="Home">
    <TitleBar label="Guild Wars 2 Goals" />
    <main class="Home__main">
      <div class="global__wrapper">
        <!--        -->
      </div>
    </main>
  </div>
</template>

<script>
  import TitleBar from './Generic/TitleBar.vue';
  export default {
    name       : 'Home',
    components : { TitleBar }
  };
</script>

<style lang='scss'>
  .Home {
    position: relative;
    &__main {
      background: grey;
    }
  }
</style>
