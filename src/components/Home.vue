<template>
  <div class="Home">
    <TitleBar
      label="Guild Wars 2 Goals"
      icon-type="sac"
      show-options
    />
    <main class="Home__main">
      <div class="global__wrapper">
        <!--        -->
        <ItemGrid class="Home__item-grid" />
      </div>
    </main>
  </div>
</template>

<script>
  import TitleBar from './Generic/TitleBar.vue';
  import ItemGrid from './Home/ItemGrid.vue';
  export default {
    name       : 'Home',
    components : { ItemGrid, TitleBar }
  };
</script>

<style lang='scss'>
  .Home {
    position: relative;
    display: flex;
    flex-direction: column;
    &__main {
      background: rgba(#251d1b, 0.8);
      flex-grow: 1;
      height: calc(100vh - 45px);
    }
  }
</style>
