import React from 'react'

export function highlightText(text: string, keyword: string) {
  if (!keyword.trim()) return text

  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escaped})`, 'gi')

  return text.split(regex).map((part, idx) =>
    regex.test(part) ? (
      <span key={idx} className="text-primary font-medium">
        {part}
      </span>
    ) : (
      <React.Fragment key={idx}>{part}</React.Fragment>
    )
  )
}
