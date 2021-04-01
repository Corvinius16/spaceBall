class VKApi{

    constructor(bridge){
        this.vkbridge = bridge;
    }


    addToFavorite(){
        this.vkbridge.send("VKWebAppAddToFavorites");
    }
}
export {VKApi};
