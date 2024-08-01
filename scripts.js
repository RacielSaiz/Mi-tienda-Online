// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    let products = [
        { id: 1, name: 'Producto 1', price: 10, category: 'Category 1', description: 'Descripción del producto 1', image: 'image1.jpg', contact: '1234567890' },
        { id: 2, name: 'Producto 2', price: 20, category: 'Category 2', description: 'Descripción del producto 2', image: 'image2.jpg', contact: 'example@example.com' },
        // Añadir más productos según sea necesario
    ];

    const productList = document.getElementById('productList');
    const searchNameInput = document.getElementById('searchName');
    const searchDescriptionInput = document.getElementById('searchDescription');
    const categoryFilter = document.getElementById('categoryFilter');
    const addProductButton = document.getElementById('addProductButton');
    const addProductPanel = document.getElementById('addProductPanel');
    const addProductForm = document.getElementById('addProductForm');

    const displayProducts = (filteredProducts) => {
        productList.innerHTML = '';
        filteredProducts.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'product';
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>Precio: $${product.price}</p>
                <p>Contacto: ${product.contact}</p>
                <button onclick="contactSeller(${product.id})">Contactar Vendedor</button>
            `;
            productList.appendChild(productElement);
        });
    };

    const filterProducts = () => {
        const searchNameQuery = searchNameInput.value.toLowerCase();
        const searchDescriptionQuery = searchDescriptionInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        const filteredProducts = products.filter(product => {
            const matchesName = product.name.toLowerCase().includes(searchNameQuery);
            const matchesDescription = product.description.toLowerCase().includes(searchDescriptionQuery);
            const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
            return (matchesName || matchesDescription) && matchesCategory;
        });
        displayProducts(filteredProducts);
    };

    addProductButton.addEventListener('click', () => {
        addProductPanel.style.display = addProductPanel.style.display === 'none' ? 'block' : 'none';
    });

    addProductForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const productName = document.getElementById('productName').value;
        const productDescription = document.getElementById('productDescription').value;
        const productPrice = document.getElementById('productPrice').value;
        const productImage = document.getElementById('productImage').files[0];
        const sellerPhone = document.getElementById('sellerPhone').value;
        const sellerEmail = document.getElementById('sellerEmail').value;
        const productCategory = document.getElementById('productCategory').value !== 'Sin categorías'
            ? document.getElementById('productCategory').value
            : document.getElementById('newCategory').value || 'Sin categorías';

        if (!productImage) {
            alert('Debe seleccionar una imagen para el producto.');
            return;
        }

        if (!sellerPhone && !sellerEmail) {
            alert('Debe proporcionar al menos un número de celular o un correo electrónico de contacto.');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const newProduct = {
                id: Date.now(),
                name: productName,
                description: productDescription,
                price: productPrice,
                image: reader.result,
                contact: sellerPhone || sellerEmail,
                category: productCategory,
            };

            products.push(newProduct);
            displayProducts(products);
            addProductForm.reset();
            addProductPanel.style.display = 'none';
        };
        reader.readAsDataURL(productImage);
    });

    searchNameInput.addEventListener('input', filterProducts);
    searchDescriptionInput.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);

    // Inicializar mostrando todos los productos
    displayProducts(products);
});

function contactSeller(productId) {
    alert(`Contactar al vendedor del producto ${productId}`);
}
