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




  //=======================================================================


  //==============================================================================
  //Recent Uploads
  //=======================
  $("#submit").on("click", function (event) {
    // event.preventDefault();
    mongoPost()
    displayBeats()

    let filepath = $("#entry").val().trim().split('\\').pop()

    let newBeat = {
      beat_name: $("#bname").val().trim(),
      producer_name: $("#pname").val().trim(),
      price: $("#price").val().trim(),
      file_source: filepath,
    };

    // Send the POST request.
    $.ajax("/api/music", {
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
    let join1 = beatUpload + " <br>" + "by " + prodUpload + "<br>" + "$" + price + "<br>" + upload + "<br><br>"
    let bdiv = $("<div>").addClass("buy");
    
    let b1 = $('<button/>', {
      text: 'listen',
      click: () => {
        alert('straight fire');
        let filename = "localhost:8080/" + filepath
        console.log(filename)
        let audio = new Audio(filename);
        audio.play();
      }
    }).addClass("listen");
    
    let b2 = $(('<button/>'), {
      text: 'buy',
      click: () => {
        // event.preventDefault()
        // this.addClass("buying")
        // this.text = "buying"
        alert('$$$$$$$');
        let purchase = $("<div>").addClass("bing");
        purchase.append("added to cart");
        b2.append(purchase);
      }
    }).addClass("buying");
    
    let y = bdiv.append(join1).append(b1).append(b2);
    // let r = bdiv.append(newBeat).append(b1).append(b2);
    
    //  distribution()
    if (prodUpload === "sovereign") {
      
      $("#music-list, #allBeats").prepend(y).addClass("sovereign");
      
    } else {
      
      
      $("#recentUploads, #allBeats").prepend(y).addClass("others");
    }
    $("#allBeats").prepend(join1);
    
    
    
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
      contentType : "application/json",
      url: URL2,
      dataType: "json",
      data: JSON.stringify(newBeat)
    })
    .then(function(data) {
      console.log("success");

      // newBeat = data;
      list.push(newBeat)
    console.log(list);
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
  let cart = $("#cart")
  $(".buying").on("click", function(e) {
    e.preventDefault();
    cart.initializeRows()
    console.log("initializing cart row")
        let basket = [];
        let item = $(this).siblings().find(".fit")
        basket.push(item)
        cart.prepend(item)
        console.log(basket)
        console.log(item)
      })
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
  // $(".listen").on("click", function() {

  //   let audio = new Audio( musicPath); 
  //       audio.play();
  //       app.get('/api/beats', function (req, res) {
  //         res.send(" "); 
  //       })


  // })



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
    //         audio.play();
    //       }
    //     }).addClass("listen");
    //     let b4 = $(('<button/>'), {
    //       text: 'buy',
    //       click: () => {
    //         // event.preventDefault()
    //         // this.addClass("buying")
    //         // this.text = "buying"
    //         alert('$$$$$$$');
    //         let purchase = $("<div>").addClass("bing")
    //         purchase.append("added to cart");
    //         b4.append(purchase)
    //       }
    //     }).addClass("buying");


    for (let i = 0; i < beatList.length; i++) {
      console.log(beatList[0].beats)
      console.log(beatList.length)
      rowsToAdd.push(beatList[0].beats);
      console.log(rowsToAdd)
      console.log(rowsToAdd.length)
      rowsToAdd[0].forEach((element, i) => {
            


        console.log(rowsToAdd[0][0].id)
        rowsToAdd[element] = "<div class='fit'>" + "<br>" + 
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
          text: 'listen',
          click: () => {
            alert('straight fire');
            // let audio = new Audio(rowsToAdd[0][i].source);
            let filename = "localhost:8080/music/" + rowsToAdd[0][i].source
            console.log(filename)

            var url = filename + '/cors';
            var xhr = createCORSRequest('GET', url);
            xhr.send();

            let audio = new Audio(filename);
            audio.play();
            let wavesurfer = WaveSurfer.create({
              container: '#waveform2',
              waveColor: 'violet',
              progressColor: 'purple',
            //   plugins: [
            //     TimelinePlugin.create({
            //         container: '#wave-timeline'
            //     }),
            //     MinimapPlugin.create()
            // ]
          });
          
          wavesurfer.load(filename);
          
          wavesurfer.on('ready', function () {
            wavesurfer.play();
          });
          }
        }).addClass("listen");


        let b4 = $(('<button/>'), {
          text: 'buy',
          click: () => {
            
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
            let purchase = $("<div>").addClass("bing")
            purchase.append("added to cart");
            b4.append(purchase);
          }
        }).addClass("buying");
        
        if (rowsToAdd[0][i].mastered === 1) { 

          fill.prepend(sum).append(wave) //.append(b3).append(b4);
          //**********************************************************
          //*why do I need to append buttons again for them to work  *
          //*almost as intended?                                     *
          //******************************************************** */
          $(".fit2").empty();
          $(".fit2").append(b3).append(b4);
        }
        
        
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
    $.get("/api/music", function (data) {
      beats = data;
      initializeRows();
    });
    let beats = {}
    // Send the GET request.
    $.ajax("/api/music", {
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
function displayBeats(beats) {
  // First, empty the table
  $("tbody").empty();

  let filepath = $("#entry").val().trim().split('\\').pop()
  let beatBox = []

   beats = {
    name: $("#bname").val().trim(),
    producerName: $("#pname").val().trim(),
    source: filepath,
    price: $("#price").val().trim(),
  };

  for (let t = 0; t < beatBox.length; t++) {
      beatBox.push(JSON.stringify(beats));
      console.log(beatBox)
    
  }
  // Then, for each entry of that json...
  beatBox.forEach(function(beat) {
    // Append each of the beat's properties to the table
    $("tbody").append("<tr><td>" + beat.name + "</td>" +
                          "<td>" + beat.producerName + "</td>" +
                          "<td>" + beat.source + "</td>" +
                          "<td>" + beat.price + "</td></tr>");
  });
}



// First thing: ask the back end for json with all beats
$.getJSON("/", function(data) {
  for (var i = 0; i < data.length; i++) {
    // let stuff = data
    // console.log(stuff)
    // Call our function to generate a table body
    displayBeats(data);
    $("tbody").append("<tr><td>" + beat.name + "</td>" +
                          "<td>" + beat.producerName + "</td>" +
                          "<td>" + beat.source + "</td>" +
                          "<td>" + beat.price + "</td></tr>");
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
  //       audio.play();
  //   });



  // let audioContext = new (window.AudioContext || window.webkitAudioContext);
  // let oscList = [];
  // let masterGainNode = null;

  // let keyboard = document.querySelector(".keyboard");
  // let wavePicker = document.querySelector("select[name='waveform']");
  // let volumeControl = document.querySelector("input[name='volume']");

  // let noteFreq = null;
  // let customWaveform = null;
  // let sineTerms = null;
  // let cosineTerms = null;

  // function createNoteTable() {
  //     let noteFreq = [];
  //     for (let i=0; i< 9; i++) {
  //       noteFreq[i] = [];
  //     }

  //     noteFreq[0]["A"] = 27.500000000000000;
  //     noteFreq[0]["A#"] = 29.135235094880619;
  //     noteFreq[0]["B"] = 30.867706328507756;

  //     noteFreq[1]["C"] = 32.703195662574829;
  //     noteFreq[1]["C#"] = 34.647828872109012;
  //     noteFreq[1]["D"] = 36.708095989675945;
  //     noteFreq[1]["D#"] = 38.890872965260113;
  //     noteFreq[1]["E"] = 41.203444614108741;
  //     noteFreq[1]["F"] = 43.653528929125485;
  //     noteFreq[1]["F#"] = 46.249302838954299;
  //     noteFreq[1]["G"] = 48.999429497718661;
  //     noteFreq[1]["G#"] = 51.913087197493142;
  //     noteFreq[1]["A"] = 55.000000000000000;
  //     noteFreq[1]["A#"] = 58.270470189761239;
  //     noteFreq[1]["B"] = 61.735412657015513;

  //     noteFreq[7]["C"] = 2093.004522404789077;
  //     noteFreq[7]["C#"] = 2217.461047814976769;
  //     noteFreq[7]["D"] = 2349.318143339260482;
  //     noteFreq[7]["D#"] = 2489.015869776647285;
  //     noteFreq[7]["E"] = 2637.020455302959437;
  //     noteFreq[7]["F"] = 2793.825851464031075;
  //     noteFreq[7]["F#"] = 2959.955381693075191;
  //     noteFreq[7]["G"] = 3135.963487853994352;
  //     noteFreq[7]["G#"] = 3322.437580639561108;
  //     noteFreq[7]["A"] = 3520.000000000000000;
  //     noteFreq[7]["A#"] = 3729.310092144719331;
  //     noteFreq[7]["B"] = 3951.066410048992894;

  //     noteFreq[8]["C"] = 4186.009044809578154;
  //     return noteFreq;
  //   }


  //   function setup() {
  //     noteFreq = createNoteTable();

  //     volumeControl.addEventListener("change", changeVolume, false);

  //     masterGainNode = audioContext.createGain();
  //     masterGainNode.connect(audioContext.destination);
  //     masterGainNode.gain.value = volumeControl.value;

  //     // Create the keys; skip any that are sharp or flat; for
  //     // our purposes we don't need them. Each octave is inserted
  //     // into a <div> of class "octave".

  //     noteFreq.forEach(function(keys, idx) {
  //       let keyList = Object.entries(keys);
  //       let octaveElem = document.createElement("div");
  //       octaveElem.className = "octave";

  //       keyList.forEach(function(key) {
  //         if (key[0].length == 1) {
  //           octaveElem.appendChild(createKey(key[0], idx, key[1]));
  //         }
  //       });

  //       keyboard.appendChild(octaveElem);
  //     });

  //     document.querySelector("div[data-note='B'][data-octave='5']").scrollIntoView(false);

  //     sineTerms = new Float32Array([0, 0, 1, 0, 1]);
  //     cosineTerms = new Float32Array(sineTerms.length);
  //     customWaveform = audioContext.createPeriodicWave(cosineTerms, sineTerms);

  //     for (i=0; i<9; i++) {
  //         oscList[i] = [];
  //     }
  //   }

  //   setup();

  //   function createKey(note, octave, freq) {
  //     let keyElement = document.createElement("div");
  //     let labelElement = document.createElement("div");

  //     keyElement.className = "key";
  //     keyElement.dataset["octave"] = octave;
  //     keyElement.dataset["note"] = note;
  //     keyElement.dataset["frequency"] = freq;

  //     labelElement.innerHTML = note + "<sub>" + octave + "</sub>";
  //     keyElement.appendChild(labelElement);

  //     keyElement.addEventListener("mousedown", notePressed, false);
  //     keyElement.addEventListener("mouseup", noteReleased, false);
  //     keyElement.addEventListener("mouseover", notePressed, false);
  //     keyElement.addEventListener("mouseleave", noteReleased, false);

  //     return keyElement;
  //   }

  //   function playTone(freq) {
  //     let osc = audioContext.createOscillator();
  //     osc.connect(masterGainNode);

  //     let type = wavePicker.options[wavePicker.selectedIndex].value;

  //     if (type == "custom") {
  //       osc.setPeriodicWave(customWaveform);
  //     } else {
  //       osc.type = type;
  //     }

  //     osc.frequency.value = freq;
  //     osc.start();

  //     return osc;
  //   }
  //   playTone() 

  //   function notePressed(event) {
  //     if (event.buttons & 1) {
  //       let dataset = event.target.dataset;

  //       if (!dataset["pressed"]) {
  //         oscList[dataset["octave"][dataset["note"]]] = playTone(dataset["frequency"]);
  //         dataset["pressed"] = "yes";
  //       }
  //     }
  //   }

  //   function noteReleased(event) {
  //     let dataset = event.target.dataset;

  //     if (dataset && dataset["pressed"]) {
  //       oscList[dataset["octave"][dataset["note"]]].stop();
  //       oscList[dataset["octave"][dataset["note"]]] = null;
  //       delete dataset["pressed"];
  //     }
  //   }
  //   noteReleased() 
  //   function changeVolume(event) {
  //     masterGainNode.gain.value = volumeControl.value
  //   }






})