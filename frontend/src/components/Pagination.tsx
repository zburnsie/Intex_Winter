interface PaginationProps {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    onPageChange: (newPage: number) => void;
    onPageSizeChange: (newSize: number) => void;
}

const Pagination = ({currentPage, totalPages, pageSize, onPageChange, onPageSizeChange}: PaginationProps) => {
    // console.log('Raw Total Pages:', totalPages);
    const safeTotalPages = Number.isInteger(totalPages) && totalPages > 0 ? totalPages : 0;

    if (safeTotalPages === 0) {
        console.warn('Pagination not rendered: totalPages is invalid or zero.');
        return null;
    }

    const renderPageButtons = () => {
        const pages = [];
        // const maxDisplayed = 5;
        const sidePages = 2;

        const startPage = Math.max(2, currentPage - sidePages);
        const endPage = Math.min(safeTotalPages - 1, currentPage + sidePages);

        pages.push(
            <button key={1} onClick={() => onPageChange(1)} disabled={currentPage === 1}>
                1
            </button>
        );

        if (startPage > 2) {
            pages.push(<span key="start-ellipsis" className="mx-1">...</span>);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button key={i} onClick={() => onPageChange(i)} disabled={currentPage === i}>
                    {i}
                </button>
            );
        }

        if (endPage < safeTotalPages - 1) {
            pages.push(<span key="end-ellipsis" className="mx-1">...</span>);
        }

        if (safeTotalPages > 1) {
            pages.push(
                <button key={safeTotalPages} onClick={() => onPageChange(safeTotalPages)} disabled={currentPage === safeTotalPages}>
                    {safeTotalPages}
                </button>
            );
        }

        return pages;
    };

    return (
        <div className="d-flex align-items-center gap-2">
            <button
                className="btn btn-outline-light btn-sm"
                disabled={currentPage === 1} 
                onClick={() => onPageChange(currentPage - 1)}
            >
                Previous
            </button>

            {renderPageButtons()}

            <button
                className="btn btn-outline-light btn-sm"
                disabled={currentPage === safeTotalPages} 
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </button>
            <div>
                <label className="me-2 mb-0">Results per page: 
                    <select 
                        className="form-select form-select-sm bg-dark text-white border-secondary"
                        value={pageSize} 
                        onChange = {(p) => {
                            onPageSizeChange(Number(p.target.value));
                            onPageChange(1);
                        }}
                        > 
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="200">200</option>
                    </select>
                </label>
            </div>
        </div>
    );
}

export default Pagination;