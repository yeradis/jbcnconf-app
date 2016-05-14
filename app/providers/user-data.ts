import {Injectable} from 'angular2/core';
import {Storage, LocalStorage, Events} from 'ionic-angular';


@Injectable()
export class UserData {
  _favorites = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  storage = new Storage(LocalStorage);

  constructor(private events: Events) {}

  private storeData(){
    localStorage.setItem("favorites", JSON.stringify(this._favorites));
  }
  
  private loadData(){
    var favorites = localStorage.getItem("favorites");
    if (favorites == null) {
      return false;
    } 
    this._favorites = JSON.parse(favorites);
  }
  
  hasFavorite(sessionName) {
    this.loadData();
    return (this._favorites.indexOf(sessionName) > -1);
  }

  addFavorite(sessionName) {
    this._favorites.push(sessionName);
    this.storeData();
  }

  removeFavorite(sessionName) {
    let index = this._favorites.indexOf(sessionName)
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
    this.storeData();
  }
}
