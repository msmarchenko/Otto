const DEVICE_SERIAL_NUMBER_PROBE_INTERVAL = 100;
const DEVICE_SERIAL_NUMBER_LENGTH = 52;
const DEVICE_HANDLE_TIMEOUT = 1 * 10 * 1000;
const NULL_COMMAND_TIMEOUT = 1 * 5 * 1000;
const CHECK_SERIAL_NUMBER_FLUSH_TIMEOUT = 500;
const NO_RESPONSE_TIME = 1000;
const UNO_TIMEOUT = 3000;
const log = console.log;
var can_log = true;
console.log = function(string){
  if(can_log){
        log(string);
  }
}
console.log("Robboscratch3_DeviceControlAPI-module-version-1.0.1-dev");
const DEVICE_STATES = Object.freeze({
   "INITED": 0,
   "CLOSING": 1,
   "CONNECTED":2,
   "DEVICE_CHECKING": 3,
   "DEVICE_IS_RUBBISH": 4,
   "DEVICE_PURGING": 5,
   "DEVICE_IS_READY": 6,
   "DEVICE_ERROR":7,
   "TIMEOUT":8
});
const commands_list_otto= {
  "check":{
    "code": "a",
    "params": [],
    "response": {
                 "dalnost" : "ubyte",
                }
  },
  "be":{
    "code": "b",
    "params": ["ubyte","ubyte","ubyte"],
    "response": {
                 "dalnost" : "ubyte",
                }
  },
  "ce":{
    "code": "c",
    "params": ["ubyte","ubyte","ubyte"],
    "response": {
                 "dalnost" : "ubyte",
                }
  },
  "se":{
    "code": "s",
    "params": ["ubyte","ubyte","ubyte","ubyte","ubyte"],
    "response": {
                 "dalnost" : "ubyte",
                }
  }
}
const commands_list_robot = {
   "check":{
      "code": "a",
      "params": [],
      "response": {
                   "encoder0" : "uint2",
                   "encoder1" : "uint2",
                   "path0"    : "uint2",
                   "path1"    : "uint2",
                   "a0"       : "ubyte[4]",
                   "a1"       : "ubyte[4]",
                   "a2"       : "ubyte[4]",
                   "a3"       : "ubyte[4]",
                   "a4"       : "ubyte[4]",
                   "button"   : "ubyte"
                  }
   },
   "power":{
      "code": "c",
      "params": ["ubyte", "ubyte"],
      "response": {
                   "encoder0" : "uint2",
                   "encoder1" : "uint2",
                   "path0"    : "uint2",
                   "path1"    : "uint2",
                   "a0"       : "ubyte[4]",
                   "a1"       : "ubyte[4]",
                   "a2"       : "ubyte[4]",
                   "a3"       : "ubyte[4]",
                   "a4"       : "ubyte[4]",
                   "button"   : "ubyte"
                  }
   },
   "rob_encoder":{
      "code": "e",
      "params": ["ubyte"],
      "response": {
                   "encoder0" : "uint2",
                   "encoder1" : "uint2",
                   "path0"    : "uint2",
                   "path1"    : "uint2",
                   "a0"       : "ubyte[4]",
                   "a1"       : "ubyte[4]",
                   "a2"       : "ubyte[4]",
                   "a3"       : "ubyte[4]",
                   "a4"       : "ubyte[4]",
                   "button"   : "ubyte"
                  }
   },
   "rob_lamps":{
      "code": "h",
      "params": ["ubyte"],
      "response": {
                   "encoder0" : "uint2",
                   "encoder1" : "uint2",
                   "path0"    : "uint2",
                   "path1"    : "uint2",
                   "a0"       : "ubyte[4]",
                   "a1"       : "ubyte[4]",
                   "a2"       : "ubyte[4]",
                   "a3"       : "ubyte[4]",
                   "a4"       : "ubyte[4]",
                   "button"   : "ubyte"
                  }
   },
   "rob_pow_encoder":{
      "code": "g",
      "params": ["ubyte", "ubyte","ubyte","ubyte"],
      "response": {
                   "encoder0" : "uint2",
                   "encoder1" : "uint2",
                   "path0"    : "uint2",
                   "path1"    : "uint2",
                   "a0"       : "ubyte[4]",
                   "a1"       : "ubyte[4]",
                   "a2"       : "ubyte[4]",
                   "a3"       : "ubyte[4]",
                   "a4"       : "ubyte[4]",
                   "button"   : "ubyte"
                  }
   },
   "rob_claw":{
      "code": "j",
      "params": ["ubyte"],
      "response": {
                   "encoder0" : "uint2",
                   "encoder1" : "uint2",
                   "path0"    : "uint2",
                   "path1"    : "uint2",
                   "a0"       : "ubyte[4]",
                   "a1"       : "ubyte[4]",
                   "a2"       : "ubyte[4]",
                   "a3"       : "ubyte[4]",
                   "a4"       : "ubyte[4]",
                   "button"   : "ubyte"
                  }
   },
   "sensors":{
      "code": "i",
      "params": ["ubyte", "ubyte", "ubyte", "ubyte", "ubyte"],
      "response": {
                   "encoder0" : "uint2",
                   "encoder1" : "uint2",
                   "path0"    : "uint2",
                   "path1"    : "uint2",
                   "a0"       : "ubyte[4]",
                   "a1"       : "ubyte[4]",
                   "a2"       : "ubyte[4]",
                   "a3"       : "ubyte[4]",
                   "a4"       : "ubyte[4]",
                   "button"   : "ubyte"
                  }
   }
 };

 const commands_list_laboratory = {
    "check":{
       "code": "a",
       "params": [],
       "response": {
                       "d8_13" : "ubyte",
                       "a0"       : "ubyte",
                       "a1"       : "ubyte",
                       "a2"       : "ubyte",
                       "a3"       : "ubyte",
                       "a4"       : "ubyte",
                       "a5"       : "ubyte",
                       "a6"       : "ubyte",
                       "a7"       : "ubyte",
                       "a8"       : "ubyte",
                       "a9"       : "ubyte",
                       "a10"       : "ubyte",
                       "a11"       : "ubyte",
                       "a12"       : "ubyte",
                       "a13"       : "ubyte",
                       "a14"       : "ubyte",
                       "a15"       : "ubyte"

                   }
    },
    "lab_lamps":{
       "code": "b",
       "params": ["ubyte"],
       "response": {
                     "d8_13" : "ubyte",
                     "a0"       : "ubyte",
                     "a1"       : "ubyte",
                     "a2"       : "ubyte",
                     "a3"       : "ubyte",
                     "a4"       : "ubyte",
                     "a5"       : "ubyte",
                     "a6"       : "ubyte",
                     "a7"       : "ubyte",
                     "a8"       : "ubyte",
                     "a9"       : "ubyte",
                     "a10"       : "ubyte",
                     "a11"       : "ubyte",
                     "a12"       : "ubyte",
                     "a13"       : "ubyte",
                     "a14"       : "ubyte",
                     "a15"       : "ubyte"

                   }
    },

    "lab_color_lamps":{
       "code": "c",
       "params": ["ubyte"],
       "response": {
                     "d8_13" : "ubyte",
                     "a0"       : "ubyte",
                     "a1"       : "ubyte",
                     "a2"       : "ubyte",
                     "a3"       : "ubyte",
                     "a4"       : "ubyte",
                     "a5"       : "ubyte",
                     "a6"       : "ubyte",
                     "a7"       : "ubyte",
                     "a8"       : "ubyte",
                     "a9"       : "ubyte",
                     "a10"       : "ubyte",
                     "a11"       : "ubyte",
                     "a12"       : "ubyte",
                     "a13"       : "ubyte",
                     "a14"       : "ubyte",
                     "a15"       : "ubyte"

                   }
    },

    "lab_dig_on":{
       "code": "e",
       "params": ["ubyte"],
       "response": {
                     "d8_13" : "ubyte",
                     "a0"       : "ubyte",
                     "a1"       : "ubyte",
                     "a2"       : "ubyte",
                     "a3"       : "ubyte",
                     "a4"       : "ubyte",
                     "a5"       : "ubyte",
                     "a6"       : "ubyte",
                     "a7"       : "ubyte",
                     "a8"       : "ubyte",
                     "a9"       : "ubyte",
                     "a10"       : "ubyte",
                     "a11"       : "ubyte",
                     "a12"       : "ubyte",
                     "a13"       : "ubyte",
                     "a14"       : "ubyte",
                     "a15"       : "ubyte"

                   }
    },


    "lab_dig_off":{
       "code": "f",
       "params": ["ubyte"],
       "response": {
                     "d8_13" : "ubyte",
                     "a0"       : "ubyte",
                     "a1"       : "ubyte",
                     "a2"       : "ubyte",
                     "a3"       : "ubyte",
                     "a4"       : "ubyte",
                     "a5"       : "ubyte",
                     "a6"       : "ubyte",
                     "a7"       : "ubyte",
                     "a8"       : "ubyte",
                     "a9"       : "ubyte",
                     "a10"       : "ubyte",
                     "a11"       : "ubyte",
                     "a12"       : "ubyte",
                     "a13"       : "ubyte",
                     "a14"       : "ubyte",
                     "a15"       : "ubyte"

                   }
    },

    "lab_dig_pwm":{
       "code": "g",
       "params": ["ubyte","ubyte"],
       "response": {
                     "d8_13" : "ubyte",
                     "a0"       : "ubyte",
                     "a1"       : "ubyte",
                     "a2"       : "ubyte",
                     "a3"       : "ubyte",
                     "a4"       : "ubyte",
                     "a5"       : "ubyte",
                     "a6"       : "ubyte",
                     "a7"       : "ubyte",
                     "a8"       : "ubyte",
                     "a9"       : "ubyte",
                     "a10"       : "ubyte",
                     "a11"       : "ubyte",
                     "a12"       : "ubyte",
                     "a13"       : "ubyte",
                     "a14"       : "ubyte",
                     "a15"       : "ubyte"
                   }
    },

    "lab_sound":{
       "code": "d",
       "params": ["ubyte"],
       "response": {
                 "d8_13" : "ubyte",
                 "a0"       : "ubyte",
                 "a1"       : "ubyte",
                 "a2"       : "ubyte",
                 "a3"       : "ubyte",
                 "a4"       : "ubyte",
                 "a5"       : "ubyte",
                 "a6"       : "ubyte",
                 "a7"       : "ubyte",
                 "a8"       : "ubyte",
                 "a9"       : "ubyte",
                 "a10"       : "ubyte",
                 "a11"       : "ubyte",
                 "a12"       : "ubyte",
                 "a13"       : "ubyte",
                 "a14"       : "ubyte",
                 "a15"       : "ubyte"

                   }
    }

};
const last_firmwares =[7,5,2,1,1,7,7,7];
const DEVICES = Object.freeze({
   //Basic Robot
   0:{
      "firmware":7,
      "commands":commands_list_robot
   },
   //Old Robot
   3:{
      "firmware":7,
      "commands":commands_list_robot
   },

   //New lab
   1:{

     "firmware":5,
     "commands": commands_list_laboratory
   },

   //New lab
   2:{

     "firmware":2,
     "commands": commands_list_laboratory

   },
   //Old lab
   4:{

     "firmware":5,
     "commands": commands_list_laboratory

   },
   5:{
     "firmware":1,
   "commands": commands_list_otto
 }
});

var arrDevices = [];

function InterfaceDevice(port){

  {// PEREMENNIE
    console.log("new InterfaceDevice");
   this.port = port;
   var options={
    baudRate: 115200,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false,
    autoOpen: false};
   console.log("options added");
   var NO_RESPONSE;
   var NO_START;
   var UNOTIME;
   var qport = new _serialport(port.comName, options);
   var LOG = "[" + port.comName + " random_object_identifier: " +  (Math.floor( Math.random() * 100) ) +  "] ";
   console.log(LOG + "Trying to register a new device...");
   var state = DEVICE_STATES["INITED"];
   var previous_state = state;
   var bufIncomingData = new Uint8Array();
   var iDeviceID;
   var iFirmwareVersion;
   var sSerialNumber;
   var iSerialNumberOffset;
   var iWaiting = 0;
   var response = {};
   var commandToRun = null;
   var callback = null;
   var automaticStopCheckingSerialNumberTimeout
   var isStopCheckingSerialNumber = false;
   var commands_stack = [];
   var    time1 = Date.now();
   var    time_delta = 0;
   var    time2 = Date.now();
   var recieve_time1 =  Date.now();
   var recieve_time_delta = 0;
   var recieve_time2 =  Date.now();
   var command_try_send_time1 = Date.now();
   var command_try_send_time2 = null;
   var check_serial_number_time1 = Date.now();
   var check_serial_number_time2 = Date.now();
   var can_check_serial_after_flush = true;
   var wait_for_sync = false;
   var recieveListener;
   var bitrate = 115200;
   var jport;
  }

  var try_to_reconnect = function(){
var  namee = port.comName;

    // state = DEVICE_STATES["INITED"];

/*
    sSerialNumber = undefined;

     iWaiting = 0;
     response = {};
     commandToRun = null;
     callback = null;


     isStopCheckingSerialNumber = false;

     commands_stack = [];

     can_check_serial_after_flush = true;

     wait_for_sync = false;


     for (let index = 0; index < arrDevices.length; index++){
           if(arrDevices[index].getState() == DEVICE_STATES["TIMEOUT"])
            {
                 arrDevices[index] = null;
                      //    _serialport.list(onGetDevices);
                 }
           };

*/
setTimeout(()=>{searchDevices()},2000);
/*
    var autorec = setInterval(()=>{
     _serialport.list((err,ports)=>{//NEW DEVICE SEARHING
      // console.warn(ports);
       //console.warn("strated"+port.comName);
       for (var i=0; i<ports.length; i++) {
         if(ports[i].comName == namee){
           console.log("FINDED!");
           clearInterval(autorec);
           searchDevices();
           break;
          //  qport=jport;
       //qport.resume();
      //    console.log("RESUMED");
      //    onConnect();
       }
      }
    });},200);

*/
  }

   var onReceiveCallback = function(data){//TODO TODO  TODO TODOOOOOOO TODODODO


      if(data)
      {
           clearTimeout(NO_RESPONSE);
         var buf = new Uint8Array(data);
      //   console.log(LOG + "CALLBACK!!! bytes recieved length <- " + buf.length);
        // console.log(LOG + "CALLBACK!!! bytes buf <- " + buf);
          var bufIncomingDataNew = null;
           bufIncomingDataNew = new Uint8Array(bufIncomingData.length + buf.length);
           bufIncomingDataNew.set(bufIncomingData);
           bufIncomingDataNew.set(buf, bufIncomingData.length);
           bufIncomingData = bufIncomingDataNew;

        //   console.log(LOG + "bufIncomingData: " + bufIncomingData);
        if (state == DEVICE_STATES["DEVICE_IS_READY"]){

    //      NO_RESPONSE = setTimeout(()=>{
      //      console.error(LOG+"Ouuu...NO RESPONSE!");
      //      state = DEVICE_STATES["TIMEOUT"];
          //  qport.pause();
            try_to_reconnect();
      //  },NO_RESPONSE_TIME);

      }



         if(commandToRun == null){ return};
         clearTimeout(NO_START);
        clearTimeout(UNOTIME);                                                //#
         if ( (bufIncomingData.length >= iWaiting) /*&& ( bufIncomingData.indexOf(35) != -1 )*/ ){
            console.log(LOG + "command '" + commandToRun.code + "' complete.");
            var iResponsePointer = /*(bufIncomingData.indexOf(35) + 1);*/ 1;
            Object.keys(commandToRun.response).forEach(function (sField){
               switch(commandToRun.response[sField]){
                  case "uint2":{
                     response[sField] = bufIncomingData[iResponsePointer] * 256 + bufIncomingData[iResponsePointer + 1];
                     iResponsePointer += 2;
                     break;
                  }
                  case "ubyte[4]":{
                     response[sField] = [];
                     response[sField].push(bufIncomingData[iResponsePointer]);
                     response[sField].push(bufIncomingData[iResponsePointer + 1]);
                     response[sField].push(bufIncomingData[iResponsePointer + 2]);
                     response[sField].push(bufIncomingData[iResponsePointer + 3]);
                     iResponsePointer += 4; //modified +=2
                     break;
                  }
                  case "ubyte":{
                     response[sField] = bufIncomingData[iResponsePointer];
                     iResponsePointer += 1;
                     break;
                  }
               }
            });

            commandToRun = null;
            iWaiting = 0;
            callback(response);
            recieve_time1 = Date.now();
            recieve_time_delta = recieve_time1 - recieve_time2;
        //    console.log("time delta recieve: " + recieve_time_delta);

            // NO_RESPONSE = setTimeout(()=>{
            //    console.error(LOG+"Ouuu...NO RESPONSE!");
            //     state = DEVICE_STATES["TIMEOUT"];
            // },NO_RESPONSE_TIME);
             recieve_time2 = Date.now();
         }
       }
       else {
          console.log(LOG + "CALLBACK!!! without data");
       }
   }

   var purgePort = function(){
      console.log(LOG + "purge()");
      state = DEVICE_STATES["PURGE"];
      if(bufIncomingData.length > 0){
      //chrome.serial.flush(iConnectionId, onFlush);
         console.log("FLUSH && PURGE");
         bufIncomingData = new Uint8Array();
         setTimeout(purgePort, 10);
      }
      else{
          if ( (typeof(iDeviceID) != 'undefined') && (typeof(iFirmwareVersion) != 'undefined') && (typeof(sSerialNumber) != 'undefined') ){
                if ( (!isNaN(iDeviceID)) && (!isNaN(iFirmwareVersion)) && ( ( (sSerialNumber).startsWith("R") ) || ((sSerialNumber).startsWith("L")) ) ) {
                        console.info(LOG + "device is ready.");
                        state = DEVICE_STATES["DEVICE_IS_READY"];
                        NO_START = setTimeout(()=>{qport.close(()=>{console.error(LOG+"FUCK, NO_START!");searchDevices()})},500);
                        return;
                }
                else
                {console.log("jui gavno");}
          }
          else
          {console.log("UNDERFINED CHETO");}
          console.log("kyky epta");
          setTimeout(checkSerialNumber, 100);
      }
   }

   var getSerial = function(){
      console.log(LOG + "-> getSerial()");
      var bum=" ";
      qport.write(bum);
      console.log(bum);
      //
      // var  dv  = new DataView(packet);
      // dv.setUint8(0,0x63,true);
      // dv.setUint8(1,0x20,true);
      // dv.setUint8(2,0x20,true);
      // dv.setUint8(3,0x24,true);
   }

   function isN(n) {
      return (!isNaN(parseFloat(n)) && isFinite(n));
      // Метод isNaN пытается преобразовать переданный параметр в число.
      // Если параметр не может быть преобразован, возвращает true, иначе возвращает false.
      // isNaN("12") // false
   }

   var check_correct_serial = function(bufIncomingData){
     console.log("MAGII NET!");
    if(bufIncomingData[iSerialNumberOffset+5]  == '-' &&
       bufIncomingData[iSerialNumberOffset+11] == '-'  &&
       bufIncomingData[iSerialNumberOffset+17] == '-'  &&
       bufIncomingData[iSerialNumberOffset+19] == '-'  &&
       bufIncomingData[iSerialNumberOffset+25] == '-'  &&
       bufIncomingData[iSerialNumberOffset+31] == '-'  &&
       isN(bufIncomingData[iSerialNumberOffset+51]) == 1 &&
       isN(bufIncomingData[iSerialNumberOffset+20]) == 1 &&
       isN(bufIncomingData[iSerialNumberOffset+26]) == 1 &&
       isN(bufIncomingData[iSerialNumberOffset+32]) == 1 &&
       isN(bufIncomingData[iSerialNumberOffset+37]) == 1 &&
     isN(bufIncomingData[iSerialNumberOffset+42]) == 1 &&
     isN(bufIncomingData[iSerialNumberOffset+47]) == 1 )
       {
         console.log("data is" + bufIncomingData[iSerialNumberOffset+5] +
            bufIncomingData[iSerialNumberOffset+11] +
            bufIncomingData[iSerialNumberOffset+17] +
            bufIncomingData[iSerialNumberOffset+19] +
            bufIncomingData[iSerialNumberOffset+25] +
            bufIncomingData[iSerialNumberOffset+31] + " " +
            isN(bufIncomingData[iSerialNumberOffset+51]) + " " +
            isN(bufIncomingData[iSerialNumberOffset+20]) + " " +
            isN(bufIncomingData[iSerialNumberOffset+26]) + " " +
            isN(bufIncomingData[iSerialNumberOffset+32]) + " " +
            isN(bufIncomingData[iSerialNumberOffset+37]) + " " +
            isN(bufIncomingData[iSerialNumberOffset+42]) + " " +
            isN(bufIncomingData[iSerialNumberOffset+47] ));
            console.log(
              "data is:"+ bufIncomingData[iSerialNumberOffset+51] + " " +
                        bufIncomingData[iSerialNumberOffset+20] + " " +
                      bufIncomingData[iSerialNumberOffset+26] + " " +
                    bufIncomingData[iSerialNumberOffset+32] + " " +
                  bufIncomingData[iSerialNumberOffset+37] + " " +
                bufIncomingData[iSerialNumberOffset+42] + " " +
              bufIncomingData[iSerialNumberOffset+47] )
         console.log("PROVERENO_MAXOM!");
         return 1;
       }
       console.log("data is" + bufIncomingData[iSerialNumberOffset+5] +
          bufIncomingData[iSerialNumberOffset+11] +
          bufIncomingData[iSerialNumberOffset+17] +
          bufIncomingData[iSerialNumberOffset+19] +
          bufIncomingData[iSerialNumberOffset+25] +
          bufIncomingData[iSerialNumberOffset+31] + " " +
          isN(bufIncomingData[iSerialNumberOffset+51]) + " " +
          isN(bufIncomingData[iSerialNumberOffset+20]) + " " +
          isN(bufIncomingData[iSerialNumberOffset+26]) + " " +
          isN(bufIncomingData[iSerialNumberOffset+32]) + " " +
          isN(bufIncomingData[iSerialNumberOffset+37]) + " " +
        isN(bufIncomingData[iSerialNumberOffset+42]) + " " +
      isN(bufIncomingData[iSerialNumberOffset+47]) );
       console.log("MAXY_NE_PONRAVILOS'!");
         return 0;
   }

   var checkSerialNumber = function(){
      console.log(LOG + "let's check the serial");
      var sIncomingData = new TextDecoder("utf-8").decode(bufIncomingData);
      console.log(LOG + "Now we have: " + sIncomingData);
      iSerialNumberOffset = sIncomingData.indexOf("ROBBO");
      console.log(bufIncomingData.length + " doljna bit > chem " + (DEVICE_SERIAL_NUMBER_PROBE_INTERVAL+iSerialNumberOffset));
      if(bufIncomingData.length > (DEVICE_SERIAL_NUMBER_PROBE_INTERVAL+iSerialNumberOffset)){
           if((iSerialNumberOffset < 0)||(!(check_correct_serial(sIncomingData)))){
            console.log(LOG + "Rubbish instead of serial number");
            state = DEVICE_STATES["DEVICE_IS_RUBBISH"];
            bufIncomingData = new Uint8Array();
            setTimeout(checkSerialNumber, 100);
           }
           else{
            iDeviceID        = parseInt(sIncomingData.substring(iSerialNumberOffset + 6, iSerialNumberOffset + 11));
            iFirmwareVersion = parseInt(sIncomingData.substring(iSerialNumberOffset + 12, iSerialNumberOffset + 17));
            sSerialNumber    = sIncomingData.substring(iSerialNumberOffset + 18, iSerialNumberOffset + DEVICE_SERIAL_NUMBER_LENGTH);
            console.warn(LOG + "Device=" + iDeviceID + " Firmware=" + iFirmwareVersion + " Serial='" + sSerialNumber + "'");
            if(last_firmwares[iDeviceID]!=iFirmwareVersion)
            console.error("BAD FLASH MF!!!");
            console.warn(last_firmwares[iDeviceID]+ "ot "+ iDeviceID + " = " + iFirmwareVersion + " lol");
            purgePort();
           }
      }
      else{
         if(/*(can_check_serial_after_flush) &&*/  (state == DEVICE_STATES["DEVICE_CHECKING"])  &&   (!isStopCheckingSerialNumber)) {
           getSerial();
           let checkSerialNumberTimeout =   setTimeout(checkSerialNumber, 50); //100
         }
         else{
                  console.log(LOG + "Out of checkSerialNumber timeout. " + "State: " + state);
         }
      }
   }

   var onConnect = function(err) {
         if (err) {
           state = DEVICE_STATES["DEVICE_ERROR"];
           return console.error(LOG + 'Error opening port: '+err.message);
         }
       if(state == DEVICE_STATES["TIMEOUT"])
         qport=jport;
           console.log(LOG + "connected.");
           state = DEVICE_STATES["CONNECTED"];
             bufIncomingData = new Uint8Array();
             iWaiting = 0;
             commandToRun = null;
             can_check_serial_after_flush = false;
       /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      qport.on("data",onReceiveCallback);
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      state = DEVICE_STATES["DEVICE_CHECKING"];
      setTimeout(checkSerialNumber, 300);
     ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          clearTimeout(automaticStopCheckingSerialNumberTimeout);
          automaticStopCheckingSerialNumberTimeout =  setTimeout(function(){
          console.error();("Stop checking serial number.");
               isStopCheckingSerialNumber = true;
           }  ,DEVICE_HANDLE_TIMEOUT);
   }

   this.stopCheckingSerialNumber = function(cb){
     clearTimeout(NO_RESPONSE);
     state= DEVICE_STATES["CLOSING"];
     console.warn(LOG+" Device stopped");
     // if (!isStopCheckingSerialNumber){
     //   isStopCheckingSerialNumber = true;
       qport.close((error) => {
      // TODO: handle the error
        if(error!=null)
        console.error("disconnect error: "+error);
         clearTimeout(automaticStopCheckingSerialNumberTimeout);
            if (cb){
              cb();
            }
          });

          //   if ( /*(state != DEVICE_STATES["DEVICE_ERROR"]) &&*/ (  iConnectionId != null) ) {

          /*
         chrome.serial.disconnect(iConnectionId, (result)=>{

                console.log("Connection closed: " + result);

                iConnectionId = null;

              if (cb){

                  cb();

              }

         });*/

         //  }



          //   }
    //else console.warn("WAITING isStopCheckingSerialNumber");

   }


     if(!qport.isOpen)
     {
        options.baudRate=115200;
        qport.open(onConnect);//38400
        qport.on('error', function(err) {
        console.error();('228 Error: '+err.message);
        });
      }
      else {
        onConnect();
      }
      UNOTIME = setTimeout(()=>{
        console.log(state);
        if(state != DEVICE_STATES["DEVICE_IS_READY"])
      {
        console.log("Its UNO time!");
        qport.close((error) => {
          // TODO: handle the error
       if(error!=null)
       console.error("disconnect error: "+error);
       options.baudRate=38400;
      qport = new _serialport(port.comName, options);
       qport.open(onConnect);//38400
       qport.on('error', function(err) {
        console.error();('Error: '+err.message);
        });
        });
      }
    },UNO_TIMEOUT);


   this.getState = function(){
      return state;
   }

   this.getDeviceID = function(){
      return iDeviceID;
   }

   this.getPortName = function(){
     console.warn("OU FUCK");
     console.warn(this.port.comName);
      return this.port.comName;
   }

   this.getSerialNumber = function(){

        return sSerialNumber;

   }

   this.getShorterSerialNumber = function(){

     function countAllSubstrings(string,substring){

       var pos = -1;
       var entries_count = 0;
       while ((pos = string.indexOf(substring, pos + 1)) != -1) {

            entries_count++;

       }

       return entries_count;

     }


     var buf = "";
     var buf2 = "";
     var shorterSerialNumber = "";
     var index = 0;
     var defis_devider_count = 0;

    shorterSerialNumber = sSerialNumber.substring(0,1);

    buf = sSerialNumber.replace(shorterSerialNumber+"-","");


    defis_devider_count = countAllSubstrings(buf,"-");


    for (var i=0; i<=defis_devider_count; i++){

      while (buf.indexOf("-") == 0){

        buf = buf.replace("-","");
      }


      index = (i==defis_devider_count)?buf.length:buf.indexOf("-");

      buf2 =  buf.substring(0,index);

      buf =  buf.replace(buf2,"");

      while ((buf2.indexOf("0") == 0) && (buf2.length != 1)){

        buf2 = buf2.replace("0","");
      }



      shorterSerialNumber = shorterSerialNumber + "-" +  buf2;

    }


    return shorterSerialNumber;


   }

   this.getFirmwareVersion = function(){


      return iFirmwareVersion;
   }

   this.isDeviceReady = function (){

      return (state ==  DEVICE_STATES["DEVICE_IS_READY"]);

   }

   this.isReadyToSendCommand = function (){

      return (commandToRun == null);

   }

   this.command = function(command, params, fCallback){
    //  if(commandToRun != null) return;
    //  commandToRun = command;


    var fCallback = fCallback;

    var command_local = command;
    var params_local  = params;

    var should_kill_command = false;

    command_try_send_time2 = Date.now();

     // if ((command_try_send_time2 - command_try_send_time1) >= NULL_COMMAND_TIMEOUT){
     //   console.log(command_try_send_time2 + " looool " + command_try_send_time1);
     //     if (command == DEVICES[iDeviceID].commands.check){
     //             console.log(`OSHIBKA!`);
     //             commandToRun = null;
     //             wait_for_sync = true;
     //     }
     // }
     //
      if(commandToRun != null){

        if ((command != DEVICES[iDeviceID].commands.check) ){

            if (commands_stack.length > 0){

              let cmd_obj = commands_stack[commands_stack.length - 1];

          if ( (cmd_obj.command.code == command.code) ) {


                for (let i = 0; i<cmd_obj.params.length;i++){

                  should_kill_command = (cmd_obj.params[i]==params[i])?true:false;

                }



          }



            }

          if (!should_kill_command){

          //  console.log(`buffering commands1... buffer length: ${commands_stack.length}`);

           commands_stack.push({command:command,params:params,fCallback:fCallback,self:this});

          //    console.warn(`survive ${command.code} command`);

             // commands_stack.forEach(function(command_object,command_object_index){
             //
             //     console.log(`After push: ${command_object.command.code} command_object_index1: ${command_object_index}`);
             //
             // } );

          }else{

              //    console.warn(`kill ${command.code} command`);
          }



        }


          return;

      }


      if (commands_stack.length > 500){

            commands_stack = [];

      }

      if (commands_stack.length > 0){






          let command_object          =  commands_stack.shift();

          commandToRun                = command_object.command;
          command_local               = command_object.command; //Suprise!!!
          params_local                = command_object.params; //Surprise!!!
          fCallback                   = command_object.fCallback;

          if ( (command != DEVICES[iDeviceID].commands.check) ){


            if ( (command_object.command.code == command.code) ) {


                  for (let i = 0; i<command_object.params.length;i++){

                    should_kill_command = (command_object.params[i]==params[i])?true:false;

                  }



            }


            if (!should_kill_command){

            //  console.log(`buffering commands2... buffer length: ${commands_stack.length}`);
              commands_stack.push({command:command,params:params,fCallback:fCallback,self:this});
          //    console.warn(`survive ${command.code} command`);

            }else{

                    console.warn(`kill ${command.code} command`);
            }



        // if((command_object.command.code != command.code)&&((command_object.params[0]!=params[0])||(command_object.params[1]!=params[1])))
        //       {
        //
        //
        //       console.log(`buffering commands2... buffer length: ${commands_stack.length}`);
        //     commands_stack.push({command:command,params:params,fCallback:fCallback,self:this});
        //       console.warn(`survive ${command.code} command`);
        //
        //       }
        // else
        // {
        //
        //
        //   console.warn(`kill ${command.code} command`);
        //
        // }
          //   commands_stack.forEach(function(command_object,command_object_index){
          //
          // //      console.log(`Before shift: ${command_object.command.code} command_object_index2: ${command_object_index}`);
          //
          //   } );

          }

          // commands_stack.forEach(function(command_object,command_object_index){
          //
          //     console.log(`After shift: ${command_object.command.code} command_object_index3: ${command_object_index}`);
          //
          // } );


      }else{

          commandToRun  = command;
          command_local = command;
          params_local  = params;

       }

      // setTimeout(function(){
      //
      //     commandToRun=null;
      //
      // },500)


      command_try_send_time1 = Date.now();

      bufIncomingData = new Uint8Array();
      //  var buf=new ArrayBuffer(command_local.code.length + params_local.length + 1);
      const buf = Buffer.allocUnsafe(command_local.code.length + params_local.length + 1);
      //   var  dv  = new DataView(buf);
     var bufCommand = new TextEncoder("utf-8").encode(command_local.code);
      //   var bufCommand =command_local.code;
     //    bufView.set(bufCommand);
      buf.writeUInt8(bufCommand, 0);
      //  dv.setUint8(0,bufCommand,true);
      var iParamOffset = 0;
       params_local.forEach(function(param){
         buf.writeUInt8(param, bufCommand.length + iParamOffset);
        // dv.setUint8(bufCommand.length + iParamOffset,param,true);
         iParamOffset++;
      });
      buf.writeUInt8(0x24, bufCommand.length + iParamOffset);
     //dv.setUint8(bufCommand.length + iParamOffset,0x24,true);

     //  var command_string = (bufCommand).toString(16);

     //  params_local.forEach(function(param){
     //  command_string+=  param.toString();
     //    iParamOffset++;
     // });

     //   command_string += '$'.toString(16);

      console.log(LOG+" Sended: "+buf);
    //  console.log(command_string);
      qport.write(buf);
      //      console.log("OTRAVLENO!");

    //  chrome.serial.send(iConnectionId, buf, onSend);
    //const _serialport = require('serialport');
    //  console.log(`sending command: ${command_local.code}`)

      //for #
      var iWaitingNew = 1;

      //all params
      Object.keys(command_local.response).forEach(function (sField){
         switch(command_local.response[sField]){
            case "uint2":{
               iWaitingNew += 2;
               break;
            }
            case "ubyte[4]":{
               iWaitingNew += 4;
               break;
            }
            case "ubyte":{
               iWaitingNew += 1;
               break;
            }
         }
      });

      callback = fCallback;

    //  console.log(LOG + "we wating for " + iWaitingNew + " bytes");
      iWaiting = iWaitingNew;
   }

   this.disco = function(){
     qport.close(()=>{console.log(LOG+"port closed");});
   }

   //   init;
}

const searchDevices = function(){
 //  arrDevices = [];
 var disconected_devices=0;
    var onGetDevices = function(err,ports) {//NEW DEVICE SEARHING
      if(err)console.error(err);
      else console.log(ports);
      for (var i=0; i<ports.length; i++) {
        if(typeof(ports[i].vendorId) !== 'undefined'){
      //  if(typeof(ports[i].manufacturer) !== 'undefined')
        {
        console.info(" NEW device name is "+ ports[i].comName);
        var device = new InterfaceDevice(ports[i]);
         arrDevices.push(device);
      }
     }
    }

   ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    if (arrDevices.length > 0){
      console.log(">>>>0"+arrDevices.length);
        for (let index = 0; index < arrDevices.length; index++){
          console.log("STOPPPP CHECKING");
              arrDevices[index].stopCheckingSerialNumber(() => {
                    arrDevices[index] = null;
                      disconected_devices++;
                      console.log("DISK "+disconected_devices);
                    if (disconected_devices == (arrDevices.length)){
                             arrDevices = [];
                             console.log(arrDevices.length);
                             _serialport.list(onGetDevices);
                    }
              });
        }
    }
    else{
      console.log("ZEEEERRO");
         _serialport.list(onGetDevices);

    }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
};

const pushConnectedDevices = function(device){

  arrDevices.push(device);

}

const getConnectedDevices = function(){

    return arrDevices;

}

const trigger_logging = function(){


        can_log = !can_log;

}

export  {

  InterfaceDevice,
  searchDevices,
  getConnectedDevices,
  pushConnectedDevices,
  DEVICES,
  DEVICE_STATES,
  trigger_logging


};
