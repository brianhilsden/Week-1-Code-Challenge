const prompt=require('prompt-sync')({sigint:true}); //calls prompt-sync function

//Speed detector function
function speedDetector(speed){
    if(speed<=70){
        return "Ok \n"
    }
    else{
        const demeritPoints=(speed-70)/5;
        if(demeritPoints>12){
            return "License suspended \n";
        }
        else{
            return `${demeritPoints} demerit points! \n`;
        }
    }
}

console.log("Welcome to our speed calculator.\n")
let exit=false; //declares exit variable and assigns an initial boolean of false to it
//The while loop continuosly calculates grades until the user choses to exit
while(exit===false){
    console.log("You can exit anytime by entering 800") //Informs user the option to exit
    const speed=parseInt(prompt("Enter the speed: ")) //stores user input as number in marks variable

    //Implements the exit option
    if(speed===800){
        console.log("Thank you for using our service! Goodbye\n")
        exit=true
    }

    //Passes the speed into the speedDetector function and displays the result
    else if(speed>0 && speed<1000000){ //Gave it a speed range so user has to input a number
        console.log(speedDetector(speed))
    }

    //User is informed is speed is not in the speed range or not a number
    else{
        console.log("Kindly ender a valid speed \n")
    }
}
