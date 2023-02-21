import SearchComponent from './SearchComponent.js';
import { ApiService } from './apiService.js';
import { HtmlSetter } from './htmlSet.js';

var searchComponent = new SearchComponent("city-search", "search-button", ApiService, HtmlSetter);
