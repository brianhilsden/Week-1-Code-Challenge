const prompt=require('prompt-sync')({sigint:true}); //calls prompt-sync function
const basicSalary=parseInt(prompt("Enter basic salary: ")) //Get basic salary from user
const benefits=parseInt(prompt("Enter benefits: ")) //Get total benefits from user

//The function takes gross salary as parameter and returns nhif deduction amount
function nhifCalculator(grossSalary){
    if(grossSalary>=0 && grossSalary<=5999){
        return 150
    }
    else if(grossSalary>=6000 && grossSalary<=7999){
        return 300
    }
    else if(grossSalary>=8000 && grossSalary<=11999){
        return 400
    }
    else if(grossSalary>=12000 && grossSalary<=14999){
        return 500
    }
    else if(grossSalary>=15000 && grossSalary<=19999){
        return 600
    }
    else if(grossSalary>=20000 && grossSalary<=24999){
        return 750
    }
    else if(grossSalary>=25000 && grossSalary<=29999){
        return 850
    }
    else if(grossSalary>=30000 && grossSalary<=34999){
        return 900
    }
    else if(grossSalary>=35000 && grossSalary<=39999){
        return 950
    }
    else if(grossSalary>=40000 && grossSalary<=44999){
        return 1000
    }
    else if(grossSalary>=45000 && grossSalary<=49999){
        return 1100
    }
    else if(grossSalary>=50000 && grossSalary<=59999){
        return 1200
    }
    else if(grossSalary>=60000 && grossSalary<=69999){
        return 1300
    }
    else if(grossSalary>=70000 && grossSalary<=79999){
        return 1400
    }
    else if(grossSalary>=80000 && grossSalary<=89999){
        return 1500
    }
    else if(grossSalary>=90000 && grossSalary<=99999){
        return 1600
    }
    else{
        return 1700
    }

}

/*Function uses the basic salary,benefits, nhif to calculate various values such as: gross salary, nssf deduction, taxable pay, total tax, PAYE, net salary*/
function netSalaryCalculator(){
    let contributionBenefitTruth=parseInt(prompt("Include contribution benefit? Enter 1 for Yes, 2 for No: "))
    const contributionBenefit=contributionBenefitTruth===1?1080:0; /*Default contribution benefit as per the KRA calculator site*/
    const grossSalary=basicSalary+benefits+contributionBenefit; //Calculate gross salary
    const nhif=nhifCalculator(grossSalary) //Calculate nhif using the nhif function and gross salary
    let nssfInterimValue=0.06*basicSalary; /*Calculate an interim nssf value first to later check if it surpases the nssf limit of 2160 before using it in calculations*/
    
    let nssf; //Declares an nssf variable to be assigned a value after interim value has been checked
    nssfInterimValue>2160?nssf=2160:nssf=nssfInterimValue; //Checks if interim value is above limit 
    const housingLevy=0.015*grossSalary //Calculate housing levy
    let taxablePay;  //Declares taxablePay variable, to use in the conditionals below

    //The prompts let the user choose whether to deduct nhif, nssf or/and housing levy
    let nhifTruth=parseInt(prompt("Deduct NHIF? Enter 1 for Yes, 2 for No: "))
    let nssfTruth=parseInt(prompt("Deduct NSSF? Enter 1 for Yes, 2 for No: "))
    let levyTruth=parseInt(prompt("Deduct Housing levy? Enter 1 for Yes, 2 for No: "))
  
    /*The conditional statements below first check the what the user chose to deduct, then returns taxablePay based on the choices*/
    if(levyTruth===1 && nssfTruth===2 && nhifTruth===2){
        taxablePay=basicSalary-housingLevy
    }
    else if(levyTruth===2 && nssfTruth===1 && nhifTruth===2){
        taxablePay=basicSalary-nssf
    }
    else if(levyTruth===2 && nssfTruth===2 && nhifTruth===1){
        taxablePay=basicSalary-nhif
    }
    else if(levyTruth===1 && nssfTruth===1 && nhifTruth===2){
        taxablePay=basicSalary-(housingLevy+nssf)
    }
    else if(levyTruth===1 && nssfTruth===2 && nhifTruth===1){
        taxablePay=basicSalary-(housingLevy+nhif)
    }
    else if(levyTruth===2 && nssfTruth===1 && nhifTruth===1){
        taxablePay=basicSalary-(nssf+nhif)
    }
    else if(levyTruth===1 && nssfTruth===1 && nhifTruth===1){
        taxablePay=basicSalary-(housingLevy+nhif+nssf)
    }
    else if(levyTruth===2 && nssfTruth===2 && nhifTruth===2){
        taxablePay=basicSalary
    }
    else{
        return "Invalid entry for NHIF, NSSF or Housing levy. Try again"
    }

    /*A variable taxRates is declared to store individual Tax Rates data including full tax for each range*/
    const taxRates=[{min:0,max:24000,rate:0.10,tax:2400},
                    {min:24001,max:32333,rate:0.25,tax:2083.25},
                    {min:32334,max:500000,rate:0.3,tax:140300.1},
                    {min:500001,max:800000,rate:0.325,tax:97500},
                    {min:800001,max:100000000,rate:0.35,tax:200000}]

    let prevTaxes=0; //Stores initial amount of tax
    let totalTax; //Declares totalTax variable, this will store the total tax value 

    /*Loops through the taxRates array to check range in which taxable amount lies, then if it surpases a certain range, the prevTaxes variable in incremented by that previous ranges full tax. Process is repeated until the taxable amount gets to its range. Tax for the amount in this range is then calculated and the value added to the prevTaxes to get the total tax amount*/
    taxRates.forEach((element) => {
        if(element.max<taxablePay){
            prevTaxes+=element.tax
        }
        else if(element.min<=taxablePay && element.max>=taxablePay){
            const taxInRange=(taxablePay-(element.min-1))*element.rate;
            totalTax=taxInRange+prevTaxes    
        }
    } 
    );
    const personalRelief=2400; //Declares default personal relief value of 2400
    const insuranceRelief=0.15*nhif //Calculates insurance relief based on nhif deduction value
    let payeTax; //Declares an unassigned payeTax variable to use in the conditionals below

    //First checks if user chose to deduct NHIF. If yes, then payeTax is calculated including insurance relief. If no, then insurace relief is exluded
    nhifTruth===1?payeTax=totalTax-(personalRelief+insuranceRelief):payeTax=totalTax-(personalRelief)
    
    console.log(`\nYour gross salary is: ${grossSalary}`) //Displays gross salary
    console.log(`Total benefits: ${benefits+contributionBenefit}`) //Displays total benefits

    //The below codes first check if user chose to deduct it before displaying deduction amount
    nhifTruth===1 && console.log(`NHIF deduction is: ${nhif}`) 
    nssfTruth===1 && console.log(`NSSF deduction is: ${nssf}`)
    levyTruth===1 && console.log(`Housing levy deduction is: ${housingLevy}`)
    
    /*The conditional statements first check if user has a PAYE tax, if yes then it is deducted from taxable pay to get net salary.If not then net salary is equated to the taxable pay.Either way, the tax amount and net salary values will be displayed/returned. */
    if(payeTax>0){
        const netSalary=taxablePay-payeTax;
        console.log(`Taxable Pay: ${taxablePay}`) //Display taxable pay
        console.log(`Your PAYE is: ${payeTax}`) //Display PAYE
        console.log(`Total statutory deductions and benefits is: ${grossSalary-netSalary}`)
        
        return(`Your net salary is: ${netSalary}`)
    }
    else{
        const netSalary=taxablePay;
        console.log( "Tax is: 0")
        return (`Your net salary is: ${netSalary}`)
    }
}
console.log(netSalaryCalculator()) //Runs the function and displays gross salary, PAYE, net salary