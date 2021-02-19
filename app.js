console.log('Music app started')

const searchMusic = () => {
    const query = document.getElementById('songQuery').value;
    getSongs(query);
}

const getSongs = (song) => {
    loadingToggler();
    const url = `https://api.lyrics.ovh/suggest/${song}`
    fetch(url)
        .then(res => res.json())
        .then(data => showSongs(data.data))
        .catch(err => console.log(err))
}

const container = document.querySelector('.search-result');
const showSongs = (songLists) => {
    container.innerHTML = ''
    songLists.forEach(song => {
        createResult(song)
    });
    loadingToggler()
}

const createResult = (song) => {
    console.log(song.preview)
    const result = document.createElement('div')
    result.classList = 'single-result row align-items-center my-3 p-3'
    result.innerHTML = `
    <div class="col-md-9">
              <h3 class="lyrics-name">${song.title}</h3>
              <p class="author lead">Song by <span>${song.artist.name}</span></p>
              <audio controls>
                <source src="${song.preview}" type="audio/mpeg">
            </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
              <button class="btn btn-success" 
              data-bs-toggle="modal"  data-bs-target="#exampleModal" onclick="getLyrics('${song.artist.name}', '${song.title}')">Get Lyrics</button>
            </div>`
    container.appendChild(result)

}

const getLyrics = (artist, song) => {
    console.log(artist, song)
    const url = `https://api.lyrics.ovh/v1/${artist}/${song}`

    fetch(url)
        .then(res => res.json())
        .then(data => showLyrics(data, song))
        .catch(err => console.log(err))
}

const showLyrics = (lyric, title) => {
    console.log(lyric.lyrics)
    // const resultModal = document.getElementById('exampleModal')
    document.querySelector('.modal-title').innerText = title;
    document.querySelector('.modal-body').innerText = `${lyric.lyrics}`;

}

// searchLyrics('Hemanta Mukherjee', 'ei path')

const loadingToggler = () => {
    document.getElementById('loadingSpinner').classList.toggle('d-none')
}