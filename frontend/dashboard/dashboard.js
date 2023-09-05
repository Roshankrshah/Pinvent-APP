const logoutBtn = document.querySelector('.logoutbtn');
const user = document.querySelector('.username');

user.textContent = `Welcome, ${localStorage.getItem('name')}`

logoutBtn.addEventListener('click',()=>{

    fetch('http://localhost:3202/api/users/logout',{
    credentials: 'include'});
    localStorage.removeItem('name');
    localStorage.removeItem('id');
    console.log(document.cookie);
    alert('logout')
});