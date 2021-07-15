<template>
  <button
    class="GenericButton"
    :disabled="isDisabled"
    @click="onClick"
  >
    <span class="GenericButton__label">
      {{ label }}
    </span>
  </button>
</template>

<script>
  export default {
    name  : 'GenericButton',
    props : {
      label : {
        type    : String,
        default : 'ADD A LABEL PROP BLOCKHEAD'
      },
      onClick : {
        type    : Function,
        default : () => {}
      },
      isDisabled : {
        type    : Boolean,
        default : false
      }
    }
  };
</script>

<style lang='scss'>
  .GenericButton {
    position: relative;
    cursor: pointer;
    background: #cbc2b1;
    border: 1px solid #373127;
    color: #262417;
    transition: background 0.1s ease-out;
    display: inline-block;
    padding: 4px 5px 3px;
    &:hover {
      background: lighten(#cbc2b1, 10);
    }
    &:active {
      background: darken(#cbc2b1, 10);
    }
    &:disabled {
      opacity: 0.4;
    }
  }
</style>
