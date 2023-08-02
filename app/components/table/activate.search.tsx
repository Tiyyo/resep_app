import addUnit from '~/utils/add.unit';
import capitalize from '~/utils/capitalize';

export function activateSearch(
  arg: string,
  search: string | undefined,
  setState: any,
): JSX.Element {
  if (!search) {
    return (
      <th scope="col" key={arg} className="px-4 py-2 text-left">
        {capitalize(arg).replace('-', ' ') + addUnit(arg)}
      </th>
    );
  }
  if (arg.toLowerCase() !== search.toLowerCase()) {
    return (
      <th scope="col" key={arg} className="px-4 py-2 text-left">
        {capitalize(arg).replace('-', ' ') + addUnit(arg)}
      </th>
    );
  } else {
    return (
      <th scope="col" key={arg} className="px-4 py-2 text-left">
        <div className="flex gap-x-2">
          {capitalize(arg).replace('_', ' ') + addUnit(arg)}
          <input
            type="text"
            className="rounded-md bg-primary-100 text-7"
            onChange={(e) =>
              setState({ fields: search, value: e.target.value })
            }
          />
        </div>
      </th>
    );
  }
}
