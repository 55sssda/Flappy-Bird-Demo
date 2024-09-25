export default class shareBtn {
    constructor(item){
        const btn=new Laya.Image();
        btn.texture=item.url;
        btn.anchorX=0.5;
        btn.anchorY=0.5;
        btn.x=Laya.stage.width/2;
        btn.y=Laya.stage.height*0.88;
        btn.width=Laya.stage.width*0.3;
        btn.height=Laya.stage.width*0.18;
        btn.alpha=0;
        Laya.stage.getChildByName('root').getChildByName('Scene2D').shareBtn=btn;
        btn.on('click',()=>{
            Laya.Tween.to(btn,{scaleX:0.95,scaleY:0.95,duration:0.3},200,Laya.Ease.linearIn,Laya.Handler.create(this,()=>{
                Laya.Tween.to(btn,{scaleX:1,scaleY:1,duration:0.3},200,Laya.Ease.linearIn,Laya.Handler.create(this,()=>{

                }));
            }))
        })
    }
}