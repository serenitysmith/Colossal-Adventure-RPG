const readlineSync = require("readline-sync");
//greeting
let userName = readlineSync.question(
  " Once upon a time you were walking through a dark forest and stumbled upon a grand kingdom called Westeros " +
    " An elf appeard named Tyrion and asked, what is your name, my lady? "
);
//enemy object
let enemies = [
  {
    name: " The Night King ",
    hp: 100,
    item: "Heartsbane",
  },
  {
    name: " Cersei Lanister ",
    hp: 100,
    item: " Lanisters gold ",
  },
  {
    name: " Joffery Baratheon ",
    hp: 100,
    item: " Drogon's egg ",
  },
];
//player object
let player = {
  name: userName,
  // inventory array that has item pushed into it if player wins
  inventory: [],
  hp: 100,
  isEnemyPresent: false,
  stats() {
    console.log(
      this.name +
        " your inventory is " +
        this.inventory +
        " and your hp is " +
        this.hp
    );
  },
};
while (player.hp >= 0) {
  // calling the get enemey function that returns random enemy
  let opponent = getEnemy();

  const walking = readlineSync.question(
    " Welcome to our kingdom, we are in a terrible war, please enter W to walk with me to safety "
  );
  // wallking function
  let playerAlive = true;
  console.log(walking);
  // if walking a random number is given
  if (walking === "w") {
    let rand = Math.floor(Math.random() * 4);
    console.log(rand);
    // if random number is 2 or more player is attacked
    if (rand >= 2) {
      let runOrAttack = readlineSync.question(
        " Oh no! An enemy has attacked us, do you want to attack the enemy or run? Enter R to run or A to attack "
      );
      if (runOrAttack === "a") {
        //while loop that continues games while player and opponent are alive player attacks the opponet back and forth until one dies
        while (opponent.hp >= 0 && player.hp >= 0) {
          attack(player, opponent);
          attack(opponent, player);
        }
        // what happens when player dies
        if (player.hp <= 0) {
          playerAlive = false;
          console.log(
            player.name +
              opponent.name +
              " Has bansihed you to a life beyond the wall " +
              " Game Over!!!!!! "
          );
          // what happpens when opponent dies
        } else if (opponent.hp <= 0) {
          console.log(player.name + " You won!!! Here is " + opponent.item);
          let hpDifference = 100 - player.hp;
          player.inventory.push(opponent.item);
          player.hp += hpDifference;
          console.log(
            `you have been given ${hpDifference} hp and your health is back to 100`
          );
          // prints stats
          let showStats = readlineSync.question("press p to show stats");
          if (showStats === "p") {
            player.stats();
          }
          // calling the numLessThan function in case number is less than 2
          numLessThan();
        }
      }
      // gives runner 50% chance of getting away
      if (runOrAttack === "r") {
        const gotAway = Math.random() < 0.5;
        if (gotAway) {
          console.log("You got away!");
        } else {
          console.log(player.name + " has lost " + running() + " hp  ");
        }
      }
    } else {
      if (rand < 2) {
        numLessThan();
      }
    }
  }
  // function that tells player what to do if number is less than 2 and called in above statemets
  function numLessThan() {
    let walking = readlineSync.question(
      " please enter W to continue walking with me to safety "
    );
    if (walking === "w") {
      let rando = Math.floor(Math.random() * 4);
      console.log(rando);
      if (rando >= 2) {
        let runOrAttack = readlineSync.question(
          " Oh no! We have been attacked!! Do you want to attack or run?, Enter R to run or A to attack "
        );
        let opponent = getEnemy();
        if (runOrAttack === "a") {
          while (opponent.hp >= 0 && player.hp >= 0) {
            attack(player, opponent);
            attack(opponent, player);
          }
          if (player.hp <= 0) {
            console.log(
              player.name +
                opponent.name +
                " Has bansihed you to a life beyond the wall " +
                " Game Over!!!!!! "
            );
          } else if (opponent.hp <= 0) {
            console.log(player.name + " You won!!! here is " + opponent.item);
            let hpDifference = 100 - player.hp;
            player.hp += hpDifference;
            console.log(
              `you have been given ${hpDifference} hp and your health is back to 100`
            );
            let showStats = readlineSync.question("press p to show stats");
            if (showStats === "p") {
              player.stats();
            }
            numLessThan();
          }
        }
        if (runOrAttack === "r") {
          const gotAway = Math.random() < 0.5;
          if (gotAway) {
            console.log("You got away!");
          } else {
            console.log(player.name + " has lost " + running() + " hp ");
          }
        }
      } else {
        numLessThan();
      }
    } else {
      numLessThan();
    }
  }
  // returns random enemy
  function getEnemy() {
    return enemies[Math.floor(Math.random() * enemies.length)];
  }
  // deals  a min-max amount of damage to person being attacked
  function attack(attacker, victim) {
    let min = 5,
      max = 20;
    console.log(attacker.name + " has attacked " + victim.name);
    //
    let damage = Math.floor(Math.random() * (max - min + 1) + min);
    victim.hp -= damage;
    console.log(victim.name + " has lost " + damage + " hp");
  }
  // deals a min-max amount of damge when running if needed by the 50% chance operator
  function running() {
    let min = 5,
      max = 20;
    let damage = Math.floor(Math.random() * (max - min + 1) + min);
    return damage;
  }
}
