import {Component, OnInit} from '@angular/core';
import {Bus} from "../../domain/bus";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {BusesService} from "../buses.service";
import {DialogData} from "../../dialog/dialog-data";
import {DeleteConfirmDialogComponent} from "../../dialog/delete-confirm-dialog/delete-confirm-dialog.component";

@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.component.html',
  styleUrls: ['./bus-list.component.css']
})
export class BusListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'licencePlate', 'numberOfSeats', 'model', 'option'];
  buses: Bus[] = [];
  loading: boolean = false;

  constructor(public router: Router,
              private busService: BusesService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.busService.findAll().subscribe(list => {
      this.buses = list;
      this.loading = false;
    });
  }

  goToDetail(b: Bus | null) {
    if (b == null)
      this.router.navigate(['buses', 'detail']);
    else
      this.router.navigate(['buses', 'detail', {id: b.getId()}]);
  }

  delete(id: number) {
    let dialogData = new DialogData(null,
      "¿Está seguro que desea eliminar el colectivo?", "Confirmación para eliminar");
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '300px',
      height: 'auto',
      minHeight: 200,
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'delete') {
        this.loading = true;
        this.busService.delete(id).subscribe(b => {
            this.findAll()
            this.snackBar.open("El colectivo se elimino con exito", 'Éxito', {duration: 2000});
          },
          error => {
            this.snackBar.open(error, "Error", {duration: 2000});
            this.loading = false;
          });
      }
    });
  }

}
