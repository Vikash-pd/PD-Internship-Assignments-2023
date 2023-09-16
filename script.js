
 
const token = 'BQDpJ3MUcAymqBvQRCS3LIVQJciT2iVkq4EWXwhp16pp8_dZ0sDU6fqfHiKY3lECD6k3kO_e3vxTo_HR9cAT-w40RLKpbzNryp52rfXVzNrE7H-H77QmG81fbcoxRRXP6PPV-DNo4YOKHhzlvFQ0shh1ULvLktX9lrcfaKKkvu6g5vRhPJT1YOTHc1u4hr9iUxRvMNapJCPPVZ3bPg0YDkkRDG-rSs_h55cIjymAEgHiDk7olNstwVqJzQxU5ZvES4g7Hhn4Ap64Ymr2t2GM1GuJ';
const url = "https://api.spotify.com/v1/artists?ids=2GoeZ0qOTt6kjsWW4eA6LS%2c7hHDO4bJGlEaEHlY2lj1eZ%2c4YRxDV8wJFPHPTeXepOstw%2c7uIbLdzzSEqnX0Pkrb56cR%2c7n2wHs1TKAczGzO7Dd2rGr%2c0C8ZW7ezQVs4URX5aX7Kqx%2c0oOet2f43PA68X5RxKobEy%2c2o4R2rK7FetH40HTv0SUWl%2c00sCATpEvwH48ays7PlQFU%2c4zCH9qm4R2DADamUHMCa6O"

const request = new Request(
   url,{
       headers:{
           'Authorization': `Bearer ${token}`
       },
})


async function getData() {
   try {
       const response = await fetch(request);
       const data = await response.json();
       console.log(data);
       
       
       const dataContainer = document.getElementById("data-container");
       

       
       const artistList = document.createElement("ul");

       
       data.artists.forEach(artist => {
           const listItem = document.createElement("li");
           listItem.textContent = `Artist Name: ${artist.name} , 
            Follower:${artist.followers.total} , 
             Music Kind : ${artist.genres} ,
           Popularity: ${artist.popularity}`;
           artistList.appendChild(listItem);
       });

       
       dataContainer.appendChild(artistList);
   } catch (error) {
       console.error("Error fetching data:", error);
   }
}
getData()