$(document).ready(function() {

    listDevices();
    on=false;
    windSound = new Audio("sounds/wind.wav");
    windSound.loop = true
    scarySound = new Audio("sounds/scary.wav");
    scarySound.loop = true
    $box = $('#colorPicker');
    $box.tinycolorpicker();

    $(".two").click(function(){
        breathe();
    });
    $(".three").click(function(){
        pulse();
    });
    $('#colorPicker').click(function(){
            pickColor();
    });


});
var token = "c5b8f3641c8948015168464d2f0fade440315ad710ac05c08e6cd4ba31027459";
function listDevices() {
        $.ajax({
          url: "https://api.lifx.com/v1/lights/all",
          type: "GET",
          beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
          },
          success: function(result) {
            console.log(result);
          },
          error: function(error) {
            console.log(error);
          }
        });
}

 function breathe() {
          data ={   "color": "blue",
                    "period": 3,
                    "cycles": 5,
                    "persist": false,
                    "power_on": true,
                    "peak": 0.5
           };
          $.ajax({
            url: "https://api.lifx.com/v1/lights/d073d534919e/effects/breathe",
            dataType: 'json',
            data: data,
            method: 'POST',
            beforeSend: function (xhr) {
              xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: function(result) {
              //$('.fun').attr('src','wave.webp');
              $('.right').css({backgroundColor : '#FEFEC7', backgroundImage : 'url(images/wave.webp)', backgroundRepeat : 'no-repeat', backgroundPosition : 'center'});
              scarySound.pause();
              windSound.play();
              console.log(result);
            },
            error: function(error) {
              console.log(error);
            }
          });
  }

 function pulse() {
          data ={
                    "color": "orange",
                    "from_color": "red",
                    "period": 3,
                    "cycles": 8,
                    "persist": false,
                    "power_on": true
          };
          $.ajax({
            url: "https://api.lifx.com/v1/lights/d073d534919e/effects/pulse",
            dataType: 'json',
            data: data,
            method: 'POST',
            beforeSend: function (xhr) {
              xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: function(result) {
              //$('.fun').attr('src','treetree.gif');
              $('.right').css({backgroundColor : 'black', backgroundImage : 'url(images/pumpkin.webp)', backgroundRepeat : 'no-repeat', backgroundPosition : 'fixed bottom center'});
             scarySound.play();
             windSound.pause();
              console.log(result);
            },
            error: function(error) {
              console.log(error);
            }
          });
  }

  function pickColor() {

    $('body').css({backgroundColor : 'white', backgroundImage: ''});
    scarySound.pause();
    windSound.pause();
    var picker = $('#colorPicker').data("plugin_tinycolorpicker");
    data = {
      "power": "on",
      "color": picker.colorHex,
      "duration": 0,
      "fast": true
    }
    $.ajax({
                url: "https://api.lifx.com/v1/lights/d073d534919e/state",
                dataType: 'json',
                data: data,
                method: 'PUT',
                beforeSend: function (xhr) {
                  xhr.setRequestHeader("Authorization", "Bearer " + token);
                },
                success: function(result) {
                  console.log(result);
                },
                error: function(error) {
                  $('.right').css({backgroundColor : picker.colorHex, backgroundImage: ''});
                  console.log(error);
                }
              });
  }
