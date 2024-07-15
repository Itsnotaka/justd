'use client'

import * as React from 'react'

import { parseColor } from '@react-stately/color'
import type {
  ColorFieldProps as ColorFieldPrimitiveProps,
  ColorSliderProps as ColorSliderPrimitiveProps,
  ColorSwatchPickerItemProps as ColorSwatchPickerItemPrimitiveProps,
  ColorSwatchProps as ColorSwatchPrimitiveProps,
  ColorThumbProps as ColorThumbPrimitiveProps,
  ValidationResult
} from 'react-aria-components'
import {
  ColorArea as ColorAreaPrimitive,
  ColorField as ColorFieldPrimitive,
  ColorSlider as ColorSliderPrimitive,
  ColorSwatch as ColorSwatchPrimitive,
  ColorSwatchPicker as ColorSwatchPickerPrimitive,
  ColorSwatchPickerItem as ColorSwatchPickerItemPrimitive,
  ColorThumb as ColorThumbPrimitive,
  ColorWheel as ColorWheelPrimitive,
  ColorWheelTrack as ColorWheelTrackPrimitive,
  composeRenderProps,
  SliderOutput
} from 'react-aria-components'
import { tv } from 'tailwind-variants'

import {
  Description,
  FieldError,
  FieldGroup,
  fieldGroupPrefixStyles,
  Input,
  Label
} from './field'
import { cn, ctr, focusStyles } from './primitive'
import { SliderTrack } from './slider'

interface ColorFieldProps extends ColorFieldPrimitiveProps {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  placeholder?: string
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  isLoading?: boolean
}

const ColorField = ({
  label,
  description,
  errorMessage,
  placeholder,
  prefix,
  suffix,
  isLoading,
  ...props
}: ColorFieldProps) => {
  return (
    <ColorFieldPrimitive
      {...props}
      className={ctr(props.className, 'group w-full flex flex-col gap-1')}
    >
      {label && <Label>{label}</Label>}
      <FieldGroup
        data-loading={isLoading ? 'true' : undefined}
        className={fieldGroupPrefixStyles()}
      >
        {prefix ? <span className="atrs isPfx">{prefix}</span> : null}
        <Input className="px-2.5" placeholder={placeholder} />
        {suffix ? <span className="atrs isSfx">{suffix}</span> : null}
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </ColorFieldPrimitive>
  )
}

const colorAreaStyles = tv({
  base: 'size-48 rounded-lg border border-background shrink-0 disabled:opacity-50'
})

interface ColorAreaProps extends React.ComponentProps<typeof ColorAreaPrimitive> {}

const ColorArea = ({ className, ...props }: ColorAreaProps) => {
  return (
    <ColorAreaPrimitive
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        colorAreaStyles({
          ...renderProps,
          className
        })
      )}
    />
  )
}

interface ColorThumbProps extends ColorThumbPrimitiveProps {}

const colorThumbStyles = tv({
  base: 'size-5 shadow rounded-full ring-1 ring-inset ring-offset-2 ring-black/50 border border-black/50',
  variants: {
    isFocusVisible: {
      true: 'size-6'
    }
  }
})

const ColorThumb = ({ className, ...props }: ColorThumbProps) => {
  return (
    <ColorThumbPrimitive
      className={composeRenderProps(className, (className, renderProps) =>
        colorThumbStyles({
          ...renderProps,
          className
        })
      )}
      {...props}
    />
  )
}

const colorSwatchPickerItemStyles = tv({
  extend: focusStyles,
  base: 'size-8 rounded-md cspis disabled:opacity-50'
})

const ColorSwatchPickerItem = ({
  className,
  ...props
}: ColorSwatchPickerItemPrimitiveProps) => {
  return (
    <ColorSwatchPickerItemPrimitive
      className={composeRenderProps(className, (className, renderProps) =>
        colorSwatchPickerItemStyles({
          ...renderProps,
          className
        })
      )}
      {...props}
    >
      <ColorSwatch
        isBright={isBrightColor(props.color ?? '')}
        className="size-[inherit] cocspip"
      />
    </ColorSwatchPickerItemPrimitive>
  )
}

interface ColorSwatchProps extends ColorSwatchPrimitiveProps {
  isBright?: boolean
}

const ColorSwatch = ({ isBright, className, ...props }: ColorSwatchProps) => {
  const needRing = props.color ? isBrightColor(props.color) : isBright
  return (
    <ColorSwatchPrimitive
      className={cn(
        'size-8 cs rounded-md',
        needRing
          ? 'ring-1 ring-inset ring-black/10'
          : 'dark:ring-1 dark:ring-inset dark:ring-white/10',
        className
      )}
      {...props}
    />
  )
}

const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b)

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null
}

const hsbToRgb = (
  h: number,
  s: number,
  b: number
): { r: number; g: number; b: number } => {
  s /= 100
  b /= 100
  const k = (n: number) => (n + h / 60) % 6
  const f = (n: number) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)))
  return {
    r: Math.round(255 * f(5)),
    g: Math.round(255 * f(3)),
    b: Math.round(255 * f(1))
  }
}

const luminance = (r: number, g: number, b: number): number => {
  const a = [r, g, b].map((v) => {
    v /= 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
}

const isBrightColor = (color: any): boolean => {
  let r, g, b

  if (typeof color === 'string') {
    if (color.startsWith('#')) {
      const rgb = hexToRgb(color)
      if (rgb) {
        r = rgb.r
        g = rgb.g
        b = rgb.b
      } else {
        return false
      }
    } else if (color.startsWith('rgb')) {
      const rgbValues = color.match(/\d+/g)
      if (rgbValues) {
        r = parseInt(rgbValues[0], 10)
        g = parseInt(rgbValues[1], 10)
        b = parseInt(rgbValues[2], 10)
      } else {
        return false
      }
    } else {
      const namedColors: Record<string, string> = {
        white: '#ffffff',
        black: '#000000'
      }
      const hex = namedColors[color.toLowerCase()]
      if (hex) {
        const rgb = hexToRgb(hex)
        if (rgb) {
          r = rgb.r
          g = rgb.g
          b = rgb.b
        } else {
          return false
        }
      } else {
        return false
      }
    }
  } else if (
    typeof color === 'object' &&
    'hue' in color &&
    'saturation' in color &&
    'brightness' in color
  ) {
    const rgb = hsbToRgb(color.hue, color.saturation, color.brightness)
    r = rgb.r
    g = rgb.g
    b = rgb.b
  } else {
    return false
  }

  const lum = luminance(r, g, b)
  return lum > 0.75
}

const defaultColor = parseColor('hsl(216, 98%, 52%)')

interface ColorSliderProps extends ColorSliderPrimitiveProps {
  label?: string
  description?: string
  showOutput?: boolean
}

const ColorSlider = ({
  className,
  showOutput = true,
  label,
  description,
  ...props
}: ColorSliderProps) => {
  return (
    <ColorSliderPrimitive
      className={cn('flex disabled:opacity-50 w-full flex-col gap-1', className)}
      {...props}
    >
      <div className="flex items-center gap-2">
        {label && <Label className="text-sm [grid-area:label]">{label}</Label>}
        {showOutput && <SliderOutput className="text-sm ml-auto [grid-area:output]" />}
      </div>
      <SliderTrack className="cstrk rounded-md orientation-horizontal:h-8">
        <ColorThumb className="csth top-1/2" />
      </SliderTrack>
      {description && <Description>{description}</Description>}
    </ColorSliderPrimitive>
  )
}

const ColorWheel = ColorWheelPrimitive
const ColorWheelTrack = ColorWheelTrackPrimitive
const ColorSwatchPicker = ColorSwatchPickerPrimitive

export {
  ColorArea,
  ColorField,
  ColorSlider,
  ColorSwatch,
  ColorSwatchPicker,
  ColorSwatchPickerItem,
  ColorThumb,
  ColorWheel,
  ColorWheelTrack,
  defaultColor,
  isBrightColor
}
