var parametros;
var animal;
onload = () => {
    parametros = window.location.search;
    animal = parametros.split("=")[1];
    cargarPrompt(animal);
    document
        .querySelector("#btnSearch")
        .addEventListener("click", generateNames);
};

const cargarPrompt = (animal) => {
    document.getElementById("prompTitle").innerHTML += ` ${animal}`;
    document.getElementById(
        "textPrompt"
    ).innerHTML = `Tell me three names for my ${animal}`;
};

const generateNames = () => {
    const textPrompt = document.querySelector("#textPrompt").value;
    const prompt = {
        description: textPrompt,
    };
    if (
        textPrompt == "Tell me three names for my dog" ||
        textPrompt == "Tell me three names for my cat"
    ) {
        console.log("Describe your pet please!");
    } else {
        console.log(textPrompt);
        document.getElementById("loader").classList.add("answers");
        fetch("/message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(prompt),
        })
            .then((response) => response.json())
            .then((data) => showNames(data));
    }
};

const showNames = (names) => {
    //selecciono div donde voy a crear las tarjetas de las respuestas
    const divAnswers = document.getElementById("divNames");
    //quito el spin del loading de la peticion
    document.getElementById("loader").remove();
    const response = names.message;
    //separo las respuestas para hacer una tarjeta por cada una de ellas
    const words = response.split(".");

    //creo el div donde van a ir las cards
    const $cards = document.createElement("div");
    
    for (let i = 1; i < words.length; i++) {
        $cards.innerHTML += `<div class="cardAnswer justify-content-between justify-content-md-around shadow-sm mb-3 p-3">
            <img src="/img/${animal}.png" alt="Imagen de ${animal}">
            <p class="fs-4">${words[i]}</p>
        </div>`;
    }
    divAnswers.append($cards);
    
};

