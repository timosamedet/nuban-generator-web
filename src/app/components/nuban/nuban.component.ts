import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Nuban } from 'src/app/models/nuban';
import { BankService } from 'src/app/services/bank.service';
import { NubanService } from 'src/app/services/nuban.service';

@Component({
  selector: 'app-nuban',
  templateUrl: './nuban.component.html',
  styleUrls: ['./nuban.component.css']
})
export class NubanComponent implements OnInit {
  nubanForm: FormGroup;
  bankCode?: string;
  serialNumber?: string;
  nuban: Nuban = new Nuban();
  bankCodes?: string[];
  nubanList?: Nuban[];

  
  constructor(private nubanService: NubanService, private bankService: BankService) { 
    this.nubanForm = new FormGroup({
      bankCode: new FormControl(null, [Validators.required]),
      serialNumber: new FormControl(null, Validators.required),
    });

  }

  ngOnInit(): void {
    this.getbankCodes();
    this.getAllNubans();
  }

  createNuban(){
    this.bankCode = this.nubanForm.controls.bankCode.value;
    this.serialNumber =  this.nubanForm.controls.serialNumber.value;

    this.nubanService.createNuban(this.bankCode!, this.serialNumber!).subscribe((response)=>{
      this.nuban = response;
      alert('Nuban was created Successfully...')
    })
    this.getAllNubans();
  }

  generateSerialNumber(){
    console.log("hope you are feeling me");
    this.nubanService.generateSerialNumber().subscribe((response)=>{
      this.nubanForm.patchValue({serialNumber: response})
    });
   
  }

  getbankCodes(){
    return this.bankService.getBankCodes().subscribe((response)=>{
      this.bankCodes = response;
      return response;
    })
  }

  getAllNubans(){
   return this.nubanService.getAllNubans().subscribe((response)=>{
     return this.nubanList = response;

    })

  }
}
