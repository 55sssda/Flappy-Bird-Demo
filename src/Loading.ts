const { regClass } = Laya;
import { LoadingBase } from "./Loading.generated";

@regClass()
export class Loading extends LoadingBase {
    onAwake(): void {
        Laya.loader.load(["resources/progress.png","resources/progress$bar.png","resources/bg_day.png"]).then((res)=>{
            const progress=new Laya.ProgressBar();
            progress.width=300;
            progress.height=40;
            progress.x=200;
            progress.y=100;
            progress.anchorX=0.5;
            progress.anchorY=0.5;
            progress.skin=res[0].url;
            progress.value=0.6;
            Laya.stage.addChild(progress);
        })
    }
}