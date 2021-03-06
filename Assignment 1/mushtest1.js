
var dataServer;
var pubKey = 'pub-c-570f662f-35f0-48b0-be48-9e2b76cb7ecf';
var subKey = 'sub-c-f73902d4-1e53-11e9-b4a6-026d6924b094';

var channelName = "messageChannel";

var value = 0;

function setup() {
createCanvas(500,500);
  getAudioContext().resume();



   // initialize pubnub
  dataServer = new PubNub(
  {
    publish_key   : pubKey,  //get these from the pubnub account online
    subscribe_key : subKey,
    ssl: true  //enables a secure connection. This option has to be used if using the OCAD webspace
  });

  //attach callbacks to the pubnub object to handle messages and connections
  dataServer.addListener({ message: readIncoming});
  dataServer.subscribe({channels: [channelName]});

}

function draw() {



	background(0,10);
	fill(mouseX,mouseY,80);
	if(mouseIsPressed){
	for(var i =0; i < 10; i++){
ellipse(mouseX+random(30),mouseY+random(30),30,30);









		}
	}
}


function keyReleased(){

  // Send Data to the server to draw it in all other canvases
  dataServer.publish(
    {
      channel: channelName,
      message:{

       x: mouseX,
       y: mouseY,

           //get the value from the text box and send it as part of the message
      }
    });

}
function readIncoming(inMessage) //when new data comes in it triggers this function,
{                               // this works becsuse we subscribed to the channel in setup()

  // simple error check to match the incoming to the channelName
  if(inMessage.channel == channelName)
  {

    console.log(inMessage.message.x);
  }
}
