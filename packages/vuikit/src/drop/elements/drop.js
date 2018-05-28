import { mergeData } from 'vuikit/src/_core/utils/vue'

export default {
  functional: true,
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  render (h, { children, data, props }) {
    const { show } = props

    return h('div', mergeData(data, {
      class: ['uk-drop', {
        'uk-open': show
      }],
      style: {
        display: show ? 'block' : null
      }
    }), children)
  }
}
