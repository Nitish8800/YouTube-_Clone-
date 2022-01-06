let div = document.getElementById("videosResults");
let input = document.getElementById("inputBox");
input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        // Number 13 is the ("Enter" key button)  on the keyboard

        event.preventDefault();

        document.getElementById("searchbtn").click(); // Trigger the button element with a click
        search();
    }
});

let playVideo = (id) => {
    let videoDiv = document.getElementById("videosResults");
    // videoDiv.innerHTML = null;

    videoDiv.innerHTML = `<iframe
  width="1300"
  height="555"
  src="https://www.youtube.com/embed/${id}"
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>`;
};

async function search() {
    let inp = document.getElementById("inputBox").value;
    let div = document.getElementById("videosResults");


    let API = "AIzaSyA266SPutTfCO63sLArqnx8Xi-UR51PSus";


    div.innerHTML = "";
    let res = await fetch(
        `https://youtube.googleapis.com/youtube/v3/search?q=${inp}&part=snippet&maxResults=25&key=${API}`
    );
    let data = await res.json();
    console.log(data);

    for (let {
        id: { videoId },
        channelImage,
        snippet: { title, channelTitle, thumbnails },
    } of data.items) {
        let channelThumbnail = thumbnails.default.url;
        let mainDiv = document.createElement("div");
        mainDiv.id = "hoverDiv";
        mainDiv.onclick = () => playVideo(id);

        let channelThumbnailImg = document.createElement("img");
        channelThumbnailImg.src = channelThumbnail;
        channelThumbnailImg.className = "channel-icon";

        let video_frame = document.createElement("iframe");

        let flex = document.createElement("div");
        flex.id = "flex";
        let t = document.createElement("p");
        t.style = "color:black";
        t.className = "title";
        video_frame.src = `https://www.youtube.com/embed/${videoId}`;
        video_frame.allow = `fullscreen`;
        t.innerHTML = title;

        let channelTittle = document.createElement("p");

        channelTittle.id = "channel-name";
        channelTittle.innerHTML = `${channelTitle} <span id=span>✅</span> `;

        flex.append(channelThumbnailImg, channelTittle);
        mainDiv.append(video_frame, flex, t);
        div.append(mainDiv);
    }
}

// <-------------------------------------------------------------------->

async function trending() {
    let inp = document.getElementById("inputBox").value;
    let div = document.getElementById("videosResults");
    div.innerHTML = "";


    let API = "AIzaSyA266SPutTfCO63sLArqnx8Xi-UR51PSus";


    let res = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&maxResults=24&chart=mostPopular&regionCode=IN&key=${API}`
    );
    let data = await res.json();
    console.log(data);

    for (let {
        id,
        channelImage,
        snippet: { title, channelTitle, thumbnails },
    } of data.items) {
        let channelThumbnail = thumbnails.medium.url;


        let channelThumbnailImg = document.createElement("img");
        channelThumbnailImg.src = channelThumbnail;
        channelThumbnailImg.className = "channel-icon";

        let video_frame = document.createElement("img");
        video_frame.style.width = "100%";

        let mainDivs = document.createElement("div");
        mainDivs.id = "hoverDiv";
        mainDivs.onclick = () => playVideo(id);
        let flex = document.createElement("div");
        flex.id = "flex";
        let t = document.createElement("p");
        t.style = "color:black";
        t.className = "title";
        video_frame.src = channelThumbnail;

        t.innerHTML = title;

        let channelTittle = document.createElement("p");

        channelTittle.id = "channel-name";
        channelTittle.innerHTML = `${channelTitle} <span id=span>✅</span> `;

        flex.append(channelThumbnailImg, channelTittle);
        mainDivs.append(video_frame, flex, t);
        div.append(mainDivs);
    }
}

trending();