export const getPageCount = (totalCount, limit) => {
  return Math.ceil(totalCount / limit);
}

export const getPagesArray = (totalPages) => {
  const result = [];

  for (let i = 0; i < totalPages; i++) { // Сделать на useMemo() хук pagination
    result.push(i + 1);
  }

  return result;
}
