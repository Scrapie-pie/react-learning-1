import React from 'react'
import MyButton from '../button/MyButton';
import {getPagesArray} from '../../../utils/pages.js';

const Pagination = ({totalPages, page, changePage}) => {
  let pagesArray = getPagesArray(totalPages);

  return (
    <div className="pagination">
      {pagesArray.map(p =>
        <MyButton
          onClick={() => changePage(p)}
          key={p}
          className={page === p ? 'page page_current' : 'page'}
        >
          {p}
        </MyButton>
      )}
    </div>
  )
}

export default Pagination;
