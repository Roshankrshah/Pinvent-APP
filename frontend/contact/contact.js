const user = document.querySelector('.username');
const sendBtn = document.querySelector('.send');

user.textContent = `Welcome, ${localStorage.getItem('name')}`;

sendBtn.addEventListener('click',async (e)=>{
    e.preventDefault();
    const subject = document.getElementById('InputSubject').value;
    const message = document.getElementById('InputMessage').value;
    const contact = {subject: subject,message:message};
    const resp = await fetch('http://localhost:3202/api/contactus',{
        method: 'POST',
        body: JSON.stringify(contact),
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });
    const resData = await resp.json();
    console.log(resData);
    alert(resData.message);
    location.reload();
});

const logoutBtn = document.querySelector('.logoutbtn');
logoutBtn.addEventListener('click', () => {

    fetch('http://localhost:3202/api/users/logout', {
        credentials: 'include'
    });
    localStorage.removeItem('name');
    localStorage.removeItem('id');
    console.log(document.cookie);
    location.href = 'http://127.0.0.1:5500/frontend/home.html';
});