import customAxios from '.'

export async function fetchCategories() {
  const { data } = await customAxios.get('/categories.php')
  return data
}

export async function fetchMeals(category: string) {
  const { data } = await customAxios.get('/filter.php', {
    params: {
      c: category,
    },
  })
  return data
}
