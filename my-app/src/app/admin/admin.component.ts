import { CreateEvent } from './../interfaces/event.interface';
import { EventService } from './../event/event.service';
import { CreateInternational } from './../interfaces/international.interface';
import { RegisterService } from './../register/register.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../profile/profile.service';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CreateUser } from '../interfaces/user.interface';
import { CreateRoom } from '../interfaces/rooms.interface';
import { CreateNews } from '../interfaces/news.interface';
import { RoomsService } from '../rooms/rooms.service';
import { StartService } from '../start/start.service';
import { InternationalService } from '../international/international.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
    private profileService: ProfileService,
    private eventService: EventService,
    private internationalService: InternationalService,
    private newsService: StartService,
    private roomService: RoomsService,
    private registerService: RegisterService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  createForm: FormGroup;

  title = "Admin Panel"
  successMsg = ""
  userName = "Admin";
  toCreate = [ "", "Event", "International Office", "News", "Room", "User" ]
  displayEvent = false;
  displayInternationalOffice = false;
  displayNews = false;
  displayRoom = false;
  displayUser = false;
  rooms = []

  get formControls() { return this.createForm.controls; }

  ngOnInit(): void { }

  getRoomsFromDb(): void {
    this.roomService.getFreeRooms().subscribe({
      next: data => {
        this.rooms = data['result'];
      },
      error: error => {
        if(error['statusText'] == "Not Found") {
          this.successMsg = "Please Create Room First"
        } else {
          this.successMsg = "No Room Found"
        }
      }
    });
  }

  redirectTo(url: string): void {
    console.log()
    this.router.navigate(['/' + url]);
  }
  
  logout(): void {
    this.profileService.logoutUser().subscribe({
      next: data => {
        localStorage.removeItem('access_token');
        this.router.navigate(['/login'], { state: { message: data['message'] } });
      },
      error: error => {
        if(error['statusText'] == "Not Found") {
          this.successMsg = "Cannot Logout"
        } else {
          this.successMsg = "Cannot Logout"
        }
      }
    });
  }

  profile(): void {
    this.router.navigateByUrl('/profile');
  }

  isInput(name: string): Boolean {
    return (name != "" && name != null && name != undefined) ? true : false
  }

  isEmail(email: string): Boolean {
    var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regexp.test(email)
  }

  isPassword(pass1: string, pass2: string): Boolean {
    return pass1 === pass2 && pass1.length >= 6 && pass2.length >= 6
  }

  isUrl(url: string): Boolean {
    var regexp = new RegExp(/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/);
    return regexp.test(url)
  }

  isNumber(number: Number): Boolean {
    return (number > 0) ? true : false
  }

  displayForm(create: string): void {
    if(create !== "") {
      this.successMsg = create + " Selected"
    }
    var toCreateIndex: Number = this.toCreate.indexOf(create)
    switch (toCreateIndex) {
      case 0: {
        this.displayEvent = false;
        this.displayInternationalOffice = false;
        this.displayNews = false;
        this.displayRoom = false;
        this.displayUser = false;
        break;
      }
      case 1: {
        this.displayEvent = true;
        this.displayInternationalOffice = false;
        this.displayNews = false;
        this.displayRoom = false;
        this.displayUser = false;
        this.createForm = this.formBuilder.group({
          title: new FormControl('', Validators.required),
          description: new FormControl('', Validators.required),
          organiser: new FormControl('', Validators.required),
          participants: new FormControl('', Validators.required),
          room: new FormControl('', Validators.required),
          fromDate: new FormControl('', Validators.required),
          toDate: new FormControl('', Validators.required)
        });
        this.getRoomsFromDb();
        break;
      }
      case 2: {
        this.displayEvent = false;
        this.displayInternationalOffice = true;
        this.displayNews = false;
        this.displayRoom = false;
        this.displayUser = false;
        this.createForm = this.formBuilder.group({
          title: new FormControl('', Validators.required),
          description: new FormControl('', Validators.required),
          link: new FormControl('http://', Validators.required)
        });
        break;
      }
      case 3: {
        this.displayEvent = false;
        this.displayInternationalOffice = false;
        this.displayNews = true;
        this.displayRoom = false;
        this.displayUser = false;
        this.createForm = this.formBuilder.group({
          title: new FormControl('', Validators.required),
          description: new FormControl('', Validators.required),
          link: new FormControl('http://', Validators.required)
        });
        break;
      }
      case 4: {
        this.displayEvent = false;
        this.displayInternationalOffice = false;
        this.displayNews = false;
        this.displayRoom = true;
        this.displayUser = false;
        this.createForm = this.formBuilder.group({
          roomId: new FormControl(0, Validators.required),
          name: new FormControl('', Validators.required),
          description: new FormControl('', Validators.required)
        });
        break;
      }
      case 5: {
        this.displayEvent = false;
        this.displayInternationalOffice = false;
        this.displayNews = false;
        this.displayRoom = false;
        this.displayUser = true;
        this.createForm = this.formBuilder.group({
          name: new FormControl('', Validators.required),
          email: new FormControl('', Validators.required),
          password: new FormControl('', Validators.required),
          password2: new FormControl('', Validators.required)
        });
        break;
      }
    }
  }

  createEvent(): void {
    console.log(this.createForm.value)
    console.log(this.createForm.value.room)
    if(this.isInput(this.createForm.value.title) && this.isInput(this.createForm.value.description) && this.isInput(this.createForm.value.organiser) && this.isInput(this.createForm.value.participants) && this.isInput(this.createForm.value.room) && this.createForm.valid) {
      var event: CreateEvent = {
        title: this.createForm.value.title,
        description: this.createForm.value.description,
        organiser: this.createForm.value.organiser,
        participants: this.createForm.value.participants,
        room: this.createForm.value.room,
        event_from: this.createForm.value.fromDate.toISOString(),
        event_to: this.createForm.value.toDate.toISOString()
      }
      this.eventService.createEvent(event).subscribe({
        next: data => {
          console.log(data)
          this.successMsg = "Event Created Successful"
        },
        error: error => {
          console.log(error)
          if(error['statusText'] == "Bad Request") {
            this.successMsg = "Event Already Exist"
          } else {
            this.successMsg = "Event Not Created"
          }
        }
      })
    } else if(!this.isInput(this.createForm.value.title) && !this.isInput(this.createForm.value.description) && !this.isInput(this.createForm.value.organiser) && !this.isInput(this.createForm.value.participants) && !this.isInput(this.createForm.value.room)) {
      this.successMsg = "Title or Description or Link Is Empty"
    } else if(!this.isInput(this.createForm.value.title)) {
      this.successMsg = "Title is Not Valid"
    } else if(!this.isInput(this.createForm.value.description)) {
      this.successMsg = "Description is Not Valid"
    } else if(!this.isInput(this.createForm.value.organiser)) {
      this.successMsg = "Organiser is Not Valid"
    } else if(!this.isInput(this.createForm.value.participants)) {
      this.successMsg = "Participants is Not Valid"
    } else if(this.createForm.value.title === "") {
      this.successMsg = "Title is Required"
    } else if(this.createForm.value.description === "") {
      this.successMsg = "Description is Required"
    } else if(this.createForm.value.organiser === "") {
      this.successMsg = "Organiser is Required"
    } else if(this.createForm.value.participants === "") {
      this.successMsg = "Participants is Required"
    } else {
      this.successMsg = "Form is Not Valid"
    }
  }

  createInternationalOffice(): void {
    if(this.isInput(this.createForm.value.title) && this.isInput(this.createForm.value.description) && this.isUrl(this.createForm.value.link) && this.createForm.valid) {
      var intetnational: CreateInternational = {
        title: this.createForm.value.title,
        description: this.createForm.value.description,
        link: this.createForm.value.link
      }
      this.internationalService.createInternational(intetnational).subscribe({
        next: data => {
          this.successMsg = "International Office Record Created Successful"
        },
        error: error => {
          if(error['statusText'] == "Bad Request") {
            this.successMsg = "International Office Record Already Exist"
          } else {
            this.successMsg = "International Office Record Not Created"
          }
        }
      })
    } else if(!this.isInput(this.createForm.value.title) && !this.isInput(this.createForm.value.description) && !this.isUrl(this.createForm.value.link)) {
      this.successMsg = "Title or Description or Link Is Empty"
    } else if(!this.isInput(this.createForm.value.title)) {
      this.successMsg = "Title is Not Valid"
    } else if(!this.isInput(this.createForm.value.description)) {
      this.successMsg = "Description is Not Valid"
    } else if(!this.isUrl(this.createForm.value.link)) {
      this.successMsg = "Link is Not Valid"
    } else if(this.createForm.value.title === "") {
      this.successMsg = "Title is Required"
    } else if(this.createForm.value.description === "") {
      this.successMsg = "Description is Required"
    } else if(this.createForm.value.link === "") {
      this.successMsg = "Link is Required"
    } else {
      this.successMsg = "Form is Not Valid"
    }
  }

  createNews(): void {
    if(this.isInput(this.createForm.value.title) && this.isInput(this.createForm.value.description) && this.isUrl(this.createForm.value.link) && this.createForm.valid) {
      var news: CreateNews = {
        title: this.createForm.value.title,
        description: this.createForm.value.description,
        link: this.createForm.value.link
      }
      this.newsService.createNews(news).subscribe({
        next: data => {
          this.successMsg = "News Created Successful"
        },
        error: error => {
          if(error['statusText'] == "Bad Request") {
            this.successMsg = "News Already Exist"
          } else {
            this.successMsg = "News Not Created"
          }
        }
      })
    } else if(!this.isInput(this.createForm.value.title) && !this.isInput(this.createForm.value.description) && !this.isUrl(this.createForm.value.link)) {
      this.successMsg = "Title or Description or Link Is Empty"
    } else if(!this.isInput(this.createForm.value.title)) {
      this.successMsg = "Title is Not Valid"
    } else if(!this.isInput(this.createForm.value.description)) {
      this.successMsg = "Description is Not Valid"
    } else if(!this.isUrl(this.createForm.value.link)) {
      this.successMsg = "Link is Not Valid"
    } else if(this.createForm.value.title === "") {
      this.successMsg = "Title is Required"
    } else if(this.createForm.value.description === "") {
      this.successMsg = "Description is Required"
    } else if(this.createForm.value.link === "") {
      this.successMsg = "Link is Required"
    } else {
      this.successMsg = "Form is Not Valid"
    }
  }

  createRoom(): void {
    if(this.isNumber(this.createForm.value.roomId) && this.isInput(this.createForm.value.name) && this.isInput(this.createForm.value.description) && this.createForm.valid) {
      var room: CreateRoom = {
        booked_from: null,
        booked_to: null,
        roomId: this.createForm.value.roomId,
        name: this.createForm.value.name,
        description: this.createForm.value.description,
        isBooked: false
      }
      this.roomService.createRoom(room).subscribe({
        next: data => {
          this.successMsg = "Room Created Successful"
        },
        error: error => {
          if(error['statusText'] == "Bad Request") {
            this.successMsg = "Room-Id Already Exist"
          } else {
            this.successMsg = "Room Not Created"
          }
        }
      })
    } else if(!this.isNumber(this.createForm.value.roomId) && !this.isInput(this.createForm.value.name) && !this.isInput(this.createForm.value.description)) {
      this.successMsg = "Room-Id or Name or Description Is Empty"
    } else if(!this.isNumber(this.createForm.value.roomId)) {
      this.successMsg = "Room-Id is Not Valid"
    } else if(!this.isInput(this.createForm.value.name)) {
      this.successMsg = "Name is Not Valid"
    } else if(!this.isInput(this.createForm.value.description)) {
      this.successMsg = "Description is Not Valid"
    } else if(this.createForm.value.roomId === "") {
      this.successMsg = "Room-Id is Required"
    } else if(this.createForm.value.name === "") {
      this.successMsg = "Name is Required"
    } else if(this.createForm.value.description === "") {
      this.successMsg = "Description is Required"
    } else {
      this.successMsg = "Form is Not Valid"
    }
  }

  createUser(): void {
    if(this.isInput(this.createForm.value.name) && this.isEmail(this.createForm.value.email) && this.isPassword(this.createForm.value.password, this.createForm.value.password2) && this.createForm.valid) {
      var user: CreateUser = {
        name: this.createForm.value.name,
        email: this.createForm.value.email,
        password: this.createForm.value.password
      }
      this.registerService.registerUser(user).subscribe({
        next: data => {
          this.successMsg = "Registration Successful"
        },
        error: error => {
          if(error['statusText'] == "Bad Request") {
            this.successMsg = "Email Already Exist"
          } else {
            this.successMsg = "User Not Created"
          }
        }
      });
    } else if(!this.isEmail(this.createForm.value.email) && this.createForm.value.password == "" && this.createForm.value.password2 == "") {
      this.successMsg = "Email or Password Is Empty"
    } else if(!this.isEmail(this.createForm.value.email)) {
      this.successMsg = "Email Is Not Valid"
    } else if(!this.isPassword(this.createForm.value.password, this.createForm.value.password2)) {
      this.successMsg = "Password Does Not Match or Password must be at least 6 Characters Long"
    } else if(this.createForm.value.email == "" || this.createForm.value.email == null || this.createForm.value.email == undefined) {
      this.successMsg = "Email Is Required"
    } else if(this.createForm.value.password == "" || this.createForm.value.password == null || this.createForm.value.password == undefined) {
      this.successMsg = "Password Is Required"
    } else if(this.createForm.value.password.length < 6) {
      this.successMsg = "Password must be at least 6 Characters Long"
    } else if(this.createForm.value.password2 == "" || this.createForm.value.password2 == null || this.createForm.value.password2 == undefined) {
      this.successMsg = "Confirm Password Is Required"
    } else if(this.createForm.value.password2.length < 6) {
      this.successMsg = "Confirm Password must be at least 6 Characters Long"
    } else if(this.createForm.value.name == "" || this.createForm.value.name == null || this.createForm.value.name == undefined) {
      this.successMsg = "Name Is Required"
    } else {
      this.successMsg = "Email Is Not Valid"
    }
  }
}
