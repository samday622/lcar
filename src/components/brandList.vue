<template>
  <div class="brand-wrap">
    <div class="title">
      <span @click="closeBrand"></span>选择品牌
    </div>
    <div class="brand-list">
      <ul>
        <li>
          <div class="section">*</div>
          <div class="inner-list" @click="getBrandName('')">不限品牌</div>
        </li>
        <li v-for="(brands,key,index) in brandList">
          <div :id="'anchor-'+index" class="section">{{key}}</div>
          <div class="inner-list" v-for="brand in brands" @click="getBrandName(brand.name)">
            {{brand.name}}
          </div>
        </li>
      </ul>
    </div>
    <div class="brand-anchor">
      <ul>
        <li v-for="(brands,key,index) in brandList"  @click="goAnchor('#anchor-'+index)">{{key}}</li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss">
  @import "../style/scss/_brand.scss";
</style>
<script>
  export default {
    data () {
      return {
        data: [],
        brandList: {
          'A': [
          {name: '奥迪'},
          {name: '阿斯顿·马丁'}
          ],
          'B': [
            {name: '宝马'},
            {name: '奔驰'},
            {name: '本田'},
            {name: '别克'},
            {name: '保时捷'},
            {name: '标志'},
            {name: '比亚迪'},
            {name: '宾利'},
            {name: '奔腾'},
            {name: '宝骏'},
            {name: '北京'},
            {name: '北汽威旺'},
            {name: '北汽制造'}
          ],
          'C': [
            {name: '昌河'},
            {name: '长城'},
            {name: '长安商用'},
            {name: '长安轿车'}
          ],
          'D': [
            {name: '大众'},
            {name: '东风风行'},
            {name: '东南'},
            {name: '道奇'},
            {name: '东风小康'},
            {name: '东风风度'},
            {name: '东风风神'},
            {name: '东风良辰'}
          ],
          'F': [
            {name: '丰田'},
            {name: '福特'},
            {name: '法拉利'},
            {name: '菲亚特'},
            {name: '福田'}
          ],
          'G': [
            {name: '广汽传祺'},
            {name: 'GMC'}
          ],
          'H': [
            {name: '哈佛'},
            {name: '海马'},
            {name: '悍马'},
            {name: '华泰'},
            {name: '哈飞'},
            {name: '红旗'},
            {name: '黄海'},
            {name: '华普'}
          ],
          'J': [
            {name: '捷豹'},
            {name: 'Jeep'},
            {name: '吉利汽车'},
            {name: '江淮'},
            {name: '金杯'},
            {name: '江铃'}
          ],
          'K': [
            {name: '凯迪拉克'},
            {name: '拉莱斯勒'}
          ],
          'L': [
            {name: '路虎'},
            {name: '铃木'},
            {name: '雷克萨斯'},
            {name: '兰博基尼'},
            {name: '劳斯莱斯'},
            {name: '雷诺'},
            {name: '力帆'},
            {name: '猎豹汽车'},
            {name: '陆风'},
            {name: '林肯'}
          ],
          'M': [
            {name: '马自达'},
            {name: 'MINI'},
            {name: 'MG'},
            {name: '玛莎拉蒂'}
          ],
          'N': [
            {name: '纳智捷'}
          ],
          'O': [
            {name: '讴歌'},
            {name: '欧宝'}
          ],
          'Q': [
            {name: '起亚'},
            {name: '奇瑞'}
          ],
          'R': [
            {name: '日产'},
            {name: '荣威'},
            {name: '瑞麟'}
          ],
          'S': [
            {name: '三菱'},
            {name: '斯柯达'},
            {name: '斯巴鲁'},
            {name: 'smart'}
          ],
          'T': [
            {name: '特斯拉'}
          ],
          'W': [
            {name: '沃尔沃'},
            {name: '五菱'}
          ],
          'X': [
            {name: '现代'},
            {name: '雪佛龙'},
            {name: '雪铁龙'}
          ],
          'Y': [
            {name: '英菲尼迪'},
            {name: '一汽'},
            {name: '依维柯'}
          ],
          'Z': [
            {name: '中华'},
            {name: '众泰'}
          ]
        }
      }
    },
    props: {
      brandName: ''
    },
    mounted: function () {
    },
    methods: {
      closeBrand () {
        this.$emit('close-brand', false)
      },
      goAnchor (selector) {
        var anchor = this.$el.querySelector(selector)
        document.documentElement.scrollTop = anchor.offsetTop - 60
      },
      getBrandName (brandName) {
        this.$emit('get-brand-name', brandName)
        this.closeBrand()
      }
    }
  }
</script>
