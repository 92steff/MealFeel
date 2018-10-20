import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { RecipesComponent } from "./recipes.component";
import { RecipeItemComponent } from "./recipe-item/recipe-item.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";

const recipesRoutes:Routes = [
    {path:'recipes', component: RecipesComponent, children: [
        {path:'', component: RecipeListComponent, children: [
            {path:'', component: RecipeItemComponent}
        ]},
        {path: ':recipeName', component: RecipeDetailComponent}
    ]}
]

@NgModule({
    imports:[RouterModule.forChild(recipesRoutes)],
    exports:[RouterModule]
})

export class RecipesRoutingModule {}