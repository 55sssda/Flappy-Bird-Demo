class progress{
    constructor(...url:Array<any>){
        console.log(url);
        const bar=new Laya.ProgressBar();
        bar.skin=url[0].url;
        bar.anchorX=0.5;
        bar.anchorY=0.5;
        bar.x=Laya.stage.width/2;
        bar.y=Laya.stage.height/1.2;
        bar.width=500;
        bar.height=40;
        bar.value=0.3;
        Laya.stage.addChild(bar);
    }
}
export default progress;