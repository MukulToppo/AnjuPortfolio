$(function()
				{
					footerNavigation();			// code to scroll page down the next section when the "reveal" div element is clicked.
					iconReveal();						//Reveal script to toggle contacts icon hide and show in the cover.
				});
				function footerNavigation()  //Navigational script for the section below Landing section
				{	$('.reveal').click(function()
					{
						$('html, body').animate({
							scrollTop: $('.About').offset().top
            }, 500);

					});
        }
				function iconReveal()			//Reveal script to toggle contacts icon hide and show in the cover.
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



				$(window).scroll(function() {	   //Profile picture animation when scrolled to the about section.
 				var hT = $('.About').offset().top,
		 		hH = $('.About').outerHeight(),
		 		wH = $(window).height(),
		 		wS = $(this).scrollTop();
 				if (wS > ( hT+hH-wH))
 				{
		 			$('.About div').each(function(i)
	 					{
							setTimeout(function()
								{
									$('.About div').eq(i).addClass('showing'); 		//Adding a class named "showing"
								},400*(i+1));
	 					});
 					}
			});


			$(window).scroll(function() {		// Parallax effect in the Professional summary section.
			    var y = $(this).scrollTop(); // Pos
			    var r = 10; // Rate
			    $('.summary-2').css('background-position', 'center ' + parseInt(y/r) + 'px'); // Switch x polarity to reverse direction
			});


			//BINARY RANDOMIZER  (NOT WORKING)

			function WordShuffler(holder,opt){
  var that = this;
  var time = 0;
  this.now;
  this.then = Date.now();

  this.delta;
  this.currentTimeOffset = 0;

  this.word = null;
  this.currentWord = null;
  this.currentCharacter = 0;
  this.currentWordLength = 0;

  var options = {
    fps : 20,
    timeOffset : 5,
    textColor : '#000',
    fontSize : "50px",
    useCanvas : false,
    mixCapital : false,
    mixSpecialCharacters : false,
    needUpdate : true,
    colors : ['#32cd32']
  }

  if(typeof opt != "undefined"){
    for(key in opt){
      options[key] = opt[key];
    }
  }
  this.needUpdate = true;
  this.fps = options.fps;
  this.interval = 1000/this.fps;
  this.timeOffset = options.timeOffset;
  this.textColor = options.textColor;
  this.fontSize = options.fontSize;
  this.mixCapital = options.mixCapital;
  this.mixSpecialCharacters =          options.mixSpecialCharacters;
  this.colors = options.colors;

   this.useCanvas = options.useCanvas;

  this.chars = ['0','1'];


  if(this.mixSpecialCharacters){
    this.chars = this.chars.concat(this.specialCharacters);
  }

  this.getRandomColor = function () {
    var randNum = Math.floor( Math.random() * this.colors.length );
    return this.colors[randNum];
  }

  //if Canvas

  this.position = {
    x : 0,
    y : 50
  }
  //if DOM
  if(typeof holder != "undefined"){
    this.holder = holder;
  }

  if(!this.useCanvas && typeof this.holder == "undefined"){
    console.warn('Holder must be defined in DOM Mode. Use Canvas or define Holder');
  }


  this.getRandCharacter = function(characterToReplace){
    if(characterToReplace == " "){
      return ' ';
    }
    var randNum = Math.floor(Math.random() * this.chars.length);
    var lowChoice =  -.5 + Math.random();
    var picketCharacter = this.chars[randNum];
    var choosen = picketCharacter.toLowerCase();
    if(this.mixCapital){
      choosen = lowChoice < 0 ? picketCharacter.toLowerCase() : picketCharacter;
    }
    return choosen;

  }

  this.writeWord = function(word){
    this.word = word;
    this.currentWord = word.split('');
    this.currentWordLength = this.currentWord.length;
}

  this.generateSingleCharacter = function (color,character) {
    var span = document.createElement('span');
    span.style.color = color;
    span.innerHTML = character;
    return span;
  }

  this.updateCharacter = function (time) {

      this.now = Date.now();
      this.delta = this.now - this.then;

       if (this.delta > this.interval) {
        this.currentTimeOffset++;

        var word = [];

        if(this.currentTimeOffset === this.timeOffset && this.currentCharacter !== this.currentWordLength){
          this.currentCharacter++;
          this.currentTimeOffset = 0;
        }
        for(var k=0;k<this.currentCharacter;k++){
          word.push(this.currentWord[k]);
        }

        for(var i=0;i<this.currentWordLength - this.currentCharacter;i++){
          word.push(this.getRandCharacter(this.currentWord[this.currentCharacter+i]));
        }


        if(that.useCanvas){
          c.clearRect(0,0,stage.x * stage.dpr , stage.y * stage.dpr);
          c.font = that.fontSize + " sans-serif";
          var spacing = 0;
          word.forEach(function (w,index) {
            if(index > that.currentCharacter){
              c.fillStyle = that.getRandomColor();
            }else{
              c.fillStyle = that.textColor;
            }
            c.fillText(w, that.position.x + spacing, that.position.y);
            spacing += c.measureText(w).width;
          });
        }else{

          if(that.currentCharacter === that.currentWordLength){
            that.needUpdate = false;
          }

					this.holder.innerHTML = '';
          word.forEach(function (w,index) {
            var color = null
            if(index > that.currentCharacter){
              color = that.getRandomColor();
            }else{
              color = that.textColor;
            }
            that.holder.appendChild(that.generateSingleCharacter(color, w));
          });
        }
        this.then = this.now - (this.delta % this.interval);
      }
  }

  function update(time) {
    time++;
    if(that.needUpdate){
      that.updateCharacter(time);
    }
    requestAnimationFrame(update);
  }

  this.writeWord(this.holder.innerHTML);


  console.log(this.currentWord);
  update(time);
}

var text = document.getElementById('text');

var pText = new WordShuffler(text,{
  textColor : '#EED54B',
  timeOffset : 2
});
