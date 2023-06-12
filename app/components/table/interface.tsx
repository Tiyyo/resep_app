export interface TableProps {
    data : Array<any>
    endpoint? : string
    isMultiData? : boolean
}

export interface TableBodyProps {
    data: Array<any>;
    keys: Array<string>;
    endpoint: string;
    isMultiData : boolean
}