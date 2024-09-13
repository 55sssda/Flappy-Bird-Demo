const { regClass } = Laya;
import { LoadingBase } from "./Loading.generated";
import background from "./view/background/background";
import progress from "./view/progress/progress";
import title from "./view/title/title";
@regClass()
export class Loading extends LoadingBase {
    onAwake(): void {
        Laya.loader.load(["resources/progress.png","resources/progress$bar.png","resources/bg_day.png","resources/bg_night.png","resources/title.png"]).then((res)=>{
            new background(res[2],res[3]);
            new progress(res[0],res[1]);
            new title(res[4]);
        })
    }
}