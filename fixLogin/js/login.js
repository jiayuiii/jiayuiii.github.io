var wrap = $(".password-wrap");
// wrap.find('i').eq(1).css("display","none");
// wrap.find("input").on("focus",function(){
//     wrap.find('i').eq(1).css("display","inline-block");
// }).on("blur",function(){
//     wrap.find('i').eq(1).css("display","none");
// })
wrap.find('i').eq(1).on('click',function(){
    if(wrap.find("input").attr("type")=='password'){
        wrap.find("input").attr("type", "text");
    }else{
        wrap.find("input").attr("type", "password");
    }
})