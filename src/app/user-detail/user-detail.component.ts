import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.class';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';


@Component({
  selector: 'app-user-detail',
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatDividerModule, MatMenuModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit, OnDestroy {
  userId = '';
  user: User = new User();
  public dialog = inject(MatDialog);
  private subscription: Subscription | undefined;
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    console.log('GOT id', this.userId);
    this.getUser();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getUser() {
    this.subscription = this.userService.getUser(this.userId).subscribe((user: any) => {
      this.user = new User(user);
      console.log('User data:', this.user);
    });
  }

  editMenu() {
    this.dialog.open(DialogEditAddressComponent);
  }

  editUserDetail() {
    this.dialog.open(DialogEditUserComponent);
  }
}
