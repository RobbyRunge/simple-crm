import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.class';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-edit-address',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss'
})
export class DialogEditAddressComponent {
  loading = false;
  user: User = new User();
  userId: string = '';
  
  private dialogRef = inject(MatDialogRef<DialogEditAddressComponent>);
  private userService = inject(UserService);

  closeOverlay() {
    this.dialogRef.close();
  }

  async saveUser() {
    this.loading = true;
    try {
      await this.userService.updateUser(this.userId, this.user);
      this.loading = false;
      this.dialogRef.close();
    } catch (error) {
      console.error('Error updating user:', error);
      this.loading = false;
    }
  }
}
