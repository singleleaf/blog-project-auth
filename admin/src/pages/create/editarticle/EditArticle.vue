<template>
  <div class="hello">
    <article-form :detail="detail"   />
  </div>
</template>

<script>
import ArticleForm from '@/components/articleform/Index.vue'
export default {
  name: "EditArticle",
  components:{
    ArticleForm
  },
  data(){
    return {
      topic:'编辑文章',
      detail:{}


    }
  },
  beforeRouteUpdate(to, from, next) {
    this.id = this.$route.params.id || null // id
    this.getArticleDetail()
     
},

  mounted() {
    this.getArticleDetail()
  },
  methods: {
     getArticleDetail(){
       var id = this.$route.params.id;
       this.axios.post('/getArticleDetail',{id:id}).then(res =>{
          
         if (res.status=== 200) {
            this.detail = res.data.articleDetail

          }
       })
     }
    
  },
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
