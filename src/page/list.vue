
<template>
  <div class="car-wrap" >
    <div class="search-wrap">
      <div class="search">
        <span>搜索想买的车</span>
      </div>
      <ul class="choice-list clearfix" >
        <li @click="showSort" :class="sort ? 'active':''"><a href="javascript:void(0)">{{sortMenu.list[sortMenu.ind]}}</a>
          <!--<transition name="bounce" enter-active-class="bounceInLeft" leave-active-class="bounceOutRight">-->
          <el-collapse-transition>
            <ul class="menu-sort"  v-show="sort">
              <li v-for="(list, index) in sortMenu.list" :class="{'active':sortMenu.ind === index}" @click="changeSortBgc(index)">{{list}}</li>
            </ul>
          </el-collapse-transition>
          <!--</transition>-->
        </li>
        <li @click="showBrand"><a href="javascript:void(0)">{{brandName}}</a></li>
        <li @click="showPrice" :class="price ? 'active':''"><a href="javascript:void(0)">{{priceMenu.list[priceMenu.ind].name}}</a>
        <!--<transition name="bounce" enter-active-class="bounceInLeft" leave-active-class="bounceOutRight">-->
          <el-collapse-transition>
            <ul class="menu-price" v-show="price">
              <li v-for="(list, index) in priceMenu.list" :class="{'active':priceMenu.ind === index}" @click="changePriceBgc(index,list.startPrice,list.endPrice)">{{list.name}}</li>
            </ul>
          </el-collapse-transition>
        <!--</transition>-->
        </li>
        <li><a href="#">筛选</a></li>
      </ul>
    </div>
    <div class="car-list">
      <section class="clearfix" v-for="row in data.rows">
        <router-link :to="'/detail/'+row.applyId">
          <div><img :src="row.imgUrl" alt=""></div>
          <div>
            <div class="title">{{row.carName}}</div>
            <div class="tips">{{row.licensingTime}}上牌  |  {{row.mileage}}万公里</div>
            <div class="price"><span>隆筹好价：</span><span>{{row.currentPrice}}万</span></div>
          </div>
        </router-link>
      </section>
    </div>
    <transition name="el-fade-in">
    <div class="overlayer" v-show="fixed" @click.self = "handleClose" @touchmove.prevent >
    </div>
    </transition>
    <brand-list :brand="brand" v-on:get-brand-name="getBrandName" v-on:close-brand="closeBrand" v-show="brand"></brand-list>
  </div>
</template>
<style lang="scss">
  @import "../style/scss/_list.scss";
</style>
<script>
  import brandList from '../components/brandList.vue'
  export default {
    components: {brandList},
    data () {
      return {
        data: [],
        sort: false,
        price: false,
        brand: false,
        fixed: false,
        brandName: '品牌',
        sortMenu: {
          list: ['默认排序', '价格最高', '价格最低', '车龄最短', '里程最少'],
          ind: 0
        },
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
        },
        term: {
          pageIndex: 1,
          pageSize: 5,
          carBelongType: 1,
          brandName: '',
          startPrice: '',
          endPrice: '',
          carAge: '',
          carType: '',
          mileage: '',
          gearbox: '',
          discharge: '',
          carColor: '',
          morePrice: '',
          lessPrice: '',
          lessCarAge: '',
          leastMileage: ''
        }
      }
    },
    mounted: function () {
      this.getCarList(this.term)
    },
    methods: {
      showSort: function () {
        this.sort = !this.sort
        this.price = false
        if (this.sort) {
          this.fixed = true
        } else {
          this.fixed = false
        }
      },
      showPrice: function () {
        this.sort = false
        this.price = !this.price
        if (this.price) {
          this.fixed = true
        } else {
          this.fixed = false
        }
      },
      showBrand () {
        this.sort = false
        this.price = false
        this.fixed = false
        this.brand = true
      },
      closeBrand (brand) {
        this.brand = brand
      },
      handleClose: function () {
        this.fixed = false
        this.sort = false
        this.price = false
      },
      changeSortBgc: function (index) {
        this.sortMenu.ind = index
        if (index === 0) {
          this.term.morePrice = ''
          this.term.lessPrice = ''
          this.term.lessCarAge = ''
          this.term.leastMileage = ''
        } else if (index === 1) {
          this.term.morePrice = 1
          this.term.lessPrice = ''
          this.term.lessCarAge = ''
          this.term.leastMileage = ''
        } else if (index === 2) {
          this.term.morePrice = ''
          this.term.lessPrice = 1
          this.term.lessCarAge = ''
          this.term.leastMileage = ''
        } else if (index === 3) {
          this.term.morePrice = ''
          this.term.lessPrice = ''
          this.term.lessCarAge = ''
          this.term.leastMileage = ''
        } else if (index === 4) {
          this.term.morePrice = ''
          this.term.lessPrice = ''
          this.term.lessCarAge = ''
          this.term.leastMileage = 1
        }
        this.getCarList()
      },
      changePriceBgc: function (index, startPrice, endPrice) {
        this.priceMenu.ind = index
        this.term.pageIndex = 1
        this.term.startPrice = startPrice
        this.term.endPrice = endPrice
        this.getCarList()
      },
      getBrandName (brandName) {
        if (brandName !== '') {
          this.brandName = brandName
          this.term.brandName = brandName
        } else {
          this.brandName = '品牌'
          this.term.brandName = ''
        }
        this.term.pageIndex = 1
        this.getCarList()
      },
      getCarList: function (term) {
        this.$ajax({
          method: 'post',
          url: '/buy/list',
          data: this.$qs.stringify(this.term)
        })
        .then(function (response) {
          this.data = response.data
          console.log(this.data)
        }.bind(this))
        .catch(function (error) {
          console.log(error)
        })
      }
    }
  }
</script>
