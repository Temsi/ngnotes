import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../api.service';
import { Note } from  '../note';
import { Tag } from  '../tag';
import { NgbdModalNote } from './modal-content/modal-content.component';

import { NgbModal, NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  constructor(private apiService: ApiService, private modalService: NgbModal) { }
  public notes:  Note[];
  public tags: Tag[]; 
  selectedNote:  Note  = { id :  null , title : null, description:  null, created_at: null, tags: null};
  selectedTag: Tag = { id : null, tag : null, created_at: null };
  activeModal: NgbActiveModal;
  public modalRef: any;
  
  ngOnInit() {
    this.apiService.readNotes().subscribe((notes: Note[])=>{
      this.notes = notes;
      console.log('loaded the notes');
      console.log(this.notes);
    })
    this.apiService.readTags().subscribe((tags: Tag[])=>{
      this.tags = tags;
      console.log('loaded the tags');
      console.log(this.tags);
    })
  }

  createNote(form){
    this.apiService.createNote(form.value).subscribe((note: Note)=>{
      console.log("Note created, ", note);
    });

  }

  createTag(form){
    this.apiService.createTag(form.value).subscribe((tag: Tag)=>{
      console.log("Tag created, ", tag);
    });
  }

  selectTag(tag: Tag){
    this.selectedTag = tag;
  }

  deleteTag(id){
    this.apiService.deleteTag(id).subscribe((tag: Tag)=>{
      console.log("Tag deleted, ", tag);
    }); 
  }

  notesModal() {
    const modalRef = this.modalService.open(NgbdModalNote);
    console.log('opening modal')
    console.log('setting tags')
    modalRef.componentInstance.tags = this.tags;
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
      }
    });
    // modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
    //   console.log(receivedEntry);
    // })
  }


}
