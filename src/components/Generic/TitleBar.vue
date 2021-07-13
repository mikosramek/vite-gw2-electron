<template>
  <header class="TitleBar">
    <div class="global__wrapper">
      <div class="TitleBar__container">
        <div class="TitleBar__icon-container">
          <Sac class="TitleBar__icon-svg TitleBar__icon--sac" />
        </div>
        <h1 class="TitleBar__heading">
          {{ label }}
        </h1>
        <button
          class="TitleBar__gear-button"
          @click="openOptions"
        >
          <img
            :src="gearImage"
            alt="Options gear."
            class="TitleBar__gear-icon"
          >
        </button>
      </div>
    </div>
  </header>
</template>

<script>
  import Sac from '../../assets/svgs/Sac.svg';
  import gearImage from '../../assets/images/Game_menu_options_icon.png';
  export default {
    name       : 'TitleBar',
    components : { Sac },
    props      : {
      label : {
        type     : String,
        required : true
      }
    },
    data() {
      return {
        gearImage
      };
    },
    methods : {
      openOptions() {
        window.api.sendMessage('openOptions');
      }
    }
  };
</script>

<style lang='scss'>
  .TitleBar {
    position: relative;
    -webkit-app-region: drag;
    &__icon {
      &-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 75px;
        height: 70px;
      }
      &-svg {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    &__container {
      height: 70px;
      display: flex;
      align-items: flex-end;
    }
    &__heading {
      position: relative;
      margin: 0;
      font-size: 28px;
      padding: 5px 0 0 25px;
      margin-bottom: 5px;
      width: 100%;
      &::before {
        z-index: -1;
        position: absolute;
        content: '';
        display: block;
        left: 0;
        bottom: 0;
        background: linear-gradient(90deg, rgba(180,124,93,1) 0%, rgba(180,124,93,1) 36%, rgba(180,124,93,0) 69%, rgba(180,124,93,0) 81%, rgba(180,124,93,1) 100%);;
        width: 100%;
        height: 100%;
      }
    }
    &__gear {
      &-button {
        position: absolute;
        right: 0;
        bottom: 3px;
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
      }
    }
  }
</style>
