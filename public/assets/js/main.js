(function($){
  "use strict";
  
  /* sticky header - start*/
  
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 120) {
      $('.header-nav').addClass("sticky")
    } else {
      $('.header-nav').removeClass("sticky")
    }
  });
  /* sticky header - end */
  
  /* bg parallax - start */
  
  $('[data-parallax]').parallax({
    speed: .6,
  });
  /* bg parallax - end */
  
  /* hero sec start sec end */
  $('.hero-slider-wrap').slick({
    dots: false,
    speed: 1000,
    arrows: false,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    pauseOnHover: true,
    autoplaySpeed: 6000,
   
  });
  
  /* hero sec start sec end */
  
  /* review sec start start */
  
  $('.review-card-items-wrap').slick({
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
    prevArrow: ".main-left-arrow",
    nextArrow: ".main-right-arrow",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 991.98,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 767.98,
        settings: {
          slidesToShow: 1,
        }
      }
      
    ]
  });
  /* review sec start sec end */
  
  /* counter */
  $('.counter-box[data-countdown]').each(function() {
    var $this = $(this), countdownDate = $(this).data('countdown');
    $this.countdown(countdownDate, function(event) {
      var $this = $(this).html(event.strftime(''
      + '<li class="days"><strong class="day2">%D</strong><span class="d-block">Days</span></li>'
      + '<li class="hours"><strong class="hours2">%H</strong><span class="d-block">Hours</span></li>'
      + '<li class="minutes"><strong class="min2">%M</strong><span class="d-block">Minutes</span></li>'
      + '<li class="seconds"><strong class="sec2">%S</strong><span class="d-block">Seconds</span></li>'));
    }).on('finish.countdown', function() {
      alert("Today's the Day!");
    });
  });
  
  // Add event listener to update countdown on input change
  var countdownDateInput = document.getElementById("countdown-date");
  var countdownUl = document.querySelector(".counter-box");
  
  countdownDateInput.addEventListener("input", function() {
    var countdownDate = countdownDateInput.value;
    countdownUl.setAttribute("data-countdown", countdownDate);
    // Restart countdown with new date
    $('.counter-box[data-countdown]').countdown(countdownDate);
  });
  /* counter */
 
      
  $(document).on( 'click', '.mode', function(e){
    e.preventDefault;
    if($('body').hasClass('dark-version')) {
        $('body').removeClass('dark-version');
        $('.mode .fa-moon').show();
        $('.mode .fa-sun').hide();
    } else {
        $('body').addClass('dark-version');
        $('.mode .fa-moon').hide();
        $('.mode .fa-sun').show();
    }
  }); 



  AOS.init({

  });

  $(document) .ready(function(){
    $('.zoom-gallery').magnificPopup({
        delegate: '.item-thumb',
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom mfp-img-mobile',
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300,
            opener: function(element) {
                return element.find('img');
            }
        }
    });
  });

    
})(jQuery);

var trash = document.getElementsByClassName("fa-trash");

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const pic = this.parentNode.parentNode.childNodes[1].innerText
        const name = this.parentNode.parentNode.childNodes[3].innerText
        const media = this.parentNode.parentNode.childNodes[5].innerText
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'pic': pic,
            'name': name,
            'media':media
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});



// document.querySelector('#speakerAdd').addEventListener('click', addCharacter)
// const speakersGallery = document.getElementById('speakers');
// function addCharacter(){

//   const newGalleryItem = document.createElement('div');
//   newGalleryItem.classList.add('col-md-6', 'col-lg-4', 'col-xl-3');
//   newGalleryItem.innerHTML = `
  
//     <div class="speakers-gallery-item" data-aos="fade-up" data-aos-easing="linear" data-aos-duration="400">
//       <div class="speakers-gallery-item-thumb overflow-hidden position-relative">
//         <img src="assets/images/gallery/gallery1.jpg" alt="Gallery Image 1">
//       </div>
//       <div class="">
//         <ul class="social-icons social">
//           <li>
//             <a href="">Work</a>
//           </li>
//           <li>
//             <a href="" class="edit-speaker-btn" data-speaker-id="1">Edit</a>
//           </li>
//           <li>
//             <a href="">Delete</a>
//           </li>
//         </ul>
//       </div>
//       <div class="item-content">
//         <h3 class="title">Character Name</h3>
//         <span class="sub">Media Name</span>
//       </div>
//     </div>
//   `;
  
//   // add new gallery item to speakers gallery
//   speakersGallery.querySelector('.speakers-gallery-items-wrap .row').appendChild(newGalleryItem);

//   // Select the edit button and add an event listener
//   const editBtn = newGalleryItem.querySelector('.edit-speaker-btn');
//   editBtn.addEventListener('click', (event) => {
//     event.preventDefault();
  
//     // Retrieve the speaker ID from the data attribute
//     const speakerId = event.target.getAttribute('data-speaker-id');

//     // Open the modal with a form for editing the speaker
//     const modal = document.getElementById('edit-speaker-modal');
//     modal.style.display = 'block';
  
//     // Populate the form with the current speaker data
//     const speakerNameInput = modal.querySelector('#speaker-name-input');
//     const mediaNameInput = modal.querySelector('#media-name-input');
//     // ...
  
//     // Add an event listener to the form submit button
//     const submitBtn = modal.querySelector('#submit-btn');
//     submitBtn.addEventListener('click', (event) => {
//       event.preventDefault();
    
//       // Retrieve the new speaker data from the form
//       const newSpeakerName = speakerNameInput.value;
//       const newMediaName = mediaNameInput.value;
//       // ...
    
//       fetch(`/speakers/${speakerId}`)
//         .then(response => response.json())
//         .then(speaker => {
//           // Set the values of the form fields to the speaker data
//           speakerNameInput.value = speaker.name;
//           mediaNameInput.value = speaker.media;
       
//         // ...
//       })
//       .catch(error => console.error(error));
//     });
//   });
// }


//  // Get the input values
//  const name = document.querySelector('#name').value;
//  const title = document.querySelector('#title').value;
//  // const image = speakerForm.elements.image.value;

//  // Create a new gallery item
//  const newGalleryItem = document.createElement('div');
//  newGalleryItem.classList.add('col-md-6', 'col-lg-4', 'col-xl-3');
//  newGalleryItem.innerHTML = `
//    <div class="speakers-gallery-item" data-aos="fade-up" data-aos-easing="linear" data-aos-duration="400">
//      <div class="speakers-gallery-item-thumb overflow-hidden position-relative">
   
//      </div>
//      <div class="">
//        <ul class="social-icons social">
//          <li>
//            <a href=""><i class="fa-brands fa-facebook-f"></i></a>
//          </li>
//          <li>
//            <a href=""><i class="fa-brands fa-linkedin-in"></i></a>
//          </li>
//          <li>
//            <a href=""><i class="fa-brands fa-twitter"></i></a>
//          </li>
//        </ul>
//      </div>
//      <div class="item-content">
//        <h3 class="title">${name}</h3>
//        <span class="sub">${title}</span>
//      </div>
//    </div>
//  `;

//  // Add the new gallery item to speakers gallery
//  speakersGallery.querySelector('.speakers-gallery-items-wrap .row').appendChild(newGalleryItem);

//  // Send the speaker data to the server
//  const data = { name, title, image };
//  fetch('/speakers', {
//    method: 'POST',
//    headers: {
//      'Content-Type': 'application/json'
//    },
//    body: JSON.stringify(data)
//  })
//  .then(response => response.json())
//  .then(data => console.log(data))
//  .catch(error => console.error(error));

//  // Reset the form
//  speakerForm.reset();
// }
