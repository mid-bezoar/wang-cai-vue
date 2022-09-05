let id: number = parseInt(window.localStorage.getItem('_idMax') || '0') || 0

function createId() {
  id++
  window.localStorage.setItem('_idMax', id.toString())
  const newId = uuid() + id
  return newId
}

function uuid() {
  let code = ''
  for (let i = 0; i < 6; i++) {
    const type = getRandom(1, 3)
    switch (type) {
      case 1:
        code += String.fromCharCode(getRandom(48, 57)) // 数字
        break
      case 2:
        code += String.fromCharCode(getRandom(65, 90)) // 大写字母
        break
      case 3:
        code += String.fromCharCode(getRandom(97, 122)) // 小写字母
        break
    }
  }
  return code
}

function getRandom(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min)
}

export default createId
