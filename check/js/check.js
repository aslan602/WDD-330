//Tax Rates
const FEDTAX = .1294;
const SSTAX  = .062;
const MEDTAX = .0145;
const STTAX  = .027;


//Give starting example figures
let employee = "James Noname";
let fedTPP = 300.00;
let fedYTD = 967.34;
let ssTPP = 132.16;
let ssYTD = 389.89;
let medTPP = 39.63;
let medYTD = 97.79;
let stTPP = 61.49;
let stYTD = 180.72;
let totTPP = fedTPP + ssTPP + medTPP + stTPP;
let totYTD = fedYTD + ssYTD + medYTD + stYTD;
let grosspay = 2101.17;
let netpay = 1567.89;
let grossTPP = grosspay;
let grossYTD = 13567.00;
let netTPP = netpay;
let netYTD = 11931.26;



//Display the information from the starting example
document.getElementById("employee").innerHTML = employee;
document.getElementById("payeename").innerHTML = employee;
document.getElementById("written").innerHTML = "one thousand five hundred and sixty seven and 89/00";
document.getElementById("amount").innerHTML = "$" + netpay.toFixed(2);
document.getElementById("account").innerHTML = "\"\'008173\"\' |:107005047|:905****697*\"\'";
document.getElementById("gross").innerHTML = "$" + grosspay.toFixed(2);
document.getElementById("fedTPP").innerHTML = "$" + fedTPP.toFixed(2);
document.getElementById("fedYTD").innerHTML = "$" + fedYTD.toFixed(2);
document.getElementById("ssTPP").innerHTML = "$" + ssTPP.toFixed(2);
document.getElementById("ssYTD").innerHTML = "$" + ssYTD.toFixed(2);
document.getElementById("medTPP").innerHTML = "$" + medTPP.toFixed(2);
document.getElementById("medYTD").innerHTML = "$" + medYTD.toFixed(2);
document.getElementById("stTPP").innerHTML = "$" + stTPP.toFixed(2);
document.getElementById("stYTD").innerHTML = "$" + stYTD.toFixed(2);
document.getElementById("totTPP").innerHTML = "$" + totTPP.toFixed(2);
document.getElementById("totYTD").innerHTML = "$" + totYTD.toFixed(2);
document.getElementById("grossTPP").innerHTML = "$" + grossTPP.toFixed(2);
document.getElementById("grossYTD").innerHTML = "$" + grossYTD.toFixed(2);
document.getElementById("netTPP").innerHTML = "$" + netTPP.toFixed(2);
document.getElementById("netYTD").innerHTML = "$" + netYTD.toFixed(2);
document.getElementById("hoursmessage").innerHTML = "";
document.getElementById("paymessage").innerHTML = "";



//Event Listener for the calculate button
let x = document.querySelector('#calc');
x.addEventListener('click', calculate);

//Event Listener for the print button
let p = document.querySelector('#butprint');
p.addEventListener('click', checkPrint);

//Start Calculations
function calculate() {
    // Verify the input is good!
    document.getElementById("hoursmessage").innerHTML = "";
    document.getElementById("paymessage").innerHTML = "";
    let hours = document.getElementById("inputhours").value;
    let hourly = document.getElementById("inputpay").value;
    if (hours == "" || hours == null) {
        hourmessage = "There were no hours entered. Please enter some hours.";
        document.getElementById("hoursmessage").innerHTML = hourmessage;
        return;
    }
    if (hours > 120) {
        hourmessage = "There are too many hours entered. Please enter less hours, and give your employee a break!";
        document.getElementById("hoursmessage").innerHTML = hourmessage;
        return;
    }
    if (hours < 1) {
        hourmessage = "The hours entered are too low. Hours need to be greater than 0.";
        document.getElementById("hoursmessage").innerHTML = hourmessage;
        return;
    }
    if (isNaN(hours)) {
        hourmessage = "That is NOT a number.  Please enter a number.";
        document.getElementById("hoursmessage").innerHTML = hourmessage;
        return;
    }
    if (hourly == "" || hourly == null) {
        paymessage = "There is no pay entered.  Pay your employees something!";
        document.getElementById("paymessage").innerHTML = paymessage;
        return;
    } 
    if (hourly < 12) {
        paymessage = "Pay cant be lower then minimum wage.  please enter a greater wage.";
        document.getElementById("paymessage").innerHTML = paymessage;
        return;
    } 
    if (isNaN(hourly)) {
        paymessage = "That is NOT a number.  Please enter a number.";
        document.getElementById("paymessage").innerHTML = paymessage;
        return;
    }

    //Get this pay periods figures
    grossTPP = hours * hourly;
    grosspay = grossTPP;
    document.getElementById("grossTPP").innerHTML = "$" + grossTPP.toFixed(2);
    document.getElementById("gross").innerHTML = "$" + grosspay.toFixed(2);

    fedTPP = getFedTax(grosspay);
    ssTPP  = getSSTax(grosspay);
    medTPP = getMedTax(grosspay);
    stTPP  = getSTTax(grosspay);
    totTPP = fedTPP + ssTPP + medTPP + stTPP;
    netTPP = grosspay - totTPP;
    netpay = netTPP;

   

    //Get the Year To Data figures from localstorage
    //There are 6 figures from localstorage.  They are in this order:
    // 1. Gross Pay (storedGP)
    // 2. Net Pay (storedNP)
    // 3. Federal Tax paid to date (storedFED)
    // 4. Social Security paid to data (storedSS)
    // 5. Medicare paid to date (storedMED)
    // 6. State Taxes (Arizona) paid to date (storedST)
    let storedGP = 0;
    let storedNP = 0;
    let storedFED = 0;
    let storedSS = 0;
    let storedMED = 0;
    let storedST = 0;
    let storageData = localStorage.getItem("YTD");
    if (storageData == null || storageData == "") {
        console.log("No data retrieved from localstorage.");
    }
    else {
    let data = JSON.parse(storageData);
        storedGP    = data.storedGP;
        storedNP    = data.storedNP;
        storedFED   = data.storedFED;
        storedSS    = data.storedSS;
        storedMED   = data.storedMED;
        storedST    = data.storedST;
    }

    grossYTD    = storedGP  + grossTPP;
    netYTD      = storedNP  + netTPP;
    fedYTD      = storedFED + fedTPP;
    ssYTD       = storedSS  + ssTPP;
    medYTD      = storedMED + medTPP;
    stYTD       = storedST  + stTPP;
    totYTD      = fedYTD + ssYTD + medYTD + stYTD;

    //Save the new figures in localstorage
    let saveData = {storedGP:grossYTD,
                    storedNP:netYTD,
                    storedFED:fedYTD,
                    storedSS:ssYTD,
                    storedMED:medYTD,
                    storedST:stYTD};
    let setData = JSON.stringify(saveData);
    localStorage.setItem('YTD', setData);

    //Put the net amount into words
    let wordsum = numberToWords(netpay);
    let dec = getDecimal(netpay);
    wordsum += " and " + dec + "/00";

    //Its now time to display all the information 
    document.getElementById("amount").innerHTML = "$" + netpay.toFixed(2); 
    document.getElementById("fedTPP").innerHTML = "$" + fedTPP.toFixed(2);
    document.getElementById("fedYTD").innerHTML = "$" + fedYTD.toFixed(2);
    document.getElementById("ssTPP").innerHTML = "$" + ssTPP.toFixed(2);
    document.getElementById("ssYTD").innerHTML = "$" + ssYTD.toFixed(2);
    document.getElementById("medTPP").innerHTML = "$" + medTPP.toFixed(2);
    document.getElementById("medYTD").innerHTML = "$" + medYTD.toFixed(2);
    document.getElementById("stTPP").innerHTML = "$" + stTPP.toFixed(2);
    document.getElementById("stYTD").innerHTML = "$" + stYTD.toFixed(2);
    document.getElementById("totTPP").innerHTML = "$" + totTPP.toFixed(2);
    document.getElementById("totYTD").innerHTML = "$" + totYTD.toFixed(2);    
    document.getElementById("grossYTD").innerHTML = "$" + grossYTD.toFixed(2);
    document.getElementById("netTPP").innerHTML = "$" + netTPP.toFixed(2);
    document.getElementById("netYTD").innerHTML = "$" + netYTD.toFixed(2);
    document.getElementById("written").innerHTML = wordsum;
    return;
};

function getFedTax(pay) {
    return pay * FEDTAX;       
};

function getSSTax(pay) {
    return pay * SSTAX;
};

function getMedTax(pay) {
    return pay * MEDTAX;
};

function getSTTax(pay) {
    return pay * STTAX;
};

function Number(num) {
    this.num = num;
};

//Returns the words of the number part needed to write a check
//This code was modified from the original version at https://stackoverflow.com/questions/554314/how-can-i-convert-an-integer-into-its-verbal-representation
function numberToWords(num) {
    var unitsMap = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
    var tensMap = ["zero", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

    //var num = this.valueOf();
    if (Math.round(num == 0)) {
        return "zero";
    }
    if (num < 0) {
        var positivenum = Math.abs(num);
        return "minus " + numberToWords(positivenum);
    }
    var words = "";
    if (Math.floor(num / 1000000) > 0) {
        words += numberToWords(Math.floor(num / 1000000)) + " million ";
        num = Math.floor(num % 1000000);
    }
    if (Math.floor(num / 1000) > 0) {
        words += numberToWords(Math.floor(num / 1000)) + " thousand ";
        num = Math.floor(num % 1000);
    }
    if (Math.floor(num / 100) > 0) {
        words += numberToWords(Math.floor(num / 100)) + " hundred ";
        num = Math.floor(num % 100);
    }
    if (Math.floor(num > 0)) {
        if (words != "") {
            words += "and ";
        }
        if (num < 20) {
        words += unitsMap[num];
        }
        else {
            words += tensMap[Math.floor(num / 10)];
            if ((num % 10) > 0) {
                words += "-" + unitsMap[Math.round(num % 10)];
            }
        }
    }    
    return words.trim();
};

// Returns the decimal value of the amount of the check
function getDecimal(num) {
    num = num.toFixed(2);    
    var radixPos = String(num).indexOf('.');
    var value = String(num).slice(radixPos + 1);
    value = Math.round(value);
    return value;
}

function checkPrint() {    
    window.print();
}









