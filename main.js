var firebaseConfig = {
    apiKey: "AIzaSyAvexg6XWJotjy8BJqDLU6Yc_2jgupAcNU",
    authDomain: "adaptive-1554480223106.firebaseapp.com",
    databaseURL: "https://adaptive-1554480223106.firebaseio.com",
    projectId: "adaptive-1554480223106",
    storageBucket: "adaptive-1554480223106.appspot.com",
    messagingSenderId: "1092575332403"
};
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
// var storage = firebase.storage();
var x=1;
$(document).ready(function () {

    $("body").on("change", ".classhere", function () {
        var fileInput = $(this)[0];//returns a HTML DOM object by putting the [0] since it's really an associative array.
        var file = fileInput.files[0]; //there is only '1' file since they are not multiple type.

        var reader = new FileReader();
        reader.onload = function (e) {
            // Create a new image.
            var img = new Image();

            img.src = reader.result;
            var ida = img.src;

            var dataImage = localStorage.getItem('theImage');

            // counter = localStorage.getItem('c');
            // var postNum = 'post' + postsCounter;
            if(x===1){
                attach1(img);
            }
            if(x===2){
                attach2(img);
                x-=2;
            }
            x++;
        }
        reader.readAsDataURL(file);//attempts to read the file in question.
    });
});

//
// var postsCounter = 1;
// if (localStorage.getItem('pc') > 1) {
//     postsCounter = localStorage.getItem('pc');
// }
// localStorage.setItem('pc', postsCounter);
//
// var z = 0;

var idcount=0;
var usersCount=0;
{
    db.collection("polls").get().then(snap => {
        snap.forEach((doc) => {
            idcount++;
            console.log(idcount);
        });
    });
    idcount++;
}


{
    var USER_ID;
    if(!localStorage.getItem('user_id')){
        counting_users();
    }
    else{
        USER_ID=localStorage.getItem('user_id');
    }
    function counting_users(){
            db.collection("users").get().then(snap => {
                snap.forEach((doc) => {
                    usersCount++;
                });
                console.log(usersCount);
                usersCount++;
                localStorage.setItem('user_id','user'+(usersCount));
                USER_ID=localStorage.getItem('user_id');
                db.collection("users").doc("user" + usersCount).set({

                })
            });
    }
}
const user_id=USER_ID;
const likedPosts=[];
{
    db.collection("users").get().then(snap => {
        snap.forEach((doc) => {
            if(doc.id===localStorage.getItem('user_id')){
                console.log(doc.data());
                likedPosts.push(doc.data());
            }
        });
        showLikedPics(likedPosts)
    });
    function showLikedPics(ArrLikes) {
        for(var i=0;i<ArrLikes[0].likes.length;i++){
            let liked_pic = ArrLikes[0].likes[i];
            let d = document.getElementById(liked_pic);
            d.className += " your_choice";
            let parent=document.getElementById(liked_pic).parentElement.id;
            let parent2=document.getElementById(parent).parentElement.id;
            $("#" + parent2 + "_L_percentage").fadeIn("slow");
            $("#" + parent2 + "_R_percentage").fadeIn("slow");
            $("#" + parent2 + "_totalLikes").fadeIn("slow");
            $("#" + parent2 + "_rateline").fadeIn("slow");

            // document.getElementById(parent2 + "_R_percentage").style.display="block";
            // document.getElementById(parent2 + "_L_percentage").style.display="block";
        }
    }
}
function posting(box) {
    // document.getElementById('stepperbtn').innerHTML = "post";

    var img1_src = $('#labelimg1').css('background-image').replace('url(','').replace(')','').replace(/\"/gi, "");
    var img2_src = $('#labelimg2').css('background-image').replace('url(','').replace(')','').replace(/\"/gi, "");

    db.collection("polls").doc("post" + idcount).set({
        images:{
            image1: img1_src,
            image2: img2_src
        },
        pic1: 0,
        pic2: 0
    })
        .then(function () {
            console.log("Document successfully written!");
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });

    document.getElementById('postlabcross').style.display = "none";

    db.collection("polls").doc("post" + idcount).get().then(function (doc) {
        poll.imgarray.push(doc.data());
        poll.id=doc.id;
        polls.push(poll);
        createPoll(poll);
    });

}


const polls = [];
poll = {
    id: idcount,
    imgarray: []
};
db.collection("polls").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        poll.imgarray.push(doc.data());
        poll.id=doc.id;
        polls.push(poll);
        poll = {
            id: 0,
            imgarray: []
        };
    });
    createPoll(polls);
});

function createPoll(polls){
    if(Array.isArray(polls)){
        for(let counter=0;counter<polls.length;counter++){
            createPoll2(polls[counter]);
        }
    }else{
        createPoll2(polls);
    }
}

function createPoll2(polls){
    var c=polls.id.length-4;
    let i = polls.id[3+c];
    $("#wall").prepend("<div class='postgroup'>" +
        "<div class='post'>" +
        "<div class='stats'>" +
        "<div class='statistics3' onclick='openchart(this.id);'>" +
        "<i class=\"fas fa-bars\"></i>" +
        "</div>" +
        "</div>" +
        "<div class='gridos' >" +
        "<div class='pic1' onclick='doubleClick(this.id)'>" +
        "<div class='heart heart1'><i class=\"fas fa-heart\"></i></div>" +
        "<div class='left_percentage'>0%</div>" +
        "<div class='mask flex-center rgba-stylish-strong' id='mask1'>" +
        "</div>" +
        "</div>" +
        "<div class='pic2' onclick='doubleClick(this.id)'>" +
        "<div class='heart heart2'><i class=\"fas fa-heart\"></i></div>" +
        "<div class='right_percentage'>0%</div>" +
        "<div class='mask flex-center rgba-stylish-strong' id='mask2'>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "<div id='description_area' class='description_area'><div class='rateline'><div class='subline'></div></div><div class='total_likes'>0</div></div>" +
        "</div><div class=\" animated fadeInLeft\" alt=\"Transparent MDB Logo\"><div class=\"stats\" id=\"post1_stats\">\n" + "<div class=\"statistics1\" id=\"post1_worldicon\" onclick=\"showchart(this.id);\"><i class=\"far fas fa-globe-americas\"></i></div>\n" + "<div class=\"statistics2\" id=\"post1_charticon\" onclick=\"showchart(this.id);\"><i class=\"far fa-chart-bar\"></i></div>\n" + "</div>\n" + "<div class=\"chart-area\">\n" + "<div class=\"analytica1\"><div class=\"chartgeo\" id=\"regions_div\" style=\"width: 600px; height: 468px; margin: 0 auto\"></div>\n</div>\n" + "<div class=\"analytica2\"></div>\n" + "</div></div></div>");
    var currentPost = $('.post').first();
    var postgroup = $('.postgroup').first();
    var animated = $('.animated').first();
    currentPost.addClass('post' + (i));
    currentPost.addClass('example hoverable');
    currentPost.attr('id', 'post' + (i));
    currentPost.find('.pic1').attr('id', 'post' + i + '_pic1');
    currentPost.find('.pic1').addClass('view overlay');
    currentPost.find('.pic2').attr('id', 'post' + i + '_pic2');
    currentPost.find('.pic2').addClass('view overlay');
    currentPost.find('.description_area').addClass('script' + (i));
    currentPost.find('.description_area').attr('id', 'post' + (i) + '_script');

    currentPost.find('.radio1').attr('id', 'post' + (i) + '_radio1');
    currentPost.find('.radio2').attr('id', 'post' + (i) + '_radio2');

    var label1 = document.getElementsByClassName('label1');
    label1.htmlFor = 'post' + (i) + '_radio1';
    var label2 = document.getElementsByClassName('label2');
    label2.htmlFor = 'post' + (i) + '_radio2';

    currentPost.find('.vote1').attr('id', 'post' + (i) + '_vote1');
    currentPost.find('.vote2').attr('id', 'post' + (i) + '_vote2');
    currentPost.find('.heart1').attr('id', 'post' + (i) + '_heart1');
    currentPost.find('.heart2').attr('id', 'post' + (i) + '_heart2');
    currentPost.find('.left_percentage').attr('id', 'post' + (i) + '_L_percentage');
    currentPost.find('.right_percentage').attr('id', 'post' + (i) + '_R_percentage');
    currentPost.find('.rateline').attr('id', 'post' + (i) + '_rateline');
    currentPost.find('.subline').attr('id', 'post' + (i) + '_subline');
    currentPost.find('.total_likes').attr('id', 'post' + (i) + '_totalLikes');
    currentPost.find('.gridos').attr('id', 'gridos' + (i));
    currentPost.find('.rgba-stylish-strong').attr('id', 'post' + (i) + '_mask1');
    currentPost.find('.rgba-stylish-strong').eq(1).attr('id', 'post' + (i) + '_mask2');
    currentPost.find('.phonelikes1').attr('id', 'post' + (i) + '_phonelikes1');
    currentPost.find('.phonelikes2').attr('id', 'post' + (i) + '_phonelikes2');
    currentPost.find('.stats').attr('id', 'post' + (i) + '_showstats');
    animated.find('.stats').attr('id','post' + (i) + '_stats');
    animated.find('.statistics1').attr('id', 'post' + (i) + '_worldicon');
    animated.find('.statistics2').attr('id', 'post' + (i) + '_charticon');
    currentPost.find('.statistics3').attr('id', 'post' + (i) + '_open');
    animated.find('.chart-area').attr('id', 'post' + (i) + '_chart_area');
    animated.find('.analytica1').attr('id', 'post' + (i) + '_regions_div');
    animated.find('.analytica2').attr('id', 'post' + (i) + '_chartContainer');
    animated.find('.chartgeo').attr('id', 'regions_div_postgroup' + (i));
    // animated.find('.chartbars').attr('id', 'chartContainer_postgroup' + (i));
    postgroup.find('.animated').attr('id', 'animated-post'+ (i));
    postgroup.addClass('postgroup' + i);
    postgroup.attr('id', 'postgroup' + i);
    document.getElementById('postgroup' + i).style.display="-webkit-box";

    let  pic1Id = 'post' + i + '_pic1';
    let  pic2Id = 'post' + i + '_pic2';
    $('#' + pic1Id).css('background-image','url(' + polls.imgarray[0].images.image1 + ')');
    $('#' + pic2Id).css('background-image','url(' + polls.imgarray[0].images.image2 + ')');
    count_percentage("post" + i);
}
function count_percentage(post_num) {
    db.collection("polls").doc(post_num).get().then(function(doc) {
        if (doc.exists) {
            var pics_rate=doc.data();
             console.log("Document data:", doc.data());
             var pic1_rate=pics_rate.pic1;
             var pic2_rate=pics_rate.pic2;
            document.getElementById(post_num + "_totalLikes").innerHTML="total: " + (pic1_rate+pic2_rate);
            let all_rates=pic1_rate+pic2_rate;
            pic1_rate=pic1_rate*100/all_rates;
            pic2_rate=pic2_rate*100/all_rates;
            if(all_rates===0){
                pic1_rate=0;
                pic2_rate=0;
            }
            document.getElementById(post_num + "_L_percentage").innerHTML=Math.floor(pic1_rate) + "%";
            document.getElementById(post_num + "_R_percentage").innerHTML=Math.floor(pic2_rate) + "%";
            document.getElementById(post_num + "_subline").style.width=pic1_rate + "%";

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    })
}
function count_percentage2(post_num,pic1_rate,pic2_rate) {
    this.pic1_rate=pic1_rate;
    this.pic2_rate=pic2_rate;
    document.getElementById(post_num + "_totalLikes").innerHTML="total: " + (this.pic1_rate+this.pic2_rate);
    let all_rates=this.pic1_rate+this.pic2_rate;
    this.pic1_rate=this.pic1_rate*100/all_rates;
    this.pic2_rate=this.pic2_rate*100/all_rates;
    if(all_rates===0){
        this.pic1_rate=0;
        this.pic2_rate=0;
    }
    document.getElementById(post_num + "_L_percentage").innerHTML=Math.floor(this.pic1_rate) + "%";
    document.getElementById(post_num + "_R_percentage").innerHTML=Math.floor(this.pic2_rate) + "%";
    document.getElementById(post_num + "_subline").style.width=this.pic1_rate + "%";
}


function attach1(file_url) {
        $(".imagearea1").html(file_url);
        $('#labelimg1').each(function () {
            var imgURL = $('#imagearea1').find('img').attr('src');
            $(this).css('background-image', 'url(' + imgURL + ')');
        });
    document.getElementById('1stepcircle').innerHTML = "&#10004";
    document.getElementById('label1').style.display = "none";
    document.getElementById('labelimg1').style.display = "block";
}

function attach2(file_url) {
    $(".imagearea2").html(file_url);
    $('#labelimg2').each(function () {
        var imgURL = $('#imagearea2').find('img').attr('src');
        $(this).css('background-image', 'url(' + imgURL + ')');
    });
    document.getElementById('label2').style.display = "none";
    document.getElementById('labelimg2').style.display = "block";
    document.getElementById('2stepcircle').innerHTML = "&#10004";
}

function radio(id) {
    var current='';
    var last='';
    var last1 ='';
    var last2 ='';
    var cur=document.querySelector('.shown').id;
    if(id==='stepperbtn'){
        if (cur==='form1'){
            id='2_step';
        }
        if(cur==='form2'){
            id='3_step';
        }
        if(cur==='description'){
            id='done';
        }
        if(cur==='postingspan'){
            id='postPoll';
        }
    }
    if(id==='1_step'){
        current= $('#form1');
        last=$('#postingspan');
        last.addClass('notshown');
        last.removeClass('shown');
        last1= $('#form2');
        last2=$('#description');
        current.addClass('shown');
        current.removeClass('notshown');
        last1.removeClass('shown');
        last1.addClass('notshown');
        last2.removeClass('shown');
        last2.addClass('notshown');
        document.getElementById('stepperbtn').innerHTML = "next";
    }
    if(id==='2_step'){
        current= $('#form2');
        last=$('#postingspan');
        last.addClass('notshown');
        last.removeClass('shown');
        last1= $('#form1');
        last2=$('#description');
        current.addClass('shown');
        current.removeClass('notshown');
        last1.removeClass('shown');
        last1.addClass('notshown');
        last2.removeClass('shown');
        last2.addClass('notshown');
        document.getElementById('stepperbtn').innerHTML = "next";
    }
    if(id==='3_step'){
        current= $('#description');
        last=$('#postingspan');
        last.addClass('notshown');
        last.removeClass('shown');
        last1= $('#form1');
        last2=$('#form2');
        current.addClass('shown');
        current.removeClass('notshown');
        last1.removeClass('shown');
        last1.addClass('notshown');
        last2.removeClass('shown');
        last2.addClass('notshown');
        document.getElementById('stepperbtn').innerHTML = "next";
    }
    if(id==='postPoll' && cur==='postingspan'){
        cur=$('#postingspan');
        var next=$('#form1');
        cur.addClass('notshown');
        cur.removeClass('shown');
        next.addClass('shown');
        next.removeClass('notshown');
        document.getElementById('postlabcross').style.display = "none";
        document.getElementById('stepperbtn').innerHTML = "next";
        document.getElementById('tan').style.display = "none";
        document.getElementById('postlabbottom').style.display = "none";
        document.getElementById('label1').style.display = "block";
        document.getElementById('labelimg1').style.display = "none";
        document.getElementById('label2').style.display = "block";
        document.getElementById('labelimg2').style.display = "none";
        document.getElementById('1stepcircle').innerHTML = "1";
        document.getElementById('2stepcircle').innerHTML = "2";
        document.getElementById('postlab').style.zIndex="2";
        posting();
    }
    if(id==='done' && cur!=='postingspan'){
        var done=$('#postingspan');
        done.addClass('shown');
        done.removeClass('notshown');
        last=$('#description');
        last.removeClass('shown');
        last.addClass('notshown');
        document.getElementById('stepperbtn').innerHTML = "post";
    }
}

var getElementsInArea = (function (docElm) {
    var viewportHeight = docElm.clientHeight;

    return function (e, opts) {
        var found = [], i;

        if (e && e.type == 'resize')
            viewportHeight = docElm.clientHeight;

        for (i = opts.elements.length; i--;) {
            var elm = opts.elements[i],
                pos = elm.getBoundingClientRect(),
                topPerc = pos.top / viewportHeight * 100,
                bottomPerc = pos.bottom / viewportHeight * 100,
                middle = (topPerc + bottomPerc) / 2,
                inViewport = middle > opts.zone[1] &&
                    middle < (100 - opts.zone[1]);

            elm.classList.toggle(opts.markedClass, inViewport);

            if (inViewport)
                found.push(elm);
        }
    };
})(document.documentElement);


////////////////////////////////////
// How to use:

window.addEventListener('scroll', f)
window.addEventListener('resize', f)

function f(e) {
    getElementsInArea(e, {
        elements: document.getElementsByClassName('postgroup'),
        markedClass: 'highlight--1',
        zone: [30, 30] // percentage distance from top & bottom
    });
}

function openchart(clicked_id) {


    var i = document.getElementById(clicked_id).parentElement.id;
    var i2 = document.getElementById(i).parentElement.id;
    var i3 = document.getElementById(i2).parentElement.id;

    if (document.getElementById('animated-' + (i2)).style.display === "-webkit-box") {
        document.getElementById(i3).style.width = "650px";
        setTimeout(function () {
            document.getElementById('animated-' + (i2)).style.display = "none";
        }, 1000);
        open = false;
        document.getElementById(i3).style.transform = "translate(0px,0px)";
        document.getElementById(clicked_id).style.color = "black";
    }
    else {

        document.getElementById(i3).style.transform = "translate(-300px,0px)";
        document.getElementById('animated-' + (i2)).style.display = "-webkit-box";
        document.getElementById(clicked_id).style.color = "#8ad5d8";
        open = true;
        document.getElementById(i3).style.width = "1300px";

        //geochart
        google.charts.load('current', {
            'packages': ['geochart'],
            // Note: you will need to get a mapsApiKey for your project.
            // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
            'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
        });
        google.charts.setOnLoadCallback(drawRegionsMap);

        function drawRegionsMap() {
            var data = google.visualization.arrayToDataTable([
                ['Country', 'Popularity'],
                ['Germany', 200],
                ['United States', 300],
                ['Brazil', 400],
                ['Canada', 500],
                ['France', 600],
                ['RU', 700]
            ]);

            var options = {
                backgroundColor: {},
                colorAxis: {minValue: 0, colors: ['whitesmoke', '#8ad5d8']}
            };

            var chart = new google.visualization.GeoChart(document.getElementById('regions_div_' + i3));

            chart.draw(data, options);
        }

        //geochart

        //chart bars
        /*  var chart = new CanvasJS.Chart(("chartContainer_" + i3), {
              animationEnabled: true,
              axisX:{
                  interval: 1
              },
              axisY2:{
                  interlacedColor: "white",
                  gridColor: "white",
                  title: "Amount of votes"
              },
              data: [{
                  type: "bar",
                  name: "companies",
                  axisYType: "secondary",
                  color: "#8ad5d8",
                  dataPoints: [
                      { y: 100, label: "1 Image" },
                      { y: 7, label: "2 Image" },

                  ]
              }]
          });
         chart.render();*/
//chart bars

    }
}

// function phonelikes(clicked_id) {
//     document.getElementById(clicked_id).style.color = "#8ad5d8";
//     var e = document.getElementById(clicked_id).parentElement.id;
//     var p = document.getElementById(e).parentElement.id;
//     if (e === p + '_pic1') {
//         document.getElementById(p + '_pic1').style.boxShadow = "3px 3px 0px rgb(138, 213, 216), -3px -3px 0px rgb(138,213,216),3px -3px 0px rgb(138, 213, 216), -3px 3px 0px rgb(138,213,216)";
//     }
//     if (e === p + '_pic2') {
//         document.getElementById(p + '_pic2').style.boxShadow = "3px 3px 0px rgb(138, 213, 216), -3px -3px 0px rgb(138,213,216),3px -3px 0px rgb(138, 213, 216), -3px 3px 0px rgb(138,213,216)";
//     }
//     $('#' + p + '_phonelikes1').fadeOut(1000);
//     $('#' + p + '_phonelikes2').fadeOut(1000);
// }


function hideintro(box) {
    display = document.getElementById('intro').style.display;
    if (display === 'none') {
        document.getElementById('intro').style.display = "block";
    }
    else {
        document.getElementById('intro').style.display = "none";
    }
    display = document.getElementById('basicExampleNav').style.display;
    if (display === 'block') {
        document.getElementById('basicExampleNav').style.display = "none";
    }
    else {
        document.getElementById('basicExampleNav').style.display = "block";
    }
    $('ul li').each(function (i) {
        $(this).css('display', 'block');
    });
}

function tanscreen(clicked_id) {
    document.getElementById('postlab').style.zIndex = "10";
    document.getElementById('postlab').style.display = "block";
    document.getElementById('tan').style.display = "block";
    document.getElementById('postlabbottom').style.display = "block";
    document.getElementById('postlabcross').style.display = "block";
}

function hidetan(clicked_id) {
    document.getElementById('tan').style.display = "none";
    document.getElementById('postlab').style.zIndex = "2";
    document.getElementById('postlabbottom').style.display = "none";
    document.getElementById('postlabcross').style.display = "none";
}

function deleteimg(clicked_id) {

    if (clicked_id === 'removepic1' || clicked_id === 'removepic1_phone') {
        document.getElementById('label1').style.display = "block";
        document.getElementById('labelimg1').style.display = "none";
        document.getElementById('1stepcircle').innerHTML = "1";
        x--;
    }
    if (clicked_id === 'removepic2' || clicked_id === 'removepic2_phone'){
        document.getElementById('label2').style.display = "block";
        document.getElementById('labelimg2').style.display = "none";
        document.getElementById('2stepcircle').innerHTML = "2";
        x++;
    }
}

function showchart(clicked_id) {

    var e = document.getElementById(clicked_id).parentElement.id;
    var l = document.getElementById(e).parentElement.id;
    var p = document.getElementById(l).previousElementSibling.id;

    if (clicked_id === p + '_charticon') {
        document.getElementById(clicked_id).style.color = "#8ad5d8";
        document.getElementById(p + '_worldicon').style.color = "black";
        document.getElementById(p + '_chartContainer').style.display = "block";
        document.getElementById(p + '_regions_div').style.display = "none";
    }
    if (clicked_id === p + '_worldicon') {
        document.getElementById(clicked_id).style.color = "#8ad5d8";
        document.getElementById(p + '_charticon').style.color = "black";
        document.getElementById(p + '_chartContainer').style.display = "none";
        document.getElementById(p + '_regions_div').style.display = "block";
    }
}

window.onscroll = function () {
    if ($(window).width() >= 768) {
        scrollFunction()
    }
};

function scrollFunction() {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        document.getElementById('tan').style.display = "none";
        document.getElementById('postlab').style.zIndex = "2";
        document.getElementById('postlabbottom').style.display = "none";
        document.getElementById('postlabcross').style.display = "none";

    }
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        document.getElementById("myBtn").style.display = "block";
        document.getElementById('navbar').style.height = "60px";
    } else {
        document.getElementById("myBtn").style.display = "none";
        document.getElementById('navbar').style.height = "80px";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    document.location.reload(true);
}

var touchtime = 0;
function doubleClick(clicked_id) {
   var parent = document.getElementById(clicked_id).parentElement.id;
    var parent2 = document.getElementById(parent).parentElement.id;
    if(touchtime===0){
        touchtime = new Date().getTime();
         // showFull(clicked_id);
       // alert(fullIMG);
    }
        else{
        if(((new Date().getTime())-touchtime) < 5000) {
            //  var parent_id2 = document.getElementById(el).parentElement.id;
            db.collection("users").doc(user_id).update({
                likes: firebase.firestore.FieldValue.arrayUnion(clicked_id)
            });
            var total=document.getElementById(parent2 + "_totalLikes").textContent;
            total=parseInt(total.substring(7,total.length));
            $("#" + parent2 + "_rateline").fadeIn("slow");
            if(clicked_id===parent2+"_pic1"){
                $("#" + parent2 + "_heart1").fadeIn("slow");
                $("#" + parent2+ "_heart1").fadeOut("slow");
                let el=parent2 + "_pic2";
                note_toDatabase(el,parent2,user_id,clicked_id);
                votes_calculation1(parent2,total);
            }
            if(clicked_id===parent2 + "_pic2"){
                $("#" + parent2 + "_heart2").fadeIn("slow");
                $("#" + parent2 + "_heart2").fadeOut("slow");
                let el=parent2 + "_pic1";
                note_toDatabase(el,parent2,user_id,clicked_id);
                votes_calculation2(parent2,total);
            }
            $("#" + parent2 + "_L_percentage").fadeIn("slow");
            $("#" + parent2 + "_R_percentage").fadeIn("slow");
            $("#" + parent2 + "_totalLikes").fadeIn("slow");
            touchtime = 0;
        } else {
            // showFull(clicked_id);
            touchtime = 0;
        }
    }
}

function note_toDatabase(el,parent2,user_id,clicked_id){
    let not_your_choice;

    db.collection("users").doc(user_id).update({
        likes: firebase.firestore.FieldValue.arrayRemove(el)
    });
    let your_choice = document.getElementById(clicked_id);
    your_choice.className += " your_choice";
    if(clicked_id===parent2 + "_pic1"){
        not_your_choice = document.getElementById(parent2+"_pic2");
        db.collection("polls").doc(parent2).update({
            pic1: firebase.firestore.FieldValue.increment(1)
        });

    }
    if(clicked_id===parent2 + "_pic2"){
        not_your_choice = document.getElementById(parent2+"_pic1");
        db.collection("polls").doc(parent2).update({
            pic2: firebase.firestore.FieldValue.increment(1)
        });

    }
    not_your_choice.classList.remove("your_choice");
}

function votes_calculation1(parent2,total){
    let pic1_Rate;
    let pic2_Rate;
    pic1_Rate=document.getElementById(parent2 + '_L_percentage').textContent;
    pic1_Rate = parseInt(pic1_Rate.replace('%',''));
    pic1_Rate = total*pic1_Rate/100;
    pic1_Rate++;
    total++;
    pic1_Rate=Math.round(pic1_Rate*100/total);
    pic2_Rate=100-pic1_Rate;
    document.getElementById(parent2 + '_L_percentage').innerHTML=pic1_Rate + "%";
    document.getElementById(parent2 + '_R_percentage').innerHTML=pic2_Rate + "%";
    document.getElementById(parent2 + "_subline").style.width=pic1_Rate + "%";
    document.getElementById(parent2 + "_totalLikes").innerHTML="total: " + total;
}
function votes_calculation2(parent2,total){
    let pic1_Rate;
    let pic2_Rate;
    pic2_Rate=document.getElementById(parent2 + '_R_percentage').textContent;
    pic2_Rate = parseInt(pic2_Rate.replace('%',''));
    pic2_Rate = total*pic2_Rate/100;
    pic2_Rate++;
    total++;
    pic2_Rate=Math.round(pic2_Rate*100/total);
    pic1_Rate=100-pic2_Rate;
    document.getElementById(parent2 + '_L_percentage').innerHTML=pic1_Rate + "%";
    document.getElementById(parent2 + '_R_percentage').innerHTML=pic2_Rate + "%";
    document.getElementById(parent2 + "_subline").style.width=pic1_Rate + "%";
    document.getElementById(parent2 + "_totalLikes").innerHTML="total: " + total;
}
$(window).load(function() {
    // Animate loader off screen

   $(".se-pre-con").fadeOut("slow");
});

function showFull(clicked_id) {
    let takenURL = $("#" + clicked_id).css('background-image').replace('url(','').replace(')','').replace(/\"/gi, "");
    let fullIMG = document.getElementById('fullPageIMG');
    fullIMG.src = takenURL;
    document.getElementById('fullPageID').style.display="block";
}

function closeFullIMG() {
    document.getElementById('fullPageID').style.display="none";
}