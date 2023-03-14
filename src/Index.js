import SearchComponent from './SearchComponent.js';
import { ApiService } from './apiService.js';
import { HtmlSetter } from './htmlSet.js';
import { weather } from '../weather.js';

new SearchComponent(
    'city-search',
    'search-button',
    new ApiService('city-search'),
    new HtmlSetter('city-search', 'search-button', weather)
);
