let map;


const apiKey = 'at_BDVP1HqV2uRogHt1o4TB0m52iGqe8';
const url = 'https://geo.ipify.org/api/v2/country,city';


const ipTag = document.querySelector('#ip');
const locationTag = document.querySelector('#location');
const timezoneTag = document.querySelector('#timezone');
const ispTag = document.querySelector('#isp');
const form = document.querySelector('form');



function setTagValue(params) {
    ipTag.innerHTML = params.ip;
    locationTag.innerHTML = `${params.region}, ${params.city}`;
    timezoneTag.innerHTML = `UTC ${params.timezone}`;
    ispTag.innerHTML = params.isp;
}

function getValues() {
    const params = { ...localStorage };
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


function showPop(lat, lng, ip) {
    L.marker([lat, lng]).addTo(map)
        .bindPopup(`IP Address: ${ip}`)
        .openPopup();
}


function painMap(lat, lng, ip) {
    console.log(lat, lng, ip);
    map = L.map('map').setView([lat, lng], 16);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    showPop(lat, lng, ip);
}





async function getLocation(ip) {
    try {
        const storageIp = localStorage.getItem('ip') ? localStorage.getItem('ip') : '';
        let result;
        if (storageIp === '' || ip) {
            const data = await getGeo(ip);
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
    setTagValue(result);
    const { lat, lng, ip } = result;
    painMap(lat, lng, ip);

}).catch(err => console.log(err));


form.addEventListener('submit', (e) => {
    e.preventDefault();

    const ip = form.querySelector('input').value;

    getLocation(ip).then(result => {
        setTagValue(result);
        const { lat, lng } = result;
        map.remove();
        painMap(lat, lng, ip);
    }).catch(err => console.log(err));

});

