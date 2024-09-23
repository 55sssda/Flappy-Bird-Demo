export default class playBtn{
    constructor(assets){
        const play=new Laya.Image();
        play.texture=assets.url;
        play.width=Laya.stage.width*0.3;
        play.height=Laya.stage.width*0.15;
        play.x=Laya.stage.width*0.5;
        play.y=Laya.stage.height*0.8;
        play.anchorX=0.5;
        play.anchorY=0.5;
        Laya.stage.addChild(play);
        Laya.stage.getChildByName('root').getChildByName('Scene2D').play=play;
        play.on('click',()=>{
            Laya.Tween.to(play,{scaleX:0.95,scaleY:0.95,duration:0.3},200,Laya.Ease.linearIn,Laya.Handler.create(this,()=>{
                Laya.Tween.to(play,{scaleX:1,scaleY:1,duration:0.3},200,Laya.Ease.linearIn,Laya.Handler.create(this,()=>{
                  
                }));
            }))
        })
    }
}