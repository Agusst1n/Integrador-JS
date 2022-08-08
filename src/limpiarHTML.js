import { itemsCart } from "./variables/variables.js";

export function limpiarHTML(){
    while(itemsCart.firstChild){
        itemsCart.removeChild(itemsCart.firstChild);
    }
}