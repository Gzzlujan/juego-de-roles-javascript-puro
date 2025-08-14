const Personajes = (function () {
    function ataqueEspecial(target, fn) {
        let contador = 0;

        return function (...args) {
            contador++;
            console.log('************************');
            console.log(`Batalla numero : ${contador}`);
            return fn.call(this, contador);
        };
    }

    function atacarDecorador(target, fn) {
        return function (...args) {
            const enemigo = args[0];
            console.log(`${this.constructor.name} ha atacado a ${enemigo.constructor.name}`);
            return fn.apply(this, args);
        }
    }

    class Personajes {
        #life = 1500;
        #puntosAtaque;
        #escudo;
        constructor(puntosAtaque, escudo) {
            this.#puntosAtaque = puntosAtaque;
            this.#escudo = escudo
        }

        get life() { return this.#life };
        set life(posAtaque) {
            this.#life = posAtaque;
            if (this.#life <= 0) {
                console.log("El personaje a sido derrotado");
            }
        }

        get escudo() { return this.#escudo };
        set escudo(nuevoEscudo) { this.#escudo = nuevoEscudo };

        get puntosAtaque() { return this.#puntosAtaque };
        set puntosAtaque(nuevoAtaque) { this.#puntosAtaque = nuevoAtaque };

        recibirDaño(ataqueEnemigo) {
            let dañoReal = ataqueEnemigo - this.escudo;
            let daño = (dañoReal > 0) ? this.life - dañoReal : this.life;
            this.life = daño;
            console.log(`${this.constructor.name} ha recibido ${dañoReal} puntos de daño, vida restante: ${this.life}`);
        }

        atacar(enemigo) {
            enemigo.recibirDaño(this.puntosAtaque);
        }
    }

    Personajes.prototype.atacar = atacarDecorador(Personajes.prototype, Personajes.prototype.atacar);

    class Hechicera extends Personajes {
        constructor(puntosAtaque = 350, escudo = 175) {
            super(puntosAtaque, escudo)
            this.descripcion = `Hechicera: esta hermosa joven del bosque cuenta con un poder de ataque de ${this.puntosAtaque} y es capaz de generar un campo de proteccion de ${this.escudo} puntos de fuerza. Su escudo la mantiene protegida durante toda la batalla y cada tres ataques realizados se regenera 150 puntos de vida.`
        }

        activarHabilidad(nBatalla) {
            if (nBatalla % 3 === 0) {
                this.life = this.life + 150;
                console.log(`${this.constructor.name} ha regenerado 150 puntos de vida, su vida actual es de ${this.life}`);
            }
        }
    }

    class Guardian extends Personajes {
        constructor(puntosAtaque = 450, escudo = 200) {
            super(puntosAtaque, escudo)
            this.descripcion = `Guardian: fuerte, valiente y perseverante aunque no muy resistente. Cuenta con un ataque de ${this.puntosAtaque} puntos pero a medida que avanza la batalla va perdiendo 15 puntos de fuerza.`
        }

        activarHabilidad(nBatalla) {
            this.puntosAtaque = Math.max(0, this.puntosAtaque - 15);
            console.log(`${this.constructor.name} ha perdido 15 puntos de ataque, su ataque actual es de ${this.puntosAtaque}`);
        }
    }

    class Troll extends Personajes {
        constructor(puntosAtaque = 200, escudo = 400) {
            super(puntosAtaque, escudo)
            this.descripcion = `Troll: su cuerpo rocoso le brinda una proteccion de ${this.escudo} puntos y es capaz de resistir 5 batallas casi sin ningun rasguño. A pesar de su apariencia ruda su ataque es de ${this.puntosAtaque}.`
        }

        activarHabilidad(nBatalla) {
            if (nBatalla % 5 === 0) {
                this.escudo = 0;
                console.log(`${this.constructor.name} ha perdido su escudo`);
            }
        }
    }

    class Brujo extends Personajes {
        constructor(puntosAtaque = 250, escudo = 200) {
            super(puntosAtaque, escudo)
            this.descripcion = `Brujo: tantos años en el bosque lo debilitaron bastante pero le dieron la experiencia necesaria para conjurar hechizos de fuerza. Cuenta con un poder de ataque de ${this.puntosAtaque} puntos y cada tres batallas lanza un hechizo el triple de fuerte, su conjuro de proteccion es de ${this.escudo} puntos.`
        }

        activarHabilidad(nBatalla) {
            let punAtaque = this.puntosAtaque;
            if (nBatalla % 3 === 0) {
                this.puntosAtaque *= 3;
                console.log(`${this.constructor.name} ha activado su hechizo, su ataque es de ${this.puntosAtaque}`);
            }
        }
    }

    Hechicera.prototype.activarHabilidad = ataqueEspecial(Hechicera.prototype, Hechicera.prototype.activarHabilidad)
    Guardian.prototype.activarHabilidad = ataqueEspecial(Guardian.prototype, Guardian.prototype.activarHabilidad)
    Troll.prototype.activarHabilidad = ataqueEspecial(Troll.prototype, Troll.prototype.activarHabilidad)
    Brujo.prototype.activarHabilidad = ataqueEspecial(Brujo.prototype, Brujo.prototype.activarHabilidad)

    return { Hechicera, Guardian, Troll, Brujo }
})();


const batalla = (function () {
    const personajesValidos = Personajes;

    let personaje1 = null;
    let personaje2 = null;

    do {
        personaje1 = prompt("Escribe el nombre del personaje para jugar: Hechicera, Guardian, Troll, Brujo")
        personaje2 = prompt("Escribe el nombre del personaje para jugar: Hechicera, Guardian, Troll, Brujo")
    } while (personaje1 === null || personaje2 === null)

    const jugador1 = new personajesValidos[personaje1]();
    const jugador2 = new personajesValidos[personaje2]();

    confirm('Bienvenido a la batalla, es hora de comenzar!!')
    let dado = Math.floor(Math.random() * 10);
    let j1, j2;
   
    if (dado % 2 == 0) {
        j1 = jugador1;
        j2 = jugador2;
        console.log(`${j1.constructor.name} ataca primero`)
    } else {
        j1 = jugador2;
        j2 = jugador1;
        console.log(`${j1.constructor.name} ataca primero`)
    }
    console.log('************************')

    while (j1.life > 0 && j2.life > 0) {
        j1.activarHabilidad();
        j1.atacar(j2);
        if (j2.life <= 0) break;
        j2.activarHabilidad();
        j2.atacar(j1);
    }
    confirm('La batalla ha terminado');
})();
