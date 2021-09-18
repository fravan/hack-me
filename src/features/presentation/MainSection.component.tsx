interface MainSectionProps {
  children: React.ReactNode
}

export function MainSection({ children }: MainSectionProps) {
  return <section className="p-16">{children}</section>
}

interface MainSectionTitleProps {
  children: React.ReactNode
  className?: string
}
export function MainSectionTitle({
  children,
  className = 'text-2xl',
}: MainSectionTitleProps) {
  return (
    <h2 className={'text-center font-bold pb-16 ' + className}>{children}</h2>
  )
}
