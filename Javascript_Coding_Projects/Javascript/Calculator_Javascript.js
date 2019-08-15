//create object to keep track of values
const Calculator = {
    //this displays 0 on screen
    Display_Value: "0",
    // hold first operand for expressions, set to null for now
    First_Operand: null,
    //checks if second operand has been input
    Wait_Second_Operand: false,
    //hold operator, set null for now
    operator: null,
}

//modifies falues each time button is clicked
function Input_Digit(digit) {
    const { Display_Value, Wait_Second_Operand } = Calculator;
    //wait to see if Wait_Second_Operand is true and set Display_Value
    //to clicked key
    if (Wait_Second_Operand === true) {
        Calculator.Display_Value = digit;
        Calculator.Wait_Second_Operand = false;
    } else {
    //overwrites display value if current value is 0
    //otherwise adds on to it
    Calculator.Display_Value = Display_Value === "0" ? digit : Display_Value + digit;
    }
}

//handles decimal points
function Input_Decimal(dot) {
    //prevents accidental clicking of decimal point wont cause bugs
    if (Calculator.Wait_Second_Operand === true) return;
    if (!Calculator.Display_Value.includes(dot)) {
        //if display_value does not contain decimal point taht it needs to add it
        Calculator.Display_Value += dot;
    }
}

//this section handles operators
function Handle_Operator(Next_Operator) {
    const { First_Operand, Display_Value, operator } = Calculator
    //stores pressed keys as numbers
    const Value_of_Input = parseFloat(Display_Value);
    //checks if operator exists and if Wait_Second_Operand is true
    //then updates operator and exits function
    if (operator && Calculator.Wait_Second_Operand) {
        Calculator.operator = Next_Operator;
        return;
    }
    if (First_Operand == null) {
        Calculator.First_Operand = Value_of_Input;
    } else if (operator) { //checks if operator already exists
        const Value_Now = First_Operand || 0;
        //if operator already exisits, property lookup is performed 
        //and the function that matches is executed
        const result = Perform_Calculation[operator] (Value_Now, Value_of_Input);

        Calculator.Display_Value = String(result);
        Calculator.First_Operand = result;
    }
    Calculator.Wait_Second_Operand = true;
    Calculator.operator = Next_Operator;
}

const Perform_Calculation = {
    "/": (First_Operand, Second_Operand) => First_Operand / Second_Operand,
    "*": (First_Operand, Second_Operand) => First_Operand * Second_Operand,
    "-": (First_Operand, Second_Operand) => First_Operand - Second_Operand,
    "+": (First_Operand, Second_Operand) => First_Operand + Second_Operand,
    "=": (First_Operand, Second_Operand) => Second_Operand
};

function Calculator_Reset() {
    Calculator.Display_Value = "0";
    Calculator.First_Operand = null;
    Calculator.Wait_Second_Operand = false;
    Calculator.operator = null;
}

//updates screen with contents of Display_Value
function Update_Display() {
    const display = document.querySelector(".calculator-screen");
    display.value = Calculator.Display_Value;
}

Update_Display();
//this section monitors button clicks
const keys = document.querySelector(".calculator-keys");
keys.addEventListener("click", (event) => {
    const { target } = event;
    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains("operator")) {
        Handle_Operator(target.value);
        Update_Display();
        return;
    }

    if (target.classList.contains("decimal")) {
        Input_Decimal(target.value) ;
        Update_Display();
        return;
    }
    // ensures taht AC clears numbers
    if (target.classList.contains("all-clear")) {
        Calculator_Reset();
        Update_Display();
        return;
    }

    Input_Digit(target.value);
    Update_Display();
})