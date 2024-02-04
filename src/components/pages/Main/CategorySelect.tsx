import React, { useContext } from 'react'
import style from './CategorySelect.module.css'
import classNames from 'classnames'

type OnChange = (value: string[]) => void

type CategorySelectContextType = {
  value?: string[]
  onChange: OnChange
}

const CategorySelectContext = React.createContext<CategorySelectContextType>({
  value: undefined,
  onChange: () => {},
})

interface Props {
  value?: string[]
  onChange: OnChange
  children: React.ReactNode
}

function CategorySelect({ value, onChange, children }: Props) {
  return (
    <CategorySelectContext.Provider
      value={{
        value,
        onChange,
      }}
    >
      <div className='flex flex-wrap gap-x-[10px] gap-y-[6px]'>{children}</div>
    </CategorySelectContext.Provider>
  )
}

interface ItemProps {
  children: React.ReactNode
  value: string
}

function Item({ children, value }: ItemProps) {
  const context = useContext(CategorySelectContext)
  const isSelected = context.value?.includes(value)

  const toggleSelection = () => {
    if (isSelected) {
      context.onChange(context.value?.filter((v) => v !== value) || [])
    } else {
      context.onChange([...(context.value || []), value])
    }
  }

  return (
    <button
      className={classNames(
        style.categoryItem,
        isSelected ? style.active : null
      )}
      onClick={toggleSelection}
    >
      {children}
    </button>
  )
}

CategorySelect.Item = Item

export default CategorySelect
