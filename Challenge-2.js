const prompt=require('prompt-sync')({sigint:true}); //calls prompt-sync function

//Funtion takes user speed and returns appropriate response depending on the value
function speedDetector(speed){
    //Conditionals to check if speed is above speed limit
    if(speed<=70){ 
        return "Ok \n" 
    }
    else{
        const demeritPoints=(speed-70)/5; //Calculate demerit points based on speed, speed limit,rate

        //Conditionals to check if demerit points are above 12 and return appropriate response
        if(demeritPoints>12){
            return "License suspended \n";
        }
        else{
            return `Points: ${demeritPoints} \n`;
        }
    }
}

console.log("Welcome to our speed calculator.\n") //Welcomes user
let exit=false; //declares exit variable and assigns an initial boolean of false to it

//The while loop continuosly calculates grades until the user choses to exit
while(exit===false){
    console.log("You can exit anytime by entering 800") //Informs user about the option to exit
    const speed=parseInt(prompt("Enter the speed: ")) //Stores user input as integer in a variable

    //Implements the exit option
    if(speed===800){
        console.log("Thank you for using our service! Goodbye\n") //Goodbye message
        exit=true //Alters value of exit variable hence stopping loop/program
    }

    //Passes the speed into the speedDetector function and displays the result
    else if(speed>0 && speed<1000000){ //Speed range so user has to input a number
        console.log(speedDetector(speed))
    }

    //Inform user if speed is not in the speed range or not a number
    else{
        console.log("Kindly ender a valid speed \n")
    }
}
