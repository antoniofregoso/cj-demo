

export function homeUpdater(previousValue, currentValue){
    let page = document.querySelector('app-page');
    page.data.context = currentValue.context;
    page.loadData();
}