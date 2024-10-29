import { Component } from '@angular/core';

@Component({
  selector: 'app-coin-recharge',
  templateUrl: './coin-recharge.component.html',
  styleUrl: './coin-recharge.component.css'
})
export class CoinRechargeComponent {
  coins = [
    { amount: 50, price: 35 },
    { amount: 50, price: 80 },
    { amount: 50, price: 160 },
    { amount: 50, price: 320 },
    { amount: 50, price: 640 },
    { amount: 50, price: 1280 },
    { amount: 50, price: 2560 },
  ];
}
