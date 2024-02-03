import { useQueries, useQuery } from '@tanstack/react-query'
import { fetchCategories, fetchMeals } from '../../../apis/product'
import { QUERY_KEY } from '../../../constants/reactQuery'

type CategoriesType = [
  {
    idCategory: string
    strCategory: string
    strCategoryThumb: string
  }
]

interface CategoryType {
  categories: CategoriesType
}

export const useGetCategories = () =>
  useQuery<CategoryType, Error, CategoriesType>({
    queryKey: QUERY_KEY.getCategories(),
    queryFn: fetchCategories,
    select: (data) => data.categories,
  })

export const useGetMeals = (categories: string[]) =>
  useQueries({
    queries: categories.map((category) => ({
      queryKey: [QUERY_KEY.getProducts(), category],
      queryFn: () => fetchMeals(category),
      enabled: !!category,
    })),
    combine: (results) => {
      return {
        data: results.map((result) => result.data?.meals).flat(),
        pending: results.some((result) => result.isPending),
      }
    },
  })
