import React, { useEffect, useRef, useState } from 'react'
import CategorySelect from '../components/pages/Main/CategorySelect'
import Spacing from '../layouts/Spacing'
import { useGetCategories, useGetMeals } from '../hooks/fetch/useFetchItems'
import { useNavigate, useSearchParams } from 'react-router-dom'
import buildQueryString from '../utils/function/buildQueryString'
import useIntersectionObserver from '../hooks/common/useIntersectionObserver'

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

  // 필터링
  const filterValue = searchParams.get('filter') ?? ''

  const filterFromURL =
    {
      new: '최신순',
      asc: '이름 오름차순',
      desc: '이름 내림차순',
    }[filterValue] || '최신순'

  const [filterOption, setFilterOption] = useState(filterFromURL)

  const filterParam =
    {
      최신순: 'new',
      '이름 오름차순': 'asc',
      '이름 내림차순': 'desc',
    }[filterOption] || 'new'

  //update url
  const navigate = useNavigate()

  useEffect(() => {
    const queryString = buildQueryString('category', selectedCategory)
    const filterValueQueryString = buildQueryString('filter', filterParam)

    if (!selectedCategory.length) {
      navigate('/')
    }

    if (!queryString) return

    // if (filterValue === filterParam) return
    // 같아도 selectedCategory달라지면 업데이트

    navigate(`?${queryString}&${filterValueQueryString}`)
  }, [navigate, selectedCategory, filterParam])

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
    const sliceMeals = meals.slice(0, lastIndex + mealsPerPage)
    setVisibleMeals(sliceMeals)

    observe(currentTarget)
    return () => {
      unobserve(currentTarget)
    }
  }, [meals, lastIndex])

  // 사용자 선택 레이아웃
  const [displayOption, setDisplayOption] = useState('4')

  const handleChangeDisplayOption = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDisplayOption(event.target.value)
  }

  const itemsPerRow = displayOption === '2' ? 2 : 4

  const handleChangeFilterOption = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilterOption(event.target.value)
  }

  useEffect(() => {
    let sortedMeals
    switch (filterOption) {
      case '최신순':
        sortedMeals = [...visibleMeals].sort(
          (a, b) => parseInt(b.idMeal) - parseInt(a.idMeal)
        )
        break
      case '이름 오름차순':
        sortedMeals = [...visibleMeals].sort((a, b) =>
          a.strMeal.localeCompare(b.strMeal)
        )
        break
      case '이름 내림차순':
        sortedMeals = [...visibleMeals].sort((a, b) =>
          b.strMeal.localeCompare(a.strMeal)
        )
        break
      default:
        sortedMeals = visibleMeals
    }

    setVisibleMeals(sortedMeals)
  }, [filterOption, lastIndex])

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
      <div className='flex justify-between'>
        <select
          value={displayOption}
          onChange={handleChangeDisplayOption}
          className='hidden md:block'
        >
          <option value='2'>2개씩 보기</option>
          <option value='4'>4개씩 보기</option>
        </select>
        <select value={filterOption} onChange={handleChangeFilterOption}>
          <option value='최신순'>최신순</option>
          <option value='이름 오름차순'>이름 오름차순</option>
          <option value='이름 내림차순'>이름 내림차순</option>
        </select>
      </div>
      <Spacing size={30} />
      <ul className='flex flex-wrap'>
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
