interface Props {
  size: number
}

function Spacing({ size }: Props) {
  return (
    <div
      style={{
        width: size,
        height: size,
      }}
    />
  )
}

export default Spacing
