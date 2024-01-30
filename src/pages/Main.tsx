import { useState } from 'react'
import CategorySelect from '../components/pages/Main/CategorySelect'
import Spacing from '../layouts/Spacing'
import { useGetCategories } from '../hooks/fetch/useFetchItems'

function Main() {
  const [selectedCategory, setSelectedCategory] = useState<string[]>([])
  console.log('🚀 ~ Main ~ selectedCategory:', selectedCategory)
  const { data } = useGetCategories()

  return (
    <>
      <div className='px-[28px]'>
        <Spacing size={10} />
        <CategorySelect value={selectedCategory} onChange={setSelectedCategory}>
          {data?.categories.map((category) => (
            <CategorySelect.Item
              value={category.strCategory}
              key={category.idCategory}
            >
              {category.strCategory}
            </CategorySelect.Item>
          ))}
        </CategorySelect>
      </div>
    </>
  )
}

export default Main
