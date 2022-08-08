// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyCpwFRB71zy9AyNmxjvH12IlAmS3UypWJY",
    authDomain: "ecommerce-js-b8564.firebaseapp.com",
    projectId: "ecommerce-js-b8564",
    storageBucket: "ecommerce-js-b8564.appspot.com",
    messagingSenderId: "353927577491",
    appId: "1:353927577491:web:8001cf7062360a1614f266"
};

const app = initializeApp(firebaseConfig);

import { getDatabase, ref, set, get, child, update, remove } from 'https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js'

const db = getDatabase()


/*=======================================================*/
/*=======================================================*/
/*=======================================================*/

import { limpiarHTML5 } from './limpiarHTML5.js'


const form = document.getElementById('form'),
    URL_Photo = document.getElementById('URL_Photo'),
    character_name = document.getElementById('character_name'),
    character_power = document.getElementById('character_power'),
    character_price = document.getElementById('character_price')




const image_container = document.querySelector('.img_container')


let Images = []

const getData = async () => {
    const res = await fetch(`https://ecommerce-js-b8564-default-rtdb.firebaseio.com/Character.json`)

    const data = await res.json()

    console.log(data);

    for (let i in data) {

        // console.log(i)
        Images.push({
            id: i,
            data: data[i]
        })

    }

    map()

}



form.addEventListener('submit', (e) => {
    e.preventDefault()

    console.log(e.target[0]);

    const data = {
        URL_Photo : e.target[0].value,
        character_name: e.target[1].value,
        character_power: e.target[2].value,
        character_price: e.target[3].value
    }

    const PostData = async () => {

        const res = await fetch(`https://ecommerce-js-b8564-default-rtdb.firebaseio.com/Character.json`, {
            method: 'POST',
            body: JSON.stringify(data)
        })

        getData()
    }
    PostData()
})


const DeleteData = async (id) => {

    const res = await fetch(`https://ecommerce-js-b8564-default-rtdb.firebaseio.com/Character/${id}.json`, {
        method: 'DELETE',
        body: JSON.stringify(id)
    })
    location.reload();

}



const map = () => {

    limpiarHTML5()
    
    Images.map((img) => {
        
        const character_card = document.createElement('div')
        character_card.className = 'character_card'
        character_card.id = img.id

        const divHover = document.createElement('div')
        divHover.className = 'divHover'

        character_card.addEventListener('mouseover',()=>{
            divHover.style.top = '50%'

        })
        character_card.addEventListener('mouseleave',()=>{
            divHover.style.top = '0%'
        })

        const nameWhite = document.createElement('p')
        nameWhite.textContent = img.data.character_name
        nameWhite.className = 'nameWhite'

        const div_power = document.createElement('div')
        div_power.className = 'div_power'

        const power = document.createElement('p')
        power.className = 'character_power'
        power.textContent = img.data.character_power
        
        div_power.appendChild(power)

        divHover.appendChild(nameWhite)
        divHover.appendChild(div_power)


        
        const close = document.createElement('button')
        close.className = 'close'
        close.textContent = 'x'


        close.addEventListener('click', (e) =>{
            let idActual = e.path[1].id
            // Images = Images.filter((img) =>img.id !== idActual)

            DeleteData(idActual)
            // getData()
            // map()
            // console.log(Images, 'imagew');

        })

        let image = document.createElement('img')
        image.className = 'character_image'
        console.log(img.data.URL_Photo);
        image.src = img.data.URL_Photo


        const name = document.createElement('h4')
        name.className = 'character_name'
        name.textContent = img.data.character_name


        const price = document.createElement('p')
        price.className = 'character_price'
        price.textContent = `$${img.data.character_price}`

        
        character_card.appendChild(divHover)
        character_card.appendChild(close)
        character_card.appendChild(image)
        character_card.appendChild(name)
        character_card.appendChild(price)


        image_container.appendChild(character_card)

        
    })
    // location.reload();
    console.log(Images);
}

document.addEventListener('DOMContentLoaded', () => {

    //  createImage()

    getData()

})


//GET curl 'https://ecommerce-js-b8564.firebaseio.com/users/jack/name.json'