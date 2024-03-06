let soLuong = 1;
function giamSoLuong(){
    soLuong ++;
    updateSoLuong();
}

function tangSoLuong() {
    if (soLuong > 1) {
      soLuong--;
      updateSoLuong();
    }
  }



function  updateSoLuong(){
    document.getElementById('soLuong').innerText = soLuong;
}
let arrBanGiay = {};
function getProductId(){
    let promise = axios({
        url: 'https://shop.cyberlearn.vn/api/Product/getbyid?id=16',
        method: 'GET',
    });

    promise.then(function(res){
        console.log(res);
        arrBanGiay = res.data.content;
        renderGiay(arrBanGiay);
    }).catch(function(err){
        console.log(err);
    });
}

getProductId();

function renderGiay(obj){
    var content = '';
    Object.values(obj.relatedProducts).forEach(function(product) {
        content +=`
        
        <div class="col-4 card_realate">
            <div class="realate">
                <div class="realate_img">
                    <img src="${product.image}" alt="" />
                </div>
                <div class="realate_info">
                    <h3 class="realate_title">${product.name}</h3>
                    <p class="realate_sub">${product.shortDescription}</p>
                </div>
                <div class="product_button">
                    <button class="btn">Buy now</button>
                    <p class="price_text text-center">${product.price}</p>
                </div>
            </div>
        </div>`;
    });

    document.getElementById('showRealate').innerHTML = content;
}