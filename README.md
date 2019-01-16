# Otto
Dancing robot Otto. Firmaware and test for him
protocol of connection:

bits:| 0  1  2  3  4  5  6  7 | 0  1  2  3  4  5  6  7 | 0  1  2  3  4  5  6  7 | 0  1  2  3  4  5  6  7 
' '  |nothing                 |
'a'  |nothing                 |
'b'  |time of one step * 125  | number of steps        |high of step|R|step kind|                       | //dansing
'c'  |time of one step * 125  | number of steps        |high ofstep|Dir|stepkind|                       | //move steps
'd'  |R  |stolbec |str    |vkl|                        |                        |                       | //1 LED on/off
'e'  |0 str|1 str|...|7 str|                                                                              //your own LED picture
'f'  |number of def picture|                                                                              //set def picture
'g'  |              | R  G  B |                                                                           //set nose colour
'h'  | note number( 0- 256*16-1)          |1000/duration|                                                 //play note
'i'  | left hand angle        | right hand angle       |                                                  //set hands angle
'j'  reserved
's'  | left leg angle         |   left leg angle       | right leg angle        | right leg angle       |//set legs position

answer # dist 0/1sound
