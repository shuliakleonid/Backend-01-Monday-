import {videos} from "../routes/videos";

class VideoController {
    allVideo(req:any, res:any){
        try{
            res.send(videos)
        }catch (e) {

        }
    }
}
export const Video = new VideoController()