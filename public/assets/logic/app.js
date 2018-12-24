$(function () {
  $("header").hide().slideDown(3000)


  //===========================================================
  //miscelaneous functions
  //======================================================
  // let distribution = (data) => {
  //   $("#pname") === "sovereign"?

  //     $("#music-list, #allBeats").prepend(y).addClass("sovereign"):


  //     $("#recentUploads, #allBeats").prepend(y).addClass("others");

  // }

 

  //===========================================================
  //
  //================================
  // var video = document.getElementById("myVideo");

  //         // Get the button
  //         var btn = document.getElementById("myBtn");

  //         // Pause and play the video, and change the button text
  //         function myFunction() {
  //             if (video.paused) {
  //                 video.play();
  //                 btn.innerHTML = "Pause";
  //             } else {
  //                 video.pause();
  //                 btn.innerHTML = "Play";
  //             }
  //         }
  //========================================================================================
  //Artist Search
  //=============================

  let searchArtist = (artist) => {

    let queryUrl = "https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp";

    $.ajax({
      url: queryUrl,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      let artistName = $("<h1>").text(`${JSON.stringify(response.name)}`);
      $("#artist-div").append(artistName);

      let artistUrl = $("<a>").attr("href", response.image_url);
      artistUrl.appendTo(artistName);

      let artistImage = $("<img>").attr("src", response.thumb_url);
      artistImage.appendTo("#artist-div")
      // ("#artist-div").prepend(artistImage)

    })
    let queryUrl3 = "http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=" + artist + "&api_key=ea06fdcde6686a91185bdf47f53803d9&format=json"

    // API key	ea06fdcde6686a91185bdf47f53803d9
    // Shared secret	7c49e757deef6f7fabfeea7961b0021d

    //  let queryUrl2 = "./database/schema.sql"

    $.ajax({
      url: queryUrl3,
      method: "GET"
    }).then(function (response) {
      var result = response;
      console.log(JSON.stringify(result));
      // $("#music-list").html(response)
    })
  }
  $("#select-artist").on("click", function (event) {
    event.preventDefault();
    $("#artist-div").empty()
    $(".right-content").removeClass().addClass("right-content-result")
    let artist = $("#artist-input").val().trim()
    searchArtist(artist)

  })
  //=============================================================================


  //==============================================================================
  //Slideshow
  //=======================
  let slideIndex = 0;
  let images = ["./assets/images/blue-flame.gif", "./assets/images/background.gif", "./assets/images/boombox.gif", "./assets/images/csd_dribbbl_02.gif", "./assets/images/download.jpg", "./assets/images/giphy.gif", "./assets/images/loadingd.gif"];
  let t = $("<img>").attr("src", images[0])
  // $("#left-img").append(t)

  let play = () => {
    let scroll = images.map(i => i);

    scroll.forEach(element => {
      $("#left-img").empty()
      let r = $("<img><span id='change'>").attr("src", element).addClass("slides");
      // $("#left-content").append(r);
      r.appendTo("#left-img")
    });
    slideIndex++;
    if (slideIndex > images.length) {
      slideIndex = 1
    }
    let t = $("<img>").attr("src", images[slideIndex - 1]).addClass("slides2").fadeIn(5000).fadeOut(9000);
    //  let t = $("<img>").attr("src", images[slideIndex-1]).css("display", "block");

    t.appendTo("#left-img");
    //  x[myIndex-1].style.display = "block";  
    setTimeout(play, 9000); // Change image every 2 seconds

    // setInterval(function() {
    //   $('#slideshow > div:first')
    //     .fadeOut(1000)
    //     .next()
    //     .fadeIn(1000)
    //     .end()
    //     .appendTo('#slideshow');
    // }, 3000);

  }
  play()

  //===================================================================================

  //====================================================================
  //music list
  //============================

  let musicList = $(".sovereign")
  //  let m = ("<a>").attr("href", "")
  musicList.prepend("Beats By Sovereign. Click Listen To xplore.")

  //      $.get("./database/schema.sql", function(req, res) {
  //   res.sendFile(path.join(__dirname, "add.html"));
  // });

  //      $.get("./database/schema.sql", Beats)
  //         .then(function(data) {
  //           console.log("add.html", data);
  //           alert("Adding character...");
  //         });


    getMongoBeats()


  //=======================================================================


  //==============================================================================
  //Recent Uploads
  //=======================
  $("#submit").on("click", function (event) {
    // event.preventDefault();
    mongoPost()
    getMongoBeats()

    let filepath = $("#entry").val().trim().split('\\').pop()

    let newBeat = {
      beat_name: $("#bname").val().trim(),
      producer_name: $("#pname").val().trim(),
      price: $("#price").val().trim(),
      file_source: filepath,
    };

    // Send the POST request.
    $.ajax("/api/beats", {
      type: "POST",
      data: newBeat
    }).then(
      function () {
        console.log("created new beat");
        // Reload the page to get the updated list
        // location.reload();
      }
    );


    // $("#recentUploads").empty()
    // $(".right-content").removeClass().addClass("right-content-result")
    let upload = $("#entry").val().trim()
    let beatUpload = $("#bname").val().trim()
    let prodUpload = $("#pname").val().trim()
    let price = $("#price").val().trim()
    let join1 = beatUpload + " <br>" + 
                "by " + prodUpload + "<br>" + 
                "$" + price + "<br>" + 
                upload + "<br><br>"
    let bdiv = $("<div>").addClass("buy");
    
    let b1 = $('<button/>', {
      text: 'listen',
      click: () => {
        $(".music").empty()
        alert('straight fire');
        let filename = "localhost:8030/api/music/beatalts?" + filepath
        console.log(filename)

        const dynaPlayer = `<div class='music'> 
        <audio controls> 
        <source src=${filename} type='audio/mpeg' <br>
          </audio> 
          </div>`;

          $(".music-player").append($(dynaPlayer))


        let audio = new Audio(filename);
        // audio.play();
      }
    }).addClass("listen")
    // .attr("src", rowsToAdd[0][i].source);
    
    let b2 = $(('<button/>'), {
      text: 'buy',
      click: () => {
        // event.preventDefault()
        // this.addClass("buying")
        // this.text = "buying"
        alert('$$$$$$$');
        buying();
        let purchase = $("<div>").addClass("bing");
        confirm("adding to cart");
        b2.append(purchase);
      }
    }).addClass("buying");
    
    let y = bdiv.append(join1).append(b1).append(b2);
    // let r = bdiv.append(newBeat).append(b1).append(b2);
    // let wholeItem = y;
    // for (let k = 0; k < newBeat; k++) {
    //   let indItem = `<div id="items_"${k}> ${wholeItem}</div>`
    // }
    
    //  distribution()
    if (prodUpload === "sovereign") {
      
      $("#music-list, #allBeats").prepend(y).addClass("sovereign");
      
    } else {
      
      
      $("#recentUploads, #allBeats").prepend(y).addClass("others");
    }
    $("#mongo").prepend(y);
    
    
  })
  
  //posting to mongo
  function mongoPost() {
    
    let path = $("#entry").val().trim().split('\\').pop()
    let newBeat = {
      beat_name: $("#bname").val().trim(),
      producer_name: $("#pname").val().trim(),
      price: $("#price").val().trim(),
      file_source: path,
    };



    let URL = 'mongodb://localhost/music';
    let URL2 =  '/api/music';
    let list = []
    $.ajax({
      type: "POST",
      // contentType : "application/json", // causing empty object
      url: URL2,
      dataType: "json",
      data: newBeat
    })
    .then(() => {
      // let stuff = data.json()
      // console.log(stuff);
      console.log("success");

      // newBeat = data;
      // list.push(stuff)
    // console.log(list);
    displayBeats(list);
      // console.log();
      // getUnread();
      // $("#author").val("");
      // $("#title").val("");
    });
    return false;
  }
  
  //reseting form
  function resetData(){
    $("#bname").val("")
    $("#pname").val("")
    $("#price").val("")
    $("#entry").val("")
  }
  
  
  
  //==============================================================================
  //shopping cart
  //========================================
  
  // adding to cart
  let buying = () => {
  let cart = $("#cart");
  $(".buying").siblings().on("click", function(e) {
    e.preventDefault();
    // cart.append(initializeRows());
    let basket = [];
    let purchased = $(this).siblings().find(".fit");
    $.ajax("/api/music/purchase",{
      type: "POST",
      data: purchased
    }).then(function(data) {
      purchased = data;
      basket.push(purchased)
      cart.prepend(purchased)
      console.log(basket)
      console.log(purchased)
    });

    console.log("adding to cart");
      //  let item = $(this).siblings().find(".fit");
        // basket.push(item)
        // cart.prepend(item)
        // console.log(basket)
        // console.log(item)
      });
    };
  // $(".buying").on("click", function() {
  //       event.preventDefault();
  //         let icon = "added to cart"
  //         this.append(icon);
  // })



  //=================================================================================
  //=========================================================================
  //Waveform
  //=======================================================================
//   let wavesurfer = WaveSurfer.create({
//     container: '#waveform',
//     waveColor: 'violet',
//     progressColor: 'purple',
//   //   plugins: [
//   //     TimelinePlugin.create({
//   //         container: '#wave-timeline'
//   //     }),
//   //     MinimapPlugin.create()
//   // ]
// });

// wavesurfer.load('../audio/captainplanet24.mp3');

// wavesurfer.on('ready', function () {
//   wavesurfer.play();
// });


  //==============================================================================
  //music play
  //========================================
  // try {
  //   let filename = "/music/" + rowsToAdd[0][i].source
  //   $('.listen').attr('href', filename);
  //   $(".listen").on("click", function() {
      
  //       let audio = new Audio( musicPath); 
            // audio.play();
  //           app.get('/api/beats', function (req, res) {
  //               res.send(" "); 
  //             })        
  //       }) 
        
        
  //     } catch (error) {
  //       if (confirm('Youingo not seem to have app installed, do you want to download it now?')) {
  //         window.location = 'https://play.google.com/store/apps/details?id=123';
  //       } 
  //     }
        
  //=================================================================================


  //=======================================================================
  //==============================================================================
  //populate from database
  //========================================

  // Our initial beatList array
  let beatList = [];

  // Getting beatList from database when page loads
  getBeatList();
  console.log("getting beat list")

  // This function resets the beatList displayed with new beatList from the database
  function initializeRows() {
    $("#allBeats").empty();     
    $("#music-list").empty();
    $("#recentUploads").empty();
    $("#waveform2").empty();
    let rowsToAdd = [];
    let fill = $("#allBeats") //.addClass("local");
    let sovDiv = $("#music-list");
    let othDiv = $("#recentUploads");
    let wave = $("#waveform2")


    // let b3 = $('<button/>', {
    //       text: 'listen',
    //       click: () => {
    //         alert('straight fire');
    //         let audio = new Audio(rowsToAdd[0][i].source);
            // audio.play();
    //       }
    //     }).addClass("listen").attr("src", rowsToAdd[0][i].source);
    //     let b4 = $(('<button/>'), {
    //       text: 'buy',
    //       click: () => {
    //         // event.preventDefault()
    //         // this.addClass("buying")
    //         // this.text = "buying"
    //         alert('$$$$$$$');
    //         let purchase = $("<div>").addClass("bing")
    //         confirm("adding to cart");
    //         b4.append(purchase)
    //       }
    //     }).addClass("buying");


    for (let a = 0; a < beatList.length; a++) {
      console.log(beatList[0].beats)
      console.log(beatList.length)
      rowsToAdd.push(beatList[0].beats);
      console.log(rowsToAdd)
      console.log(rowsToAdd.length)
      rowsToAdd[0].forEach((element, i) => {
            

        console.log(rowsToAdd[0][0].id)
        // let b =+ 1;
        rowsToAdd[element] =  "<div id='fit_'" + i + ">"  + "<br>" + 
          "ID: " + rowsToAdd[0][i].id + "<br>" + 
          "Beat Name: " + rowsToAdd[0][i].beat_name + "<br>" +
          "Produced by: " + rowsToAdd[0][i].producer_name + "<br>" +
          "price: $" +rowsToAdd[0][i].price + "<br>" +
          "source: " + rowsToAdd[0][i].source + "<br>" + 
              "<span class='fit2'></span>" + "<br>" + 
              "<span id='waveform2'></span>" + "<br><br>" + 
          "</div>";
          // $(".fit2").empty();
          // $(".fit2").append(b3).append(b4);

        let sum = rowsToAdd[element];
        console.log(sum);

          //****************************************************************
          //*why do I need to append buttons again below for them to work  *
          //*as intended? Also why is last row missing buttons?            *
          //************************************************************** */
        // }); 

        // console.log(rowsToAdd[0])
        
        let b3 = $('<button/>', {
          id: "btnId_" + i,
          text: 'listen',
          click: () => {
            alert('straight fire');
            $(".music").empty();

            console.log(b3)
            

            // let audio = new Audio(rowsToAdd[0][i].source);
            let filename = "localhost:8030/api/music/beatalts?" + rowsToAdd[0][i].source
            console.log(filename);
            let test = "../assets/audio/AUD-20170805-WA0000.mp3"

            const dynaPlayer = `<div class='music'> 
            <audio controls> 
            <source src=${filename} type='audio/mpeg' <br>
              </audio> 
              </div>`;
  
              $(".music-player").append($(dynaPlayer))

            let audio = new Audio(filename);
            // audio.play();
          //   let wavesurfer = WaveSurfer.create({
          //     container: '#waveform2',
          //     waveColor: 'violet',
          //     progressColor: 'purple',
          //   //   plugins: [
          //   //     TimelinePlugin.create({
          //   //         container: '#wave-timeline'
          //   //     }),
          //   //     MinimapPlugin.create()
          //   // ]
          // });
          
          // wavesurfer.load(filename);
          
          // wavesurfer.on('ready', function () {
          //   wavesurfer.play();
          // });
          }
        }).addClass("listen").attr("src", rowsToAdd[0][i].source);
        console.log(b3)

        let b4 = $(('<button/>'), {
          id: "b_btn_" + i,
          text: 'buy',
          click: () => {

            console.log(b4)
            
            // $("#cart").val(initializeRows())
            // console.log("initializing cart row")
            //     let basket = [];
            //     let item = $(this).siblings().find(".fit")
            //     basket.push(item)
            //     cart.prepend(item)
            //     console.log(basket)
            //     console.log(item)

            // event.preventDefault()
            // this.addClass("buying")
            // this.text = "buying"
            alert('$$$$$$$');
            buying();
            let purchase = $("<div>").addClass("bing")
            confirm("adding to cart");
            b4.append(purchase);
          }
        }).addClass("buying");
                        
       
        // if (rowsToAdd[0][i].mastered === 1) { 

          fill.prepend(sum).append(wave) //.append(b3).append(b4);
          //**********************************************************
          //*why do I need to append buttons again for them to work  *
          //*almost as intended?                                     *
          //******************************************************** */
          $(".fit2").empty();
          $(".fit2").append(b3).append(b4);
        // }
        
        
        let rdiv = $("<div>").addClass("buy");
        let t = rdiv.prepend(sum)// .append(b3).append(b4)
        // if (rowsToAdd[0][i].producer_name.indexOf("sovereign" !== -1)) {
          if (rowsToAdd[0][i].producer_name === "sovereign") {
            // console.log("yep")
            // sovDiv.append(t).addClass("sovereign")
            (sovDiv).append(t).addClass("sovereign")
            // fill.prepend(sum).prepend(b3).prepend(b4)
          } else {
            // othDiv.append(t).addClass("others")
            (othDiv).append(t).addClass("others")
            // $(fill).prepend(sum).prepend(b3).prepend(b4);
          }
          
          
        })
      
    }
  }

  function getBeatList() {
    $.get("/api/beats", function (data) {
      beats = data;
      initializeRows();
    });
    let beats = {}
    // Send the GET request.
    $.ajax("/api/beats", {
      type: "GET",
      data: beats
    }).then(function (data) {
      beats = data;
      console.log(beats);
      beatList.push(beats)
      initializeRows();
      // $("#allBeats").append("<div>" + data.beats[0].beat_name + "</div>");
      console.log("retrieved beats");
      // Reload the page to get the updated list
      // location.reload();
    });

  }



//==============================================================================
//populate from mongodb
//========================================

function getMongoBeats() {
  $.get("/api/music", function (data) {
    console.log(data);
    beats = data;
    console.log(beats);
    displayBeats();
  });
  let beats = {}
  // Send the GET request.
  $.ajax("/api/music", {
    type: "GET",
    data: beats
  }).then(function (data) {
    beats = data;
    console.log(beats);
    beatBox.push(beats)
    console.log(beatBox);
    displayBeats();
    // $("#allBeats").append("<div>" + data.beats[0].beat_name + "</div>");
    console.log("retrieved beats");
    // Reload the page to get the updated list
    // location.reload();
  });
  
}
let beatHolder =[];
let beatBox = [];

function displayBeats(beats) {
  $("#mongo").empty();
  $("#waveform2").empty();
  let wave = $("#waveform2")
  let pop = $("#mongo")
  let b3;
  let b4;
  // First, empty the table
  // $("tbody").empty();

  let filepath = $("#entry").val().trim().split('\\').pop()

   beats = {
    beatName: $("#bname").val().trim(),
    producerName: $("#pname").val().trim(),
    source: filepath,
    price: $("#price").val().trim(),
  };

  for (let t = 0; t < beatBox.length; t++) {
      beatHolder.push(beatBox);
      console.log(beatHolder)
      console.log(beatHolder[0][0][t])
    
  
  // Then, for each entry of that json...
  beatHolder[0][0].forEach((beat, i) => {
    beatHolder[beat] = "<div id='fit_'" + i + ">" + "<br>" + 
    "ID: " + beatHolder[0][0][i]._id + "<br>" + 
    "Beat Name: " + beatHolder[0][0][i].beatName + "<br>" +
    "Produced by: " + beatHolder[0][0][i].producer + "<br>" +
    "price: $" +beatHolder[0][0][i].price + "<br>" +
    "source: " + beatHolder[0][0][i].source + "<br>" + 
        "<span class='fit2'></span>" + "<br>" + 
        "<span id='waveform2'></span>" + "<br><br>" + 
    "</div>"; 
    let item = beatHolder[beat]
    console.log(item)
    // beathold.push()
    
    //  for (let g = 0; g < beatBox.length; g++) {
    
    b3 = $('<button/>', {
      id: "btnId_" + i,
      text: 'listen',
      click: () => {
        alert('straight fire');
            $(".music").empty()
            
            console.log(b3)

        // let audio = new Audio(rowsToAdd[0][i].source);
        let filename = "localhost:8030/api/music/beatalts?" + beatHolder[0][0][i].source
        console.log(filename)
        
       
        // "<div class='music'>" + "<br>" +
        // "<audio controls>" + "<br>" +
        // `<source src=${filename} type='audio/mpeg'` + "<br>"  +
        //   "</audio>" + "<br>" + 
        //   "</div>"

     const dynaPlayer = `<div class='music'> 
          <audio controls> 
          <source src=${filename} type='audio/mpeg' <br>
            </audio> 
            </div>`; 

            $(".music-player").append($(dynaPlayer))
        
        
        let audio = new Audio(filename);
        // audio.play();
        // let wavesurfer = WaveSurfer.create({
        //   container: '#waveform2',
        //   waveColor: 'violet',
        //   progressColor: 'purple',
        //   //   plugins: [
        //     //     TimelinePlugin.create({
        //       //         container: '#wave-timeline'
        //       //     }),
        //       //     MinimapPlugin.create()
        //       // ]
        //     });
            
        //     wavesurfer.load(filename);
            
        //     wavesurfer.on('ready', function () {
        //       wavesurfer.play();
        //     });
            
          }
        }).addClass("listen").attr("src", beatHolder[0][0][i].source);
      // }
        // $.each(b3, (i) => {
        //   $(".listen").attr("src", this.filename)
        // })
        
        // for (let q = 0; q < beatBox.length; q++) {
        
         b4 = $(('<button/>'), {
          id: "b_btn_" + i,
          text: 'buy',
          click: () => {
            console.log(b4)
            // $("#cart").val(initializeRows())
            // console.log("initializing cart row")
            //     let basket = [];
            //     let item = $(this).siblings().find(".fit")
            //     basket.push(item)
            //     cart.prepend(item)
            //     console.log(basket)
            //     console.log(item)
            
            // event.preventDefault()
            // this.addClass("buying")
            // this.text = "buying"

            alert('$$$$$$$');
            buying();
            let purchase = $("<div>").addClass("bing")
            confirm("adding to cart");
            b4.append(purchase);
          }
        }).addClass("buying");
      // }

      
       
        // if (beatHolder) {
        pop.prepend(item).append(wave) 
        $(".fit2").empty();
        $(".fit2").append(b3).append(b4);
        // }
      });
    }

      // // Append each of the beat's properties to the table
      // $("tbody").append("<tr><td>" + beats.beatName + "</td>" +
      //                       "<td>" + beats.producerName + "</td>" +
      //                       "<td>" + beats.source + "</td>" +
      //                       "<td>" + beats.price + "</td></tr>");
    }
    


// First thing: ask the back end for json with all beats
$.getJSON("/", function(data) {
  for (var i = 0; i < data.length; i++) {
    // let stuff = data
    // console.log(stuff)
    // Call our function to generate a table body
    displayBeats(data);
    // $("tbody").append("<tr><td>" + beat.name + "</td>" +
    //                       "<td>" + beat.producerName + "</td>" +
    //                       "<td>" + beat.source + "</td>" +
    //                       "<td>" + beat.price + "</td></tr>");
                      }
});




//==============================================================================

//========================================




  //     //==============================================================================
  //     //populate from database
  //     //========================================

  //     // Our initial beatList array
  //     let beatList = [];

  //     // Getting beatList from database when page loads
  //     getBeatList();
  //     console.log("getting beat list")

  //     // This function resets the beatList displayed with new beatList from the database
  //     function initializeRows() {
  //       $("#allBeats").empty();
  //       let rowsToAdd = [];
  //       for (let i = 0; i < beatList.length; i++) {
  //         rowsToAdd.push(beatList[i]);
  //         // rowsToAdd.push(createNewRow(beatList[i]));
  //       }
  //       $("#allBeats").append(rowsToAdd);
  //     }

  //     function getBeatList() {
  //       $.get("/api/beats", function(data) {
  //         beats = data;
  //         initializeRows();
  //       });
  //       let beats = {}
  //       // Send the GET request.
  //       $.ajax("/api/beats", {
  //         type: "GET",
  //         data: beats
  //       }).then( function(data) {
  //           beats = data;
  //           console.log(beats);
  //           initializeRows();
  //           // $("#allBeats").append(beats);
  //           console.log("retrieved beats");
  //           // Reload the page to get the updated list
  //           // location.reload();
  //         });

  //       }
  //       // // This function constructs a beat-item row
  //       //   function createNewRow(beat) {
  //       //     var $newInputRow = $(
  //       //       [
  //       //         "<li class='list-group-item beat-item'>",
  //       //         "<span>",
  //       //         newBeat.beat_name,
  //       //         "</span>",
  //       //         "<input type='text' class='edit' style='display: none;'>",
  //       //         "<button class='delete btn btn-danger'>x</button>",
  //       //         "<button class='complete btn btn-primary'>✓</button>",
  //       //         "</li>"
  //       //       ].join("")
  //       //     );

  //       //     $newInputRow.find("button.delete").data("id", beat.id);
  //       //     $newInputRow.find("input.edit").css("display", "none");
  //       //     $newInputRow.data("beat", newBeat);
  //       //     if (newBeat.producer_name === sovereign) {
  //       //       $newInputRow.find("span").css("text-decoration", "line-through");
  //       //     }
  //       //     return $newInputRow;
  //       //   }
  // // This function grabs beatList from the database and updates the view



  //=================================================================================



  // document.onload = () =>{
  //   play();
  //   // let r = $("<img>").attr("src", images[0])
  //   // r.append("left-img")

  // }


  // var slideIndex = 0;
  // carousel();

  // function carousel() {

  //     let x = $(".left-img");
  //     for (let i = 0; i < images.length; i++) {
  //       let r = $("<img>").attr("src", images[i])
  //       x.append(r)
  //      x.addClass("slides");
  //     //  x[i].style.display = "none"; 

  //     }
  //     slideIndex++;
  //     if (slideIndex > images.length) {
  //       slideIndex = 1
  //     }
  //           let t = $("<img>").attr("src", images[slideIndex-1]).addClass("slides2");
  //          t.appendTo("#left-img"); 
  //   //  images[slideIndex-1].addClass("slides2");
  //   //  x[myIndex-1].style.display = "block";  
  //     setTimeout(carousel, 2000); // Change image every 2 seconds
  // }


  //  let music = ["../assets/audio/AUD-20170805-WA0000.mp3", "../assets/audio/captainplanet24.mp3"]
  //  let toPlay = music.map(i => i)
  //   var audio = $(".left-content");

  //   audio = new Audio("../assets/audio/AUD-20170805-WA0000.mp3");

  //   audio.addEventListener('ended',function(){
  //       audio.src = toPlay;
  //       audio.pause();
  //       audio.load();
        // audio.play();
  //   });
  
  // let trialplay = $("<div class='music'>") + "<br>" +
  // "<audio controls>" + "<br>" +
  // `<source src={} type='audio/mpeg'` + "<br>"  +
  //   "</audio>" + "<br>" + 
  //   "</div>"


  // let box =[]
  // $.get("/api/music/:source", function (data) {
  //   console.log(data);
  //   let toPlay = data;
  //   console.log(toPlay);
  //   box.push(toPlay)
    
  // });
  // console.log(box);


  

})