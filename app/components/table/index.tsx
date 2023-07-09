import type { TableProps } from "./interface";
import { useState } from "react";
import TableBody from "./index.body";
import TableHead from "./index.head";
import ChevronIconLeft from "~/assets/icons/ChevronLeftIcon";
import ChevronLeftIcon from "~/assets/icons/ChevronLeftIcon";
import ChevronRightIcon from "~/assets/icons/ChevronRightIcon";
import { TableFooter } from "./index.footer";

export default function Table({
  data,
  endpoint,
  isMultiData,
  search,
  image,
}: TableProps) {
  const [searchParams, setSearchParams] = useState<{
    fields: string;
    value: string;
  }>();
  const numElementByPage = 15;
  const maxPage = Math.ceil(data.length / numElementByPage);
  const [page, setPage] = useState<number>(1);

  const getPage = (page: number) => {
    setPage(page);
  };

  if (data.length < 1) {
    return (
      <div className="w-full h-full center">
        <p>Database is Empty</p>
      </div>
    );
  }

  const keys = Object.keys(data[0]) ?? "";

  const filterData = data.filter((f) => {
    if (searchParams?.fields && f[searchParams.fields]) {
      return f[searchParams.fields].includes(searchParams.value);
    } else {
      return f;
    }
  });

  const paginateData = filterData.slice(
    (page - 1) * numElementByPage,
    (page - 1) * numElementByPage + numElementByPage
  );

  return (
    <div className="w-full mx-auto ">
      <table className="bg-main-300 table-auto mx-auto">
        <TableHead
          keys={keys}
          search={search ?? undefined}
          getSearchParams={setSearchParams}
        />
        <TableBody
          data={data.length === 1 ? data[0] : paginateData}
          keys={keys}
          image={image ?? false}
          endpoint={endpoint ? endpoint : ""}
          isMultiData={isMultiData ?? false}
          search={search ?? undefined}
        />
        <TableFooter
          numColums={keys?.length + 2}
          maxPage={maxPage}
          page={page}
          getPage={getPage}
        />
      </table>
    </div>
  );
}
