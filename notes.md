extensions:
√ filter to ricks
√ filter to mortys
√ get more than 20 items?
- alive ricks
- dead ricks
- alive mortys
- dead mortys
- what about all characters with the same last known location?
- all characters from the same origin
- improve css



to get a shuffled deck of 'cards' for a player:
```javascript
var arr = []
while(arr.length < 8){
    var r = Math.floor(Math.random()*100) + 1;
    // if the random number is not yet in the array --
    if(arr.indexOf(r) === -1) arr.push(r);
}
document.write(arr);
```
replace 8 with the number of 'cards' desired
replace 100 with the number returned at info.count (currently 493)
