import React, { useEffect, useRef, useState } from 'react'
import CategorySelect from '../components/pages/Main/CategorySelect'
import Spacing from '../layouts/Spacing'
import { useGetCategories, useGetMeals } from '../hooks/fetch/useFetchItems'
import { useNavigate, useSearchParams } from 'react-router-dom'
import buildQueryString from '../utils/function/buildQueryString'
import useIntersectionObserver from '../hooks/common/useIntersectionObserver'
import classNames from 'classnames'

type MealType = {
  idMeal: string
  strMeal: string
  strMealThumb: string
}

function Main() {
  // get searchParams for fetch category
  const [searchParams] = useSearchParams()
  const queryStringToArray = searchParams.get('category')?.split(',') || []
  const [selectedCategory, setSelectedCategory] =
    useState<string[]>(queryStringToArray)

  const { data: meals, pending } = useGetMeals(selectedCategory)
  const { data: categories, isLoading: isCategorieseLoading } =
    useGetCategories()

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

  // infinity scroll
  const target = useRef<HTMLDivElement | null>(null)
  const [visibleMeals, setVisibleMeals] = useState<MealType[]>([])
  const [lastIndex, setLastIndex] = useState(0)
  const mealsPerPage = 20

  const [observe, unobserve] = useIntersectionObserver(() => {
    setLastIndex((prevIndex) => prevIndex + mealsPerPage)
  })

  useEffect(() => {
    setVisibleMeals(meals)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory])

  useEffect(() => {
    const currentTarget = target.current

    if (
      meals.includes(undefined) ||
      !currentTarget ||
      meals.length <= lastIndex
    ) {
      return
    }

    setVisibleMeals(meals.slice(0, lastIndex + mealsPerPage))
    observe(currentTarget)
    return () => {
      unobserve(currentTarget)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meals, lastIndex])

  const [displayOption, setDisplayOption] = useState('4') // 초기값: 2개씩 보기

  const handleChangeDisplayOption = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDisplayOption(event.target.value)
  }

  const itemsPerRow = displayOption === '2' ? 2 : 4

  if (pending && isCategorieseLoading) return <>loading</>

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
      {/* 상단 select 버튼 */}
      <select
        className='hidden md:block'
        value={displayOption}
        onChange={handleChangeDisplayOption}
      >
        <option value='2'>2개씩 보기</option>
        <option value='4'>4개씩 보기</option>
      </select>
      <Spacing size={30} />
      <ul className='flex flex-wrap justify-center '>
        {visibleMeals.map((meal, i) => {
          return (
            <li
              key={i}
              className={`w-full md:w-1/${itemsPerRow}
                flex flex-col justify-center items-center p-4`}
            >
              <img
                src={meal?.strMealThumb}
                alt={meal?.strMeal}
                loading='lazy'
                className='w-full'
              />
              <Spacing size={10} />
              <b className={`text-${itemsPerRow}xl`}>{meal?.strMeal}</b>
            </li>
          )
        })}
      </ul>
      <div ref={target} />
    </main>
  )
}

export default Main
