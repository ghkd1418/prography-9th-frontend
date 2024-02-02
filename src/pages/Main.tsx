import { useEffect, useState } from 'react'
import CategorySelect from '../components/pages/Main/CategorySelect'
import Spacing from '../layouts/Spacing'
import { useGetCategories, useGetMeals } from '../hooks/fetch/useFetchItems'
import { useNavigate, useSearchParams } from 'react-router-dom'
import buildQueryString from '../utils/function/buildQueryString'

function Main() {
  // get searchParams for fetch category
  const [searchParams] = useSearchParams()
  const queryStringToArray = searchParams.get('category')?.split(',') || []

  const [selectedCategory, setSelectedCategory] =
    useState<string[]>(queryStringToArray)
  const { data: meals, pending } = useGetMeals(selectedCategory)
  console.log('🚀 ~ Main ~ meals:', meals[0]?.idMeal)
  const { data: categories } = useGetCategories()

  //update url
  const navigate = useNavigate()
  const queryString = buildQueryString('category', selectedCategory)

  useEffect(() => {
    if (!selectedCategory.length) {
      navigate('/')
    }

    if (!queryString) return

    navigate(`?${queryString}`)
  }, [queryString, navigate, selectedCategory])

  return (
    <main className='px-[28px]'>
      <Spacing size={30} />
      <CategorySelect value={selectedCategory} onChange={setSelectedCategory}>
        {categories?.map((category) => (
          <CategorySelect.Item
            value={category.strCategory}
            key={category.idCategory}
          >
            {category.strCategory}
          </CategorySelect.Item>
        ))}
      </CategorySelect>
      <Spacing size={30} />
      <ul>
        {!pending &&
          meals.map((meal) => {
            return (
              <li key={meal.idMeal}>
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  loading='lazy'
                />
                <p>{meal.strMeal}</p>
              </li>
            )
          })}
      </ul>
    </main>
  )
}

export default Main
