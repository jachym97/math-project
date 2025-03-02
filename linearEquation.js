class LinearEquation extends Equation {
    constructor(Coefficient, RandomSign, min, max, Solution, Equation, EqSolution, Sign, Sign2, a, b, c) {

        super(Coefficient, RandomSign, min, max);
        this.Solution = Solution;
        this.Equation = Equation;
        this.EqSolution = EqSolution;
        this.Sign = Sign;
        this.Sign2 = Sign2;
        this.a = a;
        this.b = b;
        this.c = c;
    }

    GenerateEquation() { // vygeneruje lineární rovnici
        const variableX = 'x';
        const space = ' ';
        const equalsSign = '=';
        this.Sign  = super.GetRandomSign(); // náhodná znaménka do rovnice
        this.Sign2 = super.GetRandomSign(); 
        this.a = super.GetCoefficient(1,10); // náhodné koeficienty do rovnice
        this.b = super.GetCoefficient(1,10);
        this.c = super.GetCoefficient(1,10);
    
        if (this.Sign2 === '-') {
        this.Equation = `${this.a}${variableX}${space}${this.Sign}${space}${this.b}${space}${equalsSign}${space}${this.Sign2}${this.c}`;
        }
        else
        {
        this.Equation = `${this.a}${variableX}${space}${this.Sign}${space}${this.b}${space}${equalsSign}${space}${this.c}`;
        }
        return this.Equation;
    }

    SolveEquation() { // vrátí řešení rovnice v závislosti na dvojici vygenerovaných znamének 
        if (this.Sign === '+' && this.Sign2 === '+') {
            this.EqSolution = (this.c - this.b) / this.a;
        } 
        else if (this.Sign === '-' && this.Sign2 === '+') {
            this.EqSolution = (this.c + this.b) / this.a;
        }
        else if (this.Sign === '+' && this.Sign2 === '-') {
            this.EqSolution = (-this.c - this.b) / this.a;
        }
        else {
            this.EqSolution = (-this.c + this.b) / this.a;
        }

        return this.EqSolution;
    }

    CompareSolutions() { // porovná výsledek zadaný uživatelem se správným výsledkem rovnice
        const inputSolution = parseFloat(document.getElementById("LinSolution").value);
        this.Solution = this.SolveEquation();
        
        if (document.getElementById('RoundingCheckbox').checked) { // pokud je zaškrtnutý checkbox, tak se výsledek zaokrouhlí na dvě desetinná čísla
           this.Solution = super.RoundToDecimals(this.Solution, 2);
        }
        if (inputSolution === this.Solution) { // pokud se hodnota zadaná uživatelem rovná řešení rovnice
            document.getElementById("LinEqMessage").innerText = "Správné řešení!";
        } else {
            document.getElementById("LinEqMessage").innerText = "Nesprávné řešení!";
        }
    }

    ShowEquation() { // zobrazí rovnici
        document.getElementById("generatedLinEq").innerText = this.GenerateEquation();
    }

    ShowSolution() { // zobrazí řešení rovnice
        document.getElementById("LinEqSolution").innerText = "Řešení: " + this.Solution;
    }
}
