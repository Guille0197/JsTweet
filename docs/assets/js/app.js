const listaTweets = document.getElementById('lista-tweets');

// Event listeners
eventListeners();

function eventListeners(){
    // cuando se envia al formulario
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);

    // borrar tweet
    listaTweets.addEventListener('click', borrarTweet);

    // contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);
}


// funciones

// añadir tweet del formulario
function agregarTweet(e){
    e.preventDefault();

    //leer el valor del textarea
    const tweet = document.getElementById('tweet').value;

    // crear boton de eliminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X'

    // crear elemento y añadirle el contendio a la lista
    const li = document.createElement('li');
    li.innerText = tweet;

    //añade el boton de borrar al tweet
    li.appendChild(botonBorrar);

    //añade el tweet a la lista
    listaTweets.appendChild(li);

    //añade al local storage
    agregarTweetLocalStorage(tweet);
}

// Elimina el tweet
function borrarTweet(e) {
    e.preventDefault();

    if(e.target.className === 'borrar-tweet'){
        e.target.parentElement.remove();
        BorrarTweetLocalStorage(e.target.parentElement.innerText);
    }
}

//Mostar los datos del localStorage en la lista
function localStorageListo() {
    let tweets;

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet) {
        // crear boton de eliminar
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X'

        // crear elemento y añadirle el contendio a la lista
        const li = document.createElement('li');
        li.innerText = tweet;

        //añade el boton de borrar al tweet
        li.appendChild(botonBorrar);

        //añade el tweet a la lista
        listaTweets.appendChild(li);

    })
}

// agrega tweet al local storage
function agregarTweetLocalStorage(tweet) {
    let tweets;
    tweets = obtenerTweetsLocalStorage();

    // agregar el nuevo tweet
    tweets.push(tweet);

    // convertir de string a arreglo para el local storage
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// comprobar que haya elementos en el local storage, retorna un arreglo
function obtenerTweetsLocalStorage() {
    let tweets;

    // revisamos los valores del local storage
    if (localStorage.getItem('tweets') == null) {
        tweets = [];
    }else{
        tweets = JSON.parse(localStorage.getItem('tweets') );
    }
    return tweets;
}

// Eliminar el tweet del local storage
function BorrarTweetLocalStorage(tweet) {
    let tweets, tweetBorrar;

    // elimina la X del tweet
    tweetBorrar = tweet.substring(0, tweet.length -1);

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet, index) {
        if(tweetBorrar === tweet){
            tweets.splice(index, 1);
        }
    });

    localStorage.setItem('tweets', JSON.stringify(tweets));
}


