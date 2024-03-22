const prompt=require('prompt-sync')({sigint:true}); //Calls prompt-sync function

//Function to return the grade based on marks
function gradeCalculator(marks){
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

console.log("Welcome to our grade calculator.\n")
let exit=false; //declares exit variable and assigns an initial boolean of false to it

//The while loop continuosly calculates grades until the user choses to exit
while(exit===false){
    console.log("You can exit at any time by entering 200 ") //Informs user the option to exit
    const marks=parseInt(prompt("Enter your marks: "))//stores user input as number in marks variable
   
    //Implements the exit option
    if(marks===200){  
        console.log("\n   Thank you for using our calculator! Goodbye.")
        exit=true    //If user input is 200, the loop is stopped
    }

    //Checks if marks are in the allowed range, passes them into gradeCalculator and displays grade
    else if(marks>=0 && marks<=100){
        const grade=gradeCalculator(parseInt(marks)) 
        console.log(`Your grade is: ${grade} \n`)    
    }

    //If number is not in allowed range, informs the user
    else{
        console.log("Invalid entry. Marks should be between 0 and 100 \n")
    }
}
