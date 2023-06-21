import type{ Ingredient, UnitMeasure } from "~/utils/recipe.builder.server"

export interface MeasureProps {
    ingredients : Array<Ingredient>
    units : Array<UnitMeasure>
    remove : (event : React.MouseEvent<HTMLElement> ) => void
    clear : boolean
    index : number
    
}