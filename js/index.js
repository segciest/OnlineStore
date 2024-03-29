// Lấy dữ liệu sản phẩm
let arrProduct = [];
function getAllProduct() {
  let promise = axios({
    url: "https://shop.cyberlearn.vn/api/Product",
    method: "GET",
  });
  // Thành công
  promise
    .then(function (res) {
      console.log(res.data.content);
      arrProduct = res.data.content;
      renderProduct(arrProduct);
      // return arrProduct;
      let newArrProduct = arrProduct.slice(0, 3);
      console.log(newArrProduct);
      renderCarousel(newArrProduct);
    })
    .catch(function (err) {
      // Thất bại
      console.log(err);
    });
}
getAllProduct();

// Render sản phẩm ra giao diện
function renderProduct(arr) {
  var content = "";
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
                <button class="w-50 styleButton2">
                <a target="_blank" href="./detail.html?idSanPham=${product.id}">Detail</a>
        
                </button>
                <p class="price_text text-center w-50">${product.price} $</p>
            </div>
            <button
                                    type="button"
                                    class="btn btn-outline-dark btnQuickView"
                                    data-bs-toggle="modal"
                                    data-bs-target="#staticBackdrop"
                                >
                                    <i class="fa-solid fa-magnifying-glass"></i>
                                </button>
        </div>
        <div
                                class="modal fade"
                                id="staticBackdrop"
                                data-bs-backdrop="static"
                                data-bs-keyboard="false"
                                tabindex="-1"
                                aria-labelledby="staticBackdropLabel"
                                aria-hidden="true"
                            >
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="staticBackdropLabel">Info Product</h5>
                                            <button
                                                type="button"
                                                class="btn-close"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                            ></button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="product_img">
                                                <img
                                                    src="${product.image}"
                                                    alt=""
                                                />
                                            </div>
                                            <div class="product_info">
                                                <h3 class="product_title">${product.name}</h3>
                                                <p class="product_description">${product.description}</p>
                                                <p class="product_size">${product.size}</p>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
    </div>
                    
        `;
  }
  document.getElementById("showProduct").innerHTML = content;
}
function renderCarousel(arr) {
  var contentCarousel = "";
  for (let i = 0; i < arr.length; i++) {
    var item = arr[i];
    contentCarousel += `
        <div class="carousel-item  ${i === 0 ? "active" : ""}">
        <div class="carousel_container">
        <div class="carousel_img">
        <img src="${item.image}" class="d-block" alt="..." />
        </div>
        <div class="carousel_item d-md-block">
            <h5>${item.name}</h5>
            <p>${item.shortDescription}</p>
            <button class="styleButton1">Detail</button>
        </div>
        </div>
            </div>
        
        `;
  }
  document.querySelector(".carousel-inner").innerHTML = contentCarousel;
}

// Tìm kiếm sản phẩm
function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    " "
  );
  return str;
}
function searchProduct(event) {
  event.preventDefault(); // Prevent form submission
  var inputElement = document.querySelector(".form-control");
  var valueUser = inputElement.value;
  console.log(valueUser);
  var keyword = valueUser.trim().toLowerCase();
  var newKeyword = removeVietnameseTones(keyword);
  console.log(newKeyword);
  var arrProductFilter = [];
  console.log(arrProduct);
  for (var i = 0; i < arrProduct.length; i++) {
    var item = arrProduct[i];
    var nameItem = item.name.trim().toLowerCase();
    if (nameItem.includes(keyword)) {
      arrProductFilter.push(item);
    }
  }
  console.log(arrProductFilter);
  renderProduct(arrProductFilter);
}
// document.getElementById('btnSearch').onclick = searchProduct;
