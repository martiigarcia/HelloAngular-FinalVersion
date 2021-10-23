import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


import {MatSnackBar} from "@angular/material/snack-bar";
import {BusesService} from "../buses.service";
import {Bus} from "../../domain/bus";
import {BrandService} from "../../brands/brand.service";
import {Brand} from "../../domain/brand";
import {ModelService} from "../../models/model.service";
import {Model} from "../../domain/model";

@Component({
  selector: 'bus-detail',
  templateUrl: './bus-detail.component.html',
  styleUrls: ['./bus-detail.component.css']
})
export class BusDetailComponent implements OnInit {

  formBus: FormGroup = this.fb.group({
    id: [null, []],
    licensePlate: ['', [Validators.required, Validators.minLength(6)]],
    model: ['', Validators.required],
    brand: ['', Validators.required],
    numberOfSeats: ['', Validators.required]
  });

  loading: boolean = false;
  brands: Brand[] = [];
  models: Model[] = [];
  nameModel: string = "";
  nameBrand: string = "";
  brandSave: Brand = new Brand(0, "", []);
  modelSave: Model = new Model(0, "", this.brandSave);

  constructor(public route: ActivatedRoute,
              public fb: FormBuilder, public router: Router,
              private busService: BusesService,
              private snackBar: MatSnackBar,
              private brandService: BrandService,
              private modelService: ModelService) {
  }

  ngOnInit(): void {
    this.getAllBrands();
    this.route.paramMap.subscribe(param => {
      this.loading = true;
      let paramId = param.get("id");
      if (paramId != null) {
        const id = parseInt(paramId);
        this.busService.findOne(id).subscribe(bus => {
            this.buildForm(bus);
            this.loading = false;
          },
          error => {
            this.loading = false;
            this.snackBar.open(error, "Error", {duration: 2000});
            this.goToBack();
          })
      } else {
        this.buildForm(null);
        this.loading = false;
      }
    })
  }

  buildForm(bus: Bus | null) {
    if (bus != null) {
      this.nameModel = bus.getModel().showName();
      this.nameBrand = bus.getModel().getBrand().showName()
      this.chargeBuilFormModel(bus.getModel().getBrand().getId())
      this.formBus.patchValue({
        id: bus.getId(),
        licensePlate: bus.getLicensePlate(),
        brand: this.nameBrand,
        numberOfSeats: bus.getNumberOfSeats()
      })

    }
  }

  get fc() {
    return this.formBus.controls;
  }

  save() {

    this.findBrand(this.formBus.get(['brand'])?.value);

    this.findModel(this.formBus.get(['model'])?.value)

    const bus = new Bus(
      +this.formBus.get(["id"])?.value,
      this.formBus.get(["licensePlate"])?.value,
      this.modelSave,
      +this.formBus.get(["numberOfSeats"])?.value);

    if (bus.getId() != null) {
      this.busService.update(bus).subscribe(p => {
          this.snackBar.open("El bus actualizó con exito", "Éxito", {duration: 2000});
          this.goToBack();
        },
        error => {
          this.snackBar.open(error, "Error", {duration: 2000});
        }
      )
    } else {
      this.busService.create(bus).subscribe(p => {
          this.snackBar.open("El bus se creo con exito", "Éxito", {duration: 2000});
          this.goToBack();
        },
        error => {
          this.snackBar.open(error, "Error", {duration: 2000});
          console.log(error)
        }
      )
    }
  }

  goToBack() {
    this.router.navigate(['buses', 'list']);
  }

  getAllBrands() {
    this.brandService.findAll().subscribe(list => {
      this.brands = list;
      this.loading = false;
    });
  }

  onChange($event: any) {
    this.findBrandForName($event.value);

  }

  findBrandForName(name: string) {
    //obtener el id del brand en el select desplegable html
    let idBrand: number = 0;
    this.brands.forEach(brand => {
      if (brand.showName() === name) {
        idBrand = brand.getId();
      }
    })
    // obtener el arreglo de models que
    this.chargeBuilFormModel(idBrand);

  }

  findBrand(nameBrand: string) {
    this.brands.forEach(brand => {
      if (brand.showName() === nameBrand) {
        this.brandSave = brand;

      }
    })
  }

  findModel(name: string) {

    this.models.forEach(model => {
      if (model.showName() === name) {
        this.modelSave = model
      }
    })
  }

  chargeBuilFormModel(idBrand: number) {
    //buscar los models
    this.modelService.findAllById(idBrand).subscribe(models => {
      //vuelvo a cargar la nueva lista de models
      this.models = models;
      //en el select de modelo asigno el valor que corresponde actualmente a la marca
      this.formBus.patchValue({
        model: this.nameModel
      })

    })
  }
}
