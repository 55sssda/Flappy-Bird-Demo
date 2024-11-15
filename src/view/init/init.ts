import { bird as birdCom} from "./hook/bird.ts";
export default class init{
    fraction=0;
    constructor(birdTexture1,birdTexture2,footerTexture,tipsTexture,fractionList,pipeList,readyText,overText,pause,resume){
        this._this=this;
        this.birdTexture1=birdTexture1;
        this.birdTexture2=birdTexture2;
        this.footerTexture=footerTexture;
        this.tipsTexture=tipsTexture;
        this.fractionList=fractionList;
        this.pipeList=pipeList;
        this.readyText=readyText;
        this.overText=overText;
        this.pause=pause;
        this.resume=resume;
        this.initGame(birdTexture1,birdTexture2,footerTexture,tipsTexture,fractionList,pipeList,readyText,overText,pause,resume);
    }
    initGame(birdTexture1,birdTexture2,footerTexture,tipsTexture,fractionList,pipeList,readyText,overText,pause,resume){
        Laya.stage.getChildByName('root').getChildByName('Scene2D').Pipe=[];
        const btn=new Laya.Sprite();
        btn.texture=pause;
        btn.width=60;
        btn.height=btn.width;
        btn.anchorX=1;
        btn.zOrder=999999999;
        btn.x=Laya.stage.width-10;
        btn.y=10;
        btn.on('click',(e)=>{
            if(btn.texture==resume){
                return
            }
            const mask=new Laya.Box();
            mask.bgColor="rgba(0,0,0,0.35)";
            mask.width=Laya.stage.width;
            mask.height=Laya.stage.height;
            mask.zOrder=99999999999;
            const box=new Laya.Box();
            box.width=600;
            box.height=400;
            box.x=0;
            box.y=0;
            box.centerX=0.5;
            box.centerY=0.5;
            box.graphics.drawRoundRect(0,0,box.width,box.height,10,10,10,10,"#fff");
            mask.addChild(box);
            const fraction=this.getFraction();
            fraction.centerX=0.5;
            fraction.y=20;
            box.addChild(fraction);
            const text=new Laya.Text();
            text.text="当前分数";
            text.fontSize=48;
            text.color="#999";
            text.anchorX=0.5;
            text.x=box.width/2;
            text.y=fraction.y+fraction.height+10;
            text.bold=true;
            box.addChild(text);
            const resetBtn=new Laya.Box();
            resetBtn.width=box.width*0.6;
            resetBtn.height=90;
            resetBtn.centerX=0.5;
            resetBtn.y=fraction.y+text.y+80;
            resetBtn.graphics.drawRoundRect(0,0,resetBtn.width,resetBtn.height,10,10,10,10,"#da5e18");
            const resetText=new Laya.Text();
            resetText.text="重新开始";
            resetText.fontSize=42;
            resetText.color="#fff";
            resetText.anchorX=0.5;
            resetText.anchorY=0.5;
            resetText.x=resetBtn.width/2;
            resetText.y=resetBtn.height/2;
            resetText.bold=true;
            resetBtn.addChild(resetText);
            box.addChild(resetBtn);
            resetBtn.on('click',()=>{
                Laya.stage.removeChild(mask);
                Laya.stage.removeChild(box);
                this.resetGame();
            });
            btn.texture=resume;
            Laya.timer.pause();
            Laya.stage.addChild(mask);
            mask.on('click',(e)=>{
                Laya.stage.removeChild(mask);
                btn.texture=pause;
                Laya.timer.resume();
                e.stopPropagation();
            })
            e.stopPropagation();
        })
        Laya.stage.getChildByName('root').getChildByName('Scene2D').btn=btn;
        this.tipsTexture=tipsTexture;
        this.fractionList=fractionList;
        this.pipeList=pipeList;
        let timeType=this.getType();
        let skin=[];
        if(timeType=='1'){
            skin=birdTexture1;
        }else{
            skin=birdTexture2;
        }
        const ready=new Laya.Image();
        ready.skin=readyText.url;
        ready.width=Laya.stage.width*0.6;
        ready.height=Laya.stage.width*0.2;
        ready.anchorX=0.5;
        ready.anchorY=0.5;
        ready.centerX=0;
        ready.y=Laya.stage.width*0.4;
        ready.alpha=0;
        Laya.stage.getChildByName('root').getChildByName('Scene2D').ready=ready;
        const bird=new Laya.Animation();
        bird.startTap=-1;
        bird.loadImages([skin[0].url,skin[1].url,skin[2].url]);
        bird.index=0;
        bird.loop=true;
        bird.autoPlay=true;
        bird.autoSize=true;
        bird.y=Laya.stage.height*0.3;
        bird.anchorX=0.5;
        bird.anchorY=0.5;
        bird.scaleX=2;
        bird.scaleY=2;

        bird.addComponent(birdCom);
        bird.on(Laya.Event.TRIGGER_ENTER,(e)=>{
            if(e.owner.nodeType=='1'){
                Laya.stage.removeChild(Laya.stage.getChildByName('root').getChildByName('Scene2D').fractionBox);
                this.fraction++;
                this.setFraction(true);
            }else if(e.owner.nodeType=='0'){
                Laya.stage.removeChild(btn);
                const mask=new Laya.Box();
                mask.width=Laya.stage.width;
                mask.height=Laya.stage.height;
                mask.bgColor="rgba(0,0,0,0.35)";
                mask.zOrder=9999999999999999;
                Laya.stage.addChild(mask);
                const card=new Laya.Box();
                card.width=Laya.stage.width*0.9;
                card.height=Laya.stage.height*0.3;
                card.graphics.drawRoundRect(0,0,card.width,card.height,10,10,10,10,"#fff");
                card.centerX=0.5;
                card.y=400;
                card.alpha=0;
                card.scaleX=0.75;
                card.scaleY=0.75;
                mask.addChild(card);
                Laya.Tween.to(card,{alpha:1,scaleX:1,scaleY:1},100,Laya.Ease.linearIn,Laya.Handler.create(this,()=>{ Laya.timer.pause();}))
                const img=new Laya.Image();
                img.skin=overText.url;
                img.width=card.width*0.8;
                img.height=img.width*0.3;
                img.centerX=0.5;
                img.y=-70;
                card.addChild(img);
                const fraction1=new Laya.Box();
                fraction1.anchorX=0.5;
                fraction1.anchorY=0.5;
                fraction1.x=card.width*0.12;
                fraction1.y=card.height*0.25;
                const now_fraction=this.getFraction(50,100);
                const fraction1_text=new Laya.Text();
                fraction1_text.text="当前分数";
                fraction1_text.bold=true;
                fraction1_text.fontSize=46;
                fraction1_text.color="#898989";
                fraction1_text.anchorX=0.5;
                fraction1_text.anchorY=0.5;
                fraction1_text.x=now_fraction.width/2;
                fraction1_text.y=now_fraction.y+now_fraction.height+30;
                fraction1.addChild(now_fraction);
                fraction1.addChild(fraction1_text);
                card.addChild(fraction1);
                const fraction2=new Laya.Box();
                fraction2.anchorX=0.5;
                fraction2.anchorY=0.5;
                fraction2.x=card.width*0.69;
                fraction2.y=card.height*0.25;
                const max_fraction=this.getFraction(50,100,999);
                const fraction2_text=new Laya.Text();
                fraction2_text.text="最高分数";
                fraction2_text.bold=true;
                fraction2_text.fontSize=46;
                fraction2_text.color="#898989";
                fraction2_text.anchorX=0.5;
                fraction2_text.anchorY=0.5;
                fraction2_text.x=max_fraction.width/2;
                fraction2_text.y=max_fraction.y+max_fraction.height+30;
                fraction2.addChild(max_fraction);
                fraction2.addChild(fraction2_text);
                card.addChild(fraction2);

                const resetBtn=new Laya.Box();
                resetBtn.width=card.width*0.8;
                resetBtn.height=90;
                resetBtn.centerX=0.5;
                resetBtn.y=fraction1.y+fraction1.height+30;
                resetBtn.graphics.drawRoundRect(0,0,resetBtn.width,resetBtn.height,10,10,10,10,"#da5e18");
                const resetText=new Laya.Text();
                resetText.text="重新开始";
                resetText.fontSize=42;
                resetText.color="#fff";
                resetText.anchorX=0.5;
                resetText.anchorY=0.5;
                resetText.x=resetBtn.width/2;
                resetText.y=resetBtn.height/2;
                resetText.bold=true;
                resetBtn.addChild(resetText);
                card.addChild(resetBtn);
                const showBtn=new Laya.Box();
                showBtn.width=card.width*0.8;
                showBtn.height=90;
                showBtn.centerX=0.5;
                showBtn.y=resetBtn.y+resetBtn.height+30;
                showBtn.graphics.drawRoundRect(0,0,showBtn.width,showBtn.height,10,10,10,10,"#da5e18");
                const showText=new Laya.Text();
                showText.text="返回主页";
                showText.fontSize=42;
                showText.color="#fff";
                showText.anchorX=0.5;
                showText.anchorY=0.5;
                showText.x=showBtn.width/2;
                showText.y=showBtn.height/2;
                showText.bold=true;
                showBtn.addChild(showText);
                // card.addChild(showBtn);
                resetBtn.on('click',()=>{
                    Laya.stage.removeChild(mask);
                    Laya.stage.removeChild(card);
                    this.resetGame();
                });
            }
        })
        bird.birdRigidBody=bird.addComponent(Laya.RigidBody);
        bird.birdRigidBody.type="static";
        bird.birdRigidBody.allowSleep=false;
        bird.birdCollider=bird.addComponent(Laya.CircleCollider);
        bird.birdCollider.radius=bird.width/3.5;
        bird.birdCollider.restitution=0.5;

        Laya.stage.getChildByName('root').getChildByName('Scene2D').bird=bird;
        const footer=new Laya.Box();
        footer.width=Laya.stage.width;
        footer.height=300;
        footer.anchorY=1;
        footer.x=0;
        
        const footerSkin1=new Laya.Sprite();
        footerSkin1.width=footer.width;
        footerSkin1.height=footer.height;
        footerSkin1.x=0;
        footerSkin1.y=0;
        footerSkin1.texture=footerTexture;
        footer.addChild(footerSkin1);
        const footerSkin2=new Laya.Sprite();
        footerSkin2.width=footer.width;
        footerSkin2.height=footer.height;
        footerSkin2.x=footerSkin1.width;
        footerSkin2.y=0;
        footerSkin2.texture=footerTexture;
        footer.addChild(footerSkin2);
        const line=new Laya.Box();
        line.nodeType="0";
        line.width=footer.width*2;
        line.height=footer.height;
        line.x=0;
        line.y=0
        const lineRigidBody=line.addComponent(Laya.RigidBody);
        lineRigidBody.type="static";
        const lineCollider=line.addComponent(Laya.BoxCollider);
        lineCollider.width=line.width;
        lineCollider.height=line.height;
        footer.addChildren(line);
        Laya.stage.getChildByName('root').getChildByName('Scene2D').footer=footer;
    }
    getType(){
        return new Date().getHours()<18?'0':'1';
    }
    startGame(){
        const bird=Laya.stage.getChildByName('root').getChildByName('Scene2D').bird;
        const footer=Laya.stage.getChildByName('root').getChildByName('Scene2D').footer;
        const ready=Laya.stage.getChildByName('root').getChildByName('Scene2D').ready;
        const btn=Laya.stage.getChildByName('root').getChildByName('Scene2D').btn;
        this.setFraction(false);
        Laya.stage.addChild(bird);
        Laya.stage.addChild(footer);
        Laya.stage.addChild(btn);
        bird.x=bird.width*-1;
        Laya.Tween.to(bird,{x:120},650,Laya.Ease.linearIn,Laya.Handler.create(this,()=>{
            const tips=new Laya.Image();
            tips.skin=this.tipsTexture.url;
            tips.width=250;
            tips.height=200;
            tips.centerX=0;
            tips.centerY=0;
            tips.alpha=0;
            Laya.stage.addChild(tips);
            Laya.stage.addChild(ready);
            this.alpha(tips);
            this.alpha(ready);
            Laya.stage.on('click',()=>{
                bird.birdRigidBody.type="dynamic";
                if(bird.startTap==-1){
                    Laya.stage.removeChild(tips);
                    Laya.stage.removeChild(ready);
                    Laya.timer.once(0,this,this.createPipe)
                    Laya.timer.loop(7000,this,this.createPipe);
                }
                let direction=new Laya.Vector2(bird.x,bird.y);
                let force=new Laya.Vector2(0,-250);
                bird.birdRigidBody.applyForce(direction,force);
                bird.startTap++;
            })
        }))
        footer.y=Laya.stage.height*2;
        Laya.Tween.to(footer,{y:Laya.stage.height},650,Laya.Ease.linearIn,Laya.Handler.create(this,()=>{
            Laya.timer.frameLoop(1,this,()=>{
                footer.x-=1;
                if(footer.x==footer.width*-1){
                    footer.x=0;
                }
            });
        }))
    }
    alpha(node) {
        Laya.Tween.to(node,{alpha:0},300,Laya.Ease.linearIn,Laya.Handler.create(this,()=>{
            Laya.Tween.to(node,{alpha:1},300,Laya.Ease.linearIn,Laya.Handler.create(this,()=>{
                Laya.Tween.to(node,{alpha:0},300,Laya.Ease.linearIn,Laya.Handler.create(this,()=>{
                    this.alpha(node);
                }))
            }))
        }))
    }
    setFraction(boolean=false){
        Laya.stage.getChildByName('root').getChildByName('Scene2D').fractionBox=new Laya.Box();
        Laya.stage.getChildByName('root').getChildByName('Scene2D').fractionBox.zOrder=999;
        Laya.stage.getChildByName('root').getChildByName('Scene2D').fractionBox.x=10;
        Laya.stage.getChildByName('root').getChildByName('Scene2D').fractionBox.y=10;
        for(let i=0;i<=Laya.stage.getChildByName('root').getChildByName('Scene2D').fractionBox._children.length-1;i++){
            Laya.stage.getChildByName('root').getChildByName('Scene2D').fractionBox.removeChild(Laya.stage.getChildByName('root').getChildByName('Scene2D').fractionBox._children[i]);
        }
        let text=(this.fraction<10?'0'+this.fraction:String(this.fraction)).split("");
        for(let i=0;i<=text.length-1;i++){
            const font=new Laya.Image();
            font.x=i*50+i*5;
            font.width=50;
            font.height=100;
            font.alpha=!boolean?1:0;
            font.skin=this.fractionList[text[i]].url;
            if(boolean){
                font.scaleX=1.2;
                font.scaleY=1.2;
                Laya.Tween.to(font,{alpha:1,scaleX:1,scaleY:1},300,Laya.Ease.linearIn,Laya.Handler.create(this,()=>{
                    
                }))
            }
            Laya.stage.getChildByName('root').getChildByName('Scene2D').fractionBox.addChild(font);
        }
        Laya.stage.addChild(Laya.stage.getChildByName('root').getChildByName('Scene2D').fractionBox);
    }
    getFraction(sizeX=80,sizeY=130,num=this.fraction){
        const fractionBox=new Laya.Box();
        let text=(num<10?'0'+num:String(num)).split("");
        for(let i=0;i<=text.length-1;i++){
            const font=new Laya.Image();
            font.x=i*sizeX+i*5;
            font.width=sizeX;
            font.height=sizeY;
            font.skin=this.fractionList[text[i]].url;
            fractionBox.addChild(font);
        }
        return fractionBox;
    }
    createPipe(){
        const bird=Laya.stage.getChildByName('root').getChildByName('Scene2D').bird;
        const footer=Laya.stage.getChildByName('root').getChildByName('Scene2D').footer;
        let pipe=this.getType()=='1'?[this.pipeList[2],this.pipeList[3]]:[this.pipeList[0],this.pipeList[1]];
        const bottomDot=Laya.stage.height-footer.height;
        const Box=new Laya.Box();
        Box.width=50;
        Box.height=bottomDot;
        Box.x=Laya.stage.width;
        Box.y=0;
        const maxLength=bottomDot-bird.height*4;
        const downPipe=new Laya.Sprite();
        downPipe.nodeType="0";
        downPipe.texture=pipe[0];
        downPipe.width=Box.width;
        downPipe.height=Math.random() * (maxLength - 100 + 1) + 100;
        downPipe.x=0;
        downPipe.y=0;
        const downPipe_rightBody=downPipe.addComponent(Laya.RigidBody);
        downPipe_rightBody.type="static";
        const downPipe_Collider=downPipe.addComponent(Laya.BoxCollider);
        downPipe_Collider.width=downPipe.width;
        downPipe_Collider.height=downPipe.height;
        Box.addChild(downPipe);
        const upPipe=new Laya.Sprite();
        upPipe.nodeType="0";
        upPipe.texture=pipe[1];
        upPipe.width=Box.width;
        upPipe.height=Math.random() * ((maxLength-downPipe.height) - 100 + 1) + 100;
        upPipe.x=0;
        upPipe.anchorY=1;
        upPipe.y=Box.height;
        const upPipe_rightBody=upPipe.addComponent(Laya.RigidBody);
        upPipe_rightBody.type="static";
        const upPipe_Collider=upPipe.addComponent(Laya.BoxCollider);
        upPipe_Collider.width=upPipe.width;
        upPipe_Collider.height=upPipe.height;
        Box.addChild(upPipe);
        const line=new Laya.Box();
        line.nodeType="1";
        line.width=1;
        line.height=Box.height;
        line.x=Box.width;
        line.y=0;
        const line_rightBody=line.addComponent(Laya.RigidBody);
        line_rightBody.type="static";
        const line_Collider=line.addComponent(Laya.BoxCollider);
        line_Collider.width=line.width;
        line_Collider.height=line.height;
        line_Collider.isSensor=true;
        Box.addChild(line);
        Laya.stage.addChild(Box);
        Laya.stage.getChildByName('root').getChildByName('Scene2D').Pipe.push(Box);
        Laya.timer.loop(1,this,()=>{
            Box.x-=1;
        });
    }
    resetGame(){
        const bird=Laya.stage.getChildByName('root').getChildByName('Scene2D').bird;
        const footer=Laya.stage.getChildByName('root').getChildByName('Scene2D').footer;
        for(let i=0;i<=Laya.stage.getChildByName('root').getChildByName('Scene2D').Pipe.length-1;i++){
            Laya.stage.removeChild(Laya.stage.getChildByName('root').getChildByName('Scene2D').Pipe[i]);
        }
        const fractionBox=Laya.stage.getChildByName('root').getChildByName('Scene2D').fractionBox;
        Laya.timer.clearAll(this);
        Laya.stage.removeChild(bird);
        Laya.stage.removeChild(footer);
        Laya.stage.removeChild(fractionBox);
        Laya.timer.resume();
        this.fraction=0;
        this.initGame(this.birdTexture1,this.birdTexture2,this.footerTexture,this.tipsTexture,this.fractionList,this.pipeList,this.readyText,this.overText,this.pause,this.resume);
        this.startGame();
    }
}