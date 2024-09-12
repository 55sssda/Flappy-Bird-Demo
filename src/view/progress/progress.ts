class progress{
    constructor(...url:Array<any>){
        const bar=new Laya.ProgressBar();
        bar.skin=url[0].url;
        bar.anchorX=0.5;
        bar.anchorY=0.5;
        bar.x=Laya.stage.width/2;
        bar.y=Laya.stage.height/1.2;
        bar.width=Laya.stage.width*0.8;
        bar.height=Laya.stage.width*0.04;
        bar.value=0;
        Laya.stage.addChild(bar);
        Laya.stage.getChildByName('root').getChildByName('Scene2D').progress=bar;
    }
}
export default progress;