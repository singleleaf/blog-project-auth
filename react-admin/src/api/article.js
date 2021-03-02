import axios from '../axios'

const getArticleList = params => {
  return axios.get('/getArticleList', params)
}

const getArticleOptions = () => {
  return axios.get('/getArticleOptions')
}
const createArticle = params => {
  return axios.postJson('/createArticle', params)
}
const recoveryArticle = id => {
  return axios.postJson('/recoveryArticle', {
    id
  })
}
const recoveryArticleBatch = list => {
  return axios.postJson('/recoveryArticleBatch', {
    list
  })
}
const delArticle = params => {
  return axios.postJson('/delArticle', params)
}
const delArticleBatch = params => {
  return axios.postJson('/delArticleBatch', params)
}

export {
  getArticleList,
  getArticleOptions,
  createArticle,
  recoveryArticle,
  recoveryArticleBatch,
  delArticle,
  delArticleBatch
}
