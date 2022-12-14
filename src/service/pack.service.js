const BALANCE = "BALANCE";
const SUB_LIST = "SUB_LIST";
const HISTORY = "HISTORY";

export const packService = {
    fetchSubs,
    saveSubs,
    currentBalance,
    updateHistory,
    fetchHistory,
    autoDistribution
}

// Balance

function currentBalance() {
    var balance = JSON.parse(localStorage.getItem(BALANCE)) || null;
    return balance || null
}

function autoDistribution(total, packs, undefined) {
    var balance = JSON.parse(localStorage.getItem(BALANCE)) || {total: 0};
    balance = {...balance, total, packs, undefined};
    localStorage.setItem(BALANCE, JSON.stringify(balance));
}

// Sub

function fetchSubs(packId) {
    var subs = JSON.parse(localStorage.getItem(SUB_LIST)) || [];
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

// History

function updateHistory(param){
    var history = JSON.parse(localStorage.getItem(HISTORY)) || []
    param.date = new Date();
    history?.unshift(param)
    localStorage.setItem(HISTORY, JSON.stringify(history))
}

function fetchHistory(){
    var history = JSON.parse(localStorage.getItem(HISTORY)) || []
    return history?.slice(0,5)
}



// ::: Balance 
// {
//     "total": 0,
//     "undefined": 0,
//     "packs": [
//         {
//             "id": 0,
//             "amount": 0,
//         },
//         {
//             "id": 1,
//             "amount": 0,
//         },
//         {
//             "id": 2,
//             "amount": 0,
//         },
//         {
//             "id": 3,
//             "amount": 0,
//         },
//         {
//             "id": 4,
//             "amount": 0,
//         },
//         {
//             "id": 5,
//             "amount": 0,
//         },
//     ]
// }


// ::: Sublist 
// {
//     "sublist":
//     [
//         {
//             "id": 0,
//             "packId": 0,
//             "title": "Food",
//             "img": "food.png",
//             "amount": 3000
//         },
//         {
//             "id": 1,
//             "packId": 0,
//             "title": "Clothing",
//             "img": "laundry.png",
//             "amount": 23000
//         }
// }

// ::: History 

//     [
//         {
//             "source": "food.png",
//             "amount": 3000,
//             "date":null,
            //    "type": "I" ,
//         },
//         {
//             "source": "food.png",
//             "amount": 3000
            //    "type": "O" ,
//         }
//      ]