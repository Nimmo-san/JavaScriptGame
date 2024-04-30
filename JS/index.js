const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1416
canvas.height = 297


c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.3

const background = new BackGround({
  position: {
    x: 0,
    y: 0
  },
  imgSrc: './Assets/background.png'
})

const shop = new BackGround({
  position: {
    x: 800,
    y: 42
  },
  imgSrc: './Assets/shop_anim.png',
  scale: 0.9,
  frameMax: 6
})

const player = new Sprite({
  position: {
    x: 400,
    y: 95
  },
  velocity: {
    x: 0,
    y: 0
  },
  offset: {
    x: 0,
    y: 0
  },
  imgSrc: './Assets/Martial Hero/Sprites/Idle.png',
  frameMax: 8,
  scale: 1.2,
  offset: {
    x: 215,
    y: 95
  },
  sprites: {
    idle:{
      imgSrc: './Assets/Martial Hero/Sprites/Idle.png',
      frameMax: 8
    },
    run:{
      imgSrc: './Assets/Martial Hero/Sprites/Run.png',
      frameMax: 8
    },
    jump:{
      imgSrc: './Assets/Martial Hero/Sprites/Jump.png',
      frameMax: 2
    },
    fall:{
      imgSrc: './Assets/Martial Hero/Sprites/Fall.png',
      frameMax: 2
    },
    attack1:{
      imgSrc: './Assets/Martial Hero/Sprites/Attack1.png',
      frameMax: 6
    }
  },
  attack:{
    offset: {
      x:0,
      y:0
    },
    width: 50,
    height: 50
  }
})

const enemy = new Sprite({
  position: {
    x: 700,
    y: 95
  },
  velocity: {
    x: 0,
    y: 0
  },
  colour: 'blue',
  offset: {
    x: 0,
    y: 0
  },
  imgSrc: './Assets/Martial Hero 2/Sprites/Idle.png',
  frameMax: 4,
  scale: 1.2,
  offset: {
    x: 215,
    y: 100
  },
  sprites: {
    idle:{
      imgSrc: './Assets/Martial Hero 2/Sprites/Idle.png',
      frameMax: 4
    },
    run:{
      imgSrc: './Assets/Martial Hero 2/Sprites/Run.png',
      frameMax: 8
    },
    jump:{
      imgSrc: './Assets/Martial Hero 2/Sprites/Jump.png',
      frameMax: 2
    },
    fall:{
      imgSrc: './Assets/Martial Hero 2/Sprites/Fall.png',
      frameMax: 2
    },
    attack1:{
      imgSrc: './Assets/Martial Hero 2/Sprites/Attack1.png',
      frameMax: 4
    }
  },
  attack:{
    offset: {
      x:0,
      y:0
    },
    width: 50,
    height: 50
  }
})
//console.log(player)

const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  w: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
  ArrowUp: {
    pressed: false
  }
}

tickTock()

function run(){
  window.requestAnimationFrame(run)
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  background.update()
  shop.update()
  player.update()
  enemy.update()
  player.velocity.x = 0
  enemy.velocity.x = 0

  // changing the state of the character

  if(keys.a.pressed && player.lastKey === 'a'){
    player.velocity.x = -3
    player.switchSprites('run')
  }else if(keys.d.pressed && player.lastKey === 'd'){
    player.velocity.x = 3
    player.switchSprites('run')
  }else{
    player.switchSprites('idle')
  }

  if(player.velocity.y < 0){
    player.switchSprites('jump')
  } else if(player.velocity.y > 0){
    player.switchSprites('fall')
  }

  if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft'){
    enemy.velocity.x = -3
    enemy.switchSprites('run')
  }else if(keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight'){
    enemy.velocity.x = 3
    enemy.switchSprites('run')
  }else{
    enemy.switchSprites('idle')
  }

  if(enemy.velocity.y < 0){
    enemy.switchSprites('jump')
  } else if(enemy.velocity.y > 0){
    enemy.switchSprites('fall')
  }

  // Edge of scene x: 222
  //console.log()

  // collision detection for hit box
  if(detect(player, enemy) && player.attacking){
    player.attacking = false,
    enemy.health -= 20
    document.querySelector('#E-HP').style.width = enemy.health + '%'
  }

  if(detect(enemy, player) && enemy.attacking){
    enemy.attacking = false,
    player.health -= 20
    document.querySelector('#P-HP').style.width = player.health + '%'
  }

  if(player.health <= 0 || enemy.health <= 0){
    earlyWinner(player, enemy, timerID)
  }
}


run()

window.addEventListener('keydown', (event) => {

  //console.log(event)
  switch(event.key){
    case 'd':
      keys.d.pressed = true
      player.lastKey = 'd'
      break

    case 'a':
      keys.a.pressed = true
      player.lastKey = 'a'
      break

    case 'w':
      player.velocity.y = -5
      break

    case ' ':
      player.canAttack()
      break

    case 'Control':
      enemy.canAttack()
      break

    case 'ArrowRight':
      keys.ArrowRight.pressed = true
      enemy.lastKey = 'ArrowRight'
      break

    case 'ArrowLeft':
      keys.ArrowLeft.pressed = true
      enemy.lastKey = 'ArrowLeft'
      break

    case 'ArrowUp':
      enemy.velocity.y = -5
      break
  }
})

window.addEventListener('keyup', (event) => {
  switch(event.key){
    case 'd':
      keys.d.pressed = false
      break

    case 'a':
      keys.a.pressed = false
      break
  }

  switch(event.key){
    case 'ArrowRight':
      keys.ArrowRight.pressed = false
      break

    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false
      break
  }
  //console.log(event.key)
})
