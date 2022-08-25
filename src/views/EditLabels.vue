<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="right" @click="goBack" />
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <FormItem :value="tag && tag.name" @update:value="update" fieldName="标签名" placeholder="请输入标签名" />
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
import store from '@/store/index2'

@Component({
  components: { FormItem }
})
export default class Labels extends Vue {
  tag?: Tag = undefined

  created() {
    this.tag = store.findTag(this.$route.params.id)
    if (!this.tag) {
      this.$router.replace('/404')
    }
  }

  update(name: string) {
    if (this.tag) {
      store.updateTag(this.tag.id, name)
    }
  }

  remove() {
    if (this.tag) {
      if (store.removeTag(this.tag.id)) {
        this.goBack()
      } else {
        window.alert('删除失败')
      }
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
