export default class progressText{
    text:any=null;
    constructor(){
        this.text=new Laya.Text();
        this.text.text="0%";
        this.text.fontSize=50;
        this.text.color="#fff";
        this.text.anchorX=0.5;
        this.text.anchorY=0.5;
        this.text.x=Laya.stage.width/2;
        this.text.y=Laya.stage.height*0.86;
        this.text.bold=true;
        this.text.width=Laya.stage.width;
        this.text.align="center";
        Laya.stage.addChild(this.text);
        Laya.stage.getChildByName('root').getChildByName('Scene2D').progressText=this.text;
    }
    setValue(p){
        let text=Math.floor((p*100)*100)/100;
        this.text.text=`${text}%`;
        Laya.stage.getChildByName('root').getChildByName('Scene2D').progress.value=p;
    }
}