const button_register = document.getElementById('submit')
const button_login = document.getElementById('login')

const form = document.getElementById('form')

let data = {}

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    console.log(e.path[0]);
    let user = e.path[0][0].value
    let password = e.path[0][1].value
    let password2 = e.path[0][2].value

    if(user === '' || password === '' || password2 === ''){
        console.log('error');
        return
    }else{
        proces(e)
    }
})


const proces = (e) => {
    data = {
        username: e.path[0][0].value,
        password: e.path[0][1].value,
        password2: e.path[0][2].value,
    }
    console.log(data,'click');
    localStorage.setItem('data', JSON.stringify(data));

    button_login.style.display = 'block';
}