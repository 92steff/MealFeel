import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { RestaurantsComponent } from './restaurants.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { RestaurantsListComponent } from "./restaurants-list/restaurants-list.component";

const restaurantsRoutes:Routes = [
    {path:'', component:RestaurantsComponent, children: [
        {path: '', component: RestaurantsListComponent },
        {path: ':restaurantName', component: RestaurantDetailComponent}
    ]}
];

@NgModule({
    imports:[RouterModule.forChild(restaurantsRoutes)],
    exports:[RouterModule]
})

export class RestaurantsRoutingModule {}