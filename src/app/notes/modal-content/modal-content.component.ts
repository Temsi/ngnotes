import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tag } from  '../../tag';
import { Note } from '../../note';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ngbd-modal-note',
  templateUrl: './modal-content.component.html'
})
export class NgbdModalNote implements OnInit{

  @Input() public tags;

  constructor(
      private modalService: NgbModal, 
      public activeModal: NgbActiveModal
      ) {}

  @Output() passEntry: EventEmitter<any> = new EventEmitter()

  newNote:  Note  = { id :  null , title : null, description:  null, created_at: null, tags: null};
  public noteTags = [{}];

  save() {
    this.passEntry.emit(this.newNote);
    this.activeModal.close();
  }

  dismiss() {
    this.activeModal.dismiss();
  }

  ngOnInit() {
    console.log('modal opened')
    console.log(this.tags);
    }
}