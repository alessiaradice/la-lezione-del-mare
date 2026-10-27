let img_yellow_fish; // carico lo spritesheet del yellow_fish
let yellow_fish; // carico l'oggetto sprite del yellow_fish

let img_fish_chiave; 
let fish_chiave; 

let img_fish_vita; 
let fish_vita; 

let curr_anim_yellow_fish = "stop"; // questa variabile contiene l'animazione corrente
let curr_anim_fish_chiave = "swim"; // questa variabile contiene l'animazione corrente
let curr_anim_fish_vita = "swim"; // questa variabile contiene l'animazione corrente



function configure_fish_animations(s) { // configuro le animazioni secondo le spritesheet

    //yellow_fish
    PP.assets.sprite.animation_add(yellow_fish, "swim", 0, 2, 5, -1); // animazione swim
    PP.assets.sprite.animation_add(yellow_fish, "morte", 3, 8, 5, 0); // animazione swim
    PP.assets.sprite.animation_play(yellow_fish, "swim"); // fai partire l'animazione swim

    //fish_chiave
    PP.assets.sprite.animation_add(fish_chiave, "swim", 5, 7, 5, -1); // animazione swim
    PP.assets.sprite.animation_add(fish_chiave, "liberazione", 3, 4, 5, 0); // animazione liberazione
    PP.assets.sprite.animation_add_list(fish_chiave, "liberazione_2", [0, 1, 2], 5, -1); // animazione liberazione
    PP.assets.sprite.animation_play(fish_chiave, "swim"); // fai partire l'animazione swim

    //fish_vita
    PP.assets.sprite.animation_add(fish_vita, "swim", 3, 5, 5, -1); // animazione swim
    PP.assets.sprite.animation_add(fish_vita, "liberazione", 6, 6, 5, 0); // animazione liberazione
    PP.assets.sprite.animation_add_list(fish_vita, "liberazione_2", [0, 1, 2], 5, -1); // animazione liberazione
    PP.assets.sprite.animation_play(fish_vita, "swim"); // fai partire l'animazione swim
}

function preload_fish(s) {
    img_yellow_fish = PP.assets.sprite.load_spritesheet(s, "assets/images/fishes/spritesheet_yellow_fish.png", 58.4, 51); // carico spritesheet yellow_fish
    img_fish_chiave = PP.assets.sprite.load_spritesheet(s, "assets/images/fishes/spritesheet_fish_chiave.png", 47.25, 45.5); 
    img_fish_vita = PP.assets.sprite.load_spritesheet(s, "assets/images/fishes/spritesheet_fish_vita.png", 43.75, 42); 
}

function create_fish(s) {
    yellow_fish = PP.assets.sprite.add(s, img_yellow_fish, 819, 1253, 0, 0); // creo l'oggetto sprite yellow_fish
    PP.physics.add(s, yellow_fish, PP.physics.type.STATIC); // aggiungo la fisica statica al yellow_fish

    fish_chiave = PP.assets.sprite.add(s, img_fish_chiave, 1361, 198, 0, 0); 
    PP.physics.add(s, fish_chiave, PP.physics.type.STATIC); 

    fish_vita = PP.assets.sprite.add(s, img_fish_vita, 3332, 1114, 0, 0); 
    PP.physics.add(s, fish_vita, PP.physics.type.STATIC); 
}