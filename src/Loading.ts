const { regClass } = Laya;
import { LoadingBase } from "./Loading.generated";
import background from "./view/background/background";
import progress from "./view/progress/progress";
import progressText from "./view/progress/text";
import title from "./view/title/title";
import playBtn from "./view/playBtn/playBtn";
import {assets} from "./map/assets";
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
                new playBtn(assetsResult[0]);
                Laya.stage.addChild(this.play);
                Laya.Tween.to(this.play,{alpha:1},300,Laya.Ease.linearIn,void 0);

            })
        })
    }
}