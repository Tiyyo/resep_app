export interface TableProps {
  data: Array<any>;
  endpoint?: string;
  isMultiData?: boolean;
  search?: string;
  image?: true;
}

export interface TableBodyProps {
  data: Array<any>;
  keys: Array<string>;
  endpoint: string;
  isMultiData: boolean;
  image: boolean;
  search?: string;
}

export interface TableHeadProps {
  keys: Array<string>;
  search: string | undefined;
  getSearchParams: any;
}

export interface TableFooterProps {
  numColums: number;
  maxPage: number;
  page: number;
  getPage: (page: number) => void;
}
