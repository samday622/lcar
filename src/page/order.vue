<template>
  <div class="order-wrap lc-title">
    <div class="title">
      <span @click="goHistory"></span>预约看车
    </div>
    <div class="order-list">
      <div class="order-banner">
        <img src="../assets/head-banner.png" width="100%" alt="">
      </div>
      <div class="order-explain">
        <h3>预约说明</h3>
        <div>【隆筹好车】线下高档展厅连锁体验店可以通过微信公众号实现在线预约功能，让您享受轻松买车与极速卖车服务。1对1定制免费服务，快来预约我们吧！</div>
      </div>
      <el-form :model="orderForm" :label-position="'top'" :rules="rules" ref="orderForm">
        <el-form-item label="联系人" prop="name">
          <el-input v-model="orderForm.name" placeholder="请输入联系人"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="orderForm.phone" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="预约日期" prop="date">
          <el-date-picker
            v-model="orderForm.date"
            type="date"
            placeholder="请选择预约日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="预约时间" prop="time">
          <el-time-select
            v-model="orderForm.time"
            :picker-options="{
              start: '08:30',
              step: '00:15',
              end: '18:30'
            }"
            placeholder="请选择预约时间">
          </el-time-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入备注"
            v-model="orderForm.remark">
          </el-input>
        </el-form-item>
        <div class="sell-btn-wrap">
          <a href="javascript:void(0)" class="sell-car-btn" @click="submitForm('orderForm')">提交预约</a>
        </div>
      </el-form>
    </div>
  </div>
</template>
<style lang="scss" type="text/scss" >
  @import "../style/base/_mixin.scss";
  .order-wrap {
    background: $Bg;
    min-height: 100vh;
    .order-list{
      margin-top:pxToRem(90);
    }
    .order-explain{
      background: $Bg2;
      h3{
        line-height: pxToRem(80);
        background: $BaseC;
        text-align: center;
        font-size: pxToRem($FontSize6);
        font-weight: normal;
      }
      div{
        font-size: pxToRem($FontSize2);
        text-indent: 2rem;
        padding:pxToRem(20);
      }
      margin-bottom: pxToRem(20);
    }
    .el-form{
      background: $Bg2;
      padding-bottom: 3rem;
    }
    .el-form-item{
      background: $Bg2;
      padding: pxToRem(20);
      margin-bottom: -(pxToRem(20));
    }
    .el-date-editor.el-input, .el-date-editor.el-input__inner{
      width: 100%;
    }
    .el-form--label-top .el-form-item__label{
      padding:0;
    }
    .el-select {
      display: inline-block;
      position: relative;
      width: 100%;
    }
    .sell-btn-wrap{
      width: 100%;
      text-align: center;
      margin-top:pxToRem(50);
      .sell-car-btn{
        width: 50%;
        line-height: pxToRem(90);
        font-size: pxToRem($FontSize5);
        background: $BaseC;
        display: inline-block;
        text-align: center;
        border-radius: pxToRem(45);
      }
    }
  }
</style>
<script>
  export default {
    data () {
      return {
        data: {},
        seriesIndex: '',
        seriesList: {},
        brandName: '',
        seriesName: '',
        orderForm: {
          name: '',
          phone: '',
          date: '',
          time: '',
          remark: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          phone: [
            { required: true, pattern: /^(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/, message: '手机号格式错误', trigger: 'blur' }
          ],
          date: [
            { required: true, message: '请选择预约日期', trigger: 'change' }
          ],
          time: [
            { required: true, message: '请选择预约时间', trigger: 'change' }
          ]
        }
      }
    },
    mounted: function () {
    },
    methods: {
      goHistory () {
        this.$router.go(-1)
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$ajax({
              method: 'post',
              url: '/weixin/orderCar',
              data: this.$qs.stringify(this.orderForm)
            })
              .then(function (response) {
                debugger
                if (response.data.errorCode === 0) {
                  alert('预约成功')
                } else {
                  alert('预约失败')
                }
              })
              .catch(function (error) {
                console.log(error)
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>
