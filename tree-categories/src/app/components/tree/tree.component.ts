import { Component, OnInit, inject, signal } from '@angular/core';
import { MatTreeNestedDataSource, MatTreeModule } from '@angular/material/tree';
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

  childrenAccessor = (node: Tree) => node.children ?? [];
  
  dataSource = new MatTreeNestedDataSource<Tree>();
  loading = signal(false);
  errorMessage = signal<string | null>(null);

  hasChild = (_: number, node: Tree) => !!node.children && node.children.length > 0;

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.loading.set(true);
    this.errorMessage.set(null);
    this.treeService.getCategories().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.loading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.message);
        this.loading.set(false);
      }
    });
  }
}