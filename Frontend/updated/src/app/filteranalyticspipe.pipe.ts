import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filteranalyticspipe'
})
export class FilteranalyticspipePipe implements PipeTransform {

  transform(analyticsData: any[], socialAccountFilter: string, postTypeFilter: string): any[] {
    if (!analyticsData) {
      return [];
    }

    return analyticsData.filter((analytics) => {
      const socialAccountMatches = analytics[1].toLowerCase().includes(socialAccountFilter.toLowerCase());
      const postTypeMatches = analytics[0].toLowerCase().includes(postTypeFilter.toLowerCase());

      // Return true if both filters are empty or if either filter matches
      return (socialAccountMatches || !socialAccountFilter) &&
             (postTypeMatches || !postTypeFilter);
    });
  }

}
