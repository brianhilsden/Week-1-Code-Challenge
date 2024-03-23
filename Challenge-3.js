const prompt=require('prompt-sync')({sigint:true}); //calls prompt-sync function
const basicSalary=parseInt(prompt("Enter basic salary: "))
const benefits=parseInt(prompt("Enter benefits: "))
//Net Salary Calculator function
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
function netSalaryCalculator(){
    let nhifTruth=parseInt(prompt("Deduct NHIF? Enter 1 for Yes, 2 for No: "))
    let nssfTruth=parseInt(prompt("Deduct NSSF? Enter 1 for Yes, 2 for No: "))
    let levyTruth=parseInt(prompt("Deduct Housing levy? Enter 1 for Yes, 2 for No: "))

    const grossSalary=basicSalary+benefits;
    console.log(`\nYour gross salary is ${grossSalary}`)
    const nhif=nhifCalculator(grossSalary)
    const nssf=0.06*basicSalary;
    const housingLevy=0.015*grossSalary
    const contributionBenefit=1080;
    let taxablePay;
    if(levyTruth===1 && nssfTruth===2 && nhifTruth===2){
        taxablePay=basicSalary-(contributionBenefit+housingLevy)
    }
    else if(levyTruth===2 && nssfTruth===1 && nhifTruth===2){
        taxablePay=basicSalary-(contributionBenefit+nssf)
    }
    else if(levyTruth===2 && nssfTruth===2 && nhifTruth===1){
        taxablePay=basicSalary-(contributionBenefit+nhif)
    }
    else if(levyTruth===1 && nssfTruth===1 && nhifTruth===2){
        taxablePay=basicSalary-(contributionBenefit+housingLevy+nssf)
    }
    else if(levyTruth===1 && nssfTruth===2 && nhifTruth===1){
        taxablePay=basicSalary-(contributionBenefit+housingLevy+nhif)
    }
    else if(levyTruth===2 && nssfTruth===1 && nhifTruth===1){
        taxablePay=basicSalary-(contributionBenefit+nssf+nhif)
    }
    else if(levyTruth===1 && nssfTruth===1 && nhifTruth===1){
        taxablePay=basicSalary-(contributionBenefit+housingLevy+nhif+nssf)
    }
    else if(levyTruth===2 && nssfTruth===2 && nhifTruth===2){
        taxablePay=basicSalary-contributionBenefit
    }
    else{
        return "Invalid entry for NHIF, NSSF or Housing levy. Try again"
    }
    
    const salaryRates=[{min:0,max:24000,rate:0.10,tax:2400},{min:24001,max:32333,rate:0.25,tax:2083.25},{min:32334,max:500000,rate:0.3,tax:140300.1},{min:500001,max:800000,rate:0.325,tax:97500},{min:800001,max:100000000,rate:0.35,tax:200000}]

    let prevTaxes=0;
    let totalTax;
    salaryRates.forEach((element) => {
        if(element.max<taxablePay){
            prevTaxes+=element.tax
        }
        else if(element.min<=taxablePay && element.max>=taxablePay){
            const taxInRange=(taxablePay-(element.min-1))*element.rate;
            totalTax=taxInRange+prevTaxes    
        }
    } 
    );
    const personalRelief=2400;
    const insuranceRelief=0.15*nhif
    let payeTax;
    nhifTruth===1?payeTax=totalTax-(personalRelief+insuranceRelief):payeTax=totalTax-(personalRelief)
    
    if(payeTax>0){
        const netSalary=taxablePay-payeTax;
        console.log(`Your PAYE is: ${payeTax}`) 
        return(`Your netSalary is: ${netSalary}`)
    }
    else{
        const netSalary=taxablePay;
        console.log( "Tax is: 0")
        return (`Your netSalary is: ${netSalary}`)
    }
}
console.log(netSalaryCalculator())