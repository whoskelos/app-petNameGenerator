var parametros;
var animal;
onload = () => {
    parametros = window.location.search;
    animal = parametros.split("=")[1];
    cargarPrompt(animal);
    document
        .querySelector("#btnSearch")
        .addEventListener("click", generateNames);
    test();
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
        document.getElementById("divNames").classList.add("answers");
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
    //separar las palabras y hacer una tarjeta por cada nombre
    document.getElementById("divNames").classList.remove("answers");
    document.querySelector("#divNames").innerHTML = names.message;
};

