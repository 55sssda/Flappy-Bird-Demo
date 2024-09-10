class background{
    timeStatus:any=null;
    url:Array<any>=[];
    animate:boolean=false;
    constructor(...url:Array<any>){
        this.url=url;
        this.timeStatus=this.getTimeStatus();
        this.init();
        Laya.timer.frameLoop(1,this,this.#animate);
    }
    getTimeStatus(){
        return new Date().getHours()<18?'0':'1';
    }
    init(){
        const box=new Laya.Box();
        box.x=0;
        box.y=0;
        box.width=Laya.stage.width;
        box.height=Laya.stage.height;
        this.box=box;
        const picture=new Laya.Image();
        picture.texture=this.url[this.timeStatus];
        picture.x=0;
        picture.y=0;
        picture.width=box.width;
        picture.height=box.height;
        picture.zOrder=1;
        this.sprite=picture;
        const picture2=new Laya.Image();
        picture2.texture=this.url[this.timeStatus];
        picture2.x=picture.width;
        picture2.y=0;
        picture2.width=box.width;
        picture2.height=box.height;
        picture2.zOrder=1;
        this.sprite2=picture2;
        Laya.stage.getChildByName('root').getChildByName('Scene2D').box=this.box;
        Laya.stage.getChildByName('root').getChildByName('Scene2D').bg=this.sprite;
        Laya.stage.getChildByName('root').getChildByName('Scene2D').bg2=this.sprite2;
        box.addChild(picture);
        box.addChild(picture2);
        Laya.stage.addChild(box);
    }
    #animate(){
        if(this.animate){
            this.box.x-=1;
            if(this.box.x==Laya.stage.width*-1){
                this.box.x=0;
            }
        }
    }
}

export default background;