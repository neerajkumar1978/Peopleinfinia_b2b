import {Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'jobSearch'
})
export class adminJobSearchPipe implements PipeTransform {
    transform(items: any[] , userName: string, companyName: string, jobDeadline: string, jobStat: string ){
        if (items && items.length){
            return items.filter(item =>{
                if (userName && item.job_id.job_title.toLowerCase().indexOf(userName.toLowerCase()) === -1){
                    return false;
                }
                if (companyName && item.job_id.company_name.toLowerCase().indexOf(companyName.toLowerCase()) === -1){
                    return false;
                }
                
                if (jobDeadline && item.job_id.deadline.toLowerCase().indexOf(jobDeadline.toLowerCase()) === -1){
                    return false;
                }
                if (jobStat && item.job_id.status.toLowerCase().indexOf(jobStat.toLowerCase()) === -1){
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