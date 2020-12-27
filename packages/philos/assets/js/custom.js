jQuery(document).ready(function($) {

  // Responsive Preview Tests
  $('.preview-test').click(function(e) {
    e.preventDefault();
    $('.preview-test').removeClass('preview-devices-active');
    $(this).addClass('preview-devices-active');

    var previewmode = $(this).attr('id').replace('-test', '');
    $('#preview-frame').removeClass();
    $('#preview-frame').addClass(previewmode);

  });

  $('.icon-cancel-circled').click(function() {
    $('.social-share').hide();
  });

});
