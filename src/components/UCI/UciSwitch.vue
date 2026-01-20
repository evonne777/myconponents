<!-- UciSwitch.vue -->
<template>
  <a-form-model-item :prop="name">
    <template v-if="label" #label>
      <a-tooltip v-if="tooltip" placement="left">
        <template #title>
          <div class="title">{{ label }}</div>
          <span>{{ tooltip }}</span>
        </template>
        {{ label }}
      </a-tooltip>
      <span v-else>{{ label }}</span>
    </template>

    <a-switch
      :checked="isChecked"
      @change="handleChange"
      :disabled="disabled"
    />
  </a-form-model-item>
</template>

<script>
export default {
  name: 'UciSwitch',
  inject: ['uciForm'],
  props: {
    name: { type: String, required: true },
    label: String,
    tooltip: { type: String, default: '' },
    initial: { type: Boolean, default: false },
    required: Boolean,
    disabled: { type: Boolean, default: false }
  },
  computed: {
    isChecked() {
      const val = this.uciForm.form[this.name];
      if (val === undefined || val === null) {
        return this.initial;
      }
      // 统一转为布尔（兼容字符串或布尔）
      return val === true || val === 'true' || val === 1;
    },
  },
  mounted() {
    // 只注册一次！存布尔值
    this.uciForm.registerField(this.name, {
      initialValue: this.initial,
    });
  },
  methods: {
    handleChange(checked) {
      this.uciForm.updateField(this.name, checked);
    }
  }
};
</script>

<style scoped>
.title {
  font-weight: bold;
  margin-bottom: 4px;
}
</style>
