const changeBtn = document.querySelector('.change-btn');

changeBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const password = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password.length > 6 && password == confirmPassword) {
        const user = { password: password };
        const url = localStorage.getItem('url');
        console.log(url)
        const res = await fetch(`${url}`, {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        const resData = await res.json();
        console.log(resData);
        localStorage.removeItem("url");
        alert('Password Reset, Login Again');
        window.location.href = '/frontend/home.html';
    } else {
        alert('Check Password Again');
    }
})
