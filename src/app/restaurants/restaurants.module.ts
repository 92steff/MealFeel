import { NgModule } from "@angular/core";
import { AgmCoreModule } from "@agm/core";
import { RestaurantsComponent } from './restaurants.component';
import { RestaurantItemComponent } from './restaurant-item/restaurant-item.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { RestaurantsRoutingModule } from "./restaurants-routing.module";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { RestaurantsReducer } from "./store/restaurants.reducer";
import { EffectsModule } from "@ngrx/effects";
import { RestaurantsEffects } from "./store/restaurants.effects";
import { FormsModule } from "@angular/forms";
import { RestaurantsListComponent } from './restaurants-list/restaurants-list.component';

@NgModule({
    declarations:[
        RestaurantsComponent,
        RestaurantItemComponent,
        RestaurantDetailComponent,
        RestaurantsListComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        RestaurantsRoutingModule,
        StoreModule.forFeature('restaurants', RestaurantsReducer),
        EffectsModule.forFeature([RestaurantsEffects]),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBPRtyp621J7qXoAHd7DUGUXAV3lER-KYc'
          }),
    ]
})

export class RestaurantsModule {}