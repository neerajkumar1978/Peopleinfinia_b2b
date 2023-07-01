
// header fixed
// $(window).scroll(function(){
//    if ($(this).scrollTop() > 400){
//      $('body').addClass("header-fixed");
//       $('.burger-bg').css("background", "url('img/menu-icon.png')");
//    }
//   else{
//     $('.burger-bg').css("background", "url('img/menu-icon1.png')");
//     $('.burger-bg1').css("background", "url('img/menu-icon.png')");
//      $('body').removeClass("header-fixed");
//    }
// });










$(document).ready(function() {
    // $('.accordion').find('.accordion-toggle').click(function() {
    //     $(this).next().slideToggle('600');
    //     $(".accordion-content").not($(this).next()).slideUp('600');
    // });
    $('.accordion-toggle').on('click', function() {
        $(this).toggleClass('active').siblings().removeClass('active');
    });
});





//Back To Top-//
$('footer').after('<a id="back-to-top" href="#top"><span></span></a>');
$("#back-to-top").hide();
$(function () {
  $(window).scroll(function(){
    if ($(window).scrollTop()>300){
       $("#back-to-top").fadeIn(500);
    }
    else{
       $("#back-to-top").fadeOut(500);
    }
  });
  $("#back-to-top").click(function(){
     $('body,html').animate({scrollTop:0},500);
     return false;
  });
});



// $( document ).ready(function() {
// var mybutton = document.getElementById("myBtn");

// // When the user scrolls down 20px from the top of the document, show the button
// window.onscroll = function() {scrollFunction()};

// function scrollFunction() {
//   if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
//     mybutton.style.display = "block";
//   } else {
//     mybutton.style.display = "none";
//   }
// }

// // When the user clicks on the button, scroll to the top of the document
// function topFunction() {
//   document.body.scrollTop = 0;
//   document.documentElement.scrollTop = 0;
// };
// });


$(document).ready(function(){
    $('.menu-icon').click(function(){
        $(".side-menu").addClass("acive");
    });
    $('.close-btnm .close').click(function(){
        $(".side-menu").removeClass("acive");
    });
    $('.side-menu ul .nav-item').click(function(){
        $(".side-menu").removeClass("acive");
    });

    $('.collapse.in ul>.nav-item').click(function(){
        $(".collapse.in").css("display","none");
    });


    $('.navbar-cus').click(function(){
        $(".collapse-cus").toggleClass("active");
    });
    $('.collapse-cus ul .nav-item').click(function(){
        $(".collapse-cus").removeClass("active");
    });
});




$('.client-logo .owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    autoplay:true,
    autoplayTimeout:2000,
    nav:true,
    navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:7
        }
    }
});


	$('.companies-inn .owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    autoplay:true,
    autoplayTimeout:2500,
    nav:false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:5
        }
    }
});

	$('.call-bk .owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    autoplay:true,
    autoplayTimeout:2000,
    nav:true,
    navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:6
        }
    }

});

// var header = document.getElementById("faq-tabs");
// var btns = header.getElementsByClassName("nav-item");
// for (var i = 0; i < btns.length; i++) {
//   btns[i].addEventListener("click", function() {
//   var current = document.getElementsByClassName("active");
//   current[0].className = current[0].className.replace(" active", "");
//   this.className += " active";
//   });
// }

// $(".faq-tabs .nav-item").click(function(){
//     $(this).siblings().removeClass('active');
// });
