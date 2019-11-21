import { Component, OnInit, ViewChild } from '@angular/core';
import { Pizza } from '../models/pizza.model';
import { User } from '../models/user.model';
import { Ingredient } from '../models/ingredient';
import { PizzaService } from '../services/pizza.service';
import { MessageService } from '../services/message.service';
import { ActivatedRoute } from '@angular/router';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.scss']
})
export class PizzaListComponent implements OnInit {
  selectedPizza: Pizza;
  // Liste de pizzas à afficher dans le composant
  pizzas: Pizza[];

  user: User = new User('Mota', 'Matthieu', '1991-11-18', 'https://...');
  ingredients: Ingredient[] = [
    { name: 'Tomate', image: 'tomato.png', weight: 20, price: 0.50 },
    { name: 'Avocat', image: 'avocado.png', weight: 60, price: 1.50 }
  ];

  sort = {
    field: 'name',
    order: 'asc'
  };

  @ViewChild('search', { static: false }) search: NgModel;

  constructor(
    private pizzaService: PizzaService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) { }

  // Hook appelé à l'initialisation du composant
  ngOnInit() {
    /*this.pizzaService.getPizzasSlowly().then(
      pizzas => this.pizzas = pizzas
    );*/
    this.route.data.subscribe(data => {
      this.pizzas = data.pizzas;
    });
  }

  ngAfterViewInit() {
    console.log(this.search);
  }

  // Quand on clique sur une pizza
  onSelect(pizza: Pizza) {
    console.log(pizza);
    // Si une pizza est déjà sélectionnée, on reset
    if (this.selectedPizza) {
      this.selectedPizza.ingredient = null;
    }
    this.selectedPizza = pizza;

    this.messageService.addMessage(
      'Ajout de la pizza ' + this.selectedPizza.name
    );
  }

  // Quand on reçoit l'événement de l'enfant
  unSelect(pizza: Pizza) {
    console.log(pizza);
    this.selectedPizza = this.selectedPizza.ingredient = null;
  }

  // Quand on choisit un ingredient dans le composant ingredient-list
  addIngredient(ingredient: Ingredient) {
    this.selectedPizza.ingredient = ingredient;
  }
}