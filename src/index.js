//https://gateway.marvel.com/v1/public/characters?ts=1&apikey=a479a53c289ad03d1306dc670fcf1b26&hash=e41fecea9bd59feb65b42eae4cb9363b

import { limpiarHTML } from './limpiarHTML.js'
import {main_characters, itemsCart, gif, main_card, divHover, search_input} from './variables/variables.js'

let quantity = document.querySelector('.quantity')
let cartDiv = document.querySelector('.cart')

/**
 * ACTIVANDO EL MODAL DEL CARRITO
 */
let cart = []

cartDiv.addEventListener('click',()=>{
    itemsCart.classList.toggle('active')
})
//Guarda en el localstorage
const setLocalStorage = () => {
    localStorage.setItem('cart', JSON.stringify(cart))
}

//obtiene los elementos del localstorage
const getLocalStorage = () => {
    const cartLocal = JSON.parse(localStorage.getItem('cart'))
    console.log(cartLocal, 'getLocal');

    console.log(cartLocal, 'cartLocal');

    cart = cartLocal

    checkItems()
    quantityOfCart()
    
}


search_input.addEventListener('keyup', (event) => {
    console.log(event.target.value);

    document.querySelectorAll(".main_card").forEach(card =>{

        card.textContent.toLowerCase().includes(event.target.value.toLowerCase())
          ?card.classList.remove("filtro")
          :card.classList.add("filtro")
    })
})

const URL = `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=a479a53c289ad03d1306dc670fcf1b26&hash=e41fecea9bd59feb65b42eae4cb9363b`

const results = []


let cantidad = 1


// * QUANTITY
// */

//Checkea cuantos elementos hay en el carrito
const quantityOfCart = ()=>{
   for(let i=0; i < cart.length ; i++) {
       quantity.textContent = i + 1
   }
}


//Mapea el carrito 
const checkItems = () => {


    limpiarHTML()

    cart.map((item, index)=>{



        /**
         * HAY QUE LIMPIAR EL CARRITO PORQUE ME DUPLICA LOS ITEMS QUE TIENE
         * 
         * !FIJATE LA FUNCION DE LIMPIEZA QUE HABIAN HECHO EN NUCBA
         */

        let itemCart = document.createElement('div')
        itemCart.className = 'itemCart'
    
        const itemImg = document.createElement('img')
        itemImg.src = item.img
        itemImg.className = 'itemImg'
    
        const itemName = document.createElement('h3')
        itemName.className = 'itemName'
        itemName.textContent = item.name
        
        const itemQuantity = document.createElement('p')
        itemQuantity.textContent = item.itemQuantity

        let delet = document.createElement('button')
        delet.textContent = 'Delete'


        delet.addEventListener('click', () =>{
            
            if(item.itemQuantity >1){
                console.log(item, 'click')
                item.itemQuantity--
                checkItems()
                setLocalStorage()

            }else{

                // item.itemQuantity = 0
                let ElementosFiltrado = cart.filter((e)=> e.id !== item.id)
                cart = ElementosFiltrado
                
                console.log(cart, 'el kart')

                checkItems()
                quantityOfCart()
                setLocalStorage()
                
            }
        })


        itemCart.appendChild(itemImg)
        itemCart.appendChild(itemName)
        itemCart.appendChild(itemQuantity)
        itemCart.appendChild(delet)

    
    
    
        itemsCart.appendChild(itemCart)

        console.log(item, ' el itemeee')
    })
}

main_characters.appendChild(gif)


//hace la peticion a la API
const fetchAPI = async () =>{

    gif.style.display = 'block'



    const res = await fetch(URL)
    const data = await res.json()


    const results = data.data.results

    console.log(results)

    mapCharacters(results)

    gif.style.display = 'none'

}


//Crea una card por cada personaje de la API
const mapCharacters = (results) =>{
    results.map((c, index)=> {

        const div = document.createElement('div')

        const divHover = document.createElement('div')
        divHover.className = 'divHover'

        const nameWhite = document.createElement('p')
        nameWhite.textContent = c.name
        nameWhite.className = 'nameWhite'
        
        divHover.appendChild(nameWhite)

        let id = c.id

        div.dataset.id = c.id
        div.className = 'main_card'
        const p = document.createElement('p')
        const img = document.createElement('img')

        p.textContent = c.name
        img.src = `${c.thumbnail.path}.${c.thumbnail.extension}`
        img.className = 'main_card_img'

        const button_agregar = document.createElement('button')
        button_agregar.className = 'button_agregar'
        button_agregar.textContent = `Agregar al carrito`

        const button_eliminar = document.createElement('button')
        button_eliminar.className = 'button_eliminar'
        button_eliminar.textContent = `Eliminar del carrito`

        const buttons_div = document.createElement('div')
        buttons_div.className = 'buttons_div'


        /**
         * HOVEREFFECT
         */

         div.addEventListener('mouseover',()=>{
            // divHover.classList.toggle('active')
            divHover.style.top = '50%'
        })

        div.addEventListener('mouseleave',()=>{
            // divHover.classList.toggle('active')
            divHover.style.top = '0%'
        })
        /**

        /**
         * BUTTON AGREGAR
         */

        button_agregar.addEventListener('click', ()=>{
            console.log(id ,'agregando a: ', c.name)

            let existe = cart.some(elemet => elemet.id === c.id)

            if(existe){
                
                cart.map(element=>{
                    if(element.id === c.id){
                        console.log(element.itemQuantity,'ya esta')
                        console.log(cart, 'el cart')
                        element.itemQuantity ++
                        return
                    }
                })
                
            }else{
                cart = [...cart, {id: c.id, itemQuantity:1, name: c.name, img: `${c.thumbnail.path}.${c.thumbnail.extension}`}]
                console.log(cart)
            }

            quantityOfCart()
            checkItems()
            setLocalStorage()
            
            console.log(cantidad)
        })


        /**
         * BUTTON ELIMINAR
         */

         button_eliminar.addEventListener('click', ()=>{
            console.log(id ,'agregando a: ', c.name)




            let existe = cart.some(elemet => elemet.id === c.id)


            if(existe){
                
                cart.map(element=>{
                    if(element.id === c.id){
                        if(element.itemQuantity > 1){
                            console.log('borrando 1')
                            element.itemQuantity --
                            return
                        }else{
                            let ElementosFiltrado = cart.filter((e)=> e.id !== id)
                            cart = ElementosFiltrado

                        }
                    }
                })
            }
                
            console.log(cart)

            quantityOfCart()
            checkItems()
            setLocalStorage()
        })




        buttons_div.appendChild(button_agregar)
        buttons_div.appendChild(button_eliminar)
        
        div.appendChild(divHover)
        div.appendChild(img)
        div.appendChild(p)
        div.appendChild(buttons_div)

        main_characters.appendChild(div)
    })

}


document.addEventListener('DOMContentLoaded', ()=>{

    fetchAPI()

    if(localStorage.getItem('cart')){
        getLocalStorage()
    }

})


