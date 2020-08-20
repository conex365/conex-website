async function conexplusReg() {
  const name = document.getElementById("name").value;
  const phonenumber = document.getElementById("phonenumber").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;
  const description = document.getElementById("description").value;

  const data = JSON.stringify({
    Name: name,
    Phonenumber: phonenumber,
    Email: email,
    Address: address,
    Description: description,
  });

  const rawResponse = await fetch("/api/registration/conexplus", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: data,
  });

  const res = await rawResponse.json();

  //Check For Validation Errors
  const errorAlert = document.getElementById("erroralert");
  if (res.error) {
    errorAlert.style.display = "block";
    errorAlert.innerHTML = res.error;
  } else {
    errorAlert.style.display = "none";
  }
  // const emailAlert = document.getElementById("emailalert");
  // if (res.Email) {
  //   emailAlert.style.display = "block";
  //   emailAlert.innerHTML = res.Email;
  // } else {
  //   emailAlert.style.display = "none";
  // }

  const emailError = document.getElementById("emailerror");
  if (res.msg) {
    emailError.style.display = "block";
    emailError.innerHTML = "Email is currently in use";
  } else {
    emailError.style.display = "none";
  }

  const form = document.getElementById("content");
  form.reset();

  if (res._id) {
    $("#myModal").modal("show");
  } else {
    $("#myModal").modal("hide");
  }
}

function onloadError() {
  const errorAlert = document.getElementById("erroralert");
  errorAlert.style.display = "none";
  const emailAlert = document.getElementById("emailalert");
  emailAlert.style.display = "none";
  const emailError = document.getElementById("emailerror");
  emailError.style.display = "none";
}

function deleteUser(id) {
  console.log(id);
  var url = `/api/registration/conexplus/${id}`;
  fetch(url, {
    method: "DELETE",
  }).then((response) => {
    response.json().then((json) => {
      console.log(json);
      location.reload();
    });
  });
}