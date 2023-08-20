import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(posts: any[], postType: string): any[] {
    if (!posts || !postType || postType.trim() === '') {
      return posts;
    }
    return posts.filter((post) => post.posttype === postType);
  }
    
}
