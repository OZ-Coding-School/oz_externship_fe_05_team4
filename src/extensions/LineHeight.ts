import { Extension } from '@tiptap/core'

export const LineHeight = Extension.create({
  name: 'lineHeight',

  addGlobalAttributes() {
    return [
      {
        types: ['paragraph'],
        attributes: {
          lineHeight: {
            default: null,
            parseHTML: (el) => el.style.lineHeight,
            renderHTML: (attrs) =>
              attrs.lineHeight
                ? { style: `line-height: ${attrs.lineHeight}` }
                : {},
          },
        },
      },
    ]
  },

  addCommands() {
    return {
      setLineHeight:
        (value) =>
        ({ commands }) =>
          commands.updateAttributes('paragraph', {
            lineHeight: value,
          }),
    }
  },
})
