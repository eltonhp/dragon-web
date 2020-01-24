import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

/**
 * @author Elton H. Paula
 */
@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
    public static YES = true;
    public static NO = false;

    title: string;
    content: string[] = [];

    constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
        this.title = data.title;
        this.content = data.content ? data.content : [];
    }

    ngOnInit() {
    }

    onNoClick() {
        this.dialogRef.close(ConfirmDialogComponent.NO);
    }

    onYesClick() {
        this.dialogRef.close(ConfirmDialogComponent.YES)
    }
}
