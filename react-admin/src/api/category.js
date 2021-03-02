import axios from '../axios'

const getCategoryList = page => {
  return axios.get('/getCategoryList', {
    page
  })
}
const createCategory = categoryName => {
  return axios.postJson('/createCategory', {
    categoryName
  })
}
const modifyCategory = (id, categoryName) => {
  return axios.postJson('/modifyCategory', {
    id,
    categoryName
  })
}
const delCategory = id => {
  return axios.postJson('/delCategory', {
    id
  })
}

export { getCategoryList, createCategory, modifyCategory, delCategory }
