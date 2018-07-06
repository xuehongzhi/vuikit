// icon-download
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
      meta: 'vk-icons-download',
      width,
      height,
      viewBox,
      ratio
    }

    data.domProps = {
      innerHTML: '<polyline fill="none" stroke="#000" points="14,10 9.5,14.5 5,10" /><rect x="3" y="17" width="13" height="1" /><line fill="none" stroke="#000" x1="9.5" y1="13.91" x2="9.5" y2="3" />'
    }

    return h('svg', data)
  }
}
