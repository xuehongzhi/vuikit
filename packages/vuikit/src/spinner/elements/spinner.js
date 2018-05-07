import Icon from './spinner--icon'
import { mergeData } from '@vuikit/core/utils/vue'

export default {
  functional: true,
  props: {
    ratio: {
      type: [String, Number]
    }
  },
  render (h, { props, data }) {
    return h('div', mergeData(data, {
      class: ['uk-icon', 'uk-spinner']
    }), [
      h(Icon, { props })
    ])
  }
}
