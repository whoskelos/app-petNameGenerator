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
    regexPrompt = /(Tell me three names for my) (dog|cat)+([, ]||[a-z ])/i;
    const textPrompt = document.querySelector("#textPrompt").value.trim();
    const prompt = {
        description: textPrompt,
    };
    if (
        textPrompt == "Tell me three names for my dog" ||
        textPrompt == "Tell me three names for my cat"
    ) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please, describe your pet!',
          })
    } else if (textPrompt == "" || !regexPrompt.test(textPrompt)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
        })
        document.querySelector("#textPrompt").value = `Tell me three names for my ${animal}`;
    }else {
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
    if (document.getElementById("divCards")) {
        document.getElementById("divCards").remove();
    }
    //selecciono div donde voy a crear las tarjetas de las respuestas
    const divAnswers = document.getElementById("divNames");
    //quito el spin del loading de la peticion
    document.getElementById("loader").classList.remove("answers");
    const response = names.message.trim();
    //separo las respuestas para hacer una tarjeta por cada una de ellas
    const words = response.split("\n");
    //creo el div donde van a ir las cards
    const $cards = document.createElement("div");
    $cards.id = "divCards";
    
    for (let i = 0; i < words.length; i++) {
        $cards.innerHTML += `<div class="cardAnswer justify-content-between justify-content-md-around shadow-sm mb-3 p-3">
            <img src="/img/${animal}.png" alt="Imagen de ${animal}">
            <p class="fs-4">${words[i]}</p>
        </div>`;
    }
    divAnswers.append($cards);
    
};

