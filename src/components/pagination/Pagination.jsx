import "./Pagination.scss"
import React, { useState } from 'react'

export default function Pagination({ totalNoOfPages, handlePage, currentPageNo }) {
  const [pages, setPages] = useState(Array.from({ length: Math.ceil(totalNoOfPages / 10) }, (_, i) => i + 1))

  function handleNextPages() {
    let nextPages = pages.map(i => i + 10).filter(i => i < totalNoOfPages);
    handlePage(nextPages[0])()

    setPages([...nextPages])
  }

  function handlePrevPages() {
    let nextPages = pages.map(i => i - 10).filter(i => i > 0);
    handlePage(nextPages[0])()
    setPages([...nextPages])
  }
  // console.log(pages);
  return totalNoOfPages && (
    <div className='Pagination'>
      {/* <button>First</button> */}
      <button onClick={handlePrevPages} disabled={pages[0] === 1}>Prev</button>
      {pages.map((value) => (
        <div key={value} className={`pages ${value === currentPageNo ? "active" : ""}`} onClick={handlePage(value)}>{value}</div>
      ))}
      <button onClick={handleNextPages} disabled={pages[pages.length - 1] === totalNoOfPages}>Next</button>
      {/* <button >Last</button> */}
    </div>
  )
}
