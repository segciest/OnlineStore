import { checkEmailValue, checkEmptyValue } from "./validation.js";
import { doubleCheckPassword } from "./validation.js";
import { checkPassword } from "./validation.js";
import { checkNoNumber } from "./validation.js";
import { checkIsVietnamesePhoneNumber } from "./validation.js";
import User from "./user.js";
// async function getInfo() {
//   try {
//     let promise = await axios({
//       url: "https://shop.cyberlearn.vn/api/Users/signup",
//       method: "POST",
//       data: user,
//     });
//     let arrInput = document.querySelectorAll("#form input");
//     let email = document.querySelector("input[name='selector']:checked").value;
//     console.log(arrInput);
//     console.log(email);
//     let user = new User();
//     arrInput.forEach((item, index) => {
//       let { id, value } = item;
//       user[id] = value;
//     });
//     console.log(user);
//   } catch (err) {
//     console.log(err);
//   }
// }

// Lấy dữ liệu người dùng
function getValue() {
  let user = new User();
  let arrInput = document.querySelectorAll("#form input");
  let gender = document.querySelector("input[name='selector']:checked").value;

  arrInput.forEach((item, index) => {
    let { id, value } = item;
    user[id] = value;
    user.gender = gender;
  });
  return user;
}

// Hàm check validate
function checkIn() {
  let user = getValue();
  let isValid = true;

  //   Check dữ liệu rỗng
  isValid &= checkEmptyValue(user.email, "emailNoti");
  isValid &= checkEmptyValue(user.passoword, "passwordNoti");
  isValid &= checkEmptyValue(user.name, "nameNoti");
  isValid &= checkEmptyValue(user.phone, "phoneNoti");

  // Check định dạng password
  isValid &= checkPassword(user.passoword, "passwordNoti");
  isValid &= checkPassword(user.passwordConfirm, "passwordConfirmNoti");

  //   Check double passord
  isValid &= doubleCheckPassword(
    user.password,
    user.passwordConfirm,
    "passwordConfirmNoti"
  );

  //   Check định dạng email
  isValid &= checkEmailValue(user.email, "emailNoti");

  //   Check định dạng sđt
  isValid &= checkIsVietnamesePhoneNumber(user.phone, "phoneNoti");

  //   Check định dạng tên
  isValid &= checkNoNumber(user.name, "nameNoti");
  if (isValid) {
    return user;
  }
}

// Hàm đưa dữ liệu lên API
function addUser() {
  let user = checkIn();
  let promise = axios({
    url: "https://shop.cyberlearn.vn/api/Users/signup",
    method: "POST",
    data: user,
  });
  promise
    .then(function (res) {
      console.log(res);
      displayNotification(res.data.message, res.data.statusCode);
      resetForm();
    })
    .catch(function (err) {
      console.log(err);
      displayNotification(err.message, err.response.status);
    });
}
function resetForm() {
  // getAllSinhVien();
  document.querySelector("form").reset();
}
function displayNotification(message, status) {
  var firstLetter = status.toString().split("");
  Toastify({
    text: message,
    duration: 2000,
    close: true,
    gravity: "top",
    position: "right",
    style: {
      background: firstLetter[0] == 2 ? "green" : "red",
      color: "white",
    },
  }).showToast();
}
// Sự kiện submit
document.getElementById("btnSubmit").onclick = addUser;
