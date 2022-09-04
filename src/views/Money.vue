<template>
  <Layout class-prefix="layout" ref="layout" :style="{ height: h + 'px' }">
    <NumberPad :value.sync="record.amount" @submit="saveRecord" />
    <Tabs :data-source="typeList" :value.sync="record.type" />
    <div class="notes">
      <FormItem fieldName="备注" placeholder="在这里输入备注" :value.sync="record.notes" />
    </div>
    <Tags :value.sync="record.tags" />
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import NumberPad from '@/components/Money/NumberPad.vue'
import FormItem from '@/components/Money/FormItem.vue'
import Tags from '@/components/Money/Tags.vue'
import { Component } from 'vue-property-decorator'
import Tabs from '../components/Tabs.vue'
import typeList from '@/constants/typeList'

@Component({
  components: { Tags, FormItem, NumberPad, Tabs },
  computed: {
    recordList() {
      return this.$store.state.recordList
    }
  }
})
export default class Money extends Vue {
  h = document.body.clientHeight
  record: RecordItem = {
    tags: [],
    type: '-',
    notes: '',
    amount: 0
  }

  typeList = typeList

  created() {
    this.$store.commit('initRecords')
  }

  saveRecord() {
    if (!this.record.tags || !this.record.tags.length) {
      return window.alert('请至少选择应该')
    }
    this.$store.commit('createRecord', this.record)
    if (this.$store.state.createRecordError === null) {
      window.alert('已保存')
      this.record.notes = ''
    }
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.notes {
  padding: 12px 0;
}
</style>
