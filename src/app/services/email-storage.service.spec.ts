import { Component } from '@angular/core';
import { EmailStorageService } from '../services/email-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  email: string = '';
  userType: 'profesor' | 'estudiante' = 'profesor';

  constructor(private emailStorage: EmailStorageService) {}

  async registerEmail() {
    if (this.email) {
      await this.emailStorage.saveEmail(this.userType, this.email);
      console.log(`${this.userType} email saved: ${this.email}`);
    }
  }
}
