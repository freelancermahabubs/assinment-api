const loadData = async() =>{
  const URL = `https://openapi.programming-hero.com/api/ai/tools`;
  spinner(true)
  try{
    const res = await fetch(URL);
    const data = await res.json();
    showData(data.data.tools.slice(0, 6));
    document.getElementById('sort-date').addEventListener('click', function (){
      const shortDate =  data.data.tools.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.published_in) - new Date(a.published_in);
      });
      showData(shortDate)
    })
   
    
  }
  catch(error){
    console.log(error)
  }
};

const showData = alldata =>{
const cardContainer = document.querySelector('#card-container');
cardContainer.innerHTML = '';


alldata.forEach(singleData =>{

  const {image, name, features, published_in, id} = singleData;
  // console.log(singleData);
  const div = document.createElement('div');
  div.classList.add('col');
  div.innerHTML= `
  <div class="card h-100">
  <img src="${image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Features</h5>
   <ol class="text-muted">
   <li>${features ? features[0] : 'No Data Found'}</li>
   <li>${features ? features[1] : 'No Data Found'}</li>
   <li>${features[2] ? features[2] : 'No Data Found'}</li>
   </ol>
   <hr>
   <div>
   <h5 class="card-title">${name}</h5>
   <div class="d-flex justify-content-between">
   <div class="d-flex align-items-center gap-2">
   <i class="fa-solid fa-calendar-days"></i>
   <p class="pt-3">${published_in}</p>
   </div>
   <a onclick="loadDetails('${id}')" class="rounded-circle bg-danger-subtle mt-3" href="" data-bs-toggle="modal" data-bs-target="#exampleModal" ><i class="fa-solid fa-arrow-right p-3"></i></a>
   </div>
   </div>
  </div>
</div>
  `;
  cardContainer.appendChild(div);
});
spinner(false);
};

function spinner(isLoading) {
 const spinner = document.getElementById('spinner');
 if(isLoading){
  spinner.classList.remove('d-none');
 }
 else{
  spinner.classList.add('d-none')
 }
};

const loadDetails = async(id) => {
  const URL = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res = await fetch(URL);
  const data = await res.json();
  showModalDetails(data.data)
};

const showModalDetails = details =>{
  const {image_link, accuracy, input_output_examples, description, pricing, features, integrations} = details;
console.log(details)
const modalBody = document.querySelector('#modal-body');
modalBody.textContent = '';
const div = document.createElement('div');
div.innerHTML = `
<div class="d-flex  flex-column align-items-center flex-lg-row gap-2">
<div class="p-2 h-52" style="background: rgba(235, 87, 87, 0.05);border: 1px solid #EB5757;
border-radius: 16px;">
<h5 class="">${description}</h5>
<div class="d-flex gap-2 px-2">

<div style="left: 320px; top: 796px; background: #FFFFFF; color: #03A30A; border-radius: 16px;" class="text-center px-2 w-52 h-50 pt-2 fw-bold"><p>${pricing ? pricing[0].plan : 'Free of Cost/Basic'} ${pricing ? pricing[0].price : ' '}</p></div>
<div style="left: 320px; top: 796px; background: #FFFFFF; color: #F28927; border-radius: 16px;" class="text-center px-2 w-52 h-50 pt-2 fw-bold"><p>${pricing ? pricing[1].plan : 'Free of Cost/Basic'} ${pricing ? pricing[1].price : ' '}</p></div>
<div style="left: 320px; top: 796px; background: #FFFFFF; color: #EB5757
; border-radius: 16px;" class="text-center px-2 w-52 h-50 pt-2 fw-bold"><p>${pricing ? pricing[2].plan : 'Free of Cost/Basic'} ${pricing ? pricing[2].price : ' '}</p></div>
</div>

<div class="d-flex gap-2">
<div>
<h5 class="fw-bold ps-2">Features</h5>
<ul class="text-muted">
<li>${features[1].feature_name}</li>
<li>${features[2].feature_name}</li>
<li>${features[3].feature_name}</li>
</ul>
</div>
<div>
<h5 class="fw-bold pr-2">Integrations</h5>
<ul>${integrations ? integrationsData(integrations) : 'No Data Found'}</ul>
</div>
</div>

</div>
<div>
<div class="card" style="width: 18rem;">
<div><p class="z-3 px-3 fw-bold text-light text-center ms-5 rounded position-absolute bg-danger">${accuracy.score*100 + '%' + ' ' + 'accuracy' ?accuracy.score*100 + '%' + ' ' + 'accuracy' : ' ' }</p></div>
  <img src="${image_link[0]}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${input_output_examples ? input_output_examples[0].input: 'Can you give any example?'}</h5>
    <p class="card-text">${input_output_examples ? input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}</p>
  </div>
</div>
</div>
</div>

`;
modalBody.appendChild(div);
};

const integrationsData = (integrations) =>{
  let innerHTML = '';
  for(let i = 0; i < integrations.length; i++){
    innerHTML += `<li class="text-muted">${integrations[i]}</li> `
  }
  return innerHTML;
};

document.getElementById('see-more-btn').addEventListener('click', function(){
fetch('https://openapi.programming-hero.com/api/ai/tools')
.then(res => res.json())
.then(data => {
  showData(data.data.tools);
})
document.getElementById('see-more-btn').style.display = "none";
})


