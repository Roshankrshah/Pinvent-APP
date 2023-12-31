const registerBtn = document.querySelector('.register');
const loginBtn = document.querySelector('.login');

loginBtn.addEventListener('click', async(e) => {
    e.preventDefault();
    const emailInput = document.getElementById("exampleInputEmail1");
    const passwordInput = document.getElementById('exampleInputPassword1');
    const email = emailInput.value;
    const password = passwordInput.value;
    console.log(email, password);
    const user = {email: email, password: password };
    const resp = await fetch("http://localhost:3202/api/users/login", {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });
    const resData = await resp.json();
    if (resData.message) {
        alert(resData.message);
    } else {
        console.log(resData);
        //alert("login");
        localStorage.setItem('id',resData._id);
        localStorage.setItem('name',resData.name);
        location.href = '/frontend/dashboard/dashboard.html';
    }
});

registerBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const emailInput = document.getElementById("exampleInputEmail");
    const nameInput = document.getElementById("exampleInputName");
    const passwordInput = document.getElementById('exampleInputPassword');
    const email = emailInput.value;
    const name = nameInput.value;
    const password = passwordInput.value;
    console.log(email, name, password);
    const user = { name: name, email: email, password: password }
    const resp = await fetch("http://localhost:3202/api/users/register", {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });
    const resData = await resp.json();
    if (resData.message) {
        alert(resData.message);
    } else {
        console.log(resData);
        localStorage.setItem('id',resData._id);
        localStorage.setItem('name',resData.name);
        location.href = '/frontend/dashboard/dashboard.html';
    }
});

const start = async()=>{
    const res = await fetch('http://localhost:3202/api/users/loggedin',{
        credentials: 'include'
    });
    const resData = await res.json();
    const dashboard = document.querySelector('.dashboard');
    if(resData){
        dashboard.classList.add('active');
    }else{
        dashboard.classList.remove('active');
    }
}

start();