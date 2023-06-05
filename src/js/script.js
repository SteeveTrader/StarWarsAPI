"use strict";

class StarWars {
    constructor(characters, episodeId, name, openingCrawl) {
        this.characters = characters;
        this.id = episodeId;
        this.name = name;
        this.crawl = openingCrawl;
        this.container = document.querySelector('.films__list');
        this.item = document.createElement('li');
        this.actorList = document.createElement('ul');
    }

    getActors () {
        this.characters.forEach(el => { 
            const preloader = document.querySelector('.loader');
            preloader.style.display = 'block';   
            this.container.append(this.actorList);
                       
            axios.get(el)
                .then( ({data: {name: actorname}}) => {
                    setTimeout(() => {  
                        const li = document.createElement('li');
                        this.actorList.append(li);
                        li.innerHTML = actorname;
                        preloader.style.display = 'none';
                        
                      }, 2000);
                })
                .catch(err => console.log('Error', err));
        });
    }

    createElements () {
        this.item.className = "item";
        this.item.innerHTML = `
            <h3 class="films__list-film-title">Film title: ${this.name}</h3>
            <p> Episode number: ${this.id}</p>
            <p> Prewiev: ${this.crawl}</p>
            <p class="films__list-actors">Actors:</p>
            <div class="loader" style="display: block;"></div>
        `;
        this.container.append(this.item);


    }

    render() {
        this.createElements();
        this.getActors();
      }
     
}


const cardUrl = 'https://ajax.test-danit.com/api/swapi/films';

axios.get(cardUrl)
    .then(({ data }) => {
        data.forEach(( {characters, episodeId, name, openingCrawl} ) => {
            new StarWars(characters, episodeId, name, openingCrawl).render();
        });
    })
    .catch(err => console.log('Error', err));