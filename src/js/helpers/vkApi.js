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

    addToWall(rec){
        this.vkbridge.send("VKWebAppShowWallPostBox",{
            "message":`Мой рекорд ${rec}, сможешь ли ты его побить? `,
            "attachments":"photo226946259_457240119, https://vk.com/app7774807"
        })
    }
}
export {VKApi};
