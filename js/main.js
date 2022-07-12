$(function() {
    var decoLeft =0;
    var menuWidth = 0;

    // 만약 body 영역의 가로길리가 480px 이상이면
    if($(window).width() > 480){
        // pc번전
        $('nav').hover(function() {
            $('.deco').addClass('active');
        },
        function() {
            $('.deco').removeClass('active');
            
        });    
    
        $('nav ul li a').hover(function() {
            decoLeft = $(this).position().left;
    
            $('.deco').css('left', decoLeft);
        });
    
        $('nav ul li a').hover(function() {
            decoLeft = $(this).position().left;
            menuWidth = $(this).width()/2;
            var result = decoLeft + menuWidth;
            $('.deco').css('left', result);
        }); 
    }else{
        // 모바일 버전
        $('.menu_icon').click(function() {
            $('nav').animate({
                right: 0
            });
        });
        $('.close_btn').click(function() {
            $('nav').animate({
                right:'-100%'
            });
        });
    }   
    // 목업 화면 올라가는 효과
    var laptopsInner = document.querySelectorAll('div.laptop-inner');

    for (const laptopInner of laptopsInner) {
    laptopInner.addEventListener('mouseover', (e) => {
        var imageHeight = e.target.offsetHeight;
        var laptopHeight = e.currentTarget.offsetHeight;
        var scrollHeight = imageHeight-laptopHeight;
        console.log(`${imageHeight} | ${laptopHeight} | ${scrollHeight}`);  
        e.target.style.transform = "translate3d(0, -"+scrollHeight+"px, 0)";
    });
    laptopInner.addEventListener('mouseout', (e) => {
        e.target.style.transform = "translate3d(0, 0, 0)";
    });
    }
    //header
    function minimize_header() { 
        var $window = $(window); 
        var $header = $('header'); 
        var did_scroll = null;
        var current_scroll = 0; 
        var last_scroll = 0; 
        var move_scroll = 10; 
        $window.on('scroll', function() { 
            did_scroll = true; 
            if ($window.scrollTop() > $header.height()) { 
                $header.addClass('minimize'); 
            } else { 
                $header.removeClass('minimize'); 
            } 
        }); 
        setInterval(function() { 
            if (did_scroll && !$('body').hasClass('open-menu')) { 
                has_scrolled(); did_scroll = false; 
            } 
        }, 50); 
        function has_scrolled(){ 
            current_scroll = $(this).scrollTop(); 
            // Make sure they scroll more than move_scroll
        if(Math.abs(last_scroll - current_scroll) <= move_scroll) return;

        if(current_scroll > last_scroll){ // ScrollDown
            if(current_scroll > $(window).height()){
                gsap.to( $header, 0.4, { autoAlpha:0, y: -$header.outerHeight(), ease: Power3.easeOut });
            }
        }
        else { // ScrollUp
            gsap.to( $header, 0.4, { autoAlpha:1, y: 0, ease: Power3.easeOut });
        }

        last_scroll = current_scroll;
        }
    }
    minimize_header();

    // 인트로 
    (function(){
        var words = [
            'graphic',
            'publisher',
            'Design',
            'photograph',
            'banner',
            'Branding',
            'package',
            'tooler',
            'Development',
            ], i = 0;
        setInterval(function(){
            $('.bgText').fadeOut(function(){
                $(this).html(words[i=(i+1)%words.length]).fadeIn();
            });
        }, 4000);
          
    })();

    // 메뉴를 클릭하면 해당 섹션으로 부드럽게 이동
    $('nav ul li a').click(function(e){
        e.preventDefault();
        e.stopPropagation();
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop:$($anchor.attr('href')).offset().top
        },1000);
    });
    // 섹션창 옆에서 나오는 애니메이션
    const boxes = document.querySelectorAll(".box");

    const checkBoxes = () => {
        const triggerBottom = (window.innerHeight / 5) * 4;
        boxes.forEach((box) => {
            const boxTop = box.getBoundingClientRect().top;
            if (boxTop < triggerBottom) box.classList.add("show");
            else box.classList.remove("show");
        });
    };

    window.addEventListener("scroll", checkBoxes);
    checkBoxes()

    // swiper
    var swiper = new Swiper(".mySwiper", {
        freeMode: true,
        slidesPerView: 3,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            768: {
                spaceBetween:20,
            },
            1024: {
                spaceBetween:30,
            },
            1600: {
                spaceBetween:40,
            },
            1920: {
                spaceBetween:50,
            }
        },
    });
    // popup 
    var img_num=0;
    var img_total=$('.swiper-slide').length;
    $('.popup').hide();
    $('.swiper-slide').click(function(e){
        e.preventDefault();
        // 클릭한 이미지의 인덱스 번호를 img_num에 저장
        // 인덱스번호는 0부터 시작하고 이미지의 번호는 1부터 시작하므로 공식에 1을 더해주어야한다.
        img_num=$(this).index()+1;
        // 클릭한 이미지의 a태그의 href속성을 img_attr변수에 저장
        var img_attr=$(this).find('a').attr('href');
        var img_addr='<img src="'+img_attr+'">';
        // 클릭한 swiper-slide의 data속성값을 txt_addr변수에 저장
        var txt_addr=$(this).attr('data');
        console.log(txt_addr);
        // txt_addr의 값을 쉼표(,)를 기준으로 잘라서 배열로 만듬, 배열의 인덱스는 5개임(0,1,2,3,4)
        // str[0]=1
        // str[1]=포스터 디자인
        // str[2]=moon knight
        // str[3]=포토샵 $ 일러스트
        // str[4]=깔끔하고 
        var str=txt_addr.split(',',5);
        var txt_str='<div class="slide_des"><div class="slide_title"><i>'+str[0]+'</i>'+str[1]+'</div><div class="slide_sub_title">제 목</div><div class="slide_content">'+str[2]+'</div><div class="slide_sub_title">스 킬</div><div class="slide_content">'+str[3]+'</div><div class="slide_sub_title">컨 셉</div><div class="slide_content">'+str[4]+'</div></div>';
        
        $('.graphic').empty();
        $('.txt').empty();
        $('.graphic').append(img_addr);
        $('.txt').append(txt_str);
        $('.popup').show();
        $('html, body').css('overflow-y', 'hidden');
    });
    // 팝업창 닫기
    $('.popup .close').click(function(e){
        e.preventDefault();
        e.stopPropagation();
        $('.popup').hide();
        $('html, body').css('overflow-y', 'visible');
    });
    // 팝업창의 오른쪽버튼
    $('.popup .nextBtn').click(function(e){
        e.preventDefault();
        e.stopPropagation();
        img_num++; 
        if(img_num>img_total){
            img_num=1;
        }       
        var img_addr='<img src="img/mockup'+img_num+'.jpg">'
        var txt_addr=$('.swiper-slide').eq(img_num-1).attr('data');
        var str=txt_addr.split(',',5); 
        var txt_str='<div class="slide_des"><div class="slide_title"><i>'+str[0]+'</i>'+str[1]+'</div><div class="slide_sub_title">제목</div><div class="slide_content">'+str[2]+'</div><div class="slide_sub_title">스킬</div><div class="slide_content">'+str[3]+'</div><div class="slide_sub_title">컨셉</div><div class="slide_content">'+str[4]+'</div></div>';

        $('.graphic').empty();
        $('.txt').empty();
        $('.graphic').append(img_addr);
        $('.txt').append(txt_str);
        $('.popup').show();
        $('html,body').css('overflow-y','hidden');     
    });

    // 팝업창의 왼쪽버튼
    $('.popup .prevBtn').click(function(e){
        e.preventDefault();
        e.stopPropagation();
        img_num--;
        if(img_num<=0){
            img_num=img_total;
        }   
        var img_addr='<img src="img/mockup'+img_num+'.jpg">'
        var txt_addr=$('.swiper-slide').eq(img_num-1).attr('data');
        var str=txt_addr.split(',',5); 
        var txt_str='<div class="slide_des"><div class="slide_title"><i>'+str[0]+'</i>'+str[1]+'</div><div class="slide_sub_title">제목</div><div class="slide_content">'+str[2]+'</div><div class="slide_sub_title">스킬</div><div class="slide_content">'+str[3]+'</div><div class="slide_sub_title">컨셉</div><div class="slide_content">'+str[4]+'</div></div>';

        $('.graphic').empty();
        $('.txt').empty();
        $('.graphic').append(img_addr);
        $('.txt').append(txt_str);
        $('.popup').show();
        $('html,body').css('overflow-y','hidden');
    });
    
    setTimeout(function emailOpen(){
        $('.letter-image').addClass('active');
        setTimeout(function emailClose(){
            $('.letter-image').removeClass('active');
            setTimeout(emailOpen, 3000);
        }, 3000);
    },3000);
    
    // setTimeout(emailOpen, 3000);

    // footer 
    var footer_tl =gsap.timeline({repeat:-1, ease:Linear.easeNone}); 
    footer_tl.set('footer .bg', {y: -10,delay: .5})
             .set('footer .bg', {y: 0,delay: .5});

    // 홈페이지 화면을 클릭할 때마다 다른 아이콘 나옴
    var arr=[
        'img/icon_01.png',
        'img/icon_02.png',
        'img/icon_03.png',
        'img/icon_04.png',
        'img/icon_05.png',
        'img/icon_06.png'
    ];
    var ran=0;
    var mouseX=0;
    var mouseY=0;
    $('body').on('click', function(e){
        e.stopPropagation();
        mouseX=e.pageX;
        mouseY=e.pageY;
        ran=Math.floor(Math.random()*arr.length);
        $('#icon').empty();
        $('#icon').append('<img src="'+arr[ran]+'">');
        $('#icon').css({'left':mouseX+10, 'top':mouseY+10});
        gsap.from('#icon img',0.3,{
            width:'70%',
            height:'70%',
            opacity:0,
            rotation:30,
            transformOrigin:'center',
        });
        gsap.to('#icon img',0.3,{
            width:'100%',
            height:'100%',
            opacity:1,
            rotation:-30,
            esae:Back.easeOut,
            transformOrigin:'center',
            onComplete:onCom
        });
        function onCom() {
            gsap.to('#icon img',1,{
                width:'70%',
                height:'70%',
                opacity:0,
                rotation:-30,
                delay:0.2,
                transformOrigin:'center',
            });
        }
    });
    $('button').click(function(e){
        e.stopPropagation();
    });
    var _old = jQuery.Event.prototype.stopPropagation;

    jQuery.Event.prototype.stopPropagation = function() {
        this.target.nodeName !== 'SPAN' && _old.apply( this, arguments );
    };
    // top 버튼 
    /* Scroll back to top */
	if($('.progress-wrap').length){
		var progressPath = document.querySelector('.progress-wrap path');
		var pathLength = progressPath.getTotalLength();
		progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
		progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
		progressPath.style.strokeDashoffset = pathLength;
		progressPath.getBoundingClientRect();
		progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';		
		var updateProgress = function () {
			var scroll = $(window).scrollTop();
			var height = $(document).height() - $(window).height();
			var progress = pathLength - (scroll * pathLength / height);
			progressPath.style.strokeDashoffset = progress;
		}
		updateProgress();
		$(window).scroll(updateProgress);	
		var offset = 50;
		var duration = 550;
		$(window).on('scroll', function() {
			if ($(this).scrollTop() > offset) {
				$('.progress-wrap').addClass('active-progress');
			} else {
				$('.progress-wrap').removeClass('active-progress');
			}
		});				
		$('.progress-wrap').on('click', function(event) {
			event.preventDefault();
			$('html, body').animate({scrollTop: 0}, duration);
			return false;
		})
	}
    
});