export interface SelectSearchProps {
    data: Array<object>;
    name : string
    index : string
    filterBy: string;
    getState? : (args : any) => any
    optionMax: number | 5;
    placeholder? : string
  }
  