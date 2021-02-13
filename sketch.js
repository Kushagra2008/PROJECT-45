// DECLARING THE GLOBAL VARIABLES
var sprite, backgroundImage;
var wallGroup;
var wizardImage1, wizardImage2, wizardImage3, hat;
var boyImage;
var card;
var tick;
var wizard1;
var wizardCard, spriteCard;
var scrollImage;
var animationGameState = 0;
let riddle
var gotRiddle = false;
var monkey;
var monkeyImage;
var pirateImage;
var monkeyImage1;
var abstract;
var grid;
var illusion;
var cardIllusion;
var buttons = [];
var whichIllusion = -1;
var ansr = [false, false];
var buttonCreate = true;
var noOf = 0;

// var willReturn = false;

// let xspacing = 16; // Distance between each horizontal location
// let w; // Width of entire wave
// let theta = 0.0; // Start angle at 0
// let amplitude = 15.0; // Height of wave
// let period = 500.0; // How many pixels before the wave repeats
// let dx; // Value for incrementing x
// let yvalues; // Using an array to store height values for the wave
// let noiseY;
// let noiseSpeed = 0.01;
// let noiseHeight = 20;
// var monkeyIs;


// TO PRELOAD THE IMAGES
function preload() {
  // LOADING THE IMAGES
  backgroundImage = loadImage('./lanscape1.png');
  wizardImage1 = loadImage('./wizard1.png');
  wizardImage2 = loadImage('./wizard2.png');
  wizardImage3 = loadImage('./wizard3.png');
  hat = loadImage('magician.png');
  boyImage1 = loadImage('b1.png');
  boyImage2 = loadImage('b2.png');
  boyImage3 = loadImage('b3.png');
  boyImage4 = loadImage('b4.png');
  scrollImage = loadImage('scroll.jpg')
  monkeyImage = loadImage('monkey.jpg')
  pirateImage = loadImage('pirate.png');
  monkeyImage1 = loadImage('monkey.png');
  abstract = loadImage('abstract.png');
  grid = loadImage('grid.png');
  cardIllusion = loadImage('./illusion.jpg')
};

// TO SET-UP THE PROGRAM
function setup() {
  // CREATING THE CANVAS
  createCanvas(windowWidth, windowHeight);

  // MAKING THE BACKGROUND SPRITE
  // back = createSprite(width / 2, height / 2, width, height);
  // card = createDiv('card');
  // card.style("transform-style", " preserve-3d");
  // card.style("min-height", "80vh");
  // card.style("width", "35rem");
  // card.style("border-radius", "30px");
  // card.style("padding", "0rem 5rem");
  // card.style("box-shadow", "0 20px 20px rgba(0, 0, 0, 0.2), 0px 0px 50px rgba(0, 0, 0, 0.2)");
  // card.style("opacity", "0");
  // card.position(2000, 20000);
  // MAKING THE BOY SPRITE
  sprite = createSprite(width / 2, height / 2, 20, 20);

  // MAKING THE WALL GROUP
  wallGroup = new Group();

  wizard1 = createSprite(Math.round(random(150, width - 150)), Math.round(random(150, height - 150)), 20, 20);
  console.log(wizard1.x, wizard1.y)
  wizard1.addImage(hat);
  wizard1.scale = 0.1;
  // push();
  // // rectMode(CENTER)
  // drawingContext.shadowOffsetX = 5;
  // drawingContext.shadowOffsetY = -5;
  // drawingContext.shadowBlur = 10;
  // drawingContext.shadowColor = 'black';
  // console.log('width = ' + width + ' height = ' + height)
  card = createSprite(width + 1000, height / 2, width - 20, height - 20);
  card.addImage(scrollImage);
  card.scale = 1.5;

  wizardCard = createSprite(width - 50, height + 330, 20, 20);
  spriteCard = createSprite(50, height + 330, 20, 20);
  wizardCard.addImage(wizardImage1);
  spriteCard.addImage(boyImage1);
  wizardCard.scale = 0.5;
  spriteCard.scale = 1.2;

  monkey = createSprite(1151, 294, 100, 100);
  monkey.visible = false;
  // pop();
  noiseY = height * 3 / 4;
  illusion = createSprite(width / 2, height / 2, 50, 50);
};

// TO GIVE THE PROGRAM ITS VARIOUS FUNCTIONALITIES
function draw() {
  // camera.position.y = spriteCard.y;
  if (!gotRiddle) {
    riddle = getRiddle()
    gotRiddle = true
  }

  // ADD IMAGE TO BACKGROUND
  background(backgroundImage);
  // image(cardIllusion, 200, 200);
  sprite.addImage(boyImage1)
  sprite.scale = 0.2;

  // SET THE WALLS GROUP
  wallGroup.add(createSprite(235, height / 2, 1, height + 280));
  wallGroup.add(createSprite(width - 235, height / 2, 1, height + 280));
  wallGroup.add(createSprite(width / 2, height - 700, width, 1));
  wallGroup.add(createSprite(width / 2, 700, width, 1));
  wallGroup.setVisibleEach(false);

  // MAKE THE BOY COLLIDE TO THE WALL GROUP
  sprite.collide(wallGroup);

  // ADD THE CONTROLS FOR THE BOY CHARACTER
  if (animationGameState != 1) {
    if (keyDown("right")) sprite.x += 15;
    if (keyDown("left")) sprite.x -= 15;
    if (keyDown("up")) sprite.y -= 15;
    if (keyDown("down")) sprite.y += 15;
  }
  // DRAWING THE SPRITES
  if (sprite.isTouching(monkey)) {
    animationGameState = 3
    // monkeyIs = true;
  }
  if (sprite.isTouching(illusion)) {
    animationGameState = 4;
  }
  if (sprite.isTouching(wizard1)) {
    animationGameState = 1
    riddle = getRiddle()

    wizard1.x = Math.round(random(150, width - 150))
    wizard1.y = Math.round(random(150, height - 150))
  }
  // console.log("riddle: " + riddle)
  // console.log('riddle = ' + riddle.length)
  // console.log(riddle)
  // console.log('TRue/FAlse' + riddle.includes(','))
  // else if (animationGameState == 1) animationGameState = 2;

  // if (!sprite.isTouching(wizard1) && animationGameState == 1) gamestate = 2;
  if (animationGameState == 1) {
    let ans = [false, false];
    card.addImage(scrollImage);
    card.scale = 2;
    wizardCard.addImage(wizardImage1);
    wizardCard.scale = 0.5;
    spriteCard.addImage(boyImage1);
    console.log(spriteCard.y, height / 2);
    if (noOf == 0) {
      if (!(card.x <= width / 2)) {
        card.velocityX = -104;
        noOf += 1;
      }
      else {
        ans[0] = true;
        card.velocityX = 0;
      }
    }
    else {
      if (!(card.x <= width / 2)) {
        card.velocityX = -104;
        noOf += 1;
      }
      else {
        ans[0] = true;
        card.velocityX = 0;
      }
    }
    if (!(spriteCard.y < height / 2)) {
      spriteCard.velocityY = -40;
      wizardCard.velocityY = -40;
    }
    else {
      ans[1] = true;
      spriteCard.velocityY = 0;
      wizardCard.velocityY = 0;
    }

    if (ans[0] && ans[1]) {
      sleep(5000)
      console.log(riddle)
      var prompta = window.prompt("WHAT DO YOU THINK IS THE ANSWER?")
      times = 0
      while (prompta == null || prompta == "") {
        times += 1
        if (times > 1) {
          break
        }
        prompta = window.prompt("PLEASE ANSWER")
      }
      if (`${prompta}`.toLowerCase() == `${riddle[1]}`.toLowerCase() || `${prompta}`.toLowerCase() == `${riddle[1]}`.toLowerCase() + 's' || `${prompta}`.toLowerCase() == `${riddle[1]}`.replace(' ', '').toLowerCase() + 's' || `${prompta}`.toLowerCase() == `${riddle[1]}`.replace(' ', '').toLowerCase()) {
        spriteCard.addImage(boyImage4)
        alert("CONGRATULATIONS CORRECT ANSWER! ")
      }
      else {
        alert("THAT WAS THE WRONG ANSWER")
        alert(`THE CORRECT ANSWER WAS '${riddle[1]}'`)
      }
      animationGameState = 2
      ans[0] = false;
      ans[1] = false;
    }
  }
  if (animationGameState == 2) {
    let over = [false, false]
    if (!(card.x >= width + 1000)) {
      card.velocityX = 104;
    }
    else {
      card.velocityX = 0;
      over[1] = true;
    }
    if (!(spriteCard.y >= height + 370)) {
      spriteCard.velocityY = 40;
      wizardCard.velocityY = 40;
    }
    else {
      spriteCard.velocityY = 0;
      wizardCard.velocityY = 0;
      over[0] = true;
    }

    if (whichIllusion != -1 && over[0] && over[1]) {
      animationGameState = 4
    }
  }
  if (animationGameState == 3) {
    card.addImage(abstract);
    card.scale = 1.5
    wizardCard.addImage(monkeyImage);
    wizardCard.scale = 2;

    spriteCard.addImage(boyImage1);
    let ans = [false, false]

    if (!(card.x <= (width / 2))) {
      card.velocityX = -104;
    }
    else {
      ans[0] = true;
      card.velocityX = 0;
    }
    if (!(spriteCard.y <= height / 2)) {
      spriteCard.velocityY = -40;
      wizardCard.velocityY = -40;
    }
    else {
      ans[1] = true;
      spriteCard.velocityY = 0;
      wizardCard.velocityY = 0;
    }
    tictactoe(ans)
    // console.log(card.x, card.y, card.width, card.height);
  }


  if (animationGameState == 4) {
    card.addImage(cardIllusion);
    card.scale = 1;
    wizardCard.addImage(wizardImage1);
    wizardCard.scale = 0.5;
    spriteCard.addImage(boyImage1);
    // console.log(spriteCard.y, height / 2);
    if (whichIllusion == -1) {
      if (!(card.x <= width / 2)) {
        card.velocityX = -104;
      }
      else {
        ansr[0] = true;
        card.velocityX = 0;
      }
      if (!(spriteCard.y <= height / 2)) {
        spriteCard.velocityY = -40;
        // wizardCard.velocityY = -40;
      }
      else {
        ansr[1] = true;
        spriteCard.velocityY = 0;
        wizardCard.velocityY = 0;
      }
    }
    if (ansr[0] && ansr[1]) {
      let lo = 1;
      if (buttonCreate) {
        for (let y = (card.y - 100); y <= (card.y + 100); y += 100) {
          buttons.push(createButton(`ILLUSION ${lo}`));
          buttons[lo - 1].style('border-radius', '12px');
          buttons[lo - 1].style('border', 'none');
          buttons[lo - 1].position(card.x - 100, y - 50);
          lo += 1;
        }
      }
      buttons[0].mouseClicked((e) => {
        // buttonCreate = false;
        whichIllusion = 1;
        animationGameState = 2;
        ansr = [false, false];
        let canMoveOn = [false, false];
        // while (!(canMoveOn[0]) && !(canMoveOn[1])) {
        for (let ak = 0; ak < 20; ak++) {
          if (!(card.x >= width + 600)) {
            card.velocityX = 104;
            for (let z = 0; z < 3; z++) {
              for (let x = 1; x >= 0; x -= 0.01) {
                buttons[z].style('opacity', `${x}`)
              }
              buttons[z].position(1000, 1000);
            }
          }
          else {
            card.velocityX = 0;
            canMoveOn[1] = true;
          }
          if (!(spriteCard.y >= height + 370)) {
            spriteCard.velocityY = 40;
            wizardCard.velocityY = 40;
          }
          else {
            spriteCard.velocityY = 0;
            wizardCard.velocityY = 0;
            canMoveOn[0] = true;
          }
        }
        // console.log("sprite" + spriteCard.y)
        // console.log("card" + card.x)
        // if (!(ansr[0]) && !(ansr[1])) {
        //   //   for (let one = 0; one < 10; one++) {
        //   if (!(card.x <= width / 2)) {
        //     card.velocityX = -104;
        //   }
        //   else {
        //     // ansr[0] = true;
        //     card.velocityX = 0;
        //   }
        //   if (!(spriteCard.y <= height / 2)) {
        //     spriteCard.velocityY = -40;
        //     wizardCard.velocityY = -40;
        //   }
        //   else {
        //     // ansr[1] = true;
        //     spriteCard.velocityY = 0;
        //     wizardCard.velocityY = 0;
        //   }
        //   //   }
        // }
        spriteConstraint = createSprite(width / 2, height + 400, width, 1)
        spriteCard.bounceOff(spriteConstraint);
        // camera.on()

        // if (canMoveOn[0] && canMoveOn[1]) { firstIllusion() }
      });
      buttons[1].mouseClicked((e) => {
        whichIllusion = 2;
      });
      buttons[2].mouseClicked((e) => {
        whichIllusion = 3;
      });
      console.log(whichIllusion);

    }
  }
  // wave();


  // noStroke();
  // fill(255);
  // for (let i = 0; i < 10; i++) {
  //   let xrandom = random(width);
  //   let yrandom = random(height / 2);
  //   ellipse(xrandom, yrandom, 3, 3);
  // }

  // for (let j = 0; j < 3; j++) {
  //   let offsetY = j * 100;
  //   noFill();
  //   stroke(0, 0, 255, 10);
  //   strokeWeight(height / 2);
  //   beginShape();
  //   curveVertex(0, height / 2);
  //   for (let i = 0; i < width; i += 50) {
  //     let y = noise(frameCount * noiseSpeed + i + j) * noiseHeight + noiseY + offsetY;
  //     curveVertex(i, y);
  //   }
  //   curveVertex(width, height / 2);
  //   endShape(LINES);
  // }
  drawSprites();
  textAlign(CENTER)
  textSize(50);
  fill(0)
  if (animationGameState == 1 && animationGameState != 3) text(riddle[0], card.x, card.y);
  // text(mouseX + ", " + mouseY, mouseX, mouseY);
  // 1151, 294
};



function getRiddle() {
  riddles = [
    {
      "id": "0",
      "question": "Which letter of the alphabet has the most water?",
      "answer": "C"
    },
    {
      "id": "1",
      "question": "What kind of dog keeps the best time?",
      "answer": "Watchdog"
    },
    {
      "id": "4",
      "question": "A tasty reward given to well behaved dogs and kids",
      "answer": "Treat"
    },
    {
      "id": "7",
      "question": "What has a face and two hands but no arms or legs?",
      "answer": "Clock"
    },
    {
      "id": "9",
      "question": "What word begins and ends with an 'E' but only has one letter?",
      "answer": "Envelope"
    },
    {
      "id": "10",
      "question": "What has a neck but no head?",
      "answer": "Bottle"
    },
    {
      "id": "11",
      "question": "What type of cheese is made backwards?",
      "answer": "Edam"
    },
    {
      "id": "12",
      "question": "What gets wetter as it dries?",
      "answer": "Towel"
    },
    {
      "id": "13",
      "question": "Which letter of the alphabet has the most water?",
      "answer": "C"
    },
    {
      "id": "15",
      "question": "What has to be broken before you can eat it?",
      "answer": "Egg"
    },
    {
      "id": "16",
      "question": "What begins with T, ends with T and has T in it?",
      "answer": "Teapot"
    },
    {
      "id": "17",
      "question": "Teddy bears are never hungry because they are always what?",
      "answer": "Stuffed"
    },
    {
      "id": "18",
      "question": "What belongs to you but others use it more than you do?",
      "answer": "Name"
    },
    {
      "id": "19",
      "question": "The more you take aways, the larger it becomes? What is it?",
      "answer": "Hole"
    },
    {
      "id": "20",
      "question": "What is full of holes, but can still hold a lot of water?",
      "answer": "Sponge"
    },
    {
      "id": "21",
      "question": "Where do fish keep their money?",
      "answer": "Riverbank"
    },
    {
      "id": "24",
      "question": "What bone has a sense of humor?",
      "answer": "Humorous"
    },
    {
      "id": "26",
      "question": "What is that you will break everytime you name it?",
      "answer": "Silence"
    },
    {
      "id": "27",
      "question": "What has four fingers and one thumb, but is not alive?",
      "answer": "Glove"
    },
    {
      "id": "28",
      "question": "What flies without wings?",
      "answer": "Time"
    },
    {
      "id": "29",
      "question": "What turns everything around, but does not move?",
      "answer": "Mirror"
    },
    {
      "id": "30",
      "question": "What is half of two plus two?",
      "answer": "Three"
    },
    {
      "id": "31",
      "question": "What word looks the same upside down and backwards?",
      "answer": "Swims"
    },
    {
      "id": "32",
      "question": "What kind of fish chases a mouse?",
      "answer": "Catfish"
    },
    {
      "id": "34",
      "question": "What's the difference between here and there?",
      "answer": "T"
    },
    {
      "id": "35",
      "question": "What goes up and down without moving?",
      "answer": "Stairs"
    },
    {
      "id": "36",
      "question": "Take off my skin and I won't cry, but you will, What am I?",
      "answer": "Onion"
    },
    {
      "id": "38",
      "question": "What sits in a corner while traveling all around the world?",
      "answer": "Stamp"
    },
    {
      "id": "41",
      "question": "What is round on both ends and hi in the middle?",
      "answer": "Ohio"
    },
    {
      "id": "42",
      "question": "What do you call a dog that sweats so much?",
      "answer": "Hotdog"
    },
    {
      "id": "43",
      "question": "What do you call a rabbit with fleas?",
      "answer": "Bugs Bunny"
    },
    {
      "id": "44",
      "question": "What rains at the north pole?",
      "answer": "Reindeer"
    },
    {
      "id": "45",
      "question": "What kind of apple has a short temper?",
      "answer": "Crabapple"
    },
    {
      "id": "46",
      "question": "What do you do with a dead chemist?",
      "answer": "Barium"
    },
    {
      "id": "52",
      "question": "Old Mcdonald had this",
      "answer": "Farm"
    },
    {
      "id": "54",
      "question": "Brings you may flowers",
      "answer": "Showers"
    },
    {
      "id": "55",
      "question": "A shower that lights up the sky",
      "answer": "Meteor"
    },
    {
      "id": "56",
      "question": "Longer than a decade and shorter than a milennium",
      "answer": "Century"
    },
    {
      "id": "57",
      "question": "Rolling on floor",
      "answer": "Laughing"
    },
    {
      "id": "58",
      "question": "There are four of these, but everyone's favourite seems to be spades",
      "answer": "Ace"
    },
    {
      "id": "60",
      "question": "These minerals are vital to your health",
      "answer": "Vitamin"
    },
    {
      "id": "61",
      "question": "Commits friendly home invasions one night a year",
      "answer": "Santa claus"
    },
    {
      "id": "62",
      "question": "Treats said to be based on a shephero's staff",
      "answer": "Candy cane"
    },
    {
      "id": "66",
      "question": "They put the heat in pop tarts",
      "answer": "Toaster"
    },
    {
      "id": "67",
      "question": "What has a ring, but no finger?",
      "answer": "Telephone"
    },
    {
      "id": "68",
      "question": "What has four legs, but can't walk?",
      "answer": "Table"
    },
    {
      "id": "69",
      "question": "What is higher without the head, than with it?",
      "answer": "Pillow"
    },
    {
      "id": "70",
      "question": "What is harder to catch the faster you run?",
      "answer": "Breath"
    },
    {
      "id": "71",
      "question": "What invention lets you look right through a wall?",
      "answer": "Window"
    },
    {
      "id": "72",
      "question": "What is that you will break everytime you name it?",
      "answer": "Silence"
    },
    {
      "id": "73",
      "question": "What is made of wood, but can't be sawed?",
      "answer": "Sawdust"
    },
    {
      "id": "74",
      "question": "What is a witch's favorite school subject?",
      "answer": "Spelling"
    },
    {
      "id": "75",
      "question": "What is an aliens favourite sport?",
      "answer": "Spaceball"
    },
    {
      "id": "76",
      "question": "What is the saddest fruit?",
      "answer": "Blueberry"
    },
    {
      "id": "78",
      "question": "What is easy to get into, and hard to get out of?",
      "answer": "Trouble"
    },
    {
      "id": "79",
      "question": "What is there more of the less you see?",
      "answer": "Darkness"
    },
    {
      "id": "81",
      "question": "What is as big as you are and yet does not weigh anything?",
      "answer": "Shadow"
    },
    {
      "id": "82",
      "question": "What types of words are these: Madam, Civic, Eye, Level?",
      "answer": "Palindrome"
    },
    {
      "id": "87",
      "question": "What becomes white when it is dirty?",
      "answer": "Blackboard"
    },
    {
      "id": "89",
      "question": "How many 9's are there between 1 and 100?",
      "answer": "Twenty"
    },
    {
      "id": "90",
      "question": "Which vehicle is spelled the same forwards and backwards?",
      "answer": "Racecar"
    },
    {
      "id": "91",
      "question": "I am lighter than air but a million men cannot lift me up, What am I?",
      "answer": "Bubble"
    },
    {
      "id": "93",
      "question": "David's father has three sons: Snap, Crackle, and ?",
      "answer": "David"
    },
    {
      "id": "94",
      "question": "It is everything to someone, and nothing to everyone else. What is it?",
      "answer": "Mind"
    },
    {
      "id": "95",
      "question": "What has a mouth but can't chew?",
      "answer": "River"
    },
    {
      "id": "97",
      "question": "Forward I am heavy, backwards I am not. What am I?",
      "answer": "Ton"
    }
  ]
  riddlesX = []

  rand = riddles[Math.round(random(0, riddles.length - 1))];

  while (rand in riddlesX) {
    rand = riddles[Math.round(random(0, riddles.length - 1))];
  }

  riddlesX.push(rand)

  return [rand.question, rand.answer];
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

//   https://p5js.org/examples/simulate-stepping-feet-illusion.html
// a = '''transform-style: preserve-3d;
//   min-height: 80vh;
//   width: 35rem;
//   border-radius: 30px;
//   padding: 0rem 5rem;
//   box-shadow: 0 20px 20px rgba(0, 0, 0, 0.2), 0px 0px 50px rgba(0, 0, 0, 0.2);
//   opacity: 0;'''
// a = a.split(';')
// # print(a)
// for x in a:
//     # print(x)
//     x = x.replace(';', '')
//     b = x.split(':')
//     print(f'card.style("{b[0]}","{b[1]}");')
// data:image/jpeg;base64,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

function tictactoe(ans) {
  let run = 0;
  var location = [
    [false, false, false],
    [false, false, false],
    [false, false, false]
  ];
  var listSprites = [[], [], []]

  var gridSprite = null;
  var picker = []
  if (card.x == 768) {
    gridSprite = createSprite(card.x, card.y, card.width, card.height)
    gridSprite.addImage(grid)
    let posY = 0;
    let posX = 0;
    for (let x = 587; x <= 961; x += 187) {
      for (let y = 211; y <= 539; y += 164) {
        if (!location[posY][posX]) {
          run += 1;
        }
        let local = createSprite(x, y, 100, 100);
        listSprites[posY].push(local);
        posX += 1
      }
      posY += 1
    }
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        console.log('BOOST' + listSprites[x][y].x)
        if (!(location[x][y])) {
          let arr = [x, y];
          picker.push(arr);
        }
      }
    }
    console.log(picker)
    let canTurn = true;
    if (run >= 2) {
      for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
          // console.log('x:' + x)
          // console.log('y:' + y)
          // console.log([x, y])
          // console.log(picker.includes([x, y]))
          if (mousePressedOver(listSprites[x][y]) && checkArray(picker, [x, y]) && canTurn) {
            listSprites[x][y].addImage(pirateImage);
            listSprites[x][y].scale = 0.4;
            listSprites[x][y].visible = true;
            location[x][y] = true;
            picker.splice(picker.indexOf([x, y]));
            console.log(picker)
            // canTurn = false;
            // if (location.every(trueLocation)) {
            sleep(20);
            let rand = Math.round(random(0, picker.length));
            console.log('rand: ' + rand)
            var randx = picker[rand];
            console.log('jhba ' + randx)
            picker.splice(rand);
            let randy = randx[1];
            randx = randx[0];
            console.log('randx : ' + randx)
            console.log('randy : ' + randy);
            console.log('ya')
            // if (location[randx][randy]) {
            //   for (let Y = 0; Y < 3; Y++) {
            //     for (let X = 0; X < 3; X++) {
            //       console.log('YE HAI X, Y: ' + X + ', ' + Y)
            //       if (!(location[Y][X])) {
            //         randx = Y;
            //         randy = X;
            //         // listSprites[randx][randy].addImage(monkeyImage1);
            //         // listSprites[randx][randy].scale = 0.4;
            //         // listSprites[randx][randy].visible = true;
            //         console.log('BREAK HO JA')
            //         // location[randx][randy] = true;
            //         break
            //       }
            //     }
            //   }
            // }
            // let yeWhile = 0;
            // while (location[randx][randy]) {
            //   randx = Math.round(random(0, 2));
            //   randy = Math.round(random(0, 2));
            //   yeWhile += 1;
            //   console.log(`randx, randy = ${randx}, ${randy}`)
            //   console.log(yeWhile)
            //   if (yeWhile > 3) {
            //     
            //   }
            // }

            listSprites[randx][randy].addImage(monkeyImage1);
            listSprites[randx][randy].scale = 0.4;
            listSprites[randx][randy].visible = true;
            location[randx][randy] = true;
            console.log("SAB HO GYA , KAHAN? " + 'player:' + x + ' ' + y + randx + ' ' + randy);
            canTurn = true
            // }
            // else {
            //   console.log('Game Over');
            //   animationGameState = 2;
            //   return;
            // }
          }

          if (!(location[x][y])) {
            listSprites[x][y].visible = false;
          }
        }
      }
    }
  }

  // fill("black");
  // line(0, 133.334, 400, 133.334);
  // line(0, 266.668, 400, 266.668);
  // line(133.334, 0, 133.334, 400);
  // line(266.668, 0, 266.668, 400);
  // if (gamestate === 0) {
  // }

}

function checkArray(pahila, dusira) {
  pahila = JSON.stringify(pahila);
  dusira = JSON.stringify(dusira);

  if (pahila.indexOf(dusira) != -1) {
    return true
  }
  return false
}

function firstIllusion() {
  let spriteConstraint = createSprite(width / 2, height + 370, width, 1)
  let ans = [false, false];


  // console.log('he')
  // background(230);
  // fill(244, 122, 158);
  // createSprite(mouseX, height / 2, mouseY / 2 + 10, mouseY / 2 + 10);
  // fill(237, 34, 93);
  // let inverseX = width - mouseX;
  // let inverseY = height - mouseY;
  // createSprite(inverseX, height / 2, inverseY / 2 + 10, inverseY / 2 + 10);
  // for (let x = 0; x < 10; x++) {
  //   if (!(card.x <= width / 2)) {
  //     card.velocityX = -104;
  //   }
  //   else {
  //     ans[0] = true;
  //     card.velocityX = 0;
  //   }
  //   if (!(spriteCard.y < height / 2)) {
  //     spriteCard.velocityY = -40;
  //     // wizardCard.velocityY = -40;
  //   }
  //   else {
  //     ans[1] = true;
  //     spriteCard.velocityY = 0;
  //     // wizardCard.velocityY = 0;
  //   }
  // }
}

function secondIllusion() {

}

function thirdIllusion() {

}
// function wave() {
//   w = width + 16;
//   dx = (TWO_PI / period) * xspacing;
//   yvalues = new Array(floor(w / xspacing));
//   for (let z = 0; z < 10; z++) {
//     calcWave();
//     renderWave();
//   }

//   function calcWave() {
//     theta += 0.02;

//     let x = theta;
//     for (let i = 0; i < yvalues.length; i++) {
//       yvalues[i] = sin(x) * amplitude;
//       x += dx;
//     }
//   }

//   function renderWave() {
//     noStroke();
//     fill('skyblue');
//     // A simple way to draw the wave with an ellipse at each location
//     for (let x = 0; x < yvalues.length; x++) {
//       ellipse(x * xspacing, height / 2 + yvalues[x], 16, 16);
//     }
//   }
//   loop()
// }



