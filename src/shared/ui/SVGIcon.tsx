import React from 'react'

interface SVGIconProps {
  iconId: string
  width: number
  height: number
  title?: string
  desc?: string
}

export const SVGIcon: React.FC<SVGIconProps> = ({
  iconId,
  width,
  height,
  title,
  desc,
}) => (
  <svg width={width} height={height} fill="none" role="img">
    {title && <title>{title}</title>}
    {desc && <desc>{desc}</desc>}
    <use href={`/icons.svg#${iconId}`}></use>
  </svg>
)
