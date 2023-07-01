import {Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'restdeskSearch'
})
export class adminRestdeskSearchPipe implements PipeTransform {
    transform(items: any[] ,  userName : string, location : string, companyName : string, jobTitle : string, status : string ){
        if (items && items.length){
            return items.filter(item =>{
                if (userName && item.candidates.name.toLowerCase().indexOf(userName.toLowerCase()) === -1){
                    return false;
                }
                 if (location && item.job_id.Location.toLowerCase().indexOf(location.toLowerCase()) === -1){
                    return false;
                }
                if (companyName && item.candidates.current_organisation.toLowerCase().indexOf(companyName.toLowerCase()) === -1){
                    return false;
                }
                 if (jobTitle && item.job_id.job_title.toLowerCase().indexOf(jobTitle.toLowerCase()) === -1){
                    return false;
                }
               
                if (status && item.candidates.status.toLowerCase().indexOf(status.toLowerCase()) === -1){
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