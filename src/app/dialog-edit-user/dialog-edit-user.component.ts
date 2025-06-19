import { Component, inject, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.class';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-dialog-edit-user',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    FormsModule,
    CommonModule,
    MatDatepickerModule
  ],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})
export class DialogEditUserComponent implements OnInit {
  loading = false;
  user: User = new User();
  userId!: string;
  birthDate: Date | null = null;

  private dialogRef = inject(MatDialogRef<DialogEditUserComponent>);
  private userService = inject(UserService);

  ngOnInit() {
    if (this.user.birthDate) {
      this.birthDate = new Date(this.user.birthDate);
    }
  }

  closeOverlay() {
    this.dialogRef.close();
  }

  async saveUser() {
    this.loading = true;
    try {
      if (this.birthDate) {
        this.user.birthDate = this.birthDate.getTime();
      }
      await this.userService.updateUser(this.userId, this.user);
      this.loading = false;
      this.dialogRef.close();
    } catch (error) {
      console.error('Error updating user:', error);
      this.loading = false;
    }
  }
}