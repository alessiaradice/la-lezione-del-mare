let img_finale_corona; // img game over
let finale_corona; // oggetto game over

function preload(s) {
    console.log("Executing preload() - FINALE CORONA SCENE");

    img_finale_corona = PP.assets.image.load(s, "assets/images/finali/finale_corona.jpg"); // carico img finale_corona
}

function create(s) {
    console.log("Executing create() - FINALE CORONA SCENE");

    finale_corona = PP.assets.image.add(s, img_finale_corona, 0, 0, 0, 0); // creo finale_corona
}

function update(s) {
    console.log("Executing update() - FINALE CORONA SCENE");
}

function destroy(s) {
    console.log("Executing destroy() - FINALE CORONA SCENE");
}

PP.scenes.add("finale_corona_scene", preload, create, update, destroy);