<template>
  <div class="filter-wrap">
    <div class="title">
      <span @click="closeFilter"></span>高级筛选
    </div>
    <div class="filter-list">
      <div class="f-brand">
        <div class="clearfix">
          <span class="brand-title fl">品牌</span>
          <span class="brand-name fr">不限品牌</span>
        </div>
      </div>
      <div class="f-li">
        <div class="filter-title">价格</div>
        <ul class="clearfix">
          <li v-for="(list, index) in priceMenu.list" :class="{'active':priceMenu.ind === index}" @click="changePriceBgc(index,list.startPrice,list.endPrice)"><div>{{list.name}}</div></li>
        </ul>
      </div>
      <div class="f-age">
        <div class="clearfix filter-title">
          <span class="fl">车龄<em>(年)</em></span>
          <span class="fr">0-3年</span>
        </div>
        <div class="slider">
          <el-slider
            v-model="carAgeMenu"
            range
            show-stops="true"
            show-tooltip="true"
            :max="6">
          </el-slider>
          <ul class="clearfix">
            <li>0</li>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
          </ul>
        </div>
      </div>
      <div class="f-age">
        <div class="clearfix filter-title">
          <span class="fl">里程<em>(万公里)</em></span>
          <span class="fr">0-10万公里</span>
        </div>
        <div class="slider">
          <el-slider
            v-model="mileageMenu"
            range
            show-stops="true"
            show-tooltip="true"
            :max="5">
          </el-slider>
          <ul class="ul-mileage  clearfix">
            <li>0</li>
            <li>2</li>
            <li>4</li>
            <li>6</li>
            <li>8</li>
            <li>10</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  @import "../style/scss/_filter.scss";
</style>
<script>
  export default {
    data () {
      return {
        data: [],
        carAgeMenu: [0,3],
        mileageMenu: [0, 1],
        priceMenu: {
          list: [
            {name: '全部', startPrice: '', endPrice: ''},
            {name: '5万以内', startPrice: 0, endPrice: 5},
            {name: '5-10万', startPrice: 5, endPrice: 10},
            {name: '10-15万', startPrice: 10, endPrice: 15},
            {name: '15-20万', startPrice: 15, endPrice: 20},
            {name: '20-35万', startPrice: 20, endPrice: 35},
            {name: '35-50万', startPrice: 35, endPrice: 50},
            {name: '50万以上', startPrice: 50, endPrice: ''}
          ],
          ind: 0
        }
      }
    },
    props: {
      brandName: ''
    },
    mounted: function () {
    },
    methods: {
      closeFilter () {

      }
    }
  }
</script>
