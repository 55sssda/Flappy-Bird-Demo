export default class shareBtn {
    constructor(item){
        const btn=new Laya.Image();
        btn.texture=item.url;
        btn.anchorX=0.5;
        btn.anchorY=0.5;
        btn.x=Laya.stage.width/2;
        btn.y=Laya.stage.height*0.85;
        btn.width=Laya.stage.width*0.3;
        btn.height=Laya.stage.width*0.18;
        btn.alpha=0;
        Laya.stage.getChildByName('root').getChildByName('Scene2D').shareBtn=btn;
        btn.on('click',()=>{
            Laya.Tween.to(btn,{scaleX:0.95,scaleY:0.95},100,Laya.Ease.linearIn,Laya.Handler.create(this,()=>{
                Laya.Tween.to(btn,{scaleX:1,scaleY:1},100,Laya.Ease.linearIn,Laya.Handler.create(this,()=>{
                    this.createRanking();
                }));
            }))
        })
    }
    createRanking(){
        const mask=new Laya.Box();
        mask.bgColor="#333333";
        mask.width=Laya.stage.width;
        mask.height=Laya.stage.height;
        mask.x=0;
        mask.y=0;
        mask.alpha=0.68;
        mask.zOrder=9999998;
        const list=new Laya.Panel();
        list.width=Laya.stage.width*0.8;
        list.height=Laya.stage.height*0.5;
        list.anchorX=0.5;
        list.anchorY=0.5;
        list.x=Laya.stage.width*0.5;
        list.y=Laya.stage.height*0.45;
        list.zOrder=9999999;
        list.graphics.drawRoundRect(0,0,list.width,list.height,10,10,10,10,"#fff");

        list.vScrollBarSkin="atlas/comp/vslider.png"
        const image=new Laya.Image();
        image.skin="resources/bg_night.png"
        image.width=500;
        image.height=1200;
        list.addChild(image);
        Laya.stage.addChild(list);
        Laya.stage.addChild(mask);
    }
}