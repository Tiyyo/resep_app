import { TableFooterProps } from "./interface";

export default function TableFooter({
    numColums,
    maxPage,
    page,
    getPage,
}: TableFooterProps) {
    const handleClick = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        if (e.currentTarget.dataset.pageNav === "next" && page + 1 <= maxPage) {
            getPage(page + 1);
        } else if (
            e.currentTarget.dataset.pageNav === "prev" &&
            page - 1 >= 1
        ) {
            getPage(page - 1);
        }
    };

    return (
        <tfoot className="text-center h-8 bg-primary-100">
            <tr>
                <td colSpan={numColums}>
                    <div className="flex w-full center py-2">
                        <div className="join">
                            <button
                                className="join-item btn bg-primary-300 hover:bg-opacity-70 hover:bg-primary-100 hover:border-0"
                                data-page-nav="prev"
                                onClick={handleClick}
                            >
                                «
                            </button>
                            <button className="join-item btn bg-primary-300 hover:bg-opacity-70 hover:bg-primary-100 hover:border-0">
                                Page {page}
                            </button>
                            <button
                                className="join-item btn bg-primary-300 hover:bg-opacity-50 hover:bg-primary-100 hover:border-0"
                                data-page-nav="next"
                                onClick={handleClick}
                            >
                                »
                            </button>
                        </div>
                    </div>
                </td>
            </tr>
        </tfoot>
    );
}
