import {Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'userSearch'
})
export class AdminUserSearch implements PipeTransform {
    transform(items: any[] , userName: string, userId: string){
        if (items && items.length){
            return items.filter(item =>{
                if (userName && item.user_name.toLowerCase().indexOf(userName.toLowerCase()) === -1){
                    return false;
                }
                if (userId && item.user_id.toLowerCase().indexOf(userId.toLowerCase()) === -1){
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