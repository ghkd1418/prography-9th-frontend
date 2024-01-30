interface DefaultLayoutProps {
  children: React.ReactNode
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return <div className='mx-auto px-[20px] py-[20px]'>{children}</div>
}
