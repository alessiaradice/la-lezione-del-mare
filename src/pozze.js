let img_pozza_1; // carico img pozza 1
let img_pozza_2; // carico img pozza 2
let img_pozza_3; // carico img pozza 3

let pozza_1; // carico oggetto pozza 1
let pozza_2; // carico oggetto pozza 2
let pozza_3; // carico oggetto pozza 3

let curr_anim_pozza_1 = "pozza"; // questa variabile contiene l'animazione corrente
let curr_anim_pozza_2 = "pozza"; // questa variabile contiene l'animazione corrente
let curr_anim_pozza_3 = "pozza"; // questa variabile contiene l'animazione corrente

function configure_pozze(s) { // configuro le animazioni secondo lo spritesheet
    PP.assets.sprite.animation_add(pozza_1, "pozza", 0, 2, 5, -1); // animazione pozza
    PP.assets.sprite.animation_play(pozza_1, "pozza"); // fai partire l'animazione pozza

    PP.assets.sprite.animation_add(pozza_2, "pozza", 0, 2, 5, -1); // animazione pozza
    PP.assets.sprite.animation_play(pozza_2, "pozza"); // fai partire l'animazione pozza
   
    PP.assets.sprite.animation_add(pozza_3, "pozza", 0, 2, 5, -1); // animazione pozza
    PP.assets.sprite.animation_play(pozza_3, "pozza"); // fai partire l'animazione pozza
}

function preload_pozze(s) {
    img_pozza_1 = PP.assets.sprite.load_spritesheet(s, "assets/images/pozze/spritesheet_pozza_1.png", 183, 368); // carico spritesheet pozza 1
    img_pozza_2 = PP.assets.sprite.load_spritesheet(s, "assets/images/pozze/spritesheet_pozza_2.png", 164, 428); // carico spritesheet pozza 2
    img_pozza_3 = PP.assets.sprite.load_spritesheet(s, "assets/images/pozze/spritesheet_pozza_3.png", 212, 347); // carico spritesheet pozza 3
}

function create_pozze(s) {
    pozza_1 = PP.assets.sprite.add(s, img_pozza_1, 1745, 1026, 0, 0); // creo l'oggetto sprite pozza 1
    PP.physics.add(s, pozza_1, PP.physics.type.STATIC);
    PP.physics.set_collision_rectangle(pozza_1, // imposta una hitbox rettangolare più piccola dell'immagine
        156, 
        205,  
        10, 
        150,   
    );

    pozza_2 = PP.assets.sprite.add(s, img_pozza_2, 3938, 993, 0, 0); // creo l'oggetto sprite pozza 2
    PP.physics.add(s, pozza_2, PP.physics.type.STATIC);
    PP.physics.set_collision_rectangle(pozza_2, // imposta una hitbox rettangolare più piccola dell'immagine
        111, 
        245,  
        40, 
        165,   
    );

    pozza_3 = PP.assets.sprite.add(s, img_pozza_3, 545, 258, 0, 0); // creo l'oggetto sprite pozza 3
    PP.physics.add(s, pozza_3, PP.physics.type.STATIC);
    PP.physics.set_collision_rectangle(pozza_3, // imposta una hitbox rettangolare più piccola dell'immagine
        190, 
        114,  
        10, 
        215,   
    );
}