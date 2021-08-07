




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
      $.ajax({
          url: "https://127.0.0.1/message",
          type: "POST",
          data: {
            userId_send: "8",
              userId_receiver: "10" ,
              message: "message !!"
              
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








