let img_getto_tubo; // carico lo spritesheet del getto_tubo
let getto_tubo; // carico l'oggetto sprite del getto tubo

let img_tubo;
let tubo;

let curr_anim_getto_tubo = "getto"; // questa variabile contiene l'animazione corrente

function configure_tubo_animations(s) { // configuro le animazioni secondo lo spritesheet
    PP.assets.sprite.animation_add(getto_tubo, "getto", 0, 1, 4, -1); // animazione getto
    PP.assets.sprite.animation_play(getto_tubo, "getto"); // fai partire l'animazione getto
}

function preload_tubo(s) {
    img_getto_tubo = PP.assets.sprite.load_spritesheet(s, "assets/images/spritesheet_getto_tubo.png", 67.6, 71); // carico spritesheet getto tubo
    img_tubo = PP.assets.image.load(s, "assets/images/tubo.png"); // carico img tubo
}

function create_tubo(s) {
    getto_tubo = PP.assets.sprite.add(s, img_getto_tubo, 4011, 60, 0, 0); // creo l'oggetto sprite getto tubo
    PP.physics.add(s, getto_tubo, PP.physics.type.STATIC); // aggiungo la fisica statica al getto tubo
    PP.physics.set_collision_rectangle(getto_tubo, // imposta una hitbox rettangolare più piccola dell'immagine
        40,  // width
        57,  // height
        18,  // offset X
        8    // offset Y
    );

    tubo = PP.assets.image.add(s, img_tubo, 4034, 30, 0, 0); // creo il tubo
    PP.physics.add(s, tubo, PP.physics.type.STATIC); // aggiungo la fisica statica al tubo
}