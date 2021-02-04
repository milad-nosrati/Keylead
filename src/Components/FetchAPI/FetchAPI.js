import axios from 'axios';

export function getVideoLink( callback, errorcallback){
    const APIurl = "https://api.aparat.com/fa/v1/video/video/mostViewedVideos";
    axios.get(APIurl)
    .then(res => {
      //do something
      if(callback != null){
          console.log(res)
         callback(res);
      }
    })
    .catch(err => {
      // catch error
      if(errorcallback != null){
          console.log(err)
         errorcallback(err);
      }
    })
     //   const videoLink = videosList.data[0].attributes.preview_src;
     //   const videoLink = "https://static.cdn.asset.aparat.com/avt/29593961_15s.mp4";
}