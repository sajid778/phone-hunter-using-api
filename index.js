const loadAllPhones = async (status,brandName) =>{
    // console.log(brandName);
    document.getElementById('spinner').style.display='none';

    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${brandName ? brandName : "iphone"}`);
    const data = await response.json();
    console.log(data);
    
    if (status) {
        displayAllPhones(data.data);
    }
    else{
        displayAllPhones(data.data.slice(0,6));
    }
   
    
};

const displayAllPhones = (phones) => {
    // document.getElementById('phones-containe
    
    const phoneContainer = document.getElementById('phones-container');

 phones.forEach(phone => {
    // console.log(phone);
    const {brand, image, slug} = phone;
    const div =document.createElement('div');

    div.innerHTML = `
    <div class="card m-2 bg-base-100 w-96 shadow-xl">
  <figure class="px-10 pt-10">
    <img
      src=${image}
      alt="Shoes"
      class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">${brand}</h2>
    <p>${slug}</p>
    <div class="card-actions">
      <button onclick="phoneDetails('${slug}')" class="btn btn-primary">Show Details</button>
    </div>
  </div>
</div>
    `
    phoneContainer.appendChild(div);
 });
 
}

const handleShowAll = () => {
    loadAllPhones(true)
    
}

const handleSearch = () => {
    document.getElementById('spinner').style.display='block';
    const searchText = document.getElementById('search-box').value;
    setTimeout(() => {
        loadAllPhones(false,searchText);
    }, 3000);  
};

const phoneDetails = async(slugs) => {
    // console.log(slug);
    const response = await fetch(`https://openapi.programming-hero.com/api/phone/${slugs}`)
    const data =await response.json();
    console.log(data.data);

    const {brand, image, slug } = data.data;

    const modalContainer = document.getElementById('modal-container');
   modalContainer.innerHTML  = `
      <dialog id="my_modal_1" class="modal">
    <div class="modal-box">
      <h3 class="text-lg font-bold">${brand}</h3>
      <p class="py-4">Press ESC key or click the button below to close</p>
      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>
    `
    my_modal_1.showModal();
}

loadAllPhones(false,"iphone");

// const obj =
//     {
//         brand: "Apple ",
//         phone_name: "iPhone 13 mini",
//         slug: "apple_iphone_13_mini-11104",
//         image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-mini.jpg"
//     }
// data distructuring
    // const {brand, image, slug} = obj;
    // console.log(slug);
    
    
