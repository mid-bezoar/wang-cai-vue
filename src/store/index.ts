import Vue from 'vue'
import Vuex from 'vuex'
import clone from '@/lib/clone'
import createId from '@/lib/idCreator'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    tagList: [] as Tag[]
  },
  mutations: {
    initRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[]
    },
    createRecord(state, record) {
      const record2: RecordItem = clone(record)
      record2.createdAt = new Date()
      state.recordList.push(record2)
      store.commit('saveRecords')
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList))
    },
    initTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]')
    },
    createTag(state, name: string) {
      const names = state.tagList.map((item) => item.name)
      if (names.indexOf(name) >= 0) {
        window.alert('标签名重复了')
        return 'duplicated'
      }
      const id = createId().toString()
      state.tagList.push({ id, name })
      store.commit('saveTag')
      window.alert('添加成功')
      return 'success'
    },
    saveTag(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList))
    }
    // findTag(id: string) {
    //   return this.tagList.filter((t) => t.id === id)[0]
    // },
  }
})

export default store
