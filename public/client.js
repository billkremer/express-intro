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
    success: getSongs,
    error: displayError
  })
};

function displayError (response) {
  console.log('error resp', response);
  $('#errormessage').text('Could not add song: ' + response.responseText);

};


function displaySongs(songs) {
  $('#songs').empty(); //clears previous songs

  songs.forEach(function(song) {
     var dateFormatted =  "unknown date.";

   if (song.dateAdded) {
     dateFormatted = new Date(song.dateAdded).toDateString();
   }; // checks to make sure song.dateAdded is valid, otherwise "unknown"

// console.log(dateFormatted + 'dateFormatted');
//         console.log(dateFormatted == undefined);
//
//     if (dateFormatted == undefined) {
//          dateFormatted = new Date().toUTCString();
//
//     dateFormatted = '  Added: ' + dateFormatted;
//     };
// this was a bit of code to remove the added part if the date is undefined.



    $('#songs').append('<li>' + song.title + ' by '
      + song.artist + ' from album ' + song.album + '. Added on: ' + dateFormatted + '</li>');
  });

    $('form').find('input[type=text]').val('');  // resets all text to empty string

}
