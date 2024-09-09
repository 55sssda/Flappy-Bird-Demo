const { regClass } = Laya;
import { LoadingBase } from "./Loading.generated";
@regClass()
export class Loading extends LoadingBase {
    onAwake(): void {
        Laya.loader.load(["resources/progress.png","resources/progress$bar.png","resources/bg_day.png","resources/bg_night.png"]).then((res)=>{
            
        })
    }
}