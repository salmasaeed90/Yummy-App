/////////////////////////////////////////////////////
const searcCont = document.getElementById("search-container");
const rowData = document.querySelector("#row");
let submitBtn;
const loading = document.querySelector(".loading");
const links = document.querySelectorAll(".links");
const close_open_icon = document.querySelector(".fa-bars");
const sid_nav_menu = document.querySelector(".sid-nav");
const sid_nav = document.querySelector(".sid-nav2");

const anchors = document.querySelectorAll(".links a");
////////////////////////////////////////////////////////////
//button => open and close sidebar
close_open_icon.addEventListener("click", () => {
  if (close_open_icon.classList.contains("fa-bars")) {
    //close
    //icon =>change
    close_open_icon.classList.replace("fa-bars", "fa-xmark");

    // menu left = -width
    sid_nav_menu.style.left = "0";
    sid_nav.style.left = "250px";
    anchors.forEach((a) => {
      a.style.paddingTop = "10px";
    });
    //"animate-to-down"
  } else {
    //ope
    //icon =>change
    close_open_icon.classList.replace("fa-xmark", "fa-bars");
    // menu left = -width
    sid_nav_menu.style.left = "-250px";
    sid_nav.style.left = "0";
    //links animate
    anchors.forEach((a) => {
      a.style.paddingTop = "50px";
    });
  }
});
///////////////////////////////////////////////////
// close nav ==> click on links

links.forEach((link) => {
  link.addEventListener("click", () => {
    //icon =>change
    close_open_icon.classList.replace("fa-xmark", "fa-bars");
    // menu left = -width
    sid_nav_menu.style.left = "-250px";
    sid_nav.style.left = "0";
  });
});

//////////////////////////logo///////////////////////////////
document.querySelector(".logo").addEventListener("click", () => {
  getMeals();
});
//////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  functions//////////////////////////////////////////////////////////////////////////
//get data about meals in home
async function getMeals() {
  loading.classList.add("lds-dual-ring");
  rowData.innerHTML = "";
  searcCont.innerHTML = "";
  loading.classList.remove("d-none");

  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=`
  );
  const data = await api.json();

  // const sliceData = data.meals.slice(0, 19);
  // console.log(data.meals);
  loading.classList.remove("lds-dual-ring");
  displayMeals(data.meals);
}

getMeals();

// display meal data
function displayMeals(data) {
  let card = "";
  for (let i = 0; i < data.length; i++) {
    card += `
    <div class="col-lg-3 col-md-6 col-sm">
    <div onclick="getMealDetails('${data[i].idMeal}')" class="card cursor-pointer rounded-2 bg-black overflow-hidden">
        <div class="img">
        <img
            class="w-100 h-100 rounded-2"
            src="${data[i].strMealThumb}"
            alt=""
        />
        </div>
        <div
        class="title-layer p-3 rounded-2 d-flex align-items-center justify-content-center"
        >
        <h3 data-id='${data[i].idMeal}'>${data[i].strMeal}</h3>
        </div>
    </div>
    </div>
    `;
  }
  rowData.innerHTML = card;
}

/////category/////
async function getAllCategories() {
  rowData.innerHTML = "";
  searcCont.innerHTML = "";
  loading.classList.add("lds-dual-ring");
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  const data = await api.json();
  // const sliceData = data.categories.slice(0, 19);
  loading.classList.remove("lds-dual-ring");
  displayAllCategories(data.categories);
}

function displayAllCategories(data) {
  let card = "";
  for (let i = 0; i < data.length; i++) {
    card += `
    <div class="col-lg-3 col-md-6 col-sm">
    <div onclick="getCategories('${
      data[i].strCategory
    }')" class="card cursor-pointer rounded-2 bg-black overflow-hidden">
        <div class="img">
        <img
            class="w-100 h-100 rounded-2"
            src="${data[i].strCategoryThumb}"
            alt=""
        />
        </div>
        <div
        class="title-layer rounded-2 "
        >
        <h3 class='text-center cat-title p-5'>${data[i].strCategory}</h3>
        <div><p  class='text-center'>${data[i].strCategoryDescription
          .split(" ")
          .splice(0, 20)
          .join(" ")}</p></div>
        </div>
    </div>
    </div>
    `;
  }
  rowData.innerHTML = card;
}
/////sup-category/////
async function getCategories(category) {
  rowData.innerHTML = "";
  searcCont.innerHTML = "";
  loading.classList.add("lds-dual-ring");
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  const data = await api.json();
  // const sliceData = data.meals;
  loading.classList.remove("lds-dual-ring");
  displayMeals(data.meals.slice(0, 20));
}

////Area/////
async function getApiArea() {
  searcCont.innerHTML = "";
  loading.classList.add("lds-dual-ring");
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  const data = await api.json();
  // const sliceData = data.meals.slice(0, 19);
  loading.classList.remove("lds-dual-ring");
  displayApiArea(data.meals);
}
// getApiArea();
function displayApiArea(data) {
  let item = "";
  for (let i = 0; i < data.length; i++) {
    item += `
    <div class="col-lg-3 col-md-6 col-sm">
            <div onclick="getCountryData('${data[i].strArea}')" class="item text-white text-center cursor-pointer">
              <div class="icon">
                <i style="font-size:90px" class="fa-solid fa-house-laptop"></i>
              </div>
              <div class="item-info fs-1">
                <p>${data[i].strArea}</p>
              </div>
            </div>
          </div>
        `;
  }
  rowData.innerHTML = item;
}
//Country
async function getCountryData(coun) {
  rowData.innerHTML = "";
  loading.classList.add("lds-dual-ring");
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${coun}`
  );

  const data = await api.json();
  const sliceData = data.meals.slice(0, 19);
  loading.classList.remove("lds-dual-ring");
  displayMeals(data.meals.slice(0, 20));
}
/////ingradients/////
async function getMainIngredients() {
  rowData.innerHTML = "";
  loading.classList.add("lds-dual-ring");
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  const data = await api.json();
  // const sliceData = data.meals.slice(0, 19);
  loading.classList.remove("lds-dual-ring");
  displayMainIngredients(data.meals.slice(0, 20));
}

//display
function displayMainIngredients(data) {
  ingred = "";
  for (let i = 0; i < data.length; i++) {
    ingred += `
    <div class="col-lg-3 col-md-6 col-sm">
      <div onclick="getSubIngredients('${
        data[i].strIngredient
      }')" class="item text-white text-center cursor-pointer">
        <div class="icon">
        <i style="font-size:90px" class="fa-solid fa-drumstick-bite"></i>
        </div>
        <div class="item-info fs-5">
          <h3>${data[i].strIngredient}</h3>

          <p class='fs-6'>${data[i].strDescription
            .split(" ")
            .slice(0, 20)
            .join(" ")}</p>
        </div>
      </div>
    </div>
    `;
  }
  document.querySelector(".row").innerHTML = ingred;
}

////sup-ingredients/////
async function getSubIngredients(ingredient) {
  rowData.innerHTML = "";
  loading.classList.add("lds-dual-ring");
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  const data = await api.json();
  const sliceData = data.meals.slice(0, 19);

  loading.classList.remove("lds-dual-ring");
  displayMeals(data.meals.slice(0, 20));
}
// show details for All meals

async function getMealDetails(id) {
  rowData.innerHTML = "";
  loading.classList.add("lds-dual-ring");
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const data = await api.json();
  loading.classList.remove("lds-dual-ring");
  displayDetails(data.meals[0]);
}
function displayDetails(meal) {
  searcCont.innerHTML = "";

  let ingredients = ``;

  for (let i = 0; i < 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += ` <li class="alert alert-info m-2 p-1">${
        meal[`strMeasure${i}`]
      }  ${meal[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = meal.strTags?.split(",");
  if (!tags) tags = [];
  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `<li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }

  let col = `
      <div class="col-lg-4 col-md-6 col-sm text-white ">
        <div class="img">
          <img src="${meal.strMealThumb}" class="w-100" />
          <h2>${meal.strMeal}</h2>
        </div>
      </div>
      <div class="col-lg-8 col-md-6 col-sm text-white">
        <div class="meal-info">
          <h2>Instructions:</h2>
          <p>${meal.strInstructions}</p>
          <h3>
            Ctegory:
            <span class="details-btn px-2 rounded-1"
              >${meal.strCategory}</span
            >
          </h3>
          <h3>
            Area:
            <span class="details-btn  px-2 rounded-1"
              >${meal.strArea}</span
            >
          </h3>
          <h3>Recipes:</h3>
          <ul class="recipes-content d-flex g-3 flex-wrap">
            ${ingredients}
          </ul>

          <h3>Tags:</h3>
          <ul class="recipes-content d-flex g-3 flex-wrap">
            ${tags}
          </ul>
          <a
            target"_blank"
            href="${meal.strSource}"
            class="show-link bg-success btn rounded-1 px-2 me-2"
            >Sourc</a
          >
          <a target"_blank"
            href="${meal.strYoutube}"
            class="show-link btn-warning btn rounded-1 px-2"
            >youtube</a
          >
        </div>
      </div>
      `;

  rowData.innerHTML = col;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//search
//show search input

function showSearchInput() {
  searcCont.innerHTML = `
  <div class="container">
  <div class="row text-white">
    <div class="col-lg-6 col-sm">
      <input
      onkeyup="searchByName(this.value)"
        type="text"
        placeholder="Search By Name"
        class="name form-control bg-transparent  text-white border-white"
      />
    </div>
    <div class="col-lg-6 col-sm">
      <input
      onkeyup="searchByLetter(this.value)"
        type="text"
        maxlength="1"
        placeholder="Search By first letter"
        class="letter form-control bg-transparent text-white border-white"
      />
    
  </div>
  </div>
</div>`;
  rowData.innerHTML = "";
}
//search by name
async function searchByName(val) {
  loading.classList.add("lds-dual-ring");
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`
  );
  const data = await api.json();
  console.log(data.meals);
  loading.classList.remove("lds-dual-ring");
  data.meals ? displayMeals(data.meals) : displayMeals([]);
}

//search by letter
async function searchByLetter(val) {
  //default data if i delet search input value
  val == "" ? (val = "a") : "";
  loading.classList.add("lds-dual-ring");
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`
  );
  const data = await api.json();
  console.log(data.meals);
  loading.classList.remove("lds-dual-ring");
  data.meals ? displayMeals(data.meals) : displayMeals([]);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//contact us
function createContactUs() {
  rowData.innerHTML = `
  <div
  class="contact p-5 d-flex align-items-center justify-content-center min-vh-100"
>
  <div class="container w-75 text-center">
    <div  class="row g-4">
    <div class="col-md-6">
    <input
    onkeyup="inputsValidation()"
      type="text"
      class="nameInput form-control"
      placeholder="Enter your Name"
      aria-label="name"
    />
    <div id="nameAlert" class="alert alert-danger d-none  w-100 mt-2">Special characters and numbers not allowed</div>
  </div>
  <div class="col-md-6">
    <input
    onkeyup="inputsValidation()"
      type="email"
      class="emailInput form-control"
      placeholder="Enter Your Email"
      aria-label="email"
    />
    <div id="emailAlert" class="alert alert-danger d-none w-100 mt-2">Email not Valid *exemple@xxx.ccc</div>
  </div>
  <div class="col-md-6">
    <input
    onkeyup="inputsValidation()"
      type="number"
      class="phoneInput form-control"
      placeholder="Enter Your Phone Number"
      aria-label="phone"
    />
    <div id="phoneAlert" class="alert alert-danger d-none w-100 mt-2">Enter Valid Phone Number</div>
  </div>
  <div class="col-md-6">
    <input
    onkeyup="inputsValidation()"
      type="number"
      class="ageInput form-control"
      placeholder="Enter Your Age"
      aria-label="ager"
    />
    <div id="ageAlert" class="alert alert-danger d-none w-100 mt-2">Enter Valid Number</div>
  </div>
  <div class="col-md-6">
    <input
    onkeyup="inputsValidation()"
      type="password"
      class="passwordInput form-control"
      placeholder="Enter your password "
      aria-label="password"
    />
    <div id="passwordAlert" class="alert alert-danger d-none w-100 mt-2">Enter Valid Password *minimum eight characters, at least one letter and one number</div>
  </div>
  <div class="col-md-6">
    <input
    onkeyup="inputsValidation()"
      type="password"
      class="repasswordInput form-control"
      placeholder="Repassword"
      aria-label="Last name"
    />
    <div id="repasswprdAlert" class="alert alert-danger d-none w-100 mt-2">Enter Valid  rePassword</div>
  </div>
  <button
  disabeld
    id="submitBtn"
    class="btn btn-black mt-5 text-danger border border-1 border-danger w-auto mx-auto "
  >
    Submit
  </button>
    </div>
  </div>
</div>

`;
  submitBtn = document.getElementById("submitBtn");
  document.querySelector(".nameInput").addEventListener("focus", () => {
    nameTouched = true;
  });
  document.querySelector(".emailInput").addEventListener("focus", () => {
    emailTouched = true;
  });
  document.querySelector(".ageInput").addEventListener("focus", () => {
    ageTouched = true;
  });
  document.querySelector(".phoneInput").addEventListener("focus", () => {
    phoneTouched = true;
  });
  document.querySelector(".passwordInput").addEventListener("focus", () => {
    passTouched = true;
  });
  document.querySelector(".repasswordInput").addEventListener("focus", () => {
    repassTouched = true;
  });
}

// const nameInput = document.querySelector(".nameInput");
// const ageInput = document.querySelector(".ageInput");
// const phoneInput = document.querySelector(".phoneInput");
// const passwordInput = document.querySelector(".passwordInput");
// const repasswordInput = document.querySelector(".repasswordInput");
//
let nameTouched = false;
let emailTouched = false;
let phoneTouched = false;
let ageTouched = false;
let passTouched = false;
let repassTouched = false;
//
function inputsValidation() {
  if (nameTouched) {
    if (nameValidation()) {
      document
        .querySelector("#nameAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .querySelector("#nameAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  ////
  if (emailTouched) {
    if (emailValidation()) {
      document
        .querySelector("#emailAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .querySelector("#emailAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  ////
  if (phoneTouched) {
    if (phoneValidation()) {
      document
        .querySelector("#phoneAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .querySelector("#phoneAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  ////
  if (ageTouched) {
    if (ageValidation()) {
      document
        .querySelector("#ageAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .querySelector("#ageAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  ////
  if (passTouched) {
    if (passwordValidation()) {
      document
        .querySelector("#passwordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .querySelector("#passwordAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  ////
  if (repassTouched) {
    if (repasswordValidation()) {
      document
        .querySelector("#repasswordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .querySelector("#repasswordAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  //
  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()
  ) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", true);
  }
}
///inputs validation function
function nameValidation() {
  return /^[a-zA-Z]+$/.test(nameInput.value);
}

///
function emailValidation() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    emailInput.value
  );
}
///
function phoneValidation() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    phoneInput.value
  );
}
////
function ageValidation() {
  return /^(0?[1-9]|[1-9][0-9][1][1-9][1-9]|200)$/.test(ageInput.value);
}
////
function passwordValidation() {
  return /^(?=.*\d)(?=.*[a-z])(0-9a-zA-z){8,}$/.test(passwordInput.value);
}
////
function repasswordValidation() {
  return repasswordInput.value == passwordInput.value;
}
/////////////////////////////////////////////////////////////
