export default class playBtn{
    constructor(assets){
        const play=new Laya.Image();
        play.texture=assets.url;
        play.width=Laya.stage.width*0.3;
        play.height=Laya.stage.width*0.18;
        play.x=Laya.stage.width*0.5;
        play.y=Laya.stage.height*0.75;
        play.anchorX=0.5;
        play.anchorY=0.5;
        play.alpha=0;
        Laya.stage.getChildByName('root').getChildByName('Scene2D').play=play;
        play.on('click',()=>{
            Laya.Tween.to(play,{scaleX:0.95,scaleY:0.95,duration:0.3},200,Laya.Ease.linearIn,Laya.Handler.create(this,()=>{
                this.hide();
                Laya.Tween.to(play,{scaleX:1,scaleY:1,duration:0.3},200,Laya.Ease.linearIn,Laya.Handler.create(this,()=>{
                    
                }));
            }))
        })
    }
    hide(){
        const title=Laya.stage.getChildByName('root').getChildByName('Scene2D').title;
        const play=Laya.stage.getChildByName('root').getChildByName('Scene2D').play;
        const shareBtn=Laya.stage.getChildByName('root').getChildByName('Scene2D').shareBtn;
        Laya.Tween.to(title,{scaleX:0.9,scaleY:0.9},150,Laya.Ease.linearIn,Laya.Handler.create(this,()=>{
            Laya.Tween.to(title,{y:-1*title.y},150,Laya.Ease.linearIn,Laya.Handler.create(this,()=>{
                Laya.stage.removeChild(title);
                Laya.stage.game.startGame();
            }))
        }))
        Laya.Tween.to(play,{y:play.y*2},300,Laya.Ease.linearIn,Laya.Handler.create(this,()=>{
            Laya.stage.removeChild(play);
        }))
        Laya.Tween.to(shareBtn,{y:shareBtn.y*2},300,Laya.Ease.linearIn,Laya.Handler.create(this,()=>{
            Laya.stage.removeChild(shareBtn);
        }))
    }
}