import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonApp, IonMenu, IonButtons, IonButton, IonSplitPane, IonHeader, IonToolbar, IonTitle, IonContent, IonRouterOutlet, IonRouterLink } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonMenu, IonButtons, IonButton, IonSplitPane, IonHeader, IonToolbar, IonTitle, IonContent, IonRouterOutlet, IonRouterLink, RouterLink],
})
export class AppComponent {
  constructor() {}
}
