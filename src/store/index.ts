import Vue from 'vue'
import Vuex from 'vuex'
import clone from '@/lib/clone'
import createId from '@/lib/idCreator'
import router from '@/router'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    recordList: [],
    createRecordError: null,
    createTagError: null,
    tagList: [],
    currentTag: undefined
  } as RootState,
  mutations: {
    initRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[]
    },
    createRecord(state, record: RecordItem) {
      const record2 = clone(record)
      record2.createdAt = new Date().toISOString()
      state.recordList.push(record2)
      store.commit('saveRecords')
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList))
    },
    initTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]')
      if (!state.tagList || !state.tagList.length) {
        store.commit('createTag', '衣')
        store.commit('createTag', '食')
        store.commit('createTag', '住')
        store.commit('createTag', '行')
      }
    },
    createTag(state, name: string) {
      state.createTagError = null
      const names = state.tagList.map((item) => item.name)
      if (names.indexOf(name) >= 0) {
        state.createTagError = new Error('tag name duplicated')
      } else {
        const id = createId().toString()
        state.tagList.push({ id, name })
        store.commit('saveTag')
      }
    },
    saveTag(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList))
    },
    findTag(state, id: string) {
      state.tagList.filter((t) => t.id === id)[0]
    },
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter((t) => t.id === id)[0]
    },
    updateTag(state, payload: { id: string; name: string }) {
      const { id, name } = payload
      const idList = state.tagList.map((item) => item.id)
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map((item) => item.name)
        if (names.indexOf(name) >= 0) {
          window.alert('标签名重复了')
        } else {
          const tag = state.tagList.filter((item) => item.id === id)[0]
          tag.name = name
          store.commit('saveTag')
        }
      }
    },
    removeTag(state, id: string) {
      let index = -1
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i
          break
        }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1)
        store.commit('saveTag')
        window.alert('删除成功')
        router.back()
      } else {
        window.alert('删除失败')
      }
    }
  }
})

export default store
