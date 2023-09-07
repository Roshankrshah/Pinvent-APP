const logoutBtn = document.querySelector('.logoutbtn');
const user = document.querySelector('.username');

user.textContent = `Welcome, ${localStorage.getItem('name')}`

logoutBtn.addEventListener('click', () => {

    fetch('http://localhost:3202/api/users/logout', {
        credentials: 'include'
    });
    localStorage.removeItem('name');
    localStorage.removeItem('id');
    console.log(document.cookie);
    alert('logout')
});

const start = async () => {
    const res = await fetch('http://localhost:3202/api/products', {
        credentials: 'include'
    });
    const resData = await res.json();
    console.log(resData);
    const totalProduct = resData.length;
    let category = new Set();
    let totalCost = 0;
    let outOfStock = 0;

    resData.forEach((product) => {
        category.add(product.category);
        totalCost += (Number(product.quantity) * Number(product.price));
        if (product.quantity == 0) {
            outOfStock += 1;
        }
    });

    console.log(totalProduct, category, totalCost, outOfStock);
    const firstBox = document.querySelector('.first-box');
    const secondBox = document.querySelector('.second-box');
    const thirdBox = document.querySelector('.third-box');
    const fourthBox = document.querySelector('.fourth-box');

    firstBox.innerHTML = `Total Products <br> ${totalProduct}`;
    secondBox.innerHTML = `Total Store Value <br> ${category.size}`;
    thirdBox.innerHTML = `Out of Stock <br> ${totalCost}`;
    fourthBox.innerHTML = `All Categories <br> ${outOfStock}`;

    const productTable = document.querySelector('table');

    resData.forEach((product, index) => {
        const tableRow = `
            <tr>
                <td>${index + 1}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.price}</td>
                <td>${product.quantity}</td>
                <td>${product.quantity * product.price}</td>
                <td>
                    <button class="btn view" data-id="${product._id}"><i class="fa-regular fa-eye"></i> </button>
                    <button class="edit" data-id="${product._id}"><i class="fa-regular fa-pen-to-square"></i></button> 
                    <button class="delete" data-id="${product._id}"><i class="fa-regular fa-trash-can"></i></button>
                </td>
            </tr>`;

        productTable.innerHTML += tableRow;
    });

    const viewBtns = document.querySelectorAll('.view');
    const editBtns = document.querySelectorAll('.edit');
    const deleteBtns = document.querySelectorAll('.delete');

    viewBtns.forEach(viewBtn => {
        viewBtn.addEventListener('click', viewProduct);
    });
    editBtns.forEach(editBtn => {
        editBtn.addEventListener('click', editProduct);
    });
    deleteBtns.forEach(deleteBtn=>{
        deleteBtn.addEventListener('click', deleteProduct);
    });
};

const modalAddition = (resData) => {
    const openModal = document.querySelector('.openModal');
    const viewModal = document.createElement('div');
    viewModal.classList.add('modal-overlay');
    viewModal.classList.add('open-modal');
    viewModal.innerHTML = `
    <div class="modal-container">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Product Details</h5>
            </div>
            <div class="modal-body">
                       
                <p>
                    <strong>Product Image</strong><br> <img src="${resData.image.filePath}" width=200 height =200><br>
                    <strong>Product Name:</strong> ${resData.name}<br>
                    <strong>Product Category:</strong> ${resData.category}<br>
                    <strong>Product Price:</strong> ₹${resData.price}<br>
                    <strong>Product Quantity:</strong> ${resData.quantity}<br>
                    <strong>Product Description:</strong> ${resData.description}<br>
                    <strong>Product Added On:</strong> ${new Date(resData.createdAt).toLocaleDateString()}<br>
                </p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary viewclose-btn" data-bs-dismiss="modal">Cancel</button>
            </div>
        </div>
    </div>`;
    openModal.appendChild(viewModal);
    let viewcloseBtn = document.querySelector(".viewclose-btn");

    viewcloseBtn.addEventListener("click", () => {
        openModal.removeChild(viewModal);
    });
}

const viewProduct = async (e) => {
    const res = await fetch(`http://localhost:3202/api/products/${e.currentTarget.dataset.id}`, {
        credentials: 'include'
    });
    const resData = await res.json();
    console.log(resData);
    modalAddition(resData);
}

const editProduct = (e) => {
    console.log(e.currentTarget.dataset.id);
    const openModal = document.querySelector('.openModal');
    const viewModal = document.createElement('div');
    viewModal.classList.add('modal-overlay');
    viewModal.classList.add('open-modal');
    viewModal.innerHTML = `
    <div class="modal-container">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"></h5>
            </div>
            <div class="modal-body">
                <h2></h2>
                <h5></h5>
                <p></p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary viewclose-btn" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary book-btn">Book</button>
            </div>
        </div>
    </div>`;
    openModal.appendChild(viewModal);
    let viewcloseBtn = document.querySelector(".viewclose-btn");

    viewcloseBtn.addEventListener("click", () => {
        openModal.removeChild(viewModal);
    });
}

const deleteProduct = () => {

}

start();

