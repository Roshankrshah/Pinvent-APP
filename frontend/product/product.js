const submitBtn = document.querySelector('.submit');
const image = document.getElementById('formFile');
const productname = document.getElementById('InputName');
const category = document.getElementById('InputCategory');
const price = document.getElementById('InputPrice');
const quantity = document.getElementById('InputQuantity');
const desc = document.getElementById('InputDescription');

submitBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    const imageFile = image.files[0];
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('name', productname.value);
    formData.append('category', category.value);
    formData.append('price', price.value);
    formData.append('quantity', quantity.value);
    formData.append('description', desc.value);

    try {
        const res = await fetch('http://localhost:3202/api/products', {
            method: 'POST',
            body: formData,
            credentials: 'include'
        });
    } catch {
        alert('New Product Added');
    }
});

const logoutBtn = document.querySelector('.logoutbtn');
logoutBtn.addEventListener('click', () => {

    fetch('http://localhost:3202/api/users/logout', {
        credentials: 'include'
    });
    localStorage.removeItem('name');
    localStorage.removeItem('id');
    console.log(document.cookie);
    location.href = '/frontend/home.html';
});