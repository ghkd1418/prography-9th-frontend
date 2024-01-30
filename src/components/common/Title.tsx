type TitleProps = {
  children: React.ReactNode
}

function Title({ children }: TitleProps) {
  return <h1 className='text-2xl font-semibold'>{children}</h1>
}

export default Title
