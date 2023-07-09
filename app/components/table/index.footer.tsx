import ChevronLeftIcon from "~/assets/icons/ChevronLeftIcon";
import ChevronRightIcon from "~/assets/icons/ChevronRightIcon";

export default function TableFooter({
  numColums,
  maxPage,
  page,
  getPage,
}: {
  numColums: number;
  maxPage: number;
  page: number;
  getPage: (page: number) => void;
}) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget.dataset.pageNav === "next" && page + 1 <= maxPage) {
      getPage(page + 1);
    } else if (e.currentTarget.dataset.pageNav === "prev" && page - 1 >= 1) {
      getPage(page - 1);
    }
  };

  return (
    <tfoot className="text-center h-8 bg-primary-200">
      <tr>
        <td colSpan={numColums}>
          <div className="flex w-full center">
            <div
              className="cursor-pointer mx-2"
              data-page-nav="prev"
              onClick={handleClick}
            >
              <ChevronLeftIcon />
            </div>
            <input
              type="number"
              step="1"
              min="1"
              className="w-8 text-center bg-white-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              defaultValue={page}
              disabled={true}
            />
            <span> / </span>
            <input
              type="text"
              defaultValue={maxPage}
              className="w-8 bg-primary-200 text-center"
            />
            <div
              className="cursor-pointer"
              onClick={handleClick}
              data-page-nav="next"
            >
              <ChevronRightIcon />
            </div>
          </div>
        </td>
      </tr>
    </tfoot>
  );
}
