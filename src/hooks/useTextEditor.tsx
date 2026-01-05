import { useEditor, type EditorOptions } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import { TextStyle } from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import FontFamily from '@tiptap/extension-font-family'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'

import { FontSize, LineHeight, Indent } from '@/extensions'

type UseTextEditorArgs = Pick<EditorOptions, 'content' | 'onUpdate'>

export const useTextEditor = (args?: UseTextEditorArgs) =>
  useEditor({
    content: args?.content ?? '',
    onUpdate: args?.onUpdate,

    editorProps: {
      attributes: {
        class: 'font-sans text-[16px] leading-6 text-gray-900 outline-none',
      },
    },

    extensions: [
      StarterKit.configure({
        hardBreak: { keepMarks: true },
        link: false,
        underline: false,
      }),

      Highlight.configure({ multicolor: true }),
      Underline,

      TextStyle,
      Color.configure({ types: ['textStyle'] }),
      FontFamily.configure({ types: ['textStyle'] }),

      TextAlign.configure({ types: ['heading', 'paragraph'] }),

      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          rel: 'noopener noreferrer',
          target: '_blank',
        },
      }),

      Image,

      FontSize,
      LineHeight,
      Indent,
    ],
  })
