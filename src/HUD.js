let vita; // HUD vita
let fish; // HUD fish

let vita_01; // oggetto vita_01 HUD
let vita_02; // oggetto vita_02 HUD
let vita_03; // oggetto vita_03 HUD
let fish_count; // oggetto fish HUD
let bottiglia_raccolta_count; // oggetto bottiglia_raccolta HUD

let fish_count_text; // testo conteggio pesci HUD

function preload_HUD(s) {
    vita = PP.assets.image.load(s, "assets/images/HUD/vita_50x50.png"); // carico immagine vita HUD
    fish = PP.assets.image.load(s, "assets/images/HUD/fish!_50x50.png"); // carico immagune fish HUD
    bottiglia = PP.assets.image.load(s, "assets/images/HUD/bottiglia_raccolta_50x50.png"); // carico immagine bottiglia HUD
}

function create_HUD(s) {
    vita_01 = PP.assets.image.add(s, vita, 26, 26, 0, 0); // aggiunto la vita_01
    // imposto lo scroll factor, la vita_01 resta fissa nello schermo e rispetto ai movimenti di camera
    vita_01.tile_geometry.scroll_factor_x = 0;
    vita_01.tile_geometry.scroll_factor_y = 0;
 
    vita_02 = PP.assets.image.add(s, vita, 76, 26, 0, 0); // aggiungo la vita_02
    // imposto lo scroll factor, la vita_02 resta fissa nello schermo e rispetto ai movimenti di camera
    vita_02.tile_geometry.scroll_factor_x = 0;
    vita_02.tile_geometry.scroll_factor_y = 0;
 
    vita_03 = PP.assets.image.add(s, vita, 126, 26, 0, 0); // aggiungo la vita_03
    // imposto lo scroll factor, la vita_03 resta fissa nello schermo e rispetto ai movimenti di camera
    vita_03.tile_geometry.scroll_factor_x = 0;
    vita_03.tile_geometry.scroll_factor_y = 0;

    fish_count = PP.assets.image.add(s, fish, 206, 26, 0, 0); // aggiungo fish HUD
    // imposto lo scroll factor, fish HUD resta fisso nello schermo e rispetto ai movimenti di camera
    fish_count.tile_geometry.scroll_factor_x = 0;
    fish_count.tile_geometry.scroll_factor_y = 0;



    bottiglia_count_img = PP.assets.image.add(s, bottiglia, 330, 25, 0, 0);
    bottiglia_count_img.tile_geometry.scroll_factor_x = 0;
    bottiglia_count_img.tile_geometry.scroll_factor_y = 0;
}



