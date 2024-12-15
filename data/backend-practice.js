//XMLHttpRequest  provided by JS
//leaned how to send request to a backend

const xhr = new XMLHttpRequest();
xhr.addEventListener('load', () => {
    console.log(xhr.response);
})
xhr.open('GET', 'https://talhas-portfoli0.netlify.app/');
xhr.send();