import { Route, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {DragonComponent} from './pages/dragon/dragon.component';

export interface NavRoute extends Route {
    path?: string;
    icon?: string;
    group?: string;
    groupedNavRoutes?: NavRoute[];
}

export const sideNavPath = 'nav';

export const navRoutes: NavRoute[] = [
    {
        path: '',
        redirectTo: 'dragon',
        pathMatch: 'full',
    },

    { path: 'dragon', icon: 'home', data: { title: 'Dragon', action: {button: 'add', uri: '/nav/dragon/dragon-edit'} },
        loadChildren: () =>
            import('./pages/dragon/dragon.module').then(
                m => m.DragonModule,
            )},


];

@Injectable({
    providedIn: 'root',
})
export class NavRouteService {
    navRoute: Route;
    navRoutes: NavRoute[];

    constructor(router: Router) {
        this.navRoute = router.config.find(route => route.path === sideNavPath);
        this.navRoutes = this.navRoute.children
            .filter(route => route.data && route.data.title)
            .reduce((groupedList: NavRoute[], route: NavRoute) => {
                if (route.group) {
                    const group: NavRoute = groupedList.find(navRoute => {
                        return (
                            navRoute.group === route.group &&
                            navRoute.groupedNavRoutes !== undefined
                        );
                    });
                    if (group) {
                        group.groupedNavRoutes.push(route);
                    } else {
                        groupedList.push({
                            group: route.group,
                            groupedNavRoutes: [route],
                        });
                    }
                } else {
                    groupedList.push(route);
                }
                return groupedList;
            }, []);
    }

    public getNavRoutes(): NavRoute[] {
        return this.navRoutes;
    }
}
