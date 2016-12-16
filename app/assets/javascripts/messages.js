$(function() {

    $.get("/messages").success(function(data) {
      var htmlString = '';
       $.each(data, function(index,  message) {
        var day = new Date(message.created_at).toLocaleDateString();
        var time = new Date(message.created_at).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
        var divElement = '<div class="' + message.person + '"><span class="timestamp">' + day + " - " + time + '</span><br />' + message.dialog + '</div>';
        htmlString += divElement;
      });
      $('#messages').html(htmlString);
    });

    function form_submit(person) {
      var textbox = $('.' + person + '_new_msg');
      if (textbox.val() != '') {
       var payload = {
        message: {
          person: person,
          dialog: textbox.val()
        }
      };
      $.post("/messages", payload).success(function(message) {
        var day = new Date(message.created_at).toLocaleDateString();
        var time = new Date(message.created_at).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
        var divElement = '<div class="' + message.person + '"><span class="timestamp">' + day + " - " + time + '</span><br />' + message.dialog + '</div>';       
        $('#messages').append(divElement);
        textbox.val('');
      });
      }
    };

    $('#buyer-form').submit(function(event) {
      event.preventDefault();
      form_submit('buyer')
    });

    $('#seller-form').submit(function(event) {
      event.preventDefault();
      form_submit('seller')
    });
  });