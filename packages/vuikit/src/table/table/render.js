import { warn } from '@vuikit/core/utils/debug'
import { isFunction } from '@vuikit/core/utils/lang'

import { ElTable, ElTableTr } from '../elements'
import { ON_CLICK_ROW, ROW_CLICK_PREVENTED } from '../constants'

const Row = {
  functional: true,
  render (h, { data, children, parent }) {
    const { $row } = data

    return h(ElTableTr, {
      props: {
        active: parent.isRowSelected($row)
      },
      class: resolveClass(parent.rowClass, $row),
      on: {
        click: e => {
          const isPrevented = e[ROW_CLICK_PREVENTED]
          const isIgnoredTag = /^(A|BUTTON)$/.test(e.target.tagName)

          if (isPrevented || isIgnoredTag) {
            return
          }

          parent.$emit(ON_CLICK_ROW, $row)
        }
      }
    }, children)
  }
}

export default function (h, { rows, props, columns, table }) {
  // filter out invalid columns
  columns = columns.filter(node => {
    const isValid = node.fnOptions && node.fnOptions.headRender && node.fnOptions.cellRender

    if (process.env.NODE_ENV !== 'production' && !isValid) {
      warn('vk-table -> some of the columns were filtered out because they were missing a head or cell render.')
    }

    return isValid
  })

  return h(ElTable, { props }, [
    props.headless || h('thead', [
      // rerender the column so Table become it parent
      h(ElTableTr, columns.map(node => {
        const fnOptions = node.fnOptions

        // workaround to avoid duplicate classes
        delete node.data.class

        return h({
          functional: true,
          render: fnOptions.headRender
        }, node.data)
      }))
    ]),
    h('tbody', rows.map(($row, index) => {
      return h(Row, { $row },
        columns.map(node => {
          const { props, slots, scopedSlots } = node.data
          const fnOptions = node.fnOptions

          if (process.env.NODE_ENV !== 'production' && !fnOptions) {
            warn('vk-table -> column must be a functional component', table)
          }

          if (process.env.NODE_ENV !== 'production' && !fnOptions.cellRender) {
            warn('vk-table -> column definition is missing cellRender', table)
          }

          return h({
            functional: true,
            render: fnOptions.cellRender
          }, { $row, props, slots, scopedSlots })
        })
      )
    }))
  ])
}

function resolveClass (rowClass, row) {
  return isFunction(rowClass)
    ? rowClass(row)
    : rowClass
}
