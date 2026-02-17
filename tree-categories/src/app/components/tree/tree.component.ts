import { Component, OnInit, inject, signal } from '@angular/core';
import { MatTreeNestedDataSource, MatTreeModule } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TreeService } from '../../services/tree.service';
import { Tree } from '../../models/tree.model';

@Component({
  selector: 'app-tree',
  standalone: true,
  imports: [MatTreeModule, MatIconModule, MatButtonModule],
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})

export class TreeComponent implements OnInit {
  private treeService = inject(TreeService);

  treeControl = new NestedTreeControl<Tree>(node => node.children);
  dataSource = new MatTreeNestedDataSource<Tree>();

  hasChild = (_: number, node: Tree) => !!node.children && node.children.length > 0;
  loading = signal<boolean>(true);
  errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.treeService.getCategories().subscribe({
      next: (data: Tree[]) => {
        this.dataSource.data = data;
        this.loading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.message || 'Error de conexión');
        this.loading.set(false);
      }
    });
  }
}