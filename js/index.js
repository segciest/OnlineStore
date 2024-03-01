// Lấy dữ liệu sản phẩm
let arrProduct = [];
function getAllProduct() {
    let promise = axios({
        url: 'https://shop.cyberlearn.vn/api/Product',
        method: 'GET',
    });
    // Thành công
    promise
        .then(function (res) {
            console.log(res.data.content);
            arrProduct = res.data.content;
            renderProduct(arrProduct);
        })
        .catch(function (err) {
            // Thất bại
            console.log(err);
        });
}
getAllProduct();

// Render sản phẩm ra giao diện
function renderProduct(arr) {
    var content = '';
    for (let index = 0; index < arr.length; index++) {
        var product = arr[index];
        content += `
        <div class="col card_body">
        <div class="product_content">
            <div class="product_img">
                <img src="${product.image}" alt="" />
            </div>
            <div class="product_info">
                <h3 class="product_title">${product.name}</h3>
                <p class="product_description">${product.shortDescription}</p>
            </div>
            <div class="product_button">
                <button class="w-50 styleButton2">Detail</button>
                <p class="price_text text-center w-50">${product.price} $</p>
            </div>
        </div>
    </div>
                        
        `;
    }
    document.getElementById('showProduct').innerHTML = content;
}
