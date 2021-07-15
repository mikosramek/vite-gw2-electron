<template>
  <header class="TitleBar">
    <div
      class="global__wrapper"
    >
      <div class="TitleBar__container">
        <img
          :src="splatter"
          alt=""
          class="TitleBar__heading-splatter"
        >
        <div class="TitleBar__icon-container">
          <Sac
            v-if="showSac"
            class="TitleBar__icon-svg TitleBar__icon-svg--sac"
          />
          <Gear
            v-if="showGear"
            class="TitleBar__icon-svg TitleBar__icon-svg--gear"
          />
        </div>
        <h1
          class="TitleBar__heading-container"
        >
          <span class="TitleBar__heading-copy">{{ label }}</span>
        </h1>
        <button
          v-if="showOptions"
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
  import Sac from '../../assets/svgs/sac.svg';
  import Gear from '../../assets/svgs/gear.svg';
  import gearImage from '../../assets/images/Game_menu_options_icon.png';
  import splatter from '../../assets/images/splatter.png';

  export default {
    name       : 'TitleBar',
    components : { Sac, Gear },
    props      : {
      label : {
        type     : String,
        required : true
      },
      iconType : {
        type     : String,
        required : true
      },
      showOptions : {
        type    : Boolean,
        default : false
      }
    },
    data() {
      return {
        gearImage,
        splatter
      };
    },
    computed : {
      showSac() {
        return this.iconType === 'sac';
      },
      showGear() {
        return this.iconType === 'gear';
      },
      headerBackground() {
        return {
          backgroundImage : `url(${splatter})`
        };
      }
    },
    methods : {
      openOptions() {
        window.api.sendMessage('openOptions');
      }
    }
  };
</script>

<style lang='scss'>
  @function backgroundGradient($darken: 0) {
    @return linear-gradient(90deg, darken(rgba(180,124,93,1), $darken) 0%, darken(rgba(180,124,93,1), $darken) 36%, darken(rgba(180,124,93,0), $darken) 69%, darken(rgba(180,124,93,0), $darken) 81%, darken(rgba(180,124,93,1), $darken) 100%)
  }
  .TitleBar {
    position: relative;
    -webkit-app-region: drag;
    &__container {
      height: 45px;
      display: flex;
      align-items: flex-end;
      cursor: pointer;
      &:hover {
        &::before {
          background: backgroundGradient();
        }
      }
      &::before {
        z-index: -1;
        position: absolute;
        content: '';
        display: block;
        left: 0;
        bottom: 0;
        background: backgroundGradient(15);
        width: 100%;
        height: 100%;
      }
    }
    &__icon {
      &-container {
        top: 4px;
        left: 3px;
        width: 45px;
        height: 100%;
        z-index: 10;
        cursor: pointer;
        margin-right: 10px;
      }
      &-svg {
        position: relative;
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    &__heading {
      &-container {
        position: relative;
        z-index: 5;
        font-size: 28px;
        padding: 0;
        margin: 0;
        cursor: pointer;
        flex-grow: 1;
      }
      &-copy {
        position: relative;
        z-index: 5;
        color: #fcebcf;
        text-shadow: 1px 1px 1px #262417;
      }
      &-splatter {
        position: absolute;
        z-index: 3;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        opacity: 0.2;
      }
    }
    &__gear {
      &-button {
        z-index: 10;
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
        opacity: 0.8;
        &:hover {
          opacity: 1;
        }
      }
    }
  }
</style>
