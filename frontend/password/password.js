const resetBtn = document.querySelector('.reset-btn');
const backBtn = document.querySelector('.back-btn');

backBtn.addEventListener('click', () => {
    window.location.href = 'http://127.0.0.1:5500/frontend/home.html';
});

resetBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const user = { email: email };
    const resp = await fetch('http://localhost:3202/api/users/forgotpassword', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });
    const resData = await resp.json();
    alert(resData.message);
    if (resData.success) {
        localStorage.setItem('url', resData.url);
        window.location.href = 'http://127.0.0.1:5500/frontend/password/reset.html';
    }
});
