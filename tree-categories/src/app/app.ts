import { Component } from '@angular/core';
import { TreeComponent } from './components/tree/tree.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TreeComponent],
  template: `
    <section>
      <h3>Listado de categorías</h3>
      <app-tree></app-tree>
    </section>
  `
})
export class App {}