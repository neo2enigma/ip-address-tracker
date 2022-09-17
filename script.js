let map;


const apiKey = 'at_BDVP1HqV2uRogHt1o4TB0m52iGqe8';
const url = 'https://geo.ipify.org/api/v2/country,city';



function getValues() {
    let params;
    // const keys = Object.keys[localStorage];
    // console.log(keys);
    // for (let i = 0; i < keys.length; i++) {
    //     console.log(localStorage.getItem(keys[i]));
    //     params.push(localStorage.key[i]);
    // }
    params = { ...localStorage };
    // console.log(params);
    return params;
}

function setValues(params) {
    for (const key in params) {
        localStorage.setItem(key, params[key]);

    }
}



function getGeo(ipAddress = '') {
    return Promise.resolve($.ajax({
        url,
        data: { apiKey, ipAddress },
        success: function (data) {
            return JSON.stringify(data, "", 2);
        }
    }));

}

function extractData(data) {
    let result = { ip: data.ip, ...data.location, isp: data.isp };
    return result;
}


function painMap(lat, lng) {

    map = L.map('map').setView([lat, lng], 16);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


}

function showPop(lat, lng, ip) {
    L.marker([lat, lng]).addTo(map)
        .bindPopup(`IP Address: ${ip}`)
        .openPopup();
}



async function getLocation() {
    try {
        const ip = localStorage.getItem('ip') ? localStorage.getItem('ip') : '';
        let result;
        if (ip === '') {
            const data = await getGeo();
            result = extractData(data);
            setValues(result);
        } else {
            result = getValues();
        }
        return result;
    } catch (error) {
        console.log(error);
    }
}


getLocation().then(result => {
    painMap(result['lat'], result['lng']);
    showPop(result['lat'], result['lng'], result['ip']);
}).catch(err => console.log(err));
