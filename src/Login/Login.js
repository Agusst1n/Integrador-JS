const button_login = document.getElementById('login'),
      username = document.getElementById('username'),
      password = document.getElementById('password'),
      form = document.getElementById('form'),
      login = document.getElementById('login')






form.addEventListener('submit', (e)=>{
    e.preventDefault();

    let username = e.path[0][0].value
    let password = e.path[0][1].value
    
    if(localStorage.getItem('data')){
        let data = JSON.parse(localStorage.getItem('data'))
        if(data){
            if(username === data.username && password === data.password){
                console.log('Login accept');
                login.style.display = 'block'
            }else{
                console.log('error');
            }
        }
    }else{
        console.log('error');
    }
});    

