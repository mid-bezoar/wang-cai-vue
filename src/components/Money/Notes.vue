<template>
  <div>
    <label class="notes">
      <span class="name">{{ fieldName }}</span>
      <input type="text" v-model="value" :placeholder="placeholder" />
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

@Component
export default class Notes extends Vue {
  value = ''

  @Prop({ required: true }) readonly fieldName!: string
  @Prop() placeholder?: string

  @Watch('value')
  onValueChanged(value: string) {
    this.$emit('update:value', value)
  }
}
</script>

<style lang="scss" scoped>
.notes {
  font-size: 14px;
  background: #f5f5f5;
  display: block;
  padding-left: 14px;
  display: flex;
  align-items: center;
  input {
    height: 64px;
    flex: 1;
    background: transparent;
    border: none;
    padding: 0 16px;
  }
}
</style>
