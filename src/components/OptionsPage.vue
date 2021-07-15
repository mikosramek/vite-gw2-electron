<template>
  <div class="OptionsPage">
    <TitleBar
      label="Options"
      icon-type="gear"
    />
    <div class="global__wrapper">
      <form
        class="OptionsPage__form"
        @submit.prevent
      >
        <div
          v-for="(input, index) of inputs"
          :key="index"
          :class="input.containerClasses"
        >
          <label
            :for="input.id"
            class="OptionsPage__input-label"
          >{{ input.label }}</label>
          <div class="OptionsPage__input-entry-wrapper">
            <input
              :id="input.id"
              v-model="input.inputValue.value"
              v-bind="input.inputBinds"
              :class="input.classes"
            >
            <GenericButton
              v-if="input.showToggle"
              :on-click="() => { changeInputType(input.id) }"
              label="👁"
            />
          </div>
        </div>
        <div class="OptionsPage__input-button-container">
          <GenericButton
            label="Cancel"
            :on-click="closeOptions"
            :disabled="isSaving"
            class="OptionsPage__input-button"
          />
          <GenericButton
            label="Confirm"
            :on-click="saveOptions"
            :disabled="isSaving"
            class="OptionsPage__input-button"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import GenericButton from './Generic/GenericButton.vue';
  import TitleBar from './Generic/TitleBar.vue';
  export default {
    name       : 'OptionsPage',
    components : { TitleBar, GenericButton },
    data() {
      return {
        isSaving    : false,
        inputValues : {
          apiKey : {
            label      : 'API Key',
            value      : '',
            showToggle : true,
            inputBinds : {
              type : 'password'
            }
          },
          updateRate : {
            label      : 'Update Rate (in minutes)',
            value      : 0,
            inputBinds : {
              type : 'number',
              min  : 1,
              max  : 10
            }
          },
          transparencyPercent : {
            label      : 'Transparency Percent',
            value      : 0,
            inputBinds : {
              type : 'number',
              min  : 0,
              max  : 100
            }
          }
        }
      };
    },
    computed : {
      ...mapGetters(['allOptions']),
      inputs() {
        return Object.entries(this.inputValues)
            .map(([key, value]) => {
              const { label, value : inputValue, inputBinds, showToggle } = value;
              return {
                id               : key,
                inputValue       : this.inputValues[key],
                label,
                inputBinds,
                showToggle,
                containerClasses : [ 'OptionsPage__input-container', `OptionsPage__input-container--${inputBinds.type}` ],
                classes          : ['OptionsPage__input-entry', `OptionsPage__input-entry--${inputBinds.type}`]
              };
            });
      },
      dataToSave() {
        const dataMap = {};
        for (const [key, value] of Object.entries(this.allOptions)) {
          if (this.inputValues[key]) {
            dataMap[key] = this.inputValues[key].value;
          }
        }
        return dataMap;
      }
    },
    mounted() {
      for (const [key, value] of Object.entries(this.allOptions)) {
        if (this.inputValues[key]) {
          this.inputValues[key].value = value;
        }
      }
    },
    methods : {
      saveOptions() {
        this.isSaving = true;
        window.api.sendMessage('options:set', this.dataToSave);
        window.api.listen('options:get', () => {
          window.api.sendMessage('closeOptions');
        });
      },
      closeOptions() {
        window.api.sendMessage('closeOptions');
      },
      changeInputType(key) {
        const binds = this.inputValues[key].inputBinds;
        if (binds.type === 'password') {
          binds.type = 'text';
        }
        else {
          binds.type = 'password';
        }
      }
    }
  };
</script>

<style lang='scss'>
  .OptionsPage {
    position: relative;
    height: 100%;
    &__form {
      padding: 15px;
      background: rgba(#251d1b, 0.8);
      margin-top: -5px;
    }
    &__input {
      &-container {
        display: flex;
        flex-direction: column;
        margin-bottom: 5px;
        &--number {
          flex-direction: row;
          .OptionsPage__input-label {
            width: 65%;
          }
        }
        &--password,
        &--text {
          .OptionsPage__input-entry-wrapper {
            width: 100%;
            display: flex;
          }
          .OptionsPage__input-entry {
            flex-grow: 1;
            margin-right: 5px;
          }
        }
      }
      &-label {
        color: #fcebcf;
        font-size: 14px;
        margin-bottom: 5px;
        flex-grow: 1;
      }
      &-entry-wrapper {
        width: 20%;
      }
      &-entry {
        width: 100%;
        &--number {
          width: calc(100% - 8px);
        }
      }
      &-button-container {
        margin-top: 15px;
        display: flex;
        justify-content: flex-end;
        margin-right: 0;
      }
      &-button {
        margin-right: 10px;
        &:last-of-type {
          margin-right: 0;
        }
      }
    }
  }
</style>
