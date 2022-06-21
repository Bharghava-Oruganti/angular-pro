import { Component, OnInit } from '@angular/core';
import {Users}  from './Users'
import { FormControl, Validators,FormGroup, FormBuilder, ValidationErrors, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public username: string = "";
  public password: string = "";
  public auth: boolean = true;
  public cpassword: string = "";
  public isExists: boolean = false;
  public crctPass: boolean = false;
 // public hide: boolean = true;
  
  lform: FormGroup;
  sform: FormGroup;

  userList: Users[]

  
 

  constructor(private fb: FormBuilder) { }
  
  public static matchValues(
    matchTo: string // name of the control to match to
  ): (arg0: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&                                       // Custom Function to validate Passwords 
        !!control.parent.value &&
        control.value === control.parent.controls[matchTo].value
        ? null
        : { isMatching: false };
    };
  }

  ngOnInit(): void {

    this.lform = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(4)]],
      password : ['',[Validators.required, Validators.minLength(8)]]
    })
    
    this.sform = this.fb.group({
      newUserName: ['', [Validators.required, Validators.minLength(4)]],
      newUserPassword: ['', [Validators.required, Validators.minLength(8)]],
      newCUserPassword: ['',[Validators.required, SignUpComponent.matchValues('newUserPassword')]]
    })


    this.userList = [
      {
        userName: 'bharghav',
        password: 'bharghav',
        isLogged: false,
      },
      {
        userName: "admin",
        password: "test@123",
        isLogged: false,
      },
      {
        userName: "captainlevi",
        password: "levi1234",
        isLogged: false,
      }
    ];
  }

  

  submit() {
    
  }

  login(): void {
        
    //alert("Welcome back!" + this.username);
    //console.log(this.username);
    console.log(this.lform.value)
    this.username = this.lform.value.userName;
    this.password = this.lform.value.password;
    console.log(this.username, this.password);
    
    this.userList.map((v) => {
      if (v.userName === this.username && v.password === this.password) {
        this.crctPass = true;
        v.isLogged = true;
        console.log(v);
        this.auth = false;
      }
    })
    if (this.auth) {
      alert("WRONG CREDIANTIALS!");
      //window.location.reload();
    }
    
  }

  signup(): void{
    // console.log(this.cpassword)
    this.username = this.sform.value.newUserName;
    this.password = this.sform.value.newUserPassword;
    this.cpassword = this.sform.value.newCUserPassword;

    console.log(this.username,this.password,this.cpassword);

    this.userList.map((v) => {
      if (v.userName == this.username)
        this.isExists = true
        
    })
    console.log(this.isExists)
    console.log(this.userList)


    if (!this.isExists) {
      this.addUser();
    }
    else {
      this.isExists = false;
      alert("User Already Exists!!");
      //window.location.reload();
    }
      
  }
 

  addUser(): void{
    var obj = {
      userName: this.username,
      password: this.password,
      isLogged: false
    }

    this.userList = [...this.userList, obj];
    this.username = "";
    this.password = "";
    this.cpassword = "";

    console.log(this.userList);
    alert("User Successfully Registered!");
    this.isExists = false;
  }
  
  

  


}
