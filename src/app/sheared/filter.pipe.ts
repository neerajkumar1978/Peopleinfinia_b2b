import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'personSearch'
})
export class JobSearchPipe implements PipeTransform {
  transform(items: any[], jobPostion: string, postedBy: string, location: string, createdAt: string, jobStatus: string, shortlisted) {
    if (items && items.length) {
      return items.filter(item => {
        if (jobPostion && item.job_id.job_title.toLowerCase().indexOf(jobPostion.toLowerCase()) === -1) {
          return false;
        }
        if (postedBy && item.client_id.user_name.toLowerCase().indexOf(postedBy.toLowerCase()) === -1) {
          return false;
        }
        if (location && item.job_id && item.job_id.Location.filter(el => el && el.value && el.value.toLowerCase().search(location.toLowerCase()) === -1)) {
          return false;
        }
       /* if (location && item.job_id.Location.filter(el => el && el.value && el.value.toLowerCase()).indexOf(location.toLowerCase()) === -1) {
          return false;
        }*/
        if (createdAt && item.client_id.created_at.toLowerCase().indexOf(createdAt.toLowerCase()) === -1) {
          return false;
        }
        if (jobStatus && item.job_id.status.toLowerCase().indexOf(jobStatus.toLowerCase()) === -1) {
          return false;
        }
        return !(shortlisted && item.totalcandidates.toString().indexOf(shortlisted.toString()) === -1);

      });
    } else {
      return items;
    }
  }
}
