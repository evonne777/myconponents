<!--  -->
<template>
  <div>
    <UciForm ref="ycldata" @showData="handleSubmit">
      <UciInput
      name="name"
      label="姓名"
      :rules="[
      'required',
      { min: 6, message: '密码不能少于2位' },
      { max: 8, message: '密码不能多于8位' }
    ]"
    />
    </UciForm>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ycldata: {}
    }
  },
  methods: {
    handleSubmit(data) {
      console.log(data)
    },
    validateAge(rule, value, callback) {
      if (!value) {
        callback();
        return;
      }
      const num = Number(value);
      if (isNaN(num)) {
        callback('请输入有效数字');
      } else if (num < 0) {
        callback('年龄不能为负数');
      } else if (num > 150) {
        callback('年龄不能超过150岁');
      } else {
        callback();
      }
    }
  }
}
</script>

<style  scoped>

</style>
