<template>
  <div class="NewItemPage">
    <form
      class="NewItemPage__form-container"
      @submit.prevent
    >
      <label for="queryName">Item Name</label>
      <input
        id="queryName"
        v-model="queryName"
        type="text"
      >
      <hr>
      <label for="queryId">Item Id</label>
      <input
        id="queryId"
        v-model="queryId"
        type="text"
      >
      <hr>
      <label for="goalAmount">Item count Goal</label>
      <input
        id="goalAmount"
        v-model="goalAmount"
        type="number"
        min="0"
        max="9999"
      >
      <hr>
      <GenericButton
        label="Cancel"
        :on-click="closeNew"
      />
      <GenericButton
        label="Confirm"
        :on-click="closeNew"
      />
    </form>
  </div>
</template>

<script>
  import GenericButton from './Generic/GenericButton.vue';
  import GW2ItemLibrary from '../utils/GW2ItemLibrary';

  export default {
    name       : 'NewItemPage',
    components : { GenericButton },
    data() {
      return {
        queryName     : '',
        queryId       : '', // 19976 is mystic coin
        goalAmount    : 0,
        searchResults : [],
        hoveredResult : null
      };
    },
    mounted() {
      // this.searchForInput();
      this.Lib = new GW2ItemLibrary();
    },
    methods : {
      closeNew() {
        window.api.sendMessage('closeNew');
      },
      searchForInput() {
        this.searchResults = this.Lib.search(this.queryName);
      }
    }
  };
</script>

<style lang='scss'>
  .NewItemPage {
    position: relative;
  }
</style>
