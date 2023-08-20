import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'postStatusFilter'
})
export class PostStatusFilterPipe implements PipeTransform {

  transform(posts: any[], status: string): any[] {
    if (!posts || !status || status.trim() === '') {
      return posts;
    }
    if (status === 'Scheduled' || status === 'Cancelled') {
      return posts.filter((post) => post.poststatus === status);
    }
    return [];
  }

}
