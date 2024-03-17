export function compareByName(a,b){
    return a.title.localeCompare(b.title);
}

export function compareByNameDescend(a,b){
    return b.title.localeCompare(a.title);
}

export function compareByCost(a,b){
    return a.price - b.price;
}

export function compareByCostDescend(a,b){
    return b.price - a.price;
}