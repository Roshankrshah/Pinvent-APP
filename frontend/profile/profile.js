const userDetails = document.querySelector('.user-details');
const profileImage = document.querySelector('.profile-image');
const updateDetails = document.querySelector('.update-user-details');
const updateImage = document.querySelector('.update-profile-image');
const changeBtn = document.querySelector('.change-btn');

const start = async () => {
    const res = await fetch('http://localhost:3202/api/users/getuser', {
        credentials: 'include'
    });
    const resData = await res.json();
    console.log(resData);
    userDetails.innerHTML = `
        <p><strong>Name:</strong> ${resData.name}</p>
        <p><strong>Email:</strong> ${resData.email}</p>
        <p><strong>Phone:</strong> ${resData.phone ? resData.phone : ''}</p>
        <p><strong>Bio:</strong> ${resData.bio}</p>
        `;
    profileImage.setAttribute('src', `${resData.photo}`);

    updateImage.setAttribute('src', `${resData.photo}`);
    updateDetails.innerHTML = `
    <form>
        <div class="mb-3">
            <label for="InputName" class="form-label">Name</label>
            <input type="text" class="form-control" id="InputName" value="${resData.name}">
        </div>
        <div class="mb-3">
            <label for="InputEmail" class="form-label">Email address</label>
            <input type="email" class="form-control" id="InputEmail" value="${resData.email}" disabled>
        </div>
        <div class="mb-3">
            <label for="InputPhone" class="form-label">Phone</label>
            <input type="text" class="form-control" id="InputPhone" value="${resData.phone ? resData.phone : ''}">
        </div>
        <div class="mb-3">
            <label for="bioTextarea" class="form-label">Bio</label>
            <textarea class="form-control" id="bioTextarea" rows="3">${resData.bio}</textarea>
        </div>
        <div class="mb-3">
            <label for="formFile" class="form-label">Photo</label>
            <input class="form-control" type="file" id="formFile">
        </div>
        <button type="submit" class="btn btn-primary updatebtn">Save</button>
    </form>`;

    const newImage = document.getElementById('formFile');

    const updateBtn = document.querySelector('.updatebtn');

    updateBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const name = document.getElementById('InputName').value;
        const email = document.getElementById('InputEmail').value;
        const phone = document.getElementById('InputPhone').value;
        const bio = document.getElementById('bioTextarea').value;
        //const photo = document.getElementById('InputName').value;
        console.log(name, email, phone, bio);
        const updateUser = { name: name, email: email, phone: phone, bio: bio };

        const res = await fetch('http://localhost:3202/api/users/updateuser', {
            method: 'PATCH',
            body: JSON.stringify(updateUser),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        const resData = await res.json();
        console.log(resData);
        //alert('updated');
        location.reload();
    })
}

changeBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const password = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const user = { oldPassword: password, password: newPassword };
    if (newPassword.length > 6 && newPassword == confirmPassword) {
        const res = await fetch('http://localhost:3202/api/users/changepassword', {
            method: 'PATCH',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        if (res.status === 200) {
            alert('Password Updated');
        } else {
            const resData = await res.json();
            alert(resData.message);
        }
    } else {
        alert('Check Password Again');
    }
})

start();

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



