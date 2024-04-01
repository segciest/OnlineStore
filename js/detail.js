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
            <a target="_blank" href="./detail.html?idSanPham=${item.id}">
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
