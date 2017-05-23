'use strict';

function ready(){

    var appMonster = new Vue({
        el: '#app-monster',
        data: {
            showBar: false,
            health: [
                {
                    name: 'you',
                    line: 100,
                    statusGame: ''
                },
                {
                    name: 'monster',
                    line: 100,
                    statusGame: ''
                }
            ]
        },
        methods: {
            getRandomArbitrary: function (min, max) {
                return Math.floor(Math.random() * (max - min)) + min;
            },
            startGame: function() {
                this.showBar = !this.showBar;
                for(var i = 0; i < this.health.length; i++){
                    this.health[i].line = 100;
                    this.health[i].statusGame = '';
                }
            },
            attack: function(event){
                event.preventDefault();
                var curRandom = this.getRandomArbitrary(5, 15);
                var c = 0;
                for(var i = 0; i < this.health.length; i++){
                    this.health[i].line -= this.getRandomArbitrary(5, 15);
                    /*this.health[i].line = this.health[i].line <= 0 ? 0 : this.health[i].line;
                     return this.health[i].name += ' - lose';*/
                    if(this.health[i].line <= 0){
                        this.health[i].line = 0;
                        this.showBar = false;
                        this.health[i].statusGame = '';
                        this.health[i].statusGame += ' lose';

                        for(var j = 0; j < this.health.length; j++){
                            if(this.health[j].line > 0){
                                this.health[j].statusGame = '';
                                this.health[j].statusGame += ' win';
                            }
                        }
                        console.log(c);
                        if(c+1 === this.health.length){
                            if(this.health[c].line <= 0){
                                for(var b = 0; b < this.health.length; b++){
                                    this.health[b].statusGame = '';
                                    this.health[b].statusGame += ' tie';
                                }
                            }
                        }
                        c++;
                    }
                }
            }
        }
    });


}

document.addEventListener("DOMContentLoaded", ready);