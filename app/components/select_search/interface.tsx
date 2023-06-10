export interface SelectSearchProps {
    data: Array<object>;
    name : string
    index : string
    filterBy: string;
    width? : string
    getState? : (args : any) => any
    optionMax?: number;
    placeholder? : string
  }
  