class SystemOfLinearEquation extends LinearEquation {
    constructor(Coefficient, RandomSign, min, max, A1, A2, B1, B2, C1, C2, Solution1, Solution2, Solutions) {
        super(Coefficient, RandomSign, min, max);
        this.equation1 = new LinearEquation();
        this.equation2 = new LinearEquation();
        this.A1 = A1;
        this.A2 = A2;
        this.B1 = B1;
        this.B2 = B2;
        this.C1 = C1;
        this.C2 = C2;
        this.Solution1 = Solution1;
        this.Solution2 = Solution2;
        this.Solutions = Solutions;
    }
    GenerateSystemOfEquations() {
        do {
        const space = ' ';
        let RandSign = this.equation1.GetRandomSign();
        let RandSign2 = this.equation2.GetRandomSign();
        this.B1 = this.equation1.GetCoefficient(1, 10);
        this.B2 = this.equation2.GetCoefficient(1, 10);
        this.equation1.GenerateEquation();
        this.equation2.GenerateEquation();
        this.equation1.Equation += ` ${RandSign}${space}${this.B1}y`;
        this.equation2.Equation += ` ${RandSign2}${space}${this.B2}y`;
        this.A1 = this.equation1.a;
        this.A2 = this.equation2.a;
   // C1 = ;
   if (this.equation1.Sign === '+' && this.equation1.Sign2 === '+') {
       this.C1 = this.equation1.b - this.equation1.c;
   }
   else if (this.equation1.Sign === '+' && this.equation1.Sign2 === '-')
   {
       this.C1 = this.equation1.b + this.equation1.c;
   }
   else if (this.equation1.Sign === '-' && this.equation1.Sign2 === '+')
   {
       this.C1 = -this.equation1.b - this.equation1.c;
   }
   else
   {
       this.C1 = -this.equation1.b + this.equation1.c;
   }
   // C2 = ;

   if (this.equation2.Sign === '+' && this.equation2.Sign2 === '+') {
    this.C2 = this.equation2.b - this.equation2.c;
}
else if (this.equation2.Sign === '+' && this.equation2.Sign2 === '-')
{
    this.C2 = this.equation2.b + this.equation2.c;
}
else if (this.equation2.Sign === '-' && this.equation2.Sign2 === '+')
{
    this.C2 = -this.equation2.b - this.equation2.c;
}
else
{
    this.C2 = -this.equation2.b + this.equation2.c;
}

if (RandSign === '+') {
    this.B1 = -this.B1;
}

if (RandSign2 === '+') {
    this.B2 = -this.B2;
}

} while ((this.A1*this.B2 === this.A2*this.B1)) // aby měla soustava řešení

       return [this.equation1.Equation, this.equation2.Equation];
    }

SolveSystemOfEquation() {
    this.Solution1 = (this.B1*this.C2 - this.B2*this.C1)/(this.A1*this.B2 - this.A2*this.B1);
    this.Solution2 = (this.A2*this.C1 - this.A1*this.C2)/(this.A1*this.B2 - this.A2*this.B1);
    return [this.Solution1, this.Solution2];
}

CompareSolutions() {
    this.Solutions = this.SolveSystemOfEquation();
    if (document.getElementById('RoundingCheckbox').checked) {
        this.Solutions[0] = super.RoundToDecimals(this.Solutions[0], 2);
        this.Solutions[1] = super.RoundToDecimals(this.Solutions[1], 2);
     }
    const inputSolution = parseFloat(document.getElementById("SystemOfSolution").value);
    const inputSolution2 = parseFloat(document.getElementById("SystemOfSolution2").value); 
    if ((inputSolution === this.Solutions[0] && inputSolution2 === this.Solutions[1]) || 
        (inputSolution === this.Solutions[1] && inputSolution2 === this.Solutions[0])) {
        document.getElementById("SystemOfEqMessage").innerText = "Správné řešení!";
    } else {
        document.getElementById("SystemOfEqMessage").innerText = "Nesprávné řešení!";
    }
}

    ShowEquations() {
        const equations = this.GenerateSystemOfEquations();
        document.getElementById("generatedSysLinEq").innerText = `${equations[0]}; ${equations[1]}`;
    }

    ShowSolution() {
        document.getElementById("SystemOfEqSolution1").innerText = `Řešení 1: ${this.Solutions[0]}`;
        document.getElementById("SystemOfEqSolution2").innerText = `Řešení 2: ${this.Solutions[1]}`;
    }

    GetCoefficients() {
        return [this.A1, this.A2, this.B1, this.B2, this.C1, this.C2];
    }
}

class MathTestGenerator {
    constructor(amountOfMathProblems, eqType) {
        this.amountOfMathProblems = amountOfMathProblems;
        this.eqType = eqType;
        this.equations = [];
        this.solutions = [];
    }

    GenerateMathTest() {
        let EquationType;
        for (let i = 0; i < this.amountOfMathProblems; i++) {
                EquationType = new SystemOfLinearEquation();
                this.equations[i] = EquationType.GenerateSystemOfEquations();
                this.solutions[i] = EquationType.SolveSystemOfEquation();

        }
        return [this.equations, this.solutions];
    }

    generatePDF() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.setFontSize(14);
        doc.text(`${this.eqType}`, 10, 10);
        doc.setFont("times");

        // Přidání rovnic do PDF
        this.equations.forEach((equation, index) => {
            doc.text(`${index + 1}.) ${equation}`, 10, 20 + (index * 10));
        });   
            doc.save('soustavy_rovnic.pdf');
    }
}

function getSelectedValue() {
    const selectElement = document.getElementById("AmountSelect");
    const selectedText = selectElement.options[selectElement.selectedIndex].text; 
    return parseInt(selectedText, 10);
  }

document.getElementById("generateSystemPDFButton").addEventListener("click", function() {
    const mathTest = new MathTestGenerator(getSelectedValue(), 'Soustavy lineárních rovnic');
    mathTest.GenerateMathTest();
    mathTest.generatePDF();
    });

let sysLinEq = new SystemOfLinearEquation();
