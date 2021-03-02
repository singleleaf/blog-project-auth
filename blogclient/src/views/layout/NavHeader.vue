<template>
    <div class="navs">
        <ul class="nav-ul">
            <li
                v-for="(item,i) in  this.$router.options.routes"
                @click="change(i,item.path)"
                :class="{'active':isActive===i}"
                v-if="item.meta.title "
            >

                {{item.meta.title}}
            </li>
        </ul>

    </div>
</template>
<script>
  export default {
    data() {
      return {
        isActive: 0,


      }
    },
    mounted(){
      console.log(this.$router.options.routes)
    },
    methods: {
       change(index,path){
         this.isActive=index
         this.$router.push(path)

       }

    }
  }
</script>
<style scoped lang="less">
@color:white;
@activeColor:#90d7e0;
@fontSize:13px;
.nav-ul{
  li{
   position: relative;
  display: inline-block;
  text-align: left;
  margin-right: 30px;
  padding-top: 15px;
  color: @color;
  font-size: @fontSize;
  cursor: pointer;

}
li:hover{
  color: @activeColor;
}
 .active {
  color: @activeColor
}
 .active::after{
  content: '';
  display: block;
  position: absolute;
  left: 0;
  bottom: -6px;
  height: 2px;
  width: 100%;
  background: @activeColor;

}
}



</style>
