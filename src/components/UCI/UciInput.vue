<template>
  <a-form-model-item
    :prop="name"
  >
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

    <a-input
      v-model="inputValue"
      :placeholder="placeholder"
    />
  </a-form-model-item>
</template>

<script>
import optionMixin from './optionMixin.js';

export default {
  name: 'UCIInput',
  mixins: [optionMixin],
  props: {
    initial: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.title {
  font-weight: bold;
  margin-bottom: 4px;
}
</style>
