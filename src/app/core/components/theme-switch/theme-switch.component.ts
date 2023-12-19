import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-theme-switch',
  templateUrl: './theme-switch.component.html',
  styleUrls: ['./theme-switch.component.scss']
})
export class ThemeSwitchComponent implements OnInit {
  ngOnInit() {
    const theme = localStorage.getItem('theme');
    if (theme) {
      this.setTheme(theme);
    }
  }

  changeTheme(event: any) {
    if (event.target.innerHTML === "🔆") {
      event.target.innerHTML = "🌙";
      this.setTheme("dark");
    } else {
      event.target.innerHTML = "🔆";
      this.setTheme("light");
    }
  }

  setTheme(themeName: string) {
    localStorage.setItem('theme', themeName);
    document.documentElement.setAttribute('data-theme', themeName);
  }

  getTheme() {
    return localStorage.getItem('theme');
  }
}
