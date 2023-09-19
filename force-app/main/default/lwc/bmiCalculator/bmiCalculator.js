import { LightningElement } from 'lwc';

export default class BmiCalculator extends LightningElement {

    height = '';
    weight = '';
    bmiValue = '';
    result = '';
    submitHandler(event) {
        event.preventDefault();
        this.height = this.refs.height.value;
        this.weight = this.refs.weight.value;
        this.calculate();
    }

    calculate() {
        let height = Number(this.height) / 100;
        let BMI = Number(this.weight) / (height * height);
        this.bmiValue = Number(BMI.toFixed(2));
        if (this.bmiValue < 18.5) {
            this.result = 'Underweight';
        } else if (this.bmiValue >= 18.5 && this.bmiValue < 25) {
            this.result = 'Healthy';
        } else if (this.bmiValue >= 25 && this.bmiValue < 30) {
            this.result = 'Overweight';
        } else {
            this.result = 'Obese';
        }
        console.log(`BMI Value is ${this.bmiValue} and result is ${this.result}`);
    }
    reCalculateBMI() {
        this.height = '';
        this.weight = '';
        this.bmiValue = '';
        this.result = '';
    }
}