

function playSpotify() {
    const linkInput = document.getElementById("spotifyLink").value.trim();
    const playerContainer = document.getElementById("playerContainer");

    
    let embedUrl = "";

    if (linkInput.includes("track")) {
        const trackId = linkInput.split("track/")[1].split("?")[0];
        embedUrl = `https://open.spotify.com/embed/track/${trackId}`;
    } else if (linkInput.includes("playlist")) {
        const playlistId = linkInput.split("playlist/")[1].split("?")[0];
        embedUrl = `https://open.spotify.com/embed/playlist/${playlistId}`;
    } else {
        playerContainer.innerHTML = "Invalid Spotify link.";
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


