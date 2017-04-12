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
    "setAtributes" : function(x) {
        var pic = document.getElementById("pic");
        pic.setAttribute('src', model.pics[x].imgSrc);
        pic.setAttribute('alt', model.pics[x].imgAlt);
    },
    "changeAttributes" : function() {
        var x = 0;
        setInterval(function() {
            if (x == (model.pics.length-1)) {
                x = 0;
                octopus.setAtributes(x);
            } else {
                x++;
                octopus.setAtributes(x);
            }
        }, 3000);
    }
}


const view = {
    displayPic : function() {
        octopus.setAtributes(0);
        octopus.changeAttributes();
    }
}

view.displayPic();