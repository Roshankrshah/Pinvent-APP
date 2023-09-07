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
    location.href = 'http://127.0.0.1:5500/frontend/home.html';
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
    secondBox.innerHTML = `Total Store Value <br> ${totalCost}`;
    thirdBox.innerHTML = `Out of Stock <br> ${outOfStock}`;
    fourthBox.innerHTML = `All Categories <br> ${category.size}`;

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
    deleteBtns.forEach(deleteBtn => {
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

const editModal = async(resData) => {
    const openModal = document.querySelector('.openModal');
    const viewModal = document.createElement('div');
    viewModal.classList.add('modal-overlay');
    viewModal.classList.add('open-modal');
    viewModal.innerHTML = `
    <div class="modal-container">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Update Product Details</h5>
            </div>
            <div class="modal-body">
                <form>
                    <div class="mb-3">
                        <label for="formFile" class="form-label">Product Photo</label>
                        <input class="form-control" type="file" id="formFile" accept="image/*">
                    </div>
                    <div class="mb-3">
                        <label for="InputName" class="form-label">Product Name</label>
                        <input type="text" class="form-control" id="InputName" value="${resData.name}">
                    </div>
                    <div class="mb-3">
                        <label for="InputCategory" class="form-label">Product Category</label>
                        <input type="text" class="form-control" id="InputCategory" value="${resData.category}">
                    </div>
                    <div class="mb-3">
                        <label for="InputPrice" class="form-label">Product Price</label>
                        <input type="text" class="form-control" id="InputPrice" value="${resData.price}">
                    </div>
                    <div class="mb-3">
                        <label for="InputQuantity" class="form-label">Product Quantity</label>
                        <input type="text" class="form-control" id="InputQuantity" value="${resData.quantity}">
                    </div>
                    <div class="mb-3">
                        <label for="InputDescription" class="form-label">Product Description</label>
                        <textarea class="form-control" id="InputDescription" rows="3">${resData.description}</textarea>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary viewclose-btn" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary update-btn">Update</button>
            </div>
        </div>
    </div>`;

    openModal.appendChild(viewModal);
    let viewcloseBtn = document.querySelector(".viewclose-btn");
    let updateBtn = document.querySelector(".update-btn");

    viewcloseBtn.addEventListener("click", () => {
        openModal.removeChild(viewModal);
    });

    updateBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const image = document.getElementById('formFile');
        const productname = document.getElementById('InputName');
        const category = document.getElementById('InputCategory');
        const price = document.getElementById('InputPrice');
        const quantity = document.getElementById('InputQuantity');
        const desc = document.getElementById('InputDescription');

        const imageFile = image.files[0];
        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('name', productname.value);
        formData.append('category', category.value);
        formData.append('price', price.value);
        formData.append('quantity', quantity.value);
        formData.append('description', desc.value);

        const res = await fetch(`http://localhost:3202/api/products/${resData._id}`, {
            method: 'PATCH',
            body: formData,
            credentials: 'include'
        });

        if(res.status == 200){
            alert('Product Updated');
            location.reload();
        }else{
            alert('Try Again');
        }
    })
}

const editProduct = async (e) => {
    console.log(e.currentTarget.dataset.id);
    const res = await fetch(`http://localhost:3202/api/products/${e.currentTarget.dataset.id}`, {
        credentials: 'include'
    });
    const resData = await res.json();
    console.log(resData);
    editModal(resData);
}

const deleteProduct = async(e) => {
    const res = await fetch(`http://localhost:3202/api/products/${e.currentTarget.dataset.id}`,{
        method: 'DELETE',
        credentials: 'include'
    });
    if(res.status == 200){
        alert('Product Deleted');
        location.reload();
    }else{
        alert('Try Again');
    }
}

start();

