'use strict';

function ready(){

    var appMonster = new Vue({
        el: '#app-monster',
        data: {
            showBar: false,
            special: false,
            display : [],
            result: '',
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
                },
                {
                    name: 'monster2',
                    line: 100,
                    statusGame: ''
                },
                {
                    name: 'monster3',
                    line: 100,
                    statusGame: ''
                },
                {
                    name: 'monster4',
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
                    this.result = '';
                }
            },
            attack: function(event,special){
                event.preventDefault();
                special = special === undefined ? false : true;


                var curRandom = 0;
                var c = 0;

                var display = [];
                for(var i = 0; i < this.health.length; i++){
                    var displayInfo = {};
                    if(special === true){
                        curRandom = this.getRandomArbitrary(10, 25);
                        this.health[i].line -= curRandom;
                    }
                    else{
                        curRandom = this.getRandomArbitrary(5, 10);
                        this.health[i].line -= curRandom;
                    }

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

                        if(c+1 === this.health.length){//если с=4 значит счетчик дошел до последнего элемента и все предыдущие равны 0, если и последний элемент равен нулю, то ничья
                            if(this.health[c].line <= 0){
                                for(var b = 0; b < this.health.length; b++){
                                    this.health[b].statusGame = '';
                                    this.health[b].statusGame += ' tie';
                                }
                            }
                        }
                        c++;
                    }

                    displayInfo.hurt = curRandom;
                    displayInfo.name = this.health[i].name;


                    display.push(displayInfo);
                }
                this.display = display;
                this.info();
            },
            heal: function() {

            },
            info: function() {
                if(this.display.length != 0){
                    this.result = '';
                    for(var i = 0; i < this.display.length; i++){
                        this.result += '<span style="background-color: '+this.getRandomColor()+'">Name: '+this.display[i].name+'<br/>Hurt: '+this.display[i].hurt+'</span>';
                    }
                }
            },
            getRandomColor: function() {
                var letters = '0123456789ABCDEF';
                var color = '#';
                for (var i = 0; i < 6; i++ ) {
                    color += letters[Math.floor(Math.random() * 16)];
                }
                return color;
            }
        }
    });


}

document.addEventListener("DOMContentLoaded", ready);