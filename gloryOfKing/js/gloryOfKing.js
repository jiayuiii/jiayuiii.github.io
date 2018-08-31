//阻止a的默认事件
$(function(){
    $('a').on('click',function(e){
        e.preventDefault();
    })
})
//这是用来是鼠标放在顶栏左边广告显示的
$(function(){
    var $topLeft2 = $(".top li.left2");
    var $topLeft2Adv = $('div.top-left2-adv img');
    $topLeft2.on('mouseover',function(){
        $topLeft2Adv.stop().fadeIn(500);
    });  
    $topLeft2Adv.on('mouseout',function(){
        $topLeft2Adv.stop().fadeOut(0);
    });
});
//这是顶层栏的二级菜单
$(function(){
    var $gameKey = $('.top .inner .right1');
    var $game = $('.top-right2-game');
    $gameKey.on('mouseenter',function(e){
        $game.stop().slideDown(500);
    });
    $gameKey.on('mouseleave',function(e){
        $game.stop().slideUp(500);
    });
});
//这是顶层栏的二级菜单的移动效果
$(function(){
    var $list  = $('.top .body .rank-list .list');
    $list.each(function(){
        $(this).on('mouseover',function(e){
        $(this).parent().not($(this)).find('.game-cover').css('display','none');//把在同一个父级下的其他的兄弟的海报隐藏
        $(this).parent().not($(this)).find('.game-name').css('display','inline');
        $(this).find('span').addClass('hover').parent().siblings().removeClass('hover');
        $(this).find('.game-name').css('display','none');
        $(this).find('.game-cover').css('display','block');
        });
    });
});
//这是导航栏的显示二级菜单
//我曾经游走于GitHub，csdn等各大论坛之中，冒泡于各种学术讨论群，遇见的bug都是发出来立刻解决，但今天，
//我想我是遇到了瓶颈，那就是这种结构 /捂脸....我是真的不知道怎么搞，望师兄师姐赐教
//用的是移出父级的就隐藏，但是在一级导航栏的margin那里并不会隐藏
$(function(){
    var $nav = $('.nav-wrap .nav');
    var $sub = $('.nav-wrap .sub-nav-wrap');
        $nav.on('mouseenter',function(e){
        $sub.stop().slideDown(500,function(){
            $sub.children().stop().animate({opacity:100},1000);

        });
    });
    $('.nav-wrap').on('mouseleave',function(e){
        $sub.children().stop().animate({opacity:0},100,function(){
            $sub.stop().slideUp(500);

        });
    });
});
//这里也很奇怪，在ie8那里用上面的办法反而不行,解决办法是将二级导航栏塞到一级导航栏自己下面，但是要改结构
//所以ie8这个问题没有解决，再这其他功能都已经完善，还有一些样式兼容没有解决

//这是内容顶部的左侧的轮播图
//这里我没有设置滑动的动画————是用的定时器里面嵌套定时器，但是我就算清除了定时器它也还是会加速，
//在发出去之前我都还没有想到解决定时器嵌套的办法，所以就不设置动画先，日后有机会的话再向你们请教啦哈哈哈

$(function(){

    $('.mode-key').on('click',function(){
        $(this).children().slideDown(500);
        $(this).on('mouseleave',function(){
            $(this).children().slideUp(500);
        })
    });
    $('.mode-key .roll').on('click',function(){
        $(this).addClass('hover').siblings().removeClass('hover');
        mode = 'roll';
        init();
    })
    $('.mode-key .simple').on('click',function(){
        $(this).addClass('hover').siblings().removeClass('hover');
        mode = 'simple';
        init();
    })
    $('.mode-key .fade').on('click',function(){
        $(this).addClass('hover').siblings().removeClass('hover');
        mode = 'fade';
        init();
    })
    //这是初始化函数，每次选取新的轮播模式都初始化一次
    function init(){     
        $('.rollPic-list').each(function(){ //因为这里要选取新加进来的节点，所以要重新选取
            $(this).css('position','static').css('display','').css('opacity','');
        })
        pic = 0;
        btn = 0;
        $rollPic.parent().css('left','0');
        show();
    }
    var $rollPic = $('.main-top-l>.rollPic>li'),
    $clone = $rollPic.first().clone(),
    $rollButton = $('.main-top-l>.rollButton>span'),
    $btn = $('.main-top-l>.btn'), 
    pic = 0,
    btn = 0,
    mode = 'simple',
    timer;
    $rollPic.parent().append($clone);
    $('.mode-key .simple').addClass('hover');
    function time(){
        timer = setInterval(change,3000);
    }
    time();
    function change(){ //这是轮播的方法
        pic ++;
        btn ++;
        show();
    }
    for (var i = 0; i < 5; i++){
        (function(j){
            $rollButton.eq(j).on('mouseover',function(){
                btn = j;
                pic = j;     
                show(); 
            });
        })(i);
    }
    $('.main-top-l').on('mouseenter',function(){ //这是放进轮播图时按钮显示的方法
        $btn.css('visibility','visible');
        $('.mode-key').css('display','block');
        
    }).on('mouseleave',function(){
        $btn.css('visibility','hidden');
        $('.mode-key').css('display','none');
    });
    $btn.eq(0).on('click',function(){ //这是左边的按钮
        pic --;
        btn --;
        show();
    })
    $btn.eq(1).on('click',function(){ //这是右边
        pic ++;
        btn ++;
        show();
    })
    function show(){ //这是显示的方法，根据pic来的数值来显示第几张图片和第几个按钮
        clearInterval(timer);
        if(mode == 'roll'){
            if(btn == 5){
                btn = 0;
            }
            if (pic == 6){
                pic = 1;
                $rollPic.parent().css('left','0');
            }
            $('.rollPic').stop().animate({left:-pic * 604},500);
            $rollButton.eq(btn).addClass('hover').siblings().removeClass('hover');
        }else{   
            if(pic == 5){
                pic = 0;
            }else if(pic < 0){
                pic = 4;
            }
            $rollButton.eq(pic).addClass('hover').siblings().removeClass('hover');
            if(mode == 'fade'){
                $rollPic.eq(pic).stop().fadeIn(1000).siblings().stop().fadeOut(0);     
            }else if(mode == 'simple'){
                 $rollPic.eq(pic).css("display",'block').siblings().css('display','none');
            }

        }
        time();
    }
});
//这是内容顶部轮播图右边的选项卡
$(function(){
    var $head = $('.main-top-c .newstab .newstab-head li');
    var $body = $('.main-top-c .newstab-content .inner');
    for(var i = 0; i < 5; i++){
        (function(j){
            $head.eq(j).on('mouseover',function(){
                $(this).addClass('hover').siblings().removeClass('hover');
                $body.css('display','none');
                $body.eq(j).css('display','block');
            });

        })(i);
    }
});
//这是内容区的一级选项卡
$(function(){
    var $head = $('.main-content-l .nav>a');
    var $body = $('.main-content-l .sub-nav .sub-nav-wrap');
    var $all = $('.main-content-l .sub-nav-inner a');
    for(var i = 0; i < 3; i++){
        (function(j){
            $head.eq(j).on('mouseover',function(){
                $body.css('display','none');
                $body.eq(j).css('display','block');
                $head.removeClass('hover');
                $(this).addClass('hover');
                var first = j*8;
                $all.removeClass('hover');
                $all.eq(first).addClass('hover');
                contentVideo();//这是显示视频内容的方法在175行
                //这里我是根据.hover在哪一个二级导航栏就显示那一个的，因为索引号都相同
            });
        })(i);
    }
});
//这是内容区的二级选项卡
$(function(){
    var $head = $('.main-content-l .sub-nav-inner a');
    $head.each(function(e){
        $(this).on('mouseover',function(){
            $head.removeClass('hover');
            $(this).addClass('hover');
            contentVideo();
        });    
    });
});
//这是显示视频内容的方法
function contentVideo(){
    var $head = $('.main-content-l .nav>a.hover').index();
    var $num = $('.main-content-l .sub-nav a.hover').index();
    var num = $head*4 + $num; 
    var $content = $('.content ul');
    $content.eq(num).css('display','block').siblings().css('display','none');
}
contentVideo();
//这是视频盘旋时的播放图标显示
$(function(){
    var $img = $('.main-content-l .content .content-video li');
    var $all = $('.main-content-l .content .content-video li .play');
    var $shadow;
    $img.each(function(){
        $(this).on('mouseover',function(){
            $all.css('display','none'); //为了解决下面这个问题，再每次放入时清除所有的阴影
            $shadow = $(this).find('.play');
            $shadow.css('display','block');
            $shadow.on('mouseleave',function(){//这里移动太快的话，会使阴影不能消失，未解决
            $shadow.css('display','none');
            });
        });
        $(this).on('mouseout',function(){
            $shadow.css('display','none');
        })
    });
});
//这是内容区的右边的选项卡功能
$(function(){
    var $head = $('.main-content-r .nav a');
    var $content = $('.main-content-r .content');
    $head.each(function(){
        $(this).on('mouseover',function(){
            $(this).addClass('hover').siblings().removeClass('hover');
            $content.eq($(this).index()).css('display','block').siblings('.content').css('display','none');
        });
    });

});
//这是内容区右边的盘旋时显示英雄名功能 
$(function(){
    $('.main-content-r .content li').each(function(){
        $(this).on('mouseover',function(){
            $(this).children('.hero-shadow').css('display','block');
            $(this).children('.hero-name').css('display','block');
        });
        $(this).on('mouseout',function(){
            $(this).children('.hero-shadow').css('display','none');
            $(this).children('.hero-name').css('display','none');
        });

    });
});
//这是赛事区的内容
$(function(){
    $('.match-content .nav a').each(function(){
        $(this).on('mouseover',function(){
            $(this).addClass('hover').parent().siblings().find('a').removeClass('hover');
            $('.match-content .content').eq($(this).parent().index()).css('display','block').siblings().css('display','none');
        });
    });
    $('.match-content .video-wrap').each(function(){
       $(this).on('mouseover',function(){
        $(this).children('.shadow').css('display','block').parent().parent().siblings().find('.shadow').css('display','none');
       })
       $(this).on('mouseout',function(){
        $(this).children('.shadow').css('display','none');
       })
    })
});
//这是右下角导航栏
$(function(){
    $('.right-fix-wrap .brust').on('mouseover',function(){
        $(this).css('background-position','0 -199px');
        $(this).on('mouseout',function(){
            $(this).css('background-position','0 -120px');
        })
    })
    $('.right-fix-wrap .assistant').on('mouseover',function(){
        $(this).css('background-position','0 -240px');
        $(this).children().css('display','block');
        $(this).on('mouseout',function(){
            $(this).css('background-position','0 -160px');
            $(this).children().css('display','none');
        })
    })
})
//这里是比赛赛事的海报和新闻那里，如果不加这个在ie8那里视频会跑上去
//这里是为了兼容ie8不支持after而加的，因为这里高度左右不一致，视频就会跑上去
$(function(){
    //所以我们先给它加10px的margin-bottom让他不挤上去
    var $top = $('.match-content .match-content-l .content .content-top ul');
    // $top.css('margin-bottom','10px');
    var $nav = $('.nav-wrap');
    $nav.css('background','rgb(55,55,55)');
    var i = document.getElementsByClassName('content-top')[0];//因为下面的方法不支持jq选出来的节点所以我用原生了哈
    var aft = window.getComputedStyle(i,'after')['content'];//获取元素属性，如果支持after，那么把margin-bottom变回0
    if(aft){
        $top.css('margin-bottom','0');
        $nav.css('background','rgba(0,0,0,0.8)');
    }
   
//ie8中还有轮播图那里的右边的选项卡，一开始会有一些现实上来，知道是为啥，但是你的鼠标一放上去切换之后它就正常了
//ie8中还有最上面的导航栏我加了ie8独有的透明色属性之后，二级导航栏就出不来了我也不知道为啥
//所以我给他加纯黑色把功能完善好啦，真是让人头大的ie

})
//这是登录框的内容
$(function(){
    var indexLogin;
    var myLogin = $('.nav-login a');
    var content = $('.login-content');
    myLogin.on('click',function(){      //点击欢迎登录即打开登录弹窗
        indexLogin = layer.open({
            type:1,
            title:false,
            closeBtn: 0,
            shadeClose: true,
            area:['418px','316px'],
            content: content
        })
    })
    $('.login-content .input1').on('click',function(){  //聚焦时字体变黑
        $(this).css('color','black');
    })
    $('.login-content .clear1').on('click',function(){      //点清除时清除数据
        $('.login-content .input1').val('');
    })
    $('.login-content .input2').on('click',function(){ //聚焦时字体变黑
        $(this).css('color','black');
    })
    $('.login-content .input2').on('keypress',function(e){ //聚焦时字体变黑
        if(e.keyCode == 13){
            login()
            $('.button').focus();
        }
    })
    $('.login-content .clear2').on('click',function(){  //点清除时清除数据
        $('.login-content .input2').val('');
    })
    $('.login-content .button').on('click',function(){  //点击登录即验证密码
        if(login()){
            layer.msg('登录成功');
            $('.nav-login p').text($('.login-content .input1').val());   //是账号显示在页面上
            layer.close(indexLogin);        //关掉弹窗
        }
        
    })
    $('.login-content .newAccount').on('click',function(){      //点击注册即注册打开的页面
        var index = layer.open({
            type: 2,
            title:'注册新账号',
            content: 'register.html',
            maxmin: true
          });
          layer.full(index);
    })
    function login(){
        for(var i = 0; i < 20 ; i++){
            if($('.login-content .input1').val() == sessionStorage.getItem('name'+i) ){   //验证是否有注册
                if($('.login-content .input2').val() == sessionStorage.getItem('password'+i)){//验证密码
                    layer.msg('登录成功');
                    return true;
                }else{
                    layer.msg('密码错误');
                    return false;
                }
                return false;
            }
        }
        layer.msg('该账号未注册');
    }
});