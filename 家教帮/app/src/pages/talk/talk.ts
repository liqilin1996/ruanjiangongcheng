
import { Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import $ from 'jquery'; //需要引入jquery插件
/**
 * Generated class for the TalkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-talk',
  templateUrl: 'talk.html',
})
export class TalkPage {
  touser = {   //被发送人
    id: '123456',
    pic: '../assets/imgs/mine2.png',
    username: '张三',
  };

  user = {   //发送人
    id: '1234567',
    pic: '../assets/imgs/mine2.png',
    username: '嘻嘻',
  };

  messages = [
    {
      id: 1,  //第一条消息
      date: new Date(),
      pic: this.user.pic,
      userId: this.user.id,
      username: this.user.username,
      text: '哈哈哈哈哈'
    },
    {
      id: 2,  //第二条消息
      date: new Date(),
      userId: this.touser.id,
      pic: this.touser.pic,
      username: this.touser.username,
      text: '今天天气真好'
    }
  ];
  constructor(public navCtrl: NavController) {
  }
  // 发送消息
  txt:any;
  send(message) {
    if (message && message !== '') {
      // this.messageService.sendMessage(chatId, message);

      const messageData =
        {
          id:3,                 
          date: new Date(),
          userId: this.user.id,   //如果将user改成touser，就会在左面发送，根据后台传入的参数user、touser可以实现左面发送，还是右面发送
          username: this.user.username,
          pic: this.user.pic,
          text: message
        };

      this.messages.push(messageData);
      }
      this.txt='';
    }
    ionViewWillEnter() {
    console.log(localStorage.getItem('phone'));
      $(function($){   //点击笑脸显示表情
        /*
        $('#face').click(function(){
        if($('#a').css('display')=='none'){
          //console.log('face');
          $('#a').css("display","block");
          var tem='';
		      for(var i=1;i<=132;i++){
            tem += "<div class='de'><img src='../assets/imgs/QQ/"+i+".gif'></div>";
           } 
        $("#a").append(tem);
        var spanlist = $('#a');
     // for (var i = 0; i <spanlist.children().length; i++) {
      $('div.de').on("click",function(event){
        console.log(event.target);
        $("#input").append(event.target);
       $("#input img").width(20);
       $("#input img").height(20);
      });
     // }
       }
      else{
          //console.log('face');
          $('#a').html('');  //将div里面的内容全部删除，否则再次点击时，会有两组图片
          $('#a').css("display","none");  

      }
    })*/
  }) 
  }
    //不需要在同域下即可，因为WebSocket是在TCP层面上传输数据，而”域”的概念在应用层):
//判断当前浏览器是否支持WebSocket  
websocket = new WebSocket('ws://localhost:3000'); 
//连接发生错误的回调方法 
ionViewDidLoad(){ 
  var that=this;
this.websocket.onerror = function(err){  
    console.log('错误')
    console.log(err);
};  
  
//连接成功时的回调方法  
this.websocket.onopen = function(event){  
    console.log(event);  
}  
  
//接收到消息的回调方法  
this.websocket.onmessage = function(event){  
}  
  
//连接关闭的回调方法  
this.websocket.onclose = function(){  
    console.log("关闭");  
}  
//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。  
window.onbeforeunload = function(){  
    that.websocket.close();  
}  
  /*
//发送消息  
$scope.send = function(){  
    this.websocket.send(this.localStorageService.get('UserID'));  
}  
$scope.closeWebSocket = function(){  
    this.websocket.close();  
}  
*/
}
}
