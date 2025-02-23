class Equation {
    constructor(Coefficient, RandomSign, min, max) {
        this.Coefficient = Coefficient;
        this.RandomSign = RandomSign;
        this.min = min;
        this.max = max;

        this.GetCoefficient(min, max);
        this.GetRandomSign();
        this.RoundToDecimals();
    }

    GetCoefficient(min, max) {
      this.Coefficient = Math.floor(Math.random() * (max - min + 1)) + min;
      return this.Coefficient;
    }

    GetRandomSign() {
      this.RandomSign = Math.random() < 0.5 ? '+' : '-';
      return this.RandomSign;
    } 

    RoundToDecimals(num, decimals) {
        const factor = Math.pow(10, decimals);
        return Math.round(num * factor) / factor;
    }
}
