const { regClass } = Laya;
import { LoadingBase } from "./Loading.generated";
import background from "./view/background/background";
import progress from "./view/progress/progress";
import progressText from "./view/progress/text";
import title from "./view/title/title";
import playBtn from "./view/playBtn/playBtn";
import shareBtn from "./view/shareBtn/shareBtn";
import assets from "./map/assets";
import init from "./view/init/init";
@regClass()
export class Loading extends LoadingBase {
    onAwake(): void {
        Laya.loader.load(["resources/progress.png","resources/progress$bar.png","resources/bg_day.png","resources/bg_night.png","resources/title.png"]).then((res)=>{
            let bg=new background(res[2],res[3]);
            new progress(res[0],res[1]);
            let progressObject=new progressText();
            new title(res[4]);
            bg.animate=true;
            Laya.loader.load(assets,Laya.loader.IMAGE,(p)=>{
                progressObject.setValue(p);
            }).then((assetsResult)=>{
                progressObject.setValue(1);
                Laya.Tween.to(this.progress,{alpha:0},300,Laya.Ease.elasticOutm,Laya.Handler.create(this,()=>{
                    Laya.stage.removeChild(this.progress);
                }))
                Laya.Tween.to(this.progressText,{alpha:0},300,Laya.Ease.elasticOutm,Laya.Handler.create(this,()=>{
                    Laya.stage.removeChild(this.progressText);
                }))
                Laya.stage.game=new init(
                    [assetsResult[12],assetsResult[13],assetsResult[14]],
                    [assetsResult[15],assetsResult[16],assetsResult[17]],
                    assetsResult[18],
                    assetsResult[19],
                    [assetsResult[2],assetsResult[3],assetsResult[4],assetsResult[5],assetsResult[6],assetsResult[7],assetsResult[8],assetsResult[9],assetsResult[10],assetsResult[11]],
                    [assetsResult[20],assetsResult[21],assetsResult[22],assetsResult[23]],
                    assetsResult[24],
                    assetsResult[25],
                    assetsResult[26],
                    assetsResult[27],
                );
                new playBtn(assetsResult[0]);
                Laya.stage.addChild(this.play);
                Laya.Tween.to(this.play,{alpha:1},300,Laya.Ease.linearIn,void 0);
                new shareBtn(assetsResult[1]);
                Laya.stage.addChild(this.shareBtn);
                Laya.Tween.to(this.shareBtn,{alpha:1},300,Laya.Ease.linearIn,void 0);
            })
        })
    }
}