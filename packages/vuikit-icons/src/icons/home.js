// icon-home
export default {
  functional: true,
  props: {
    ratio: {
      type: [Number, String],
      default: 1
    }
  },
  render: function (h, { props, data }) {
    const { ratio } = props
    let {
      width = 20,
      height = 20,
      viewBox = '0 0 20 20'
    } = (data.attrs || {})

    if (ratio !== 1) {
      width *= ratio
      height *= ratio
    }

    data.attrs = {
      version: '1.1',
      meta: 'vk-icons-home',
      width,
      height,
      viewBox,
      ratio
    }

    data.domProps = {
      innerHTML: '<polygon points="18.65 11.35 10 2.71 1.35 11.35 0.65 10.65 10 1.29 19.35 10.65" /><polygon points="15 4 18 4 18 7 17 7 17 5 15 5" /><polygon points="3 11 4 11 4 18 7 18 7 12 12 12 12 18 16 18 16 11 17 11 17 19 11 19 11 13 8 13 8 19 3 19" />'
    }

    return h('svg', data)
  }
}
