<template>
  <div>
    <!-- 表单1 -->
    <UciForm ref="formA" @showData="handleFormA">
      <UciInput name="age" label="年龄A" initial="18" :rules="[{ validator: validateAge }]" />
      <UciInput
        v-if="formA.age"
        name="password"
        label="密码A"
        placeholder="至少6位"
        :rules="['required', { min: 6, message: '密码不能少于6位' }]"
      />
      <UciSwitch
        name="swicth111s"
        label="开关A"
      />

    </UciForm>

    <!-- 表单2 -->
    <UciForm ref="formB" @showData="handleFormB">
      <UciInput name="age" label="年龄B" initial="20" :rules="[{ validator: validateAge }]" />
      <UciInput
        v-if="formB.age"
        name="password"
        label="密码B"
        placeholder="至少6位"
        :rules="['required', { min: 6, message: '密码不能少于6位' }]"
      />
    </UciForm>

    <div style="margin-top: 20px;">
      <h3>表单A数据：</h3>
      <pre>{{ JSON.stringify(formA, null, 2) }}</pre>

      <h3>表单B数据：</h3>
      <pre>{{ JSON.stringify(formB, null, 2) }}</pre>
    </div>

    <a-button @click="setAge">设置年龄</a-button>
  </div>
</template>

<script>
import UciSwitch from '@/components/UCI/UciSwitch.vue'
export default {
  data() {
    return {
      formA: {},
      formB: {}
    };
  },
  components: {
    UciSwitch
  },
  methods: {
    handleFormA(data) {
      this.formA = data;
    },
    handleFormB(data) {
      this.formB = data;
    },
    setAge() {
      // 通过 ref 操作子表单（可选）
      this.$refs.formA.updateField('age', '22');
      this.$refs.formB.updateField('age', '25');
    },
    validateAge(rule, value, callback) {
      if (!value) return callback();
      const num = Number(value);
      if (isNaN(num)) {
        callback('请输入有效数字');
      } else if (num < 0 || num > 150) {
        callback('年龄必须在 0-150 之间');
      } else {
        callback();
      }
    }
  }
};
</script>
