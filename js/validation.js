// Kiểm tra không cho nhập rỗng
function checkEmptyValue(value, idSpan) {
  // Xử lí dữ liệu value để kiểm tra xem có rỗng hay không
  let eleSpan = document.getElementById(idSpan);
  if (value == "") {
    // Thực hiện đưa lên giao diện một đoạn thông báo cho người dùng
    eleSpan.innerHTML = "Vui lòng không bỏ trống trường này";
    return false;
  } else {
    eleSpan.innerHTML = "";
    return true;
  }
}

// Kiểm tra phải là email
function checkEmailValue(value, idSpan) {
  const regexEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  let isValid = regexEmail.test(value);
  console.log(isValid);
  if (isValid) {
    document.getElementById(idSpan).innerHTML = "";
    return true;
  } else {
    document.getElementById(idSpan).innerHTML = "Email không đúng định dạng";
    return false;
  }
}

// Sử dụng && để nhận cả 2 trường giá trị
function checkMinMaxValue(value, idSpan, min, max) {
  let doDaiKyTu = value.length;
  if (doDaiKyTu >= min && doDaiKyTu <= max) {
    document.getElementById(idSpan).innerHTML = "";
    return true;
  } else {
    document.getElementById(
      idSpan
    ).innerHTML = `Độ dài ký tự từ ${min} đến ${max}`;
    return false;
  }
}

// function password check
function checkPassword(value, idSpan) {
  const regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{6,10}$/;
  var isValid = regexPassword.test(value);
  if (isValid) {
    document.getElementById(idSpan).innerHTML = "";
    return true;
  } else {
    document.getElementById(idSpan).style.display = "block";
    document.getElementById(idSpan).innerHTML =
      "Mật khẩu cần có độ dài từ 6-10 và ít nhất 1 số, 1 ký tự in hoa, 1 kí tự đặc biệt";
    return false;
  }
}

//   function doubleCheck password
function doubleCheckEmail(value, value2, idSpan) {
  let eleSpan = document.getElementById(idSpan);
  if (value === value2) {
    eleSpan.innerHTML = "";
    return true;
  } else {
    eleSpan.innerHTML = "Vui lòng nhập lại mật khẩu";
  }
}
