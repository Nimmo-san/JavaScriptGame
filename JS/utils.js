let timer=60
let timerID

function earlyWinner(player, enemy, timerID){
  clearTimeout(timerID)
  document.querySelector('#displayDRAW').style.display = 'flex'
  if(player.health === enemy.health){
    //draw
    //console.log('draw')
    document.querySelector('#displayDRAW').innerHTML = 'DRAW!'
  }else if(player.health > enemy.health){
    document.querySelector('#displayDRAW').innerHTML = 'PLAYER WINS!'
  }else if(enemy.health > player.health){
    document.querySelector('#displayDRAW').innerHTML = 'ENEMY WINS!'
  }
}

function tickTock(){
  timerID = setTimeout(tickTock, 1000)
  if(timer > 0){
    timer--
    document.querySelector('#timer').innerHTML = timer
  }

  if(timer === 0){
    earlyWinner(player, enemy, timerID)
  }
}

function detect(hb1, hb2){
  return(hb1.attack.position.x + hb1.attack.width >= hb2.position.x && hb1.attack.position.x <= hb2.position.x + hb2.width &&
    hb1.attack.position.y + hb1.attack.height >= hb2.position.y && hb1.attack.position.y <= hb2.position.y + hb2.height)
}

function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  )
}
