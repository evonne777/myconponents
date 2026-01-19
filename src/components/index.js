// src/components/index.js
import TAntdDetail from './detail/src'  // 这个可能是正确的
import TAntdLayoutPage from './layout-page/src'  // ✅ 改为 ./layout-page
import TAntdLayoutPageItem from './layout-page-item/src'  // ✅ 改为 ./layout-page-item
import TAntdSelect from './select/src'  // ✅ 改为 ./layout-page-item
const components = [
  TAntdDetail,
  TAntdLayoutPage,
  TAntdLayoutPageItem,
  TAntdSelect
]

const install = function (Vue) {
  components.forEach(component => {
    if (component && component.name) {
      Vue.component(component.name, component)
    } else {
      console.error('组件无效:', component)
    }
  })
}

export {
  TAntdDetail,
  TAntdLayoutPage,
  TAntdLayoutPageItem,
  TAntdSelect
}

export default {
  ...components,
  install
}
