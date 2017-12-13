
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
        <li @click="showPrice" :class="price ? 'active':''"><a href="javascript:void(0)">{{priceMenu.list[priceMenu.ind].name=='全部'?'价格':priceMenu.list[priceMenu.ind].name}}</a>
        <!--<transition name="bounce" enter-active-class="bounceInLeft" leave-active-class="bounceOutRight">-->
          <el-collapse-transition>
            <ul class="menu-price" v-show="price">
              <li v-for="(list, index) in priceMenu.list" :class="{'active':priceMenu.ind === index}" @click="changePriceBgc(index,list.startPrice,list.endPrice)">{{list.name}}</li>
            </ul>
          </el-collapse-transition>
        <!--</transition>-->
        </li>
        <li @click="showFilter"><a href="#">筛选</a></li>
      </ul>
    </div>
    <div class="car-list" v-show="carList">
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
    <!-- 高级筛选 -->
    <transition name="el-zoom-in-top">
      <div class="filter-wrap" v-show="filter">
        <div class="title">
          <span @click="closeFilter"></span>高级筛选
        </div>
        <div class="filter-list">
          <div class="f-brand">
            <div class="clearfix" @click="showBrand">
              <span class="brand-title fl">品牌</span>
              <span class="brand-name fr">{{filterBrandName}}</span>
            </div>
          </div>
          <div class="f-li">
            <div class="filter-title">价格</div>
            <ul class="clearfix">
              <li v-for="(list, index) in priceFilterMenu.list" :class="{'active':priceFilterMenu.ind === index}" @click="changePriceBgc(index,list.startPrice,list.endPrice)"><div>{{list.name}}</div></li>
            </ul>
          </div>
          <div class="f-age">
            <div class="clearfix filter-title">
              <span class="fl">车龄<em>(年)</em></span>
              <span class="fr">{{carAgeMenu[0]}}-{{carAgeMenu[1]}}年</span>
            </div>
            <div class="slider">
              <el-slider
                v-model="carAgeMenu"
                range
                show-stops
                show-tooltip
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
          <div class="f-li">
            <div class="filter-title">里程</div>
            <ul class="clearfix">
              <li v-for="(list, index) in mileageMenu.list" :class="{'active':mileageMenu.ind === index}" @click="changeMileageBgc(index,list.key)"><div>{{list.name}}</div></li>
            </ul>
          </div>
          <div class="f-li">
            <div class="filter-title">排放</div>
            <ul class="clearfix">
              <li v-for="(list, index) in dischargeMenu.list" :class="{'active':dischargeMenu.ind === index}" @click="changeDischargeBgc(index,list.key)"><div>{{list.name}}</div></li>
            </ul>
          </div>
          <div class="f-li">
            <div class="filter-title">变速箱</div>
            <ul class="clearfix">
              <li v-for="(list, index) in gearboxMenu.list" :class="{'active':gearboxMenu.ind === index}" @click="changeGearboxBgc(index,list.key)"><div>{{list.name}}</div></li>
            </ul>
          </div>
          <div class="f-li">
            <div class="filter-title">车型</div>
            <ul class="clearfix">
              <li v-for="(list, index) in carTypeMenu.list" :class="{'active':carTypeMenu.ind === index}" @click="changeCarTypeBgc(index,list.key)"><div>{{list.name}}</div></li>
            </ul>
          </div>
          <div class="f-li mb">
            <div class="filter-title">颜色</div>
            <ul class="clearfix">
              <li v-for="(list, index) in carColor.list" :class="{'active':carColor.ind === index}" @click="changeCarColorBgc(index,list.key)"><div>{{list.name}}</div></li>
            </ul>
          </div>
        </div>
        <div class="filter-btn">
          <div class="reset-btn fl" @click="resetFilter">重置</div>
          <div class="search-btn fr" @click="getFilterCarList">查看车源</div>
        </div>
      </div>
    </transition>
    <transition name="el-zoom-in-top">
      <brand-list :brand="brand" v-on:get-brand-name="getBrandName" v-on:close-brand="closeBrand" v-show="brand"></brand-list>
    </transition>
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
        carList: true,
        brandName: '品牌',
        filter: false,
        filterBrandName: '不限品牌',
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
        priceFilterMenu: {
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
        carAgeMenu: [0, 3],
        mileageMenu: {
          list: [
            {name: '不限', key: ''},
            {name: '1万公里以内', key: '1'},
            {name: '3万公里以内', key: '2'},
            {name: '5万公里以内', key: '3'},
            {name: '5万公里以上', key: '4'}
          ],
          ind: 0
        },
        dischargeMenu: {
          list: [
            {name: '不限', key: ''},
            {name: '国五（欧Ⅴ）', key: '国五'},
            {name: '国四（欧Ⅳ）', key: '国四'},
            {name: '国三（欧Ⅲ）', key: '国三'},
            {name: '国二（欧Ⅱ）', key: '国二'},
            {name: '国一（欧Ⅰ）', key: '国一'}
          ],
          ind: 0
        },
        gearboxMenu: {
          list: [
            {name: '不限', key: ''},
            {name: '自动', key: '自动'},
            {name: '手动', key: '手动'}
          ],
          ind: 0
        },
        carTypeMenu: {
          list: [
            {name: '全部', key: ''},
            {name: '微小型车', key: '微小型车'},
            {name: '紧凑型车', key: '紧凑型车'},
            {name: '中型车', key: '中型车'},
            {name: '中大型车', key: '中大型车'},
            {name: 'SUV', key: 'SUV'},
            {name: 'MPV', key: 'MPV'},
            {name: '跑车', key: '跑车'}
          ],
          ind: 0
        },
        carColor: {
          list: [
            {name: '全部', key: ''},
            {name: '黑色', key: '黑色'},
            {name: '白色', key: '白色'},
            {name: '深灰', key: '深灰'},
            {name: '银灰', key: '银灰'},
            {name: '红色', key: '红色'},
            {name: '蓝色', key: '蓝色'},
            {name: '绿色', key: '绿色'},
            {name: '黄色', key: '黄色'},
            {name: '香槟', key: '香槟'},
            {name: '紫色', key: '紫色'},
            {name: '粉红', key: '粉红'},
            {name: '其他', key: '其他'}
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
      showSort () {
        this.sort = !this.sort
        this.price = false
        if (this.sort) {
          this.fixed = true
        } else {
          this.fixed = false
        }
      },
      showPrice () {
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
        this.carList = false
        this.brand = true
      },
      showFilter () {
        this.sort = false
        this.price = false
        this.fixed = false
        this.brand = false
        this.carList = false
        this.filter = true
      },
      closeBrand (brand) {
        this.brand = brand
        this.carList = true
      },
      closeFilter () {
        this.filter = false
        this.carList = true
      },
      handleClose () {
        this.fixed = false
        this.sort = false
        this.price = false
      },
      changeSortBgc (index) {
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
      changePriceBgc (index, startPrice, endPrice) {
        this.term.pageIndex = 1
        this.term.startPrice = startPrice
        this.term.endPrice = endPrice
        if (this.filter) {
          this.priceFilterMenu.ind = index
        } else {
          this.priceMenu.ind = index
          this.getCarList()
        }
      },
      changeMileageBgc (index, key) {
        this.term.mileage = key
        this.mileageMenu.ind = index
      },
      changeDischargeBgc (index, key) {
        this.term.discharge = key
        this.dischargeMenu.ind = index
      },
      changeGearboxBgc (index, key) {
        this.term.gearbox = key
        this.gearboxMenu.ind = index
      },
      changeCarTypeBgc (index, key) {
        this.term.carType = key
        this.carTypeMenu.ind = index
      },
      changeCarColorBgc (index, key) {
        this.term.carColor = key
        this.carColor.ind = index
      },
      getBrandName (brandName) {
        if (this.filter) {
          if (brandName !== '') {
            this.filterBrandName = brandName
            this.term.brandName = brandName
          } else {
            this.filterBrandName = '不限品牌'
            this.term.brandName = brandName
          }
        } else {
          if (brandName !== '') {
            this.brandName = brandName
            this.term.brandName = brandName
          } else {
            this.brandName = '品牌'
            this.term.brandName = ''
          }
          this.term.pageIndex = 1
          this.getCarList()
        }
      },
      getCarList (term) {
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
      },
      resetFilter () {
        this.filterBrandName = '不限品牌'
        this.priceFilterMenu.ind = 0
        this.carAgeMenu = [0, 3]
        this.mileageMenu.ind = 0
        this.dischargeMenu.ind = 0
        this.gearboxMenu.ind = 0
        this.carTypeMenu.ind = 0
        this.carColor.ind = 0

        this.term.brandName = ''
        this.term.startPrice = ''
        this.term.endPrice = ''
        this.term.mileage = ''
        this.term.discharge = ''
        this.term.gearbox = ''
        this.term.carType = ''
        this.term.carColor = ''
      },
      getFilterCarList () {
        this.filter = false
        this.carList = true
        this.getCarList()
      },
      formatMileage (val) {
        return val * 2
      }
    }
  }
</script>
