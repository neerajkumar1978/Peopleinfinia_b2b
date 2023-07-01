import {Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'leadSearch'
})
export class LeadsFilterSearch implements PipeTransform {
    transform(items: any[] , userName: string){
        console.log(items , userName )
        if (items && items.length){
            return items.filter(item =>{
                if (userName && item.user_name.toLowerCase().indexOf(userName.toLowerCase()) === -1){
                    return false;
                }
                return true;
           })
        }
        else{
            return items;
        }
    }
}