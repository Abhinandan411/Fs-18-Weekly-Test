const productDiv = document.querySelector("#results");
const searchInput = document.querySelector("#searchinput");
const searchBtn = document.querySelector("#searchbtn");
const showmoreDiv = document.querySelector("#showmore");


let result = [];

async function getDataFromAPI() {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/phones?search=iphone 13"
  );
  result = await response.json();
  show(result.data);
}
getDataFromAPI();


// -------------------- When click on Search btn -----------------------------------------
searchBtn.addEventListener("click", async () => {
  loadingprogress();
  // Fetch data based on the input value
  const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchInput.value}`);
  result = await response.json();
  productDiv.innerHTML = "";
  show(result.data);
});


// -------------------- function for loading -----------------------------------------


function loadingprogress() {
  productDiv.innerHTML = "";
  productDiv.innerHTML = `  <div class="loading">
      <p>Loading</p>
      <img src="./loading.svg" alt="">
  
      </div>`;
}

// -------------------- function for Show data -----------------------------------------

function show(data) {

  if (data.length > 16) {
    showmoreDiv.innerHTML = `<button id="showmorebtn">Show More</button>`
  }

  const limitedData = data.slice(0, 15);
  limitedData.forEach((product) => {
    const div = document.createElement("div");
    div.classList.add("product");

    // ----------------------------- Image ----------------------------------------
    const image = document.createElement("img");
    image.src = product.image;
    image.classList.add("product-image");
    div.appendChild(image);
    // productDiv.append(div);

    // ----------------------------- Phone Name ----------------------------------------
    const title = document.createElement("h3");
    title.innerText = product.phone_name;
    div.appendChild(title);

    productDiv.append(div);

    // ----------------------------- Paragraph ----------------------------------------
    const para = document.createElement("p");
    para.innerText =
      "There are many variations of passages of available, but the majority have suffered";
    div.append(para);

    // ----------------------------- Button----------------------------------------

    const showBtn = document.createElement("button");
    showBtn.classList.add("show-more-btn", "openModalBtn");
    showBtn.setAttribute("id", product.slug);
    showBtn.innerText = "SHOW DETAILS";
    div.append(showBtn);
  });
}


document.addEventListener('click', function (event) {
  if (event.target.matches('#showmorebtn')) {
    showall();
  }
  if (event.target.matches('#closemodal')) {
    closemodal();
  }
  if (event.target.classList.contains('openModalBtn')) {
    const btnId = event.target.id;
    showmodal(btnId);
  }
});


// -------------------- function for ShowAll data -----------------------------------------
function showall() {
  const data = result.data;
  productDiv.innerHTML = "";
  showmoreDiv.innerHTML = "";
  data.forEach((product) => {
    const div = document.createElement("div");
    div.classList.add("product");

    // ----------------------------- Image ----------------------------------------
    const image = document.createElement("img");
    image.src = product.image;
    image.classList.add("product-image");
    div.appendChild(image);
    // productDiv.append(div);

    // ----------------------------- Phone Name ----------------------------------------
    const title = document.createElement("h3");
    title.innerText = product.phone_name;
    div.appendChild(title);

    productDiv.append(div);

    // ----------------------------- Paragraph ----------------------------------------
    const para = document.createElement("p");
    para.innerText =
      "There are many variations of passages of available, but the majority have suffered";
    div.append(para);

    // ----------------------------- Button----------------------------------------

    const showBtn = document.createElement("button");
    showBtn.classList.add("show-more-btn", "openModalBtn");
    showBtn.setAttribute("id", product.slug);
    showBtn.innerText = "SHOW DETAILS";
    div.append(showBtn);
  });
}





const modal = document.getElementById("myModal");

// -------------------- function for Show Mobile data acoording to its id/slug -----------------------------------------
async function getMobiledata(slug) {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phone/${slug}`
  );
  const data = await response.json();
  return data.data;
}


// -------------------- function for Show Modal -----------------------------------------

async function showmodal(slug) {
  const data = await getMobiledata(slug);
  document.body.style.overflow = 'hidden';
  const modalbody = document.getElementById('modalbodydata')
  const sensorsString = data.mainFeatures.sensors.join(', ');
  modalbody.innerHTML = `
  <form method="dialog" class="modal-box text-center">
        <div id="imgContainer" class="flex justify-center"><img
            src=${data.image} alt=""></div>
          <h3 id="detailsPhoneName" class="font-bold text-lg mt-3">${data.name}</h3>
          <h3 id="detailsBrand" class="py-4">Brand: ${data.brand}</h3>
          <p id="detailsSpec">storage: ${data.mainFeatures.storage} <br>displaySize: ${data.mainFeatures.displaySize} <br>chipSet: ${data.mainFeatures.chipSet} <br>memory: ${data.mainFeatures.memory}
          <br>sensors: ${sensorsString} <br></p>
          <p id="releaseDate" class="my-2">${data.releaseDate}</p>

        <div class="modal-action flex justify-center">
          <!-- if there is a button in form, it will close the modal -->
          <button class="closebtn" id="closemodal">Close</button>
        </div>
      </form>
  `
  modal.style.display = "flex";
}

// -------------------- function for Close Modal -----------------------------------------
function closemodal() {
  modal.style.display = "none";
  document.body.style.overflow = 'auto';
}


window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    document.body.style.overflow = 'auto';
  }
}