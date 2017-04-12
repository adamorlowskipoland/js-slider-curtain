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
        }
    ]
}

const octopus = {
    "getImg" : function() {
        var pic1 = document.getElementById('pic1');
        pic1.style.transform = "rotateX(-115deg)";
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
    "changeImg" : function() {
        var x = 0;
        setInterval(function() {
            if (x == (model.pics.length-1)) {
                x = 0;
                octopus.setImg(x);
            } else {
                x++;
                octopus.setImg(x);
            }
        }, 3000);
    },
    "changeRotation" : function() {
        var pic = octopus.getImg();
        setTimeout(function() {
            pic.style.transform = "rotateX(-0.0001deg)";            
        }, 700);
    }
}


const view = {
    displayPic : function() {
        octopus.setImg(0);
        octopus.changeImg();
    }
}

view.displayPic();