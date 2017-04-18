const model = {
    "pics": [
        {
            "imgName" : "pic1",
            "imgSrc" : "imgs/pic1.jpg",
            "imgAlt" : "Img training 1"
        },
        {
            "imgName" : "pic2",
            "imgSrc" : "imgs/pic2.jpg",
            "imgAlt" : "Img training 2"
        },
        {
            "imgName" : "pic3",
            "imgSrc" : "imgs/pic3.jpg",
            "imgAlt" : "Img training 3"
        },
        {
            "imgName" : "pic4",
            "imgSrc" : "imgs/pic4.jpg",
            "imgAlt" : "Img training 4"
        }
    ]
}

// operator object 
const octopus = {
    "carouselTimeOut" : "",
    "changeRotationTimeOutShow" : "",
    "changeRotationTimeOutHide" : "",
    "rotationToBottomTimeOut" : "",
// catching wrapper
    "getWrapper" : function() {
        var wrapper = document.getElementById('wrapper');
        return wrapper;
    },
// creating img and setting position
    "createImg" : function() {
        var pic = document.createElement('img');
        pic.id = 'pic'
        pic.style.transform = 'rotateX(-90deg)';
        return pic;
    },
// getting img from DOM or creating new one && setting wrapper persoective
    "getImg" : function() {
        var wrapper = octopus.getWrapper(); 
        wrapper.style.perspectiveOrigin = "top";
        if (wrapper.hasChildNodes()) {
            var pic = document.getElementById('pic');
        } else {
            var pic = octopus.createImg();
        }       
        pic.style.transform = "rotateX(-90deg)";
        pic.style.transformOrigin = "top";
        return pic;

    },
// setting correct img based on given value 'x'
    "setImg" : function(x) {
        var pic = octopus.getImg();
        var wrapper = octopus.getWrapper();
        wrapper.appendChild(pic);
        pic.setAttribute('src', model.pics[x].imgSrc);
        pic.setAttribute('alt', model.pics[x].imgAlt);
        octopus.changeRotation(pic);
    },
// after clicking indicator clearing all intervals and wrapper, starting again from clicked indicator
    "manualSetImg" : function(index) {
        var wrapper = octopus.getWrapper();
        wrapper.innerHTML = "";
        clearTimeout(octopus.carouselTimeOut);
        clearTimeout(octopus.changeRotationTimeOutShow);
        clearTimeout(octopus.changeRotationTimeOutHide);
        clearTimeout(octopus.rotationToBottomTimeOut);
        octopus.setImg(index);
        octopus.carousel(index);
    },
// calling changeImg after 3s
    "carousel" : function(x) {
        octopus.carouselTimeOut = setTimeout(function() {octopus.changeImg(x)}, 3000);
    },
// changing img, adding active class to indicator and calling carousel again
    "changeImg" : function(x) {
        var x = x;
        if (x == (model.pics.length-1)) {
            x = 0;
            octopus.setImg(x);
            octopus.addActiveClass(x);
            octopus.carousel(x);
        } else {
            x++;
            octopus.setImg(x);
            octopus.addActiveClass(x);
            octopus.carousel(x);
        }
    },
// change img rotation from top to middle with timeout for better effect
    "changeRotation" : function(pic) {
        octopus.changeRotationTimeOutShow = setTimeout(function() {
            pic.style.transform = "rotateX(-0.0001deg)";
            octopus.changeRotationTimeOutHide = setTimeout(function() {
                octopus.rotationToBottom(pic);
            }, 1350);
        }, 100);
    },
// change img rotation from middle to bottom with timeout 
// changing wrapper and img perspectife for better effect
// calling clearWrapper
    "rotationToBottom" : function(pic) {
        var wrapper = octopus.getWrapper();
        wrapper.style.perspectiveOrigin = "bottom";
        pic.style.transformOrigin = "bottom";
        pic.style.transform = "rotateX(0.0001deg)";
        octopus.rotationToBottomTimeOut = setTimeout(function() {
            pic.style.transform = "rotateX(90deg)";
            octopus.clearWrapper(wrapper, pic);
        }, 800)
    },
// deleting img from wrapper after img finishes transition
    "clearWrapper" : function(wrapper, pic) {
        pic.addEventListener('transitionend', function() {
            wrapper.innerHTML = "";            
        });
    },

// creating a list of indicators based on how many imgs there is in a model.pics
    "createLIs" : function() {
        var UL = document.getElementById('UL');
        for (var i = 0; i <= model.pics.length-1; i++) {
            var LI = document.createElement('li');
            LI.className = 'indicator';
            UL.appendChild(LI);
        }
    },
// add class 'active' to indicate which img is beeing shown
    "addActiveClass" : function(x) {
        var indicators = Array.from(document.getElementsByClassName('indicator'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        indicators[x].classList.add('active');
    },
// listens for clicking indicator
    "eventListeners" : function() {
        const indicators = Array.from(document.getElementsByClassName('indicator'));
        indicators.forEach(indicator => indicator.addEventListener('click', function() {
            var index = indicators.indexOf(this);
            octopus.manualSetImg(index);
            octopus.addActiveClass(index);
        }))

    }
}


// displaying slider and setting carousel
const view = {
    displayPic : function() {
        octopus.setImg(0);
        octopus.createLIs();
        octopus.addActiveClass(0);
        octopus.carousel(0);
        octopus.eventListeners();
    }
}

// firing up
view.displayPic();