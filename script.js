const accessKey = 'hKDjRifxszJ9ZLaRaktOzu4vNaLvvBAmE4JuOO1MFfM'
const serachform = document.querySelector('form');
const imagesContainer = document.querySelector('.images-container');
const search = document.querySelector('#search');
const loadMoreBtn = document.querySelector('.loadMoreBtn');

let page=1;

const fetchImages = async(query , pageNo) =>{
    try{
    if(pageNo ===1){
    imagesContainer.innerHTML='';
    }


    const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=28page=${pageNo}&client_id=${accessKey}`;



    const response = await fetch(url);
    const data = await response.json();

    if(data.results.length >0){

    data.results.forEach(photo => {
        const imageElement = document.createElement("div");
        imageElement.classList.add("imageDiv");
        imageElement.innerHTML = `<img src="${photo.urls.regular}"/>`;

        const overLayElement = document.createElement("div");
        overLayElement.classList.add('overlay');

        const overlayText = document.createElement('h3');
        overlayText.innerText = `${photo.alt_description}`;

        overLayElement.appendChild(overlayText);

        imageElement.appendChild(overLayElement);
        imagesContainer.appendChild(imageElement);
    });

    if(data.total_pages === pageNo){
        loadMoreBtn.style.display = "none";
    }
    else{
        loadMoreBtn.style.display = "block";
    }
}
else{
    imagesContainer.innerHTML = `<h2>write a valid query</h2>`
}
    }
    catch(error){
        imagesContainer.innerHTML = `<h2>failed to fetch images</h2>`
    }
}


serachform.addEventListener('submit',(e)=>{
    e.preventDefault();
    const inputText = search.value.trim();

    console.log(inputText);
    if(inputText !==''){
        page=1;
        fetchImages(inputText,page);
    }
    else{
        
        imagesContainer.innerHTML = `<h2>please enter a valid search query</h2>`
        if(loadMoreBtn.style.display === "block"){
            loadMoreBtn.style.display = "none";
        }
    }
})

loadMoreBtn.addEventListener("click", ()=>{
    fetchImages(search.value.trim(),++page);

})