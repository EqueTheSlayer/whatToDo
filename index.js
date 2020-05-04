let images = [];

images[0] = 'morning.jpg';
images[1] = 'day.jpg';
images[2] = 'afternoon.jpg';
images[3] = 'night.jpg';

function pickImages() {
    let date = new Date();
    let hours = date.getHours();
    let i = 0;
    
    if (hours > 6 && hours < 12) i = 0;
    if (hours >= 12 && hours < 18) i = 1;
    if (hours >= 18 && hours < 0) i = 2;
    if (hours >= 0 && hours < 6) i = 3;
    document.getElementById("mainImg").src = images[i];
}

function pickDate() {
    let options = {
        weekday: 'long',
        day: 'numeric',   
        month: 'long' 
    }
    let date = new Date();

    document.getElementById("span").textContent = `${date.toLocaleDateString('ru', options)}`;
}

pickDate();
pickImages();
setInterval(pickImages, 1000);
setInterval(pickDate, 1000)