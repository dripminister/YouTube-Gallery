const videoContainer = document.getElementById("videos-container")
const videoIdInput = document.getElementById("video-id") 
const popUp = document.getElementById("popup")
const videoElement = document.querySelector("#popup > iframe")
const saveBtn = document.getElementById("save-btn")
let videoIds = []

saveBtn.addEventListener("click", (e) => saveVideo(e))
popUp.addEventListener("click", closePopup)

function loadVideos(){
    videoIds = JSON.parse(localStorage.getItem("videoIds")) ||  []
}

function displayVideos(){
    const videoHtml = videoIds.map(id => {
        return `
        <li onClick="clickVideo(event, '${id}')">
        <img class="thumbnail" src="https://i3.ytimg.com/vi/${id}/sddefault.jpg" alt="Cover image for YouTube video with id ${id}">
        <button class="delete-btn">&times;</button>
        </li>
        `
    }).join("")
    videoContainer.innerHTML = videoHtml
}

function clickVideo(e, id){
    if(e.target.classList.contains("delete-btn")){
        videoIds = videoIds.filter(videoId => videoId !== id)
        localStorage.setItem("videoIds", JSON.stringify(videoIds))
        displayVideos()
    }else{
        videoElement.src = `https://www.youtube.com/embed/${id}`
        popUp.classList.add("open")
        popUp.classList.remove("closed")
    }
}

function closePopup(){
    popUp.classList.add("closed")
    popUp.classList.remove("open")
}

function saveVideo(e){
    e.preventDefault()
    const videoLink = videoIdInput.value
    const splitedLink = videoLink.split("/")
    const lastPart = splitedLink[splitedLink.length - 1]
    const watchValue = lastPart.split("=")
    const videoId = watchValue[1]
    console.log(videoId)
    videoIds.unshift(videoId)
    videoIdInput.value = ""
    localStorage.setItem("videoIds", JSON.stringify(videoIds))
    displayVideos()
}

loadVideos()
displayVideos()