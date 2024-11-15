import gsap from "gsap";
class title{
    constructor(res:any){
        const title=new Laya.Box();
        title.texture=res.url;
        title.anchorX=0.5;
        title.anchorY=0.5;
        title.width=Laya.stage.width/1.2;
        title.height=Laya.stage.width/6;
        title.x=Laya.stage.width/2;
        title.y=Laya.stage.height/5;
        title.scaleX=0;
        title.scaleY=0;
        Laya.stage.addChild(title);
        Laya.stage.getChildByName('root').getChildByName('Scene2D').title=title;
        gsap.to(title,{scaleX:1.2,scaleY:1.2,duration:0.3,onComplete(){
            gsap.to(title,{scaleX:0.8,scaleY:0.8,duration:0.3,onComplete(){
                gsap.to(title,{scaleX:1,scaleY:1,duration:0.3})
            }})
        }})
    }
}
export default title;