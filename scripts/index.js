const anime = ['6702','1735','21','30276','223','269','136','170','1564','30654','21881','23755','16498','1535','34572'];
const content = document.querySelector('.content');
const sideNav = document.querySelector('.sideNav');
//Auto display from the API 
for(let i = 0; i < anime.length; i++){
    fetch(`https://api.jikan.moe/v4/anime/${anime[i]}`)
    .then(res=>res.json())
    .then(result=>{
        const { data } = result
        const img = document.createElement('img');
        img.src= data.images.jpg.large_image_url;
        img.id = anime[i];
        content.append(img);
        document.getElementById(anime[i]).addEventListener('click',getLink);
    })
    .catch(err=>console.log(err))
}

// Get Link to the Anime by click
function getLink(e){   
    content.innerHTML = '';
    // Get Anime Details
    fetch(`https://api.jikan.moe/v4/anime/${e.target.id}`)
    .then(res=>res.json())
    .then(result=>{
        const { data } = result
        let div = document.createElement('div');
        div.className = 'details';
        div.innerHTML = `
            <div class='detail-img'><img src='${e.target.src}'/></div>
            <div class='detail'>
                <div><h1>${data.title}</h1><a href='index.html' class='back'>Back</a> </div>
                <p>${data.synopsis}<p>  
                <a href ='${data.url} target='_blank'>More Info...</a>
            </div>
        `;
        content.append(div);
    })
    .catch(err=>console.log(err))

    //Get Anime Video
    // fetch(`https://api.jikan.moe/v4/anime/${e.target.id}`)
    // .then(res=>res.json())
    // .then(result=>{
    //     const { data } = result
    //     if(data.trailer.url !== null){
    //         let video = document.createElement('iframe');
    //         video.src = data.trailer.url;
    //         document.querySelector('.detail').append(video);
    //     }

    // })
    // .catch(err=>console.log(err))

    //Get Anime Characters
    fetch(`https://api.jikan.moe/v4/anime/${e.target.id}/characters`)
    .then(res=>res.json())
    .then(result=>{
        const { data } = result
        let div = document.createElement('div');
        div.className = 'characters';
        for (let i = 0; i < 9; i++) {
            div.innerHTML += `
                <img id='${e.target.id}' class='${data[i].character.mal_id}' src='${data[i].character.images.jpg.image_url}'/>
            `;
        }
        document.querySelector('.details').append(div);
        document.querySelector('.characters').addEventListener('click',getCharacters);
        let div1 = document.createElement('div');
        div1.className = 'moreBtn';
        div1.innerHTML = `<center><button id='${e.target.id}' class='more'>More</button></center>`;
        document.querySelector('.characters').append(div1);
        document.querySelector('.more').addEventListener('click',getMoreChar);
    })
    .catch(err=>console.log(err))
}

//Get More Character 
function getMoreChar(e){
    document.querySelector('.details').innerHTML = '';
    fetch(`https://api.jikan.moe/v4/anime/${e.target.id}/characters`)
    .then(res=>res.json())
    .then(result=>{
        const { data } = result
        let charTitle = document.createElement('div');
        charTitle.className = 'char';
        charTitle.innerHTML = `<h1>Characters <input type="text" id="${e.target.id}" class="post" placeholder="Search . . ."></h1><a href='index.html' class='back'>Back</a>`;
        let div = document.createElement('div');
        div.className = 'characters';
        for (let i = 0; i < data.length; i++) {
           if(i < 100){
                div.innerHTML += `
                    <img id='${e.target.id}' class='${data[i].character.mal_id}' src='${data[i].character.images.jpg.image_url}'/>
                `;
           }
        }
        document.querySelector('.details').append(charTitle);
        document.querySelector('.details').append(div);
        document.querySelector('.characters').addEventListener('click',getCharacters);
        document.querySelector('.post').addEventListener('input',searchCharacter);
    })
    .catch(err=>console.log(err))
}

//Get Character Details
function getCharacters(e){
    fetch(`https://api.jikan.moe/v4/anime/${e.target.id}/characters`)
    .then(res=>res.json())
    .then(result=>{
        const { data } = result
        for (let i = 0; i < data.length; i++) {
            if(data[i].character.mal_id == e.target.className){
            content.style.width = '60%';
            sideNav.style.display = 'flex';
            document.querySelector('.navImg').src = data[i].character.images.jpg.image_url;
            document.querySelector('.navName').innerHTML = data[i].character.name;
            document.querySelector('.navImg1').src = data[i].voice_actors[0].person.images.jpg.image_url;
            document.querySelector('.navName1').innerHTML = data[i].voice_actors[0].person.name;
            document.querySelector('a').href = data[i].character.url;
            }
        }
    })
    .catch(err=>console.log(err))
}

//Search Function
function searchCharacter(e){
    document.querySelector('.characters').innerHTML = '';
    fetch(`https://api.jikan.moe/v4/anime/${e.target.id}/characters`)
    .then(res=>res.json())
    .then(result=>{
        const { data } = result
        for (let i = 0; i < data.length; i++) {
            if(data[i].character.name.toLowerCase().match(e.target.value.toLowerCase())){
                const img = document.createElement('img');
                img.id = e.target.id;
                img.className = data[i].character.mal_id;
                img.src = data[i].character.images.jpg.image_url;
                document.querySelector('.characters').append(img);
            }
            
        }
    })
    .catch(err=>console.log(err))
}