const app = document.getElementById('root');

const logo = document.createElement('img');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);

var request = new XMLHttpRequest();
request.open('GET', 'http:services.groupkt.com/state/get/USA/all', true);
request.onload = function () {

    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {

        document.getElementById("root").innerHTML = data.RestResponse.result[0].name +"-"+ data.RestResponse.result[0].abbr
        + "-" + data.RestResponse.result[0].largest_city;

    } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `Gah, it's not working!`;
        app.appendChild(errorMessage);
    }
};

request.send();

