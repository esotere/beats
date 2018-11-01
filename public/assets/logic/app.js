$(function() {
    $("header").hide().slideDown(3000)
    
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
    }).then(function(response) {
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
   
       let queryUrl2 = "./database/schema.sql"
   
       $.ajax({
         url: queryUrl3,
         method: "GET"
       }).then(function(response) {
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
    let t =  $("<img>").attr("src", images[0])
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
         let t = $("<img>").attr("src", images[slideIndex-1]).addClass("slides2").fadeIn(5000).fadeOut(9000);
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
      event.preventDefault();

      var newBeat = {
        beatName: $("#bname").val().trim(),
        producerName: $("#pname").val().trim(),
        beat: () => {

        }
      };
  
      // Send the POST request.
      $.ajax("/api/beats", {
        type: "POST",
        data: newBeat
      }).then(
        function() {
          console.log("created new beat");
          // Reload the page to get the updated list
          location.reload();
        }
      );


      // $("#recentUploads").empty()
      // $(".right-content").removeClass().addClass("right-content-result")
      let upload = $("#entry").val().trim()
      let prodUpload = $("#pname").val().trim()
      let beatUpload = $("#bname").val().trim()
      let join1 = beatUpload + " <br>" + "by " + prodUpload +"<br>"   + upload + "<br><br>"
      let bdiv = $("<div>").addClass("buy")

      let b1 = $('<button/>',
      {
          text: 'listen',
          click: () => { alert('straight fire'); }
      });
      let b2 = $('<button/>',
      {
          text: 'buy',
          click: () => { alert('$$$$$$$'); }
      });
  
      let y = bdiv.append(join1).append(b1).append(b2);

      if (prodUpload === "sovereign") {
        $("#music-list, #allBeats").prepend(y).addClass("sovereign");

      }else {

        
        $("#recentUploads, #allBeats").prepend(y).addClass("others");
      }
      // $("#allBeats").prepend(join1);
 
    })


    
    //=======================================================================


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