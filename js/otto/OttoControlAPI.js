import DeviceControlAPI from './DeviceControlAPI';
//import RobotSensorsData from './RobotSensorsData';
import {InterfaceDevice,searchDevices,getConnectedDevices,pushConnectedDevices,DEVICES,DEVICE_STATES} from './chrome';


export default class OttoControlAPI extends DeviceControlAPI {
  constructor(){
     super();

  }
  ascend(tim,steps,h)//(tim,steps,h,dir)
  {
    var bit = 0x00;
    bit +=0;
    bit +=h*8;
    this.ConnectedOtto[0].command(DEVICES[this.ConnectedOtto[0].getDeviceID()].commands.be, [tim,step,0], (response) => {
      this.SensorsData = response;
      this.dataRecieveTime = Date.now();
               });
  }
  jitter(tim,steps,h)//(tim,steps,h,dir)
  {
    var bit = 0x00;
    bit +=1;
    bit +=h*8;
    this.ConnectedOtto[0].command(DEVICES[this.ConnectedOtto[0].getDeviceID()].commands.be, [tim,step,0], (response) => {
      this.SensorsData = response;
      this.dataRecieveTime = Date.now();
               });
  }
  tiptoe(tim,steps,h)//(tim,steps,h,dir)
  {
    var bit = 0x00;
    bit +=2;
    bit +=h*8;
    this.ConnectedOtto[0].command(DEVICES[this.ConnectedOtto[0].getDeviceID()].commands.be, [tim,step,0], (response) => {
      this.SensorsData = response;
      this.dataRecieveTime = Date.now();
               });
  }
  swing(tim,steps,h)//(tim,steps,h,dir)
  {
    var bit = 0x00;
    bit +=3;
    bit +=h*8;
    this.ConnectedOtto[0].command(DEVICES[this.ConnectedOtto[0].getDeviceID()].commands.be, [tim,step,0], (response) => {
      this.SensorsData = response;
      this.dataRecieveTime = Date.now();
               });
  }
  updown(tim,steps,h)//(tim,steps,h,dir)
  {
    var bit = 0x00;
    bit +=4;
    bit +=h*8;
    this.ConnectedOtto[0].command(DEVICES[this.ConnectedOtto[0].getDeviceID()].commands.be, [tim,step,0], (response) => {
      this.SensorsData = response;
      this.dataRecieveTime = Date.now();
               });
  }
  jump(tim,steps)//(tim,steps,h,dir)
  {
    this.ConnectedOtto[0].command(DEVICES[this.ConnectedOtto[0].getDeviceID()].commands.ce, [tim,step,0], (response) => {
      this.SensorsData = response;
      this.dataRecieveTime = Date.now();
               });
  }
  shake(tim,steps,dir)//(tim,steps,h,dir)
  {
    var bit = 0x00;
    bit +=1;
    bit +=dir*8;
    this.ConnectedOtto[0].command(DEVICES[this.ConnectedOtto[0].getDeviceID()].commands.ce, [tim,step,bit], (response) => {
      this.SensorsData = response;
      this.dataRecieveTime = Date.now();
               });
  }
  bend(tim,steps,dir)//(tim,steps,h,dir)
  {
    var bit = 0x00;
    bit +=2;
    bit +=dir*8;
    this.ConnectedOtto[0].command(DEVICES[this.ConnectedOtto[0].getDeviceID()].commands.ce, [tim,step,bit], (response) => {
      this.SensorsData = response;
      this.dataRecieveTime = Date.now();
               });
  }
  walk(tim,steps,dir)//(tim,steps,h,dir)
  {
    var bit = 0x00;
    bit +=3;
    bit +=dir*8;
    this.ConnectedOtto[0].command(DEVICES[this.ConnectedOtto[0].getDeviceID()].commands.ce, [tim,step,bit], (response) => {
      this.SensorsData = response;
      this.dataRecieveTime = Date.now();
               });
  }
  turn(tim,steps,dir)//(tim,steps,h,dir)
  {
    var bit = 0x00;
    bit +=4;
    bit +=dir*8;
    this.ConnectedOtto[0].command(DEVICES[this.ConnectedOtto[0].getDeviceID()].commands.ce, [tim,step,bit], (response) => {
      this.SensorsData = response;
      this.dataRecieveTime = Date.now();
               });
  }
  crusaido(tim,steps,h,dir)//(tim,steps,h,dir)
  {
    var bit = 0x00;
    bit +=5;
    bit +=dir*8;
    bit+=round(h/2)*16;
    this.ConnectedOtto[0].command(DEVICES[this.ConnectedOtto[0].getDeviceID()].commands.ce, [tim,step,bit], (response) => {
      this.SensorsData = response;
      this.dataRecieveTime = Date.now();
               });
  }
  flap(tim,steps,h,dir)//(tim,steps,h,dir)
  {
    var bit = 0x00;
    bit +=6;
    bit +=dir*8;
    bit+=round(h/2)*16;
    this.ConnectedOtto[0].command(DEVICES[this.ConnectedOtto[0].getDeviceID()].commands.ce, [tim,step,bit], (response) => {
      this.SensorsData = response;
      this.dataRecieveTime = Date.now();
               });
  }
  moon(tim,steps,h,dir)//(tim,steps,h,dir)
  {
    var bit = 0x00;
    bit +=7;
    bit +=dir*8;
    bit+=round(h/2)*16;
    this.ConnectedOtto[0].command(DEVICES[this.ConnectedOtto[0].getDeviceID()].commands.ce, [tim,step,bit], (response) => {
      this.SensorsData = response;
      this.dataRecieveTime = Date.now();
               });
  }
  serv(tim,a1,a2,a3,a4)
  {
    this.ConnectedOtto[0].command(DEVICES[this.ConnectedOtto[0].getDeviceID()].commands.se, [tim,a1,a2,a3,a4], (response) => {
      this.SensorsData = response;
      this.dataRecieveTime = Date.now();
               });

  }

}
