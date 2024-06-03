import ReactPaginate from 'react-paginate'
import React, { useEffect, useState } from 'react'
import './CustomPaginate.scss'
function CustomPaginate({ totalItems, onChange, itemsPerPage = 10 }) {
    return (
        <>
            {itemsPerPage < totalItems && (
                <ReactPaginate
                    onPageChange={e => onChange(e.selected)}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={Math.ceil(totalItems / itemsPerPage)}
                    nextLabel='>'
                    previousLabel='<'
                    pageClassName='page-item'
                    pageLinkClassName='page-link'
                    previousClassName='page-arrow'
                    previousLinkClassName='link-arrow'
                    nextClassName='page-arrow'
                    nextLinkClassName='link-arrow'
                    breakLabel='...'
                    breakClassName='page-item'
                    breakLinkClassName='page-link'
                    containerClassName='custom-paginate-container'
                    activeClassName='active'
                    renderOnZeroPageCount={null}
                />
            )}
        </>
    )
}

export default CustomPaginate
