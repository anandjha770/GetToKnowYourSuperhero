import { LightningElement, api, track } from 'lwc';
import getSuperHeroDetails from '@salesforce/apex/getSuperHeroDetailsUsingAPI.getSuperHeroDetails'
export default class GetToKnowYourSuperHero extends LightningElement {
    @track userD = [];
    @track selectedHero = {};
    @track isModalOpen = false;
    @api showSuperHeroes = false;

    @track tempResponse = [];
    @track forActualPrint = [];
    filterCriteria = '';

    get modalClass() {
        return ` slds-modal ${this.isModalOpen ? "slds-fade-in-open" : ""}`;
    }
    connectedCallback() {
        this.fetchSuperHeroDetails();
    }
    fetchSuperHeroDetails() {
        getSuperHeroDetails().then(response => {
            this.userD = JSON.parse(response);
            console.log(this.userD);
        }).catch(error => {
            console.log(error);
        })
    }

    filterHandle() {
        this.filterCriteria = this.refs.searchInput.value;
        console.log('Filter Creteria ', this.filterCriteria);
        JSON.parse(JSON.stringify(this.userD)).forEach(item => {
            if (String(JSON.parse(JSON.stringify(item.appearance)).gender) === String(this.filterCriteria)) {
                this.tempResponse.push(item);
                console.log('Gender -> ', String(JSON.parse(JSON.stringify(item.appearance)).gender));
            }
        })
        this.forActualPrint = JSON.parse(JSON.stringify(this.tempResponse));
        if (Number(this.forActualPrint.length) > 0) {
            this.showSuperHeroes = true;
        }
        console.log('show super for temaplate true---> ', this.showSuperHeroes);
    }
    showModal(event) {
        let selectedIValue = event.target.dataset.item;
        JSON.parse(JSON.stringify(this.userD)).forEach(item => {
            if (item.id === Number(selectedIValue)) {
                this.selectedHero = item;
                console.log('Selected Hero-->', JSON.parse(JSON.stringify(this.selectedHero)));
                console.log('Apperence -->', JSON.parse(JSON.stringify(item.appearance)).gender);
            }
        })
        this.isModalOpen = true;
    }
    closeModal() {
        this.isModalOpen = false;
    }
    resetSearch() {
        this.showSuperHeroes = false;
        while (this.forActualPrint > 0) {
            this.forActualPrint.pop();
        }
    }
}