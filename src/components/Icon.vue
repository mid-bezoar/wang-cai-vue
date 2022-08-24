<template>
  <svg class="Icon" @click="$emit('click', $event)">
    <use :xlink:href="'#' + name" />
  </svg>
</template>

<script lang="ts">
export default {
  props: ['name'],
  name: 'Icon'
}
</script>

<style lang="scss" scoped>
.Icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
