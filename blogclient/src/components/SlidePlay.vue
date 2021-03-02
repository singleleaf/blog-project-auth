<template>
  <div class="slides">
    <img src="@/assets/images/slide1.png"
         alt="">

  </div>
</template>

<script>
export default {
  name: 'SlidePlay',
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@width: 100%;
@height:300px;
.slides{
    width:@width;
    height: @height;
    overflow: hidden;
}
.slides >img{
    display: block;
     width:@width;
    
    
   
}
 
</style>
