const PACK_LIST = "PACK_LIST";
const SUB_LIST = "SUB_LIST";

export const packService = {
    fetchSubs,
    saveSubs
}

function fetchSubs(packId) {
    const subs = JSON.parse(localStorage.getItem(SUB_LIST)) || [];
    if(packId && subs){
        subs = [].concat(subs).filter((el)=>el.packId === packId)
    }
    return subs
}

function saveSubs(data) {
    const subs = JSON.stringify(data);
    localStorage.setItem(SUB_LIST, subs)
    return subs
}
