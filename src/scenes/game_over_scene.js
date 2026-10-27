let img_game_over; // img game over
let game_over; // oggetto game over

function preload(s) {
    console.log("Executing preload() - GAME OVER SCENE");

    img_game_over = PP.assets.image.load(s, "assets/images/finali/finale_morte.jpg"); // carico img game_over
}

function create(s) {
    console.log("Executing create() - GAME OVER SCENE");

    game_over = PP.assets.image.add(s, img_game_over, 0, 0, 0, 0); // creo game_over
}

function update(s) {
    console.log("Executing update() - GAME OVER SCENE");
}

function destroy(s) {
    console.log("Executing destroy() - GAME OVER SCENE");
}

PP.scenes.add("game_over_scene", preload, create, update, destroy);