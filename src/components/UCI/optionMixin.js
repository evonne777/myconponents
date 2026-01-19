// optionMixin.js
import validator from './validator';

export default {
  inject: ['uciForm'],
  props: {
    name: { type: String, required: true },
    label: String,
    required: Boolean,
    rules: { type: [Object, Array, Function, String], default: () => [] },
    tooltip: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    initial: { type: String, default: '' } // 👈 注意：initial 应该由 UCIInput 接收，但最好统一通过 uciForm 管理
  },
  data() {
    return {
      // ❌ 删除 inputValue
      // inputValue: ''
    };
  },
  computed: {
    // ✅ 核心：通过计算属性双向绑定
    inputValue: {
      get() {
        // 从 uciForm 的 form 中读取当前值
        return this.uciForm.form[this.name] || '';
      },
      set(value) {
        // 更新 uciForm 的 form（会触发响应式更新）
        this.uciForm.updateField(this.name, value);
      }
    }
  },
  mounted() {
    this.initField();
  },
  // ❌ 删除 watch(inputValue)
  methods: {
    initField() {
      let initialValue = '';
      if (this.initial !== undefined && this.initial !== null) {
        initialValue = String(this.initial);
      }

      // 构建规则
      const rules = this.buildRules();

      // 注册字段（会设置 form[name] = initialValue）
      this.uciForm.registerField(this.name, {
        initialValue: initialValue,
        rules: rules
      });

      // ⚠️ 注意：registerField 已设置 form[name]，
      // 而 inputValue 是计算属性，会自动反映这个值，无需手动赋值！
    },

    buildRules() {
      const rules = [];
      if (this.required) {
        rules.push({
          required: true,
          message: this.label ? `${this.label}是必填项` : '此项为必填项',
          trigger: ['blur', 'change']
        });
      }
      if (this.rules) {
        const compiledCustomRules = validator.compile(this.rules, this);
        rules.push(...compiledCustomRules);
      }
      return rules;
    }
  }
};
