<template>
  <nav class="nav">
    <router-link to="/money" class="item" active-class="selected">
      <Icon name="money" />
      记账
    </router-link>
    <router-link to="/labels" class="item" active-class="selected">
      <Icon name="label" />
      标签
    </router-link>
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="statistics" />
      统计
    </router-link>
  </nav>
</template>

<script lang="ts">
// eslint-disable-next-line no-undef
let importAll = (requireContext: __WebpackModuleApi.RequireContext) => {
  requireContext.keys().forEach(requireContext)
}
try {
  importAll(require.context('../assets/icons', true, /\.svg$/))
} catch (error) {
  console.log(error)
}

export default {
  name: 'Nav',
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/helper.scss';
nav {
  display: flex;
  flex-direction: row;
  font-size: 12px;
  @extend %outerShadow;
  > .item {
    padding: 2px 0;
    width: 33.3333%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .Icon {
      width: 30px;
      height: 30px;
    }
  }
  > .item.selected {
    color: $color-highlight;
  }
}
</style>
