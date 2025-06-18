import { Component, inject, OnInit } from '@angular/core';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-user-detail',
  imports: [MatCardModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {
  userId = '';
  user: User = new User();

  private route = inject(ActivatedRoute);
  private firestore = inject(Firestore);

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    console.log('GOT id', this.userId);
    this.getUser();
  }

  getUser() {
    const userDocRef = doc(this.firestore, 'user', this.userId);
    docData(userDocRef).subscribe((user: any) => {
      this.user = new User(user);
      console.log('User data:', this.user);
    });
  }
}
