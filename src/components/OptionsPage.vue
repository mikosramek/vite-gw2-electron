<template>
  <div class="OptionsPage">
    <h2 class="OptionsPage__heading">
      OptionsPage
    </h2>
    <form @submit.prevent>
      <div
        v-for="(input, index) of inputs"
        :key="index"
        class="OptionsPage__input-container"
      >
        <label
          :for="input.id"
          class="OptionsPage__input-label"
        >{{ input.label }}</label>
        <input
          :id="input.id"
          v-model="input.inputValue.value"
          v-bind="input.inputBinds"
          :class="input.classes"
        >
      </div>
      <button
        type="reset"
        :disabled="isSaving"
        @click="closeOptions"
      >
        Cancel
      </button>
      <button
        type="submit"
        :disabled="isSaving"
        @click="saveOptions"
      >
        Confirm
      </button>
    </form>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name : 'OptionsPage',
    data() {
      return {
        isSaving    : false,
        inputValues : {
          apiKey : {
            label      : 'API Key',
            value      : '',
            inputBinds : {
              type : 'text'
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
              const { label, value : inputValue, inputBinds } = value;
              return {
                id         : key,
                inputValue : this.inputValues[key],
                label,
                inputBinds,
                classes    : ['OptionsPage__input-entry', `OptionsPage__input-entry--${inputBinds.type}`]
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
      }
    }
  };
</script>

<style lang='scss'>
  .OptionsPage {
    position: relative;
    &__heading {
      margin-top: 0;
    }
    &__input {
      &-container {
        display: flex;
      }
      &-label {
        margin-right: 10px;
        width: 50%;
      }
      &-entry {
        width: 50%;
      }
    }
  }
</style>
