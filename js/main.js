const { Hechicera, Guardian, Troll, Brujo } = (function () {
    function ataqueEspecial(target, fn) {
        let contador = 0;

        return function (...args) {
            contador++;
            console.log(`${this.constructor.name} batalla numero : ${contador}`);
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
        constructor(puntosAtaque, escudo) {
            this.life = 1500;
            this.puntosAtaque = puntosAtaque;
            this.escudo = escudo
        }

        set setlife(posAtaque) {
            this.life = posAtaque;
            if (this.life <= 0) {
                console.log("El personaje a sido derrotado");
            }
        }

        recibirDaño(ataqueEnemigo) {
            let dañoReal = ataqueEnemigo - this.escudo;
            let daño = (dañoReal > 0) ? this.life - dañoReal : this.life;
            this.setlife = daño;
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
                this.setlife = this.life + 150;
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
            }
        }
    }

    Hechicera.prototype.activarHabilidad = ataqueEspecial(Hechicera.prototype, Hechicera.prototype.activarHabilidad)
    Guardian.prototype.activarHabilidad = ataqueEspecial(Guardian.prototype, Guardian.prototype.activarHabilidad)
    Troll.prototype.activarHabilidad = ataqueEspecial(Troll.prototype, Troll.prototype.activarHabilidad)
    Brujo.prototype.activarHabilidad = ataqueEspecial(Brujo.prototype, Brujo.prototype.activarHabilidad)

    return { Hechicera, Guardian, Troll, Brujo }
})();