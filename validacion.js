function validarEnviar(){
    parrafo = document.getElementById("error")
    
    if(document.formulario.nombre.value.length <= 2){
        
        document.formulario.nombre.focus()
        parrafo.innerHTML = "Nombre incorrecto."
        return
    }
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
    if(!regexEmail.test(email.value)){
            parrafo.innerHTML = "Email incorrecto."
            
        return
    }
    if(document.formulario.telefono.value.length <= 8){
        
        document.formulario.telefono.focus()
        parrafo.innerHTML = "Telefono incorrecto."
        return
    }
    parrafo.innerHTML = "Gracias por completar el formulario!"
    document.formulario.submit()
}
