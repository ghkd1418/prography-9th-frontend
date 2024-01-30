import { useQuery } from '@tanstack/react-query'
import { fetchCategories } from '../../../apis/product'
import { QUERY_KEY } from '../../../constants/reactQuery'

export interface CategoryType {
  categories: [
    {
      idCategory: string
      strCategory: string
      strCategoryThumb: string
    }
  ]
}

export const useGetCategories = () =>
  useQuery<CategoryType>({
    queryKey: QUERY_KEY.getCategories(),
    queryFn: fetchCategories,
  })
