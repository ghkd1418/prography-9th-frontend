import customAxios from '.'

export async function fetchCategories() {
  return (await customAxios.get('/categories.php')).data
}
