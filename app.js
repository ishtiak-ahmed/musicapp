console.log('Music app started')

const searchMusic = () => {
    const query = document.getElementById('songQuery').value;
    getSongs(query);
}

const getSongs = (song) => {
    const url = `https://api.lyrics.ovh/suggest/${song}`
    fetch(url)
        .then(res => res.json())
        .then(data => showSongs(data.data))
        .catch(err => console.log(err))
}

const showSongs = (songLists) => {
    songLists.forEach(song => {
        createResult(song)
    });
}

const createResult = (song) => {
    const container = document.querySelector('.search-result');
    const result = document.createElement('div')
    result.classList = 'single-result row align-items-center my-3 p-3'
    result.innerHTML = `
    <div class="col-md-9">
              <h3 class="lyrics-name">${song.title}</h3>
              <p class="author lead">Album by <span>Washed Out</span></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
              <button class="btn btn-success">Get Lyrics</button>
            </div>`
    container.appendChild(result)

}