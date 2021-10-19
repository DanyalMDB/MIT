import { Component, OnInit } from '@angular/core';
import { EventService } from './event.service';
import { RoomsService } from './../rooms/rooms.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  constructor(private service: EventService, private roomsService: RoomsService) {}

  event;
  events = [];
  title = "Event"
  successMsg = ""
  isEvent = false;
  isEvents = true;

  ngOnInit(): void {
    this.getAll()
  }

  getAll(): void {
    this.service.getEvent().subscribe({
      next: data => {
        this.events = data['result'];
        this.isEvent = false;
        this.isEvents = true;
        for (let i = 0; i < this.events.length; i++) {
          this.roomsService.getRoomById(this.events[i]['room']).subscribe(data => {
            this.events[i]['room'] = data['result'];
          });
        }
      },
      error: error => {
        if(error['statusText'] == "Not Found") {
          this.successMsg = "No Record Exist"
        } else {
          this.successMsg = "No Record Found"
        }
      }
    });
  }

  gotoDetail(id: string): void {
    this.service.getEventById(id).subscribe({
      next: data => {
        this.event = data['result'];
        this.isEvent = true;
        this.isEvents = false;
        this.roomsService.getRoomById(this.event['room']).subscribe(data => {
          this.event['room'] = data['result'];
        });
      },
      error: error => {
        if(error['statusText'] == "Not Found") {
          this.successMsg = "No Detail Exist"
        } else {
          this.successMsg = "No Detail Found"
        }
      }
    });
  }
}
