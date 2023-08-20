import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthlyfilteranalytics'
})
export class MonthlyfilteranalyticsPipe implements PipeTransform {

  transform(analyticsData: any[], monthFilter: string, socialAccountFilter: string, postTypeFilter: string): any[] {
    if (!analyticsData) {
      return [];
    }

    return analyticsData.filter((analytics) => {
      const monthMatches = analytics[0].toString().toLowerCase().includes(monthFilter.toLowerCase());
      const socialAccountMatches = analytics[2].toLowerCase().includes(socialAccountFilter.toLowerCase());
      const postTypeMatches = analytics[1].toLowerCase().includes(postTypeFilter.toLowerCase());

      // Return true if all filters are empty or if they match
      return (monthMatches || !monthFilter) &&
             (socialAccountMatches || !socialAccountFilter) &&
             (postTypeMatches || !postTypeFilter);
    });
  }
}
