let img_rete_1; 
let rete_1;

let curr_anim_rete_1 = "still"; // questa variabile contiene l'animazione corrente

function configure_reti_animations(s) { // configuro le animazioni secondo lo spritesheet
    PP.assets.sprite.animation_add(rete_1, "still", 0, 1, 3, -1); // animazione still
    // PP.assets.sprite.animation_play(rete_1, "still"); // fai partire l'animazione still
}

function preload_reti(s) {
    img_rete_1 = PP.assets.sprite.load_spritesheet(s, "assets/images/spritesheet_rete1.png", 273, 272); // carico spritesheet rete1
}

function create_reti(s) {
    rete_1 = PP.assets.sprite.add(s, img_rete_1, 1490, 510, 0, 0); 
    PP.physics.add(s, rete_1, PP.physics.type.STATIC);

    PP.physics.set_collision_rectangle(rete_1, // imposta una hitbox rettangolare più piccola dell'immagine
        157,  // width
        125,  // height
        55,  // offset X: sposta la hitbox di 2 px a destra
        90    // offset Y: sposta la hitbox di 0 px in basso
    );

}