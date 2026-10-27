let img_manopola; // carico img manopola
let manopola; // carico l'oggetto manopola

function configure_manopola_animations(s) { // configuro le animazioni secondo le spritesheet
    PP.assets.sprite.animation_add(manopola, "stop", 0, 0, 5, -1); // animazione stop
    PP.assets.sprite.animation_add(manopola, "manopola_gira", 0, 1, 5, -1); // animazione rotate
    PP.assets.sprite.animation_play(manopola, "stop"); // fai partire l'animazione stop
}

function preload_manopola(s) {
    img_manopola = PP.assets.sprite.load_spritesheet(s, "assets/images/manopola_spritesheet.png", 87, 73); // carico img manopola
}

function create_manopola(s) {
    manopola = PP.assets.sprite.add(s, img_manopola, 3425, 205, 0, 0); // creo la manopola
    PP.physics.add(s, manopola, PP.physics.type.STATIC); // aggiungo la fisica statica alla manopola
}