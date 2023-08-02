import type { TableFooterProps } from "./interface";

export default function TableFooter({
  numColums,
  maxPage,
  page,
  getPage,
}: TableFooterProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e.currentTarget.dataset.pageNav === "next" && page + 1 <= maxPage) {
      getPage(page + 1);
    } else if (e.currentTarget.dataset.pageNav === "prev" && page - 1 >= 1) {
      getPage(page - 1);
    }
  };

  return (
    <tfoot className="h-8 bg-primary-100 text-center">
      <tr>
        <td colSpan={numColums}>
          <div className="center flex w-full py-2">
            <div className="join">
              <button
                className="btn join-item bg-primary-300 hover:border-0 hover:bg-primary-100 hover:bg-opacity-70"
                data-page-nav="prev"
                onClick={handleClick}
              >
                «
              </button>
              <button className="btn join-item bg-primary-300 hover:border-0 hover:bg-primary-100 hover:bg-opacity-70">
                Page {page}
              </button>
              <button
                className="btn join-item bg-primary-300 hover:border-0 hover:bg-primary-100 hover:bg-opacity-50"
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
