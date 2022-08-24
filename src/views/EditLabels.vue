<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="right" />
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <FormItem fieldName="标签名" placeholder="请输入标签名" />
    </div>
    <div class="button-wrapper">
      <Button>删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import tagListModel from '@/models/tagListModel'
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import FormItem from '@/components/Money/FormItem.vue'

@Component({
  components: { FormItem }
})
export default class Labels extends Vue {
  created() {
    const id = this.$route.params.id
    tagListModel.fetch()
    const tags = tagListModel.data
    const tag = tags.filter((t) => t.id === id)[0]
    if (tag) {
      console.log(tag)
    } else {
      this.$router.replace('/404')
    }
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
