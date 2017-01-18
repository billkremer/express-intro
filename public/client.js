$(function(){
  console.log('document loaded');

  $.ajax({
    url: '/data',
    type: 'GET',
    success: displaySongs
  });

});

function displaySongs(songs) {
  console.log(songs);
}
