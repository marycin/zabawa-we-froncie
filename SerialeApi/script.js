const searchBtn = document.getElementById('search-btn')
const serialList = document.getElementById('serial')
const serialListWrapper = document.getElementById('serial-wrapper')

const favouriteButton = document.getElementById('favourites')
const favSerialWrapper = document.getElementById('fav-serial-wrapper')
const favSerialList = document.getElementById('favourite-serial')

const showHideHeaderButtons = document.getElementById('show-hide-header-buttons')
const headerAllButtons = document.getElementById('header-all-buttons')

let serialIdList = []

myStorage = localStorage


window.addEventListener('load',addSerialIDsToList)
window.addEventListener("load", start, false);
window.addEventListener('resize',removeHideClass)
searchBtn.addEventListener('click',getSerialList)
serialList.addEventListener('click',addSerialToFavourite)
favouriteButton.addEventListener('click',showFavouriteList)
showHideHeaderButtons.addEventListener('click',showHideButtons)

function addSerialIDsToList(){
    let objects =[]
    Object.values(myStorage).forEach(val =>{
        objects.push(JSON.parse(val))
    })
    objects.forEach(element=>{
        serialIdList.push(element.id)
    })
    
}


function showHideButtons(){
    if(headerAllButtons.classList.contains('hide')){
        headerAllButtons.classList.remove('hide')
        return 
    }
    headerAllButtons.classList.add('hide')
}


function removeHideClass(){
    if (window.innerWidth>768){
        headerAllButtons.classList.remove('hide')
        return
    }
    headerAllButtons.classList.add('hide')
}

function start(){
    document.getElementById("sort-type").addEventListener("change", showFavouriteList, false);
}

function getSerialList(){
    favSerialWrapper.style.display = 'none'
    serialListWrapper.style.display = 'block'
    let searchInputTxt = document.getElementById('search-input').value.trim()
    let titleSearchResult = document.getElementById('search-result-title')
    titleSearchResult.classList.remove('hide')
    fetch(`https://api.tvmaze.com/search/shows?q=${searchInputTxt}`)
    .then(response => response.json())
    .then(data =>{
        let html = ""
        if(data){
            data.forEach(serial => {
                let s = {
                    id : serial.show.id,
                    image : !!serial.show.image ? serial.show.image.original : 'nofind.png',
                    name : !!serial.show.name ? serial.show.name : 'No data',
                    rating : !!serial.show.rating ? (!!serial.show.rating.average ? serial.show.rating.average : "No data") : "No data",
                    release_date : !!serial.show.premiered ? serial.show.premiered : "No data",
                    more_info : !!serial.show.officialSite ? serial.show.officialSite : "",
                    network : !!serial.show.network ? serial.show.network.name : 'No data',
                    country : !!serial.show.network ? (!!serial.show.network.country ? serial.show.network.country.name : 'No data') : 'No data'
                }
                let star=serialIdList.includes(s.id) ? '<i class="fa fa-star serial-follow-item clicked" aria-hidden="true"></i>' : '<i class="fa fa-star serial-follow-item" aria-hidden="true"></i>'
                
                html+=
                `
                <div class="serial-item" data-id ='${s.id}' ">
                    <div class="serial-img">
                        <img src="${s.image}" alt="serial-img">
                    </div>
                    <div class="serial-name">
                        <h3>${s.name}</h3>
                    </div>
                    <div class="serial-details">
                        <div class="serial-rating">
                            <p>${s.rating}</p>
                            <p class="serial-detail-desc">Rating</p>
                        </div>
                        <div class="serial-year-release">
                            <p>${s.release_date }</p>
                            <p class="serial-detail-desc">Release Date</p>
                        </div>
                        <div class="serial-more-info">
                            <a href="${s.more_info}">
                                <i class="fa fa-link" aria-hidden="true"></i>
                                <p class="serial-detail-desc">More info</p>
                            </a>
                        </div>
                        <div class="serial-network">
                            <p>${s.network}</p>
                            <p class="serial-detail-desc">Network</p>
                        </div>
                        <div class="serial-country">
                            <p>${s.country}</p>
                            <p class="serial-detail-desc">Country</p>
                        </div>
                        <div class="serial-follow">
                            ${star}
                            <p class="serial-detail-desc serial-follow-item">Follow</p>
                        </div>
                    </div>
                </div>
                `
            });
        }else{
            html = "Sorry, we didn't find anything :c"
            serialList.classList.add('notFound')
        }
        serialList.innerHTML = html
    })
    .catch((error)=>{
        console.log(error)
    })
}


function addSerialToFavourite(e){
    e.preventDefault()
    if((e.target.classList.contains('serial-follow') || e.target.parentElement.classList.contains('serial-follow')) && !serialIdList.includes(e.target.parentElement.parentElement.parentElement.dataset.id)){
        let star
        if(e.target.classList.contains('serial-follow')){
            star = e.target.children[0]
        }
        if(e.target.parentElement.classList.contains('serial-follow')){
            star = e.target.parentElement.children[0]
        }
        console.log('top')   
        star.classList.add('clicked')
        let item = e.target.parentElement.parentElement.parentElement
        let s
        fetch(`https://api.tvmaze.com/shows/${item.dataset.id}`)
        .then(response => response.json())
        .then(serial =>{
            if(serial){
                s = {
                    id : serial.id,
                    image : !!serial.image ? serial.image.medium : 'nofind.png',
                    name : !!serial.name ? serial.name : 'No data',
                    network : !!serial.officialSite ? serial.officialSite : '#',
                }      
                myStorage.setItem('item'+s.id,JSON.stringify(s))
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    }
}

function sortFavList(sortType){
    let objects =[]
    Object.values(myStorage).forEach(val =>{
        objects.push(JSON.parse(val))
    })
    if(sortType ==='none')
        return objects
    if(sortType === 'alphabetically')
        objects.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
    if(sortType ==='reverse-alphabetically')
        objects.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()))
    return objects
}



function showFavouriteList(){
    
    favSerialWrapper.style.display = 'block'
    serialListWrapper.style.display = 'none'
    let sortType = document.getElementById('sort-type')
    console.log(sortType.value)
    let html = "" 
    list = sortFavList(sortType.value)
    console.log(list)
    list.forEach(element=>{
        html+=
        `
        <div class="favourite-serial-item" data-id='${element.id}'>
            <div class="favourite-serial-img">
                <img src="${element.image}" alt="none">
                <a href='${element.network}' class='favourite-serial-network-link'> 
                    <i class="fa fa-link" aria-hidden="true"></i>
                </a>
            </div>
            <div class="favourite-serial-name">
                <h3>${element.name}</h3>
            </div>
        </div>
        `
    })

    favSerialList.innerHTML = html
}


