<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="right" @click="goBack" />
      <span class="title">编辑标签</span>
      <span class="rightIcon" />
    </div>
    <div class="form-wrapper">
      <FormItem :value="currentTag && currentTag.name" @update:value="update" fieldName="标签名" placeholder="请输入标签名" />
    </div>
    <div class="button-wrapper">
      <Button @click="remove">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import FormItem from '@/components/Money/FormItem.vue'

@Component({
  components: { FormItem }
})
export default class Labels extends Vue {
  get currentTag() {
    return this.$store.state.currentTag
  }

  created() {
    this.$store.commit('initTags')
    this.$store.commit('setCurrentTag', this.$route.params.id)
    if (!this.currentTag) {
      this.$router.replace('/404')
    }
  }

  update(name: string) {
    if (this.currentTag) {
      this.$store.commit('updateTag', { id: this.currentTag.id, name })
    }
  }

  remove() {
    if (this.currentTag) {
      this.$store.commit('removeTag', this.currentTag.id)
    }
  }

  goBack() {
    this.$router.back()
  }
}
</script>

<style lang="scss" scoped>
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > .leftIcon {
    transform: rotateY(180deg);
    width: 22px;
    height: 22px;
  }
  > .rightIcon {
    width: 22px;
    height: 22px;
  }
}
.form-wrapper {
  margin-top: 8px;
  background: white;
}
.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44 - 16px;
}
</style>
