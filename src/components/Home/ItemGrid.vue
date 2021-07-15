<template>
  <div class="ItemGrid">
    <ItemGoal
      v-for="(goal, index) of goals"
      :key="index"
      class="ItemGrid__goal"
    />
    <GenericButton v-bind="addButtonProps" />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import _get from 'lodash.get';
  import ItemGoal from './ItemGoal.vue';
  import GenericButton from '../Generic/GenericButton.vue';

  export default {
    name       : 'ItemGrid',
    components : { GenericButton, ItemGoal },
    computed   : {
      ...mapGetters(['allOptions']),
      goals() {
        return _get(this.allOptions, 'trackedItems', []);
      },
      addButtonProps() {
        return {
          label   : 'Add Item Goal',
          onClick : this.openNew
        };
      }
    },
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
    padding: 10px 25px;
  }
</style>
