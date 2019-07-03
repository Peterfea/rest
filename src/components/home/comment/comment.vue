<template>
  <div>
    <ratings :seller="seller"></ratings>
    
  </div>
</template>

<script>
import ratings from '../../ratings/ratings'
export default {
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    ratings
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
