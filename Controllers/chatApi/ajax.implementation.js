




$(document).ready(function () {

    var container = $('.container ul');
    $.ajax({
      type: 'GET',
      url: 'https://127.0.0.1/findOneUserMesages/:userId',
      success:function(userId){
        
      
       $.each(userId['data'],function(i,messages){
         container.append('<li class="list-group-item">'+messages.message+'</li>')
       })
      },
      error:function(){
        
      }
    })





    $('#addmessage').on('click',function(){
        //var form = document.getElementById( "myform" );
       // var formjson = toJSONString( form );
       var message = $('#message').val();
       var userId_send = $('#name').val();
       var userId_receiver = $('#namerecevier').val();
      $.ajax({
          url: "https://127.0.0.1/message",
          type: "POST",
          data: {
            userId_send:userId_send,
            userId_receiver:userId_receiver,
            message: message
              
            
          },
          success: function(response){
              console.log(response);
          }
      });
        })





})





function toJSONString( form ) {
  var obj = {};
  var elements = form.querySelectorAll( "input, select, textarea" );
  for( var i = 0; i < elements.length; ++i ) {
    var element = elements[i];
    var name = element.name;
    var value = element.value;

    if( name ) {
      obj[ name ] = value;
    }
  }

  return JSON.stringify( obj );
}








