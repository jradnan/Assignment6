const allMobile = document.getElementById('allmobile');


const searchButton = () => {
    const input = document.getElementById('input-value');
    const error = document.getElementById('error');

    const searchText = input.value;
    if(searchText == ''){
        error.innerText ="Not Available";
        input.value = '';
        allMobile.innerText = '';
    }
    else if(searchText < 0) {
        error.innerText = "Not Available";
        input.value = '';
        allMobile.innerText = '';
    }
    
    else{

        allMobile.innerText = '';
        const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
        .then(res => res.json())
        .then(data => mobileData(data.data))
        input.value = '';
        error.innerText ='';
    }


}

const mobileData = mobiles => {
    console.log(mobiles)
    
       
        for(const mobile of mobiles){
        const div = document.createElement('div');
        
        div.innerHTML = `
        <div class="p-5 col-sm-12 card text-center">
        
       <div text-center> <img class="w-50" src="${mobile.image}" class="card-img-top" alt="..."> </div>
       <h2 class="pt-5"> ${mobile.phone_name}</h2>
       <h5 class="card-title">${mobile.brand}</h5>
       <button p-3  onclick="seeDetails('${mobile.slug}')"  class="btn btn-success">See Details </button>
        </div>
        `;
        allMobile.appendChild(div)
    }
    if(mobiles == false){
        error.innerText = "Not Available";
    }
}


const seeDetails = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;//secondery Url
   
    fetch(url)
        .then(res => res.json())
        .then(data => phoneAllDetails(data.data))
}


const phoneAllDetails = (data) => {

    document.getElementById('phone-detail-container').style.display = "block";
    const phoneDetailsViewer = document.getElementById('phonedetail')
    let phoneData = data;
    let phoneFeatures = data.mainFeatures;
    // if Data.Others Is Not Available Use This For Data.others

    const othersIfNot = {
        WLAN: "I Don't Know",
        Bluetooth: "No Idea",
        GPS: "No Idea",
        NFC: "No Idea",
        Radio: "No Idea",
        USB: "Thakte Pare Janina"

    };
    // if else For  If data.others is Not Available 

    if(data.others == undefined){
        others = othersIfNot;
    }
    else{
        others = data.others;
    }
    
    // Phone all Details appending in innerHTML 

    phoneDetailsViewer.innerHTML = `
        <button onclick="closeOverlay()" class="close-btn btn-danger">close</button>
        
    <div class="card fulldetail-card" style="width: 100%; margin: 0 auto;">
        <div class="d-flex align-items-center">
        <img  src="${phoneData.image}"class="card-img-top ms-4" alt="">
        </div>
        <div class="card-body">
            <h4 class="card-title">Name : ${phoneData.name}</h4>
            <p class="card-text">Brand : ${phoneData.brand}</p>
            <p class="card-text">ReleaseDate : ${phoneData.releaseDate}</p>
            <h4>Main Features:-</h4>
            <div class="ms-5">
            <p class="card-text">DisplaySize : ${phoneFeatures.displaySize}</p>
            <p class="card-text">ChipSet : ${phoneFeatures.chipSet}</p>
            <p class="card-text">Storage : ${phoneFeatures.storage}</p>
            <p class="card-text">Memory : ${phoneFeatures.memory}</p>
            <p class="card-text"><h5>Sensors</h5>${phoneFeatures.sensors}</p>
            </div>
            <h4>Others:-</h4>
            <div id=""others" class="ms-5">
            
            <p class="card-text">WLAN : ${others.WLAN}</p>
            <p class="card-text">Bluetooth : ${others.Bluetooth}</p>
            <p class="card-text">GPS : ${others.GPS}</p>
            <p class="card-text">USB : ${others.USB}</p>
            <p class="card-text">Radio : ${others.Radio}</p>
            </div>

            </div>
    </div>
    `;



}


// / overlay Closing Btn 

const closeOverlay = () => {
    document.getElementById('phone-detail-container').style.display = "none";
}