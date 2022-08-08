
let img_container = document.querySelector('.img_container')
console.log(img_container);

console.log(img_container);

export function limpiarHTML5(){
    console.log('limpiando');
    while(img_container.firstChild){
        console.log('entre');
        img_container.removeChild(img_container.firstChild)
    }
}