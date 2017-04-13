/**
 * Created by yu on 2016/12/14.
 */
var locations,score,max,time,timer;
var keys=["0","1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
var colors = [ "#FFF", "PINK", "GRAY", "#ABCDEF", "#0FF0FF", "#FF0", "#CDF0AB", "#FEDCBA", "#F0F", "#BBBBBB", "#00F", "#00FF00" ];
function init(){
    timer=setInterval(showtime,1000);
    score=0;
    max=0;
    time=0;
    locations=[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
    locations[createLocation()]=createFixedNum();
    locations[createLocation()]=createFixedNum();
    paint();
    window.onkeydown=function (e){
        var keyCode;
        if(!e)
            e=window.event;
        if(document.all){
            keyCode= e.keyCode;
        }else {
            keyCode= e.which;
        }
        //左
        if(keyCode==37||keyCode==65){
            $("#keys").text("←");
            toLeft();
            isEnd();
        }
        //上
        if(keyCode==38||keyCode==87){
            $("#keys").text("↑");
            toUp();
            isEnd();
        }
        //右
        if(keyCode==39||keyCode==68){
            $("#keys").text("→");
            toRight();
            isEnd();
        }
        //下
        if(keyCode==40||keyCode==83){
            $("#keys").text("↓");
            toDown();
            isEnd();
        }
    }
}
function isEnd(){
    var flag=false;
    if(locations.indexOf(0)==-1){
        $("#end").text("注意");
        if(isEndX() && isEndY()){
            clearTimeout(timer);
            if(window.confirm("结束了!\n当前分数: " + score + ";\n用时: " + time + "S;\n最大数是: " + max + "。\n是否开始新的游戏?")){
                init();
            }else {
                window.close();
            }
        }
    }else {
        $("#end").text("")
    }
    return flag;
}
function isEndX(){
    var flag=false;
    var arr=new Array();
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            arr[j]=locations[4 * i + j];
        }
        flag=(arr[0] !=arr[1] && arr[1] != arr[2] && arr[2] != arr[3]);
        if(!flag){
            break;
        }
    }
    return flag;
}
function isEndY(){
    var flag=false;
    var arr=new Array();
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            arr[j]=locations[4 * j + i];
        }
        flag=(arr[0] != arr[1] && arr[1] != arr[2] && arr[2] != arr[3]);
        if(!flag){
            break;
        }
    }
    return flag;
}
//左
function toLeft(){
    for(var i=0;i<4;i++){
        var row=[locations[i*4],locations[i * 4 + 1],locations[i * 4 + 2],locations[i * 4 + 3]];
        configurationLeft(i,row);
    }
    locations[createLocation()]=createFixedNum();
    paint();
}
//上
function toUp(){
    for(var i=0;i<4;i++){
        var row=[locations[i+0],locations[i+4],locations[i+8],locations[i+12]];
        configurationUp(i,row);
    }
    locations[createLocation()]=createFixedNum();
    paint();
}
//右
function toRight(){
    for(var i=0;i<4;i++){
        var row=[locations[i * 4 + 3],locations[i * 4 + 2],locations[i * 4 + 1],locations[i * 4]];
        configurationRight(i,row);
    }
    locations[createLocation()]=createFixedNum();
    paint();
}
//下
function toDown(){
    for(var i=0;i<4;i++){
        var row=[locations[i+12],locations[i+8],locations[i+4],locations[i]];
        configurationDown(i,row);
    }
    locations[createLocation()]=createFixedNum();
    paint();
}
//左
function configurationLeft(i,r){
    makeArray(r);
    for(var j=0;j<4;j++){
        locations[4 * i + j]=r[j];
    }
    //上
}function configurationUp(i,r){
    makeArray(r);
    for(var j=0;j<4;j++){
        locations[4 * j + i]=r[j];
    }
    //右
}function configurationRight(i,r){
    makeArray(r);
    for(var j=0;j<4;j++){
        locations[3 + 4 * i - j]=r[j];
    }
    //下
}function configurationDown(i,r){
    makeArray(r);
    for(var j=0;j<4;j++){
        locations[4 * (3-j) + i]=r[j];
    }
}
function makeArray(r){
    if(!isZero(r)){
        for(var m=0;m<4;m++){
            for(var n=0;n<3;n++){
                if(r[n]==0){
                    r[n]=r[n+1];
                    r[n+1]=0;
                }
            }
        }
    }
    for(var m=0;m<3;m++){
        if(r[m]==r[m+1]){
            var k=m;
            r[k]+=r[k+1];
            score +=r[k];
            while (++k<3){
                r[k]=r[k+1];
            }
            r[3]=0;
        }
    }
    return r;
}
//绘制点的位置
function paint(){
    for(var i=0;i<16;i++){
        $("#box"+keys[i]).text((locations[i]==0)?"":locations[i]);
        var index=(locations[i]==0)?0
            :(locations[i].toString(2).length-1);
        $("#box"+keys[i]).css("background",colors[index]);
        if(locations[i]>max){
            max=locations[i];
        }
        $("#score").text("总分为:"+score);
        $("#max").text("当前最大数:"+max);
    }
}
//随机生成两个数
function createFixedNum(){
    return Math.random()<0.8?2:4;
}
//生成位置
function createLocation(){
    var num=Math.floor(Math.random()*16);
    while (locations[num]!=0){
        num=Math.floor(Math.random()*16);
    }
    return num;
}
function isZero(m){
    return m[0]==0&&m[1]==0&&m[2]==0&&m[3]==0;
}
//计时
function showtime(){
    $("#time").text("当前用时："+(++time)+"s")
}
