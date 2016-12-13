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

    $('#buyer-form').submit(function(event) {
      event.preventDefault();
      var textbox = $('.buyer_new_msg');
       var payload = {
        message: {
          person: 'buyer',
          dialog: textbox.val()
        }
      };
      $.post("/messages", payload).success(function(message) {
        var day = new Date(message.created_at).toLocaleDateString();
        var time = new Date(message.created_at).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
        var divElement = '<div class="' + message.person + '"><span class="timestamp">' + day + " - " + time + '</span><br />' + message.dialog + '</div>';
        if (textbox.val() != '') {
        $('#messages').append(divElement);
        }
        textbox.val('');
      });
    });

    $('#seller-form').submit(function(event) {
      event.preventDefault();
      var textbox = $('.seller_new_msg');
       var payload = {
        message: {
          person: 'seller',
          dialog: textbox.val()
        }
      };
      $.post("/messages", payload).success(function(message) {
        var day = new Date(message.created_at).toLocaleDateString();
        var time = new Date(message.created_at).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
        var divElement = '<div class="' + message.person + '"><span class="timestamp">' + day + " - " + time + '</span><br />' + message.dialog + '</div>';
        if (textbox.val() != '') {
        $('#messages').append(divElement);
        }
        textbox.val('');
      });
    });
  });