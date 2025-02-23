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
                EquationType = new LinearEquation();
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

        this.equations.forEach((equation, index) => {
            doc.text(`${index + 1}.) ${equation}`, 10, 20 + (index * 10));
        });   
            doc.save('linearni_rovnice.pdf');
    }
}

function getSelectedValue() {
    const selectElement = document.getElementById("AmountSelect");
    const selectedText = selectElement.options[selectElement.selectedIndex].text; 
    return parseInt(selectedText, 10);
  }

document.getElementById("generateLinearPDFButton").addEventListener("click", function() {
    const mathTest = new MathTestGenerator(getSelectedValue(), 'Lineární rovnice');
    mathTest.GenerateMathTest();
    mathTest.generatePDF();
});

let linEq = new LinearEquation();


