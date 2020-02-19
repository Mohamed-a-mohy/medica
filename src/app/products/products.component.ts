import { Component, OnInit, Input } from '@angular/core';

// firebase imports starts here
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
//endhere

// serve import
import { AddtocartService } from '../addtocart.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {
  location: any;
  routeLink: any;
  indexOflastSlash: any;
  productID: any;

  
  constructor(
    private angularFS: AngularFirestore,
    private service: AddtocartService,) {}

  // @Input() item;
  arrOfData;
  newArr = [];


  /////list of products after filtering

  listOfProducts: any[] = [];

  ////filter range variables////

  brandFilterArray: string[] = [];
  typeFilterArray: string[] = [];
  checkedBrand: object = {};
  checkedType: object = {};
  checkedTypeAll: object = {};
  checkedBrandAll: object = {};
  checkedInput=document.getElementsByClassName("checkedInput")

  ////price range variables////


  arrayOfPrice: number[] = [];
  maxPrice: number;
  selectedPrice: number;
  filteredPrice: number[] = [];
  inputRange = document.getElementById("myRange");
  outputValue : number ;


  category = [];
  subCat = []
  subCatObj = {};
  activeCategory;
  indexOfActiveCategory;
  activesubCategory;
  sortSelected;
  radio1;
  radio2;
  radio3;
  radio4;


  pageOfItems;
 
  ngOnInit() {


    this.newArr=[];
    this.service.getData.subscribe(items => {
      this.arrOfData = items;
      console.log("hiiii", this.arrOfData)
      ///////category array here
      for (let i = 0; i < this.arrOfData.length; i++) {
        if (this.category[0]) {
          for (let j = 0; j < this.category.length; j++) {
            if (this.category.indexOf(this.arrOfData[i].category) == -1 && this.arrOfData[i].category != undefined) {

              this.category.push(this.arrOfData[i].category)
              this.subCatObj[this.arrOfData[i].category] = []
            }
          }
        } else {
          this.category.push(this.arrOfData[i].category)
          this.subCatObj[this.arrOfData[i].category] = []
        }
      }

      ///SubCat here
      for (let i = 0; i < this.arrOfData.length; i++) {
        if (this.subCat[0]) {
          for (let j = 0; j < this.subCat.length; j++) {
            if (this.subCat.indexOf(this.arrOfData[i].subCat) == -1 && this.arrOfData[i].subCat != undefined) {
              this.subCat.push(this.arrOfData[i].subCat)
            }
          }
        } else {
          this.subCat.push(this.arrOfData[i].subCat)
        }
      }

     

      for (let i = 0; i < this.category.length; i++) {
        var cat = this.category[i]
        for (let j = 0; j < this.arrOfData.length; j++) {
          if (cat == this.arrOfData[j].category && this.subCatObj[cat].indexOf(this.arrOfData[j].subCat) == -1) {
            this.subCatObj[cat].push(this.arrOfData[j].subCat)
          }
        }
      }
      console.log(" category", this.subCat);
      console.log(" subCatobj", this.subCatObj);

      if(sessionStorage.getItem("activeCategory")){
        this.activeCategory=sessionStorage.getItem("activeCategory");
      }else{
        this.activeCategory=this.category[0]
      }
    });



    ////pagination
    /*  this.listOfProducts = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`})); */
  }


  //////checked Input
  // isCheckedInput(){
  //   for(let i =0 ; i<this.checkedInput.length ; i++){
  //     if(!this.checkedInput[i].checked)
  //   }
  // }

  //////generat dynamice filter
  filterGeneration(arrayOfProducts) {
   
    // console.log(this.newArr);
    console.log(this.arrOfData);
    console.log(this.activesubCategory);
    console.log(arrayOfProducts)
    this.listOfProducts = [...arrayOfProducts]
    for (let product of arrayOfProducts) {
      if (this.brandFilterArray.indexOf(product.brand) == -1) {
        this.brandFilterArray.push(product.brand)
      }
      for (let product of arrayOfProducts) {
        if (this.typeFilterArray.indexOf(product.type) == -1) {
          this.typeFilterArray.push(product.type)
        }
      }
    }
    this.collectPrices(this.arrayOfPrice, this.newArr);
    this.maxPrice = Math.max(...this.arrayOfPrice)
  }

  /////filtered Price
  getPrice(param) {
    this.outputValue = param.value;
    this.selectedPrice = param.value
    this.listOfProducts = [];
    this.showList();
  }

  ///// function of checked filter from type and brand
  onCheck(checkedElement) {
    //clear list of products
    this.listOfProducts = [];
    ////creat brand array
      
        if (checkedElement.name == 'brand') {
          if (checkedElement.checked) {
            this.checkedBrand[checkedElement.value] = 1;
          } else if (checkedElement.checked == false && this.checkedBrand[checkedElement.value]) {
            delete this.checkedBrand[checkedElement.value];
          }
          ////creat type array
        } else if (checkedElement.name == 'type') {
          if (checkedElement.checked) {
            this.checkedType[checkedElement.value] = 1;
          } else if (checkedElement.checked == false && this.checkedType[checkedElement.value]) {
            delete this.checkedType[checkedElement.value];
          }
        }
    this.showList();
  }
 /*  cutString(routeLink: any, indexOflastSlash: any): any {
    throw new Error("Method not implemented.");
  } */

  /////show list after filtering
  showList() {
    if (this.isEmpty(this.checkedBrand) && this.isEmpty(this.checkedType)) {
      this.convertArrayToObject(this.brandFilterArray, this.checkedBrandAll)
      this.convertArrayToObject(this.typeFilterArray, this.checkedTypeAll)
      this.filterList(this.newArr, this.checkedBrandAll, this.checkedTypeAll)
    } else if (this.isEmpty(this.checkedType)) {
      this.convertArrayToObject(this.typeFilterArray, this.checkedTypeAll)
      this.filterList(this.newArr, this.checkedBrand, this.checkedTypeAll)
    } else if (this.isEmpty(this.checkedBrand)) {
      this.convertArrayToObject(this.brandFilterArray, this.checkedBrandAll)
      this.filterList(this.newArr, this.checkedBrandAll, this.checkedType)
    } else {
      this.filterList(this.newArr, this.checkedBrand, this.checkedType)
    }
  }
  ////filter list by price , brand and type
  filterList(products, brandObject, typeObject) {
    this.radio1 = document.getElementById("radio1")
    this.radio2 = document.getElementById("radio2")
    this.radio3 = document.getElementById("radio3")
    this.radio4 = document.getElementById("radio4")

    for (let element of products) {
      for (let brandKey in brandObject) {
        for (let typeKey in typeObject) {
          if (element.brand == brandKey && element.type == typeKey && element.price <= this.selectedPrice) {
            console.log(this.selectedPrice)
            this.listOfProducts.push(element)
          }
        }
      }
    }
    console.log(this.radio1.checked);
    if (this.radio1.checked) {
      this.sortByPriceLowToHigh(this.listOfProducts)
    } else if (this.radio2.checked) {
      this.sortByAHighToLow(this.listOfProducts)
    } else if (this.radio3.checked) {
      this.sortByALowToHigh(this.listOfProducts)
    } else if (this.radio4.checked) {
      this.sortByAHighToLow(this.listOfProducts)
    }
  }
  //////check object has data or not
  isEmpty(obj) {
    if (Object.keys(obj).length == 0) {
      return true
    }
    return false;
  }
  convertArrayToObject(arr, obj) {
    for (let element of arr) {
      obj[element] = 1
    }
  }
  collectPrices(arrayOfPrice, products) {
    for (let element of products) {
      if (element.price) {
        arrayOfPrice.push(element.price)
      }
    }
  }




  categorySelector(cat) {
    this.activeCategory = cat;
    this.newArr=this.arrOfData.filter(element=>element.category==this.activeCategory)
    console.log(this.newArr);
    console.log(this.activeCategory);
    // this.activeCategory = this.category[0]  console.log(e);
    sessionStorage.setItem("activeCategory",cat)
    this.typeFilterArray=[]
    this.brandFilterArray=[]
    this.checkedBrand= {};
    this.checkedType= {};
  }
  subCategorySelector(subcat) {
    this.activesubCategory = subcat;
    this.newArr=this.arrOfData.filter(element=>element.subCat==this.activesubCategory)
    console.log(this.newArr);
    console.log(this.activeCategory)
    this.typeFilterArray=[]
    this.brandFilterArray=[]
    this.checkedBrand= {};
    this.checkedType= {};
  }

  selectSort(val) {
    this.sortSelected = val
    console.log(this.sortSelected);
  }





  ///////sortPArt

  sortByPriceLowToHigh(arr) {
    for (let i = 1; i < arr.length; i++) {
      let j = i - 1;
      let temp = arr[i]
      while (j >= 0 && arr[j].price > temp.price) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = temp;
    }

    console.log(this.radio1);
    return arr
  }


  sortByPriceHighToLow(arr) {
    for (let i = 1; i < arr.length; i++) {
      let j = i - 1;
      let temp = arr[i]
      while (j >= 0 && arr[j].price < temp.price) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = temp;
    }
    return arr
  }

  sortByALowToHigh(arr) {
    for (let i = 1; i < arr.length; i++) {
      let j = i - 1;
      let temp = arr[i]
      while (j >= 0 && arr[j].name > temp.name) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = temp;
    }
    return arr
  }

  sortByAHighToLow(arr) {
    for (let i = 1; i < arr.length; i++) {
      let j = i - 1;
      let temp = arr[i]
      while (j >= 0 && arr[j].name < temp.name) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = temp;
    }
    return arr
  }
  getelement(param) {
    console.log(param);
  }
  isChecked(arr){
    for(let i=0 ; i<arr.length ; i++){
      if(arr[i].checked){
        arr[i].checked=false
      }
    }
  }



  ///pagination
  /*  onChangePage(pageOfItems) {
   // update current page of items
   this.pageOfItems = pageOfItems;
   console.log(pageOfItems);
   
 } */

}

