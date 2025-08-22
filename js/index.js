const PORCENTAJE_PROMEDIO = 0.6;
const PORCENTAJE_EXAMEN = 0.4;
const init = () => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
};

init();

const validar = (elemento) =>{
    // Limpieza del elemento
    elemento.classList.remove("is-invalid");

    const divPadre = elemento.parentElement;
    const label = divPadre.querySelector("label").innerText;
    divPadre.querySelector(".invalid-feedback")?.remove();
    
    if (!elemento.value || elemento.value < 0 || elemento.value >100){
        //Aqui voy a generar los nuevos elementos
        elemento.classList.add("is-invalid");
        // Crear un elemento html programaticamente
        const feedback = document.createElement("div");
        feedback.innerText = `${label} es incorrecto`;
        feedback.classList.add("invalid-feedback");
        divPadre.appendChild(feedback);

        return false;
    }
    return true;
}

document.querySelector("#calcular-btn").addEventListener("click", () => {

    const promedioTxt = document.querySelector("#promedio-txt");
    const examenTxt = document.querySelector("#examen-txt");

    if( !validar(promedioTxt) | !validar(examenTxt)){
        return ;
    }

    const promedio = promedioTxt.value;
    const examen = examenTxt.value;
    const notaFinal = (promedio * PORCENTAJE_PROMEDIO) + (examen * PORCENTAJE_EXAMEN);

    if (notaFinal < 55) {
        Swal.fire({ title: "Reprobado", text: `Nota final ${notaFinal}`, icon: "error" });
    } else {
        Swal.fire({
            title: "Aprobado",
            text: "Nota final " + notaFinal,
            icon: "info"
        });
    }

});
