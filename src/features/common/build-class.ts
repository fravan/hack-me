interface CssClassBuilder {
  with(className: string | null | undefined): CssClassBuilder
  with(className: string | null | undefined, when: boolean): CssClassBuilder
  build(): string
}

export function buildClass(...baseClasses: Array<string>): CssClassBuilder {
  baseClasses = baseClasses.map(c => c.trim())

  const cssBuilder: CssClassBuilder = {
    with: (className: string | null | undefined, when?: boolean) => {
      if (className == null) return cssBuilder
      if (when === false) return cssBuilder
      return buildClass(...baseClasses, className)
    },
    build: () => baseClasses.filter(Boolean).join(' '),
  }
  return cssBuilder
}
