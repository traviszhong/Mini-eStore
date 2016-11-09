$(document).ready(function(){
  $('.removeSong').click(function(e){
    deleteId = $(this).data('id');
    $.ajax({
      url:'/manage/songs/delete/' + deleteId,
      type: 'DELETE',
      success: function(){

      }
    });
    window.location = '/manage/songs';
  });

  $('.removeStyle').click(function(e){
    deleteId = $(this).data('id');
    $.ajax({
      url:'/manage/styles/delete/' + deleteId,
      type: 'DELETE',
      success: function(){

      }
    });
    window.location = '/manage/styles';
  });
});
