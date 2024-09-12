const { regClass } = Laya;
import { LoadingBase } from "./Loading.generated";
import background from "./view/background/background";
import progress from "./view/progress/progress";
@regClass()
export class Loading extends LoadingBase {
    onAwake(): void {
        Laya.loader.load(["resources/progress.png","resources/progress$bar.png","resources/bg_day.png","resources/bg_night.png"]).then((res)=>{
            const bg=new background(res[2],res[3]);
            const pg=new progress(res[0],res[1]);
            this.progress.value=0.5;
        })
    }
}