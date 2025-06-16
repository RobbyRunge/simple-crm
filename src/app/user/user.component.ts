import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule,
    CommonModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit, OnDestroy {
  dialog = inject(MatDialog);
  user = new User();
  allUsers: any[] = [];
  private userService = inject(UserService);
  private subscription: Subscription | undefined;
  private router = inject(Router);

  ngOnInit(): void {
    this.subscription = this.userService.getUsers().subscribe((changes: any[]) => {
      this.allUsers = changes;
      console.log(this.allUsers);

    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogAddUserComponent);
    dialogRef.afterClosed().subscribe();
  }

  navigateToUser(userId: string): void {
    this.router.navigate(['/user', userId]);
  }
}