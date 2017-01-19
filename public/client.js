$(function(){
  console.log('document loaded');

  getSongs();

  $('#addSong').on('submit', addSong);
});

function getSongs() {
  $.ajax({
    url: '/songs',
    type: 'GET',
    success: displaySongs
  });
}

function addSong(event) {
  // stop the browser from trying to navigate away from our page
  event.preventDefault();

  // get the information out of the form
  var songData = $(this).serialize();

  $.ajax({
    url: '/songs',
    type: 'POST',
    data: songData,
    success: getSongs
  })
}

function displaySongs(songs) {
  $('#songs').empty(); //clears previous songs

  songs.forEach(function(song) {
    // var dateFormatted = song.dateAdded.toLocaleString('en-US');
    $('#songs').append('<li>' + song.title + ' by '
      + song.artist + ' from album ' + song.album + '.  Added: ' + song.dateAdded + '</li>');
  });

    $('form').find('input[type=text]').val('');  // resets all text to empty string

}
