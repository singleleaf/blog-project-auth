<template>
  <div class="body-wrap">
    <div class="content-wrap">
      <article-list :articleList="articleList"
                    :totalPage="total"
                    @pageChange="pageChange"></article-list>
    </div>
  </div>
</template>
<script>
import ArticleList  from  '../article/ArticleList.vue'
export default {
  name: 'SearchList',
  components:{
    ArticleList
  },
  data() {
   return {
    articleList:[],
    page: 1,
    total: 0
    }
  },
  mounted(){

    this.serchArticleList()
  },
  watch:{
     // 如果路由有变化，会再次执行该方法
     '$route':function() {
        this.serchArticleList()
    }


  },
   methods:{
    serchArticleList(){
      this.type= this.$route.params.type
      this.condition = this.$route.params.condition

      console.log(this.type)
       switch(this.type){
          case '1':
          this.searchByCategory()
          break
          case '2':
          this.searchByTag()
          break
          default:
          break
       }
    },
    searchByCategory() {
     this.axios.get('/c/searchByCategory',{
          params:{
          page: this.page,
          id: this.condition


          }

        }).then(res =>{
          var data =res.data
          this.articleList =data.data.list
          this.total = data.data.count
           console.log(this.total)


        })
    },
    searchByTag() {
     this.axios.get('/c/searchByTag',{
          params:{
          page: this.page,
          id: this.condition
          }

        }).then(res =>{
          var data =res.data
          this.articleList =data.data.list
          this.total = data.data.count
           console.log(data)


        })
    },
     // 分页
    pageChange(currPage) {
      this.page = currPage
      console.log(this.page)
       this.serchArticleList()
   }
}
}
</script>
<style scoped lang="less">
@color:#0a89a3;
@decordColor:#858585;
@width:62.5%;
.body-wrap{
  background: #f4f4f5;
  padding: 50px 0px;
   
}
.content-wrap{
  width: @width;
  margin: auto;
}
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-row{
    .bg-white{
      background: white;
      border-radius: 0px;
      overflow: hidden;
      border-bottom: 10px solid #f4f4f5;
      img{
        height: 136px;
      }
      .article-con{
        padding: 15px 10px;
        text-align: center;
          label, span{
            color: @decordColor;
            font-size: 12px;
          }
          span{
            display:block;
            margin-bottom:10px;
          }
           h6{
             font-size: 15px;
             color:@color;
             line-height: 2;
           }
           p{
             font-size: 13px;
             color: #2d3b3e;
             line-height: 1.75;
             padding-bottom: 10px;

           }
           a{
             position: relative;
             font-size: 16px;
             color: @color;
             &::after,&::before{
               content: '';
               position: absolute;
               display: block;
               width: 2px;
              height: 25px;
               background: #e1e1e1;
               top: 0px;
             }
              &::after{
                right: -10px;
              }
              &::before{
                left: -10px;
              }
           }
      }

    }

  }

.mavon-box {
   min-height: auto;
    min-width: auto;
   /deep/
   .v-note-panel.shadow{
    box-shadow: none!important;
   }

   /deep/
   .v-show-content{
    padding:0px!important;
    background: white!important;
   }
   /deep/
   .v-show-content img{
    height:120px;
    max-width: auto;

   }

}



</style>
