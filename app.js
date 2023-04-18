'use strict'
const grande = document.querySelector('.grande')
const punto = document.querySelector('.punto')

//cuando CLICK en punto 
//Saber la posicion de ese punto 
//Aplicar un transform translateX al grande 
//QUITAR la clase activo de TODOS puntos 
//Añadir la clase activo al punto que hemos hecho CLICK 

//recorrer Todos los puntos
punto.forEach( (cadaPunto, i) =>{
    //Asignamos un CLICK a cadapunto 
    punto[i].addEventListener('click', () => {

        //guardar la posicion de ese PUNTO
        let posicion = i
        //calculando el espacio que debe DESPLAZARSE el GRANDE
        let operacion = posicion * -50

        //Movimos el grande
        grande.getElementsByClassName.transform = 'translateX(${ operacion }%)'

        //Recorremos TODOS los puntos
        punto.forEach( ( cadaPunto, i)=>{
            //Quitamos la clase ACTIVO a Todos los punto
            punto[i].classList.remove('activo')
        })
        //Añadir la clase activo en el punto que hecmo hecho CLICK 
        punto[i].classLis.add('activo')
    })
})

