class VKApi{

    constructor(bridge){
        this.vkbridge = bridge;
    }


    addToFavorite(){
        this.vkbridge.send("VKWebAppAddToFavorites");
    }
    inviteFriends(){
        this.vkbridge.send("VKWebAppShowInviteBox");
    }
}
export {VKApi};
