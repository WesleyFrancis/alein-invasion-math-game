import gameUI from "../UIO/gameMap.js";

class Bullet{
    velocity=0;
    ScreenLocation=0;

    spawnBullet()
    {
        //Todo: spawn bullet at location and move it through the screen space.
        gameUI.CreateBullet();
    }

    removeBullet()
    {
        //todo: remove the bullet on "impact"

    }

}
export default Bullet