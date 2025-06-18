import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  imports: [MatCardModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {
  userId = '';

  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    console.log('GOT id', this.userId);
  }
}
