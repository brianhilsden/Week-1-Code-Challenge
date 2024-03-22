const prompt=require('prompt-sync')({sigint:true}); //Calls prompt-sync function

/*Function takes user input and returns grade*/
function gradeCalculator(marks){
    //Conditionals to check range in which marks lies, then returns grade
    if(marks>79){
        return "A"
    }
    else if(marks>59 && marks<80){
        return "B"
    }
    else if(marks>49 && marks<60){
        return "C"
    }
    else if(marks>39 && marks<50){
        return "D"
    }
    else{
        return "E"
    }
}

console.log("Welcome to our grade calculator.\n") //Welcome the user
let exit=false; //Declares exit variable and assigns an initial boolean of false to it

//The while loop continuosly calculates grades until the user choses to exit
while(exit===false){
    console.log("You can exit at any time by entering 200 ") //Informs user the option to exit
    const marks=parseInt(prompt("Enter your marks: "))//Stores user input as integer in a variable
   
    //Implements the exit option
    if(marks===200){  
        console.log("\n   Thank you for using our calculator! Goodbye.") //Goodbye message
        exit=true    //Alters exit variable hence stopping the loop/program
    }

    //Checks if marks are in the allowed range, passes them into gradeCalculator and displays grade
    else if(marks>=0 && marks<=100){
        const grade=gradeCalculator(marks) 
        console.log(`Your grade is: ${grade} \n`)    
    }

    //Informs the user if number is not in allowed range
    else{
        console.log("Invalid entry. Marks should be between 0 and 100 \n")
    }
}
