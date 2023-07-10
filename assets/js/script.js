var monsters = [
    {
        monName: "Goblin",
        attackDmg: 12,
        hp: 30,
        maxHp: 30,
        def: 2, 
        img: $("#goblin-image"),
        attackMsg: "Goblin swings its sword",
        dropExpMax: 20,
        dropExpMin: 5,
        calDmg: function(){
            var dmg = this.attackDmg + Math.floor(Math.random() * 9) + calCrit(this.attackDmg);
            console.log("damage from mon: " + dmg);
            return dmg;
        },
        calDropExp: function(){
            var exp = Math.floor(Math.random() * (this.dropExpMax - this.dropExpMin + 1)) + this.dropExpMin;
            return exp;
        },
    },
    {
        monName: "Orc",
        attackDmg: 25,
        hp: 70,
        maxHp: 70,
        def: 6,
        img: $("#orc-image"),
        attackMsg: "Orc swings its club",
        dropExpMax: 30,
        dropExpMin: 15,
        calDmg: function(){
            var dmg = this.attackDmg + Math.floor(Math.random() * 10) + calCrit(this.attackDmg);
            console.log("damage from mon: " + dmg);
            return dmg;
        },
        calDropExp: function(){
            var exp = Math.floor(Math.random() * (this.dropExpMax - this.dropExpMin + 1)) + this.dropExpMin
            return exp;
        },
    },
    {
        monName: "Mutant Spider",
        attackDmg: 45,
        hp: 40,
        maxHp: 40,
        def: 1,
        img: $("#spider-image"),
        attackMsg: "Spider jumped onto you!",
        dropExpMax: 30,
        dropExpMin: 15,
        calDmg: function(){
            var dmg = this.attackDmg + Math.floor(Math.random() * 10) + calCrit(this.attackDmg);
            console.log("damage from mon: " + dmg);
            return dmg;
        },
        calDropExp: function(){
            var exp = Math.floor(Math.random() * (this.dropExpMax - this.dropExpMin + 1)) + this.dropExpMin
            return exp;
        },

    },
    {
        monName: "Wyvern",
        attackDmg: 40,
        hp: 200,
        maxHp: 200,
        def: 20,
        img: $("#wyvern-image"),
        attackMsg: "Wyvern decends from the above",
        dropExpMax: 90,
        dropExpMin: 35,
        calDmg: function(){
            var dmg = this.attackDmg + Math.floor(Math.random() * 15) + calCrit(this.attackDmg);
            console.log("damage from mon: " + dmg);
            return dmg;
        },
        calDropExp: function(){
            var exp = Math.floor(Math.random() * (this.dropExpMax - this.dropExpMin + 1)) + this.dropExpMin;
            return exp;
        },
    },
    {
        monName: "Dragon",
        attackDmg: 65,
        hp: 500,
        maxHp: 500,
        def: 40,
        img: $("#dragon-image"),
        attackMsg: "Dragon attacks with its claw",
        dropExpMax: 100,
        dropExpMin: 60,
        calDmg: function(){
            var dmg = this.attackDmg + Math.floor(Math.random() * 20) + calCrit(this.attackDmg);
            console.log("damage from mon: " + dmg);
            return dmg;
        },
        calDropExp: function(){
            var exp = Math.floor(Math.random() * (this.dropExpMax - this.dropExpMin + 1)) + this.dropExpMin;
            return exp;
        },
    }, 
];

var player = {
    plName: "You",
    attackDmg: 0,
    lv: {
        current: 1,
        currentExp: 0,
        expNeeded: 50,
    },
    weapon: {
        weapName: ["Sword", "Wood Stick", "Axe", "Fist"],
        weapDmg: [30, 12, 25, 8],
        numUpgrades: 0,
        weapAcquired: ["You obtained a Sword!! A weapon for a man", "You obtained a Wood Stick... you can be creative i guess..", 
        "You obtained an Axe! Watch out for its sharp side!", "You obtained a Fist! Did you just learn how to make fist?"],
        attackMsg: ["You swing your sword with your full strength!", "You swing your... wood stick... better than nothing", "You smash your enemy with your axe!", "You hit your opponent with your fist!"]
    },
    maxHp: 100,
    hp: 100,
    def: 10,
    img: $("#player-image"),
    calDmg: function(){
        var dmg = this.attackDmg + Math.floor(Math.random() * 10) + calCrit(this.attackDmg);
        console.log("damage from player: " + dmg);
        return dmg;
    },
}

var playerCurrentWeapon = 0;
var startingPoint = $("#starting-point")
var chestCl = $("#chest")
var chestOp = $("#chest-opened")
var textBox = $("#textBox")
var goBtn = $("#go")
var plStatus = $("#player-status")
var attackStatus = $("#attack-status")
var eventStatus = $("#event-status")
var attackBtn = $("<button>");
var healBtn = $("<button>");
attackBtn.text("Attack");
healBtn.text("Heal")
textBox.append(attackBtn);
textBox.append(healBtn);
var moveBtn = $("<button>");
moveBtn.text("Move");
textBox.append(moveBtn);
moveBtn.css("display", "none")
var critMsg = $("#critical");
var monsterContainer = $("#monster-container")
var upgradeWeaponBtn = $("<button>")
upgradeWeaponBtn.text("Upgrade Weapon")
var healNext = $("<button>");
healNext.text("Heal");
textBox.append(healNext);
var currentMon = 0;
var playerAttackEffect = $('#attack-effect');
var hpBar = $('#health-bar');
var healEffect = $('#healing');

var moveNextBtn = $("<button>")
moveNextBtn.text("Move");
moveNextBtn.css("display", "none");
textBox.append(moveNextBtn);

function startGame(){
    // triggered when the user clicked on the closed chest (event listener)
    playerCurrentWeapon = Math.floor(Math.random() * 4);
    // displays textbox, player image
    player.img.css("display", "none")
    player.img.css("display", "block")
    textBox.css("display", "block")
    chestCl.css("display", "none")
    chestOp.css("display", "block")
    hpBar.attr("value", player.hp);
    hpBar.attr("max", player.maxHp);
    // lets the player know which weapon they optained from the chest
    alert(player.weapon.weapAcquired[playerCurrentWeapon]);
    player.attackDmg = player.weapon.weapDmg[playerCurrentWeapon];
    // replaces h1 in starting point to "You step forward..."
    startingPoint.children("h1").text("You step forward...")
    // changes the box image to opened one
    // shows button that says "Go"
    goBtn.css("display", "block")
    // add eventlistener to that button 
    goBtn.on("click", function(){
        startingPoint.css("display", "none");
        encounter();
    });
}

function nextStage(whichMon){
    attackBtn.css("display", "none")
    healBtn.css("display", "none")
    critMsg.css("display", "none")
    
    // triggered either when the user clicked "Move" button that displays after defeating monster
    // makes unnecessary messages display to none
    monsters[whichMon].img.css("display", "none");
    eventStatus.text("You found a campfire...");
    attackStatus.text("What would you do?");
    moveBtn.css("display", "none");
    healNext.css("display", "inline");
    textBox.append(upgradeWeaponBtn);
    upgradeWeaponBtn.css("display", "inline")

    
    
    // player can either upgrade their weapon, or heal their hp
    // triggers encounter function after player chooses to upgrade or heal
}

function encounter(){
    upgradeWeaponBtn.css("display", "none");
    healNext.css("display", "none");
    for(var i = 0; i < monsters.length; i++){
        monsters[i].img.css("display", "none")
        monsters[i].hp = monsters[i].maxHp;
    }
    // triggered when the player upgrade or heal their hp after each battle or when the user clicked go btn from the start
    // variable for randomly selecting one of the monsters (except for dragon, dragon comes after player reaches level 5)
    attackStatus.text("");
    currentMon = 0;
    if(player.lv.current > 5){
        currentMon = Math.floor(Math.random() * monsters.length);
    } else if(player.lv.current >= 3){
        currentMon = Math.floor(Math.random() * (monsters.length - 2)) + 1;
    } else {
        currentMon = Math.floor(Math.random() * (monsters.length - 2));

    }
    console.log(currentMon)
    monsters[currentMon].img.css("display", "block");
    // displays encounter message in text box
    eventStatus.text(monsters[currentMon].monName + " has appeared!")
    eventStatus.css("display", "block");

    battle(currentMon);
    // puts in infinite loop until either player or monster's hp becomes 0
    
    // on player's turn, they are given with 2 options
        // heal, or attack
        // when they choose heal, they heal between 0 and half of their max hp (players resulting hp should not exceed player's max hp)
    // after player's trun, monster attacks

    // when the loop gets broken it determines the player's hp
        // if player hp is greater than 0
            // displays Move button and winning message
            // adds drop exp to their current exp, level them up if it exceeds exp needed
        // and ends game when player hp is less than 0
    // 
}

function battle(whichMon){
        console.log("battle function called!");
        if(monsters[whichMon].hp <= 0 || player.hp <= 0){
            afterBattle(whichMon);
            return;
        }
        else{
            moveBtn.css("display", "none")
            attackBtn.css("display", "inline");
            healBtn.css("display", "inline");
            
            

        }
}

function afterBattle(whichMon){
    eventStatus.text("");
    if(player.hp <= 0){
        eventStatus.text("You are losing your strength... You start to fade...");
        setTimeout(function(){
            var doContinue = confirm("Unfortunately, you have died. But your journey is far from over! Would you like to start over?")
            if(doContinue){
                window.location.reload();
            }
        },1800)
    } else {
        eventStatus.text("You defeated " + monsters[whichMon].monName + "!!!");
        var expGained = monsters[whichMon].calDropExp();
        player.lv.currentExp += expGained;
        console.log("gained exp from mon: " + expGained);
        console.log("Exp after gaining exp: " + player.lv.currentExp)
        attackStatus.text("You gained " + expGained + "EXP!");
        if(player.lv.currentExp >= player.lv.expNeeded){
            levelUp();
        }
        moveNextBtn.css("display", "inline");
        
    }
}

function calCrit(baseDmg){
    critMsg.css("display", "none");
    // triggered every time when monster or player needs to calculate damage
    // chances of critical is less than 10%
    var chances = Math.floor(Math.random() * 100);
    
    var returnDmg = 0;
    if(chances <= 10){
        console.log("crit")
        critMsg.css("display", "block");
        returnDmg = Math.floor(baseDmg/2);
    }
    
    return returnDmg;
    
    // set data attribute of #colored-text (data-critical) to "critical" when it's added
    // returns additional damage (half of baseDmg) and it will be added when they calculate damage
        // makes sure that half of baseDmg is parsed into integer

}

function monTurn(whichMon){
    console.log("monster turn function called")
    // triggered when the player turn is over
    console.log("Monster HP: " + monsters[whichMon].hp)
    console.log("current monster: " + monsters[whichMon].monName);
    if(monsters[whichMon].hp <= 0){
        afterBattle(whichMon);
        return;
    }
    var dmg = monsters[whichMon].calDmg() - player.def;
    monsterContainer.css("animation-name", "monster-attack");
    setTimeout(function(){
        monsterContainer.css("animation-name", "none");

    }, 1000)
    if(dmg <= 0){
        dmg = 0;
        var mess = $("<p>");
        mess.text("The enemy's attack can barely hurt you!!")
        mess.attr("id", "temp");
        textBox.append(mess);
        setTimeout(function(){
            textBox.children("#temp").remove();
        }, 1200)
    }
    // calculate its damage and take it away from the player's hp
    player.hp -= dmg;
    // displays attack message
        // if the critical data attribute is equal to "critical" then the text CRITICAL HIT is also displayed with red text (span id)
        // changes player's status text hp
        eventStatus.text(monsters[whichMon].attackMsg)
        attackStatus.text(dmg + " damage dealt to " + player.plName);
        hpBar.attr("value", player.hp);
        if(player.hp <= 0){
            console.log("player 0")
            player.hp = 0;
            plStatus.html("HP: " + player.hp + "<br>Lv: " + player.lv.current);
            afterBattle(whichMon);
            return;
        }
        plStatus.html("HP: " + player.hp + "<br>Lv: " + player.lv.current);
        battle(whichMon);
}

function playerAttack(whichMon){
    console.log("player attack function called")
    // triggered when the player chooses to attack during their turn
    moveBtn.css('display', "none")
    player.img.css("animation-name", "player-attack");
    setTimeout(function(){
        player.img.css("animation-name", "none");
        
    }, 1000)
    healBtn.css("display", "none")
    attackBtn.css("display", "none");
    playerAttackEffect.css("display", "block");
    setTimeout(function(){
        playerAttackEffect.css("display", "none")

    }, 490)
    

    // calculate damage from player and subtract it from the monster's hp
    var dmg = player.calDmg() - monsters[whichMon].def;
    if(dmg <= 0){
        dmg = 0;
        var mess = $("<p>");
        mess.text("The enemy's defence is too tight!!")
        mess.attr("id", "temp");
        textBox.append(mess);
        setTimeout(function(){
            textBox.children("#temp").remove();
        }, 1200)
    }
    monsters[whichMon].hp -= dmg;
    // diaplays attack message
    // if the critical data attribute is equal to "critical" then the text CRITICAL HIT is also displayed with red text (span id)
    eventStatus.text(player.weapon.attackMsg[playerCurrentWeapon]);
    attackStatus.text(dmg + " damage dealt to " + monsters[whichMon].monName);
    if(monsters[whichMon].hp <= 0){
        afterBattle(whichMon);
        return;
    } else{
        setTimeout(function(){
            monTurn(whichMon);
        }, 1300)
    }
}

function playerHeal(whichMon){
    // triggered either when the player chooses to heal during their turn or when they choose to heal during the stage break
    critMsg.css("display", "none");
    healBtn.css("display", "none");
    attackBtn.css("display", "none");
    // calculates random value between 0 and player's max hp / 2
    var maxHeal = Math.floor(player.maxHp / 2)
    var healAmnt = Math.floor(Math.random() * (maxHeal + 1));
    player.hp += healAmnt;
    if(player.hp >= player.maxHp){
        player.hp = player.maxHp;
    }
    if(healAmnt == 0){
        eventStatus.text("OOps you finger slipped")
    }
    
    // displays heal message
    eventStatus.text("Goddess grants you healing...")
    attackStatus.text(healAmnt + " was healed! (does not heal over your max hp)");
    // if the healed hp exceeds player's max hp, drop the left over hp
        // changes player's status text hp
    plStatus.html("HP: " + player.hp + "<br>Lv: " + player.lv.current);
    hpBar.attr("value", player.hp);
    showHeal(1300)
    
    setTimeout(function(){
        monTurn(whichMon);
    }, 1300)
}

function levelUp(){
    // triggered when the player's exp exceeds the exp needed
    // subtracts exp needed from player's current exp
    player.lv.currentExp = 0;
    // increment lv by 1
    player.lv.current++;
    // increases player's attack dmg scaling wiht lv * 3
    player.attackDmg += player.lv.current * 3;
    // increases player's defence with lv * 2
    player.def += player.lv.current * 2;

    player.maxHp += player.lv.current * 10;
    
    // increases exp needed by *= 1.5
    if(player.lv.current < 3){
        player.lv.expNeeded += 10;
    } else {
        player.lv.expNeeded += Math.floor(player.lv.expNeeded * 1.5);
        for(var i = 0; i < monsters.length; i++){
            monsters[i].maxHp += player.lv.current * 8;
        }

    }

    console.log("Plyaer current exp : " + player.lv.currentExp)
    console.log("Player current needed exp: " + player.lv.expNeeded)
    // changes player's status text lv
    var mess = $("<p>");
    mess.text("LEVEL UP!!")
    mess.attr("id", "temp");
    textBox.children().eq(1).after(mess)
    mess.css("font-size", "120%")
    setTimeout(function(){
        textBox.children("#temp").remove();
    }, 2000);
    hpBar.attr("max", player.maxHp);
    plStatus.html("HP: " + player.hp + "<br>Lv: " + player.lv.current);
}

function upgradeWeapon(){
    var upgradesNum = player.weapon.numUpgrades;
    var extraDmg;
    if(player.attackDmg >= 60){
        extraDmg = Math.floor(Math.random() * ((player.attackDmg/4) - 10 + 1)) + 10  
    } else {
        extraDmg = Math.floor(Math.random() * 20) + 1;
    }

    var chanceUpg = Math.floor(Math.random() * 100);
    var failureMult = (upgradesNum * 3) + (player.lv.current * 2);
    if(failureMult >= 70){
        failureMult = 69;
    }

    if(upgradesNum < 2 || chanceUpg > (30 + failureMult)){
        player.attackDmg += extraDmg;
        eventStatus.text(player.weapon.weapName[playerCurrentWeapon] + " has been upgraded!");
        attackStatus.text(extraDmg + " damage increase!");
        player.weapon.numUpgrades++;
    }
    else if(chanceUpg <= (8 + failureMult)){
        player.attackDmg -= Math.floor(player.attackDmg/2);
        upgradesNum--;
        eventStatus.text("You burned your weapon!!");
        attackStatus.text("You lost half of your damage!")
    } else if (chanceUpg <= (30 + failureMult)){
        player.attackDmg -= 10;
        eventStatus.text("Upgrade failed...");
        attackStatus.text("You lost 10 damage!");
    }

    moveBtn.css("display", "inline")
    
}

function nextStageHeal(){
    healNext.css("display", "none");
    var maxHeal = Math.floor(player.maxHp / 2)
    var healAmnt = Math.floor(Math.random() * (maxHeal - 20 + 1)) + 20;
    player.hp += healAmnt;
    if(player.hp >= player.maxHp){
        player.hp = player.maxHp;
    }
    attackStatus.text(healAmnt + " was healed! (does not heal over your max hp)")
    hpBar.attr("value", player.hp);
    plStatus.html("HP: " + player.hp + "<br>Lv: " + player.lv.current);
    moveBtn.css("display", "inline")

}

function showHeal(time){
    healEffect.css("display", "block")
    setTimeout(function(){
        healEffect.css("display", "none");
    }, time)
}
chestCl.on("click", startGame);
attackBtn.on("click", function(){
    attackBtn.css("display", "none");
    healBtn.css("display", "none");
    playerAttack(currentMon);
    
});

healNext.on("click", function(){
    upgradeWeaponBtn.css("display", "none");
    healNext.css("display", "none");
    nextStageHeal();
    
})
upgradeWeaponBtn.on("click", function(){
    upgradeWeaponBtn.css("display", "none");
    healNext.css("display", "none");
    upgradeWeapon();

})
healBtn.on("click", function(){
    attackBtn.css("display", "none");
    healBtn.css("display", "none");
    playerHeal(currentMon);
   
});
moveBtn.on("click", function(){
    moveBtn.css("display", "none")
    encounter();
})

moveNextBtn.on("click", function(){
    eventStatus.text("");
    attackStatus.text("");
    moveNextBtn.css("display", "none");
    nextStage(currentMon);
})