export default class shareBtn {
    userdata=[
        {
            pic:"http://gips0.baidu.com/it/u=3557606594,2640240494&fm=3028&app=3028&f=JPEG&fmt=auto?w=2048&h=2048",
            value:"5",
            name:"昵称111"
        },
        {
            pic:"http://gips0.baidu.com/it/u=3557606594,2640240494&fm=3028&app=3028&f=JPEG&fmt=auto?w=2048&h=2048",
            value:"15",
            name:"昵称33"
        },
        {
            pic:"http://gips0.baidu.com/it/u=3557606594,2640240494&fm=3028&app=3028&f=JPEG&fmt=auto?w=2048&h=2048",
            value:"35",
            name:"昵称4444"
        },
        {
            pic:"http://gips0.baidu.com/it/u=3557606594,2640240494&fm=3028&app=3028&f=JPEG&fmt=auto?w=2048&h=2048",
            value:"45",
            name:"昵称5555"
        },
        {
            pic:"http://gips0.baidu.com/it/u=3557606594,2640240494&fm=3028&app=3028&f=JPEG&fmt=auto?w=2048&h=2048",
            value:"12",
            name:"昵称6666"
        },
        {
            pic:"http://gips0.baidu.com/it/u=3557606594,2640240494&fm=3028&app=3028&f=JPEG&fmt=auto?w=2048&h=2048",
            value:"23",
            name:"昵称77777"
        },
        {
            pic:"http://gips0.baidu.com/it/u=3557606594,2640240494&fm=3028&app=3028&f=JPEG&fmt=auto?w=2048&h=2048",
            value:"24",
            name:"昵称8888"
        },
        {
            pic:"http://gips0.baidu.com/it/u=3557606594,2640240494&fm=3028&app=3028&f=JPEG&fmt=auto?w=2048&h=2048",
            value:"39",
            name:"昵称9999"
        }
    ]
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
        list.graphics.drawRoundRect(0,0,list.width,list.height,15,15,15,15,"#fff");
        list.scrollType=Laya.ScrollType.Vertical;
        this.list=list;
        Laya.stage.addChild(list);
        Laya.stage.addChild(mask);
        mask.on('click',()=>{
            Laya.stage.removeChild(list);
            Laya.stage.removeChild(mask);
        })
        for(let i=0;i<=this.userdata.length-1;i++){
            this.createItem((i*130)+10,this.userdata[i]);
        }
        
    }
    createItem(y=10,user:any){
        const item=new Laya.Box();
        item.width=this.list.width*0.92;
        item.height=130;
        item.y=y;
        item.centerX=0;
        this.list.addChild(item);
        //创建头像
        const headerImage=new Laya.Image();
        headerImage.width=item.width*0.18;
        headerImage.height=headerImage.width;
        headerImage.anchorX=0;
        headerImage.anchorY=0.5;
        headerImage.y=item.height/2;
        headerImage.skin=user.pic;
        const mask=new Laya.Sprite();
        mask.graphics.drawRoundRect(0,0,headerImage.width,headerImage.height,20,20,20,20,"#fff");
        headerImage.mask=mask;
        item.addChild(headerImage);
        //创建用户昵称
        const name=new Laya.Label();
        name.text=user.name;
        name.fontSize=34;
        name.bold=true;
        name.color="#999"
        name.anchorY=0.5;
        name.y=item.height/2;
        name.x=headerImage.width+20;
        item.addChild(name);
        //创建用户分数
        const strArray=String(user.value).split("").reverse();
        const MAP={
            "0":"resources/font_048.png",
            "1":"resources/font_049.png",
            "2":"resources/font_050.png",
            "3":"resources/font_051.png",
            "4":"resources/font_052.png",
            "5":"resources/font_053.png",
            "6":"resources/font_054.png",
            "7":"resources/font_055.png",
            "8":"resources/font_056.png",
            "9":"resources/font_057.png",
        }
        for(let i=0;i<=strArray.length-1;i++){
            const numImage=new Laya.Image();
            numImage.skin=MAP[strArray[i]];
            numImage.width=40;
            numImage.height=item.height*0.6;
            numImage.anchorY=0.5;
            numImage.y=item.height/2;
            numImage.x=item.width-numImage.width*0.8-(numImage.width*(i+i*0.1));
            item.addChild(numImage);
        }
    }
}