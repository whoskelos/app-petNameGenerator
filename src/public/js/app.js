var perro = false;
var gato = false;
var animal;
onload = () => {
    document.getElementById("cardPerro").addEventListener("click", (e) => {
        selectAnimal(e);
    });
    document.getElementById("cardGato").addEventListener("click", (e) => {
        selectAnimal(e);
    });
};

const selectAnimal = (e) => {
    const cardAnimal = e.currentTarget;
    if (cardAnimal.classList.contains("perro")) {
        animal = "dog";
        perro = true;
        gato = false;
        checkSelection();
    } else if (cardAnimal.classList.contains("gato")) {
        animal = "cat";
        gato = true;
        perro = false;
        checkSelection();
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
        })
    }
};

const checkSelection = () => {
    if (perro) {
        document.getElementById("cardPerro").classList.add("selected");
        document.getElementById("cardGato").classList.remove("selected");
        activateBtn();
    }
    if (gato) {
        document.getElementById("cardGato").classList.add("selected");
        document.getElementById("cardPerro").classList.remove("selected");
        activateBtn();
    }
};

const activateBtn = () => {
    document.getElementById("btnGen").classList.remove("disabled");
    document.getElementById("btnGen").addEventListener("click", (e) => {
        goToGenerate(animal);
    });
};

const goToGenerate = (animal) => {
    location.href = "generate?animal="+animal;
};
