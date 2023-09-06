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

const start = async() => {
    const res = await fetch('http://localhost:3202/api/products',{
        credentials: 'include'
    });
    const resData = await res.json();
    console.log(resData);
    const totalProduct = resData.length;
    let category = new Set();
    let totalCost = 0;
    let outOfStock = 0;

    resData.forEach((product)=>{
        category.add(product.category);
        totalCost += (Number(product.quantity) * Number(product.price));
        if(product.quantity == 0){
            outOfStock += 1;
        }
    });

    console.log(totalProduct, category,totalCost,outOfStock);
    const firstBox = document.querySelector('.first-box');
    const secondBox = document.querySelector('.second-box');
    const thirdBox = document.querySelector('.third-box');
    const fourthBox = document.querySelector('.fourth-box');

    firstBox.innerHTML = `Total Products <br> ${totalProduct}`;
    secondBox.innerHTML = `Total Store Value <br> ${category.size}`;
    thirdBox.innerHTML = `Out of Stock <br> ${totalCost}`;
    fourthBox.innerHTML = `All Categories <br> ${outOfStock}`;
};

start();