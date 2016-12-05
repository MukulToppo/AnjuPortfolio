$(function()
				{
					footerNavigation();
					iconReveal();
				});
				function footerNavigation()  <!-- Navigational script for the page in the footer section-->
				{	$('.reveal').click(function()
					{
						$('html, body').animate({
							scrollTop: $('.About').offset().top
            }, 500);

					});
        }
				function iconReveal()
				{
					$('.hamburger').click(function(event)
					{
						event.preventDefault();
						$(this).toggleClass('open');
						if ($(this).hasClass("open"))
						 {
							 $('.social-container').animate({
								 right: '150px',
								 opacity: '1',
						},500);
						}
						else {
							$('.social-container').stop().animate({
								right: '5%',
								opacity: '0',
							}, 500);
						}
					});
				}
