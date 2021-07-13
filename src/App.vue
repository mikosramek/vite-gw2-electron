<template>
  <div class="App">
    <template v-if="loading">
      <main class="App__loading-container">
        <h1 class="App__loading-heading">
          {{ loadingError || 'Loading... ' }}
        </h1>
      </main>
    </template>
    <router-view v-else />
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  export default {
    name : 'App',
    data () {
      return {
        OptionInterface : null,
        loading         : true,
        loadingError    : null
      };
    },
    mounted() {
      this.setupOptions();
    },
    methods : {
      ...mapActions(['updateOptions']),
      setupOptions() {
        this.loading = true;
        window.api.sendMessage('options:get');
        window.api.listen('options:get', this.handleOptions);
      },
      handleOptions(data) {
        this.loading = false;
        if (!data) {
          this.loadingError = 'Error loading options.';
        }
        console.info({ data }, 'App.vue@handleOptions');
        this.updateOptions(data);
      }
    }
  };
</script>

<style lang="scss">
  @import './styles/normalize.scss';
  @import './styles/global.scss';

  .App {
    position: relative;
    height: 100%;
    &__loading {
      &-container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      &-heading {
        text-align: center;
      }
    }
  }
</style>
