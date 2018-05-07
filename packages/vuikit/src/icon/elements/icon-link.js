import { mergeData } from '@vuikit/core/utils/vue'

export default {
  functional: true,
  props: {
    reset: {
      type: Boolean,
      default: false
    }
  },
  render (h, { data, props, children }) {
    const { reset } = props

    return h('a', mergeData(data, {
      class: ['uk-icon', {
        'uk-icon-link': reset
      }]
    }), children)
  }
}
