import { Extension } from '@tiptap/core'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    indent: {
      indent: () => ReturnType
      outdent: () => ReturnType
    }
  }
}

const INDENT_STEP = 24

export const Indent = Extension.create({
  name: 'indent',

  addGlobalAttributes() {
    return [
      {
        types: ['paragraph'],
        attributes: {
          indent: {
            default: 0,
            parseHTML: (element) => {
              const ml = (element as HTMLElement).style.marginLeft
              const px = ml ? parseInt(ml, 10) : 0
              return Number.isFinite(px) ? px : 0
            },
            renderHTML: (attrs) => {
              const indent = (attrs.indent as number) ?? 0
              return indent > 0 ? { style: `margin-left: ${indent}px` } : {}
            },
          },
        },
      },
    ]
  },

  addCommands() {
    return {
      indent:
        () =>
        ({ editor }) => {
          const current =
            (editor.getAttributes('paragraph').indent as number | undefined) ??
            0

          return editor.commands.updateAttributes('paragraph', {
            indent: current + INDENT_STEP,
          })
        },

      outdent:
        () =>
        ({ editor }) => {
          const current =
            (editor.getAttributes('paragraph').indent as number | undefined) ??
            0

          return editor.commands.updateAttributes('paragraph', {
            indent: Math.max(0, current - INDENT_STEP),
          })
        },
    }
  },
})

export default Indent
