interface CssClassBuilder {
  with(className: string | undefined): CssClassBuilder
  with(className: string | undefined, when: boolean): CssClassBuilder
  build(): string
}

export function buildClass(
  ...baseClasses: Array<string | undefined>
): CssClassBuilder {
  return {
    with: (className: string | undefined, when?: boolean) => {
      if (className == null) return buildClass(...baseClasses)
      if (when === false) return buildClass(...baseClasses)
      return buildClass(...baseClasses, className)
    },
    build: () => baseClasses.filter(Boolean).join(' ').trim(),
  }
}
