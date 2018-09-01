function test(name,pwd){            //验证账号和密码的格式（只能为邮箱和不大于11位的纯数字）
    var regNum =/^[0-9]+$/;
    var regpwd = /[\s]+/;
    var regMail = /^([a-zA-Z0-9]+[\_|\.]?)+@([a-zA-Z0-9]+[\_|\.]?)+\.[a-zA-Z]{2,3}$/;
    if(name == '' || pwd == ''){
        layer.alert('账号或密码不能为空')
        return false;
    }
    else if(regNum.test(name)){
        if(name.length > 11){
        layer.alert('手机号和QQ号不应超过11位');
        return false;
        }
    }
    else if(regMail.test(name)){
    }
    else{
        layer.alert('请输入正确的账号密码格式');
        return false;
    }
    if(regpwd.test(pwd)){
        layer.alert('请输入正确的账号密码格式');
        return false;
    }
    return true;
}
function nameDetect(account){       //账号检测是否已经存在
    for(var j = 0; j < 20; j++){
        if(account == sessionStorage.getItem('name'+j)){
           return true;
        }
    }
}
function passwordDetect(pwd){     //验证密码强度
    var regNum =/^[0-9]+$/;
    var regEng = /^[a-zA-Z0-9]+$/;
    if(regNum.test(pwd)){
        return 1;
    }else if(regEng.test(pwd)){
        return 2;
    }else{
        console.log(pwd.length);
        return 3;
    }
}
function compare(pwd,pwdNext){    //检测两次密码是否一致
    if(pwd != pwdNext){
        layer.alert('密码不一致');
        return false;
    }
    return true;
}
function code(){                //检测验证码
    $pic = $('.codePic');
    if($pic.hasClass('pic1')){
        if($('.code').val().toString() == 'M3qe'){
            return true;
        }else{
            layer.alert('验证码错误');
            return false;
        }
    }
    if($pic.hasClass('pic2')){
        if($('.code').val().toString() == 'umiA'){
            return true;
        }else{
            layer.alert('验证码错误');
            return false;
        }
    }
    if($pic.hasClass('pic3')){
        if($('.code').val().toString() == 'pm6W'){
            return true;
        }else{
            layer.alert('验证码错误');
            return false;
        }
    }
}