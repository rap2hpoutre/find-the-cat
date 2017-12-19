function onAssetsLoaded() {

  function spriteFromData(data) {
    var isAnimated = data.animation.length > 1;
    if (!isAnimated) {
      var sprite = new PIXI.Sprite.from(data.animation[0]);
    } else {
      var sprite = new PIXI.extras.AnimatedSprite(data.animation);
      sprite.animationSpeed = 1 / _.random(30, 180);
      sprite.play();
    }
    var p = getRandomPosition(positions, true);
    sprite.x = p.x;
    sprite.y = p.y;
    sprite.anchor.set(0.5, 1);
    sprite.scale.x *= 2;
    sprite.scale.y *= 2;
    if (_.random(0, 1)) {
      sprite.scale.x *= -1;
    }
    if (data.velocity) {
      sprite.vx = data.velocity * sprite.scale.x * -1;
      if (isAnimated) {
        sprite.animationSpeed = data.animVelocity;
      }
    }
    return sprite;
  }

  function buildSprites(n) {
    var sprites = [];
    for (var i = 0; i < n; i++) {
      sprites.push(spriteFromData(_.sample(spritesData)));
    }
    var sprite = spriteFromData({ animation: [PIXI.Texture.fromFrame(cat.frames[0])] });
    sprite.interactive = true;
    sprite.buttonMode = true;
    sprite.on('pointerdown', victory);
    sprites.push(sprite);
    return sprites;
  }

  function victory() {
    score++;
    document.getElementById('score-text').innerText = score;

    var style = new PIXI.TextStyle({
      fontSize: 48,
      fontWeight: 'bold',
      fill: ['#FFFFFF', '#EEEEEE'], // gradient
      stroke: '#000000',
      strokeThickness: 5,
      dropShadow: true,
      dropShadowColor: '#000000',
      dropShadowBlur: 4,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6,
    });

    var richText = new PIXI.Text(_.sample(['BRAVO!', 'Great.', 'SUPER!', 'You found it!', 'Amazing!', 'Voilà!', 'AWESOME!']), style);
    richText.anchor.set(0.5);
    richText.x = app.renderer.width / 2;
    richText.y = app.renderer.height / 2;
    for (var i = 0; i < sprites.length; i++) {
      sprites[i].interactive = false;
    }
    app.stage.addChild(richText);
    setTimeout(startLevel, 2000);
  }

  // Init
  var app = new PIXI.Application(640, 300, { backgroundColor: 0xeeeeee });
  var positions = [];
  document.getElementById('main').appendChild(app.view);
  for (var i = 0; i < spritesData.length; i++) {
    var frames = [];
    for (var j = 0; j < spritesData[i].frames.length; j++) {
      frames.push(PIXI.Texture.fromFrame(spritesData[i].frames[j]));
    }
    spritesData[i].animation = frames;
  }

  // New level
  function startLevel() {
    app.stage.removeChildren();
    positions = generatePositionsArray(app.renderer.width - 24, app.renderer.height - 24, 44, 10);
    sprites = buildSprites(60);
    sprites = _.sortBy(sprites, 'y');

    // Draw
    for (var i = 0; i < sprites.length; i++) {
      app.stage.addChild(sprites[i]);
    }

    // Move some sprites
    app.ticker.add(function (delta) {
      for (var i = 0; i < sprites.length; i++) {
        var sprite = sprites[i];
        if (sprite.vx) {
          sprite.x += sprite.vx * delta;
        }
      }
    });
  }
  startLevel();

}