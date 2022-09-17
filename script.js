var map = L.map('map').setView([51.505, -0.09], 13);
fetch('https://api.db-ip.com/v2/free/self').then(data => console.log(data));
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();

// new implementation


// let myIp;
// $.getJSON('https://api.db-ip.com/v2/free/self', function (data) {
//     myIp = JSON.stringify(data, null, 2);
//     console.log(myIp);
// });
