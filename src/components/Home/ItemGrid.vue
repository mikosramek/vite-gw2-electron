<template>
  <div class="ItemGrid">
    <h2 class="ItemGrid__heading">
      ItemGrid
    </h2>
  </div>
</template>

<script>
  export default {
    name    : 'ItemGrid',
    methods : {
      openNew() {
        window.api.sendMessage('openNew');
      }
    }
  };
</script>

<style lang='scss'>
  .ItemGrid {
    position: relative;
  }
</style>
