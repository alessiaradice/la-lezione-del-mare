let img_corona; 
let corona; 


function preload_corona(s) {
    img_corona = PP.assets.image.load(s, "assets/images/corona.png"); // carico img chiave
}

function create_corona(s) {
    corona = PP.assets.image.add(s, img_corona, 4078, 123, 0, 0); // creo la corona
    PP.physics.add(s, corona, PP.physics.type.STATIC); // aggiungo la fisica statica alla corona
}