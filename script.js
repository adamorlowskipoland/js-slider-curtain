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

    "getImg" : function() {
        var pic1 = document.getElementById('pic1');
        pic1.style.transform = "rotateX(-90deg)";
        return pic1;
    },
    "setImg" : function(x) {
        var pic = octopus.getImg();
        setTimeout(function() {
            pic.setAttribute('src', model.pics[x].imgSrc);
            pic.setAttribute('alt', model.pics[x].imgAlt);            
        },700);
        octopus.changeRotation();
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
        setTimeout(function() {
            pic.style.transform = "rotateX(-0.0001deg)";            
        }, 700);
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
            clearTimeout(octopus.myTimeOut);
            octopus.setImg(index);
            octopus.addActiveClass(index);
            octopus.carousel(index);
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