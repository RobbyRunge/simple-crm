import { Component, inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.class';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule
  ],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {
  private firestore: Firestore = inject(Firestore);
  user = new User();
  birthDate: Date = new Date();

  async saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    try {
      const userCollection = collection(this.firestore, 'user');
      const result = await addDoc(userCollection, this.user.toJSON());
      console.log('Adding user finished', result);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  }
}
