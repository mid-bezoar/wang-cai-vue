<template>
  <Layout>
    <div class="tags" :class="{ 'tabs-hi': tags.length > 10 }">
      <router-link class="tag" v-for="tag in tags" :key="tag.id" :to="`/labels/edit/${tag.id}`">
        <span>{{ tag.name }}</span>
        <Icon name="right" />
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <Button class="createTag" @click="createTag">新建标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component'
import TagHelper from '@/mixins/tagHelper'

@Component
export default class Labels extends mixins(TagHelper) {
  get tags() {
    return this.$store.state.tagList
  }

  created() {
    this.$store.commit('initTags')
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  font-size: 16px;
  padding: 0 16px;
  > .tag {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    svg {
      color: #666;
    }
  }
}
.tabs-hi {
  height: 80%;
  overflow: auto;
}
.createTag {
  background: #767676;
  color: white;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;
  &-wrapper {
    margin-top: 44 - 16px;
    text-align: center;
    padding: 16px;
  }
}
</style>
