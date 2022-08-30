<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="typeList" :value.sync="type" />
    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval" />
    <div>
      <ol>
        <li v-for="(group, index) in result" :key="index">
          {{ group.title }}
          <ol>
            <li v-for="item in group.items" :key="item.id">
              {{ item.amount }}
            </li>
          </ol>
        </li>
      </ol>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import Tabs from '@/components/Tabs.vue'
import intervalList from '@/constants/intervalList'
import typeList from '@/constants/typeList'

@Component({
  components: { Tabs }
})
export default class Statistics extends Vue {
  get recordList() {
    return (this.$store.state as RootState).recordList
  }

  get result() {
    const { recordList } = this
    type HashTableValue = { title: string; items: RecordItem[] }
    const hashTable: { [key: string]: HashTableValue } = {}
    for (let i = 0; i < recordList.length; i++) {
      const [date] = recordList[i].createdAt!.split('T')
      hashTable[date] = hashTable[date] || { title: date, items: [] }
      hashTable[date].items.push(recordList[i])
    }
    return hashTable
  }

  created() {
    this.$store.commit('initRecords')
  }

  type = '-'
  typeList = typeList
  interval = 'day'
  intervalList = intervalList
}
</script>

<style lang="scss" scoped>
::v-deep {
  .type-tabs-item {
    background: white;
    &.selected {
      background: #c4c4c4;
      &::after {
        display: none;
      }
    }
  }
  .interval-tabs-item {
    height: 48px;
  }
}
</style>
