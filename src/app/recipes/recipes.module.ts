import { NgModule } from "@angular/core";
import { RecipesComponent } from "./recipes.component";
import { RecipeItemComponent } from "./recipe-item/recipe-item.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RecipeListComponent } from './recipe-list/recipe-list.component';


@NgModule({
    declarations:[
        RecipesComponent,
        RecipeItemComponent,
        RecipeDetailComponent,
        RecipeListComponent,
    ],
    imports:[
        CommonModule,
        FormsModule,
        RecipesRoutingModule
    ],
    exports: [
        RecipeItemComponent,
        RecipeListComponent
    ]
})

export class RecipesModule {}