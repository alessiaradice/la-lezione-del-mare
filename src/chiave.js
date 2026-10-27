let img_chiave; // carico img chiave
let chiave; // carico l'oggetto chiave

function preload_chiave(s) {
    img_chiave = PP.assets.image.load(s, "assets/images/chiave.png"); // carico img chiave
}

function create_chiave(s) {
    chiave = PP.assets.image.add(s, img_chiave, 1367, 213, 0, 0); // creo la chiave
    PP.physics.add(s, chiave, PP.physics.type.STATIC); // aggiungo la fisica statica alla chiave
}