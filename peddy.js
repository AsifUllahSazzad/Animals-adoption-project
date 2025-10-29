// Fetch load category data
async function loadCategory() {
    const res = await fetch("https://openapi.programming-hero.com/api/peddy/categories");
    const data = await res.json();
    let categories = data.categories;

    btnCategories(categories);
}

loadCategory();

// Fetch all data
async function loadAllData(){
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await res.json();

    displayAllData(data.pets);

    // sort
    sortByPrice(data.pets);
}

loadAllData()


// Display Data
const displayAllData = (pets) => {
    const noContentContainer = document.getElementById("noContent");
    const cardContainer = document.getElementById('cardContainer');

    // Clear card data
    cardContainer.innerHTML = '';


    // check is content available or not
    if(pets.length === 0){
        noContent(noContentContainer);
        cardContainer.classList.add("hidden");
    }
    else{
      noContentContainer.classList.add('hidden');
        cardContainer.classList.remove("hidden");

    

    for(item of pets){
        let newDiv = document.createElement('div');
        newDiv.innerHTML = `
        <div class="card bg-base-100 w-86 h-full shadow-md border border-[#13131330] rounded-xl">

  <figure class="pt-3">
    <img
      src="${item.image}"
      alt="pet" class="w-80 h-fit rounded-xl" />
  </figure>

  <div class="card-body">
    <h2 class="font-[inter] text-xl font-bold">${item.pet_name}</h2>

<div class="flex items-center gap-x-2">
    <img src="./images/icons8-livestock-50.png" class="w-7 h-fit">
    <p class="text-base text-[#13131395]">Breed: ${checkValue(item.breed)}</p>
</div>


<div class="flex items-center gap-x-2">
    <img src="./images/icons8-calendar-64.png" class="w-6 h-fit">
    <p class="text-base text-[#13131395]">Birth: ${checkValue(item.date_of_birth)}</p>
</div>


<div class="flex items-center gap-x-2">
    <img src="./images/icons8-venus-symbol-24.png" class="w-6 h-fit">
    <p class="text-base text-[#13131395]">Gender: ${checkValue(item.gender)}</p>
</div>

<div class="flex items-center gap-x-2">
    <img src="./images/icons8-us-dollar-24.png" class="w-6 h-fit">
    <p class="text-base text-[#13131395]">Price: ${item?.price == null ? "Not available" : `${item.price}$`}</p>
</div>

  <div class="border border-[#13131320] my-2"></div>

    <div class="flex justify-between">

      <button onClick="likeButtonClick('${item.image}')" class="btn text-[#0E7A81] border border-[#0E7A8150] bg-white rounded-lg w-13 p-0">
        <img src="./images/icons8-facebook-like-48.png" class="w-7 h-fit">
      </button>

      <button id="adoptBtn-${item.petId}" onClick="adoptButton(${item.petId})" class="btn text-[#0E7A81] border border-[#0E7A8150] bg-white rounded-lg w-25">Adopt</button>

      <button class="btn text-[#0E7A81] border border-[#0E7A8150] bg-white rounded-lg w-25" onClick="modalDataLoad(${item.petId})">Details</button>
    </div>

  </div>

</div>`;
        cardContainer.appendChild(newDiv);

        
      }
    }
}

// Check value is undefined or null
const checkValue = (item) => {
    if(item == null){
        return 'Not available';
    }
    else{
        return item;
    }
}


// Categories Button
const btnCategories = (categories) =>{
    let btnContainer = document.getElementById("btnCategoriesSection");

    for(let item of categories){
        let newDiv = document.createElement('div');
        newDiv.innerHTML = `
        <button id="${item.category}" class="allbtn btn bg-white text-2xl font-bold h-23 w-55 rounded-xl border" onClick="categoriesData('${item.category}')">
          <img src=${item.category_icon} class="w-10 h-fit"/>${item.category}
        </button>
        `;
        btnContainer.appendChild(newDiv);
    }
    
}


// Categories by data show
async function categoriesData(categoryName){
    let res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryName}`);
    let data = await res.json();


    displayAllData(data.data);

    // Button Style
    // remove all active button before active button style add
    removeActiveButton();

    // add active button style
    let btnStyle = document.getElementById(`${categoryName}`);
    btnStyle.classList.add('active');


    // loading spinner
    loadingSpinner();

    // sort by data
    sortByPrice(data.data);
}

const removeActiveButton = () => {
    let allbutton = document.getElementsByClassName('allbtn');
    
    for(let btn of allbutton){
      btn.classList.remove('active');
    }
}


// No content data
const noContent = (noContentContainer) => {
  noContentContainer.classList.remove('hidden');

    noContentContainer.innerHTML = `
    <div class="bg-[#13131310] lg:h-[50vh] h-[70vh] rounded-2xl flex justify-center items-center lg:mr-5">

      <div class="w-8/13 flex flex-col justify-center items-center text-center gap-y-5">
        <img src="./images/error.webp">
      <h1 class="font-[inter] font-bold lg:text-4xl text-2xl text-[#131313]">No Information Available</h1>
      <p class="text-[#13131397]">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
its layout. The point of using Lorem Ipsum is that it has a.</p>
      </div>
  
    </div>
    `;
}


// Modal Data Load
const modalDataLoad = async (id) => {
      const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
      const data = await res.json();

      modalShow(data.petData);
}
    
    
// Modal Show
const modalShow = (petData) =>{
  let modalContent = document.getElementById('modalContent');

  modalContent.innerHTML = `
  <img
      src="${petData.image}"
      alt="pet" class="w-full h-fit rounded-xl" />


      <h1 class="font-[inter] text-2xl font-bold">${checkValue(petData.pet_name)}</h1>
      
      <div class="grid grid-cols-2 gap-y-2">


      <div class="flex items-center gap-x-2">
    <img src="./images/icons8-livestock-50.png" class="w-7 h-fit">
    <p class="max-lg:text-sm text-base text-[#13131395]">Breed: ${checkValue(petData.breed)}</p>
      </div>

<div class="flex items-center gap-x-2">
    <img src="./images/icons8-venus-symbol-24.png" class="w-6 h-fit">
    <p class="max-lg:text-sm text-base text-[#13131395]">Gender: ${checkValue(petData.gender)}</p>
</div>

   <div class="flex items-center gap-x-2">
    <img src="./images/icons8-virus-50.png" class="w-7 h-fit">
    <p class="max-lg:text-sm text-base text-[#13131395]">Vaccinated status: ${checkValue(petData.vaccinated_status)}</p>
</div>

<div class="flex items-center gap-x-2">
    <img src="./images/icons8-calendar-64.png" class="w-6 h-fit">
    <p class="max-lg:text-sm text-base text-[#13131395]">Birth: ${checkValue(petData.date_of_birth)}</p>
</div>



<div class="flex items-center gap-x-2">
    <img src="./images/icons8-us-dollar-24.png" class="w-6 h-fit">
    <p class="max-lg:text-sm text-base text-[#13131395]">Price: ${petData?.price == null ? "Not available" : `${petData.price}$`}</p>
</div>

      </div>
      

      <div class="border border-[#13131320]"></div>

      <div>

<h1 class="text-2xl font-[inter] font-bold mt-1">Detail Information</h1>
<p class="text-base text-[#13131395]">${checkValue(petData.pet_details)}</p>

 </div>
  `;
    document.getElementById('modalId').click();   
}

// Like image
const likeButtonClick = (image) => {
  let sideBar = document.getElementById('sideBar');
  sideBar.classList.remove('hidden');

  let newImage = document.createElement('img');

  newImage.src = `${image}`;
  newImage.className = 'rounded-2xl';

  sideBar.appendChild(newImage);
}


// Loading Spinner
const loadingSpinner = () => {
  let loadingSpinner = document.getElementById('loadingSpinner');
    let mainSection = document.getElementById('mainSection');

    loadingSpinner.classList.remove('hidden');
    mainSection.classList.add('hidden');
    
    // After 2s letter stop:
    setTimeout(() => {
      loadingSpinner.classList.add('hidden')
      mainSection.classList.remove('hidden')
    },2000)
}


// Sort by price
const sortByPrice = (pets) =>{
  document.getElementById('sortByPrice').addEventListener('click', ()=>{

      loadingSpinner();

      let sortedData = pets.sort((a,b) => b.price-a.price);

      displayAllData(sortedData);
  })
}


// Adopt button behavior
const adoptButton = (id) =>{
  let showAdoptModal = document.getElementById('showAdoptModal');
  let adoptBtn = document.getElementById(`adoptBtn-${id}`);


  showAdoptModal.click();

  let countDownh1 = document.getElementById('countDownh1');
  let count = 3;

  countDownFunction(count, countDownh1, adoptBtn);

}

// Count down
function countDownFunction(count, countDownh1, adoptBtn){


  // Show first number immediately
  countDownh1.innerHTML = count;

const countDown = setInterval(() => {
  count--;

  countDownh1.innerHTML = count;
      
  if(count <= 1){
    clearInterval(countDown);
    const modal = document.getElementById('my_modal_2');
    modal.close();
  }
      
  },500)

  adoptBtn.innerText = 'Adopted';
  adoptBtn.setAttribute('disabled', true);
  adoptBtn.classList.add('disable');
}