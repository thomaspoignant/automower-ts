# automower

## TL;DR
To run this test, clone the projet and run 
```shell script
yarn install && yarn start ./test/resources/input_valid
```




## The tasks
The company X wants to develop an auto-mower for square surfaces.

The mower can be programmed to go throughout the whole surface. Mower's position is represented by coordinates (X,Y) and a characters indicate the orientation according to cardinal notations (N,E,W ,S).
The lawn is divided in grid to simplify navigation.

For example, the position can be 0,0,N, meaning the mower is in the lower left of the lawn, and oriented to the north.

The mower is controlled by sending it a sequence of letters. Possible letters are « R », « L » and « F ». « R » and « L » make the mower rotate of 90° respectively to the left or to the right, without moving. « F » means that the mower is moving forward on the cell in front of it, without changing its orientation.


If the position after the move is outside the lawn, then the mower do not move, it keeps its orientation and process the next command.
The cell directly at North of the position (x, y) has for coordinates (x, y+1).

An input file following these rules is given to program the mower:
 - The first line is the coordinates of the upper-right corner of the lawn, coordinates of lower-left corner are supposed to be (0,0)
 - Next lines of the file drive all mowers. There are two lines for each mower:
    - First line give the initial position and orientation of the mower. Position and orientation are given by 2 numbers and a letter, separated by a space
    - Second line is a sequence of instruction driving the mower across the lawn. Instructions are a sequence of letters without space.
    
Each mower moves sequentially, it means that the second mower moves only after the first one execute all its instructions.
When the mower has executed all its instructions, it outputs its position and orientation.

## Goal
Design and write a program implementing the above specifications and validating the following test.

## Example :
**input file**  
5 5  
1 2 N  
LFLFLFLFF  
3 3 E  
FFRFFRFRRF  
**result**  
1 3 N 
5 1 E
