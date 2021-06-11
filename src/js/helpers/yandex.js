class YandexApi{
    constructor(){
        let thisObj = this;
        YaGames
        .init({
            adv: {
                onAdvClose: wasShown => {
                      console.info('adv closed!');
                }
            }
        })
        .then(ysdk => {
            thisObj.yandex = ysdk;
            // ...
        });
        if(thisObj.yandex != undefined)
        {
            this.initPlayer(thisObj).catch(err => {
                // Игрок не авторизован, выбрасывает исключение USER_NOT_AUTHORIZED.
            
                thisObj.yandex.auth.openAuthDialog().then(() => {
                        // Игрок успешно авторизован, теперь объект Player будет инициализирован.
                        thisObj.initPlayer(thisObj);
                    }).catch(() => {
                        // Игрок не авторизован.
                    });
                
            });
        }

    }

    initPlayer(apiObj) {
      
        return apiObj.yandex.getPlayer().then(_player => {
                // Игрок авторизован.
                apiObj.player = _player;
            });
        
    }

    showAds(){
        this.yandex.adv.showFullscreenAdv({
            callbacks: {
                onClose: function(wasShown) {
                // some action after close
                },
                onError: function(error) {
            // some action on error
                }
            }
        });
    }



}

export {YandexApi}