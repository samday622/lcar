<template>
  <div class="detail-wrap lc-title">
    <div class="title">
      <span @click="goHistory"></span>车辆详情
    </div>
    <div class="detial-info">
      <swiper :options="swiperOption">
        <swiper-slide v-for="carImg in data.carImgs"><img :src="carImg.imgPath"></swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <div class="car-info">
        <div class="car-title">{{data.carBase.brandName + ' ' + data.carBase.modelYear + ' ' + data.carBase.displacement + ' ' + data.carBase.sellName}}</div>
        <div class="car-news">{{data.carBase.licensingTime}}上牌 <em>|</em> {{data.carBase.mileage}}万公里 </div>
        <div class="car-price">隆筹好价：<span>{{data.carBase.currentPrice}}万</span></div>
      </div>
      <div class="car-detail-info">
        <div class="car-detail-title">
          <div>车辆信息</div>
          <em></em>
        </div>
        <div class="clearfix"><span class="fl">看车城市</span><span class="fr"></span></div>
        <div class="clearfix"><span class="fl">初次上牌</span><span class="fr"></span></div>
        <div class="clearfix"><span class="fl">表显里程</span><span class="fr"></span></div>
        <div class="clearfix"><span class="fl">排量</span><span class="fr"></span></div>
        <div class="clearfix"><span class="fl">排放</span><span class="fr"></span></div>
        <div class="clearfix"><span class="fl">变速箱</span><span class="fr"></span></div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  @import "../style/scss/_detail.scss";
</style>
<script>
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    data () {
      return {
        data: [],
        swiperOption: {
          pagination: {
            el: '.swiper-pagination',
            type: 'fraction'
          },
          // some swiper options...
        }
      }
    },
    components: {
      swiper,
      swiperSlide
    },
    mounted: function () {
      this.getCarInfo()
    },
    methods: {
      getCarInfo () {
        var jsonVal = {}
        jsonVal.carBaseId = this.$route.params.id
        jsonVal.productType = 1
        this.$ajax({
          method: 'post',
          url: '/buy/carDetails',
          data: this.$qs.stringify(jsonVal)
        })
          .then(function (response) {
            this.data = response.data
          }.bind(this))
          .catch(function (error) {
            console.log(error)
          })
      },
      goHistory () {
        this.$router.go(-1)
      }
    }
  }
</script>
