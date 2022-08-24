<template>
  <div>
    <label class="formItem">
      <span class="name">{{ fieldName }}</span>
      <input type="text" :value="value" @input="onValueChanged($event.target.value)" :placeholder="placeholder" />
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

@Component
export default class FormItem extends Vue {
  @Prop({ default: '' }) readonly value!: string
  @Prop({ required: true }) readonly fieldName!: string
  @Prop() placeholder?: string

  @Watch('value')
  onValueChanged(value: string) {
    this.$emit('update:value', value)
  }
}
</script>

<style lang="scss" scoped>
.formItem {
  font-size: 14px;
  display: block;
  padding-left: 14px;
  display: flex;
  align-items: center;
  input {
    height: 40px;
    flex: 1;
    background: transparent;
    border: none;
    padding: 0 16px;
  }
}
</style>
