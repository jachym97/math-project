class QuadraticEquation extends Equation {
    constructor(Coefficient, RandomSign, min, max, Equation, EqSolution, EqSolution2, Sign, Sign2, a, b, c, Solution) {

        super(Coefficient, RandomSign, min, max);
        this.Equation = Equation;
        this.EqSolution = EqSolution;
        this.EqSolution2 = EqSolution2;
        this.Sign = Sign;
        this.Sign2 = Sign2;
        this.a = a;
        this.b = b;
        this.c = c;
        this.Solution = Solution;
    }

    GenerateEquation() { // vygeneruje kvadratickou rovnici
        const variableX = 'x';
        const variableXSquared = 'x²';
        const space = ' ';
        const equalsSign = '=';
        const zero = '0';
        this.Sign  = super.GetRandomSign(); // vygeneruje znaménko + nebo - 
        this.Sign2 = super.GetRandomSign();

        do {
            this.a = super.GetCoefficient(1,10); // vygenerování koeficientů a, b, c
            this.b = super.GetCoefficient(1,10);
            this.c = super.GetCoefficient(1,10);
            }
        while ((Math.pow(this.b, 2) - 4*this.a*this.c) < 0) // chceme pouze reálná řešení, tedy diskriminant >= 0 

        this.Equation = `${this.a}${variableXSquared}${space}${this.Sign}${space}${this.b}${variableX}${space}${this.Sign2}${space}${this.c}${space}${equalsSign}${space}${zero}`;
        return this.Equation;
    }

    SolveEquation() { // vrátí řešení kvadratické rovnice v závislosti na vygenerovaných znaménkách Sign a Sign2
        if (this.Sign === '+' && this.Sign2 === '+') {
            this.EqSolution = ((-this.b + Math.sqrt(Math.pow(this.b, 2) - 4*this.a*this.c)) / (2*this.a));
            this.EqSolution2 = ((-this.b - Math.sqrt(Math.pow(this.b, 2) - 4*this.a*this.c)) / (2*this.a));
        }
        else if (this.Sign === '-' && this.Sign2 === '+') {
            this.EqSolution = ((this.b + Math.sqrt(Math.pow(this.b, 2) - 4*this.a*this.c)) / (2*this.a));
            this.EqSolution2 = ((this.b - Math.sqrt(Math.pow(this.b, 2) - 4*this.a*this.c)) / (2*this.a));
        }
        else if (this.Sign === '+' && this.Sign2 === '-') {
            this.EqSolution = ((-this.b + Math.sqrt(Math.pow(this.b, 2) + 4*this.a*this.c)) / (2*this.a));
            this.EqSolution2 = ((-this.b - Math.sqrt(Math.pow(this.b, 2) + 4*this.a*this.c)) / (2*this.a));
        }
        else {
            this.EqSolution = ((this.b + Math.sqrt(Math.pow(this.b, 2) + 4*this.a*this.c)) / (2*this.a));
            this.EqSolution2 = ((this.b - Math.sqrt(Math.pow(this.b, 2) + 4*this.a*this.c)) / (2*this.a));
        }
        
        return [this.EqSolution, this.EqSolution2]
    }
    
    CompareSolutions() { // porovnáme řešení zadané uživatelem se správným řešením kvadratické rovnice
        this.Solution = this.SolveEquation();
        if (document.getElementById('RoundingCheckbox').checked) { // pokud je zaškrtnutý checkbox, výsledek bude zaoukrouhlen na dvě desetinná místa
            this.Solution[0] = super.RoundToDecimals(this.Solution[0], 2);
            this.Solution[1] = super.RoundToDecimals(this.Solution[1], 2);
         }
        const inputSolution = parseFloat(document.getElementById("QSolution").value);
        const inputSolution2 = parseFloat(document.getElementById("QSolution2").value); 
        if ((inputSolution === this.Solution[0] && inputSolution2 ===  this.Solution[1]) || // pokud se oba vstupy shodují se správným výsledkem rovnice
            (inputSolution === this.Solution[1] && inputSolution2 === this.Solution[0])) {
            document.getElementById("QEqMessage").innerText = "Správné řešení!"; // vypíše se hláška "Správné řešení!"
        } else {
            document.getElementById("QEqMessage").innerText = "Nesprávné řešení!";
        }
    }

    ShowEquation() { // zobrazí vygenerovanou kvadratickou rovnici
        document.getElementById("QgeneratedEq").innerText = this.GenerateEquation();
    }

    ShowSolution() { // zobrazí řešení kvadratické rovnice
        document.getElementById("QEqSolution1").innerText = `Řešení 1: ${this.Solution[0]}`;
        document.getElementById("QEqSolution2").innerText = `Řešení 2: ${this.Solution[1]}`;
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
                EquationType = new QuadraticEquation();
                this.equations[i] = EquationType.GenerateEquation();
                this.solutions[i] = EquationType.SolveEquation();
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
            doc.save('kvadraticke_rovnice.pdf');
    }
}

function getSelectedValue() {
    const selectElement = document.getElementById("AmountSelect");
    const selectedText = selectElement.options[selectElement.selectedIndex].text; 
    return parseInt(selectedText, 10);
  }

document.getElementById("generateQuadraticPDFButton").addEventListener("click", function() {
    const mathTest = new MathTestGenerator(getSelectedValue(), 'Kvadratické rovnice');
    mathTest.GenerateMathTest();
    mathTest.generatePDF();
});

let quadraticEq = new QuadraticEquation();
