var keep_going = true;
var page = 1;

var remove_notifications = function(data) {
  if(typeof data == 'undefined') {
    data = $('body');
  }
  $.ajaxPrefilter(function(a, b, c) {
    if (d = $('meta[name="csrf-token"]', data).attr("content"))
      return c.setRequestHeader("X-CSRF-Token", d);
  });
  
  $("#inbox .del a").each(function() {
    $.ajax({
      url: $(this).attr('rel'),
      type: 'DELETE',
      success: function(data, textStatus, xhr) {
        console.log('Removed Message');
      }
    });  
  });
  
};

var process_page = function() {
  $.get('/inbox/notifications', {page: page}, function(data, textStatus, xhr) {
    var content = $(data).find('.item');
    if(page > 5) {
      content = [];
    }
    if(content.length != 0) {
      console.log('Loading page: ' + page)
      page++;
      $('.list').append(content);
      
      remove_notifications(data);
      
      setTimeout(process_page, 100);
    }
  });
};

remove_notifications();
process_page();
