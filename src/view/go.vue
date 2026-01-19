<template>
  <div>
    <UciForm ref="form" @showData="handleSubmit">
      <!-- 1. 必填 + 邮箱格式 -->
      <!-- <UciInput
        name="username"
        label="用户名（邮箱）"
        placeholder="请输入公司邮箱"
        :rules="['required', 'email']"
      /> -->

      <!-- 2. 必填 + 最小长度 + 自定义提示 -->
      <UciInput
        v-if="form.age"
        name="password"
        label="密码"
        placeholder="至少6位"
        :rules="[
          'required',
          { min: 6, message: '密码不能少于6位' }
        ]"
      />

      <!-- 3. 自定义 validator：年龄范围 -->
      <UciInput
        name="age"
        label="年龄"
        initial="18"
        :rules="[{ validator: validateAge }]"
        placeholder="0-150"
      />

      <!-- 4. 数字 + 范围 + 必填 -->
      <UciInput
        name="score"
        label="分数"
        placeholder="0～100"
        :rules="[
          'required',
          {
            min: 0,
            max: 100,
            message: '分数必须在0到100之间',
          }
        ]"
      />
    </UciForm>

    <div style="margin-top: 20px;">
      <h3>表单数据：</h3>
      <pre style="background: #f5f5f5; padding: 10px; overflow: auto;">
{{ JSON.stringify(form, null, 2) }}
      </pre>
    </div>
    <a-button @click="anniu">anniu</a-button>
  </div>
</template>

<script>
import UciForm from '@/components/UCI/UciForm.vue';
import UciInput from '@/components/UCI/UciInput.vue';

export default {
  name: 'Go',
  components: {
    UciForm,
    UciInput
  },
  data() {
    return {
      form: {}
    };
  },
  methods: {
    anniu() {
      this.form.age = 22
    },

    handleSubmit(data) {
      console.log('表单提交的数据:', data);
      this.form = data;
    },

    // 自定义年龄校验
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
};
</script>
