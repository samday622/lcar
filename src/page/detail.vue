<template>
  <div class="detail-wrap lc-title">
    <div class="title">
      <span @click="goHistory"></span>车辆详情
    </div>
    <div class="detial-info">
      <swiper :options="swiperOption">
        <swiper-slide v-for="carImg in data.carImgs" :key="carImg.id"><img :src="carImg.imgPath"></swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <div class="car-info">
        <div class="car-title">{{data.carBase.brandName + ' ' + data.carBase.modelYear + ' ' + data.carBase.displacement + data.carBase.displacementUnit + ' ' + data.carBase.sellName}}</div>
        <div class="car-news">{{data.carBase.licensingTime + '上牌'}} <em>|</em> {{data.carBase.mileage + '万公里'}} </div>
        <div class="car-price">隆筹好价：<span>{{data.carBase.currentPrice + '万'}}</span></div>
      </div>
      <div class="car-detail-info">
        <div class="car-detail-title">
          <div>车辆信息</div>
          <em></em>
        </div>
        <div class="car-detail-list clearfix"><span class="fl">看车城市</span><span class="fr">{{data.carBase.carBelong}}</span></div>
        <div class="car-detail-list clearfix"><span class="fl">初次上牌</span><span class="fr">{{data.carBase.licensingTime}}</span></div>
        <div class="car-detail-list clearfix"><span class="fl">表显里程</span><span class="fr">{{data.carBase.mileage + '万公里'}}</span></div>
        <div class="car-detail-list clearfix"><span class="fl">排量</span><span class="fr">{{data.carBase.displacement + data.carBase.displacementUnit}}</span></div>
        <div class="car-detail-list clearfix"><span class="fl">排放</span><span class="fr">{{data.carBase.emissionStandard}}</span></div>
        <div class="car-detail-list clearfix"><span class="fl">变速箱</span><span class="fr">{{data.carBase.gearboxType}}</span></div>
      </div>
      <div class="car-detail-info">
        <div class="car-detail-title">
          <div>车辆描述</div>
          <em></em>
        </div>
        <div class="car-description" v-html="data.applyCar.remark"></div>
      </div>
      <ul class="car-img-list">
        <li v-for="carImg in data.carImgs" :key="carImg.id"><img class="lazy-img-fadein" v-lazy="carImg.imgPath" alt=""></li>
      </ul>
    </div>
    <div class="detail-btn">
        <a href="tel:021-52686180,8070" class="phone-btn fl">联系客服</a>
        <a class="order-btn fr">预约到店</a>
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
        data: {
        },
        swiperOption: {
          pagination: {
            el: '.swiper-pagination',
            type: 'fraction'
          }
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
