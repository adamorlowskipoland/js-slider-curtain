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

const octopus = {
    "myTimeOut" : "",
    "clearWrapperTimeOut" : "",
    "changeRotationTimeOutShow" : "",
    "changeRotationTimeOutHide" : "",
    "rotationToBottomTimeOut" : "",

    "getWrapper" : function() {
        var wrapper = document.getElementById('wrapper');
        return wrapper;
    },
    "createImg" : function() {
        var pic = document.createElement('img');
        pic.id = 'pic'
        pic.style.transform = 'rotateX(-90deg)';
        return pic;
    },

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
    "setImg" : function(x) {
        var pic = octopus.getImg();
        var wrapper = octopus.getWrapper();
        wrapper.appendChild(pic);
        pic.setAttribute('src', model.pics[x].imgSrc);
        pic.setAttribute('alt', model.pics[x].imgAlt);
        octopus.changeRotation();
    },
    "manualSetImg" : function(index) {
        var wrapper = octopus.getWrapper();
        wrapper.innerHTML = "";
        clearTimeout(octopus.myTimeOut);
        clearTimeout(octopus.clearWrapperTimeOut);
        clearTimeout(octopus.changeRotationTimeOutShow);
        clearTimeout(octopus.changeRotationTimeOutHide);
        clearTimeout(octopus.rotationToBottomTimeOut);
        octopus.setImg(index);
        octopus.carousel(index);
    },
    "carousel" : function(x) {
        octopus.myTimeOut = setTimeout(function() {octopus.changeImg(x)}, 3000);
    },

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
    "changeRotation" : function() {
        var pic = octopus.getImg();
        octopus.changeRotationTimeOutShow = setTimeout(function() {
            pic.style.transform = "rotateX(-0.0001deg)";
            var wrapper = octopus.getWrapper();
            octopus.changeRotationTimeOutHide = setTimeout(function() {
                octopus.rotationToBottom();
            }, 1350);
        }, 100);
    },
    "rotationToBottom" : function() {
        var pic = octopus.getImg();
        var wrapper = octopus.getWrapper();
        wrapper.style.perspectiveOrigin = "bottom";
        pic.style.transformOrigin = "bottom";
        pic.style.transform = "rotateX(0.0001deg)";
        octopus.rotationToBottomTimeOut = setTimeout(function() {
            pic.style.transform = "rotateX(90deg)";
            octopus.clearWrapper();
        }, 800)
    },
    "clearWrapper" : function() {
        var wrapper = octopus.getWrapper();
        octopus.clearWrapperTimeOut = setTimeout(function() {
            wrapper.innerHTML = "";
        }, 700)
    },
    "createLIs" : function() {
        var UL = document.getElementById('UL');
        for (var i = 0; i <= model.pics.length-1; i++) {
            var LI = document.createElement('li');
            LI.className = 'indicator';
            UL.appendChild(LI);
        }
    },
    "addActiveClass" : function(x) {
        var indicators = Array.from(document.getElementsByClassName('indicator'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        indicators[x].classList.add('active');
        
    },
    "eventListeners" : function() {
        const indicators = Array.from(document.getElementsByClassName('indicator'));
        indicators.forEach(indicator => indicator.addEventListener('click', function() {
            var index = indicators.indexOf(this);
            octopus.manualSetImg(index);
            octopus.addActiveClass(index);
        }))

    }
}


const view = {
    displayPic : function() {
        octopus.setImg(0);
        octopus.createLIs();
        octopus.addActiveClass(0);
        octopus.carousel(0);
        octopus.eventListeners();
    }
}

view.displayPic();