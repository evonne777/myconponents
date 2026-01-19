<!--  -->
<template>
  <div>
    <UciForm ref="form" @showData="submit">
      <UciInput
      name="submit"
      label="用户名"
      tooltip="请输入用户名"
      placeholder="请输入用户名"
      :rules="['required']"
    />
      <UciInput
      name="retry"
      label="Interval_count"
      tooltip="Number of failed"
      placeholder="请输入retry"
      rules="required"
    />
      <UciInput
      name="age"
      label="年龄"
      initial="18"
      :rules="[{ validator: validateAge }]"
      placeholder="0-150"
    />
    </UciForm>
    {{form}}
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        submit: ''
      }
    }
  },
  methods: {
    submit (data) {
      console.log(111)
      console.log(data)
      this.form = data
    },
    validateAge (rule, value, callback) {
      if (value && (Number(value) < 1 || Number(value) > 9999)) {
        callback(new Error('system.autoReboot.retryRange'))
      } else {
        callback()
      }
    }
  }
}
</script>

<style  scoped>

</style>
