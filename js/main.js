(function () {
        function ataqueEspecial(target, propertyKey, descriptor){
            let contador = 0;
            const fnOriginal = descriptor.value;

            descriptor.value = function (...args){
                contador++;
                console.log(`${this.constructor.name} batalla numero : ${contador}`);
                return fnOriginal.call(this, contador);
            };

            return descriptor;
        }

    class personajes {
        constructor(puntosAtaque, escudo) {
            this.life = 1500;
            this.puntosAtaque = puntosAtaque;
            this.escudo = escudo
        }

        set setlife(posAtaque) {
            this.life = posAtaque;
            if(this.life <= 0){
                console.log("El personaje a sido derrotado");
            }
        }

        recibirDaño(ataqueEnemigo){
            let dañoReal = ataqueEnemigo - escudo;
            let daño = (dañoReal > 0) ? this.life - dañoReal : this.life;
            this.setlife = daño;
        }
    }

    class hechicera extends personajes {
        constructor(puntosAtaque = 350, escudo = 175) {
            super(puntosAtaque, escudo)
            this.descripcion = `Hechicera: esta hermosa joven del bosque cuenta con un poder de ataque de ${this.puntosAtaque} y es capaz de generar un campo de proteccion de ${this.escudo} puntos de fuerza. Su escudo la mantiene protegida durante toda la batalla y cada tres ataques realizados se regenera 150 puntos de vida.`
        }

        @ataqueEspecial
        atacar(nBatalla){
            if(nBatalla % 3 === 0){
                this.setlife = this.life + 150;
            }
        }
    }

    class guardian extends personajes {
        constructor(puntosAtaque = 450, escudo = 200) {
            super(puntosAtaque, escudo)
            this.descripcion = `Guardian: fuerte, valiente y perseverante aunque no muy resistente. Cuenta con un ataque de ${this.puntosAtaque} puntos pero a medida que avanza la batalla va perdiendo 15 puntos de fuerza.`
        }

        @ataqueEspecial
        atacar(){
            this.puntosAtaque = Math.max(0, this.puntosAtaque - 15);
        }
    }

    class troll extends personajes {
        constructor(puntosAtaque = 200, escudo = 400) {
            super(puntosAtaque, escudo)
            this.descripcion = `Troll: su cuerpo rocoso le brinda una proteccion de ${this.escudo} puntos y es capaz de resistir 5 batallas casi sin ningun rasguño. A pesar de su apariencia ruda su ataque es de ${this.puntosAtaque}.`
        }

        @ataqueEspecial
        atacar(nBatalla){
            if(nBatalla % 5 === 0){
                this.escudo = 0;
            }
        }
    }

    class brujo extends personajes {
        constructor(puntosAtaque = 250, escudo = 200) {
            super(puntosAtaque, escudo)
            this.descripcion = `Brujo: tantos años en el bosque lo debilitaron bastante pero le dieron la experiencia necesaria para conjurar hechizos de fuerza. Cuenta con un poder de ataque de ${this.puntosAtaque} puntos y cada tres batallas lanza un hechizo el triple de fuerte, su conjuro de proteccion es de ${this.escudo} puntos.`
        }

        @ataqueEspecial
        atacar(nBatalla){
            let punAtaque = this.puntosAtaque;
            if(nBatalla % 3 === 0){
                this.puntosAtaque *= 3;
            }
            this.puntosAtaque =  punAtaque;
        }
    }

    return {}
})();