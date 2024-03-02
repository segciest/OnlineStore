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
function getValue() {
  let user = new User();
  let isValid = true;
  let arrInput = document.querySelectorAll("#form input");
  let gender = document.querySelector("input[name='selector']:checked").value;

  arrInput.forEach((item, index) => {
    let { id, value } = item;
    user[id] = value;
    user.gender = gender;
  });
  isValid &= checkEmptyValue(user.email, "emailNoti");
  isValid &= checkEmptyValue(user.passoword, "passwordNoti");
  isValid &= checkEmptyValue(user.name, "nameNoti");
  isValid &= checkEmptyValue(user.phone, "phoneNoti");
  isValid &= doubleCheckEmail(
    user.password,
    user.passwordConfirm,
    "passwordConfirmNoti"
  );

  if (isValid) {
    return user;
  }
}
function addUser() {
  let user = getValue();
  let promise = axios({
    url: "https://shop.cyberlearn.vn/api/Users/signup",
    method: "POST",
    data: user,
  });
  promise
    .then(function (res) {
      console.log(res);
    })
    .catch(function (err) {
      console.log(err);
    });
}
document.getElementById("btnSubmit").onclick = addUser;
