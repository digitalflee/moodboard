//const apiKey = Lt0eSaHbO3P3uwUEmw1PkqIRTvErlCOj



let gifDivRow = document.getElementById('gif-div-row')
let selectDiv =  document.getElementById('select')
let searchForm =  document.createElement('form')
let gifBoard = document.getElementById('gif-board')
let moodsColumn = document.getElementById('moods-column')


let moodBoardForm = document.createElement('form')
mbThemeInput = document.createElement('input')
mbThemeInput.id = 'mb-theme'
mbThemeInput.className = 'form-control'
mbThemeInput.type = 'text'
mbThemeInput.placeholder = 'theme'


let mbArtistInput = document.createElement('input')
mbArtistInput.id = 'mb-artist'
mbArtistInput.className = 'form-control'
mbArtistInput.type = 'text'
mbArtistInput.placeholder = 'artist name'

let moodBoardFormBtn = document.createElement('button')
moodBoardFormBtn.type = 'submit'
moodBoardFormBtn.id = 'form-btn'
moodBoardFormBtn.innerText = 'create moodboard'

moodBoardForm.append(mbThemeInput, mbArtistInput, moodBoardFormBtn)


gifBoard.append(moodBoardForm)

let formDiv = document.createElement('div')
formDiv.className = 'form-group'


let formInput = document.createElement('input')
formInput.className = 'form-control'
formInput.type = 'text'

// let nameInput = document.createElement('input')
// nameInput.type = 'text'
// nameInput.className = 'form-control'
// nameInput.placeholder = 'name'




let formBtn = document.createElement('button')
formBtn.id = 'form-btn'
formBtn.innerText = 'submit'

formDiv.append(formInput, formBtn)
searchForm.append(formDiv)
selectDiv.append(searchForm)

searchForm.addEventListener('submit', (evt) => {
    evt.preventDefault()
    
    let searchInputValue = evt.target.querySelector('.form-control').value
    let searchFetch = `http://api.giphy.com/v1/gifs/search?q=${searchInputValue}&api_key=Lt0eSaHbO3P3uwUEmw1PkqIRTvErlCOj&limit=5`
    
    fetch(searchFetch)
    .then(r => r.json())
    .then((searchResults) => {
        //debugger 
        
        searchResults.data.forEach(search => {
            rendersearchResult(search)
            
        })
    })
    
    
    
})


function rendersearchResult(search){
    let gifDiv = document.createElement('div')
    gifDiv.id = search.id
    gifDiv.className = "card"
    gifDiv.style = "width: 18rem;"
    let gifDelBtn = document.createElement('button')
    gifDelBtn.id = search.id 
    gifDelBtn.innerText = 'delete'
    let gifAddBtn = document.createElement('button')
    gifAddBtn.id = `add-${search.id}`
    gifAddBtn.innerText = 'add'
    let gif = document.createElement('img')
    //gif.id = search.id 
    gif.className = "card-img-top"
    gif.alt = "Card image cap"
    //gif.src = search.embed_url
    gif.src = search.images.downsized_large.url
    gifDiv.append(gif, gifDelBtn, gifAddBtn)
    gifDivRow.append(gifDiv)   
    
    gifDelBtn.addEventListener('click', (evt) => {
        console.log(evt.target)  
        
        gifDiv.remove()
        
    })
    
    gifAddBtn.addEventListener('click', (evt) => {
        //console.log(evt.target)
        let newGifDiv =  document.createElement('div')
        newGifDiv.className = 'card'
        newGifDiv.style = "width: 18rem;"
        let newGifDelBtn = document.createElement('button')
        newGifDelBtn.innerText = 'remove'
        let gifSrc = evt.target.parentElement.querySelector('img').src
        let gifToAdd = document.createElement('img')
        gifToAdd.id = search.id 
        gifToAdd.src = gifSrc 
        
        newGifDiv.append(gifToAdd, newGifDelBtn)
        gifBoard.append(newGifDiv)     
        
    })
    
    
    
}



moodBoardForm.addEventListener('submit', (evt) => {
    evt.preventDefault()
    
    let themeInput = evt.target.querySelector('#mb-theme')
    let artistName = evt.target.querySelector('#mb-artist')
    console.log(themeInput.value)
    console.log(artistName.value)
    
    let moodThemeBtn = document.createElement('button')
    moodThemeBtn.innerText = themeInput.value 
    
    moodsColumn.append(moodThemeBtn)
    
    let gifBoardImages = gifBoard.querySelectorAll('img')
    
    let gifArray = []
    
    gifBoardImages.forEach(gif => {
        //console.log(gif.src)
        gifArray.push(gif.src)
    })
    
    fetch(`http://localhost:3000/moodboards`, {
        method:'POST',
        headers: { 
            'content-type': 'application/json',
            'accept': 'application/json' 
        },
        body: JSON.stringify({
            artist_name: artistName.value, 
            theme: themeInput.value,
            gifs: gifArray 
        })
    })

    
    
})


fetch(`http://localhost:3000/moodboards`)
.then(r => r.json())
.then((res) => {
    
    res.forEach(moodboard => {
        
        let mbBtn =  document.createElement('button')
        mbBtn.id = moodboard.id 
        mbBtn.innerText = moodboard.theme
        moodsColumn.append(mbBtn)
        
        mbBtn.addEventListener('click', () => {
            gifBoard.innerHTML = ""
            
            let moodBoardImages = moodboard.images
            let moodBoardDelBtn = document.createElement('button')
            moodBoardDelBtn.id = moodboard.id 
            moodBoardDelBtn.innerText = 'delete board'
            
            moodBoardImages.forEach(image => {
                
                let currentGif = document.createElement('img')
                currentGif.src = image.url 
                gifBoard.append(currentGif, moodBoardDelBtn)
                // console.log(gifBoard)
                // console.log(image.url)
                // debugger 
            })

            moodBoardDelBtn.addEventListener('click', (evt) => {
                //console.log(evt.target)
                debugger
                gifBoard.remove()
               
                fetch(`http://localhost:3000/moodboards/${moodBoardDelBtn.id}`, {
                  method:'DELETE'
                })

            })
            
            
        })

        
    })
})






