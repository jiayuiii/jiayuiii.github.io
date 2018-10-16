// $('.button').on('click',function(){
//   var stuId = $('.top input').val();
//   var password = ('.bottom input').val();
//     console.log(x);
//     if(stuId != '' && password != ''){
//        
//     }
// })
// let id = $('.input-wrapper .top input').val();
// let pwd = $('.input-wrapper .bottom input').val();
// let regId = /^[0-9]{9,9}$/; 
// if(regId.test(id)){
//     console.log(1)
// }else{
//     console.log(2)
// }
// $('.input-wrapper .button').on('click',function(){
//   var id = $('.input-wrapper .top input').val();
//   var pwd = $('.input-wrapper .bottom input').val();
//   var regId = /^\d{9}$/;
//   var regPwd = /[\s]+/;
//     if(regId.test(id)){
//         if(regPwd.test(pwd)){
//             //发送请求
//         }else{
//             //提升密码必须为字母数字标点符号组合
//         }
//     }else{
//             //提示账号必须为9位数得学号
//     }
// })
/******************************************************************************************** */
$('header .user-btn').on('click', function () {
    var $shadow = $('div.shadow');
      $shadow.show();
      $shadow.find('.window').on('click', function (e) {
          e.stopPropagation();
      })
      $shadow.on('click', function (e) {
          $shadow.hide();
          windowUp();
          e.stopPropagation();
      })
  });
  $('.input-wrapper .massage a').on('click', windowDown);
  $('.register-wrapper .massage a').on('click', windowUp)
  function windowDown() {
      $('.window').css('margin-top', '100px');
      $('.window-bg').css('height', '680px').find('.input-wrapper').css('display', 'none').next().css('display', 'block');
  }
  function windowUp() {
      $('.window').css('margin-top', '200px');
      $('.window-bg').css('height', '420px').find('.register-wrapper').css('display', 'none').prev().css('display', 'block');
  }
$('.input-wrapper .button').on('click', function () {
  var loginId = $('.input-wrapper .top input').val();
  var loginPwd = $('.input-wrapper .bottom input').val();
  var regId = /^\d{9}$/;
  var regPwd = /^\d{9}$/;
  var regPwd = /^[^\s]+$/;
    if (regId.test(loginId)) {
        if (regPwd.test(loginPwd)) {
          var user = {
                stuId:loginId,
                password:loginPwd
            }
            console.log(JSON.stringify(user));
            $.ajax({
                url: '',
                data:JSON.stringify(user),
                dataType: 'json',
                method: 'POST',
                success: function () {
                    $('.shadow').hide();
                    windowUp();
                },
                error: function () {
                    alert('error');
                }
            })
        } else {
            layer.msg('提升密码必须为字母数字标点符号组合');
            //提升密码必须为字母数字标点符号组合
        }
    } else {
        layer.msg('提示账号必须为9位数得学号');
        //提示账号必须为9位数得学号
    }
})
$('.register-wrapper .button').on('click', function () {
  var registerId = $('.register-wrapper .top input').val();
  var $input = $('.register-wrapper .bottom input');
  var registerPwd = $input.eq(0).val();
  var registerCheckPwd = $input.eq(1).val();
  var registerName = $input.eq(2).val();
  var registerTel = $input.eq(3).val();
  var registerCode = $input.eq(4).val();
  var regId = /^\d{9}$/;
  var regPwd = /^[^\s]+$/
  var regTel = /^\d{11}$/;
    if (regId.test(registerId)) {
        if (registerPwd === registerCheckPwd) {
            if (regPwd.test(registerPwd)) {
                if (regTel.test(registerTel)) {
                    if (registerName == '') {
                        layer.msg('名字不能为空')
                        //名字为空
                    } else {
                        // layer.msg('发送请求');
                        var user = {
                            stuId: registerId, 
                            password: registerPwd,
                            checkpassword: registerCheckPwd,
                            name: registerName,
                            tel: regTel,
                            code: registerCode
                        }
                        console.log(JSON.stringify(user));
                        $.ajax({
                            url: '',
                            data:JSON.stringify(user),
                            dataType: 'json',
                            method: 'POST',
                            success: function () {
                                $('.shadow').hide();
                                windowUp();
                            },
                            error: function () {
                                alert('error');
                            }
                        })
                        //发送请求
                    }
                } else {
                    layer.msg('手机必须为11位数字');
                    // 手机必须为11位数字
                }
            } else {
                layer.msg('密码必须为字母数字标点符号组合');
                //提升密码必须为字母数字标点符号组合
            }
        } else {
            layer.msg('密码不一致');
            // 密码不一致
        }
    } else {
        layer.msg('提示账号必须为9位数得学号');
        //提示账号必须为9位数得学号
    }
})
