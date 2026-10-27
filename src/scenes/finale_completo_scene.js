let img_finale_completo; // img game over
let finale_completo; // oggetto game over

function preload(s) {
    console.log("Executing preload() - FINALE COMPLETO SCENE");

    img_finale_completo = PP.assets.image.load(s, "assets/images/finali/finale_completo.jpg"); // carico img finale_completo
}

function create(s) {
    console.log("Executing create() - FINALE COMPLETO SCENE");

    finale_completo = PP.assets.image.add(s, img_finale_completo, 0, 0, 0, 0); // creo finale_completo
}

function update(s) {
    console.log("Executing update() - FINALE COMPLETO SCENE");
}

function destroy(s) {
    console.log("Executing destroy() - FINALE COMPLETO SCENE");
}

PP.scenes.add("finale_completo_scene", preload, create, update, destroy);