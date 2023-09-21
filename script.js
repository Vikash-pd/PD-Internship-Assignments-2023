
const clientId = '215cd5f8ad104329954abcc52e019a26';
const clientSecret = 'b58bfb03b17d408a972d00931f7bacb5';

const artistIds = [
    '2oSONSC9zQ4UonDKnLqksx',
    '7hHDO4bJGlEaEHlY2lj1eZ',
    '5NHm4TU5Twz7owibYxJfFU',
    '7uIbLdzzSEqnX0Pkrb56cR',
    '2GoeZ0qOTt6kjsWW4eA6LS',
    '0C8ZW7ezQVs4URX5aX7Kqx',
    '0oOet2f43PA68X5RxKobEy',
    '2o4R2rK7FetH40HTv0SUWl',
    '00sCATpEvwH48ays7PlQFU',
    '4zCH9qm4R2DADamUHMCa6O',
    '74OaRjmyh0XyRZsQQQ5l7c',
    '2P9JaCtpbQSuZOgvtPrUJ8',
    '4ITkqBlf5eoVCOFwsJCnqo',
    '4PULA4EFzYTrxYvOVlwpiQ'
  ];


const getAccessToken = async () => {
    
    const basicAuth = btoa(`${clientId}:${clientSecret}`);

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${basicAuth}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
    });

    const data = await response.json();
    if(response.status == 200) {
        console.log("Success : ", data)
   } else {
      console.log('Server Error : ', data.error.message)
       }
    return data.access_token;
};


async function fetchArtistData(artistId, accessToken) {
    const artistUrl = `https://api.spotify.com/v1/artists/${artistId}`;
    const headers = {
        'Authorization': `Bearer ${accessToken}`
    };

    try {
        const response = await fetch(artistUrl, { headers });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching artist data:", error);
        return null;
    }
}
// Render artists on the webpage
const renderArtists = (artists) => {
    const artistList = document.getElementById('artist-list');
    artists.forEach((artist) => {
        artistList.insertAdjacentHTML('beforeend',
       ` <div class="card">
      <div class="main">
        <div class="image">
           <img
            src=${artist.images[0].url}
            alt="Image of Artist"
          />
        </div>
      <div class="body">
        <div class=" paragraph">
          <h1>${artist.name}</h1><br />
          <p>Follower: ${artist.followers.total}</p><br />
          <p>Popularity: ${artist.popularity}</p><br />
          <p>Music Kind:${artist.genres?.find(element => {return element})}
          </p><br />
        </div>
      </div>
      </div>
    </div>`)
    });
};

const main = async () => {
    try {
        const accessToken = await getAccessToken();
        const artistDataPromises = artistIds.map((artistId) => fetchArtistData(artistId, accessToken));
        const topArtists = await Promise.all(artistDataPromises);
        renderArtists(topArtists);
        console.log(accessToken);
    } catch (error) {
        console.error('An error occurred:', error);
    }
    console.log('Main function called.');
};

main();

