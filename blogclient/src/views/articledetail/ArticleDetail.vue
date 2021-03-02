<template>
  <div class="detail-body">
    <!-- <div><img src="@/assets/images/pic1.jpg" alt=""></div> -->
    <div class="detail-wrap">
      <h6>{{article.title}}</h6>
      <span class="time">{{timeFormatter(article.createTime)}}</span>
      <div class="cate-tag-wrap">
        <span>分类:</span> <label>{{category}}</label>
        <span>标签: </span><label v-for="item in article.tagId"> {{item.tagName}}</label>
        <mavonEditor class="mavon-box"
                     codeStyle="dark"
                     :value="article.content"
                     :toolbarsFlag="toolbarsFlag"
                     :subfield="toolbarsFlag"
                     defaultOpen="preview"></mavonEditor>
        <div class="toc"></div>

      </div>

    </div>
  </div>
</template>
<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import moment from 'moment'
import { genToc } from '@/assets/js/utils.js'
export default {
  name: 'ArticleDetail',
  components:{
    mavonEditor,
  },
  data(){
    return {
       id: '',
      toolbarsFlag: false,
      article:{},
      category:''

    }
  },
  mounted(){
    this.id = this.$route.params.id
    this.getDetail(this.id)
  },
  methods:{
    getDetail(id){
      this.axios.post('/c/getArticleDetail',
          {id:id }

      ).then(res =>{
          var data =res.data
          this.article = data.data
          this.category = data.data.categoryId.categoryName
          // 生成目录
          this.$nextTick(() => {
            genToc('.v-show-content', '.toc')
          })
           console.log(this.article)
        })
    },
     timeFormatter(cellValue) {
      return moment(new Date(cellValue)).format('YYYY-MM-DD HH:mm:ss')
    }

  }


}
</script>
<style scoped lang="less">
@width:62.5%;
@font-size:12px;
.detail-body{
     background: #f4f4f5; 
      padding-top: 10vh;
}
.detail-wrap{
   width: @width;
   margin:auto;
   background-color: white;
   padding: 15px;
   h6{
     margin-bottom: 20px;
   }
   .time{
     color:#999;
     font-size: @font-size;
   }
   .cate-tag-wrap{
     color: #666;
     font-size:  @font-size;
     margin:10px 0px;
     span{
       margin-left: 40px;
       margin-right:4px;
     }
     label{
       display: inline-block;
       padding: 2px 6px;
       margin-right: 6px;
       border-radius: 4px;
       background: #f6f6f6;
       border: 1px solid #0a89a3;
       color: #0a89a3;

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
