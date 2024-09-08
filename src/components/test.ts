class test{
    constructor(res:any){
        const status=new Date().getHours()>=18?'3':'2';
        const bg=new Laya.Image();
        bg.texture=res[status].url;
        bg.x=0;
        bg.y=0;
        bg.zOrder=1;
        bg.width=Laya.stage.width;
        bg.height=Laya.stage.height;
        Laya.stage.addChild(bg);
        Laya.stage.getChildByName('root').getChildByName('Scene2D').bg=bg;
    }
    t(){
        // console.log(Laya);
    }
}

export default test;