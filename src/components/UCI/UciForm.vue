<template>
  <div>
    <a-form-model
      ref="uciForm"
      :model="form"
      :rules="rules"
      label-align="right"
      :label-col="{ span: 9 }"
      :wrapper-col="{ span: 7 }"
    >
      <slot></slot>
    </a-form-model>
    <a-button type="primary" @click="validateAndApply">
      {{ 'Save & Apply' }}
    </a-button>
  </div>
</template>

<script>
export default {
  name: 'UciForm',
  provide() {
    return {
      uciForm: this
    };
  },
  data() {
    return {
      form: {},
      rules: {},
      fields: new Set()
    };
  },
  mounted() {
    this.$emit('showData', this.form);
  },
  methods: {
    // 添加获取表单数据的方法
    getFormData() {
      return { ...this.form };
    },
    // 验证并提交
    validateAndApply() {
      this.$refs.uciForm.validate((valid, errorFields) => {
        if (valid) {
          this.apply();
        } else {
          // 显示第一个错误
          if (errorFields && Object.keys(errorFields).length > 0) {
            const firstField = Object.keys(errorFields)[0];
            const firstError = errorFields[firstField][0];
            this.$message.error(firstError.message || '请检查表单输入');
          } else {
            this.$message.error('请检查表单输入');
          }
        }
      });
    },

    // 提交表单
    apply() {
      this.$emit('showData', this.form);
      console.log(this.form)
      this.$message.success('操作成功！');
    },

    // 注册字段
    registerField(name, data) {
      if (!this.fields.has(name)) {
        // 设置初始值
        const value = data.initialValue !== undefined ? String(data.initialValue) : '';
        this.$set(this.form, name, value);

        // 设置验证规则
        if (data.rules && data.rules.length > 0) {
          this.$set(this.rules, name, data.rules);
        }
        this.fields.add(name);
      }
    },

    // 更新字段值
    updateField(name, value) {
      this.$set(this.form, name, String(value));
    },

    // 重置表单
    resetForm() {
      this.$refs.uciForm.resetFields();
    }
  }
}
</script>
