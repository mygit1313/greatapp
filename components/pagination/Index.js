import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';

export default function Pagination(props) {
    const {
        currentPage,
        totalRecords,
        totalPages,
        setCurrentPage,
        limit,
        showPagination,
        tableDataLength
    } = props;
    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white pt-4">
            
            <div className="flex flex-1 flex-col-reverse gap-1 md:flex-row items-center justify-between">
                <div>
                    <p className="text-sm text-gray-700 relative z-30">
                        Showing <span className="font-medium">{tableDataLength != 0 ? (((currentPage-1)*limit) + 1) : 0}</span> to <span className="font-medium">{totalRecords > (((currentPage-1)*limit) + tableDataLength) ? (((currentPage-1)*limit) + tableDataLength) : totalRecords}</span> of{' '}
                        <span className="font-medium">{totalRecords}</span> results
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex gap-2 -space-x-px rounded-md shadow-sm relative z-30 md:hidden" aria-label="Pagination">
                        
                        <select onChange={e => setCurrentPage(e.target.value)} value={currentPage}>
                            <option disabled>
                                Go to Page
                            </option>
                            {showPagination.map((pageNumber,i) => (
                            <option key={i} value={pageNumber}>
                               {pageNumber}
                            </option>
                            ))}
                        </select>
                        <div className='flex'>
                        <Link
                            href="#"
                            onClick={() => currentPage != 1 && setCurrentPage(currentPage-1)}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </Link>
                        
                        <Link
                            href="#"
                            onClick={() => currentPage != totalPages && setCurrentPage(currentPage+1)}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </Link>
                        </div>
                        
                    </nav>
                    <nav className="isolate hidden md:inline-flex -space-x-px rounded-md shadow-sm relative z-30" aria-label="Pagination">
                        <Link
                            href="#"
                            onClick={() => currentPage != 1 && setCurrentPage(currentPage-1)}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </Link>
                        {showPagination.map((pageNumber,i) => (
                            <Link
                            href="#"
                            key={i}
                            onClick={() => setCurrentPage(pageNumber)}
                            aria-current="page"
                            className={currentPage == pageNumber ? "relative z-10 inline-flex items-center bg-black px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black" : "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"}
                        >
                            {pageNumber}
                        </Link>
                        ))}
                        
                        
                        <Link
                            href="#"
                            onClick={() => currentPage != totalPages && setCurrentPage(currentPage+1)}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    )
}
