
function getSpotifyEmbedUrl(link) {
    if (link.includes("track")) {
        const trackId = link.split("track/")[1]?.split("?")[0];
        return `https://open.spotify.com/embed/track/${trackId}`;
    } else if (link.includes("playlist")) {
        const playlistId = link.split("playlist/")[1]?.split("?")[0];
        return `https://open.spotify.com/embed/playlist/${playlistId}`;
    }
    return null;
}


function playSpotify() {
    const linkInput = document.getElementById("spotifyLink").value.trim();
    const playerContainer = document.getElementById("playerContainer");
    const embedUrl = getSpotifyEmbedUrl(linkInput);

    if (!embedUrl) {
        playerContainer.innerHTML = "<p style='color:white;'>Invalid Spotify link.</p>";
        return;
    }

    playerContainer.innerHTML = `
        <iframe style="border-radius:12px" 
                src="${embedUrl}" 
                width="500" 
                height="80" 
                frameBorder="0" 
                allowtransparency="true" 
                allow="encrypted-media">
        </iframe>
    `;

    document.getElementById("spotifyLink").value = "";
}


function savePlaylist() {
    const nameInput = document.getElementById("savePlaylistName");
    const linkInput = document.getElementById("savePlaylistInput");
    const playlistName = nameInput.value.trim();
    const playlistLink = linkInput.value.trim();
    const playlistList = document.getElementById("playlistList");

    if (!playlistName || !playlistLink) {
        alert("Please enter both a playlist name and URL.");
        return;
    }

    const embedUrl = getSpotifyEmbedUrl(playlistLink);
    if (!embedUrl) {
        alert("Invalid Spotify link.");
        return;
    }

    const playlistData = {
        name: playlistName,
        link: playlistLink
    };

    let playlists = JSON.parse(localStorage.getItem("playlists")) || [];
    playlists.push(playlistData);
    localStorage.setItem("playlists", JSON.stringify(playlists));

    addPlaylistToUI(playlistData);
    
    
    nameInput.value = "";
    linkInput.value = "";
}


function addPlaylistToUI(playlistData) {
    const playlistList = document.getElementById("playlistList");

    const listItem = document.createElement("li");

    
    const nameDiv = document.createElement("div");
    nameDiv.className = "playlist-name";
    nameDiv.textContent = playlistData.name;

   
    const controlsDiv = document.createElement("div");
    controlsDiv.className = "playlist-controls";

    
    const playButton = document.createElement("button");
    playButton.textContent = "Play";
    playButton.onclick = () => playSpotifyFromSaved(playlistData.link);

    
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deletePlaylist(listItem, playlistData.link);

    controlsDiv.appendChild(playButton);
    controlsDiv.appendChild(deleteButton);

    listItem.appendChild(nameDiv);
    listItem.appendChild(controlsDiv);
    playlistList.appendChild(listItem);
}


function playSpotifyFromSaved(link) {
    const playerContainer = document.getElementById("playerContainer");
    const embedUrl = getSpotifyEmbedUrl(link);

    if (!embedUrl) {
        playerContainer.innerHTML = "<p style='color:white;'>Invalid Spotify link.</p>";
        return;
    }

    playerContainer.innerHTML = `
        <iframe style="border-radius:12px" 
                src="${embedUrl}" 
                width="500" 
                height="80" 
                frameBorder="0" 
                allowtransparency="true" 
                allow="encrypted-media">
        </iframe>
    `;
}


function deletePlaylist(item, link) {
    let playlists = JSON.parse(localStorage.getItem("playlists")) || [];
    playlists = playlists.filter(playlist => playlist.link !== link);
    localStorage.setItem("playlists", JSON.stringify(playlists));

    item.classList.add("fade-out");
    setTimeout(() => item.remove(), 300);
}


function loadPlaylists() {
    const playlists = JSON.parse(localStorage.getItem("playlists")) || [];
    playlists.forEach(playlist => addPlaylistToUI(playlist));
}


window.onload = loadPlaylists;
