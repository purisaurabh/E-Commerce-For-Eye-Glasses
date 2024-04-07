import classnames from 'classnames';
import { usePagination } from './usePagination';

const Pagination = (props: any) => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
    } = props;

    const paginationRange = usePagination(

        totalCount,
        pageSize,
        siblingCount,
        currentPage,
    );

    console.log('Pagination props:', { currentPage, totalCount, pageSize });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];
    return (
        <ul className="flex justify-center item-center mt-5">
            <li
                className={classnames("p-2 m-2 rounded", {
                    'bg-blue-500 text-white cursor-pointer': currentPage !== 1,
                    'bg-gray-300 text-gray-500 cursor-not-allowed': currentPage === 1
                })}
                onClick={currentPage === 1 ? undefined : onPrevious}
            >
                Prev
            </li>
            <li className="p-2 m-2">
                {currentPage}/{paginationRange[paginationRange.length - 1]}
            </li>
            <li
                className={classnames("p-2 m-2 rounded", {
                    'bg-blue-500 text-white cursor-pointer': currentPage !== lastPage,
                    'bg-gray-300 text-gray-500 cursor-not-allowed': currentPage === lastPage
                })}
                onClick={currentPage === lastPage ? undefined : onNext}
            >
                Next
            </li>
        </ul>
    );
};

export default Pagination;