import axios from '../axios'

const getTagList = page => {
  return axios.get('/getTagList', {
    page
  })
}
const createTag = tagName => {
  return axios.postJson('/createTag', {
    tagName
  })
}
const modifyTag = (id, tagName) => {
  return axios.postJson('/modifyTag', {
    id,
    tagName
  })
}
const delTag = id => {
  return axios.postJson('/delTag', {
    id
  })
}

export { getTagList, createTag, modifyTag, delTag }
