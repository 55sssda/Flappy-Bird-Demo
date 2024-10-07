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
        list.scrollType=Laya.ScrollType.Vertical;
        this.list=list;
        Laya.stage.addChild(list);
        Laya.stage.addChild(mask);
        mask.on('click',()=>{
            Laya.stage.removeChild(list);
            Laya.stage.removeChild(mask);
        })
        this.createItem();
    }
    createItem(){
        const item=new Laya.Box();
        item.width=this.list.width*0.95;
        item.height=130;
        item.x=this.list.width*0.025;
        item.y=10;
        // item.bgColor="red"
        this.list.addChild(item);
        const headerImage=new Laya.Image();
        headerImage.width=item.width*0.18;
        headerImage.height=headerImage.width;
        headerImage.anchorX=0;
        headerImage.anchorY=0.5;
        headerImage.y=item.height/2;
        headerImage.skin="http://gips0.baidu.com/it/u=3557606594,2640240494&fm=3028&app=3028&f=JPEG&fmt=auto?w=2048&h=2048"
        headerImage.graphics.drawRoundRect(0,0,headerImage.width,headerImage.height,10,10,10,10,"#fff");
        item.addChild(headerImage);
    }
}