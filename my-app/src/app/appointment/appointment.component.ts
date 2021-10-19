import { Appointment } from './../interfaces/appointment.interface';
import { Component, OnInit } from '@angular/core';
import { AppointmentService } from './appointment.service';
import { FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  constructor(private service: AppointmentService, private formBuilder: FormBuilder) { }

  appointmentForm: FormGroup;

  title = "Book Appointment"
  successMsg = ""

  get formControls() { return this.appointmentForm.controls; }

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm(): void {
    this.appointmentForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      fromDate: new FormControl('', Validators.required),
      toDate: new FormControl('', Validators.required)
    });
  }

  bookAppointment(): void {
    if(this.isEmail(this.appointmentForm.value.email) && this.appointmentForm.valid) {
      var appointment: Appointment = {
        name: this.appointmentForm.value.name,
        email: this.appointmentForm.value.email,
        description: this.appointmentForm.value.description,
        isBooked: true,
        booked_from: this.appointmentForm.value.fromDate.toISOString(),
        booked_to: this.appointmentForm.value.toDate.toISOString()
      }
      this.service.bookAppointment(appointment).subscribe({
        next: data => {
          this.successMsg = "Appointment Booked Successfully"
        },
        error: error => {
          this.successMsg = "Please select another slot"
        }
      });
    }
  }

  isEmail(email: string): Boolean {
    var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regexp.test(email)
  }
}
