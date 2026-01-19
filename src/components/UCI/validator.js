// validator.js
export default {
  compile(rules, context) {
    if (!rules) return [];

    if (Array.isArray(rules)) {
      const compiled = [];
      for (const rule of rules) {
        if (typeof rule === 'string') {
          const r = this.compileStringRule(rule);
          if (r) compiled.push(r);
        } else if (typeof rule === 'function') {
          compiled.push({ validator: rule, trigger: ['blur', 'change'] });
        } else if (rule && typeof rule === 'object') {
          const r = this.compileObjectRule(rule);
          if (r) compiled.push(r);
        }
      }
      return compiled;
    }

    // 单个规则
    if (typeof rules === 'string') {
      const r = this.compileStringRule(rules);
      return r ? [r] : [];
    }
    if (typeof rules === 'function') {
      return [{ validator: rules, trigger: 'blur' }];
    }
    if (rules && typeof rules === 'object') {
      const r = this.compileObjectRule(rules);
      return r ? [r] : [];
    }

    return [];
  },

  compileStringRule(rule) {
    switch (rule) {
      case 'required':
        return { required: true, message: '此项为必填项', trigger: ['blur', 'change'] };
      case 'email':
        return { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' };
      case 'number':
        return {
          validator: (rule, value, callback) => {
            if (!value) return callback();
            callback(isNaN(Number(value)) ? '必须是数字' : undefined);
          },
          trigger: 'blur'
        };
      default:
        console.warn(`不支持的字符串规则: ${rule}`);
        return null;
    }
  },

  compileObjectRule(rule) {
    // 检查是否包含 async-validator 支持的字段
    console.log(hasValidField)
    const hasValidField = (
      'required' in rule ||
      'type' in rule ||
      'pattern' in rule ||
      'validator' in rule ||
      'min' in rule ||
      'max' in rule ||
      'len' in rule ||
      'enum' in rule ||
      'whitespace' in rule
    );

    if (hasValidField) {
      const result = { ...rule };
      if (result.trigger === undefined) {
        result.trigger = ['blur', 'change'];
      }
      return result;
    }

    console.warn('无法识别的对象规则:', rule);
    return null;
  }
};
