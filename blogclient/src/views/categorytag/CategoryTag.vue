<template>
  <div class='whole-wrap'>
    <!-- <div class="head-pic"><img src="@/assets/images/pic2.jpg"
           alt=""></div> -->
    <div class="content-body">
      <p>分类</p>
      <p class="tip">请点击图标查看相应的内容</p>
      <el-row :gutter="20">

        <el-col :span="6"
                v-for="item in categoriesCount">
          <div class="grid-content "
               @click="searchByCategory(item.categoryId)">
            <div class="category-item"><label>{{item.categoryName}}</label><span>({{item.count}})</span></div>
          </div>
        </el-col>

      </el-row>
    </div>
    <div class="content-body content-body-tag">
      <p>标签</p>
      <p class="tip">请点击图标查看相应的内容</p>
      <el-row :gutter="20">
        <el-col :span="6"
                v-for="item in tagsCount">
          <div class="grid-content "
               @click="searchByTag(item.tagId)">
            <div class="tag-item"><label>{{item.tagName}}</label><span>({{item.count}})</span></div>
          </div>
        </el-col>

      </el-row>
    </div>

  </div>
</template>
<script>
import moment from 'moment'
export default {
  name: 'ArticleList',
  components: {

  },
  data (){
    return{
      categoriesCount:[],
      tagsCount:[]
    }


  },
  mounted(){
      this.getTagsAndCategories()
  },
   methods:{
    timeFormatter(cellValue) {
      return moment(new Date(cellValue)).format('YYYY-MM-DD HH:mm:ss')
    },
    //获取文章列表
      getTagsAndCategories(){
        this.axios.get('/c/getTagsAndCategories',{

        }).then(res =>{
          var data =res.data
          this.categoriesCount =data.data.categoriesCount
          this.tagsCount = data.data.tagsCount
           console.log(data.data)


        })
      },
      searchByTag(id) {
      this.$router.push(`/SearchList/2/${id}`)
    },
    searchByCategory(id) {
      // 去搜索结果页
      this.$router.push(`/SearchList/1/${id}`)
    },



   }
}
</script>
<style scoped lang="less">
@width:62.5%;
.whole-wrap{
  margin-top: 10vh;
}
.content-body{
  width: @width;
  margin: auto;
  .tip {
    margin: 30px 0px;
    color: #999;
    font-size: 12px;
}
}
.head-pic{
  width: 100%;
  height: 300px;
  overflow: hidden;
  margin-bottom: 40px;
  img{
    width: 100%;
  }
}
.category-item{
  
  position: relative;
  width: 80px;
  height: 80px;
  margin: 20px auto;
  cursor: pointer;
  color: #333;
  background-image: url('../../assets/images/border-default.png');
  background-repeat: no-repeat;
  background-size: 100%;
    
            label{
              display: block;
              padding-top: 22px;
            }
}
.category-item:hover{
  color: #0a89a3;
  background-image: url('../../assets/images/border-blue.png');

}
.content-body-tag{
  margin-top: 20px;
  position: relative;
  &::before{
    content: '';
    position: absolute;
    left: 0;
    top: -20px;
    width: 100%;
    display: block;
   height: 1px;
    content: '';
    position: absolute;
    left: 0;
    top: -20px;
    width: 100%;
    display: block;
    height: 1px;
    background: #e7e4e4;
    
  }
}
.tag-item{
  width: 80px;
    height: 80px;
    border-radius: 50%;
    border:1px solid #262626;
    color: #333;
    margin: auto;
    margin-bottom: 30px;
    cursor: pointer;
    label{
      display: block;
      padding-top: 22px;
    }
}
.tag-item:hover{
  color: #0a89a3;
   border:1px solid  #0a89a3;

}

</style>
