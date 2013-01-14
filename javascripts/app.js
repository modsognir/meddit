var Meddit = {
  fetch: function(id, after) {
    var url = "http://www.reddit.com/r/funny.json?jsonp=?&after=" + id + "&count=" + after
    console.log("Fetching: " + url)

    $.getJSON(url, this.handle_data)
  },

  handle_data: function(data) { 
    console.log(data.data.children)

    $.each(data.data.children, function(index, val) {
      $("#sidebar ul").append("<li><a href='" + val.data.url + "' data-id='" + val.data.name + "' data-index='" + (index+1) + "'>" + val.data.title + "</a></ul>")
    })

    $('a').click(function(e) {
      e.preventDefault();

      var el = $(e.target);

      $('#content iframe').attr('src', el.attr('href'));
      $('.article_title h1').text(el.text());
      $('li.selected').attr('class', '')
      $(el).parent().attr('class', 'selected')

      if ($('li.selected').is(':last-child')) {
        Meddit.fetch($('li.selected a').attr('data-id'), $('li.selected a').attr('data-index'))
      }

    });


    $('li').click(function(e) {
      $(e.target).children('a').click();
    })

    if ($('li.selected')[0] == undefined) {
      $('#sidebar li')[0].click();
    }
  },

  get_response: function() { this.response }
};


$(document).ready(function() {
  Meddit.fetch();

  $('iframe').height($(window).height() - 53);

  Mousetrap.bind('down', function() {
    el = $('li.selected').next();
    el.click();
    document.getElementById('sidebar').scrollTop += el.offset().top - 73;
  });

  Mousetrap.bind('up', function() {
    el = $('li.selected').prev();
    el.click();
    document.getElementById('sidebar').scrollTop += el.offset().top - 73;
  });
})