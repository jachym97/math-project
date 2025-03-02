class CanvasDrawer {
    constructor(canvasId, RandomNum, CoordinateA, CoordinateB, CoordinateC, MaxValueOfCoordinate) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.RandomNum = RandomNum;
        this.CoordinateA = CoordinateA;
        this.CoordinateB = CoordinateB;
        this.CoordinateC = CoordinateC;
        this.MaxValueOfCoordinate = MaxValueOfCoordinate;
        this.MaxValueOfCoordinate = 5;

        this.ctx.fillStyle = 'yellow';
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 5;
        

        this.DrawBackground();
        this.DrawAxes();
        this.DrawText();
        this.GetRandomNumber();
        this.DrawTriangle();
        this.WriteNumbersOnAxes();
        this.CalculateAreaOfTriangle();
    }

    DrawBackground() { // vykreslení pozadí kartézské soustavy souřadnic
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.strokeRect(0, 0, this.width, this.height);
    }

    DrawAxes() { // vykreslení os x a y
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 2;

        this.ctx.beginPath();
        this.ctx.moveTo(20, this.height / 2);
        this.ctx.lineTo(this.width - 20, this.height / 2);
        this.ctx.moveTo(this.width / 2, 20);
        this.ctx.lineTo(this.width / 2, this.height - 20);
        this.ctx.stroke();
    }

    DrawText() { // vykreslení popisu soustavy - os a počátku
        this.ctx.font = '18px Arial';
        this.ctx.fillStyle = 'black';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        this.ctx.fillText('O', this.width / 2 + 10, this.height / 2 + 12);
        this.ctx.fillText('y', this.width / 2 - 10, 29);
        this.ctx.fillText('x', this.width - 29, this.height / 2 - 10);
    }

    GetRandomNumber(number) { // vrátí náhodné celé číslo (maximálně [number]) 
        this.RandomNum = Math.floor(Math.random() * number) + 1;
        return this.RandomNum;
    }

    DrawTriangle() { // vykreslení pravoúhlého trojúhelníku
        this.ctx.strokeStyle = 'red';
        this.ctx.lineWidth = 3;
    
    do {
        this.CoordinateA = this.GetRandomNumber(this.MaxValueOfCoordinate)*((this.width - 40)/(this.MaxValueOfCoordinate*2)) + 20;
        this.CoordinateB = this.GetRandomNumber(this.MaxValueOfCoordinate)*((this.width - 40)/(this.MaxValueOfCoordinate*2)) + this.width/2;

        do {
        this.CoordinateC = this.GetRandomNumber(this.MaxValueOfCoordinate)*((this.height - 40)/(this.MaxValueOfCoordinate*2));
        }
        while
          (this.CoordinateC === this.height / 2)
    } 
    while
        (this.CoordinateA >= this.CoordinateB); // aby součet délek dvou stran trojúhelníku byl větší než délka strany třetí


        this.ctx.beginPath();
        this.ctx.moveTo(this.CoordinateA, this.height / 2);
        this.ctx.lineTo(this.CoordinateA, this.height / 2 - this.CoordinateC);
        this.ctx.moveTo(this.CoordinateA, this.height / 2 - this.CoordinateC);
        this.ctx.lineTo(this.CoordinateB, this.height / 2);
        this.ctx.moveTo(this.CoordinateB, this.height / 2);
        this.ctx.lineTo(this.CoordinateA, this.height / 2);
        this.ctx.stroke();
    }

    CalculateAreaOfTriangle() { // vrátí číselnou hodnotu - plochu trojúhelníku
        let Area;
        Area = (this.CoordinateB - this.CoordinateA)*this.CoordinateC/(((this.width - 40)/(this.MaxValueOfCoordinate*2))**2*2);
        return Area;
    }

    ShowValueOfCalculatedArea(Area) { // zobrazí číselnou hodnotu - plochu trojúhelníku
        document.getElementById("AreaOfTriangle").innerText = "Plocha: " + Area + " cm²";
    }

    WriteNumbersOnAxes() { // vykreslení popisu os x a y (-5, -4,..., 0,..., 4, 5)
        let i;
     //   this.MaxValueOfCoordinate = 5;
        
        this.ctx.font = '18px Arial';
        this.ctx.fillStyle = 'black';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        for (i = 1; i <= this.MaxValueOfCoordinate; i++) {
            this.ctx.fillText((-(this.MaxValueOfCoordinate + 1 - i)).toString(), 20 + (i - 1)*(this.width - 40)/(this.MaxValueOfCoordinate*2) + 12, this.height / 2 + 12);
            this.ctx.fillText('|', 20 + (i - 1)*(this.width - 40)/(this.MaxValueOfCoordinate*2), this.height / 2);
        } // záporné hodnoty x

        for (i = 1; i <= this.MaxValueOfCoordinate; i++) {
            this.ctx.fillText(i.toString(), this.width/2 + i*(this.width - 40)/(this.MaxValueOfCoordinate*2) - 12, this.height / 2 + 12);
            this.ctx.fillText('|', this.width/2 + i*(this.width - 40)/(this.MaxValueOfCoordinate*2), this.height / 2);
        } // kladné hodnoty x
        
        for (i = 1; i <= this.MaxValueOfCoordinate; i++) {
            this.ctx.fillText(-i.toString(), this.height / 2 + 12, this.width/2 + i*(this.width - 40)/(this.MaxValueOfCoordinate*2) - 12);
            this.ctx.fillText('—', this.height / 2, this.width/2 + i*(this.width - 40)/(this.MaxValueOfCoordinate*2));
        } // záporné hodnoty y

        for (i = 1; i <= this.MaxValueOfCoordinate; i++) {
            this.ctx.fillText(((this.MaxValueOfCoordinate + 1 - i)).toString(), this.height / 2 + 12, 20 + (i - 1)*(this.width - 40)/(this.MaxValueOfCoordinate*2) + 12);
            this.ctx.fillText('—', this.height / 2, 20 + (i - 1)*(this.width - 40)/(this.MaxValueOfCoordinate*2));
        } // kladné hodnoty y  
    }
}
const canvasDrawer = new CanvasDrawer('EqCanvas');
