var i = 1;
$('.register').on('click',function(){   //点击注册
    register();
})
$('.code').on('keypress',function(e){       //验证码回车
    if(e.keyCode == 13){
        register();
        $('.register').focus();
        
    }
})
$('.name').on('blur',function(){        //检测账号是否存在
    if(nameDetect($('.name').val())){
        layer.tips('该账号已注册','.name');
    }
})
$('.password').on('blur',function(){            //检测密码强度
    if($('.password').val().length == 0){
        layer.tips('密码不能为空','.password');
        return 0;
    }
    var i =passwordDetect($('.password').val());
    switch (i){
        case 1:
        layer.tips('密码强度低','.password');
        break;
        case 2:
        layer.tips('密码强度中','.password');
        break;
        case 3:
        layer.tips('密码强度强','.password');
        break;
    }
    
})
$('.code').on('focus',function(){
    layer.tips('点击图片切换验证码','.code',{tips:[1]})
})
$('.codePic').on('click',function(){            //点击时切换验证码
    pic();
})
$(function(){           //设置一个初始量给下面
    sessionStorage.setItem('count',0);
})
function register(){
    var $name = $('.name'),
    $pwd = $('.password'),
    $pwdNext = $('.passwordNext'),
    $code = $('.code');
    if(i == 19){//最多存放20个用户
        i = 0;
    }
    i++;
    
    if(test($name.val().toString(),$pwd.val().toString())&&compare($pwd.val().toString(),$pwdNext.val().toString())&&code($code)){  //检测上面的四个内容是否都正确
        for(var j = 0; j < 20; j++){
            if($name.val() == sessionStorage.getItem('name'+j)){   //如果已存在则提示
                    layer.alert('该账号已注册');
                    i--;
                    return 0;
            }
        }
        sessionStorage.setItem('name'+i,$name.val().toString()); //储存数据
        sessionStorage.setItem('password'+i,$pwd.val().toString());
        layer.msg('注册成功');
        setTimeout(function(){
            // var index = parent.layer.getFrameIndex(window.name);
            // parent.layer.closeAll('iframe');
            // 因为hrome本地file的时候有安全协议，在本地测试不管用，要放在线上才行所以要是想看它注册后自己
            //返回登录的界面得放到服务器或者换个浏览器才行，要是有时间的话可以在火狐上试试哦
            // window.location.href = 'login.html';
        },1000)
    }
}
function pic(){
    $pic = $('.codePic');
    var i = Math.ceil(Math.random()*3);
    while($pic.hasClass('pic'+i)){ //防止出现重复
        i = Math.ceil(Math.random()*3);
    }
    for(var j = 1; j<=3 ; j++ ){
        (function(k){
            $pic.removeClass('pic'+j);
        })(j)
    }
    $pic.addClass('pic'+i);
    return i;
}
pic();