let cartList = [];

// lấy dữ liệu từ DB
async function hienThiSanPham() {
  try {
    let url = new URLSearchParams(window.location.search);
    let id = url.get("idSanPham");
    let resolve = await axios({
      url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`,
      method: "GET",
    });
    const data = resolve.data.content;
    return data;
  } catch (error) {
    console.log(error);
  }
  return resolve;
}

// Tạo các div thuộc tính cho sản phẩm
async function renderSanPham() {
  try {
    console.log("tôi là renderSanPham");
    const data = await hienThiSanPham();
    console.log(data);
    let content = "";
    content += `
    <div class="detailItem">
      <div class="img">
        <img src=${data.image} alt="" />
      </div>
      <div class="detailContent">
        <h2 class="detailTitle">${data.name}</h2>
        <p class="detailDesc">${data.description}</p>
        <span class="detailState"></span>
        <div class="btnSize"></div>
        <div class="detailFunction">
          <p class="detailPrice">$${data.price}</p>
          <button class="addToCart">Add to cart</button>
        </div>
      </div>
    </div>
                    `;
    return content;
  } catch (error) {
    console.log(error);
  }
}

// render các div cần tạo
async function renderGiaoDien() {
  try {
    console.log("tôi là renderGiaoDien");
    const content = await renderSanPham();
    document.getElementById("bodyDetail").innerHTML = content;
  } catch (error) {
    console.log(error);
  }
}
renderGiaoDien();

// render các element cần validate
async function renderElement() {
  console.log("tôi là renderElement");
  const data = await hienThiSanPham();
  let content = "";
  var quantityState = document.querySelector(".detailState");
  console.log(data);
  if (data.quantity > 0) {
    quantityState.innerHTML = "Available";
    quantityState.style.color = "green";
  } else {
    quantityState.innerHTML = "Not Available";
    quantityState.style.color = "red";
  }

  data.size.map((item, index) => {
    content += `
    <button class="btn btn-outline-primary btn-sm">${item}</button>
    `;
  });
  var btnSize = document.querySelector(".btnSize");
  btnSize.innerHTML = content;
}
renderElement();

async function relatedProducts() {
  let content = "";
  const data = await hienThiSanPham();
  data.relatedProducts.map((item, index) => {
    content += `
    <div class="relatedItem">
        <div class="relatedImg">
          <img src=${item.image} alt="" />
        </div>
        <div class="relatedTitle">
          <h2>${item.name}</h2>
        </div>
        <div class="relatedContent">
            <a target="" href="./detail.html?idSanPham=${item.id}">
              Buy now
            </a>
          <p class="relatedPrice">$${item.price}</p>
        </div>
    </div>
                    `;
  });
  document.getElementById("relatedProducts").innerHTML = content;
}
relatedProducts();

// Hàm lưu trữ dữ liệu vào localStorage
function saveLocalStorage(key, value) {
  // Chuyển đổi dữ liệu về thành chuỗi JSON
  var stringJson = JSON.stringify(value);
  // Sử dụng setItem để lưu trữ
  localStorage.setItem(key, stringJson);
}

// Hàm giúp lấy dữ liệu từ localStorage
function getLocalStorage(key) {
  var dataLocal = localStorage.getItem(key);
  // Kiểm tra dữ liệu xem có hay không, vì nếu localStorage. getItem gọi lấy dữ liệu không có sẽ trả về null
  if (dataLocal) {
    // Chuyển đổi chuỗi JSON về lại array hoặc object
    var newData = JSON.parse(dataLocal);
  }
  return newData;
}
function addToCart(data) {
  cartList = getLocalStorage("cartList");
  let check = cartList.findIndex((item) => item.id == data.id);
  let newCartList = [...cartList];
  if (check == -1) {
    newCartList.push({ ...data, total: 1 });
  } else {
    newCartList[check].total += 1;
  }
  cartList = newCartList;
  return cartList;
}
async function renderButton() {
  let data = await hienThiSanPham();

  document.querySelector(".addToCart").onclick = () => {
    addToCart(data);
    let list = addToCart(data);
    saveLocalStorage("cartList", list);
    console.log(cartList);
  };
}
renderButton();

async function renderCart() {
  let data = getLocalStorage("cartList");
  let content = "";

  if (cartList.length < 0) {
    cartList = [...data];
  } else {
    data.map((item) => {
      content += `
      <tr>
        <td>${item.name}</td>
        <td><img style="width:100px;height:100px" src="${item.image}"></td>
        <td>${item.price}</td>
        <td>${item.total}</td>
        
      </tr>
                  `;
    });
  }
  document.getElementById("bodyCart").innerHTML = content;

  return content;
}
renderCart();
