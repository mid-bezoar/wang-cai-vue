type RecordItem = {
  tags: string[]
  notes: string
  type: string
  amount: number
  createdAt?: Date
}

type Tag = {
  id: string
  name: string
}

type TagListModel = {
  data: Tag[]
  fetch: () => Tag[]
  create: (name: string) => 'success' | 'duplicated' // 联合类型
  update: (id: string, name: string) => 'success' | 'not found' | 'duplicated'
  save: () => void
  remove: (id: string) => boolean
}

interface Window {
  tagList: Tag[]
  findTag: (id: string) => Tag | undefined
  createTag: (name: string) => void
  removeTag: (id: string) => boolean
  updateTag: TagListModel['update']

  recordList: RecordItem[]
  createRecord: (record: RecordItem) => void
}
