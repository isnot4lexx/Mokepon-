//varibales de la seccion iniciar juego 
const sectionseleccionarAtaque = document.getElementById("seleccionar-ataque")
const sectionReiniciar = document.getElementById("boton-reiniciar")
const botonMascotaJugador = document.getElementById("boton-mascota")
const botonReiniciar = document.getElementById("boton-reiniciar")

//variables de la seccion seleccionar mascota
const seleccionarMascota = document.getElementById("seleccionar-mascota")
const spanMascotaJugador = document.getElementById("mascota-jugador")

//variable de la seccion seleccionar mascota del enemigo 
const spanMascotaEnemigo = document.getElementById("mascota-enemigo")

//variables de la seccion de combate
const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasEnemigo = document.getElementById("vidas-enemigo")

//variables de la seccion crear mensaje
const sectionMensajes = document.getElementById("resultado")
const ataquesDelJugador = document.getElementById("ataques-del-jugador")
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo")
const contenedorTarjetas = document.getElementById("contenedor-tarjetas")
const contenedorAtaques = document.getElementById("contenedor-ataques")

//aca va la seccion de canvas 
const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let jugadorId = null
let enemigoId = null
let mokepones = []
let mokeponesEnemigos = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let inputPikachu 
let inputDinoCheems 
let inputCheemsMalvado
let inputCheemsSpider
let inputCheemsJomker
let inputSamuraiCheems
let mascotaJugador 
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo 
let botonFuego 
let botonPuñoLimpio
let botonRayo
let botonTelaraña
let botonBomba
let botonKatana
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = "./imagenes/mokemap.png"
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 350
if(anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}
alturaQueBuscamos = anchoDelMapa * 600 / 800
mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Mokepon {
    constructor (nombre, foto, vida, id = null) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida 
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = foto
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let dinoCheems = new Mokepon("DinoCheems", "./imagenes/dino-cheems.png", 5)

let cheemsMalvado = new Mokepon("CheemsMalvado", "./imagenes/cheems malvado.png", 5)

let cheemsPikachu = new Mokepon("CheemsPikachu", "./imagenes/cheems pikachu.png", 5)

let cheemsSpider = new Mokepon("CheemsSpider", "./imagenes/cheemsAraña.png", 5)

let cheemsJomker = new Mokepon("CheemsJomker", "./imagenes/cheemsJoker.png", 5)

let samuraicheems = new Mokepon("SamuraiCheems", "./imagenes/cheemsSamurai.png", 5)

const DINOCHEEMS_ATAQUES = [
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "⚡", id: "boton-rayo" },
    { nombre: "🥊", id: "boton-puño-limpio" },
]

dinoCheems.ataques.push(...DINOCHEEMS_ATAQUES)

const CHEEMSMALVADO_ATAQUES = [
    { nombre: "🥊", id: "boton-puño-limpio" },
    { nombre: "🥊", id: "boton-puño-limpio" },
    { nombre: "🥊", id: "boton-puño-limpio" },
    { nombre: "⚡", id: "boton-rayo" },
    { nombre: "🔥", id: "boton-fuego" },
]

cheemsMalvado.ataques.push(...CHEEMSMALVADO_ATAQUES)

const CHEEMSPIKACHU_ATAQUES = [
    { nombre: "⚡", id: "boton-rayo" },
    { nombre: "⚡", id: "boton-rayo" },   
    { nombre: "⚡", id: "boton-rayo" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🥊", id: "boton-puño-limpio" },
]

cheemsPikachu.ataques.push(...CHEEMSPIKACHU_ATAQUES)

const CHEEMSSPIDER_ATAQUES = [
    { nombre: "🕸", id: "boton-telaraña" },
    { nombre: "🕸", id: "boton-telaraña" },   
    { nombre: "🕸", id: "boton-telaraña" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🥊", id: "boton-puño-limpio" },
]

cheemsSpider.ataques.push(...CHEEMSSPIDER_ATAQUES)

const CHEEMSJOMKER_ATAQUES = [
    { nombre: "💣", id: "boton-bomba" },
    { nombre: "💣", id: "boton-bomba" },   
    { nombre: "💣", id: "boton-bomba" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🥊", id: "boton-puño-limpio" },
]

cheemsJomker.ataques.push(...CHEEMSJOMKER_ATAQUES)

const SAMURAICHEEMS_ATAQUES = [
    { nombre: "⚔", id: "boton-katana" },
    { nombre: "⚔", id: "boton-katana" },   
    { nombre: "⚔", id: "boton-katana" },
    { nombre: "💣", id: "boton-bomba" },
    { nombre: "🥊", id: "boton-puño-limpio" },
]

samuraicheems.ataques.push(...SAMURAICHEEMS_ATAQUES)
  
mokepones.push(dinoCheems,cheemsMalvado,cheemsPikachu,cheemsSpider,cheemsJomker,samuraicheems)

function iniciarJuego() {
   
    sectionseleccionarAtaque.style.display = "none"   
    sectionReiniciar.style.display = "none"
    sectionVerMapa.style.display = "none"

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src="${mokepon.foto}" alt=${mokepon.nombre}>
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones

        inputDinoCheems = document.getElementById("DinoCheems")
        inputCheemsMalvado = document.getElementById("CheemsMalvado")
        inputPikachu = document.getElementById("CheemsPikachu")
        inputCheemsSpider = document.getElementById("CheemsSpider")
        inputCheemsJomker = document.getElementById("CheemsJomker")
        inputSamuraiCheems = document.getElementById("SamuraiCheems")
    })

    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador) 
    botonReiniciar.addEventListener("click", reiniciarJuego)

    unirseAlJuego()
}

function unirseAlJuego() {
    fetch("http://192.168.100.26:8080/unirse")
        .then(function (res) {
            if(res.ok) {
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta   
                    })
            }    
        })

}

function seleccionarMascotaJugador() {
    seleccionarMascota.style.display = "none"

    if (inputDinoCheems.checked) {
        spanMascotaJugador.innerHTML = inputDinoCheems.id
        mascotaJugador = inputDinoCheems.id
    } else if (inputCheemsMalvado.checked) {
        spanMascotaJugador.innerHTML = inputCheemsMalvado.id
        mascotaJugador = inputCheemsMalvado.id
    } else if (inputPikachu.checked) {
        spanMascotaJugador.innerHTML = inputPikachu.id
        mascotaJugador = inputPikachu.id 
    } else if (inputCheemsSpider.checked) {
        spanMascotaJugador.innerHTML = inputCheemsSpider.id
        mascotaJugador = inputCheemsSpider.id
    } else if (inputCheemsJomker.checked) {
        spanMascotaJugador.innerHTML = inputCheemsJomker.id
        mascotaJugador = inputCheemsJomker.id
    } else if (inputSamuraiCheems.checked) {
        spanMascotaJugador.innerHTML = inputSamuraiCheems.id
        mascotaJugador = inputSamuraiCheems.id
    } else {
        alert("Selecciona tu mascota papi 😠")
        reiniciarJuego()
    }

        seleccionarMokepon(mascotaJugador)

        extraerAtaques(mascotaJugador)
        sectionVerMapa.style.display = "flex"
        iniciarMapa()
}

function seleccionarMokepon(mascotaJugador) {
    fetch(`http://192.168.100.26:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}
    
    function extraerAtaques(mascotaJugador) {
        let ataques
        for (let i = 0; i< mokepones.length; i++) {
            if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
          }
           
        }
        mostrarAtaques(ataques)
    }

    function mostrarAtaques(ataques) {
        ataques.forEach((ataque) => {
            ataquesMokepon = `
            <button id=${ataque.id} class="boton-de-ataque Bataque">${ataque.nombre}</button>
            `
            contenedorAtaques.innerHTML += ataquesMokepon
        })

        botonFuego = document.getElementById("boton-fuego")
        botonPuñoLimpio = document.getElementById("boton-puño-limpio")
        botonRayo = document.getElementById("boton-rayo")
        botonTelaraña = document.getElementById("boton-telaraña")
        botonBomba = document.getElementById("boton-bomba")
        botonKatana = document.getElementById("boton-Katana")
        botones = document.querySelectorAll(".Bataque")
    }

    function secuenciaAtaque() {
        botones.forEach ((boton) => {
            boton.addEventListener("click", (e) => {
                if (e.target.textContent === "🔥") {
                    ataqueJugador.push("FUEGO 🔥")
                    console.log(ataqueJugador)
                    boton.style.background ="#94B49F"
                    boton.disabled = true
                } else if (e.target.textContent === "🥊") {
                    ataqueJugador.push("PUÑO LIMPIO 🥊")
                    console.log(ataqueJugador)
                    boton.style.background = "#94B49F"
                    boton.disabled = true
                } else if (e.target.textContent === "⚡") {
                    ataqueJugador.push("RAYO ⚡")
                    console.log(ataqueJugador)
                    boton.style.background ="#94B49F"
                    boton.disabled = true
                } else if (e.target.textContent === "🕸") {
                    ataqueJugador.push("TELARAÑA 🕸")
                    console.log(ataqueJugador)
                    boton.style.background ="#94B49F"
                    boton.disabled = true
                } else if (e.target.textContent === "💣") {
                    ataqueJugador.push("BOMBA 💣")
                    console.log(ataqueJugador)
                    boton.style.background ="#94B49F"
                    boton.disabled = true
                } else {
                    ataqueJugador.push("KATANA ⚔")
                    console.log(ataqueJugador)
                    boton.style.background ="#94B49F"
                    boton.disabled = true
                }

                if (ataqueJugador.length === 5) {
                    enviarAtaques()
                }
            })
        })

    }

function enviarAtaques() {
    fetch(`http://192.168.100.26:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador  
        })  
    })

    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques() {
    fetch(`http://192.168.100.26:8080/mokepon/${enemigoId}/ataques`)
        .then(function (res) {
            if(res.ok) {
                res.json()
                    .then(function ({ ataques }) {
                        if (ataques.length === 5) {
                            ataqueEnemigo = ataques 
                            combate()
                        }
                    })
            }
        })
}


function seleccionarMascotaEnemigo(enemigo) { 
    //let mascotaAleatoria = aleatorio(0,mokepones.length -1)
    
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length -1)
    
    let ataque = ataquesMokeponEnemigo[ataqueAleatorio].nombre

    ataquesMokeponEnemigo.splice(ataqueAleatorio, 1)

    if (ataque == "🔥") {
        ataqueEnemigo.push("FUEGO 🔥")
    } else if (ataque == "🥊") {
        ataqueEnemigo.push("PUÑO LIMPIO 🥊")
    } else if (ataque == "⚡"){
        ataqueEnemigo.push("RAYO ⚡")
    } else if (ataque == "🕸"){
        ataqueEnemigo.push("TELARAÑA 🕸")
    } else if (ataque == "💣"){
        ataqueEnemigo.push("BOMBA 💣")
    } else {
        ataqueEnemigo.push("KATANA ⚔")
    }
    
    console.log(ataqueEnemigo)

    iniciarPelea()
}

function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combate()
    } 
}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
    clearInterval(intervalo)

    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index)
            crearMensaje("EMPATE 😴")
        } else if (ataqueJugador[index] === "FUEGO 🔥" && ataqueEnemigo[index] === "RAYO ⚡" || ataqueJugador[index] === "FUEGO 🔥" && ataqueEnemigo[index] === "TELARAÑA 🕸" || ataqueJugador[index] === "RAYO ⚡" && ataqueEnemigo[index] === "PUÑO LIMPIO 🥊" || ataqueJugador[index] === "RAYO ⚡" && ataqueEnemigo[index] === "KATANA ⚔" || ataqueJugador[index] === "PUÑO LIMPIO 🥊" && ataqueEnemigo[index] === "FUEGO 🔥" || ataqueJugador[index] === "PUÑO LIMPIO 🥊" && ataqueEnemigo[index] === "BOMBA 💣" || ataqueJugador[index] === "TELARAÑA 🕸" && ataqueEnemigo[index] === "PUÑO LIMPIO 🥊" || ataqueJugador[index] === "TELARAÑA 🕸" && ataqueEnemigo[index] === "BOMBA 💣" || ataqueJugador[index] === "BOMBA 💣" && ataqueEnemigo[index] === "RAYO ⚡" ||  ataqueJugador[index] === "BOMBA 💣" && ataqueEnemigo[index] === "KATANA ⚔" || ataqueJugador[index] === "KATANA ⚔" && ataqueEnemigo[index] === "FUEGO 🔥" || ataqueJugador[index] === "KATANA ⚔" && ataqueEnemigo[index] === "TELARAÑA 🕸") {
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE 🏆")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponentes(index, index)
            crearMensaje("PERDISTE 😢")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }

    revisarVictorias()
}

function revisarVictorias() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal("EMPATASTE 😴")
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("FELICITACIONES!! Ganaste 🎉")
    } else {
        crearMensajeFinal("LO SIENTO, PERDISTE 😢")
    }
}    

function  crearMensaje(resultado) {
   let nuevoAtaqueDelJugador = document.createElement("p")
   let nuevoAtaqueDelEnemigo = document.createElement("p")

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

   ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
   ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function  crearMensajeFinal(resultadoFinal) {  
    sectionMensajes.innerHTML = resultadoFinal
    
    sectionReiniciar.style.display = "block"
 }

function reiniciarJuego() {
    location.reload()
} 

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

function pintarCanvas() {
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(   
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon()

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

    mokeponesEnemigos.forEach(function (mokepon) {
        mokepon.pintarMokepon()
        revisarColision(mokepon)
    })
}

function enviarPosicion(x, y) {
    fetch(`http://192.168.100.26:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({
            x,
            y
        })
    })
     .then(function(res) {
        if (res.ok) {
            res.json()
                .then(function ({ enemigos }) {
                    console.log(enemigos)
                    mokeponesEnemigos = enemigos.map(function (enemigo) {   
                        let mokeponEnemigo = null
                        const mokeponNombre = enemigo.mokepon.nombre || ""
                        if(mokeponNombre === "DinoCheems") {
                            mokeponEnemigo = new Mokepon("DinoCheems", "./imagenes/dino-cheems.png", 5, enemigo.id)
                        } else if(mokeponNombre === "CheemsMalvado") {
                            mokeponEnemigo = new Mokepon("CheemsMalvado", "./imagenes/cheems malvado.png", 5, enemigo.id)
                        } else if(mokeponNombre === "CheemsPikachu") {
                            mokeponEnemigo = new Mokepon("CheemsPikachu", "./imagenes/cheems pikachu.png", 5, enemigo.id)
                        } else if(mokeponNombre === "CheemsSpider") {
                            mokeponEnemigo = new Mokepon("CheemsSpider", "./imagenes/cheemsAraña.png", 5, enemigo.id)
                        } else if(mokeponNombre === "CheemsJomker") {
                            mokeponEnemigo = new Mokepon("CheemsJomker", "./imagenes/cheemsJoker.png", 5, enemigo.id)
                        } else if(mokeponNombre === "SamuraiCheems") {
                            mokeponEnemigo = new Mokepon("SamuraiCheems", "./imagenes/cheemsSamurai.png", 5, enemigo.id)
                        }

                        mokeponEnemigo.x = enemigo.x    
                        mokeponEnemigo.y = enemigo.y

                        return mokeponEnemigo
                    })
                     
                })
        }
    })
}

function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
}

function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5
}

function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
}

function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5
}

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0 
}

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case "ArrowUp":
            moverArriba()
            break
        case "ArrowDown":
            moverAbajo()
            break
        case "ArrowRight":
            moverDerecha()
            break
        case "ArrowLeft":
            moverIzquierda()
            break     
        default:
            break
    }
}

function iniciarMapa() {
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)

    intervalo = setInterval(pintarCanvas, 50)
    window.addEventListener("keydown", sePresionoUnaTecla)
    window.addEventListener("keyup", detenerMovimiento)
}

function obtenerObjetoMascota() {
    for (let i = 0; i< mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
        return mokepones[i]
      }
       
    }
}

function revisarColision(enemigo) {
    if(enemigo.x == undefined || enemigo.y == undefined){
        return
    }

    const abajoEnemigo = enemigo.y + enemigo.alto -25
    const derechaEnemigo = enemigo.x + enemigo.ancho -25
    const izquierdaEnemigo = enemigo.x +25
    const arribaEnemigo = enemigo.y +25

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x

    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return
    }

    detenerMovimiento()
    clearInterval(intervalo)

    enemigoId = enemigo.id
    sectionseleccionarAtaque.style.display = "flex"
    sectionVerMapa.style.display = "none"
    seleccionarMascotaEnemigo(enemigo)

}

window.addEventListener("load", iniciarJuego)


