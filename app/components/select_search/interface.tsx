interface Option {
  label? : string 
  value? : number | string
}

export interface SelectSearchProps {
    data: Array<any>;
    name : string
    index : string
    filterBy: string;
    width? : string
    getState? : (args : any) => any
    optionMax?: number;
    placeholder? : string
    defaultValue? : Option
    clear? : boolean
  }
  
