namespace SpriteKind {
    export const Boss = SpriteKind.create()
    export const BP = SpriteKind.create()
    export const BP2 = SpriteKind.create()
    export const DP = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.DP, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    Player.setBounceOnWall(true)
    otherSprite.setVelocity(0, 0)
    Player.startEffect(effects.spray)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Food, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    for (let index = 0; index < 3; index++) {
        projectile = sprites.createProjectileFromSprite(assets.image`LazerBig`, Player, 70, 0)
        pause(100)
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
})
function Endless () {
    while (info.score() != -1) {
        if (randint(1, 10) > 8) {
            Enemy_Guy = sprites.create(assets.image`Angry`, SpriteKind.Enemy)
            Enemy_Guy.setPosition(160, randint(2, 10) * 10)
            Enemy_Guy.setVelocity(-40, 0)
            pause(500)
            Enemy_Guy.setVelocity(0, 20)
            for (let index = 0; index < randint(2, 4); index++) {
                projectile2 = sprites.createProjectileFromSprite(assets.image`Lazer3`, Enemy_Guy, -60, 0)
                projectile2.setKind(SpriteKind.Enemy)
                pause(100)
                projectile2 = sprites.createProjectileFromSprite(assets.image`Lazer2`, Enemy_Guy, -60, 0)
                projectile2.setKind(SpriteKind.Enemy)
                pause(100)
            }
            Enemy_Guy.setVelocity(5, 0)
            sprites.destroy(Enemy_Guy)
            pause(100)
        } else if (randint(1, 10) < 3) {
            Enemy_Guy = sprites.create(assets.image`myImage`, SpriteKind.Enemy)
            Enemy_Guy.setPosition(160, randint(0, 12) * 10)
            Enemy_Guy.setVelocity(-300, 0)
        } else if (randint(1, 10) == 8) {
            for (let index = 0; index < 2; index++) {
                Enemy_Guy = sprites.create(assets.image`Octoguy`, SpriteKind.Enemy)
                Enemy_Guy.setPosition(160, randint(0, 12) * 10)
                Enemy_Guy.setVelocity(-100, 0)
                pause(1300)
                Enemy_Guy.setVelocity(-15, -32)
            }
            pause(100)
        } else if (randint(0, 100) > 95) {
            Enemy_Guy = sprites.create(assets.image`Pizza`, SpriteKind.Food)
            Enemy_Guy.setPosition(160, randint(0, 12) * 10)
            Enemy_Guy.setVelocity(randint(-75, -150), 0)
        } else if (randint(0, 100) < 15) {
            Enemy_Guy = sprites.create(assets.image`Green 0`, SpriteKind.Enemy)
            Enemy_Guy.setPosition(160, randint(0, 12) * 10)
            Enemy_Guy.setVelocity(-55, 0)
            pause(2600)
            Enemy_Guy.setVelocity(0, -10)
            for (let index = 0; index < 10; index++) {
                projectile2 = sprites.createProjectileFromSprite(assets.image`Lazer0`, Enemy_Guy, 50, 0)
                pause(100)
            }
            sprites.destroy(Enemy_Guy, effects.fountain, 500)
        } else if (randint(0, 100) > 85) {
            Enemy_Guy = sprites.create(assets.image`Green 1`, SpriteKind.Enemy)
            Enemy_Guy.setPosition(160, randint(0, 12) * 10)
            Enemy_Guy.setVelocity(randint(-15, -100), 0)
            Enemy_Guy = sprites.create(assets.image`Rhombus`, SpriteKind.Enemy)
            Enemy_Guy.setPosition(160, randint(0, 12) * 10)
            for (let index = 0; index < 4; index++) {
                Enemy_Guy.setVelocity(-120, 60)
                pause(500)
                Enemy_Guy.setVelocity(-120, -60)
                pause(500)
            }
        } else {
            Enemy_Guy = sprites.create(assets.image`Green 1`, SpriteKind.Enemy)
            Enemy_Guy.setPosition(160, randint(0, 12) * 10)
            Enemy_Guy.setVelocity(randint(-50, -150), 0)
            pause(randint(100, 1000))
        }
    }
    First_Boss()
}
sprites.onOverlap(SpriteKind.Boss, SpriteKind.Player, function (sprite, otherSprite) {
    game.gameOver(false)
})
function First_Boss () {
    music.play(music.createSong(hex`0078000408010404001c00100500640000041e000004000000000000000000000000000a040004240000000200010f04000600011208000a00010f0c000e00011210001200010f14001600011205001c000f0a006400f4010a0000040000000000000000000000000000000002120000000800011e08001000011e10001800011e07001c00020a006400f4016400000400000000000000000000000000000000032a000200030001220600070001220a000b0001220e000f0001221200130001221600170001221e001f00012208001c000e050046006603320000040a002d0000006400140001320002010002360000000200012004000600012008000a0001200c000e00012010001200012014001600012018001a0001201a001c0001191c001e000124`), music.PlaybackMode.LoopingInBackground)
    Boss_health = 5
    Enemy_Guy = sprites.create(assets.image`Boss`, SpriteKind.Boss)
    Enemy_Guy.setPosition(160, 60)
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    game.showLongText("The boss is here!", DialogLayout.Bottom)
    game.showLongText("He's immune to projectiles.", DialogLayout.Bottom)
    game.showLongText("Press B to destroy your projectiles.", DialogLayout.Bottom)
    game.showLongText("We must defeat him to save Earth!", DialogLayout.Bottom)
    Mission = "Defeat the boss"
    Enemy_Guy.setVelocity(-5, 0)
    while (info.score() != 40) {
        for (let index = 0; index < 4; index++) {
            projectile2 = sprites.createProjectileFromSprite(assets.image`BP`, Enemy_Guy, -60, -20)
            projectile2.setKind(SpriteKind.BP)
            pause(200)
        }
        pause(500)
        for (let index = 0; index < 4; index++) {
            projectile2 = sprites.createProjectileFromSprite(assets.image`BP`, Enemy_Guy, -60, 20)
            projectile2.setKind(SpriteKind.BP)
            pause(200)
        }
        pause(500)
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Spam > 4) {
        pause(300)
        Spam = 0
    } else if (Spam == 4) {
        if (randint(0, 5) == 5) {
            projectile = sprites.createProjectileFromSprite(assets.image`LazerBig`, Player, 60, 0)
            Spam = 9999
        } else {
            projectile = sprites.createProjectileFromSprite(assets.image`Lazer`, Player, 50, 0)
            pause(100)
            Spam += 1
        }
    } else {
        projectile = sprites.createProjectileFromSprite(assets.image`Lazer`, Player, 50, 0)
        pause(100)
        Spam += 1
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.BP, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    projectile2.setVelocity(60, 0)
    projectile2.setKind(SpriteKind.BP2)
})
function Enemy_AI () {
    while (info.score() < 30) {
        if (randint(1, 10) == 7) {
            Enemy_Guy = sprites.create(assets.image`Angry`, SpriteKind.Enemy)
            Enemy_Guy.setPosition(160, randint(2, 10) * 10)
            Enemy_Guy.setVelocity(-40, 0)
            pause(500)
            Enemy_Guy.setVelocity(0, 20)
            for (let index = 0; index < randint(4, 8); index++) {
                projectile2 = sprites.createProjectileFromSprite(assets.image`Lazer3`, Enemy_Guy, -60, 0)
                projectile2.setKind(SpriteKind.Enemy)
                pause(200)
            }
            Enemy_Guy.setVelocity(20, 0)
            pause(1000)
            sprites.destroy(Enemy_Guy)
            pause(100)
        } else if (randint(1, 10) == 1) {
            Enemy_Guy = sprites.create(assets.image`myImage`, SpriteKind.Enemy)
            Enemy_Guy.setPosition(160, randint(0, 12) * 10)
            Enemy_Guy.setVelocity(-210, 0)
        } else if (randint(1, 10) == 8) {
            for (let index = 0; index < 1; index++) {
                Enemy_Guy = sprites.create(assets.image`Octoguy`, SpriteKind.Enemy)
                Enemy_Guy.setPosition(160, randint(0, 12) * 10)
                Enemy_Guy.setVelocity(-100, 0)
                pause(1300)
                Enemy_Guy.setVelocity(-30, -32)
            }
            pause(100)
        } else if (randint(0, 100) > 95) {
            Enemy_Guy = sprites.create(assets.image`Pizza`, SpriteKind.Food)
            Enemy_Guy.setPosition(160, randint(0, 12) * 10)
            Enemy_Guy.setVelocity(randint(-25, -100), 0)
        } else {
            Enemy_Guy = sprites.create(assets.image`Green 1`, SpriteKind.Enemy)
            Enemy_Guy.setPosition(160, randint(0, 12) * 10)
            Enemy_Guy.setVelocity(randint(-15, -100), 0)
            pause(randint(100, 1000))
        }
    }
    First_Boss()
}
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    music.stopAllSounds()
    game.gameOver(false)
})
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    game.showLongText("Current mission: " + Mission, DialogLayout.Full)
})
sprites.onOverlap(SpriteKind.Boss, SpriteKind.BP2, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    Boss_health += -1
    Enemy_Guy.setImage(assets.image`BossH`)
    pause(200)
    Enemy_Guy.setImage(assets.image`Boss`)
    if (Boss_health == 0) {
        info.setScore(40)
        sprites.destroyAllSpritesOfKind(SpriteKind.Boss)
        sprites.destroyAllSpritesOfKind(SpriteKind.BP)
        sprites.destroyAllSpritesOfKind(SpriteKind.BP2)
        music.stopAllSounds()
        music.play(music.createSong(hex`0078000408030207001c00020a006400f401640000040000000000000000000000000000000003780004000600012c0c000e00012c14001600012c1c001e00012c24002600012c2c002e00012c34003600012c3c003e00012942004400011944004600011b46004800011d48004a00011e4a004c0001204c004e00011e4e005000011e50005200011d52005400011958005a0001195c005e00011d5e006000012408001c000e050046006603320000040a002d0000006400140001320002010002490000000400012a08000c00012a10001400012a18001c00012a20002400012728002c00012730003400012738003c00012240004200011d54005600011b5a005c00011b5e006000021e24`), music.PlaybackMode.LoopingInBackground)
        music.play(music.createSong(hex`0078000408020200001c00010a006400f4016400000400000000000000000000000000050000046c0000000200012402000400012404000600012406000800012408000c0001250c001000012210001400012514001800012218001c0001291c002000012c20002400011924002800012228002c00011b2c003000012030003400012234003800012c38003c00012a3c004000012908001c000e050046006603320000040a002d00000064001400013200020100020c00200030000119300040000122`), music.PlaybackMode.LoopingInBackground)
        Mission = "Have fun!"
        pause(5000)
        Endless()
    }
})
sprites.onOverlap(SpriteKind.Boss, SpriteKind.Projectile, function (sprite, otherSprite) {
    game.gameOver(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.BP, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    game.gameOver(false)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    otherSprite.startEffect(effects.spray)
    sprites.destroy(sprite)
    info.changeScoreBy(1)
})
let Spam = 0
let projectile2: Sprite = null
let Enemy_Guy: Sprite = null
let projectile: Sprite = null
let Player: Sprite = null
let Mission = ""
let Boss_health = 0
Boss_health = -1
Mission = "Kill 30 enemies"
scene.setBackgroundImage(img`
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4ffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffff5ffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff5ffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffff4fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff5fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffff5ffffffffffffffffffffffffffffffffffffffffffff4fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffff4fffffffffffffffffffffffffffffffff9fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4fffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4ffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff5fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9fffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff5fffffffffffffffffffffff
    fffffffffffffffffffff1fffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffff5ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4fffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffff5ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff5ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffff4fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9ffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff5ffffffffffffffffffffffffffffffffffffffff5ffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4fffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffff4fffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffff4fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff5fffffff1ffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffff9ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffff44ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9ffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff5ffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff5fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffff5ffffffffff4fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffff4fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff5ffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4ffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffff5fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffff4fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff5ffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffff
    ffffffffffffffffff9fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffff5ffffffffffffffffffffffffffffffffffffffffffffffffff5ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4fffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff5ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9fffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffff4ffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4ffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff5ffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff5fffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4fffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffff5fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff5fffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffff
    ffffffffffffffffffffffffffffffff1fffffffffffffff4fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff5fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff5ffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    `)
game.showLongText("Are You Ready?", DialogLayout.Bottom)
Player = sprites.create(assets.image`Player`, SpriteKind.Player)
Player.setPosition(16, 60)
controller.moveSprite(Player, 0, 100)
Player.setStayInScreen(true)
music.play(music.createSong(hex`0078000408020200001c00010a006400f4016400000400000000000000000000000000050000046c0000000200012402000400012404000600012406000800012408000c0001250c001000012210001400012514001800012218001c0001291c002000012c20002400011924002800012228002c00011b2c003000012030003400012234003800012c38003c00012a3c004000012908001c000e050046006603320000040a002d00000064001400013200020100020c00200030000119300040000122`), music.PlaybackMode.LoopingInBackground)
Enemy_AI()
forever(function () {
	
})
