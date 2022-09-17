let map;

const apiKey = 'at_BDVP1HqV2uRogHt1o4TB0m52iGqe8';
const url = 'https://geo.ipify.org/api/v2/country,city';


function getGeo(ipAddress = '') {
    return Promise.resolve($.ajax({
        url,
        data: { apiKey, ipAddress },
        success: function (data) {
            return JSON.stringify(data, "", 2);
        }
    }));

}

function extractData(result) {
    const { ip, location, isp } = result;
    return { ip, location: `${location.region} ${location.city}`, timezone: location.timezone, isp, latlng: [location.lat, location.lng] };
}

function painMap(latlng) {
    map = L.map('map').setView(latlng, 16);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // L.marker(latlng).addTo(map)
    //     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    //     .openPopup();

}

function showPop(result) {
    L.marker(result.latlng).addTo(map)
        .bindPopup(`IP Address: ${result.ip}`)
        .openPopup();
}





window.addEventListener('load', (e) => {
    getGeo().then(data => {
        // console.log(data);
        const result = extractData(data);
        // console.log(result.latlng);
        painMap(result.latlng);
        showPop(result);
    }).catch(err => console.log(err));
});