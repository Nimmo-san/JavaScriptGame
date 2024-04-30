
class BackGround{
  constructor({position, imgSrc, scale = 1, frameMax = 1, offset = {x:0, y:0}}){
    this.position = position
    this.width = 100
    this.height = 300
    this.image = new Image()
    this.image.src = imgSrc
    this.scale = scale
    this.frameMax = frameMax
    this.frameCurent = 0
    this.frameElapsed = 0
    this.frameHold = 5
    this.offset = offset
  }

  draw(){
    c.drawImage(this.image, this.frameCurent * (this.image.width/this.frameMax), 0,
    this.image.width/this.frameMax, this.image.height,
    this.position.x - this.offset.x, this.position.y - this.offset.y,
    (this.image.width / this.frameMax) * this.scale, this.image.height * this.scale)
  }

  animateFrames(){
    this.frameElapsed++

    if(this.frameElapsed % this.frameHold === 0){
      if(this.frameCurent < this.frameMax - 1){
        this.frameCurent++
      }else{
        this.frameCurent = 0
      }
    }
  }

  update(){
    this.draw()
    this.animateFrames()
  }
}

class Sprite extends BackGround{
  constructor({position,
              velocity, colour = 'red', imgSrc, scale = 1, frameMax = 1, offset = {x:0, y:0}, sprites, attack = {offset: {}, width: underfined, height: height}}){
    super({
      position, imgSrc, scale, frameMax, offset
    })
    this.velocity = velocity
    this.lastKey
    this.height = 50
    this.width = 10
    this.attack = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      offset: attack.offset,
      width: attack.width,
      height: attack.height
    },
    this.attacking = false
    this.colour = colour
    this.health = 100
    this.frameCurent = 0
    this.frameElapsed = 0
    this.frameHold = 5
    this.sprites = sprites

    for (var sprite in sprites) {
      sprites[sprite].image = new Image()
      sprites[sprite].image.src = sprites[sprite].imgSrc
    }

    // console.log(sprites)
    //console.log(attack.position)
  }

  draw(){
    c.fillStyle = this.colour
    c.fillRect(this.position.x, this.position.y, this.width, this.height)

    if(this.attacking){
      c.fillStyle = 'green'
      c.fillRect(
        this.attack.position.x,
        this.attack.position.y,
        this.attack.width,
        this.attack.height)
    }
  }

  update(){
    this.draw()
    this.animateFrames()

    this.attack.position.x = this.position.x + this.attack.offset.x
    this.attack.position.y = this.position.y + this.attack.offset.y

    //c.fillRect(this.attack.position.x, this.attack.position.y, this.attack.width, this.attack.height)

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if(this.position.y + this.height + this.velocity.y >= canvas.height - 140){
      this.velocity.y = 0
      //this.position.y = 107
    }else {this.velocity.y += gravity}

    //console.log(this.position.y)
    // if(this.position.x + this.width + this.velocity.x >= 222){
    //   this.velocity.x = 0
    // }
  }

  switchSprites(sprite){
    if(this.image === this.sprites.attack1.image && this.frameCurent < this.sprites.attack1.frameMax - 1) return

    switch(sprite){
      case 'idle':
        if(this.image !== this.sprites.idle.image){
          this.image = this.sprites.idle.image
          this.frameMax = this.sprites.idle.frameMax
          this.frameCurent = 0
        }
        break
      case 'run':
        if(this.image !== this.sprites.run.image){
          this.image = this.sprites.run.image
          this.frameMax = this.sprites.run.frameMax
          this.frameCurent = 0
        }
        break
      case 'jump':
        if(this.image !== this.sprites.jump.image){
          this.image = this.sprites.jump.image
          this.frameMax = this.sprites.jump.frameMax
          this.frameCurent = 0
        }
        break
      case 'fall':
        if(this.image !== this.sprites.fall.image){
          this.image = this.sprites.fall.image
          this.frameMax = this.sprites.fall.frameMax
          this.frameCurent = 0
        }
        break
      case 'attack1':
        if(this.image !== this.sprites.attack1.image){
          this.image = this.sprites.attack1.image
          this.frameMax = this.sprites.attack1.frameMax
          this.frameCurent = 0
        }
        break
    }

  }

  canAttack() {
    this.switchSprites('attack1')
    this.attacking = true
    setTimeout (() => {
      this.attacking = false
    }, 100)
  }
}
