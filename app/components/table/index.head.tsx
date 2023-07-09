import { activateSearch } from "./activate.search";

export default function TableHead({
  keys,
  search,
  getSearchParams,
}: {
  keys: Array<string>;
  search: string | undefined;
  getSearchParams: any;
}) {
  // const [searchParams,setSearchParams] = useState<{fields : string , value : string}>()

  return (
    <thead className="">
      <tr className="bg-secondary-100">
        {keys && keys.length > 0 ? (
          <>{keys.map((k) => activateSearch(k, search, getSearchParams))}</>
        ) : null}
        <th className="px-4 py-2">Actions</th>
      </tr>
    </thead>
  );
}
